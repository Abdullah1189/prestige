// import "../Css/ChooseMe.css";
import { useNavigate, useLocation } from "react-router-dom";


const features = [
  {
    id: 1,
    title: "Convenience",
    subtitle: "At Home",
    description:
      "We provide our services at your doorstep, saving you time and hassle.",
  },
  {
    id: 2,
    title: "Quality",
    subtitle: "Top-Notch",
    description:
      "We use high-quality products to ensure your car looks its best.",
  },
  {
    id: 3,
    title: "Experience",
    subtitle: "Professional",
    description:
      "Our team of experts have years of experience in car detailing.",
  },
];

const ChooseMe = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/login");
  };
  return (
    <div className="container why-choose-container text-center px-6 py-12 bg-gray-100 mb-6">
      <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-3">
        Why Choose Me
      </h2>
      <p className="text-xl font-medium text-gray-600 mb-8">Our Unique Features</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            className="transform hover:scale-105 transition-all duration-300 p-6 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 rounded-xl text-white"
            key={feature.id}
          >
            <h3 className="text-white text-3xl font-semibold mb-4">
              {feature.title}
            </h3>
            <h4 className="text-teal-100 text-xl font-medium mb-3">
              {feature.subtitle}
            </h4>
            <p className="text-teal-100 font-medium text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
      {/* <button 
        onClick={handleNavigation}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-teal-800 transition-all duration-300 transform hover:scale-105">
        Learn More
      </button> */}
    </div>
  );
};

export default ChooseMe;
