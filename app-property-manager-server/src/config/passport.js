// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const passport = require('passport');
const User = require("../models/user");
// require('./strategies/local.js');

// Define the Passport configuration method
module.exports = function(app) {
	app.use(passport.initialize());

	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	// Load Passport's strategies configuration files
	require('./strategies/local.js');
	// require('./strategies/twitter.js')();
	// require('./strategies/facebook.js')();
	// require('./strategies/google.js')();
};
// Use Passport's 'serializeUser' method to serialize the user id
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// // Use Passport's 'deserializeUser' method to load the user document
// passport.deserializeUser(function (id, done) {
//   User.findOne({
//     _id: id
//   }, '-password -salt', function (err, user) {
//     done(err, user);
//   });
// });
