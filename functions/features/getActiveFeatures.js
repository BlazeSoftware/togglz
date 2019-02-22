const applyConditions = (feature, payload) => {
  if (!feature.conditions || feature.conditions.length === 0) return true;
  for (let i = 0; i < feature.conditions.length; i++) {
    const condition = feature.conditions[i];
    const value = payload[condition.prop];

    if (eval(`${value} ${condition.operator} ${condition.target}`) === false) {
      return false;
    }
  }
  return true;
};

module.exports = async (store, req) => {
  const environment = req.query.environment;

  const featuresSnapshot = await store
    .collection('features')
    .where('owner', '==', req.uid)
    .get();

  return featuresSnapshot.docs.reduce((activeFeatures, f) => {
    const feature = f.data();
    let active = environment ? feature.environments[environment] : feature.active;
    if (active) active = applyConditions(feature, req.body);
    if (feature.multivariate) {
      activeFeatures[feature.key] = active ? feature.multivariate.activeValue : feature.multivariate.inactiveValue;
    } else if (active) {
      activeFeatures[feature.key] = true;
    }
    return activeFeatures;
  }, {});
};
