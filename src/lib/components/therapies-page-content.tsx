"use client";
import { useSearchParams } from "next/navigation";
import TherapyWidget from "@/lib/components/therapy-widget";
import { therapies } from "@/lib/data/dummy_therapies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TherapyPageContent = () => {
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;

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
          {therapies.map((therapy, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <TherapyWidget
                therapy={{
                  ...therapy,
                  title: `${index + 1}. ${therapy.title}`,
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TherapyPageContent;
