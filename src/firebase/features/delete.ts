import services from '../services';

export default async ({ user, featureSnapshot }) => {
  const feature = featureSnapshot.data();

  await featureSnapshot.ref.delete();

  services.publishWebhook(user, {
    action: 'feature:delete',
    feature,
  });
};
