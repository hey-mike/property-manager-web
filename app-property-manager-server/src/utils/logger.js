const winston = require("winston");
const fs = require('fs');
const path = require('path');


const LOG_DIR = 'logs'; // directory path you want to set
const LOG_DIR_FILE = 'all-logs.log';
if (!fs.existsSync(LOG_DIR)) {
  // Create the directory if it does not exist
  fs.mkdirSync(LOG_DIR);
}
const filename = path.join(LOG_DIR, LOG_DIR_FILE);

let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: filename,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};


module.exports = logger;
