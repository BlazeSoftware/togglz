const admin = require('firebase-admin');
const getActiveFeatures = require('./getActiveFeatures');

module.exports = (store) => {
  const app = require('express')();

  app.use(require('cors')({ origin: true }));
  app.use(require('body-parser').raw({ type: '*/*' }));

  app
    .route('/features/:apiKey')
    .all(async (req, res, next) => {
      if (!req.params.apiKey) {
        console.error('/features', 'No api key');
        return res.send(400, 'No api key');
      }

      try {
        const settingsSnapshot = await store.collection('settings').where('webAPIKey', '==', req.params.apiKey).get();

        if (settingsSnapshot.empty) {
          console.error('/features', 'API key not found');
          return res.send(404);
        }

        const settings = settingsSnapshot.docs[0].data();
        if (req.query.environment) {
          if (!settings.environments || !settings.environments.includes(req.query.environment)) {
            return res.send({});
          }
        }

        req.uid = settingsSnapshot.docs[0].ref.id;

        const plansSnapshot = await store.collection('plans').doc(req.uid).get();
        const plan = plansSnapshot.data();

        let apiCalls = plan.apiCalls;
        let apiMonthStart = plan.apiMonthStart;
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        if (!apiMonthStart || apiMonthStart.toDate() < monthAgo) {
          apiCalls = 0;
          apiMonthStart = admin.firestore.FieldValue.serverTimestamp();
        }

        if (plan.current === 'starter' && apiCalls >= 10000) {
          return res.send(403);
        }

        await plansSnapshot.ref.update({
          apiCalls: (apiCalls || 0) + 1,
          apiMonthStart,
        });
      } catch (e) {
        console.error('/features', e);
        return res.send(500, e);
      }

      next();
    })
    .get(async (req, res) => {
      try {
        res.send(await getActiveFeatures(store, req));
      } catch (e) {
        console.error('/features', e);
        res.send(500, e);
      }
    })
    .post(async (req, res) => {
      try {
        res.send(await getActiveFeatures(store, req));
      } catch (e) {
        console.error('/features', e);
        res.send(500, e);
      }
    });

  return app;
};
