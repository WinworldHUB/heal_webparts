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
import { useRouter, redirect, RedirectType } from "next/navigation";
import { DMS_PATHS, THERAPY_IMAGE_PLACEHOLDER } from "../constants";
import useDocLinks from "../hooks/useDocLinks";
import useLocalStorage from "../hooks/useLocalStorage";
import { getDocumentFromUrl } from "../utils";

SwiperCore.use([Pagination, Navigation, Autoplay, EffectCards]);

interface TherapyServiceCardProps {
  therapy: Therapy;
}

const TherapyServiceCard: FC<TherapyServiceCardProps> = ({ therapy }) => {
  const [therapyDetails, setTherapyDetails] = useState<TherapyDetails | null>(
    null
  );
  const { setValue } = useLocalStorage<string>();
  const [therapyImage, setTherapyImage] = useState<string | null>(null);

  const { getTherapyDetails, getTherapyImage, loading, error } = useTherapy();

  const handleImageDetails = async (docLink: DocLinkDetails) => {
    const doc = await getDocumentFromUrl(docLink.url, docLink.title);
    if (doc) {
      setTherapyImage(URL.createObjectURL(doc));
    } else {
      setTherapyImage(docLink.url);
    }
  };

  useEffect(() => {
    getTherapyDetails(therapy.id, (therapyDetails) => {
      getTherapyImage(therapyDetails?.therapy.id, handleImageDetails);
      setTherapyDetails(therapyDetails);
    });
  }, []);

  // useEffect(() => {
  //   if (therapy) {
  //     getDocLink(
  //       therapy.id,
  //       `${DMS_PATHS.IMAGES.BASE}${DMS_PATHS.IMAGES.THERAPY}/${therapy.id}`,
  //       (docLink) => {
  //         setTherapyImage(docLink.url);
  //       }
  //     );
  //   }
  // }, [therapy]);

  // if (loading || error) {
  //   return (
  //     <div className="bg-[#f2f0ea]">
  //       <Loader />
  //     </div>
  //   );
  // }
  const handlePractitionerClick = (practitionerId: string) => {
    setValue("practitionerId", practitionerId);
    const newUrl = `https://heal-wellness.co.uk/practitioner`;
    window.open(newUrl, "_self", "noopener,noreferrer");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-5xl w-full p-4">
        <Avatar className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <AvatarImage
            src={therapyImage ?? THERAPY_IMAGE_PLACEHOLDER}
            className="w-full h-full object-cover bg-transparent"
          />
        </Avatar>

        <div className="flex flex-col items-center md:items-start w-full gap-4">
          <div key={therapyDetails?.therapy?.id} className="w-full">
            <h2 className="text-2xl font-bold">
              {therapyDetails?.therapy?.name}
            </h2>
            <p className="text-gray-600">
              {therapyDetails?.therapy?.description}
            </p>
          </div>

          {therapyDetails?.practitioners.length > 0 && (
            <>
              <Separator className="my-2 w-full" />
              <Swiper
                slidesPerView={2}
                // navigation
                pagination
                loop
                className="w-full"
                autoplay={{ delay: 5000, disableOnInteraction: true }}
              >
                {therapyDetails.practitioners.map((practitioner) => (
                  <SwiperSlide key={practitioner.id}>
                    <TherapyPractitionerCard
                      practitioner={practitioner}
                      onPractitionerClick={handlePractitionerClick}
                    />
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
