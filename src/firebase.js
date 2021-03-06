//import the firebase module we installed
import firebase from 'firebase/app';
//import the database info from  the firbase module
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBPQZQ-TZo4VUCS4gVtsnUyiVz7FZlzwv0",
    authDomain: "hiker-trail-log.firebaseapp.com",
    projectId: "hiker-trail-log",
    storageBucket: "hiker-trail-log.appspot.com",
    messagingSenderId: "311950626060",
    appId: "1:311950626060:web:4bcff44cd693024b47cd29"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;