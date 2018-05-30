/**
 * Module dependencies.
 */

const app = require('./app');
require('./config/mongoose');
const errorHandler = require('errorhandler');
const config = require('./config/config.js');

const port = process.env.PORT || config.get('server:port');
app.set('port', port);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

// process.on('uncaughtException', function(err) {
//     console.log( " UNCAUGHT EXCEPTION " );
//     console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
// });
// app.use(function(err, req, res, next) {
//   console.error(err.message); // Log error message in our server's console
//   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
//   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
// });
