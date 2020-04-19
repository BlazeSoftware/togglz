import services from '../services';

export default async ({ user, featureSnapshot, selectedEnvironment }, active) => {
  const feature = featureSnapshot.data();

  if (selectedEnvironment) {
    const environments = { ...feature.environments };
    environments[selectedEnvironment] = active;
    await featureSnapshot.ref.update({
      environments,
    });
  } else {
    await featureSnapshot.ref.update({
      active,
    });
  }

  services.publishWebhook(user, {
    action: 'feature:toggle',
    environment: selectedEnvironment || 'default',
    feature: {
      name: feature.name,
      key: feature.key,
      active,
    },
  });
};
