import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlo4kxMFhBLxU3KdPdS0GUSMLyC34CJCk",
  authDomain: "pangi-treasure.firebaseapp.com",
  projectId: "pangi-treasure",
  storageBucket: "pangi-treasure.firebasestorage.app",
  messagingSenderId: "366158615553",
  appId: "1:366158615553:web:26e799d87e38e17ce91c00"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);