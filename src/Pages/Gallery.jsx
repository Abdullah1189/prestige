import React from 'react'
import DetailingGallery from '../Components/DetailingGallery'

import B1 from "/src/Gallery/F1.jpg";
import A1 from "/src/Gallery/F2.jpg";
import B2 from "/src/Gallery/G1.jpg";
import A2 from "/src/Gallery/G2.jpg";
import B3 from "/src/Gallery/H1.jpg";
import A3 from "/src/Gallery/H2.jpg";
import B4 from "/src/Gallery/J1.jpg";
import A4 from "/src/Gallery/J2.jpg";
import B5 from "/src/Gallery/I1.jpg";
import A5 from "/src/Gallery/I2.jpg";
import A6 from "/src/Gallery/J1.jpg";
import B6 from "/src/Gallery/J2.jpg";
import A7 from "/src/Gallery/K1.jpg";
import B7 from "/src/Gallery/K2.jpg";


function Gallery() {

  const allimages = [
    { id: 1, before: B1, after: A1 },
    { id: 2, before: B2, after: A2 },
    { id: 3, before: B3, after: A3 },
    { id: 4, before: B4, after: A4 },
    { id: 5, before: B5, after: A5 },
    { id: 6, before: A6, after: B6 },
    { id: 7, before: A7, after: B7 },
    // { id: 6, before: "/images/before3.jpg", after: "/images/after3.jpg" },
    // { id: 7, before: "/images/before3.jpg", after: "/images/after3.jpg" },
    // { id: 8, before: "/images/before3.jpg", after: "/images/after3.jpg" },
    // { id: 9, before: "/images/before3.jpg", after: "/images/after3.jpg" },
];
  return (
    <div>
      <DetailingGallery beforeAfterData={allimages} />
    </div>
  )
}

export default Gallery