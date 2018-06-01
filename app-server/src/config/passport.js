// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const passport = require('passport');
const User = require('../models/user');

require('./strategies/local.js');
require('./strategies/jwt.js');

// Use Passport's 'serializeUser' method to serialize the user id
passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});

// Use Passport's 'deserializeUser' method to load the user document
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser');
  User.findOne(
    {
      _id: id
    },
    '-password -salt',
    function(err, user) {
      done(err, user);
    }
  );
});
