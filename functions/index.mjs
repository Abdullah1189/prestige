const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51QMnNZFRHQLYw36z...YourSecretKey"); // Replace with your secret key

admin.initializeApp();
const db = admin.firestore();

// ... (createPaymentIntent and createAppointment functions remain the same)

/**
 * Handle Order Completion and Token Points Update
 */
exports.completeOrder = functions.https.onCall(async (data, context) => {
    try {
        const {
            appointmentId,
            userId,
            shopName,
            serviceName,
            originalPrice,
            discount,
            finalPrice,
            usedTokenPoints,
        } = data;

        if (
            !appointmentId ||
            !userId ||
            !shopName ||
            !serviceName ||
            !originalPrice ||
            !finalPrice
        ) {
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Missing required fields for order completion."
            );
        }

        // Fetch user data (only once at the beginning)
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            throw new functions.https.HttpsError(
                "not-found",
                "User does not exist."
            );
        }

        const userData = userDoc.data();
        let currentTokenPoints = userData.tokenPoints || 0; // Initialize with default

        // Deduct token points if used (check for null or undefined)
        if (usedTokenPoints != null && usedTokenPoints > 0) {
            if (usedTokenPoints > currentTokenPoints) {
                throw new functions.https.HttpsError(
                    "failed-precondition",
                    "Insufficient token points."
                );
            }
            currentTokenPoints -= usedTokenPoints;
        }

        // Award new token points (e.g., 1 token point for every $10 spent)
        const earnedTokenPoints = Math.floor(finalPrice / 10);
        currentTokenPoints += earnedTokenPoints;

        // Update token points in user document (only update if points changed)
        if (userData.tokenPoints !== currentTokenPoints) {  // Important check!
            await userRef.update({
                tokenPoints: currentTokenPoints,
            });
        }

        // Save order data (add usedTokenPoints and earnedTokenPoints)
        const orderRef = db.collection("orders").doc(`${appointmentId}_${userId}`);
        await orderRef.set({
            appointmentId,
            userId,
            shopName,
            serviceName,
            originalPrice,
            discount,
            finalPrice,
            usedTokenPoints: usedTokenPoints || 0, // Store used points
            earnedTokenPoints, // Store earned points
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return {
            message: "Order completed successfully.",
            updatedTokenPoints: currentTokenPoints, // Return updated points
        };
    } catch (error) {
        console.error("Error completing order:", error);
        throw new functions.https.HttpsError("internal", error.message);
    }
});


/**
 * Function to Fetch User Token Points (No changes needed here)
 */
exports.getUserTokenPoints = functions.https.onCall(async (data, context) => {
    try {
        const { userId } = data;

        if (!userId) {
            throw new functions.https.HttpsError(
                "invalid-argument",
                "User ID is required to fetch token points."
            );
        }

        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return { tokenPoints: 0 };
        }

        const userData = userDoc.data();
        return { tokenPoints: userData.tokenPoints || 0 };
    } catch (error) {
        console.error("Error fetching user token points:", error);
        throw new functions.https.HttpsError("internal", error.message);
    }
});