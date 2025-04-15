"use client";

import React, { useEffect, useState } from "react";
import ServiceFilter from "./service-filter";
import PractitionerCard from "./practitioner-card";
import Loader from "./ui/loader";

import { therapies } from "../data/dummy_therapies";
import { useRouter } from "next/navigation";
import usePractitioners from "../hooks/usePractitioners";

const ServicePageContent = () => {
  const router = useRouter();

  const { practitioners, loading, error, getAllPractitioners } =
    usePractitioners();
  const [selectedTherapyIds, setSelectedTherapyIds] = useState<string[]>([]);
  const [selectedPractitionerIds, setSelectedPractitionerIds] = useState<
    string[]
  >([]);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  const therapiesOptions: Option[] = therapies.map((therapy) => ({
    value: therapy.id,
    label: therapy.title,
  }));

  const practitionerOptions: Option[] = practitioners.map((practitioner) => ({
    value: practitioner.id,
    label: practitioner?.firstName + practitioner?.lastName,
  }));

  const dummyClinics: Option[] = [
    { value: "clinic-1", label: "Downtown Wellness" },
    { value: "clinic-2", label: "Lakeside Healing Center" },
    { value: "clinic-3", label: "Sunrise Therapy Hub" },
  ];

  const onPractitionerClick = (practitioner: Practitioner) => {
    router.push(`/practitioners/${practitioner.id}`);
  };

  useEffect(() => {
    getAllPractitioners();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#f2f0ea] min-h-dvh">
      {/* Sidebar Filter */}
      <div className="w-full md:max-w-xs sticky top-4 h-fit">
        <ServiceFilter
          clinics={dummyClinics}
          therapies={therapiesOptions}
          practitioners={practitionerOptions}
          filteredTherapies={therapiesOptions}
          filteredPractitioners={practitionerOptions}
          selectedClinicId={selectedClinicId}
          selectedTherapyIds={selectedTherapyIds}
          selectedPractitionerIds={selectedPractitionerIds}
          onClinicChange={(id) => setSelectedClinicId(id)}
          onTherapyChange={(ids) => setSelectedTherapyIds(ids)}
          onPractitionerChange={(ids) => setSelectedPractitionerIds(ids)}
          onSearch={() => {}}
        />
      </div>

      {/* Practitioner Cards */}
      <div className="flex flex-col gap-6 w-full">
        {(practitioners ?? []).map((practitioner) => (
          <PractitionerCard
            key={practitioner.id}
            practitioner={practitioner}
            loading={false}
            error={null}
            onPractitionerClick={onPractitionerClick}
            onBookAppointmentClick={(practitionerId) =>
              console.log(practitionerId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePageContent;
