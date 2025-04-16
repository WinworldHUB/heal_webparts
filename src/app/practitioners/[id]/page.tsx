"use client";

import { Skeleton } from "@/lib/components/ui/skeleton";
import PractitionerInfo from "@/lib/components/practitioner-info";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import usePractitioners from "@/lib/hooks/usePractitioners";

const ProfilePage = () => {
  const params = useParams();

  const practitionerId = params.id as string;
  const [practitionerDetails, setPractitionerDetails] = useState<PractitionerDetails | null>(null);
  const { getPractitionerDetails, loading, error } = usePractitioners();

  useEffect(()=> {
    getPractitionerDetails(practitionerId, (practitionerDetails) => {
      setPractitionerDetails(practitionerDetails);
    }
    );
  }, [practitionerId])

  if (!practitionerDetails?.practitioner) {
    return (
      <div className="flex justify-center items-center w-full p-4">
        <Skeleton className="w-1/2 h-48" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start w-full min-h-dvh bg-[#f2f0ea] p-4">
      {practitionerDetails?.practitioner ? (
        <div className="w-3/4">
          <PractitionerInfo
            practitioner={practitionerDetails?.practitioner}
            loading={loading}
            error={error}
          />
        </div>
      ) : (
        <Skeleton className="w-full h-48" />
      )}
    </div>
  );
};

export default ProfilePage;
