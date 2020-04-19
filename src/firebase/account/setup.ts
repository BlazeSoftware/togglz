import { store } from '@/firebase/firebase';
import generateKey from '../api-key/generate';

export default async ({ user }) => {
  await store.collection('plans').doc(user.uid).set({
    current: 'starter',
  });

  await store.collection('settings').doc(user.uid).set({
    webAPIKey: generateKey(),
  });
};
