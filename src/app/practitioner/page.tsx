"use client";

import { Skeleton } from "@/lib/components/ui/skeleton";
import PractitionerInfo from "@/lib/components/practitioner-info";
import React, { useEffect, useState } from "react";
import usePractitioners from "@/lib/hooks/usePractitioners";

const ProfilePage = () => {
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [practitionerDetails, setPractitionerDetails] = useState<PractitionerDetails | null>(null);
  const { getPractitionerDetails, loading, error } = usePractitioners();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.parent?.location.search || "");
      const id = params.get("id");
      setPractitionerId(id);
      console.log("Practitioner ID from parent URL:", id);
    }
  }, []);
  

  useEffect(() => {
    if (practitionerId) {
      getPractitionerDetails(practitionerId, (details) => {
        setPractitionerDetails(details);
      });
    }
  }, [practitionerId]);

  if (!practitionerDetails?.practitioner) {
    return (
      <div className="flex justify-center items-center w-full p-4">
        <Skeleton className="w-1/2 h-48" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start w-full min-h-dvh bg-[#f2f0ea] p-4">
      <div className="w-3/4">
        <PractitionerInfo
          practitionerDetails={practitionerDetails}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
