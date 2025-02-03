import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QMnNZFRHQLYw36zmxrPmLBUadRJ7K8EELRiFMUbP1PMAxeIoO9FOAJMawyycbNeqSLp5m88Ebv9yjgYgMv5lyxW00wVrdCtlM");

const TOKEN_TO_DOLLAR_RATIO = 5;
const tokenPointsToDollars = (tokenPoints) => tokenPoints / TOKEN_TO_DOLLAR_RATIO;

const CheckoutForm = ({ cartItems, tokenPoints, finalPrice, onTokenPointsChange, errorMessage }) => {
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
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        alert("Order placed successfully!");
        navigate('/thankyou');
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-3 border rounded-md" />
            <div className="flex flex-col">
                <label className="font-bold">Use Token Points:</label>
                <input
                    type="number"
                    min="0"
                    max={tokenPoints}
                    placeholder="Enter tokens (5 tokens = 1$)"
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

const ProductCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems: initialCartItems, total } = location.state || {};
    const [cartItems, setCartItems] = useState(null);
    const [tokenPoints, setTokenPoints] = useState(0);
    const [usedTokenPoints, setUsedTokenPoints] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!initialCartItems || !total) {
            navigate('/products');
            return;
        }

        const updatedCartItems = initialCartItems.map(item => ({
            ...item,
            originalPrice: total,
            discount: 0,
            finalPrice: total,
        }));

        setCartItems(updatedCartItems);
        setFinalPrice(total);
    }, [initialCartItems, total, navigate]);

    useEffect(() => {
        if (!cartItems || !cartItems.length) return;
        const fetchUserToken = async () => {
            try {
                const userRef = doc(db, "users", cartItems[0].userId);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setTokenPoints(userDoc.data().tokenPoints || 0);
                }
            } catch (error) {
                console.error("Error fetching user token points:", error);
            }
        };
        fetchUserToken();
    }, [cartItems]);

    if (!cartItems) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto mt-10 flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <div className="lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <p>
                    <strong>Original Price:</strong> ${cartItems[0].originalPrice.toFixed(2)} <br />
                    <strong>Discount:</strong> ${tokenPointsToDollars(usedTokenPoints).toFixed(2)} <br />
                    <strong>Final Price:</strong> ${finalPrice.toFixed(2)} <br />
                    <strong className="text-green-600">Token Points: {tokenPoints}</strong>
                </p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        cartItems={cartItems}
                        tokenPoints={tokenPoints}
                        finalPrice={finalPrice}
                        onTokenPointsChange={(value) => {
                            const points = parseInt(value) || 0;
                            if (points > tokenPoints) {
                                setErrorMessage("You cannot use more token points than you have.");
                                return;
                            }
                            setErrorMessage("");
                            setUsedTokenPoints(points);
                            setFinalPrice(cartItems[0].originalPrice - tokenPointsToDollars(points));
                        }}
                        errorMessage={errorMessage}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default ProductCheckout;
