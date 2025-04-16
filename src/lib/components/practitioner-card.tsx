"use client";

import React, { FC } from "react";
import { Button } from "@/lib/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/lib/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { Card, CardContent } from "@/lib/components/ui/card";
import usePractitioners from "../hooks/usePractitioners";
import { truncateText } from "../utils/string-util";
import { DatePicker } from "./ui/date-picker";
import { Calendar } from "./ui/calendar";
import Link from "next/link";

interface PractitionerCardProps {
  practitioner: Practitioner;
  onPractitionerClick: (practitioner: Practitioner) => void;
  onBookAppointmentClick: (practitionerId: string) => void;
}

const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
  onPractitionerClick,
  onBookAppointmentClick,
}) => {
  return (
    <Card
      key={practitioner?.id}
      className="w-full sm:w-4/5 lg:w-2/3 p-4 rounded-2xl shadow-md"
    >
      <CardContent className="flex flex-col items-start px-0 sm:justify-start sm:flex-row gap-4">
        <img
          src={practitioner?.practitionerImage}
          onError={(e) => (e.currentTarget.src = "/assets/doctor_image.jpg")}
          alt={practitioner?.firstName + practitioner?.lastName}
          className="object-cover rounded-2xl hidden sm:block h-60 w-60"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">
            {practitioner?.firstName + " " + practitioner?.lastName}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: truncateText(practitioner?.businessSummary, 200),
            }}
            className="text-gray-600 mt-2"
          />

          {practitioner?.therapies && (
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
                    {(practitioner?.therapies ?? []).map((therapy) => (
                      <p key={therapy.therapyId}>• {therapy.therapyName}</p>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button className="bg-green-600 text-white hover:bg-green-700 rounded-4xl">
              <Link
                href={`/practitioners/${practitioner.id}`}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                View Profile
              </Link>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-4xl border-black text-gray-800"
                  onClick={() => onBookAppointmentClick(practitioner?.id)}
                >
                  Book Appointment
                </Button>
              </DialogTrigger>

              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle>Select Appointment Date</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center">
                  <Calendar />
                  {/* <DatePicker /> */}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionerCard;
