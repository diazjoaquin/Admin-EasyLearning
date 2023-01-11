// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABseS2aHIkDR1RCbdiQjM4yq_4e4XbMWM",
  authDomain: "easylearning-admin.firebaseapp.com",
  projectId: "easylearning-admin",
  storageBucket: "easylearning-admin.appspot.com",
  messagingSenderId: "543975129312",
  appId: "1:543975129312:web:a8cc92fd523d4f30f4d085",
  measurementId: "G-4X2KP9Z21Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);