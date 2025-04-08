"use client";

import React, { FC } from "react";
import { Button } from "@/lib/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/lib/components/ui/popover";

interface PractitionerCardProps {
  practitioner: Practitioner;
  loading: boolean;
  error: string | null;
  onPractitionerClick: (practitioner: Practitioner) => void;
}

const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
  loading,
  error,
  onPractitionerClick,
}) => {
  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div
        key={practitioner.id}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border"
      >
        <div>
          <h2 className="text-xl font-semibold">{practitioner.name}</h2>
          <p className="text-gray-600 mt-2">{practitioner.description}</p>

          <div className="mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Info
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-primary">Therapies:</p>
                  {practitioner.therapies.map((therapy) => (
                    <p key={therapy.id}>• {therapy.title}</p>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            variant="default"
            onClick={() => console.log("View Profile", practitioner.id)}
          >
            View Profile
          </Button>
          <Button
            variant="secondary"
            onClick={() => console.log("Book Appointment", practitioner.id)}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PractitionerCard;
