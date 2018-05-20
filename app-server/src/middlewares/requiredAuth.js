'use strict';
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const fs = require('fs');
const path = require('path');
const TokenManager = require('../utils/tokenManager');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  try {
    // const cert = fs.readFileSync(path.join(__dirname, '/../../keys/public_key.pem')); // get public key
    const cert = TokenManager.keys.public_key;
    // decode the token using a secret key-phrase
    return jwt.verify(token, cert, { algorithm: 'RS256'}, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) {
        return res.status(401).json({
          message: `JWT Error: ${err}`
        });
      }

      const userId = decoded.sub;

      // check if a user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          return res.status(401).end();
        }

        return next();
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
