import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      title: "Interior Detailing",
      features: [
        "Thorough vacuuming of carpets and seats",
        "Steam cleaning of upholstery",
        "Leather cleaning and conditioning",
        "Dashboard and console cleaning",
        "Cleaning of door panels and trims",
        "Deep cleaning of air vents",
        "Stain removal on seats and carpets",
        "Odor elimination and deodorizing",
        "Window cleaning from the inside",
        "Headliner spot cleaning",
        "Sanitization of high-touch areas",
        "Attention to nooks and crannies for dust removal",
      ],
      buttonLabel: "Choose Plan",
      color: "blue",
    },
    {
      id: 2,
      title: "Exterior Detailing",
      features: [
        "Hand wash and drying using microfiber towels",
        "Clay bar treatment to remove contaminants",
        "Polishing to restore paint shine",
        "Waxing for a protective finish",
        "Tire cleaning and shining",
        "Wheel and rim detailing",
        "Cleaning of external windows and mirrors",
        "Bug and tar removal from bumpers",
        "Headlight and taillight polishing",
        "Trim and plastic restoration",
        "Sealant application for long-lasting protection",
        "Scratch and swirl mark reduction",
      ],
      buttonLabel: "Choose Plan",
      color: "green",
    },
    {
      id: 3,
      title: "Full Detailing",
      features: [
        "Complete interior and exterior detailing",
        "Deep vacuuming and steam cleaning inside",
        "Leather conditioning and protection",
        "Dashboard, vents, and console cleaning",
        "Hand wash and drying using premium materials",
        "Clay bar treatment for surface contaminants",
        "Paint polishing and waxing for shine and protection",
        "Tire cleaning, shining, and wheel detailing",
        "Bug, tar, and grime removal from exterior",
        "Glass cleaning (inside and outside)",
        "Headlight restoration for clarity",
        "Protective sealant application for durability",
      ],
      buttonLabel: "Choose Plan",
      color: "red",
    },
    {
      id: 4,
      title: "Car Wash",
      features: [
        "Exterior hand wash using premium products",
        "Rinse and drying with microfiber towels",
        "Cleaning of external windows and mirrors",
        "Tire cleaning and basic shine",
        "Removal of light dirt and grime",
        "Quick bug and tar removal from bumpers",
        "Foam wash for a spotless finish",
        "Quick wheel cleaning",
        "Basic underbody rinse",
        "Water spot removal",
        "Simple wax spray for added shine",
        "Fast and efficient cleaning service",
      ],
      buttonLabel: "Choose Plan",
      color: "yellow", // Color for Car Wash package
    },
  ];

  const colorClasses = {
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-700",
      btn: "bg-pink-500 hover:bg-pink-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      btn: "bg-blue-500 hover:bg-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      btn: "bg-green-500 hover:bg-green-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-700",
      btn: "bg-red-500 hover:bg-red-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      btn: "bg-yellow-500 hover:bg-yellow-600",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
      {packages.map((pkg) => {
        const color = colorClasses[pkg.color] || colorClasses["blue"]; // fallback to blue if color is not found

        return (
          <div
            key={pkg.id}
            className="bg-white rounded-lg shadow-lg border hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <div className={`p-6 ${color.bg} ${color.text}`}>
              <div className="text-4xl font-bold">
                {pkg.price}
                <span className="text-base ml-1 font-medium text-gray-700"></span>
              </div>
            </div>
            <div className="p-6">
              <h2 className={`text-xl font-semibold ${color.text}`}>{pkg.title}</h2>
              <ul className="space-y-3 text-sm text-gray-600 border-t pt-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-700 mr-2"
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
            </div>
            <div className="p-6 text-center">
              <button
                onClick={() => navigate(`/services/${pkg.id}`, { state: pkg })}
                className={`px-6 py-2 rounded-full text-white font-semibold ${color.btn} transition`}
              >
                {pkg.buttonLabel}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
