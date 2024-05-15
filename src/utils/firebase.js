// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3WqWsXiafoUVASgCFa8CALAsNzzkc-hQ",
  authDomain: "netflix-gpt-ba37a.firebaseapp.com",
  projectId: "netflix-gpt-ba37a",
  storageBucket: "netflix-gpt-ba37a.appspot.com",
  messagingSenderId: "1083074800942",
  appId: "1:1083074800942:web:134fc4d177b5d5a4b05ebf",
  measurementId: "G-8KZRV5WBRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();