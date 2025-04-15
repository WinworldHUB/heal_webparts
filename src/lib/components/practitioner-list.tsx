"use client";
import React, { FC } from "react";
import PractitionerCard from "./practitioner-card";

interface PractitionerListProps {
  practitioners: Practitioner[];
  onPractitionerClick: (practitioner: Practitioner) => void;
}

const PractitionerList: FC<PractitionerListProps> = ({
  practitioners,
  onPractitionerClick,
}) => {
  console.log("PractitionerList", practitioners);
  return (
    <div className="flex flex-col gap-6 w-full">
      {(practitioners ?? []).map((practitioner) => (
        <PractitionerCard
          key={practitioner.id}
          practitioner={practitioner}
          onPractitionerClick={onPractitionerClick}
          onBookAppointmentClick={(practitionerId) =>
            console.log(practitionerId)
          }
        />
      ))}
    </div>
  );
};

export default PractitionerList;
