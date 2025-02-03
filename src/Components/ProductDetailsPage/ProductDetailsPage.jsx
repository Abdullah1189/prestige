// src/Components/ProductDetailsPage/ProductDetailsPage.jsx
import { useParams, useNavigate, } from "react-router-dom";
// import productData from "../Product/Product";
import { useState } from "react";
import Before1 from "/src/Gallery/D1.jpg";



const productData = [
  {
    id: 1,
    image: "/image/products/PremiumWaxPolish.jpg",
    title: "Premium Wax Polish",
    description: "Provides a long-lasting glossy finish to your car.",
    price: "$25.99",
    rating: 4.5,
  },
  {
    id: 2,
    image: "/image/products/MicrofiberTowels.jpg",
    title: "Microfiber Towels",
    description: "Super soft and scratch-free cleaning towels.",
    price: "$15.99",
    rating: 4.8,
  },
  {
    id: 3,
    image: "/image/products/TireCleaner.jpg",
    title: "Tire Cleaner",
    description: "Cleans and restores the shine of your car tires.",
    price: "$12.99",
    rating: 4.3,
  },
  {
    id: 4,
    image: "/image/products/LeatherSeatCleaner.jpg",
    title: "Leather Seat Cleaner",
    description: "Restores and protects leather seats from wear and tear.",
    price: "$19.99",
    rating: 4.7,
  },
  {
    id: 5,
    image: "/image/products/GlassCleaner.jpg",
    title: "Glass Cleaner",
    description: "Ensures a streak-free shine for all your car windows.",
    price: "$10.99",
    rating: 4.6,
  },
  {
    id: 6,
    image: "/image/products/DashboardPolish.jpg",
    title: "Dashboard Polish",
    description: "Keeps your dashboard clean and shiny without greasiness.",
    price: "$14.99",
    rating: 4.4,
  },
 
  {
    id: 8,
    image: "/image/products/CarWashShampoo.jpg",
    title: "Car Wash Shampoo",
    description: "Gentle yet effective formula for thorough car cleaning.",
    price: "$9.99",
    rating: 4.8,
  },
  
  {
    id: 10,
    image: "/image/products/CarVacuumCleaner.jpg",
    title: "Car Vacuum Cleaner",
    description: "Compact and powerful vacuum for interior detailing.",
    price: "$49.99",
    rating: 4.9,
  },
  {
    id: 11,
    image: "/image/products/ClayBarKit.jpg",
    title: "Clay Bar Kit",
    description: "Removes contaminants for a smooth and clean surface.",
    price: "$24.99",
    rating: 4.6,
  },
  {
    id: 12,
    image: "/image/products/AllPurposeCleaner.jpg",
    title: "All-Purpose Cleaner",
    description: "Versatile cleaner for both interior and exterior surfaces.",
    price: "$18.99",
    rating: 4.5,
  },
];


const ProductDetailsPage = () => {
  const { id } = useParams(); // Get product ID from the route params
  const [cart, setCart] = useState({});

  const navigate = useNavigate();


  const updateCart = (id, action) => {
    setCart((prevCart) => {
      const currentCount = prevCart[id] || 0;
      const newCount =
        action === "add" ? currentCount + 1 : Math.max(currentCount - 1, 0);
      return { ...prevCart, [id]: newCount };
    });
  };

  // Convert `id` to an integer
  const productId = parseInt(id);

  // Check if the ID is a valid number
  if (isNaN(productId)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl font-bold text-red-500">Invalid Product ID</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  // Find the product by its ID
  const product = productData.find((item) => item.id === parseInt(id));

  // If product is not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl font-bold text-red-500">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Go Back to Home
        </button>

       
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-32 ">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg shadow-lg w-full h-auto max-w-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
  <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-4">
    {product.title}
  </h2>
  <p className="text-gray-700 text-lg mb-4">{product.description}</p>
  <div className="flex items-center space-x-4 mb-4">
    <span className="text-2xl font-semibold text-teal-700">{product.price}</span>
  </div>

  {/* Moved Rating and Update Cart Section Here */}
  <div className=" my-12 flex flex-col items-start space-y-8">
     <span className="text-yellow-500 text-xl flex items-center">
     Rating:
      {"⭐".repeat(Math.floor(product.rating))}
      <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
    </span>

    <div className="flex items-center gap-2 text-2xl">
      <button
        className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
        onClick={(e) => {
          e.stopPropagation();
          updateCart(product.id, "remove");
        }}
      >
        -
      </button>
      <span className="text-gray-800 font-medium">{cart[product.id] || 0}</span>
      <button
        className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-teal-600 transition"
        onClick={(e) => {
          e.stopPropagation();
          updateCart(product.id, "add");
        }}
      >
        +
      </button>
    </div>
  </div>

  <div className="mt-6">
    <button
      onClick={() => navigate("/accessories")}
      className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      Back to Accessories
    </button>
    <button
      onClick={() => navigate("/checkout")}
      className="mt-6 mx-12 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      Add to Cart
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;
