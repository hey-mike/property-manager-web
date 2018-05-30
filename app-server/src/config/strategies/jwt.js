// Invoke 'strict' JavaScript mode
"use strict";

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const tokenManager = require('../../utils/tokenManager');
const User = require("../../models/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenManager.keys.public_key;
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({
    id: jwt_payload.sub
  }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    return user ? done(null, user) : done(null, false);
  });
}));