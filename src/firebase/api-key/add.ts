import { store } from '@/firebase/firebase';
import generateKey from './generate';

export default async ({ user }) => {
  await store.collection('settings').doc(user.uid).update({
    webAPIKey: generateKey(),
  });
};
