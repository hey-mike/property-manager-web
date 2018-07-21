// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const User = require('../models/user');
const passport = require('passport');
const tokenManager = require('../utils/tokenManager');
const validationResult = require('../utils/validationResult');
// const { validationResult } = require('express-validator/check');

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
    return res.status(422).json({
      message: errors.array()[0]
    });
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
      return res.status(500).json({
        message: `Internal Server Error: ${err}`
      });
    }
  })(req, res, next);
};

exports.create = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.mapped()
    });
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: 'Email has been taken, please use another one'
      });
    }
  } catch (err) {
    if (err) {
      return res.status(500).json({
        message: err.message()
      });
    }
  }
  // Create a new 'User' model instance
  const newUser = new User(req.body);

  // Set the user provider property
  newUser.provider = 'local';

  // Try saving the new user document
  try {
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    // Use the error handling method to get the error message
    const message = getErrorMessage(err);

    return res.status(400).json({
      message: message
    });
  }
};
