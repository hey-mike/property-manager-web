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

const index = require('./routes/index');
const auth = require('./routes/auth');
const user = require('./routes/user');
const tenant = require('./routes/tenant');
const search = require('./routes/search');
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
    extended: true
  })
);
app.use(expressValidator());
app.use(passport.initialize());

// add routes
app.use('/', index);
app.use('/api/auth', auth);
app.use('/api/user', passport.authenticate('jwt'), user);
app.use('/api/tenant', tenant);
app.use('/api/search', search);
app.use('/api/transaction', passport.authenticate('jwt'), transaction);
app.use('/api/mock', mock);

module.exports = app;
