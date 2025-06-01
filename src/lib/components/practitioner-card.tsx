"use client";

import React, { FC } from "react";
import { Button } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";
import { truncateText } from "../utils/string-util";
import Image from "next/image";

interface PractitionerCardProps {
  practitioner: Practitioner;
  onPractitionerClick: (practitionerId: string) => void;
  onBookAppointmentClick: (practitionerId: string) => void;
}

const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
  onPractitionerClick,
  onBookAppointmentClick,
}) => {
  return (
    <Card
      key={practitioner?.id}
      className="w-full sm:w-4/5 lg:w-full p-4 rounded-2xl shadow-md h-60"
    >
      <CardContent className="flex flex-row gap-4 h-full px-0">
        <Image
          src={practitioner?.practitionerImage || "/assets/doctor_image.jpg"}
          onError={(e) => (e.currentTarget.src = "/assets/doctor_image.jpg")}
          alt={practitioner?.firstName + practitioner?.lastName}
          width={160}
          height={160}
          className="object-cover rounded-2xl h-40 w-40"
        />

        <div className="flex flex-col justify-between w-full h-full">
          <div>
            <h2 className="text-xl font-bold">
              {practitioner?.firstName + " " + practitioner?.lastName}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: truncateText(
                  practitioner?.businessSummary?.trim()
                    ? practitioner.businessSummary
                    : practitioner.biography,
                  50
                ),
              }}
              className="text-gray-600 mt-2"
            />
          </div>

          <div className="flex gap-2 justify-end items-end">
            <Button
              className="bg-green-600 text-white hover:bg-green-700 rounded-4xl"
              onClick={() => onPractitionerClick(practitioner.id)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionerCard;
