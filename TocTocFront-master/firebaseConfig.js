// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJqIOOcZgnm4vjBMWcnKZO0w6zzXwoLkA",
  authDomain: "toctocv2-70cc9.firebaseapp.com",
  projectId: "toctocv2-70cc9",
  storageBucket: "toctocv2-70cc9.appspot.com",
  messagingSenderId: "734934851657",
  appId: "1:734934851657:android:866babcda97c5a24039f98"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

// Inicializar Firestore si es necesario
export const db = getFirestore(app);
export default app;