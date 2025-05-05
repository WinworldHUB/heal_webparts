"use client";
import { useSearchParams } from "next/navigation";
import TherapyWidget from "@/lib/components/therapy-widget";
import { useEffect } from "react";
import useTherapy from "@/lib/hooks/useTherapy";
import { useMediaQuery } from "react-responsive";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SkeletonCard } from "../ui/skeleton";

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
    return <SkeletonCard className="min-h-dvh w-full" />;
  }

  return (
    <div className="flex justify-between items-start w-full px-4 overflow-hidden min-h-dvh">
      <Swiper
        spaceBetween={20}
        navigation={true}
        slidesPerView={isMobile ? 1 : 4}
        loop={true}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {therapies?.map((therapy) => (
          <SwiperSlide key={therapy?.id}>
            <TherapyWidget therapy={therapy} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TherapyPageContent;
