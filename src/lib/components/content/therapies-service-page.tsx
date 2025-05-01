import React, { useEffect } from "react";
import TherapyServiceCard from "../therapy-service-card";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import useTherapy from "@/lib/hooks/useTherapy";
import Loader from "../ui/loader";
import { useMediaQuery } from "react-responsive";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const TherapyPageServiceContent = () => {
  const { getAllTherapies, therapies, loading, error } = useTherapy();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
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
        slidesPerView={isMobile ? 1 : 4}
        navigation
        className="w-full cursor-grab"
        autoplay={{ delay: 5000, disableOnInteraction: true }}
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
