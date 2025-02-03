import React from "react";
// import "../Css/Home.css";
import HeroSection from "../Components/HeroSection";
import ChooseMe from "../Components/ChooseMe";
import OurServices from "../Components/OurServices";
import Banner from "../Components/Banner/Banner";
import BrandInfo from "../BrandInfo/BrandInfo";
import FAQ from "../Components/FAQ/FAQ";
import DetailingGallery from "../Components/DetailingGallery";
import { useNavigate } from "react-router-dom";

import Before1 from "/src/Gallery/F1.jpg";
import After1 from "/src/Gallery/F2.jpg";
import Before2 from "/src/Gallery/J1.jpg";
import After2 from "/src/Gallery/J2.jpg";

function Home() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/gallery");
  };

  const images = [
    { id: 1, before: Before1, after: After1 },
    { id: 2, before: Before2, after: After2 },
  ];

  return (
    <div>
      <Banner />
      <HeroSection />
      <OurServices />
      <DetailingGallery beforeAfterData={images} />
      

      <ChooseMe />
      <div className="w-5/6 mx-auto">
        <BrandInfo />
        <FAQ />
      </div>
    </div>
  );
}

export default Home;
