import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBkB7Nl53birAvuAWUdTjnJ40_Ee38rU08',
  authDomain: 'blaze-togglz.firebaseapp.com',
  databaseURL: 'https://blaze-togglz.firebaseio.com',
  projectId: 'blaze-togglz',
  storageBucket: 'blaze-togglz.appspot.com',
  messagingSenderId: '991938127188',
};

firebase.initializeApp(config);

const store = firebase.firestore();

export { store };
export default firebase;
