/**
 * Created by jaejo on 6/3/16.
 */

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
//
// // 0) setup a mongodb connection
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     // connected!
//     console.log("connected to mongodb \'test\' database & \'person\' collection!")
// });

// 1) define a schema
var personSchema = mongoose.Schema ({
    firstName: String,
    lastName: String,
    cellNumber: String
});

// var personModel = mongoose.model('Cellphone', personSchema);

module.exports = mongoose.model('Cellphone', personSchema);