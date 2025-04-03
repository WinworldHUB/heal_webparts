"use client";
import HoverCard from "@/lib/components/hover-card";
import { DUMMY_PRACTITIONERS } from "@/lib/data/dummy-practitioner";
import React from "react";

const PractitionerPage = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full h-screen p-4">
      {DUMMY_PRACTITIONERS.map((practitioner) => (
        <div className="flex flex-col items-center justify-center w-1/4 p-4" key={practitioner.id}>
          <HoverCard
            key={practitioner.id}
            name={practitioner.name}
            image={practitioner.image}
            practice={practitioner.practice}
            description={practitioner.description}
            onCardClick={() => {}}
          />

          <h2>
            <span className="text-lg font-bold text-gray-800">{practitioner.name}</span>
          </h2>
          <p className="text-sm text-gray-600">{practitioner.practice}</p>
        </div>
      ))}
    </div>
  );
};

export default PractitionerPage;
