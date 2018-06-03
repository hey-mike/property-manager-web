const { validationResult } = require('express-validator/check');

const result = validationResult.withDefaults({
  formatter: ({ msg, param }) => {
    return `${param}: ${msg}`;
  }
});

module.exports = result;
