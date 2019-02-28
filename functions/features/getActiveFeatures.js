const applyConditions = (feature, payload) => {
  // if no conditions on toggle return active
  if (!feature.conditions || feature.conditions.length === 0) return true;

  // if toggle has conditions but no conditions in request return inactive
  if (Object.keys(payload).length === 0) return false;

  for (let i = 0; i < feature.conditions.length; i++) {
    const condition = feature.conditions[i];

    // if there is no corresponding condition in the request return inactive
    if (typeof payload[condition.prop] === 'undefined') return false;

    const incomingValue = payload[condition.prop].toString();
    const operations = {
      '=': incomingValue === condition.value,
      '!=': incomingValue !== condition.value,
      '<': incomingValue < condition.value,
      '<=': incomingValue <= condition.value,
      '>': incomingValue > condition.value,
      '>=': incomingValue >= condition.value,
    };

    if (operations[condition.operator] === false) {
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
