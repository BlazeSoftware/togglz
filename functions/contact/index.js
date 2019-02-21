const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');

module.exports = () => {
  const app = require('express')();

  app.use(require('cors')({ origin: true }));
  app.use(require('body-parser').raw({ type: '*/*' }));

  app.post('/contact/send', async (req, res) => {
    if (!req.body.email || !req.body.from || !req.body.message) {
      return res.send(400, 'Form is incomplete');
    }

    if (req.body.message.length > 3000) {
      return res.send(413, 'Message is too long, max length 5000 characters');
    }

    const SENDGRID_API_KEY = functions.config().sendgrid.key;
    sendgrid.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: 'gregory.pratt@me.com',
      from: {
        name: req.body.from,
        email: 'contact@togglz.com',
      },
      replyTo: req.body.email,
      subject: 'Contact via Togglz',
      html: `
        <p><strong>From:</strong> ${req.body.from} <${req.body.email}></p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
      `,
    };

    sendgrid
      .send(msg)
      .then(() => {
        return res.send(200);
      })
      .catch((error) => {
        console.error(error);
        return res.send(500, error);
      });
  });

  return app;
};
