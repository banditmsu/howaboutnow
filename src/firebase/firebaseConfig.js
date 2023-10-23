// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgS5j_5gfoTDFG5sDzwZdC15OrPTdcev4",
  authDomain: "goalz-6d22a.firebaseapp.com",
  projectId: "goalz-6d22a",
  storageBucket: "goalz-6d22a.appspot.com",
  messagingSenderId: "737448166501",
  appId: "1:737448166501:web:a3ee5db81298225ddfb28c",
  measurementId: "G-JP371F0V78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
