import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "animate.css";

import { Autoplay, EffectFade } from "swiper/modules";

import { useState } from "react";

import HomeButtons from "./HomeButtons";

import banner1 from "../../assets/Banner1.jpg";
import banner2 from "../../assets/Banner2.jpg";
import banner3 from "../../assets/Banner3.jpg";

const SwiperLayout = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    setActiveSlide(activeSlideIndex);
  };

  return (
    <div className="w-full mx-auto min-h-screen mt-14">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="w-full h-[38rem] md:min-h-screen object-cover"
            src={banner1}
            alt="Banner image"
          />
          <div className="px-10 absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <h2 className="text-center font-bold text-4xl md:text-6xl text-white">
              Donate Blood To Save Live
            </h2>
            <div>
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[38rem] md:min-h-screen object-cover"
            src={banner2}
            alt="Banner image"
          />
          <div className="px-10 absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <h2 className="text-center font-bold text-4xl md:text-6xl text-white">
              Donate Blood To Save Live
            </h2>
            <div>
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[38rem] md:min-h-screen object-cover"
            src={banner3}
            alt="Banner image"
          />
          <div className="px-10 absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <h2 className="text-center font-bold text-4xl md:text-6xl text-white">
              Donate Blood To Save Live
            </h2>
            <div>
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperLayout;
