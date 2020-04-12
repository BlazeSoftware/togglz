import setupAccount from './account/setup';
import deleteAccount from './account/delete';
import addFeature from './features/add';
import addEnvironment from './environments/add';
import updateEnvironment from './environments/update';
import deleteEnvironment from './environments/delete';
import generateKey from './api-key/add';
import updateWebhook from './webhook/update';

export default {
  setupAccount,
  deleteAccount,
  addFeature,
  addEnvironment,
  updateEnvironment,
  deleteEnvironment,
  generateKey,
  updateWebhook,
};
