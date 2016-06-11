var express = require('express');
var router = express.Router();

// my customized library
var api = require('../cellphone/api/userapi');


//
// GET test by listing all users
// curl -XGET http://localhost:8081/user/listUsers

router.get('/listUsers', function(req, res) {
  api.listUsers(req, res);
  // res.send('respond with a resource');
});


//
// POST test by updating an user: specify id via a param
// this works w/o body: curl  -XPOST http://localhost:8081/user/updateUser/[id]
// here is a complete request: curl -H "Content-Type: application/json" -XPOST http://localhost:8081/user/updateUser/[id] -d '{"firstName":"Michael", "lastName":"Fox"}'
// : example of [id] is 572be708324025ea28878497

router.post('/updateUser/:userId', function (req, res) {
  api.updateUser(req, res);
});


//
// PUT test by adding user(s)
// this request works: curl -H "Content-Type: application/json" -XPUT http://localhost:8081/user/addUser -d '{"user": {"firstName": "new first name", "lastName": "old last name","cellNumber": "!@#-$%^-&*()"}}'

router.put('/addUser', function(req, res) {
  api.addUser(req, res);
});


//
// DELETE test by deleting auser: specify id via a param
// this works: curl -XDELETE http://localhost:8081/user/deleteUser/[id]
// : example of [id] is 57314f47161807612fd2072a

router.delete('/deleteUser/:userId', function(req, res) {
  api.deleteUser(req, res);
});


module.exports = router;
