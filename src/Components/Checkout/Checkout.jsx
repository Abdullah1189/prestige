import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { auth, db } from "../../firebase/firebase.config";
import { doc, getDoc, updateDoc, runTransaction } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const TOKEN_TO_DOLLAR_RATIO = 5;

function tokenPointsToDollars(tokenPoints) {
    return tokenPoints / TOKEN_TO_DOLLAR_RATIO;
}

const stripePromise = loadStripe("pk_test_51QMnNZFRHQLYw36zmxrPmLBUadRJ7K8EELRiFMUbP1PMAxeIoO9FOAJMawyycbNeqSLp5m88Ebv9yjgYgMv5lyxW00wVrdCtlM");

const CheckoutForm = ({ appointmentData, tokenPoints, finalPrice, onTokenPointsChange, errorMessage }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            alert("Stripe has not loaded yet. Please try again.");
            return;
        }

        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: appointmentData.userName,
                email: appointmentData.userEmail,
            },
        });

        if (error) {
            console.error("Payment error:", error);
            alert(error.message);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://prestige-weld.vercel.app/api/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    appointmentData: {
                        ...appointmentData,
                        appointmentId: appointmentData.id,
                    },
                    usedTokenPoints: onTokenPointsChange,
                    finalPrice,
                    userId: appointmentData.userId,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Payment successful and appointment saved!");
                navigate('/appointment-confirmation', { state: { appointmentId: data.appointmentId } });
            } else {
                alert(data.error || "Payment failed.");
                console.error("Server error:", data.error);
            }

        } catch (err) {
            console.error("Error processing payment:", err);
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
                className="p-3 border rounded-md"
            />
            <div className="flex flex-col">
                <label className="font-bold">Use Token Points:</label>
                <input
                    type="number"
                    min="0"
                    max={tokenPoints}
                    placeholder="Enter number of tokens , 5 Tokens = $1"
                    className="border rounded-md p-2"
                    onChange={(e) => onTokenPointsChange(e.target.value)}
                />
                {errorMessage && <span className="text-red-500">{errorMessage}</span>}
            </div>
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


const Checkout = () => {
    const navigate = useNavigate();
    const { state: appointmentData } = useLocation();
    const [tokenPoints, setTokenPoints] = useState(null);
    const [usedTokenPoints, setUsedTokenPoints] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingTokenPoints, setLoadingTokenPoints] = useState(true);
    const [user, setUser] = useState(null);


    const handleTokenPointsChange = (value) => {
        const points = parseInt(value) || 0;

        if (points > tokenPoints) {
            setErrorMessage("You cannot use more token points than you have.");
            setUsedTokenPoints(0);
            setFinalPrice(appointmentData.price);
            return;
        }

        setErrorMessage("");
        const maxDiscountPoints = Math.min(points, tokenPoints);
        const discountDollars = tokenPointsToDollars(maxDiscountPoints);
        setUsedTokenPoints(maxDiscountPoints);
        setFinalPrice(appointmentData.price - discountDollars);
    };

    useEffect(() => {
        if (!appointmentData) {
            navigate('/products');
            return;
        }
        setFinalPrice(appointmentData.price);
    }, [appointmentData, navigate]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });
        return unsubscribe;
    }, []);


    useEffect(() => {
        const fetchUserToken = async () => {
            setLoadingTokenPoints(true);
            if (!user) {
                setLoadingTokenPoints(false);
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setTokenPoints(userData.tokenPoints || 0);
                } else {
                    console.error("User document not found!");
                }
            } catch (error) {
                console.error("Error fetching user token points:", error);
            } finally {
                setLoadingTokenPoints(false);
            }
        };

        fetchUserToken();
    }, [user]);

    if (!appointmentData) {
        return <p>Invalid appointment data. Please try again.</p>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto mt-16">
            <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">Checkout</h2>
                <p>
                    <strong>Service:</strong> {appointmentData.serviceName} <br />
                    <strong>Shop:</strong> {appointmentData.shopName} <br />
                    <strong>Original Price:</strong> ${appointmentData.price.toFixed(2)} <br />
                    <p>Discount: ${tokenPointsToDollars(usedTokenPoints).toFixed(2)}</p>
                    <strong>Final Price:</strong> ${finalPrice.toFixed(2)} <br />
                    <strong className="text-green-600">Current Token Points: {tokenPoints}</strong>
                </p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointmentData={appointmentData}
                    tokenPoints={tokenPoints}
                    finalPrice={finalPrice}
                    onTokenPointsChange={handleTokenPointsChange}
                    errorMessage={errorMessage}
                />
            </Elements>
        </div>
    );
};

export default Checkout;
