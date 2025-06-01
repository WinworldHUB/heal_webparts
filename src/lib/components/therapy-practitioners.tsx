import { FC, useEffect, useState } from "react";
import useTherapy from "../hooks/useTherapy";
import { openUrlInSameTab } from "../utils";
import { WEBSITE_URLS } from "../constants";
import TherapyPractitionerCard from "./therapy-practitioner-card";
import SimpleFlexbox from "./simple-flexbox";
import SimpleLoader from "./simple-loader";
import TherapyListPractitioner from "./therapy-list-practitioner";
import { Separator } from "@radix-ui/react-separator";

interface TherapyPractitionersProps {
  therapy: Therapy;
}

const TherapyPractitioners: FC<TherapyPractitionersProps> = ({ therapy }) => {
  const { getTherapyDetails, loading, error } = useTherapy();
  const [therapyDetails, setTherapyDetails] = useState<TherapyDetails | null>(
    null
  );

  useEffect(() => {
    getTherapyDetails(therapy.id, (details) => setTherapyDetails(details));
  }, []);

  const handlePractitionerClick = () => {
    openUrlInSameTab(WEBSITE_URLS.PRACTITIONERS);
  };

  if (loading) {
    return (
      <SimpleFlexbox justifyContent="start" className="w-full">
        <p>Loading ...</p>
      </SimpleFlexbox>
    );
  } else if (!loading && therapyDetails?.practitioners?.length === 0) {
    return (
      <SimpleFlexbox justifyContent="start" className="w-full">
        <p>No practitioners found</p>
      </SimpleFlexbox>
    );
  }

  const totalPractitioners = therapyDetails?.practitioners?.length ?? 0;

  return (
    <>
      {(therapyDetails?.practitioners ?? []).map((practitioner, index) => (
        <>
          <TherapyListPractitioner
            practitioner={practitioner}
            handlePractitionerClick={handlePractitionerClick}
          />
          {index < totalPractitioners - 1 && (
            <Separator className="w-full border-b border-[#a99870]" />
          )}
        </>
        // <TherapyPractitionerCard
        //   practitioner={practitioner}
        //   onPractitionerClick={handlePractitionerClick}
        //   key={practitioner.id}
        // />
      ))}
    </>
  );
};

export default TherapyPractitioners;
