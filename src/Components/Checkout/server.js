// server.js (Backend - Corrected and Improved)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51QMnNZFRHQLYw36zQPCYaQlRIJvet9j81jZ6YxXiZrcCPssELgovFYgavmLNWqIuIO316MArJnAS0dTSkSS07iA500UjMUyeh7"); // Use env variable
const admin = require('firebase-admin');

const serviceAccountPath = "./firebase-private-key.json";
let serviceAccount;
try {
    serviceAccount = require(serviceAccountPath);
} catch (error) {
    console.error(`Error loading service account key: ${error.message}`);
    process.exit(1);
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

const corsOptions = {
    origin:  'https://prestige-weld.vercel.app', // Your frontend URL
    methods: ['POST'],
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('https://prestige-weld.vercel.app/api/create-payment', async (req, res) => {
    try {
        const { paymentMethodId, appointmentData, usedTokenPoints, finalPrice, userId } = req.body;

        // Input Validation (Crucial!)
        if (!paymentMethodId || !appointmentData || !finalPrice || !userId || finalPrice <= 0) {
            return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(finalPrice * 100),
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            metadata: {
                userId,
                appointmentId: '', // Placeholder
                shopName: appointmentData.shopName,
            },
        });

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ success: false, error: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}` });
        }

        const appointmentRef = db.collection('appointments').doc();
        const batch = db.batch();

        batch.set(appointmentRef, {
            userId,
            appointmentId: appointmentRef.id,
            ...appointmentData, // Spread the rest of the appointment data
            originalPrice: appointmentData.price,
            discount: usedTokenPoints || 0,
            finalPrice,
            paymentMethodId,
            chargeId: paymentIntent.id,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        if (usedTokenPoints > 0) {
            const userRef = db.collection('users').doc(userId);

            // Use a transaction to prevent race conditions and handle insufficient tokens
            await db.runTransaction(async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if (!userDoc.exists()) {
                    throw new Error('User not found!');
                }
                const currentUserTokenPoints = userDoc.data().tokenPoints || 0;
                if (currentUserTokenPoints < usedTokenPoints) {
                    throw new Error('Insufficient token points!');
                }
                transaction.update(userRef, {
                    tokenPoints: admin.firestore.FieldValue.increment(-usedTokenPoints),
                });
            });
        }

        await batch.commit();

        // Update Payment Intent Metadata (after successful Firestore write)
        await stripe.paymentIntents.update(paymentIntent.id, {
            metadata: { ...paymentIntent.metadata, appointmentId: appointmentRef.id },
        });

        res.json({ success: true, message: 'Payment successful and appointment saved.', appointmentId: appointmentRef.id ?? ''}); // Send appointmentId back

    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ success: false, error: error.message }); // Send error message to the frontend
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
