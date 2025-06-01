"use client";

import React, { FC, useEffect, useState } from "react";
import { Card, CardContent } from "@/lib/components/ui/card";
import { isEmpty, truncateText } from "../utils/string-util";
import usePractitioners from "../hooks/usePractitioners";
import { USER_IMAGE_PLACEHOLDER } from "../constants";
import Image from "next/image";
import { getDocumentFromUrl } from "../utils";

interface TherapyPractitionerCardProps {
  practitioner: Practitioner;
  onPractitionerClick: (practitionerId: string) => void;
}

const TherapyPractitionerCard: FC<TherapyPractitionerCardProps> = ({
  practitioner,
  onPractitionerClick,
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
      className="w-full sm:max-w-[250px] p-2 rounded shadow-md"
      onClick={() => onPractitionerClick(practitioner?.id)}
    >
      <CardContent className="flex flex-col items-start px-0 sm:flex-row gap-2">
        <Image
          src={profilePicUrl ?? USER_IMAGE_PLACEHOLDER}
          //onError={(e) => (e.currentTarget.src = "/assets/doctor_image.jpg")}
          alt={practitioner?.firstName + practitioner?.lastName}
          width={60}
          height={60}
          className="object-cover rounded w-[60px]"
          loading="eager"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-lg font-bold">
            {practitioner?.firstName + " " + practitioner?.lastName}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: truncateText(
                isEmpty(practitioner?.businessSummary)
                  ? practitioner?.biography
                  : practitioner?.businessSummary,
                18
              ),
            }}
            className="text-gray-600 mt-2 text-sm sm:text-base truncate"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyPractitionerCard;
