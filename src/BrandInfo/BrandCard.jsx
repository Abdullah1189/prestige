/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BrandCard = ({ brandInfo }) => {
  const { brandName, brandImg } = brandInfo;

  return (
    <div className="flex justify-center">
      <Link to={`/brands/${brandName}`} className="w-full">
        <div className="card bg-white shadow-xl flex flex-col items-center rounded-lg transform hover:scale-105 transition-transform duration-500 p-4 sm:h-[300px] h-[250px] flex-grow">
          <figure className="w-[165px] h-[165px] p-2 rounded-lg flex items-center justify-center">
            <img
              src={brandImg}
              alt={brandName}
              className="object-contain h-full w-full"
            />
          </figure>
          <div className="card-body flex-grow flex items-center justify-center">
            <h2 className="card-title text-center text-black">{brandName}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BrandCard;
