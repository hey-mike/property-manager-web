'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const compression = require('compression');
const expressValidator = require('express-validator');

require('./config/passport');

const auth = require('./routes/auth');
const index = require('./routes/index');
const user = require('./routes/user');
const transaction = require('./routes/transaction');
const mock = require('./routes/mock');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(expressValidator());
app.use(passport.initialize());

// add routes
app.use('/', index);
app.use('/auth', auth);
app.use('/api/user', passport.authenticate('jwt'), user);
app.use('/api/transaction', passport.authenticate('jwt'), transaction);
app.use('/mock', mock);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err =  new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
