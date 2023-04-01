import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNCjgEvTfRe6xlQLtfieugOuVqTWPsxQA",
  authDomain: "react-firebase-3d1f1.firebaseapp.com",
  projectId: "react-firebase-3d1f1",
  storageBucket: "react-firebase-3d1f1.appspot.com",
  messagingSenderId: "678017726630",
  appId: "1:678017726630:web:2e03e40283830306275c67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
