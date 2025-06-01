import useTherapy from "@/lib/hooks/useTherapy";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import TherapyListCard from "../therapy-list-card";
import SimpleTherapyAccordion from "../simple-therapy-accordian";
import TherapyPractitioners from "../therapy-practitioners";

const TherapyListContent = () => {
  const { getAllTherapies, therapies, loading, error } = useTherapy();
  useEffect(() => {
    getAllTherapies();
  }, []);

  if (loading || error) {
    return (
      <div className="bg-[#f2f0ea] min-h-dvh flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const medicalTherapies = therapies.filter((t) => t.isMedical);
  const nonMedicalTherapies = therapies.filter((t) => !t.isMedical);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-[#f2f0ea] min-h-dvh w-full p-10">
        <h1 className="text-4xl font-normal mb-8 text-[#a99870]">Therapies</h1>

        <div className="flex justify-between items-start w-full gap-10">
          {/* Medical Therapies (Left Column) */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-[#a99870]">
              Medical Therapies
            </h2>
            <div className="flex flex-col gap-2">
              <SimpleTherapyAccordion data={medicalTherapies}>
                {medicalTherapies.map((therapy) => (
                  <TherapyPractitioners therapy={therapy} />
                ))}
              </SimpleTherapyAccordion>
              {/* {medicalTherapies.map((t) => (
                <div key={t.id} className="w-full">
                  <TherapyListCard key={t.id} therapy={t} />
                </div>
              ))} */}
            </div>
          </div>

          {/* Non-Medical Therapies (Right Column) */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold mb-4 text-[#a99870]">
              Non-Medical Therapies
            </h2>
            <div className="flex flex-col gap-2 items-start">
              <SimpleTherapyAccordion data={nonMedicalTherapies}>
                {nonMedicalTherapies.map((therapy) => (
                  <TherapyPractitioners therapy={therapy} />
                ))}
              </SimpleTherapyAccordion>
              {/* {nonMedicalTherapies.map((t) => (
                <div key={t.id} className="w-full">
                  <TherapyListCard key={t.id} therapy={t} />
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyListContent;
