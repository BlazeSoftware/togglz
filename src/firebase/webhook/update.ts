import { store } from '@/firebase/firebase';

export default async (user, webhookUrl, webhookSecret) => {
  await store.collection('settings').doc(user.uid).update({
    webhookUrl,
    webhookSecret
  });
};
