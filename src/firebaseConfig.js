// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVBNH6ippI8oQU-7GkUl0-Vg39zaoxZ-I",
  authDomain: "bepop-professionals.firebaseapp.com",
  projectId: "bepop-professionals",
  storageBucket: "bepop-professionals.appspot.com",
  messagingSenderId: "319822166143",
  appId: "1:319822166143:web:5c5f8e05b1d290d1d2674a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {auth, app, firestore, storage};