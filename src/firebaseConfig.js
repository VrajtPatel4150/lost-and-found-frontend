// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFCHir1hT_kvt-vrdHu9A3hOAYdWOcMpQ",
  authDomain: "lost-and-found-platform-c18ca.firebaseapp.com",
  projectId: "lost-and-found-platform-c18ca",
  storageBucket: "lost-and-found-platform-c18ca.appspot.com",
  messagingSenderId: "327546393067",
  appId: "1:327546393067:web:6b75b1b17f17db924349ae",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app); // ✅ Used in Chat
export const serverTimestampFn = serverTimestamp; // ✅ Export this too
