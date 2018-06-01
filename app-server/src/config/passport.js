// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const tokenManager = require('../utils/tokenManager');
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenManager.publicKey;
opts.algorithm = 'RS256';
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne(
      {
        id: jwt_payload.sub
      },
      (err, user) => {
        if (err) {
          return done(err, false);
        }
        return user ? done(null, user) : done(null, false);
      }
    );
  })
);

// // Create the Local strategy configuration method
// module.exports = function () {
// Use the Passport's Local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    function(email, password, done) {
      // Use the 'User' model 'findOne' method to find a user with the current username
      User.findOne({ email: email }, (err, user) => {
        // If an error occurs continue to the next middleware
        if (err) {
          return done(err);
        }
        // If a user was not found, continue to the next middleware with an error message
        if (!user) {
          return done(null, false, {
            message: 'Unknown user'
          });
        }

        // If the passport is incorrect, continue to the next middleware with an error message
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'Password is incorrect'
          });
        }

        // Otherwise, continue to the next middleware with the user object
        return done(null, user);
      });
    }
  )
);
