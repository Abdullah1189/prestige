// src/components/Header.js
import React from "react";
import Navbar from "../Navbar/Navbar";
import "./../../Css/Header.css";
import { Outlet } from "react-router-dom";

function Header() {
  return (
    
      <div className="container">
        <Navbar />
        
      </div>
    
  );
}

export default Header;
