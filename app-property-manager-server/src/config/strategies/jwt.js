// Invoke 'strict' JavaScript mode
'use strict';

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../../models/user");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('payload received', jwt_payload);
  User.findOne({
    id: jwt_payload.sub
  }, function (err, user) {
    // If a user was not found, continue to the next middleware with an error message
    if (!user) {
      return done(null, false, {
        message: 'Unknown user'
      });
    }

    // If the passport is incorrect, continue to the next middleware with an error message
    if (!user.authenticate(password)) {
      return done(null, false, {
        message: 'Invalid password'
      });
    }

    // Otherwise, continue to the next middleware with the user object
    return done(null, user);
  });
}));
