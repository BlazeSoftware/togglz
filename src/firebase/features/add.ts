import firebase, { store } from '@/firebase/firebase';
import services from '../services';
import { IFeatureMultivariate } from './interfaces';

export default async ({ user, name, key, type, activeValue, inactiveValue, conditions }) => {
  const existingFeature = await store
    .collection('features')
    .where('owner', '==', user.uid)
    .where('key', '==', key)
    .get();

  if (!existingFeature.empty) throw { code: 'storage/document-exists' };

  const settingsSnapshot = await store.collection('settings').doc(user.uid).get();
  const environments = {};
  const settings = settingsSnapshot.data();
  if (settings.environments) {
    settings.environments.forEach((env) => {
      environments[env] = false;
    });
  }

  let multivariate: IFeatureMultivariate = null;
  if (type === 'multivariate' && activeValue && inactiveValue) {
    multivariate = { activeValue, inactiveValue };
  }

  await store.collection('features').doc().set({
    name,
    key,
    multivariate,
    active: false,
    environments,
    conditions,
    owner: user.uid,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

  services.publishWebhook(user, {
    action: 'feature:add',
    feature: {
      name,
      key,
      multivariate,
      conditions,
      active: false,
    },
  });
};
