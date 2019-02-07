import firebase, { store } from '@/firebase/firebase';

export default async (userId, environment) => {
  const settingsRef = await store.collection('settings').doc(userId);

  const featuresSnapshot = await store
    .collection('features')
    .where('owner', '==', userId)
    .get();

  const batch = store.batch();
  featuresSnapshot.forEach((f) => {
    const environments = f.data().environments || {};
    delete environments[environment];
    batch.update(f.ref, {
      environments,
    });
  });
  await batch.commit();

  await settingsRef.update({
    environments: firebase.firestore.FieldValue.arrayRemove(environment),
  });
};
