const amqp = require('amqplib');
const config = require('../config/config');

// Create connection to AMQP server
class EmailService {
  constructor() {}

  async connect() {
    try {
      this.connection = await amqp.connect(config.get('amqp:uri'));
      console.log('Connect to email service queue:', config.get('amqp:uri'));

      await this.createChannel();
      await this.sendEmail();
    } catch (err) {
      console.trace('Email service queue connect failed: ', err);
    }
  }
  async createChannel() {
    try {
      this.channel = await this.connection.createChannel();
      this.channel.assertQueue(config.get('amqp:queue'), { durable: false });
      console.log('Create channel successfully');
    } catch (err) {
      console.trace('Create channel failed: ', err);
    }
  }

  async publish(content) {
    try {
      await this.channel.sendToQueue(
        config.get('amqp:queue'),
        Buffer.from(JSON.stringify(content)),
        {
          // Store queued elements on disk
          persistent: true,
          contentType: 'application/json'
        }
      );
    } catch (err) {
      console.trace('Publish message failed: ', err);
    }
  }

  async sendEmail() {
    try {
      for (let i = 0; i < 100; i++) {
        await this.publish({
          to: 'recipient@example.com',
          subject: 'Test message #' + i,
          text: 'hello world!'
        });
      }
    } catch (err) {
      console.trace('Send email failed: ', err);
    }
  }
}

module.exports = new EmailService();
