// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDN_txvz9_rLios7vZ_eOuB1i9dzEyD6jA",
  authDomain: "expense-tracker-rohith.firebaseapp.com",
  projectId: "expense-tracker-rohith",
  storageBucket: "expense-tracker-rohith.appspot.com",
  messagingSenderId: "866631799675",
  appId: "1:866631799675:web:12b66a2074686d7e5fe3de",
  measurementId: "G-M2Q9VBJLVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
