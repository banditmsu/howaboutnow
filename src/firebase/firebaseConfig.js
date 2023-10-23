import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/database";
import "firebase/storage"
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgS5j_5gfoTDFG5sDzwZdC15OrPTdcev4",
  authDomain: "goalz-6d22a.firebaseapp.com",
  databaseURL: "https://goalz-6d22a-default-rtdb.firebaseio.com",
  projectId: "goalz-6d22a",
  storageBucket: "goalz-6d22a.appspot.com",
  messagingSenderId: "737448166501",
  appId: "1:737448166501:web:a3ee5db81298225ddfb28c",
  measurementId: "G-JP371F0V78"
};

const app = firebase.initializeApp(firebaseConfig);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
// Initialize Firestore
const firestore = app.firestore();

export default firestore;