import firebase, { store } from '@/firebase/firebase';

export default async (userId, name, key) => {
  const existingFeature = await store
    .collection('features')
    .where('owner', '==', userId)
    .where('key', '==', key)
    .get();

  if (!existingFeature.empty) throw { code: 'storage/document-exists' };

  const settingsSnapshot = await store
    .collection('settings')
    .doc(userId)
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
      owner: userId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
