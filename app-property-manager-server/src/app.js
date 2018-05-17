const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const expressValidator = require("express-validator");
// const passport = require('passport');
const passportConfig = require('./config/passport');
const logger = require('./utils/logger');
const authCheckMiddleware = require('./middlewares/requiredAuth');

const auth = require('./routes/auth');
const index = require('./routes/index');
const user = require('./routes/user');
const transaction = require('./routes/transaction');
const mock = require('./routes/mock');


const app = express();
// app.use(express.static(path.join(__dirname, 'public')));
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
// app.use(passport.initialize());
passportConfig(app);
// pass the authorization checker middleware
// app.use('/api', authCheckMiddleware);

// add routes
app.use('/', index);
app.use('/auth', auth);
app.use('/api/user', user);
app.use('/api/transaction', transaction);
app.use('/mock', mock);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

module.exports = app;
