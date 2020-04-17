import firebase from '@/firebase/firebase';

const actions = {
  async name({ user, displayName }) {
    return await user.updateProfile({ displayName });
  },

  async email({ user, password, email }) {
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
    await user.reauthenticateAndRetrieveDataWithCredential(credentials);
    return await user.updateEmail(email);
  },
};

export const ACTIONS = {
  NAME: 'name',
  EMAIL: 'email',
};

export default async (action, payload) => actions[action](payload);
