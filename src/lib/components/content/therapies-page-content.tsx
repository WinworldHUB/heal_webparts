"use client";
import { useSearchParams } from "next/navigation";
import TherapyWidget from "@/lib/components/therapy-widget";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import useTherapy from "@/lib/hooks/useTherapy";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { loading, error, getAllTherapies, therapies } = useTherapy();

  useEffect(() => {
    getAllTherapies();
  }, []);

  if (loading || error) {
    return <Loader />;
  }

  const therapyList = therapies?.map((therapy) => {
    const key = removeWhitespace(therapy?.name ?? "");
    
    const image = TherapyImages[key as keyof typeof TherapyImages] || "assets/therapies/therapy_placeholder.jpg";
    
    return {
      ...therapy,
      image,
    };
  }) as TherapyWithImage[];

  

  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden">
      <Swiper
        spaceBetween={20}
        slidesPerView={isMobile ? 1 : 4}
        loop={true}
        autoplay={{
          delay:delay,
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
