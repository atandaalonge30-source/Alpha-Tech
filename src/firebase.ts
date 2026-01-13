import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1Yc0extRecUlzuoEGLqA-lhheQv9kgmo",
  authDomain: "alpha-tech-daf7d.firebaseapp.com",
  projectId: "alpha-tech-daf7d",
  storageBucket: "alpha-tech-daf7d.firebasestorage.app",
  messagingSenderId: "876777256546",
  appId: "1:876777256546:web:92ec09f5d0b564d6c0033b",
  measurementId: "G-MNEHLXGYBX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
