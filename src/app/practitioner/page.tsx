"use client";

import HoverCard from "@/lib/components/hover-card";
import { DUMMY_PRACTITIONERS } from "@/lib/data/dummy-practitioner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSearchParams, useRouter } from "next/navigation";

const PractitionerPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay,
          }),
        ]}
      >
        <CarouselContent>
          {DUMMY_PRACTITIONERS.map((practitioner) => (
            <CarouselItem key={practitioner.id} className="basis-1/4">
              <div className="flex flex-col items-center justify-center p-4">
                <HoverCard
                  name={practitioner.name}
                  image={practitioner.image}
                  practice={practitioner.practice}
                  description={practitioner.description}
                  onCardClick={() => handleCardClick("/practitioner/" + practitioner.id)}
                />

                <div className="flex flex-col items-center justify-center mt-4">
                  <h2>
                    <span className="text-md font-light text-gray-800">
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

export default PractitionerPage;
