"use client";

import HoverCard from "@/lib/components/hover-card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../ui/loader";
import usePractitioners from "../../hooks/usePractitioners";
import { getFullName } from "../../utils/string-util";
import Slider from "../ui/slider";
import { useMediaQuery } from "react-responsive";

const PractitionerPageContent = () => {
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { practitioners, loading, error, getAllPractitioners } =
    usePractitioners();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    getAllPractitioners();
  }, []);

  if (loading || error) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden">
      <Slider
        className="w-full"
        slideTo={currentSlide}
        delay={delay}
        isAutoPlay={true}
        autoHeight={false}
        isShowPagination={false}
        isShowNavigation={false}
        slidesPerView={isMobile ? 1 : 3}
        
        onPageChange={(page) => setCurrentSlide(page)}
      >
        {(practitioners ?? []).map((practitioner) => (
          <div
            key={practitioner.id}
            className="flex flex-col items-center justify-center"
          >
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
                  {getFullName(practitioner.firstName, practitioner.lastName)}
                </span>
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PractitionerPageContent;
