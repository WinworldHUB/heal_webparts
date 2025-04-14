import React from "react";
import Select from "react-select";
import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ServiceFilterProps {
  clinics: Option[];
  therapies: Option[];
  practitioners: Option[];
  filteredTherapies: Option[];
  filteredPractitioners: Option[];
  selectedClinicId: string | null;
  selectedTherapyIds: string[];
  selectedPractitionerIds: string[];
  onClinicChange: (value: string) => void;
  onTherapyChange: (values: string[]) => void;
  onPractitionerChange: (values: string[]) => void;
  onSearch: () => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  clinics,
  therapies,
  practitioners,
  filteredTherapies,
  filteredPractitioners,
  selectedClinicId,
  selectedTherapyIds,
  selectedPractitionerIds,
  onClinicChange,
  onTherapyChange,
  onPractitionerChange,
  onSearch,
}) => {
  const selectedTherapyOptions = filteredTherapies.filter((t) =>
    selectedTherapyIds.includes(t.value)
  );

  const selectedPractitionerOptions = filteredPractitioners.filter((p) =>
    selectedPractitionerIds.includes(p.value)
  );

  const selectedClinicCount = selectedClinicId ? 1 : 0;

  return (
    <Card className="w-full p-4 gap-3">
      <CardHeader className="p-0">
        <CardTitle className="text-lg mb-2">Book an Appointment</CardTitle>
      </CardHeader>

      {/* Summary Line */}
      <Card className="mb-4 px-4 py-2 bg-muted text-sm text-muted-foreground border">
        <p className="flex flex-wrap gap-x-4">
          <span>Total Clinics: {clinics.length}</span>
          <span>Total Therapies: {therapies.length}</span>
          <span>Total Practitioners: {practitioners.length}</span>
        </p>
      </Card>

      <CardContent className="flex flex-col gap-5 p-0">
        <Separator />
        <div className="flex flex-col gap-2 justify-center items-start text-start">
          {/* Selected Counts */}
          <div className="text-sm text-muted-foreground">
            {`${selectedClinicCount} of ${clinics.length} clinics selected`}
          </div>
          <div className="text-sm text-muted-foreground">
            {`${selectedTherapyOptions.length} of ${filteredTherapies.length} therapies selected`}
          </div>
          <div className="text-sm text-muted-foreground">
            {`${selectedPractitionerOptions.length} of ${filteredPractitioners.length} practitioners selected`}
          </div>
        </div>
        <Separator />
        <Select
          options={clinics}
          value={clinics.find((opt) => opt.value === selectedClinicId) || null}
          onChange={(opt) => onClinicChange(opt?.value || "")}
          placeholder="Select Clinic..."
          isClearable
        />

        <Select
          isMulti
          options={filteredTherapies}
          value={selectedTherapyOptions}
          onChange={(opts) => onTherapyChange(opts.map((o) => o.value))}
          placeholder="Select Therapies..."
        />

        <Select
          isMulti
          options={filteredPractitioners}
          value={selectedPractitionerOptions}
          onChange={(opts) => onPractitionerChange(opts.map((o) => o.value))}
          placeholder="Select Practitioners..."
        />

        <button
          type="button"
          className="bg-transparent hover:bg-black/5 transition-colors font-semibold text-black border cursor-pointer hover:text-gray-800 px-4 py-2 rounded-3xl"
          onClick={onSearch}
        >
          Search
        </button>
      </CardContent>
    </Card>
  );
};

export default ServiceFilter;
