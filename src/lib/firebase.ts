import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQnnZJX-JZmNqbxuHCZptR_j06COsAOSI",
  authDomain: "proneddad-apk.firebaseapp.com",
  projectId: "proneddad-apk",
  storageBucket: "proneddad-apk.firebasestorage.app",
  messagingSenderId: "667880310178",
  appId: "1:667880310178:web:8b933973728b85a008defb",
  measurementId: "G-B2V94KHWSW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);