"use client";
import { useSearchParams } from "next/navigation";
import TherapyWidget from "@/lib/components/therapy-widget";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import useTherapy from "@/lib/hooks/useTherapy";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { TherapyImages } from "@/lib/constants";
import { removeWhitespace } from "@/lib/utils/string-util";

// Init modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const TherapyPageContent = () => {
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;

  const { loading, error, getAllTherapies, therapies } = useTherapy();

  useEffect(() => {
    getAllTherapies();
  }, []);

  if (loading || error) {
    return <Loader />;
  }

  const therapyList = therapies?.map((therapy) => {
    console.log("therapy name", therapy?.name);
    
    const key = removeWhitespace(therapy?.name ?? "");
    console.log("image key", key);
    
    const image = TherapyImages[key as keyof typeof TherapyImages] || "https://via.placeholder.com/150";
    console.log("image", image);
    
    return {
      ...therapy,
      image,
    };
  }) as TherapyWithImage[];

  

  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay:3000,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {therapyList?.map((therapy) => (
          <SwiperSlide key={therapy?.id}>
            <TherapyWidget therapy={therapy ?? ({} as TherapyWithImage)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TherapyPageContent;
