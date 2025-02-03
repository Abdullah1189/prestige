import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
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
            <div className="h-screen w-full flex items-center bg-[url('/image/banner-1.jpg')] bg-cover bg-opacity-100 bg-no-repeat">
              <div className="p-20">
                <h1 className="text-7xl font-extrabold uppercase text-white">
                  The wind is <br /> not even close to us{" "}
                </h1>
                <button className="btn bg-[#db2d2e] border-none text-white font-semibold mt-10">Discover More</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-screen w-full flex items-center bg-[url('/image/banner-2.jpg')] bg-cover bg-opacity-100 bg-no-repeat">
              <div className="p-20">
                <h1 className="text-7xl font-extrabold uppercase text-white">
                  We Have Everything <br /> Your Car needs!{" "}
                </h1>
                <button className="btn bg-[#db2d2e] border-none text-white font-semibold mt-10">Discover More</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
