"use client";
import TherapyWidget from "@/lib/components/therapy-widget";
import { therapies } from "@/lib/data/dummy_therapies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const extendedTherapies = [...therapies, ...therapies];

  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align:"start" 
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="">
          {extendedTherapies.map((therapy, index) => (
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
}
