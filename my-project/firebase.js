// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-application-a3cdf.firebaseapp.com",
  projectId: "blog-application-a3cdf",
  storageBucket: "blog-application-a3cdf.appspot.com",
  messagingSenderId: "557013713021",
  appId: "1:557013713021:web:f5e6ca87648d55adf33114"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);