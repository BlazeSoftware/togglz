import { store } from '@/firebase/firebase';
import IWebhookPayload from '@/firebase/webhook/payload.interface';
import forge from 'node-forge';

export default async (user, payload: IWebhookPayload) => {
  const settingsSnapshot = await store.collection('settings').doc(user.uid).get();
  const settings = settingsSnapshot.data();

  if (settings.webhookUrl && settings.webhookSecret) {
    const hmac = forge.hmac.create();
    hmac.start('sha256', settings.webhookSecret);

    hmac.update(JSON.stringify(payload));
    const hashedPayload = hmac.digest().toHex();

    try {
      const headers = new Headers();
      headers.append('x-togglz', hashedPayload);
      const res = await fetch(settings.webhookUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'X-Togglz': hashedPayload,
        },
      });



      if (!res.ok) throw { status: res.status, text: res.statusText };
    } catch (e) {
      console.error('problem triggering webhook', e);
    }
  }
};
