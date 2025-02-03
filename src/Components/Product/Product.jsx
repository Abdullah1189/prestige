import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { ShoppingCart, X } from "lucide-react";
import { getAuth } from "firebase/auth"; // Import getAuth


const productData = [
  {
    id: 1,
    image: "/image/products/PremiumWaxPolish.jpg",
    title: "Premium Wax Polish",
    description: "Provides a long-lasting glossy finish to your car.",
    price: "$25.99",
    rating: 4.5,
    stock:0,
  },
  {
    id: 2,
    image: "/image/products/MicrofiberTowels.jpg",
    title: "Microfiber Towels",
    description: "Super soft and scratch-free cleaning towels.",
    price: "$15.99",
    rating: 4.8,
    stock:5,

  },
  {
    id: 3,
    image: "/image/products/TireCleaner.jpg",
    title: "Tire Cleaner",
    description: "Cleans and restores the shine of your car tires.",
    price: "$12.99",
    rating: 4.3,
    stock:8,

  },
  {
    id: 4,
    image: "/image/products/LeatherSeatCleaner.jpg",
    title: "Leather Seat Cleaner",
    description: "Restores and protects leather seats from wear and tear.",
    price: "$19.99",
    rating: 4.7,
    stock:2,

  },
  {
    id: 5,
    image: "/image/products/GlassCleaner.jpg",
    title: "Glass Cleaner",
    description: "Ensures a streak-free shine for all your car windows.",
    price: "$10.99",
    rating: 4.6,
    stock:6,

  },
  {
    id: 6,
    image: "/image/products/DashboardPolish.jpg",
    title: "Dashboard Polish",
    description: "Keeps your dashboard clean and shiny without greasiness.",
    price: "$14.99",
    rating: 4.4,
    stock:5,

  },
  {
    id: 8,
    image: "/image/products/CarWashShampoo.jpg",
    title: "Car Wash Shampoo",
    description: "Gentle yet effective formula for thorough car cleaning.",
    price: "$9.99",
    rating: 4.8,
    stock:0,

  },
  {
    id: 10,
    image: "/image/products/CarVacuumCleaner.jpg",
    title: "Car Vacuum Cleaner",
    description: "Compact and powerful vacuum for interior detailing.",
    price: "$49.99",
    rating: 4.9,
    stock:6,

  },
  {
    id: 11,
    image: "/image/products/ClayBarKit.jpg",
    title: "Clay Bar Kit",
    description: "Removes contaminants for a smooth and clean surface.",
    price: "$24.99",
    rating: 4.6,
    stock:9,

  },
  {
    id: 12,
    image: "/image/products/AllPurposeCleaner.jpg",
    title: "All-Purpose Cleaner",
    description: "Versatile cleaner for both interior and exterior surfaces.",
    price: "$18.99",
    rating: 4.5,
    stock:0,

  },
];

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});
  const [cartVisible, setCartVisible] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth


  const filteredProduct = productData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateQuantity = (id, action) => {
    setQuantities((prev) => {
      const currentQuantity = prev[id] || 0;
      const newQuantity =
        action === "add" ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);
      return { ...prev, [id]: newQuantity };
    });
  };

  const addToCart = (id) => {
    const quantityToAdd = quantities[id] || 0;
    if (quantityToAdd > 0) {
      setCart((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + quantityToAdd,
      }));
      setQuantities((prev) => ({ ...prev, [id]: 0 })); // Reset selected quantity

      // Show toast notification
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const calculateTotal = () =>
    Object.entries(cart).reduce((total, [id, quantity]) => {
      const product = productData.find((item) => item.id === parseInt(id));
      return total + parseFloat(product.price.slice(1)) * quantity;
    }, 0);

    const handleCheckout = () => {
      const user = auth.currentUser; // Get the current user
    if (!user) {
        // Handle the case where the user is not logged in. Maybe redirect to the login page
        alert("Please Login First")
        return;
    }
    const userId = user.uid; // Get the user ID
    const userName = user.displayName;
    const userEmail = user.email;

     const cartItemsWithDetails = Object.entries(cart).map(([id, quantity]) => {
        const product = productData.find((item) => item.id === parseInt(id));
        return {
            id: parseInt(id),
            name: product.title,
            price: product.price,
            quantity,
            userId,
            userName,
            userEmail,
        };
    });
  
      const total = calculateTotal();
  
      navigate("/productcheckout", {
        state: { cartItems: cartItemsWithDetails, total,userId },
      });
      setCartVisible(false); // Close the cart modal after checkout
    };
  
  

  return (
    <div className="container mx-auto px-4 py-8 md:pt-16">
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <h2 className="mt-16 text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-8">
        Products
      </h2>

      {/* Search and Cart */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-teal-500"
        />
        <div
          className="relative bg-teal-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
          onClick={() => setCartVisible(true)}
        >
          <ShoppingCart className="w-6 h-6" />
          {Object.keys(cart).length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {Object.keys(cart).reduce((sum, id) => sum + cart[id], 0)}
            </span>
          )}
        </div>
      </div>

      {/* Cart Modal */}
      {cartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setCartVisible(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
            {Object.keys(cart).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(cart).map(([id, quantity]) => {
                  const product = productData.find(
                    (item) => item.id === parseInt(id)
                  );
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <h4 className="font-medium">{product.title}</h4>
                        <p className="text-sm text-gray-600">
                          ${product.price.slice(1)} x {quantity} = $
                          {(
                            parseFloat(product.price.slice(1)) * quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => removeFromCart(id)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
                <div className="font-bold text-lg">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
                <button
          className="w-full bg-teal-600 text-white py-2 rounded-lg shadow hover:bg-teal-700"
          onClick={handleCheckout} // Call handleCheckout function
        >
          Go to Checkout
        </button>
              </div>
            ) : (
              <p>Your cart is empty!</p>
            )}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduct.map((item) => (
          <div
            key={item.id}
            className={`p-4 bg-white rounded-lg shadow-md flex flex-col relative group ${item.stock === 0 ? 'opacity-50' : ''}`} // Conditionally reduce opacity
          >
            <img
              src={item.image || "Image not found"}
              alt={item.title}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-teal-700 mb-2 truncate">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
            <p className="text-teal-600 font-semibold mb-2">{item.price}</p>
            <span className="text-yellow-500 font-medium">
              Rating: {item.rating} ★
            </span>

            {/* Out of Stock Overlay */}
            {item.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl">
                Out of Stock
              </div>
            )}


            <div className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-semibold ${item.stock === 0 ? 'hidden' : ''}`}> {/* Hide if out of stock */}
              {/* ... (Quantity buttons and Add to Cart) */}
               <div className="flex items-center gap-2">
              <button
                className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(item.id, "remove");
                }}
                disabled={item.stock === 0} // Disable if out of stock
                >
                -
              </button>
              <span className="text-white font-bold">
                {quantities[item.id] || 0}
              </span>
              <button
                className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-teal-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(item.id, "add");
                }}
                disabled={item.stock === 0} // Disable if out of stock
                >
                +
              </button>
            </div>
              <button
                className="mt-3 px-4 py-2 bg-teal-600 rounded-lg shadow hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed" // Disable button if out of stock and style it
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item.id);
                }}
                disabled={item.stock === 0} // Disable if out of stock
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Product;

