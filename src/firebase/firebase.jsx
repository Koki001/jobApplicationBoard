// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASO5OMYpPlDvimE7ehTjLyieO3gAdqi2U",
  authDomain: "application-board.firebaseapp.com",
  projectId: "application-board",
  storageBucket: "application-board.appspot.com",
  messagingSenderId: "784110403085",
  appId: "1:784110403085:web:9089f4b70b39641f155f44",
  measurementId: "G-G85M19V2NM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)
const auth = getAuth(app);
const storage = getStorage(app);
export {db, auth, storage}
