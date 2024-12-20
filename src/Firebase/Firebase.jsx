import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCUgAK0CV3h4Bc78MjN32G-4FFSh0-gplA",
  authDomain: "chatapp-b0b76.firebaseapp.com",
  projectId: "chatapp-b0b76",
  storageBucket: "chatapp-b0b76.firebasestorage.app",
  messagingSenderId: "159305042262",
  appId: "1:159305042262:web:34f9058e379d69f1496ef7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbApp = getDatabase(app);
// export const dbMsg = getMessaging(app);
