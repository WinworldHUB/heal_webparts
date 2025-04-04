"use client";

import HoverCard from "@/lib/components/hover-card";
import { SkeletonCard } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PractitionerPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;

  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/practitioner");
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
    return (
      <div className="flex justify-between items-center w-full px-4 overflow-hidden">
        <Carousel
          className="w-full"
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay })]}
        >
          <CarouselContent>
            {[...Array(4)].map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <div className="p-4">
                  <SkeletonCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-48 text-red-500 text-lg font-medium">
        {error}
      </div>
    );
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
                    handleCardClick("https://heal-wellness.co.uk/practitioner?id=" + practitioner.id)
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
