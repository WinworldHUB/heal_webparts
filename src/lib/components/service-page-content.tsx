"use client";
import React, { useEffect, useState } from "react";
import ServiceFilter from "./service-filter";
import { DUMMY_PRACTITIONERS } from "../data/dummy-practitioner";
import { therapies } from "../data/dummy_therapies";
import PractitionerCard from "./practitioner-card";
import Loader from "./ui/loader";

const ServicePageContent = () => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedPractitionerId, setSelectedPractitionerId] = useState<string | null>(null);
  const [selectedTherapyId, setSelectedTherapyId] = useState<string | null>(null);

  const therapiesOptions: Option[] = therapies.map((therapy) => ({
    value: therapy.id,
    label: therapy.title,
  }));

  const practitionerOptions: Option[] = DUMMY_PRACTITIONERS.map((practitioner) => ({
    value: practitioner.id,
    label: practitioner.name,
  }));

  const fetchPractitioners = async (
    practitionerId?: string | null,
    therapyId?: string | null
  ) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (practitionerId) queryParams.append("practitionerId", practitionerId);
      if (therapyId) queryParams.append("therapyId", therapyId);

      const response = await fetch(`/api/practitioner?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch filtered practitioners");

      const data = await response.json();
      setPractitioners(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load practitioners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractitioners();
  }, []);

  const handleTherapyChange = (therapyId: string) => {
    setSelectedTherapyId(therapyId);
  };

  const handlePractitionerChange = (practitionerId: string) => {
    setSelectedPractitionerId(practitionerId);
  };

  const handleSearch = () => {
    fetchPractitioners(selectedPractitionerId, selectedTherapyId);
  };

  if (loading) return <Loader />;
  if (error) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#f2f0ea]">
      {/* Sidebar Filter */}
      <div className="w-full md:max-w-xs sticky top-4 h-fit">
        <ServiceFilter
          practitionerOptions={practitionerOptions}
          therapiesOptions={therapiesOptions}
          onTherapyChange={handleTherapyChange}
          onPractitionerChange={handlePractitionerChange}
          onSearch={handleSearch}
          selectedPractitionerId={selectedPractitionerId}
          selectedTherapyId={selectedTherapyId}
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
            onPractitionerClick={(p) => console.log(p)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePageContent;
