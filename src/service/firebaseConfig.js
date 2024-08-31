// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQqmhEKrPtB29XoK6dQc7VF-B6ccEk7WI",
  authDomain: "tripplanner-5c714.firebaseapp.com",
  projectId: "tripplanner-5c714",
  storageBucket: "tripplanner-5c714.appspot.com",
  messagingSenderId: "1077583937596",
  appId: "1:1077583937596:web:84de51c4b4b2160f908339",
  measurementId: "G-FMXPNDG2YF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);