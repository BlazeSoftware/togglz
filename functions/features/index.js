const admin = require('firebase-admin');

module.exports = (store) => {
  const app = require('express')();

  app.use(require('cors')({ origin: true }));
  app.use(require('body-parser').raw({ type: '*/*' }));

  app
    .route('/:apiKey')
    .all(async (req, res, next) => {
      if (!req.params.apiKey) {
        console.error('/features', 'No api key');
        return res.send(400, 'No api key');
      }

      try {
        const settingsSnapshot = await store
          .collection('settings')
          .where('webAPIKey', '==', req.params.apiKey)
          .get();

        if (settingsSnapshot.empty) {
          console.error('/features', 'API key not found');
          return res.send(404);
        }

        const settings = settingsSnapshot.docs[0];
        req.uid = settings.ref.id;

        const planSnapshot = await store
          .collection('plans')
          .doc(req.uid)
          .get();

        let apiCalls = settings.data().apiCalls;
        let apiMonthStart = settings.data().apiMonthStart;
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        if (!apiMonthStart || apiMonthStart.toDate() < monthAgo) {
          apiCalls = 0;
          apiMonthStart = admin.firestore.FieldValue.serverTimestamp();
        }

        if (planSnapshot.data().current === 'starter' && apiCalls >= 1000) {
          return res.send(403);
        }

        await settings.ref.update({
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
      const environment = req.query.environment;

      try {
        const featuresSnapshot = await store
          .collection('features')
          .where('owner', '==', req.uid)
          .get();

        const activeFeatures = featuresSnapshot.docs
          .filter((fs) => {
            const feature = fs.data();
            return environment ? feature.environments[environment] : feature.active;
          })
          .map((f) => f.data().key);

        res.send(activeFeatures);
      } catch (e) {
        console.error('/features', e);
        res.send(500, e);
      }
    });

  return app;
};
