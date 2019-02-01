const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://blaze-togglz.firebaseio.com',
});

const app = require('express')();

const stripe = require('stripe')(functions.config().stripe_test.key);
const upgradeSignature = functions.config().stripe_test.signatures.upgrade;
const downgradeSignature = functions.config().stripe_test.signatures.downgrade;

const store = admin.firestore();
store.settings({ timestampsInSnapshots: true });

app.use(require('cors')({ origin: true }));
app.use(require('body-parser').raw({ type: '*/*' }));

app.post('/upgrade', (req, res) => {
  const event = stripe.webhooks.constructEvent(req.rawBody, req.header('stripe-signature'), upgradeSignature);
  const userId = event.data.object.client_reference_id;

  store
    .collection('plans')
    .doc(userId)
    .update({
      current: 'pro',
      subscription: event.data.object.subscription,
    })
    .then(() => res.send({ received: true }))
    .catch((e) => {
      console.error('/upgrade', e);
      res.send(500, e);
    });
});

app.delete('/subscriptions/:uid', (req, res) => {
  const uid = req.params.uid;

  store
    .collection('plans')
    .doc(uid)
    .get()
    .then((planSnapshot) => {
      const plan = planSnapshot.data();
      stripe.subscriptions.del(plan.subscription, (err) => {
        if (err) {
          console.error('/subscriptions', err);
          return res.send(502, err);
        }
        res.send(204);
      });
    })
    .catch((e) => {
      console.error('/subscriptions', e);
      res.send(500, e);
    });
});

app.post('/downgrade', (req, res) => {
  const event = stripe.webhooks.constructEvent(req.rawBody, req.header('stripe-signature'), downgradeSignature);
  const subscriptionId = event.data.object.id;

  store
    .collection('plans')
    .where('subscription', '==', subscriptionId)
    .get()
    .then((plansSnapshot) => {
      if (plansSnapshot.empty) {
        console.error('/downgrade', 'SubscriptionId not found', subscriptionId);
        return res.send(400);
      }

      plansSnapshot.docs[0].ref
        .update({
          current: 'starter',
          subscription: admin.firestore.FieldValue.delete(),
        })
        .then(() => res.send({ received: true }))
        .catch((e) => {
          console.error('/downgrade', e);
          res.send(500, e);
        });
    });
});

exports.plans = functions.https.onRequest(app);
