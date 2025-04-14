"use client";

import HoverCard from "@/lib/components/hover-card";
import { SkeletonCard } from "@/lib/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/lib/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import { API_BASE_URL } from "../constants/api-constants";

const PractitionerPageContent = () => {
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;

  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCardClick = (link: string) => {
    window.open(link, '_blank');
  };
  

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + "/analytics/practitioners/all");
        if (!response.ok) {
          throw new Error("Failed to fetch practitioners");
        }
        const data = await response.json();
        setPractitioners(data);
      } catch (error) {
        console.error("Error fetching practitioners:", error);
        setError("Unable to load practitioners at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchPractitioners();
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
          {practitioners.map((practitioner) => (
            <CarouselItem key={practitioner.id} className="basis-1/3 p-0">
              <div className="flex flex-col items-center justify-center">
                <HoverCard
                  name={practitioner.name}
                  image={practitioner.image}
                  practice={practitioner.practice}
                  description={practitioner.description}
                  onCardClick={() =>
                    handleCardClick(`https://heal-wellness.co.uk/practitioner?id=${practitioner.id}`)
                  }
                />
                <div className="flex flex-col items-center justify-center mt-4">
                  <h2>
                    <span className="text-md font-semibold text-[#193a5e]">
                      {practitioner.name}
                    </span>
                  </h2>
                  <p className="text-lg text-[#a99780]">
                    {practitioner.practice}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PractitionerPageContent;
