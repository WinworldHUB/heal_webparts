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
  
    </div>
  );
}
