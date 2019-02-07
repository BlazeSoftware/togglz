import firebase, { store } from '@/firebase/firebase';

export default async (user, password) => {
  const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
  await user.reauthenticateAndRetrieveDataWithCredential(credentials);

  await fetch(`https://us-central1-blaze-togglz.cloudfunctions.net/plans/subscriptions/${user.uid}`, {
    method: 'DELETE',
    mode: 'cors',
  });

  const featuresSnapshot = await store
    .collection('features')
    .where('owner', '==', user.uid)
    .get();

  const batch = store.batch();
  featuresSnapshot.forEach((f) => {
    batch.delete(f.ref);
  });
  await batch.commit();

  await store
    .collection('settings')
    .doc(user.uid)
    .delete();

  await store
    .collection('plans')
    .doc(user.uid)
    .delete();

  await user.delete();
  await firebase.auth().signOut();
};
