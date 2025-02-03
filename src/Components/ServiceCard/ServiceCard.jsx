import React from "react";

function ServiceCard({ service }) {
  // Destructure the service object and provide default values
  const { name, price, features = [] } = service || {};

  return (
    <div className="packae-card max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-gray-100 border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6 flex flex-col items-center">
        {/* Package Name */}
        <h5 className="text-2xl font-bold text-blue-600 mb-4">{name || "Default Package"}</h5>

        {/* Price Section */}
        <div className="mb-4">
          <span className="text-4xl font-extrabold text-gray-800">
            {price !== undefined ? `$${price}` : "Contact Us"}
          </span>
          {price !== undefined && <span className="text-sm text-gray-500">/month</span>}
        </div>

        {/* Features */}
        <ul className="text-gray-600 text-sm space-y-2 mb-6">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No features available</li>
          )}
        </ul>

        {/* Action Button */}
        <button className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-150">
          Choose Plan
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
