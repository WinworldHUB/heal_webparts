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

interface TherapyListCardProps {
  therapy: Therapy;
}

const TherapyListCard: FC<TherapyListCardProps> = ({ therapy }) => {
  const [therapyDetails, setTherapyDetails] = useState<TherapyDetails | null>(
    null
  );
  const { setValue } = useLocalStorage<string>();
  const { getDocLink } = useDocLinks();
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
        <AccordionTrigger className="text-2xl">{therapy.name}</AccordionTrigger>
        <Separator className="bg-[#a99870] h-[1px] w-full" />
        <AccordionContent>
          <div className="flex flex-col gap-2 mt-2 w-100">
            {therapyDetails?.practitioners?.length ? (
              therapyDetails.practitioners.map((p) => (
                <div key={p.id} className="w-full">
                  <span
                    key={p.id}
                    className="cursor-pointer text-base w-full"
                    onClick={() => handlePractitionerClick(p.id)}
                  >
                    {getFullName(p.firstName, p.lastName)}
                  </span>
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
