import firebase, { store } from '@/firebase/firebase';

export default async (user, environment) => {
  const settingsRef = await store.collection('settings').doc(user.uid);

  const featuresSnapshot = await store
    .collection('features')
    .where('owner', '==', user.uid)
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
