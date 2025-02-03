/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Rating from "../AddProduct/Rating";

const BrandDetails = ({ brandDetails }) => {
  const { _id, image, name, type, price, ratting } = brandDetails;

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl flex-col lg:flex-row w-10/12 mx-auto my-5 space-y-5 border">
        <figure className="lg:w-4/12 w-full">
          <img className="ml-8" src={image} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Car Name: {name}</h2>
          <p>Car Type: {type}</p>
          <p>Car Price: {price} lac BDT.</p>
          <p className="flex gap-2">Car Rating: <td><Rating rating={ratting}></Rating></td></p>
          <div className="card-actions justify-end">
            <Link to={`updateCar/${_id}`}>
              <button className="btn btn-neutral">Update</button>
            </Link>
            <Link to={`details/${_id}`}>
              <button className="btn btn-info">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
