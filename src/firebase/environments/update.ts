import { store } from '@/firebase/firebase';

export default async (userId, originalEnvironment, environment) => {
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
    environments[environment] = environments[originalEnvironment];
    delete environments[originalEnvironment];
    batch.update(f.ref, {
      environments,
    });
  });
  await batch.commit();

  const environments = [...settings.environments];
  environments[environments.indexOf(originalEnvironment)] = environment;
  settingsRef.update({
    environments,
  });
};
