import setupAccount from './account/setup';
import deleteAccount from './account/delete';
import updateProfile from './profile/update';
import addFeature from './features/add';
import updateFeature from './features/update';
import deleteFeature from './features/delete';
import addEnvironment from './environments/add';
import updateEnvironment from './environments/update';
import deleteEnvironment from './environments/delete';
import generateKey from './api-key/add';
import updateWebhook from './webhook/update';
import publishWebhook from './webhook/publish';

export default {
  setupAccount,
  deleteAccount,
  updateProfile,
  addFeature,
  updateFeature,
  deleteFeature,
  addEnvironment,
  updateEnvironment,
  deleteEnvironment,
  generateKey,
  updateWebhook,
  publishWebhook,
};
