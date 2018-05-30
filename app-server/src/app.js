'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const compression = require('compression');
const expressValidator = require("express-validator");
const initPassport = require('./config/passport');
const logger = require('./utils/logger');
const authCheckMiddleware = require('./middlewares/requiredAuth');

const auth = require('./routes/auth');
const index = require('./routes/index');
const user = require('./routes/user');
const transaction = require('./routes/transaction');
const mock = require('./routes/mock');


const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(morgan("combined", {
  "stream": logger.stream
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
app.use(passport.initialize());
// pass the authorization checker middleware


// add routes
app.use('/', index);
app.use('/auth', auth);
app.use('/api', authCheckMiddleware);
app.use('/api/user', user);
app.use('/api/transaction', transaction);
app.use('/mock', mock);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;