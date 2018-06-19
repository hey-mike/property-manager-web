var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/send', function (req, res) {
  // res.send('POST request to the homepage')
  var mail = require('./nodeMailerWithTemp');
  return mail.sendPasswordReset('RECEIPIENT EMAIL', 'RECIENPIENT USERNAME','RECEIPIENT NAME','http://yourdomain.com/some-password-links');
})

module.exports = app;
