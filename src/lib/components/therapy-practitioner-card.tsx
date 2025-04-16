"use client";

import React, { FC } from "react";
import { Card, CardContent } from "@/lib/components/ui/card";
import { truncateText } from "../utils/string-util";

interface TherapyPractitionerCardProps {
  practitioner: Practitioner;
}

const TherapyPractitionerCard: FC<TherapyPractitionerCardProps> = ({
  practitioner,
}) => {
  return (
    <Card
      key={practitioner?.id}
      className="w-full sm:max-w-[500px] p-4 rounded-2xl shadow-md"
    >
      <CardContent className="flex flex-col items-start px-0 sm:flex-row gap-4">
        <img
          src={practitioner?.practitionerImage}
          onError={(e) => (e.currentTarget.src = "/assets/doctor_image.jpg")}
          alt={practitioner?.firstName + practitioner?.lastName}
          className="object-cover rounded-2xl h-44 w-40"
          loading="lazy"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-lg sm:text-xl font-bold">
            {practitioner?.firstName + " " + practitioner?.lastName}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: truncateText(practitioner?.businessSummary, 200),
            }}
            className="text-gray-600 mt-2 text-sm sm:text-base"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyPractitionerCard;
