import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import  makePaymentRequest  from "../../utils/api";

const Cart = () => {
    const { cartItems, setShowCart } = useContext(Context);

    // Calculate the subtotal based on the cart items (assuming each item has a price and quantity)
    const cartSubTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems, // Send cart items to the backend for the order
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowCart(false)}
            ></div>

            {/* Cart Content */}
            <div className="w-full md:w-[340px] h-full bg-white flex flex-col translate-x-full animate-slide-cart">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <span className="text-lg font-bold uppercase flex-grow">
                        Shopping Cart
                    </span>
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:opacity-50"
                        onClick={() => setShowCart(false)}
                    >
                        <MdClose className="text-lg" />
                        <span className="text-sm uppercase">Close</span>
                    </div>
                </div>

                {/* Empty Cart */}
                {!cartItems.length && (
                    <div className="flex flex-col items-center gap-5 mt-20">
                        <BsCartX className="text-[120px] opacity-10" />
                        <span>No products in the cart.</span>
                        <button
                            className="h-10 w-36 flex items-center justify-center text-sm text-white bg-purple-600 border-b-2 border-purple-800 uppercase hover:opacity-90"
                            onClick={() => {}}
                        >
                            Return to Shop
                        </button>
                    </div>
                )}

                {/* Cart with Items */}
                {!!cartItems.length && (
                    <>
                        <CartItem />
                        <div className="mt-auto border-t border-gray-200">
                            {/* Subtotal */}
                            <div className="flex justify-between p-5 border-b border-gray-200">
                                <span className="text-lg font-bold uppercase">
                                    Subtotal:
                                </span>
                                <span className="text-lg font-bold text-purple-600">
                                    ₹{cartSubTotal}
                                </span>
                            </div>

                            {/* Checkout Button */}
                            <div className="p-5">
                                <button
                                    className="w-full h-12 flex items-center justify-center text-white bg-purple-600 border-b-2 border-purple-800 text-lg uppercase hover:opacity-90"
                                    onClick={handlePayment}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
