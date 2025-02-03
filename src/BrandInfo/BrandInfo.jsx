import BrandCard from "./BrandCard";
import honda from "/src/assets/Brand Logo/Honda.jfif";

const BrandInfo = () => {
  // Load brand data using `useLoaderData` from react-router

  // Example fallback data for demonstration purposes
  const brandsInfo = [
    {
      _id: "1",
      brandName: "BMW",
      brandImg: "/src/assets/Brand Logo/bmw.png",
    },
    // {
    //   _id: "2",
    //   brandName: "Tesla",
    //   brandImg: "/src/assets/Brand Logo/tesla.png",
    // },
    {
      _id: "2",
      brandName: "Ford",
      brandImg: "/src/assets/Brand Logo/ford.jpeg",
    },
    {
      _id: "3",
      brandName: "Mercedes",
      brandImg: "/src/assets/Brand Logo/Mercedes-Benz.jpeg",
    },
    {
      _id: "5",
      brandName: "Honda",
      brandImg: honda,
    },
  ];

  // {
  //   _id: "6",
  //   brandName: "Mercedes",
  //   brandImg: "/Brand Logo/bmw.png",
  // },

  return (
    <div className="container my-10 max-md:!px-5">
      <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text mb-3">
        Our Brands Shops
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 my-5">
        {brandsInfo.map((brandInfo) => (
          <BrandCard key={brandInfo._id} brandInfo={brandInfo} />
        ))}
      </div>
    </div>
  );
};

export default BrandInfo;
