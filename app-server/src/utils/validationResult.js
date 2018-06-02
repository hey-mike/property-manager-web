const { validationResult } = require('express-validator/check');

const result = validationResult.withDefaults({
  formatter: ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  }
});

module.exports = result;
