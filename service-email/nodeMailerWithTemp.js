var sender = 'TEST_EMAIL'; // The emailto use in sending the email(Change the @ symbol to %40 or do a url encoding )
var password = 'PASS'; // password of the email to use

var nodeMailer = require('nodemailer');
var EmailTemplate = require('email-templates');

var transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: password
  }
});

const mailer = new EmailTemplate({
  views: { root: './templates' },
  from: 'hello@yourdomain.com',
  send: true,
  transport: transporter
});

exports.sendPasswordReset = async function(email, username, name, tokenUrl) {
  return mailer.send({
    template: 'reset-password',
    message: {
      to: email
    },
    locals: {
      name: 'Michael'
    }
  });
  // mailer
  //   .send({
  //     template: 'reset-password',
  //     message: {
  //       to: email
  //     },
  //     locals: {
  //       name: 'Michael'
  //     }
  //   })
  //   .then(console.log)
  //   .catch(console.error);

  //   // transporter.template
  //   sendResetPasswordLink(
  //     {
  //       to: email,
  //       subject: 'Password Reset - YourDomain.com'
  //     },
  //     {
  //       name: name,
  //       username: username,
  //       token: tokenUrl
  //     },
  //     function(err, info) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Link sent\n' + JSON.stringify(info));
  //       }
  //     }
  //   );
};
