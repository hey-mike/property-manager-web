// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

// Create the Twitter strategy configuration method
module.exports = function() {
	// Use the Passport's Twitter strategy 
	passport.use(new TwitterStrategy({
			consumerKey: config.twitter.clientID,
			consumerSecret: config.twitter.clientSecret,
			callbackURL: config.twitter.callbackURL,
			passReqToCallback: true
		},
		function(req, token, tokenSecret, profile, done) {
			// Set the user's provider data and include tokens
			const providerData = profile._json;
			providerData.token = token;
			providerData.tokenSecret = tokenSecret;

			// Create the user OAuth profile
			const providerUserProfile = {
				fullName: profile.displayName,
				username: profile.username,
				provider: 'twitter',
				providerId: profile.id,
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};
