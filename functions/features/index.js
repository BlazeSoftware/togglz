const admin = require('firebase-admin');

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
        const settingsSnapshot = await store
          .collection('settings')
          .where('webAPIKey', '==', req.params.apiKey)
          .get();

        if (settingsSnapshot.empty) {
          console.error('/features', 'API key not found');
          return res.send(404);
        }

        const settings = settingsSnapshot.docs[0];
        if (req.query.environment) {
          if (!settings.data().environments || !settings.data().environments.includes(req.query.environment)) {
            return res.send({});
          }
        }

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

        if (planSnapshot.data().current === 'starter' && apiCalls >= 10000) {
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

        const activeFeatures = featuresSnapshot.docs.reduce((activeFeatures, f) => {
          const feature = f.data();
          const active = environment ? feature.environments[environment] : feature.active;
          if (feature.multivariate) {
            activeFeatures[feature.key] = active
              ? feature.multivariate.activeValue
              : feature.multivariate.inactiveValue;
          } else if (active) {
            activeFeatures[feature.key] = true;
          }
          return activeFeatures;
        }, {});

        res.send(activeFeatures);
      } catch (e) {
        console.error('/features', e);
        res.send(500, e);
      }
    });

  return app;
};
