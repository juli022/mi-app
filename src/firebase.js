// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_-X9wB8SBu0PigamLwPbM7BFVPjRpDs0",
  authDomain: "mi-app-c4d2b.firebaseapp.com",
  projectId: "mi-app-c4d2b",
  storageBucket: "mi-app-c4d2b.firebasestorage.app",
  messagingSenderId: "597504125171",
  appId: "1:597504125171:web:528f515e77693cb1ffef86",
  measurementId: "G-F8MT002P7C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
