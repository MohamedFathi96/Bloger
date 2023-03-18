// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtTiAw-rXwaV-I0vbgFX7XebqFSYa0TyE",
  authDomain: "bloger-2e6ee.firebaseapp.com",
  projectId: "bloger-2e6ee",
  storageBucket: "bloger-2e6ee.appspot.com",
  messagingSenderId: "142072622530",
  appId: "1:142072622530:web:7d98fa785394bcdf49ba5b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
