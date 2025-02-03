import { useLoaderData, useParams } from "react-router-dom";
import BrandDetails from "./BrandDetails";
import { useEffect, useState } from "react";
import BrandSlider from "./BrandSlider";

const BrandsDetails = () => {
  const brand = useLoaderData();

  const { brandName } = useParams();
  const brandsDetails = brand.filter((brand) => brand.brand === brandName);

  // for slider
  const [brandSlider, setBrandSlider] = useState([]);

  useEffect(() => {
    fetch("https://brand-shop-server-inky.vercel.app/brands")
      .then((res) => res.json())
      .then((data) => setBrandSlider(data));
  }, []);

  const sliderBrand = brandSlider.filter((brandSlider) => brandSlider.brandName === brandName);


  return (
    <div>
      <div>
        {sliderBrand.map((sliderBrand) => (
          <BrandSlider key={sliderBrand._id} sliderBrand={sliderBrand}></BrandSlider>
        ))}
      </div>

      <h1 className="text-center my-5 font-bold text-3xl underline">
        {" "}
        <span className="uppercase">{brandName}</span> Cars
      </h1>
      <div>
        {brandsDetails.length > 0 ? (
          brandsDetails.map((brandDetails) => <BrandDetails key={brandDetails._id} brandDetails={brandDetails}></BrandDetails>)
        ) : (
          <h2 className="text-center text-3xl my-12 font-bold">Sorry No Car Available Right Now!!!</h2>
        )}
      </div>
    </div>
  );
};

export default BrandsDetails;
