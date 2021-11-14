import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeTDyh0Smr2Kk-cMRQAH5zof6UlWBojzE",
  authDomain: "nxgg-7c9be.firebaseapp.com",
  projectId: "nxgg-7c9be",
  storageBucket: "nxgg-7c9be.appspot.com",
  messagingSenderId: "767281997856",
  appId: "1:767281997856:web:e43379435cfe9f693a7445",
  measurementId: "G-KS5YX08ZW3",
};

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
