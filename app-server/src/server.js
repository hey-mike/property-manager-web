/**
 * Module dependencies.
 */

const app = require('./app');
// const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const config = require('./config/config.js');
const mongoose = require('./config/mongoose.js');

// connect to mongodb
mongoose.connect();
// connect to elasticsearch
// SearchService.connect();
// connect to email service
// EmailService.connect();

const port = process.env.PORT || config.get('server:port');
app.set('port', port);

app.use(errorHandler());

app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});
process.on('uncaughtException', err => {
  console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', err => {
  console.error('Unhandled Rejection', err);
});
