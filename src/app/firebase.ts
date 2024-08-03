// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import fc from "./firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// console.log("****************************")
// console.log('API Key:', process.env.API_KEY);
// console.log('Auth Domain:', process.env.AUTH_DOMAIN);
// console.log('Project ID:', process.env.PROJECT_ID);
// console.log('Storage Bucket:', process.env.STORAGE_BUCKET);
// console.log('Messaging Sender ID:', process.env.MESSAGING_SENDER_ID);
// console.log('App ID:', process.env.APP_ID);
// console.log('Measurement ID:', process.env.MEASUREMENT_ID);









const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string;
const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string;
const APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string;
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string;

const fc = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Optionally, you can also print the entire firebaseConfig object to verify everything is correct
// console.log('Firebase Config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(fc);
const firestore = getFirestore(app);

export {firestore};