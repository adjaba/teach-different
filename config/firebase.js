import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/7.5.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/7.5.0/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->s
// <script src="/__/firebase/init.js"></script>

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB2gwGcen1yRj14EP-B0CW_dHoA3Zgtomg',
  authDomain: 'teach-different.firebaseapp.com',
  databaseURL: 'https://teach-different.firebaseio.com',
  projectId: 'teach-different',
  storageBucket: 'teach-different.appspot.com',
  messagingSenderId: '790707547480',
  appId: '1:790707547480:web:004c6142eaaa68ed97092d',
  measurementId: 'G-RZXBCQC7FQ',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const settings = {timestampsInSnapshots: true};

export default firestore;
export {firebase};
