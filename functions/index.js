const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./service-account.json')),
  databaseURL: 'https://blaze-togglz.firebaseio.com',
});

const app = require('express')();

const stripe = require('stripe')(functions.config().stripe_test.key);
const endpointSecret = functions.config().stripe_test.signature;

app.use(require('cors')({ origin: true }));
app.use(require('body-parser').raw({ type: '*/*' }));

app.post('/upgrade', (req, res) => {
  const event = stripe.webhooks.constructEvent(req.rawBody, req.header('stripe-signature'), endpointSecret);
  const userId = event.data.object.client_reference_id;

  admin
    .firestore()
    .collection('plans')
    .doc(userId)
    .update({
      current: 'pro',
    })
    .then(() => res.send({ received: true }));
});

app.get('/ping', (req, res) => res.send("it's alive!"));

exports.plans = functions.https.onRequest(app);
