import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../../firebase/firebase.config";
import { doc, getDoc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QMnNZFRHQLYw36zmxrPmLBUadRJ7K8EELRiFMUbP1PMAxeIoO9FOAJMawyycbNeqSLp5m88Ebv9yjgYgMv5lyxW00wVrdCtlM");

const TOKEN_TO_DOLLAR_RATIO = 5; // Define the conversion ratio

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
            billing_details: {
                name: cartItems[0].userName, // Use userName from cartItems
                email: cartItems[0].userEmail, // Use userEmail from cartItems
            },
        });

        if (error) {
            console.error("Payment error:", error);
            alert(error.message);
            setLoading(false);
            return;
        }

        try {
            const orderData = {
                items: cartItems,
                totalPrice: cartItems[0].originalPrice, // Use originalPrice from cartItems
                discount: cartItems[0].discount, // Use discount from cartItems
                finalPrice: cartItems[0].finalPrice, // Use finalPrice from cartItems
                paymentMethodId: paymentMethod.id,
                createdAt: new Date(),
                userId: cartItems[0].userId, // Store userId with the order
            };

            const orderRef = doc(db, "orders", `<span class="math-inline">\{cartItems\[0\]\.userId\}\_</span>{paymentMethod.id}_${Date.now()}`);
            await setDoc(orderRef, orderData);

            const userRef = doc(db, "users", cartItems[0].userId);
            await setDoc(
                userRef,
                { tokenPoints: tokenPoints - cartItems[0].discount },
                { merge: true }
            );

            alert("Order placed successfully!");
            navigate('/thankyou');

        } catch (err) {
            console.error("Error saving order:", err);
            alert("There was an error processing your order.");
        }

        setLoading(false);
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
                    placeholder="Enter number of tokens, 5 tokens= 1$"
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
  const { cartItems: initialCartItems, total, userId } = location.state || {}; // Get userId
  const [cartItems, setCartItems] = useState(null);
  const [tokenPoints, setTokenPoints] = useState(0);
  const [usedTokenPoints, setUsedTokenPoints] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
      if (!initialCartItems || !total ) {
          navigate('/products');
          return;
      }

      // Initialize cartItems with calculated values (only once)
      const updatedCartItems = initialCartItems.map(item => ({
          ...item,
          originalPrice: total,
          discount: 0,
          finalPrice: total,
      }));

      setCartItems(updatedCartItems); // Set the state! VERY IMPORTANT
      setFinalPrice(total); // Set initial final price

  }, [initialCartItems, total, navigate]);


  const handleTokenPointsChange = (value) => {
      if (!cartItems) return; // Guard clause: if cartItems is null, do nothing

      const points = parseInt(value) || 0;

      if (points > tokenPoints) {
          setErrorMessage("You cannot use more token points than you have.");
          setUsedTokenPoints(0);
          setFinalPrice(cartItems[0].originalPrice);
          setCartItems(cartItems.map(item => ({ ...item, discount: 0, finalPrice: item.originalPrice })));
          return;
      }

      setErrorMessage("");
        const maxDiscountPoints = Math.min(points, tokenPoints);
        const discountDollars = tokenPointsToDollars(maxDiscountPoints);
        setUsedTokenPoints(maxDiscountPoints);
        setFinalPrice(cartItems[0].originalPrice - discountDollars); // Subtract dollar amount
        setCartItems(cartItems.map(item => ({ ...item, discount: discountDollars, finalPrice: item.originalPrice - discountDollars }))); // Update cartItems with discount dollars
    };

  useEffect(() => {
      const fetchUserToken = async () => {
          if (!cartItems || cartItems.length === 0 || !cartItems[0].userId) return;

          try {
              const userRef = doc(db, "users", cartItems[0].userId);
              const userDoc = await getDoc(userRef);

              if (userDoc.exists()) {
                  const userData = userDoc.data();
                  setTokenPoints(userData.tokenPoints || 0);
              }
          } catch (error) {
              console.error("Error fetching user token points:", error);
          }
      };

      fetchUserToken();
  }, [cartItems,userId]);

  if (!cartItems) { // Check if cartItems is null
      return <p>Loading...</p>; // Display loading message
  }    return (
      <div className="p-8 max-w-6xl mx-auto mt-16 flex">
          <div className="w-1/2 pr-8">
              <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                  <div className="space-y-2">
                      {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-600">
                                  {item.price} x {item.quantity} = $
                                  {(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="w-1/2 pl-8">
              <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-2">Checkout</h2>
                  <p>
                  <strong>Original Price:</strong> ${cartItems[0].originalPrice.toFixed(2)} <br /> {/* Now safe! */}
                  <strong>Discount:</strong> ${tokenPointsToDollars(usedTokenPoints).toFixed(2)} <br /> {/* Display discount in dollars */}
                  <strong>Final Price:</strong> ${finalPrice.toFixed(2)} <br />
                      <strong className="text-green-600">Current Token Points: {tokenPoints}</strong>
                  </p>
              </div>
              <Elements stripe={stripePromise}>
                  <CheckoutForm
                      cartItems={cartItems}
                      tokenPoints={tokenPoints}
                      finalPrice={finalPrice}
                      onTokenPointsChange={handleTokenPointsChange}
                      errorMessage={errorMessage}
                  />
              </Elements>
          </div>
      </div>
  );
};

export default ProductCheckout;
