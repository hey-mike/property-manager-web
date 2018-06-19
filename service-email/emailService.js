const amqp = require('amqplib');
const config = require('./config/config');
const nodemailer = require('nodemailer');

// Create connection to AMQP server
class EmailService {
  constructor() {}

  async connect() {
    try {
      this.connection = await amqp.connect(config.get('amqp:uri'));
      this.channel = await this.connection.createChannel();
      console.log('Connect to email service queue:', config.get('amqp:uri'));

      await this.consume();
    } catch (err) {
      console.trace('Email service queue connect failed: ', err);
    }
  }

  async consume() {
    try {
      const result = await this.channel.assertQueue(config.get('amqp:queue'), {
        durable: true
      });

      //  don't dispatch a new message to a worker until it has processed and acknowledged the previous one.
      //  Instead, it will dispatch it to the next worker that is not still busy.
      await this.channel.prefetch(1);

      if (result) {
        this.channel.consume(config.get('amqp:queue'), data => {
          if (data !== null) {
            // Decode message contents
            let message = JSON.parse(data.content.toString());

            console.log(message);
            this.channel.ack(data);
          }
        });
      }
    } catch (err) {
      console.trace('Create channel failed: ', err);
    }
  }
}

module.exports = new EmailService();
