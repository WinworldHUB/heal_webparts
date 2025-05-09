import { Loader } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { DMS_PATHS } from "../constants";
import useDocLinks from "../hooks/useDocLinks";
import useLocalStorage from "../hooks/useLocalStorage";
import useTherapy from "../hooks/useTherapy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { getFullName } from "../utils/string-util";
import { Separator } from "@radix-ui/react-separator";
import TherapyListPractitioner from "./therapy-list-practitioner";

interface TherapyListCardProps {
  therapy: Therapy;
}

const TherapyListCard: FC<TherapyListCardProps> = ({ therapy }) => {
  const [therapyDetails, setTherapyDetails] = useState<TherapyDetails | null>(
    null
  );
  const { setValue } = useLocalStorage<string>();
  const { getTherapyDetails } = useTherapy();

  useEffect(() => {
    getTherapyDetails(therapy.id, (details) => setTherapyDetails(details));
  }, []);

  const handlePractitionerClick = (practitionerId: string) => {
    setValue("practitionerId", practitionerId);
    window.open(
      `https://heal-wellness.co.uk/practitioner`,
      "_self",
      "noopener,noreferrer"
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={therapy.id}>
        <AccordionTrigger className="text-2xl hover:no-underline">{therapy.name}</AccordionTrigger>
        <Separator className="bg-[#a99870] h-[1px] w-full" />
        <AccordionContent >
          <div className="flex flex-col gap-2 mt-2 w-full">
            {therapyDetails?.practitioners?.length ? (
              therapyDetails.practitioners.map((practitioner) => (
                <div key={practitioner.id} className="w-full">
                  <TherapyListPractitioner
                    practitioner={practitioner}
                    handlePractitionerClick={handlePractitionerClick}
                  />
                </div>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No practitioners
              </span>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TherapyListCard;
