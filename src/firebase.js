// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.REACT_APP_ApiKey,
  authDomain: "assignmentor-21417.firebaseapp.com",
  projectId: "assignmentor-21417",
  storageBucket: "assignmentor-21417.appspot.com",
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: "1:128711245576:web:f11678cc4aa9aec8e8b6bd",
  measurementId: "G-N1CLV184JY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app)
const analytics = getAnalytics(app);