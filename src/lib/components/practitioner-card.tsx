"use client";

import React, { FC, useEffect, useState } from "react";
import { Button } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";
import { truncateText } from "../utils/string-util";
import Image from "next/image";
import usePractitioners from "../hooks/usePractitioners";
import { USER_IMAGE_PLACEHOLDER } from "../constants";
import SimpleButton from "./simple-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { getDocumentFromUrl } from "../utils";

interface PractitionerCardProps {
  practitioner: Practitioner;
  onPractitionerClick: (practitionerId: string) => void;
  onBookAppointmentClick: (practitionerId: string) => void;
}

const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
  onPractitionerClick,
  onBookAppointmentClick,
}) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const { getPractitionerProfilePic } = usePractitioners();

  const handleImageDetails = async (docLink: DocLinkDetails) => {
    const doc = await getDocumentFromUrl(docLink.url, docLink.title);
    if (doc) {
      setProfilePicUrl(URL.createObjectURL(doc));
    } else {
      setProfilePicUrl(docLink.url);
    }
  };

  useEffect(() => {
    if (practitioner) {
      getPractitionerProfilePic(practitioner.id, handleImageDetails);
    }
  }, [practitioner]);

  return (
    <Card
      key={practitioner?.id}
      className="w-full sm:w-4/5 lg:w-full p-4 rounded shadow-sm h-50 border-app-golden cursor-pointer hover:shadow-lg"
    >
      <CardContent className="flex flex-row gap-4 h-full px-0">
        <Image
          src={profilePicUrl ?? USER_IMAGE_PLACEHOLDER}
          //onError={(e) => (e.currentTarget.src = "/assets/doctor_image.jpg")}
          alt={practitioner?.firstName + practitioner?.lastName}
          width={120}
          height={0}
          className="object-cover rounded"
          loading="eager"
        />

        <div className="flex flex-col justify-between w-full h-full">
          <div>
            <h2 className="text-xl font-bold">
              {practitioner?.firstName + " " + practitioner?.lastName}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: truncateText(
                  practitioner?.businessSummary?.trim()
                    ? practitioner.businessSummary
                    : practitioner.biography,
                  50
                ),
              }}
              className="text-gray-600 mt-2"
            />
          </div>

          <div className="flex gap-2 justify-end items-end">
            {/* <Button
              className="bg-green-600 text-white hover:bg-green-700 rounded-4xl"
              onClick={() => onPractitionerClick(practitioner.id)}
            >
              View Profile
            </Button> */}
            {/* {practitioner?.therapies && (
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Therapies
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="right" className="w-50 ml-3">
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-medium text-primary">Therapies:</p>
                      {(practitioner?.therapies ?? []).map((therapy) => (
                        <p key={therapy.id}>• {therapy.name}</p>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )} */}
            <SimpleButton onClick={() => onPractitionerClick(practitioner.id)}>
              View Profile
            </SimpleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionerCard;
