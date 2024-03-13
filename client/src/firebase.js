// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nix-blogger.firebaseapp.com",
  projectId: "nix-blogger",
  storageBucket: "nix-blogger.appspot.com",
  messagingSenderId: "695873018304",
  appId: "1:695873018304:web:9406c387a629f60910d025",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
