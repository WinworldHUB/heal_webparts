"use client";

import HoverCard from "@/lib/components/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/lib/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loader from "../ui/loader";
import usePractitioners from "../../hooks/usePractitioners";
import { getFullName } from "../../utils/string-util";

const PractitionerPageContent = () => {
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;
  const { practitioners, loading, error, getAllPractitioners } =
    usePractitioners();

  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    getAllPractitioners();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;
  }
  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[Autoplay({ delay })]}
      >
        <CarouselContent className="p">
          {(practitioners ?? ([] as Practitioner[])).map((practitioner) =>
            practitioner ? (
              <CarouselItem key={practitioner.id} className="basis-1/3 p-0">
                <div className="flex flex-col items-center justify-center">
                  <HoverCard
                    practitioner={practitioner}
                    onCardClick={() =>
                      handleCardClick(
                        `https://heal-wellness.co.uk/practitioner?id=${practitioner.id}`
                      )
                    }
                  />

                  <div className="flex flex-col items-center justify-center mt-4">
                    <h2>
                      <span className="text-xl font-semibold text-[#193a5e]">
                        {getFullName(practitioner?.firstName, practitioner?.lastName)}
                      </span>
                    </h2>
                  </div>
                </div>
              </CarouselItem>
            ) : (
              <Loader />
            )
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PractitionerPageContent;
