"use client";
import { useSearchParams } from "next/navigation";
import TherapyWidget from "@/lib/components/therapy-widget";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/api-constants";

const TherapyPageContent = () => {
  const searchParams = useSearchParams();
  const speed = searchParams.get("speed");
  const delay = speed ? parseInt(speed, 10) : 5000;
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + "/analytics/therapies/all");
        if (!response.ok) throw new Error("Failed to fetch Therapies");

        const { data } = await response.json();

        const transformed = data.map((therapy: Therapy) => ({
          ...therapy,
          title: therapy.therapyName,
          link: therapy.link || "https://heal-wellness.co.uk/",
        }));

        setTherapies(transformed);
      } catch (error) {
        console.error("Error fetching Therapies:", error);
        setError("Unable to load Therapies at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapies();
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
                  therapyName: `${index + 1}. ${therapy.therapyName}`,
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
