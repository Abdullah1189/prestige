// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from  "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


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
