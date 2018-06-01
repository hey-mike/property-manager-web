/**
 * Module dependencies.
 */

const app = require('./app');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const config = require('./config/config.js');

// connect to database
mongoose.connect(config.get('db:uri'), config.get('db:options')).then(
  () => {
    console.log('Connect to database:', config.get('db:uri'));
  },
  err => {
    console.log(config.get('db:uri'));
    console.error('Mongoose ERROR:', err);
  }
);

const port = process.env.PORT || config.get('server:port');
app.set('port', port);

app.use(errorHandler());

app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
