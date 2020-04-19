import { store } from '@/firebase/firebase';
import services from '../services';

export default async ({ user, name, key, featureSnapshot, type, activeValue, inactiveValue, conditions }) => {
  const existingFeatures = await store
    .collection('features')
    .where('owner', '==', user.uid)
    .where('key', '==', key)
    .get();

  if (
    !existingFeatures.empty &&
    !(existingFeatures.docs.length === 1 && existingFeatures.docs[0].ref.id == featureSnapshot.ref.id)
  )
    throw { code: 'storage/document-exists' };

  let multivariate = null;
  if (type === 'multivariate' && activeValue && inactiveValue) {
    multivariate = { activeValue, inactiveValue };
  }

  await featureSnapshot.ref.update({
    name,
    key,
    multivariate,
    conditions,
  });

  services.publishWebhook(user, {
    action: 'feature:update',
    feature: {
      name,
      key,
      multivariate,
      conditions,
      active: false,
    },
  });
};
