const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://blaze-togglz.firebaseio.com',
});

const store = admin.firestore();
store.settings({ timestampsInSnapshots: true });

const plansApi = require('./plans')(admin, store);
const featuresApi = require('./features')(store);

exports.plans = functions.https.onRequest(plansApi);
exports.features = functions.https.onRequest(featuresApi);
