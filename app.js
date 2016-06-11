var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// routes requests
var routes = require('./routes/index');
var users = require('./routes/users');

// actual request handler
var api = require('./cellphone/api/userapi');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/user', users); // http://localhost:8081/user/listUsers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//
// begin application @port 8081

app.listen(8081, function () {
  console.log("express started at port 8081 ^-^");
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// setup a mongodb connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb \'test\' database")
});

