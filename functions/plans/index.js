const functions = require('firebase-functions');

module.exports = (admin, store) => {
  const app = require('express')();

  const stripe = require('stripe')(functions.config().stripe.key);
  const upgradeSignature = functions.config().stripe.signatures.upgrade;
  const downgradeSignature = functions.config().stripe.signatures.downgrade;

  app.use(require('cors')({ origin: true }));
  app.use(require('body-parser').raw({ type: '*/*' }));

  app.post('/upgrade', async (req, res) => {
    const event = stripe.webhooks.constructEvent(req.rawBody, req.header('stripe-signature'), upgradeSignature);
    const userId = event.data.object.client_reference_id;

    try {
      await store
        .collection('plans')
        .doc(userId)
        .update({
          current: 'pro',
          subscription: event.data.object.subscription,
        });
      return res.send({ received: true });
    } catch (e) {
      console.error('/upgrade', e);
      res.send(500, e);
    }
  });

  app.delete('/subscriptions/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
      const planSnapshot = await store
        .collection('plans')
        .doc(uid)
        .get();

      const plan = planSnapshot.data();
      stripe.subscriptions.del(plan.subscription, (err) => {
        if (err) {
          console.error('/subscriptions', err);
          return res.send(502, err);
        }
        res.send(204);
      });
    } catch (e) {
      console.error('/subscriptions', e);
      res.send(500, e);
    }
  });

  app.post('/downgrade', async (req, res) => {
    const event = stripe.webhooks.constructEvent(req.rawBody, req.header('stripe-signature'), downgradeSignature);
    const subscriptionId = event.data.object.id;

    try {
      const plansSnapshot = await store
        .collection('plans')
        .where('subscription', '==', subscriptionId)
        .get();

      if (plansSnapshot.empty) {
        console.error('/downgrade', 'SubscriptionId not found', subscriptionId);
        return res.send(400);
      }

      await plansSnapshot.docs[0].ref.update({
        current: 'starter',
        subscription: admin.firestore.FieldValue.delete(),
      });

      res.send({ received: true });
    } catch (e) {
      console.error('/downgrade', e);
      res.send(500, e);
    }
  });

  return app;
};
