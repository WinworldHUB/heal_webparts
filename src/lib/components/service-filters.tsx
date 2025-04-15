"use client";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Combobox } from "./ui/combobox";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { getComboBoxOptions } from "../utils/array-utils";

interface ServiceFiltersProps {
  clinics: Clinic[];
  therapies: Therapy[];
  practitioners: Practitioner[];
  selectedClinicId?: string;
  selectedTherapyId?: string;
  selectedPractitionerId?: string;
  onClinicChange?: (clinicId: string) => void;
  onTherapyChange?: (therapyId: string) => void;
  onPractitionerChange?: (practitionerId: string) => void;
  onClearClicked?: VoidFunction;
}

const ServiceFilters: FC<ServiceFiltersProps> = ({
  clinics,
  practitioners,
  therapies,
  selectedClinicId,
  selectedTherapyId,
  selectedPractitionerId,
  onClinicChange,
  onTherapyChange,
  onPractitionerChange,
  onClearClicked,
}) => {
  console.log(selectedClinicId, selectedTherapyId, selectedPractitionerId);
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full p-4 gap-3">
        <CardHeader className="p-0">
          <CardTitle className="text-lg mb-2">Book an Appointment</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 p-0">
          <Combobox
            options={getComboBoxOptions(clinics, "id", "name")}
            onChange={onClinicChange}
            placeholder="Select Clinic..."
            selected={selectedClinicId}
          />

          <Combobox
            options={getComboBoxOptions(therapies, "therapyId", "therapyName")}
            onChange={onTherapyChange}
            placeholder="Select Therapies..."
            selected={selectedTherapyId}
          />

          <Combobox
            options={getComboBoxOptions(
              practitioners.map((item) => {
                return {
                  ...item,
                  name: item?.firstName + " " + item?.lastName,
                };
              }),
              "id",
              "name"
            )}
            onChange={onPractitionerChange}
            selected={selectedPractitionerId}
            placeholder="Select Practitioners..."
          />

          <Button
            type="button"
            variant="outline"
            className="rounded-3xl"
            onClick={() => {}}
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-3xl"
            onClick={onClearClicked}
          >
            Clear
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full p-4 gap-3">
        <CardHeader className="p-0">
          <CardTitle className="text-lg mb-2">Book an Appointment</CardTitle>
        </CardHeader>

        <CardContent className="mb-4 px-4 py-2 bg-muted text-sm text-muted-foreground border">
          <p className="flex flex-wrap gap-x-4">
            <span>Total Clinics: {clinics.length}</span>
            <span>Total Therapies: {therapies.length}</span>
            <span>Total Practitioners: {practitioners.length}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceFilters;
