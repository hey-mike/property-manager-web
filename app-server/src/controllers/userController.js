// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const User = require('../models/user');
const passport = require('passport');
const { validationResult } = require('express-validator/check');
const tokenManager = require('../utils/tokenManager');

// Create a new error handling controller method
const getErrorMessage = function(err) {
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

exports.signIn = function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.error(info);
      return res.status(400).json(info);
    }

    const payload = {
      sub: user._id
    };

    // const token = generateToken(payload);
    const token = tokenManager.generateToken(payload);
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
};
// Create a new controller method that creates new 'regular' users
exports.create = function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.mapped()
    });
  }

  const { email } = req.body;
  User.findOne({ email: email }, (err, user) => {
    // If an error occurs continue to the next middleware
    if (err) {
      return res.status(500).json({
        message: err.message()
      });
    }
    // If a user was not found, continue to the next middleware with an error message
    if (user) {
      return res.status(400).json({
        message: 'Email has been taken, please use another one'
      });
    }

    // Create a new 'User' model instance
    const newUser = new User(req.body);

    // Set the user provider property
    newUser.provider = 'local';

    // Try saving the new user document
    newUser.save(function(err) {
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
      const token = tokenManager.generateToken(payload);

      return res.status(200).json({
        message: 'User was created successfully',
        token
      });
    });
  });
};

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function(req, profile, done) {
  // Try finding a user document that was registered using the current OAuth provider
  User.findOne(
    {
      provider: profile.provider,
      providerId: profile.providerId
    },
    function(err, user) {
      // If an error occurs continue to the next middleware
      if (err) {
        return done(err);
      } else {
        // If a user could not be found, create a new user, otherwise, continue to the next middleware
        if (!user) {
          // Set a possible base username
          const possibleUsername =
            profile.username ||
            (profile.email ? profile.email.split('@')[0] : '');

          // Find a unique available username
          User.findUniqueUsername(possibleUsername, null, function(
            availableUsername
          ) {
            // Set the available user name
            profile.username = availableUsername;

            // Create the user
            user = new User(profile);

            // Try saving the new user document
            user.save(function(err) {
              // Continue to the next middleware
              return done(err, user);
            });
          });
        } else {
          // Continue to the next middleware
          return done(err, user);
        }
      }
    }
  );
};
