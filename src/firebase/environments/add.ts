import firebase, { store } from '@/firebase/firebase';

export default async (userId, environment) => {
  const settingsRef = await store.collection('settings').doc(userId);
  const settingsSnapshot = await settingsRef.get();
  const settings = settingsSnapshot.data();

  if (settings.environments.indexOf(environment) >= 0) {
    throw { code: 'settings/environment-exists' };
  }

  const featuresSnapshot = await store
    .collection('features')
    .where('owner', '==', userId)
    .get();

  const batch = store.batch();
  featuresSnapshot.forEach((f) => {
    const environments = f.data().environments || {};
    environments[environment] = false;
    batch.update(f.ref, {
      environments,
    });
  });
  await batch.commit();

  await settingsRef.update({
    environments: firebase.firestore.FieldValue.arrayUnion(environment),
  });
};
