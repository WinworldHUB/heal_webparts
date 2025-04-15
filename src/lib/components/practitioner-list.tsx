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
  return (
    <div className="flex flex-col gap-6 w-full">
      {(practitioners && practitioners).map((practitioner) => (
        <PractitionerCard
          key={practitioner.id}
          practitionerId={practitioner.id}
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
