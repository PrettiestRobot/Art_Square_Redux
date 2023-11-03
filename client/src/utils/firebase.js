// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeZNO6v5uWcXZr4sho4ZvsKqVAo0poMVY",
  authDomain: "artsquare-bb6b4.firebaseapp.com",
  projectId: "artsquare-bb6b4",
  storageBucket: "artsquare-bb6b4.appspot.com",
  messagingSenderId: "372647947425",
  appId: "1:372647947425:web:475ef424bf959c52abd4e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
