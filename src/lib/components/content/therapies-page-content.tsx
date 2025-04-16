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
        {therapies?.map((therapy) => (
          <SwiperSlide key={therapy?.therapyId}>
            <TherapyWidget therapy={therapy ?? ({} as Therapy)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TherapyPageContent;
