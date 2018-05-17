// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	server: {
		port: 8080
	},
	db: {
		uri: 'mongodb://localhost:27017/Store',
		// uri: 'mongodb://michael:michael@ds149905.mlab.com:49905/store',
		// uri: 'mongodb://admin:<PASSWORD>@ems-shard-00-00-n24oi.mongodb.net:27017,ems-shard-00-01-n24oi.mongodb.net:27017,ems-shard-00-02-n24oi.mongodb.net:27017/test?ssl=true&replicaSet=ems-shard-0&authSource=admin',
		options: {
			useMongoClient: true
		}
	}
};
