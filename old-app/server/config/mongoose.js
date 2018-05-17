const mongoose = require('mongoose');
const config = require('./config.js');


mongoose.connect(config.get("db:uri"), config.get("db:options")).then(
  () => {  console.log('Connect to database:', config.get("db:uri"));},
  err => { console.error('Mongoose ERROR:', err);}
);
