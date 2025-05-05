"use client";

import React, { FC } from "react";
import { Card, CardContent } from "@/lib/components/ui/card";
import { truncateText } from "../utils/string-util";

interface TherapyPractitionerCardProps {
  practitioner: Practitioner;
  onPractitionerClick: (practitionerId: string) => void;
}

const TherapyPractitionerCard: FC<TherapyPractitionerCardProps> = ({
  practitioner,
  onPractitionerClick,
}) => {
  return (
    <Card
      key={practitioner?.id}
      className="w-full sm:max-w-[250px] p-4 rounded-2xl shadow-md"
      onClick={() => onPractitionerClick(practitioner?.id)}
    >
      <CardContent className="flex flex-col items-start px-0 sm:flex-row gap-4">
        <img
          src={practitioner?.practitionerImage}
          onError={(e) => (e.currentTarget.src = "/assets/doctor_image.jpg")}
          alt={practitioner?.firstName + practitioner?.lastName}
          className="object-cover rounded-2xl h-16 w-16"
          loading="lazy"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-lg font-bold">
            {practitioner?.firstName + " " + practitioner?.lastName}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: truncateText(practitioner?.businessSummary, 18),
            }}
            className="text-gray-600 mt-2 text-sm sm:text-base truncate"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyPractitionerCard;
