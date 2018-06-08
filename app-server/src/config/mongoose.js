const mongoose = require('mongoose');
const config = require('./config.js');

class Mongoose {
  constructor() {
    console.log('called');
  }
  async connect() {
    try {
      this.connection = await mongoose.connect(
        config.get('db:uri'),
        config.get('db:options')
      );
      console.log('Connect to database:', config.get('db:uri'));
    } catch (err) {
      console.error('Mongoose ERROR:', err);
    }
  }
  async connectTest() {
    try {
      await mongoose.connect(
        config.get('db:test'),
        config.get('db:options')
      );
      console.log('Connect to database:', config.get('db:test'));
    } catch (err) {
      console.error('Mongoose ERROR:', err);
    }
  }
  async drop() {
      console.log('drop');
    try {
      await this.connection.dropDatabase();
      await this.connection.close();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new Mongoose();
