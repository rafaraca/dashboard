import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "to-do-list-ef1b5",
  storageBucket: "to-do-list-ef1b5.firebasestorage.app",
  messagingSenderId: "771214673571",
  appId: "1:771214673571:web:2fe7eb6c0bb209bf6a6116"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);