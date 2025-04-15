import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Combobox } from "./ui/combobox"; // your shadcn combobox
import { Button } from "./ui/button";

interface Option {
  label: string;
  value: string;
}

interface ServiceFilterProps {
  clinics: Option[];
  therapies: Option[];
  practitioners: Option[];
  filteredTherapies: Option[];
  filteredPractitioners: Option[];
  selectedClinicId: string | null;
  selectedTherapyId: string;
  selectedPractitionerId: string;
  onClinicChange: (value: string) => void;
  onTherapyChange: (values: string) => void;
  onPractitionerChange: (values: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  clinics,
  therapies,
  practitioners,
  filteredTherapies,
  filteredPractitioners,
  selectedClinicId,
  selectedTherapyId,
  selectedPractitionerId,
  onClinicChange,
  onTherapyChange,
  onPractitionerChange,
  onSearch,
  onClear,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const selectedTherapyOptions = filteredTherapies.filter((t) =>
    selectedTherapyId.includes(t.value)
  );

  const selectedPractitionerOptions = filteredPractitioners.filter((p) =>
    selectedPractitionerId.includes(p.value)
  );

  return (
    <Card className="w-full p-4 gap-3">
      <CardHeader className="p-0">
        <CardTitle className="text-lg mb-2">Book an Appointment</CardTitle>
      </CardHeader>

      <Card className="mb-4 px-4 py-2 bg-muted text-sm text-muted-foreground border">
        <p className="flex flex-wrap gap-x-4">
          <span>Total Clinics: {clinics.length}</span>
          <span>Total Therapies: {therapies.length}</span>
          <span>Total Practitioners: {practitioners.length}</span>
        </p>
      </Card>

      <CardContent className="flex flex-col gap-5 p-0">
        <Separator />
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div>{`${selectedClinicId ? 1 : 0} of ${
            clinics.length
          } clinics selected`}</div>
          <div>{`${selectedTherapyOptions.length} of ${filteredTherapies.length} therapies selected`}</div>
          <div>{`${selectedPractitionerOptions.length} of ${filteredPractitioners.length} practitioners selected`}</div>
        </div>
        <Separator />

        {mounted && (
          <Combobox
            options={clinics}
            onChange={onClinicChange}
            placeholder="Select Clinic..."
            selected={selectedClinicId ?? ""}
          />
        )}

        {mounted && (
          <Combobox
            options={filteredTherapies}
            onChange={onTherapyChange}
            placeholder="Select Therapies..."
            selected={selectedTherapyId ?? ""}
          />
        )}

        {mounted && (
          <Combobox
            options={filteredPractitioners}
            onChange={onPractitionerChange}
            selected={selectedPractitionerId ?? ""}
            placeholder="Select Practitioners..."
          />
        )}

        <Button
          type="button"
          variant="outline"
          className="rounded-3xl"
          onClick={onSearch}
        >
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-3xl"
          onClick={onClear}
        >
          Clear
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceFilter;
