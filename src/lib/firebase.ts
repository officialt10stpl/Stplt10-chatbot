import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // यह लाइन जोड़ें

const firebaseConfig = {
  apiKey: "AIzaSyAYxB75snSS1V5z0c_6IRBc_mF2EZOoE3M",
  authDomain: "stpl-t10-new.firebaseapp.com",
  projectId: "stpl-t10-new",
  storageBucket: "stpl-t10-new.firebasestorage.app",
  messagingSenderId: "582486145730",
  appId: "1:582486145730:web:2a76e22c4aabe8def1195b",
  measurementId: "G-SWD69JNR8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// यह लाइन बहुत जरूरी है, इसे एक्सपोर्ट करें
export const db = getFirestore(app);