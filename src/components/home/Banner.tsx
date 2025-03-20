/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGetAllBanner } from "@/hooks/banner.hook";

// Define Banner type
interface Banner {
  id: string;
  image: string;
}

const Banner = () => {
  const [domain, setDomain] = useState<string>("");
  const { data: bannerData, isLoading, isError } = useGetAllBanner(domain);
  const banners: Banner[] = bannerData?.data || [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  if (isLoading) {
    return <div className="h-[60vh] flex justify-center items-center">লোড হচ্ছে...</div>;
  }

  if (isError || banners.length === 0) {
    return <div className="h-[60vh] flex justify-center items-center">কোনো ব্যানার পাওয়া যায়নি।</div>;
  }

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
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index}>
            <div className="relative w-full h-full">
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0} // Prioritize first image for better performance
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
