import React from "react"
import { Combobox } from "./ui/combobox"
import { Separator } from "./ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
interface ServiceFilterProps {
  therapiesOptions: Option[]
  practitionerOptions: Option[]
  onTherapyChange: (value: string) => void
  onPractitionerChange: (value: string) => void
  onSearch: () => void
  selectedTherapyId: string | null
  selectedPractitionerId: string | null
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  therapiesOptions,
  practitionerOptions,
  onTherapyChange,
  onPractitionerChange,
  onSearch,
  selectedTherapyId,
  selectedPractitionerId,
}) => {
  return (
    <Card className="w-full p-4 gap-3">
      <CardHeader className="p-0">
        <CardTitle className="text-lg mb-0">Find your Perfect Service</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <Separator />
        <Combobox
          options={therapiesOptions}
          selected={selectedTherapyId || ""}
          onChange={onTherapyChange}
          placeholder="Select Therapy..."
        />
        <Combobox
          options={practitionerOptions}
          selected={selectedPractitionerId || ""}
          onChange={onPractitionerChange}
          placeholder="Select Practitioner..."
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
  )
}

export default ServiceFilter