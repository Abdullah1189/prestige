import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PackageDetails() {
  const { state: pkg } = useLocation(); // Destructure 'state' from 'useLocation'
  const navigate = useNavigate();

  if (!pkg) {
    return <p className="text-center mt-10 text-gray-600">Package details not found.</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-14">
      {/* Package Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">{pkg.title}</h1>

      {/* Package Price */}
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-green-600">Services::</span>
      </div>

      {/* Package Description */}
      <p className="text-gray-700 text-center mb-6">{pkg.description}</p>

      {/* Features */}
      <ul className="space-y-4 text-gray-600 mb-8">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {/* Tick SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="text-center">
        <button
          className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 mr-4"
          onClick={() => navigate(`/bid`, { state: pkg })}
        >
          Buy Now
        </button>
        <button
          className="py-2 px-6 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default PackageDetails;
