"use client";

import React, { FC } from "react";
import { Button } from "@/lib/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/lib/components/ui/popover";
import { Card, CardContent } from "@/lib/components/ui/card";
import Image from "next/image";

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
    <Card
      key={practitioner.id}
      className="w-full sm:w-4/5 lg:w-2/3 p-4 rounded-2xl shadow-md"
    >
      <CardContent className="flex flex-col items-start px-0 sm:justify-start sm:flex-row gap-4">
        <img
          src={practitioner.image}
          alt={practitioner.name}
          className="object-cover rounded-2xl hidden sm:block h-60 w-60"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">{practitioner.name}</h2>
          <p className="text-gray-600 mt-2">{practitioner.description}</p>
          <p className="text-gray-500 font-semibold text-md mt-2">
            {practitioner.qualification}
          </p>

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

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button
              className="bg-green-600 text-white hover:bg-green-700 rounded-4xl"
              onClick={() => onPractitionerClick(practitioner)}
            >
              View Profile
            </Button>
            <Button
              variant="outline"
              className="rounded-4xl border-black text-gray-800"
              onClick={() => console.log("Book Appointment", practitioner.id)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionerCard;
