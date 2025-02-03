import interiorImg from "../assets/Detailing/interior.jpg";
import exteriorImg from "../assets/Detailing/exterior.jpg";
import fullImg from "../assets/Detailing/Full.jpg";

// Child Card Component
// eslint-disable-next-line react/prop-types
const ServiceCard = ({ title, description, imgSrc }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

// Main Services Component
const Services = () => {
  const serviceData = [
    {
      title: "Interior Detailing",
      description:
        "Thorough cleaning of seats, carpets, dashboards, and all interior surfaces to make your car feel brand new.",
      imgSrc: interiorImg,
    },
    {
      title: "Exterior Detailing",
      description:
        "Deep cleaning, polishing, and waxing of your car’s exterior for a showroom-like shine.",
      imgSrc: exteriorImg,
    },
    {
      title: "Full Detailing",
      description:
        "Comprehensive cleaning and protection for both the interior and exterior of your vehicle.",
      imgSrc: fullImg,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-8">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imgSrc={service.imgSrc}
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="/services"
          className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          View All Services
        </a>
      </div>
    </div>
  );
};

export default Services;
