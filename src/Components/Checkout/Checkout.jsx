import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { auth, db } from "../../firebase/firebase.config";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

// Stripe Public Key
const stripePromise = loadStripe("pk_test_51QMnNZFRHQLYw36zmxrPmLBUadRJ7K8EELRiFMUbP1PMAxeIoO9FOAJMawyycbNeqSLp5m88Ebv9yjgYgMv5lyxW00wVrdCtlM");

const TOKEN_TO_DOLLAR_RATIO = 5;
const tokenPointsToDollars = (tokenPoints) => tokenPoints / TOKEN_TO_DOLLAR_RATIO;

// 🏗 **Checkout Form Component**
const CheckoutForm = ({ appointmentData, finalPrice, usedTokenPoints }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            alert("Stripe is not ready yet. Please wait.");
            return;
        }
    
        setLoading(true);
    
        // Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: appointmentData.userName,
                email: appointmentData.userEmail,
            },
        });
    
        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch("https://backend-jo0ohw2lg-abdullah1189s-projects.vercel.app/create-payment", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    paymentMethodId: paymentMethod.id, // ✅ Corrected here
                    finalPrice 
                }),
                cors: "no-cors"
            });
    
            const data = await response.json();
    
            if (data.success) {
                // Store the appointment in Firestore if payment succeeds
                await addDoc(collection(db, "appointments"), {
                    ...appointmentData,
                    paymentStatus: "Paid",
                    transactionId: data.transactionId, // Store Stripe transaction ID
                    timestamp: new Date(),
                });
    
                alert("Payment successful! Your appointment is confirmed.");
                navigate("/appointment-confirmation", { state: { appointmentId: data.transactionId } });
            } else {
                setErrorMessage(data.error || "Payment failed.");
            }
        } catch (err) {
            console.error("Payment error:", err);
            setErrorMessage("An error occurred while processing payment.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: { fontSize: "16px", color: "#424770" },
                        invalid: { color: "#9e2146" },
                    },
                }}
                className="p-3 border rounded-md"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
            >
                {loading ? "Processing..." : `Pay $${finalPrice.toFixed(2)}`}
            </button>
        </form>
    );
};

// 🏗 **Main Checkout Component**
const Checkout = () => {
    const navigate = useNavigate();
    const { state: appointmentData } = useLocation();
    const [tokenPoints, setTokenPoints] = useState(0);
    const [usedTokenPoints, setUsedTokenPoints] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!appointmentData) {
            navigate("/products");
            return;
        }
        setFinalPrice(appointmentData.price);
    }, [appointmentData, navigate]);

    useEffect(() => {
        const fetchUserTokenPoints = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setTokenPoints(userDoc.data().tokenPoints || 0);
                }
            } catch (error) {
                console.error("Error fetching user token points:", error);
            }
        };

        fetchUserTokenPoints();
    }, []);

    const handleTokenPointsChange = (e) => {
        const points = parseInt(e.target.value) || 0;

        if (points > tokenPoints) {
            setErrorMessage("You cannot use more token points than you have.");
            setUsedTokenPoints(0);
            setFinalPrice(appointmentData.price);
            return;
        }

        setErrorMessage("");
        setUsedTokenPoints(points);
        setFinalPrice(appointmentData.price - tokenPointsToDollars(points));
    };

    if (!appointmentData) return <p>Invalid appointment data.</p>;

    return (
        <div className="p-8 max-w-4xl mx-auto mt-16">
            <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">Checkout</h2>
                <p>
                    <strong>Service:</strong> {appointmentData.serviceName} <br />
                    <strong>Shop:</strong> {appointmentData.shopName} <br />
                    <strong>Original Price:</strong> ${appointmentData.price.toFixed(2)} <br />
                    <strong>Discount:</strong> ${tokenPointsToDollars(usedTokenPoints).toFixed(2)} <br />
                    <strong>Final Price:</strong> ${finalPrice.toFixed(2)} <br />
                    <strong className="text-green-600">Current Token Points: {tokenPoints}</strong>
                </p>
            </div>
            <div className="flex flex-col mb-4">
                <label className="font-bold">Use Token Points:</label>
                <input
                    type="number"
                    min="0"
                    max={tokenPoints}
                    placeholder="Enter token points (5 points = $1)"
                    className="border rounded-md p-2"
                    onChange={handleTokenPointsChange}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointmentData={appointmentData}
                    finalPrice={finalPrice}
                    usedTokenPoints={usedTokenPoints}
                />
            </Elements>
        </div>
    );
};

export default Checkout;
