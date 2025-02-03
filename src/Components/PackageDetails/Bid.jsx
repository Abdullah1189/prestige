import React, { useState, useEffect } from "react";
import {
  getUserLocation,
  getShopLocations,
  calculateDistance,
} from "../../utils/context";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Bid = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.loading("Fetching nearby shops...");
        const location = await getUserLocation();
        if (!location?.lat || !location?.lng) {
          throw new Error("Unable to fetch user location.");
        }
        setUserLocation(location);

        const shopData = await getShopLocations();
        if (!shopData || shopData.length === 0) {
          throw new Error("No shops found in the area.");
        }

        const shopsWithDistances = shopData.map((shop) => {
          const lat = parseFloat(shop.location.lat);
          const lng = parseFloat(shop.location.lng);
          const distance = calculateDistance(
            location.lat,
            location.lng,
            lat,
            lng
          );

          const servicesWithAdjustedPrices = shop.services.map((service) => ({
            ...service,
            adjustedPrice: service.basePrize
              ? service.basePrize + distance / 3
              : 10.0, // Default price if basePrize is missing
          }));

          return {
            ...shop,
            distance: distance ? distance.toFixed(2) : "N/A",
            services: servicesWithAdjustedPrices,
          };
        });

        setShops(shopsWithDistances.filter(Boolean));
        setLoading(false);
        toast.dismiss();
      } catch (error) {
        setError(error.message);
        setLoading(false);
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleServiceSelect = (shopName, service) => {
    if (!service) {
      toast.error("Service data is incomplete.");
      return;
    }
    navigate("/appointment", {
      state: {
        shopName,
        serviceId: service.id,
        serviceName: service.name,
        price: service.adjustedPrice || 10.0,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <Toaster />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!shops.length) {
    return <p className="text-center mt-10 text-gray-700">No shops available nearby.</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen mt-16">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        Nearby Available Detailing Services
      </h1>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shops.map((shop) => (
          <article
            key={shop.id}
            className="flex flex-col justify-center items-center gap-4 bg-[#1e1e1e] text-white rounded-lg p-8 shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all"
          >
            <h2 className="text-2xl font-bold text-gray-200">{shop.name}</h2>
            <p className="text-blue-400 text-lg">
              <span className="font-semibold">Distance:</span>{" "}
              {shop.distance !== "N/A" ? `${shop.distance} km` : "Not available"}
            </p>
            <ul className="w-full space-y-4">
              {shop.services.map((service) => (
                <li
                  key={service.id}
                  className="flex justify-between items-center p-4 bg-gray-800 rounded-md"
                >
                  <div>
                    <span className="text-gray-300">{service.name}:</span>
                    <span className="text-blue-400 font-semibold">
                      ${service.adjustedPrice ? service.adjustedPrice.toFixed(2) : "10.00"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleServiceSelect(shop.name, service)}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-blue-800 transition"
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Bid;
