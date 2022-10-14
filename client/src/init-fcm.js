import * as firebase from 'firebase/app';
import 'firebase/messaging';

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBrA3K8b_fHpjRUtsoM1pR5_zaAXE7Xkr0',
  authDomain: 'fcm-dath.firebaseapp.com',
  databaseURL: 'https://fcm-dath.firebaseio.com',
  projectId: 'fcm-dath',
  storageBucket: 'fcm-dath.appspot.com',
  messagingSenderId: '490276637382',
  appId: '1:490276637382:web:8c49e770945cbd5038e5c7',
});

const messaging = initializedFirebaseApp.messaging();

export { messaging };
