// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from  "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAip3Xjb-rj9Tyh47tNgapvUT7kKQmpBUc",
  authDomain: "fitness-pledge.firebaseapp.com",
  projectId: "fitness-pledge",
  storageBucket: "fitness-pledge.appspot.com",
  messagingSenderId: "1095572765047",
  appId: "1:1095572765047:web:e00e3e78995845bf7a8972",
  measurementId: "G-5GV7KPNRJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
// export default db;
export  {app,auth};
export  {db};

// signInAnonymously(auth).catch((error) => {
//   console.error("Error during sign-in:", error.message);
// });


// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
