const HeroSection = () => {
  return (
    <div className="container flex flex-col md:items-center items-start home-content m-7 ml-9 px-4 md:px-6 lg:px-8 !py-8">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-wide">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text">
          Prestige Car Detailing
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
        Experience the pinnacle of automotive care with our premium car detailing
        services. Let us restore your vehicle to its showroom glory with
        unmatched precision and expertise.
      </p>

      {/* Call to Action */}
      <a
        href="/services"
        className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        Explore Services
      </a>
    </div>
  );
};

export default HeroSection;
