"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Array of banner images (Make sure they exist in `public/images/`)
const images = [
  "https://i.ibb.co.com/1K6JnsZ/3.jpg",
  "https://i.ibb.co.com/MNv1HhJ/2.jpg",
  "https://i.ibb.co.com/cC8fm25/1.jpg",
];

const Banner = () => {
  return (
    <div className="w-full h-[60vh]">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
