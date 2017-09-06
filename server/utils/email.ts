import * as dotenv from 'dotenv';

dotenv.config();
const mg = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API,
  domain: process.env.MAILGUN_DOMAIN
});

export default function sendMail(document: any) {
  const data = {
    from: 'Test Email <me@samples.mailgun.org>',
    to: document['email'],
    subject: 'Invitation à Legal',
    text: 'Voici une invitation à Legal: ' +
      process.env.DOMAIN + 'register?token=' +
      document['value']
  }
  if (process.env.NODE_ENV != 'test') {
    mg.messages().send(data, (err: any, body: any) => {
      if (err) {
        console.error(err);
      }
      console.log(body);
    });
  }
}