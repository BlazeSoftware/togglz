import firebase, { store } from '@/firebase/firebase';

export default async (user, name, key) => {
  const existingFeature = await store
    .collection('features')
    .where('owner', '==', user.uid)
    .where('key', '==', key)
    .get();

  if (!existingFeature.empty) throw { code: 'storage/document-exists' };

  const settingsSnapshot = await store
    .collection('settings')
    .doc(user.uid)
    .get();
  const environments = {};
  const settings = settingsSnapshot.data();
  if (settings.environments) {
    settings.environments.forEach((env) => {
      environments[env] = false;
    });
  }

  await store
    .collection('features')
    .doc()
    .set({
      name,
      key,
      active: false,
      environments,
      owner: user.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
