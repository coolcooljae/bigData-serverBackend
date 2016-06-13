/**
 * Created by jaejo on 5/6/16.
 */

//
// setup mongodb

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// 0) setup a mongodb connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("connected to mongodb \'test\' database & \'person\' collection!")
});

// 1) define a schema
var personSchema = mongoose.Schema ({
    firstName: String,
    lastName: String,
    cellNumber: String
});

var personModel = mongoose.model('Cellphone', personSchema);

//
// setup express

var bodyParser = require('body-parser')
var express = require('express');
var app = express();
//app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(8081, function () {
    console.log("express started at port 8081 ^-^");
})

//
// GET

// default
app.get('/', function(req,res){
    res.send("received get root");
});

// list all users
// "curl -XGET http://localhost:8081/user/listUsers" or use browser to type the URL, http://localhost:8081/user/listUsers

app.get('/user/listUsers', function (req, res) {

    personModel.find().lean().exec( function(err, persons) {
        if(err) return handleErr(err);

        if(null !== persons) {
            console.log('* persons: ' + JSON.stringify(persons));
            persons.forEach(function (person) {
                // console.log('** person: ' + JSON.stringify(person));
                var fname = 'no name', lname = undefined, cnumber = undefined;
                if(person.firstName && person !== undefined) {
                    fname = person.firstName;
                }
                console.log('[loop] %s %s has a cell phone number %s.', fname, person.lastName, person.cellNumber)
            });

            return res.send(JSON.stringify(persons));
        }
    });
})


//
// POST to update data

// get userId as a param
// " curl -H "Content-Type: application/json" -XPOST http://localhost:8081/user/updateUser/572be708324025ea28878497 -d '{"firstName":"NewFirstName", "lastName":"BrandNewLastName"}' "

app.post('/user/updateUser/:userId', function (req, res) {
    console.log('updateUser()/:userID got called... : ' + req.params.userId);
    console.log(req.body);
    console.log(req.body.firstName)
    console.log(req.body.lastName)

    // request param from URI
    var id2update = { "_id": req.params.userId };
    // upsert: false means I only want to update when this document exists and don't want to create a new doc
    personModel.update(id2update, { $set: {firstName: req.body.firstName, lastName: req.body.lastName}}, {upsert:false}, callback4update);

    function callback4update (err, numAffected) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(numAffected + " row(s) updated successfully!") //todo: how to get the numAffected properly?
    }

    res.sendStatus(200);
});


//
// PUT (add)
// 1) this request works: curl -H "Content-Type: application/json" -XPUT http://localhost:8081/user/addUser -d '{"user": {"firstName": "new first name", "lastName": "old last name","cellNumber": "!@#-$%^-&*()"}}'
// 2) request via a file: curl -H "Content-Type: application/json" -XPUT http://localhost:8081/user/addUser -d @user4post.json

app.put('/user/addUser', function (req, res) {
    console.log("received a PUT request");
    console.log(req.body.user);
    console.log(req.body.user.firstName);
    console.log(req.body.user.lastName);

    // create a new personModel w/ the new info
    var person = new personModel();
    person.firstName = req.body.user.firstName;
    person.lastName = req.body.user.lastName;
    person.cellNumber = req.body.user.cellNumber;

    person.save(function(err, personSaved){
        if(err){
            throw err;
            console.log(err);
        } else {
            console.log('saved a new person, ' + req.body.user.firstName);
        }
    });

    res.sendStatus(200);
});


//
// DELETE
// "curl -XDELETE http://localhost:8081/user/deleteUser/572be339901385e42868f36b" to pass the id

app.delete('/user/deleteUser/:userId', function (req, res) {
    console.log('deleteUser()/:userID got called... : ' + req.params.userId);

    personModel.findByIdAndRemove(req.params.userId, function (err, whatIsThis) {
        if(err) {
            console.log(err);
            throw err;
        } else {
            console.log('delete worked on id = ' + req.params.userId);
        }
    });

    res.sendStatus(200);
});


