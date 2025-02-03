import React, { useContext } from "react";
import { Context } from "../../../utils/context";
import { MdClose } from "react-icons/md";

const CartItem = () => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
        useContext(Context);

    return (
        <div className="flex-grow">
            {cartItems?.map((item) => (
                <div className="p-5 flex gap-3 hover:bg-gray-100 transition" key={item.id}>
                    {/* Image Container */}
                    <div className="bg-gray-100 w-16 h-16 flex-shrink-0">
                        <img
                            src={item.imgUrl} // Assuming the image URL is stored as imgUrl in Firebase
                            className="w-full h-full object-cover"
                            alt={item.title} // Assuming the title is stored as title in Firebase
                        />
                    </div>

                    {/* Product Details */}
                    <div className="relative flex-1">
                        {/* Product Name */}
                        <span className="block text-ellipsis overflow-hidden whitespace-nowrap text-base font-semibold mb-2 pr-6">
                            {item.title} {/* Accessing title directly from Firebase */}
                        </span>

                        {/* Close Button */}
                        <MdClose
                            className="absolute top-0 right-0 text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => handleRemoveFromCart(item)} // Removing item from cart
                        />

                        {/* Quantity Buttons */}
                        <div className="flex border border-gray-200 w-fit h-8 mb-2">
                            <span
                                className="w-8 h-full flex items-center justify-center text-lg text-gray-600 border-r border-gray-200 cursor-pointer"
                                onClick={() => handleCartProductQuantity("dec", item)} // Decreasing quantity
                            >
                                -
                            </span>
                            <span className="w-10 h-full flex items-center justify-center text-gray-600">
                                {item.quantity} {/* Display quantity from cart item */}
                            </span>
                            <span
                                className="w-8 h-full flex items-center justify-center text-lg text-gray-600 border-l border-gray-200 cursor-pointer"
                                onClick={() => handleCartProductQuantity("inc", item)} // Increasing quantity
                            >
                                +
                            </span>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <span>{item.quantity}</span>
                            <span>x</span>
                            <span className="text-purple-700">
                                ₹{item.price * item.quantity} {/* Calculating total price */}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItem;
