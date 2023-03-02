import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_2aj6SMt_sVdXkJhYbF6OQpBj0H4_0fk",
  authDomain: "vivid-poet-120409.firebaseapp.com",
  databaseURL:
    "https://vivid-poet-120409-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vivid-poet-120409",
  storageBucket: "vivid-poet-120409.appspot.com",
  messagingSenderId: "3997552932",
  appId: "1:3997552932:web:e81f0b5485428f1f5ee3b1",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export { onValue, ref };

export const createAccount = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  const auth = getAuth();
  await fbSignOut(auth);
};
