const amqp = require('amqplib');
const config = require('../config/config');

// Create connection to AMQP server
class EmailService {
  constructor() {}

  async connect() {
    try {
      this.connection = await amqp.connect(config.get('amqp'));
      console.log('Connect to email service queue:', config.get('amqp'));
    } catch (err) {
      console.trace('Email service queue connect failed: ', err);
    }
  }
  async createChannel() {
    try {
        this.channel = await this.connection.createChannel();
        console.log('Create channel successfully', config.get('amqp'));
      } catch (err) {
        console.trace('Email service queue connect failed: ', err);
      }
  }
}

module.exports = new EmailService();
