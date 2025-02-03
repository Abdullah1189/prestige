// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from  "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1vQ_BMXKM72DL6Y2r-zz6I0G6BCCjHzk",
  authDomain: "presitage-car-detailing.firebaseapp.com",
  projectId: "presitage-car-detailing",
  storageBucket: "presitage-car-detailing.firebasestorage.app",
  messagingSenderId: "549958700510",
  appId: "1:549958700510:web:079d4d60dcb85f9639e14f"
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