// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGk8wO3dvFsfO5FRBeg2k-re7K_ssjQMM",
  authDomain: "harpiaco2-860e9.firebaseapp.com",
  projectId: "harpiaco2-860e9",
  storageBucket: "harpiaco2-860e9.appspot.com",
  messagingSenderId: "694628900772",
  appId: "1:694628900772:web:5dd9f410bc25acd167eb31",
  measurementId: "G-CTHNQJQRWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);