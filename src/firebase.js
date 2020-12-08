import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7CRwxDKqIPliVwa0hAPEVzg5yP6jy9nw",
    authDomain: "dafah-firebase.firebaseapp.com",
    projectId: "dafah-firebase",
    storageBucket: "dafah-firebase.appspot.com",
    messagingSenderId: "177511504407",
    appId: "1:177511504407:web:33b53a1df854d439b29a52",
    measurementId: "G-P681W2LZGV"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default }