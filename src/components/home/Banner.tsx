/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetAllBanner } from "@/hooks/banner.hook";

// Define Banner type
interface Banner {
  id: string;
  image: string;
  title?: string;
  link?: string;
}

const Banner = () => {
  const [domain, setDomain] = useState<string>("");
  const { data: bannerData, isLoading, isError } = useGetAllBanner(domain);
  const banners: Banner[] = bannerData?.data || [];
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full h-[60vh] bg-muted/30 rounded-lg flex flex-col justify-center items-center">
        <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">
          ব্যানার লোড করতে সমস্যা হয়েছে।
        </p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-muted/30 rounded-lg flex flex-col justify-center items-center">
        <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">
          কোনো ব্যানার পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] -mt-5 relative rounded-lg overflow-hidden">
      <Swiper
        onSwiper={setSwiper}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-primary",
          bulletClass:
            "swiper-pagination-bullet bg-gray-300 opacity-70 w-2.5 h-2.5 mx-1",
        }}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        className="w-full h-full banner-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index}>
            <div className="relative w-full h-full">
              <Image
                src={banner.image || "/placeholder.svg"}
                alt={banner.title || `ব্যানার ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0} // Prioritize first image for better performance
              />
              {banner.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {banner.title}
                  </h2>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white shadow-md",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus:opacity-100",
          "h-10 w-10 sm:h-12 sm:w-12"
        )}
        onClick={() => swiper?.slidePrev()}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white shadow-md",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus:opacity-100",
          "h-10 w-10 sm:h-12 sm:w-12"
        )}
        onClick={() => swiper?.slideNext()}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <style jsx global>{`
        .banner-swiper:hover .swiper-button-prev,
        .banner-swiper:hover .swiper-button-next {
          opacity: 1;
        }
        .swiper-pagination {
          bottom: 16px !important;
        }
      `}</style>
    </div>
  );
};

const BannerSkeleton = () => {
  return (
    <div className="w-full h-[60vh] relative rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />

      {/* Fake pagination dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 opacity-70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 opacity-70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 opacity-70"></div>
      </div>

      {/* Fake navigation buttons */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/80 shadow-md flex items-center justify-center">
        <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 rounded-full" />
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/80 shadow-md flex items-center justify-center">
        <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 rounded-full" />
      </div>
    </div>
  );
};

export default Banner;
