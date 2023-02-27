// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlvYwqdQ3qBRjEfaCe1YcrZtcPHhOieic",
  authDomain: "jobi-99aa9.firebaseapp.com",
  projectId: "jobi-99aa9",
  storageBucket: "jobi-99aa9.appspot.com",
  messagingSenderId: "755457899297",
  appId: "1:755457899297:web:72293c71c998a344a99c60",
  measurementId: "G-QKNRR5P012",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)
const auth = getAuth(app);

export {db, auth}
