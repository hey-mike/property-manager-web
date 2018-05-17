// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	server: {
		port: 8080
	},
	db: {
		uri: 'mongodb://admin:admind@ds163053.mlab.com:63053/ems-mern',
		options: {
			useMongoClient: true
		}
	}
};
