import React, { FC } from "react";
import { getFullName } from "../utils/string-util";
import { Avatar, AvatarImage } from "./ui/avatar";
import RawHTML from "./raw-html";
import { PiCaretRight } from "react-icons/pi";
import Link from "next/link";
import { Button } from "./ui/button";

interface TherapyListPractitionerProps {
  practitioner: Practitioner;
  handlePractitionerClick: (practitionerId: string) => void;
}

const TherapyListPractitioner: FC<TherapyListPractitionerProps> = ({
  practitioner,
  handlePractitionerClick,
}) => {
  return (
    <div className="w-full p-4 border-b border-[#a99870]">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <Avatar className="h-16 w-16 shadow-lg">
          <AvatarImage
            alt={getFullName(practitioner.firstName, practitioner.lastName)}
            src={"/assets/therapy_service.png"}
            onError={(e) =>
              (e.currentTarget.src = "/assets/therapy_service.png")
            }
            className="h-16 w-16 object-cover rounded-full"
          />
        </Avatar>

        <div className="flex flex-col">
          <span className="text-2xl font-normal cursor-pointer">
            {getFullName(practitioner.firstName, practitioner.lastName)}
          </span>
          <div className="mt-1 text-[16px] text-gray-700">
            <RawHTML html={practitioner.businessSummary} />
          </div>
          <div className="pt-4 flex justify-start mt-4 mb-2">
            <Button
              onClick={() => handlePractitionerClick(practitioner.id)}
              className="group bg-transparent w-40 border border-[#a99870] text-[#a99870] px-4 py-2 rounded-4xl flex items-center justify-center transition-all duration-300 hover:bg-[#a99870] hover:text-white"
            >
              Learn More
              <span className="max-w-0 overflow-hidden transition-all group-hover:max-w-fit group-hover:ml-2 duration-300 flex items-center">
                <PiCaretRight className="text-2xl text-white" size={24} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyListPractitioner;
