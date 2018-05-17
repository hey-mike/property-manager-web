const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const expressValidator = require("express-validator");
const passport = require('passport');
const logger = require('../utils/logger');
const authCheckMiddleware = require('../middlewares/requiredAuth');

const auth = require('../routes/auth');
const index = require('../routes/index');
const users = require('../routes/users');
const transaction = require('../routes/transaction');
const mock = require('../routes/mock');


const app = express();
app.use(express.static(path.join(__dirname, '/../../dist')));
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
app.use('/api', authCheckMiddleware);

// add routes
app.use('/', index);
app.use('/auth', auth);
app.use('/api/users', users);
app.use('/api/transaction', transaction);
app.use('/mock', mock);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

module.exports = app;
