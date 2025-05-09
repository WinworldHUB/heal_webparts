import React, { FC } from "react";
import { getFullName } from "../utils/string-util";
import { Avatar, AvatarImage } from "./ui/avatar";
import RawHTML from "./raw-html";

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
        <Avatar className="h-16 w-16 shadow-lg shrink-0">
          <AvatarImage
            alt={getFullName(practitioner.firstName, practitioner.lastName)}
            src={
              practitioner.practitionerImage || "/assets/therapy_service.png"
            }
            onError={(e) =>
              (e.currentTarget.src = "/assets/therapy_service.png")
            }
            className="h-16 w-16 object-cover rounded-full"
          />
        </Avatar>

        <div className="flex flex-col">
          <span
            className="text-2xl font-normal cursor-pointer"
            onClick={() => handlePractitionerClick(practitioner.id)}
          >
            {getFullName(practitioner.firstName, practitioner.lastName)}
          </span>
          <div className="mt-1 text-[16px] text-gray-700">
            <RawHTML html={practitioner.businessSummary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyListPractitioner;
