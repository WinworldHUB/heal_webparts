"use client";
import React, { useEffect, useState } from "react";
import Loader from "../ui/loader";

import { useRouter } from "next/navigation";
import usePractitioners from "../../hooks/usePractitioners";
import useClinics from "../../hooks/useClinics";
import useTherapy from "../../hooks/useTherapy";
import PractitionerList from "../practitioner-list";
import { EMPTY_FILTER_SELECTIONS } from "../../constants";
import PractitionerPageContent from "./practitioner-page-content";
import PractitionerInfo from "../practitioner-info";
import { PiCaretLeftBold, PiCaretLeftLight } from "react-icons/pi";
import SimpleButton from "../simple-button";
import SimpleFlexbox from "../simple-flexbox";
import { Combobox } from "../ui/combobox";
import { getComboBoxOptions } from "@/lib/utils/array-utils";

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
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<PractitionerDetails | null>(null);

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
          //setTherapies([therapyDetails.therapy]);
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

  const onPractitionerClick = (practitionerId: string) => {
    if (practitionerId) {
      getPractitionerDetails(practitionerId, (practitionerDetails) =>
        setSelectedPractitioner(practitionerDetails)
      );
    }
  };

  useEffect(() => {
    getAllClinics(setClinics);
    getAllTherapies((allTherapies) => {
      setTherapies(allTherapies);
      const values = getComboBoxOptions(allTherapies, "id", "name");
      console.log("Therapies ComboBox Options:", values);
    });
    getAllPractitioners(setPractitioners);
  }, []);

  if (practitionersLoading || clinicsLoading || therapiesLoading)
    return (
      <div className="bg-[#f2f0ea]">
        <Loader />
      </div>
    );
  if (practitionersError || clinicsError || therapiesError)
    return (
      <div className="bg-[#f2f0ea]">
        <Loader />
      </div>
    );

  return (
    <SimpleFlexbox flexDirection="col" className="app-bg min-h-dvh">
      {!selectedPractitioner && (
        <SimpleFlexbox className="p-4">
          <h1 className="text-nowrap">All Practitioners</h1>
          <SimpleFlexbox justifyContent="end" className="gap-4">
            <Combobox
              options={getComboBoxOptions(therapies, "id", "name")}
              onChange={(id) => {
                console.log("Selected Therapy ID:", id);
                handleFilterChange({
                  ...filterSelections,
                  selectedTherapyId: id,
                });
              }}
              placeholder="Select Therapies..."
              selected={filterSelections.selectedTherapyId}
            />
            <Combobox
              options={getComboBoxOptions(clinics, "id", "name")}
              onChange={(id) => {
                handleFilterChange({
                  ...filterSelections,
                  selectedClinicId: id,
                });
              }}
              placeholder="Select Clinic..."
              selected={filterSelections.selectedClinicId}
            />
          </SimpleFlexbox>
        </SimpleFlexbox>
      )}
      <div className="flex flex-col lg:flex-row gap-6 p-4 app-bg sm:items-center md:items-start justify-center max-h-[700px] overflow-auto">
        {/* Sidebar Filter */}
        {/* <div className="w-full sm:max-w-xl lg:max-w-sm sticky top-4 h-fit mx-auto">
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
      </div> */}

        {/* Practitioner List */}
        {selectedPractitioner ? (
          <div>
            <SimpleButton
              onClick={() => {
                setSelectedPractitioner(null);
              }}
            >
              <SimpleFlexbox>
                <PiCaretLeftBold />
                <span>All Practitioners</span>
              </SimpleFlexbox>
            </SimpleButton>
            <PractitionerInfo
              practitionerDetails={selectedPractitioner}
              loading={false}
              error={""}
            />
          </div>
        ) : (
          <PractitionerList
            practitioners={practitioners ?? []}
            onPractitionerClick={onPractitionerClick}
          />
        )}
      </div>
    </SimpleFlexbox>
  );
};

export default ServicePageContent;
