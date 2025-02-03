// src/components/BiddingList.js
import React from "react";
import "../../Css/BiddingList.css";

function BiddingList({ bids }) {
  return (
    <div className="bidding-list">
      <h3>Available Bids</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Price</th>
            <th>Location</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index}>
              <td>{bid.provider}</td>
              <td>${bid.price || 10}</td>
              <td>{bid.location}</td>
              <td>
                <button className="btn-primary btn-sm">Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BiddingList;
