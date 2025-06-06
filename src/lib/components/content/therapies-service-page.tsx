import React, { useEffect } from "react";
import TherapyServiceCard from "../therapy-service-card";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import useTherapy from "@/lib/hooks/useTherapy";
import Loader from "../ui/loader";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const TherapyPageServiceContent = () => {
  const { getAllTherapies, therapies, loading, error } = useTherapy();
  useEffect(() => {
    getAllTherapies();
  }, []);

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
        loop
      >
        {therapies.map((therapy) => (
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
