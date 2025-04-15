"use client";

import React, { useEffect, useState } from "react";
import ServiceFilter from "./service-filter";
import PractitionerCard from "./practitioner-card";
import Loader from "./ui/loader";

import { therapies } from "../data/dummy_therapies";
import { useRouter } from "next/navigation";
import usePractitioners from "../hooks/usePractitioners";
import useClinics from "../hooks/useClinics";

const ServicePageContent = () => {
  const router = useRouter();

  const { practitioners, loading, error, getAllPractitioners } =
    usePractitioners();
  const { clinics } = useClinics();
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

  const clinicOptions: Option[] = clinics.map((clinic) => ({
    value: clinic.id,
    label: clinic?.name,
  }));

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
          clinics={clinicOptions}
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
    </div>
  );
};

export default ServicePageContent;
