/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from "react-router-dom";

const DetailingGallery = ({ beforeAfterData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate("/gallery");
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${location.pathname === "/gallery" ? "mt-40" : ""}`}>
      {/* Header */}
      <h2 className="text-4xl mt-16 md:text-5xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-8">
         ALBUM
      </h2>
      <div className="space-y-6">
        {beforeAfterData?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-full md:w-1/2">
              <h3 className="md:text-3xl text-2xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-2">
                Before
              </h3>
              <img
                src={item.before}
                alt={`Before ${item.id}`}
                className="rounded-lg shadow-md w-full h-80 object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="md:text-3xl text-2xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-2">
                After
              </h3>
              <img
                src={item.after}
                alt={`After ${item.id}`}
                className="rounded-lg shadow-md w-full h-80 object-cover"
              />
            </div>
          </div>
        ))}
        {/* <button
          onClick={handleNavigation}
          className="mt-6 flex mx-auto bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          View All
        </button> */}
      </div>
    </div>
  );
};

export default DetailingGallery;
