// src/components/LoyaltyPoints.js
import React from "react";
import "./../../Css/LoyaltyPoints.css";

function LoyaltyPoints({ points, onRedeem }) {
  return (
    <div className="loyalty-points">
      <h3>Your Loyalty Points: {points}</h3>
      <button className="btn-primary" onClick={onRedeem}>
        Redeem Points
      </button>
    </div>
  );
}

export default LoyaltyPoints;
