const amqp = require('amqplib');
const config = require('./config/config');
const nodemailer = require('nodemailer');

// Create connection to AMQP server
class EmailService {
  constructor() {}

  async connect() {
    try {
      this.connection = await amqp.connect(config.get('amqp:uri'));
      console.log('Connect to email service queue:', config.get('amqp:uri'));

      await this.createChannel();
      await this.consume();
    } catch (err) {
      console.trace('Email service queue connect failed: ', err);
    }
  }
  async createChannel() {
    try {
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(config.get('amqp:queue'), {
        durable: true
      });
      // Only request 1 unacked message from queue
      // This value indicates how many messages we want to process in parallel
      const result = await this.channel.prefetch(1);
      console.log('Create channel successfully', result);
    } catch (err) {
      console.trace('Create channel failed: ', err);
    }
  }

  async consume() {
    const test = this.channel;
    this.channel.consume(config.get('amqp:queue'), data => {
      if (data === null) {
        return;
      }
      // Decode message contents
      let message = JSON.parse(data.content.toString());

      console.log(message);
      test.ack('successfully');
    });
  }
}

module.exports = new EmailService();
