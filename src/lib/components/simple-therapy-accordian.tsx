import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Separator } from "./ui/separator";

interface SimpleTherapyAccordionProps {
  data: Therapy[];
  children: React.ReactNode[];
}

const SimpleTherapyAccordion: FC<SimpleTherapyAccordionProps> = ({
  data,
  children,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {(data ?? []).map((therapy, index) => {
        return (
          <AccordionItem value={therapy.id} key={therapy.id}>
            <AccordionTrigger className="text-2xl hover:no-underline">
              {therapy.name}
            </AccordionTrigger>
            <Separator className="bg-[#a99870] h-[1px] w-full" />
            <AccordionContent>{children[index]}</AccordionContent>
          </AccordionItem>
        );
      })}
      {/* <AccordionItem value={therapy.id}>
        <AccordionTrigger className="text-2xl hover:no-underline">
          {therapy.name}
        </AccordionTrigger>
        <Separator className="bg-[#a99870] h-[1px] w-full" />
        <AccordionContent>
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
      </AccordionItem> */}
    </Accordion>
  );
};

export default SimpleTherapyAccordion;
