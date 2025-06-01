"use client";
import React, { FC } from "react";
import PractitionerCard from "./practitioner-card";

interface PractitionerListProps {
  practitioners: Practitioner[];
  onPractitionerClick: (practitionerId: string) => void;
}

const PractitionerList: FC<PractitionerListProps> = ({
  practitioners,
  onPractitionerClick,
}) => {
  if (practitioners?.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <p>No practitioners found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {(practitioners ?? []).map((practitioner) => (
        <PractitionerCard
          key={practitioner.id}
          practitioner={practitioner}
          onPractitionerClick={onPractitionerClick}
          onBookAppointmentClick={() =>
            window.open(
              `https://app.heal-wellness.co.uk/?practitionerId=${practitioner.id}`,
              "_blank"
            )
          }
        />
      ))}
    </div>
  );
};

export default PractitionerList;
