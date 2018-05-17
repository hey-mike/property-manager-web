// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const User = require("../models/user");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  let message = '';

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
        // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};
// /**
//  * Validate the login form
//  *
//  * @param {object} payload - the HTTP body message
//  * @returns {object} The result of validation. Object contains a boolean validation result,
//  *                   errors tips, and a global message for the whole form.
//  */
// function validateLoginForm(payload) {
//     const errors = {};
//     let isFormValid = true;
//     let message = '';

//     if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
//         isFormValid = false;
//         errors.email = 'Please provide your email address.';
//     }

//     if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
//         isFormValid = false;
//         errors.password = 'Please provide your password.';
//     }

//     if (!isFormValid) {
//         message = 'Check the form for errors.';
//     }

//     return {
//         success: isFormValid,
//         message,
//         errors
//     };
// }
const generateToken = (payload) => {
  // sign with RSA SHA256
  const cert = fs.readFileSync(path.join(__dirname, '/../../RS256/jwtRS256.key')); // get private key

  // create a token string
  return jwt.sign(payload, cert, {
    algorithm: 'RS256'
  });
}
exports.signin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }

    const payload = {
      sub: user._id
    };

    const token = generateToken(payload);
    try {

      const data = {
        name: user.name
      };

      return res.status(200).json({
        message: 'You have successfully logged in!',
        token,
        user: data
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: `Internal Server Error: ${err}`
      });
    }
  })(req, res, next);
}
// Create a new controller method that creates new 'regular' users
exports.signup = function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }
    // Create a new 'User' model instance
    const newUser = new User(req.body);

    // Set the user provider property
    newUser.provider = 'local';

    // Try saving the new user document
    newUser.save(function (err) {
      console.error(err);
      // If an error occurs, use flash messages to report the error
      if (err) {
        // Use the error handling method to get the error message
        const message = getErrorMessage(err);

        return res.status(400).json({
          message: message
        });
      }
      const payload = {
        sub: user._id
      };
      const token = generateToken(payload);

      return res.status(200).json({
        message: "User was created successfully",
        token
      });
    });
  })(req, res, next);
};

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function (req, profile, done) {
  // Try finding a user document that was registered using the current OAuth provider
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function (err, user) {
    // If an error occurs continue to the next middleware
    if (err) {
      return done(err);
    } else {
      // If a user could not be found, create a new user, otherwise, continue to the next middleware
      if (!user) {
        // Set a possible base username
        const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

        // Find a unique available username
        User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
          // Set the available user name
          profile.username = availableUsername;

          // Create the user
          user = new User(profile);

          // Try saving the new user document
          user.save(function (err) {
            // Continue to the next middleware
            return done(err, user);
          });
        });
      } else {
        // Continue to the next middleware
        return done(err, user);
      }
    }
  });
};
