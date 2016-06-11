var PersonModel = require('../model/personModel.js');

function listUsers(req, res) {
    console.log('in listUsers()...');

    PersonModel.find().lean().exec( function(err, persons) {
        if (err) {
            return handleErr(err);
        }

        if (null !== persons) {
            console.log('* persons: ' + JSON.stringify(persons));
            persons.forEach(function (person) {
                console.log('[loop] %s %s has a cell phone number %s.', person.firstName, person.lastName, person.cellNumber)
            });
            
            return res.send(JSON.stringify(persons));
        }
    });
}


function updateUser(req, res) {
    console.log('in updateUser()/:userID: ' + req.params.userId);
    //console.log('in updateUser()...');
    console.log(req.body);

    var id2update = { "_id": req.params.userId };
    PersonModel.update(id2update, { $set: {firstName: req.body.firstName, lastName: req.body.lastName}}, {upsert:false}, callback4update);

    function callback4update (err, numAffected) {
        // numAffected is the number of updated documents
        if (err) {
            console.log(err);
            return;
        }
        console.log(numAffected + " row(s) updated successfully!")
    };

    //
    res.sendStatus(200);
}


function addUser(req, res) {
    console.log("in addUser()...");
    console.log(req.body.user);

    // add this user
    var person = new PersonModel();
    person.firstName = req.body.user.firstName;
    person.lastName = req.body.user.lastName;
    person.cellNumber = req.body.user.cellNumber;

    person.save(function(err, personSaved){
        if(err){
            console.log(err);
            throw err;
        } else {
            console.log('saved a new person, ' + req.body.user.firstName);
        }
    });

    res.sendStatus(200);
}


function deleteUser(req, res) {
    console.log('in deleteUser()/:userID: ' + req.params.userId);

    PersonModel.findByIdAndRemove(req.params.userId, function (err, whatIsThis) {
        if(err) {
            console.log(err);
            throw err;
        } else {
            console.log('delete worked on id = ' + req.params.userId);
        }
    });

    res.sendStatus(200);
}


exports.listUsers = listUsers;
exports.updateUser = updateUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;