"use client";
import React, { useEffect, useState } from "react";
import Loader from "./ui/loader";

import { useRouter } from "next/navigation";
import usePractitioners from "../hooks/usePractitioners";
import useClinics from "../hooks/useClinics";
import useTherapy from "../hooks/useTherapy";
import PractitionerList from "./practitioner-list";
import ServiceFilters from "./service-filters";
import { EMPTY_FILTER_SELECTIONS } from "../constants";

const ServicePageContent = () => {
  const router = useRouter();

  const {
    practitioners: allPractitioners,
    loading: practitionersLoading,
    error: practitionersError,
    getAllPractitioners,
    getPractitionerDetails,
  } = usePractitioners();
  const {
    clinics: allClinics,
    getAllClinics,
    getClinicDetails,
    loading: clinicsLoading,
    error: clinicsError,
  } = useClinics();
  const {
    getAllTherapies,
    getTherapyDetails,
    therapies: allTherapies,
    loading: therapiesLoading,
    error: therapiesError,
  } = useTherapy();

  const [clinics, setClinics] = useState<Clinic[]>(allClinics);
  const [practitioners, setPractitioners] =
    useState<Practitioner[]>(allPractitioners);
  const [therapies, setTherapies] = useState<Therapy[]>(allTherapies);

  const [filterSelections, setFilterSelections] = useState<FilterSelections>(
    EMPTY_FILTER_SELECTIONS
  );

  const handleFilterChange = ({
    selectedClinicId,
    selectedTherapyId,
    selectedPractitionerId,
  }: FilterSelections) => {
    const clinicId = selectedClinicId === "" ? null : selectedClinicId;
    const therapyId = selectedTherapyId === "" ? null : selectedTherapyId;
    const practitionerId =
      selectedPractitionerId === "" ? null : selectedPractitionerId;

    if (!clinicId) {
      setClinics(allClinics);
    }

    if (!therapyId) {
      setTherapies(allTherapies);
    }

    if (!practitionerId) {
      setPractitioners(allPractitioners);
    }

    // If ClinicID !== null, get clinic by ID
    if (clinicId) {
      getClinicDetails(clinicId, (clinicDetails) => {
        if (clinicDetails) {
          setClinics([clinicDetails.clinic]);
          setTherapies(clinicDetails.therapies);
          setPractitioners(clinicDetails.practitioners);
        }
      });
    }
    // If TherapyID !== null, get therapy by ID
    if (therapyId) {
      getTherapyDetails(therapyId, (therapyDetails) => {
        if (therapyDetails) {
          setClinics(therapyDetails.clinics);
          setTherapies([therapyDetails.therapy]);
          setPractitioners(therapyDetails.practitioners);
        }
      });
    }
    // If PractitionerID !== null, get practitioner by ID
    if (practitionerId) {
      getPractitionerDetails(practitionerId, (practitionerDetails) => {
        if (practitionerDetails) {
          setClinics(practitionerDetails.clinics);
          setTherapies(practitionerDetails.therapies);
          setPractitioners([practitionerDetails.practitioner]);
        }
      });
    }

    setFilterSelections({
      selectedClinicId: clinicId,
      selectedTherapyId: therapyId,
      selectedPractitionerId: practitionerId,
    });
  };

  const onPractitionerClick = (practitioner: Practitioner) => {
    router.push(`/practitioners/${practitioner.id}`);
  };

  useEffect(() => {
    getAllClinics(setClinics);
    getAllTherapies(setTherapies);
    getAllPractitioners(setPractitioners);
  }, []);

  if (practitionersLoading || clinicsLoading || therapiesLoading)
    return <Loader />;
  if (practitionersError || clinicsError || therapiesError) return <Loader />;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-[#f2f0ea] min-h-dvh sm:items-center md:items-start justify-center">
      {/* Sidebar Filter */}
      <div className="w-full sm:max-w-xl lg:max-w-sm sticky top-4 h-fit mx-auto">
        <ServiceFilters
          clinics={clinics ?? []}
          therapies={therapies ?? []}
          practitioners={practitioners ?? []}
          selectedClinicId={filterSelections.selectedClinicId}
          selectedTherapyId={filterSelections.selectedTherapyId}
          selectedPractitionerId={filterSelections.selectedPractitionerId}
          onClinicChange={(id) => {
            handleFilterChange({ ...filterSelections, selectedClinicId: id });
          }}
          onTherapyChange={(id) => {
            handleFilterChange({ ...filterSelections, selectedTherapyId: id });
          }}
          onPractitionerChange={(id) => {
            handleFilterChange({
              ...filterSelections,
              selectedPractitionerId: id,
            });
          }}
          onClearClicked={() => {
            handleFilterChange(EMPTY_FILTER_SELECTIONS);
          }}
        />
      </div>

      {/* Practitioner List */}
      <PractitionerList
        practitioners={practitioners ?? []}
        onPractitionerClick={onPractitionerClick}
      />
    </div>
  );
};

export default ServicePageContent;
