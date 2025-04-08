"use client";
import React from "react";
import ServiceFilter from "./service-filter";
import { DUMMY_PRACTITIONERS } from "../data/dummy-practitioner";
import { therapies } from "../data/dummy_therapies";
import PractitionerCard from "./practitioner-card";

const ServicePageContent = () => {
  const therpaiesOptions: Option[] = therapies.map((therapy) => ({
    value: therapy.id,
    label: therapy.title,
  }));

  const practitionerOptions: Option[] = DUMMY_PRACTITIONERS.map(
    (practitioner) => ({
      value: practitioner.id,
      label: practitioner.name,
    })
  );

  return (
    <div className="flex gap-4 p-4">
      {/* Fixed Sidebar Filter */}
      <div className="sticky top-4 h-fit w-full max-w-md">
        <ServiceFilter
          practitionerOptions={practitionerOptions}
          therapiesOptions={therpaiesOptions}
          onTherapyChange={(value) => console.log(value)}
          onPractitionerChange={(value) => console.log(value)}
          onButtonClick={() => console.log("Button clicked")}
        />
      </div>

      {/* Practitioner Cards */}
      <div className="flex flex-col gap-6">
        {DUMMY_PRACTITIONERS.map((practitioner) => (
          <PractitionerCard
            key={practitioner.id}
            practitioner={practitioner}
            loading={false}
            error={null}
            onPractitionerClick={(practitioner) =>
              console.log(practitioner)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePageContent;
