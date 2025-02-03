import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";  // Import Firestore instance

// Function to fetch data from Firestore
 const fetchDataFromFirebase = async (collectionName) => {
    try {
        // Get reference to the collection in Firestore
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        
        // Map the data from Firestore into an array
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// Example function for a more specific query (could be for products, users, etc.)
 const fetchProductsFromFirebase = async () => {
    try {
        const productsData = await fetchDataFromFirebase("products"); // Replace with your collection name
        return productsData;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// If you're using Firebase functions for payment (using Firestore or Firebase Cloud Functions)
 const makePaymentRequest = async (paymentData) => {
    try {
        // Use Firebase Cloud Functions if you have a function deployed for payment
        const functions = require("firebase/functions");
        const makePaymentFunction = functions.httpsCallable(functions, "makePayment");

        // Call the Firebase function
        const result = await makePaymentFunction(paymentData);
        return result.data; // Return the response from Firebase function
    } catch (err) {
        console.error("Error making payment request: ", err);
            return err;
    }
};

export default {makePaymentRequest,fetchProductsFromFirebase}