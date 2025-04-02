import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { StaticImageData } from "next/image";
import React, { FC } from "react";

interface TherapyWidgetProps {
  therapy: Therapy;
}

const TherapyWidget: FC<TherapyWidgetProps> = ({
  therapy
}) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="relative transition-all duration-300 hover:mb-4">
        <Avatar className="size-20 shadow-lg">
          <AvatarImage
            src={therapy.image}
            alt="Therapist"
            className="size-full object-cover rounded-full"
          />
        </Avatar>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{therapy.title}</h3>
      <p className="mt-2 text-gray-600">{therapy.description}</p>
      <a
        href={therapy.link}
        className="mt-3 text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More
      </a>
    </div>
  );
};

export default TherapyWidget;
