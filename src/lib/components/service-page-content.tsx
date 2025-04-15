"use client";

import React, { useEffect, useState } from "react";
import ServiceFilter from "./service-filter";
import PractitionerCard from "./practitioner-card";
import Loader from "./ui/loader";

import { useRouter } from "next/navigation";
import usePractitioners from "../hooks/usePractitioners";
import useClinics from "../hooks/useClinics";
import useTherapy from "../hooks/useTherapy";
import PractitionerList from "./practitioner-list";

const ServicePageContent = () => {
  const router = useRouter();

  const {
    practitioners,
    loading,
    error,
    getAllPractitioners,
    getPractitionerById,
  } = usePractitioners();
  const { clinics, getClinicById } = useClinics();
  const { getTherapyById, therapies } = useTherapy();
  const [selectedTherapyId, setSelectedTherapyId] = useState<string>("");
  const [selectedPractitionerId, setSelectedPractitionerId] =
    useState<string>("");
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  const therapiesOptions: Option[] = therapies.map((therapy) => ({
    value: therapy.therapyId,
    label: therapy.therapyName,
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

  const handleSearch = () => {
    if (selectedClinicId) {
      console.log("clinic id", selectedClinicId);

      getClinicById(selectedClinicId);
    }

    if (selectedTherapyId) {
      console.log("Therapy id", selectedTherapyId);
      getTherapyById(selectedTherapyId);
    }

    if (selectedPractitionerId) {
      console.log("practioner id", selectedPractitionerId);
      getPractitionerById(selectedPractitionerId);
    }
  };

  const handleClear = () => {
      setSelectedClinicId("")
      setSelectedPractitionerId("")
      setSelectedTherapyId("")
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#f2f0ea] min-h-dvh">
      {/* Sidebar Filter */}
      <div className="w-full md:max-w-sm sticky top-4 h-fit">
        <ServiceFilter
          clinics={clinicOptions}
          therapies={therapiesOptions}
          practitioners={practitionerOptions}
          filteredTherapies={therapiesOptions}
          filteredPractitioners={practitionerOptions}
          selectedClinicId={selectedClinicId}
          selectedTherapyId={selectedTherapyId}
          selectedPractitionerId={selectedPractitionerId}
          onClinicChange={(id) => setSelectedClinicId(id)}
          onTherapyChange={(id) => setSelectedTherapyId(id)}
          onPractitionerChange={(id) => setSelectedPractitionerId(id)}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>

      {/* Practitioner List */}
     <PractitionerList practitioners={practitioners} onPractitionerClick={onPractitionerClick}/>
    </div>
  );
};

export default ServicePageContent;
