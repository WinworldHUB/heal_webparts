"use client";
import React from "react";
import ServiceFilter from "./service-filter";
import { DUMMY_PRACTITIONERS } from "../data/dummy-practitioner";
import { therapies } from "../data/dummy_therapies";

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
    <div className="p-4">
      <ServiceFilter
        practitionerOptions={practitionerOptions}
        therapiesOptions={therpaiesOptions}
        onTherapyChange={(value) => console.log(value)}
        onPractitionerChange={(value) => console.log(value)}
        onButtonClick={() => console.log("Button clicked")}
      />
    </div>
  );
};

export default ServicePageContent;
