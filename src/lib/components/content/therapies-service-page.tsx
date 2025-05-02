import React, { useEffect } from "react";
import TherapyServiceCard from "../therapy-service-card";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import useTherapy from "@/lib/hooks/useTherapy";
import Loader from "../ui/loader";
import { useMediaQuery } from "react-responsive";
import { removeWhitespace } from "@/lib/utils/string-util";
import { TherapyImages } from "@/lib/constants";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const TherapyPageServiceContent = () => {
  const { getAllTherapies, therapies, loading, error } = useTherapy();
  useEffect(() => {
    getAllTherapies();
  }, []);

    const therapyList = therapies?.map((therapy) => {
      const key = removeWhitespace(therapy?.name ?? "");
      
      const image = TherapyImages[key as keyof typeof TherapyImages] || "assets/therapies/therapy_placeholder.jpg";
      
      return {
        ...therapy,
        image,
      };
    }) as TherapyWithImage[];

  if (loading)
    return (
      <div className="bg-[#f2f0ea] min-h-dvh">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="bg-[#f2f0ea] min-h-dvh">
        <Loader />
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-dvh w-full p-4 bg-[#f2f0ea]">
      <Swiper
        slidesPerView={1}
        navigation
        
        className="w-full cursor-grab"
        autoplay={{ delay: 5000, disableOnInteraction: true }}
      >
        {therapyList.map((therapy) => (
          <SwiperSlide
            key={therapy.id}
            defaultValue={therapy.id}
            className="flex justify-center items-center"
          >
            <TherapyServiceCard therapy={therapy} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TherapyPageServiceContent;
