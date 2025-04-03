import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { PiCaretRight } from "react-icons/pi";

interface TherapyWidgetProps {
  therapy: Therapy;
}

const TherapyWidget: FC<TherapyWidgetProps> = ({ therapy }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="">
        <Avatar className="h-56 w-56 shadow-lg">
          <AvatarImage
            src={therapy.image}
            alt="Therapist"
            className="size-full object-cover rounded-full"
          />
        </Avatar>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{therapy.title}</h3>
      <p className="mt-2 text-gray-600">{therapy.description}</p>
      <Link
        href={therapy.link}
        className="group mt-3 w-40 mx-0 border border-[#a99870] text-[#a99870] px-4 py-2 rounded-4xl flex items-center justify-center transition-all duration-300 hover:bg-[#a99870] hover:text-white"
      >
        Learn More
        <span className="max-w-0 overflow-hidden transition-all  group-hover:max-w-fit group-hover:ml-2 duration-300 flex items-center">
          <PiCaretRight className="text-2xl text-white" size={24} />
        </span>
      </Link>
    </div>
  );
};

export default TherapyWidget;
