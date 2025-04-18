import React, { FC, useEffect, useState } from "react";
import useTherapy from "../hooks/useTherapy";
import TherapyPractitionerCard from "./therapy-practitioner-card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Loader from "./ui/loader";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay, EffectCards } from "swiper/modules";
import { Separator } from "./ui/separator";

SwiperCore.use([Pagination, Navigation, Autoplay, EffectCards]);

interface TherapyServiceCardProps {
  therapy: Therapy;
}

const TherapyServiceCard: FC<TherapyServiceCardProps> = ({ therapy }) => {
  const [therapyDetails, setTherapyDetails] = useState<TherapyDetails | null>(
    null
  );

  const { getTherapyDetails, loading, error } = useTherapy();

  useEffect(() => {
    getTherapyDetails(therapy.therapyId, (therapyDetails) => {
      setTherapyDetails(therapyDetails);
    });
  }, []);

  if (loading || error) {
    return (
      <div className="bg-[#f2f0ea]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-5xl w-full p-4">
        <Avatar className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <AvatarImage
            src="/assets/therapy_service.png"
            className="w-full h-full object-cover bg-transparent"
          />
        </Avatar>

        <div className="flex flex-col items-center md:items-start w-full gap-4">
          <div key={therapyDetails?.therapy?.therapyId} className="w-full">
            <h2 className="text-2xl font-bold">
              {therapyDetails?.therapy?.therapyName}
            </h2>
            <p className="text-gray-600">
              {therapyDetails?.therapy?.therapyDescription}
            </p>
          </div>

          {therapyDetails?.practitioners.length > 0 && (
            <>
              <Separator className="my-2 w-full" />
              <Swiper
                slidesPerView={1}
                navigation
                effect="cards"
                grabCursor
                pagination
                loop
                className="w-full cursor-grab"
                autoplay={{ delay: 5000, disableOnInteraction: true }}
              >
                {therapyDetails.practitioners.map((practitioner) => (
                  <SwiperSlide key={practitioner.id}>
                    <TherapyPractitionerCard practitioner={practitioner} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapyServiceCard;
