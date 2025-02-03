/* eslint-disable react/prop-types */

//brandSliderImg1

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";


const BrandSlider = ({sliderBrand}) => {
    
    const {brandSliderImg1, brandSliderImg2, brandSliderImg3} = sliderBrand;

    return (
        <div>
            <div className="">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="w-full max-h-screen" src={brandSliderImg1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full max-h-screen" src={brandSliderImg2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full max-h-screen" src={brandSliderImg3} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
        </div>
    );
};

export default BrandSlider;