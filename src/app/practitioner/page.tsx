"use client";

import { Skeleton } from "@/lib/components/ui/skeleton";
import PractitionerInfo from "@/lib/components/practitioner-info";
import React, { useEffect, useState } from "react";
import usePractitioners from "@/lib/hooks/usePractitioners";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

const ProfilePage = () => {
  const [practitionerId, setPractitionerId] = useState<string>("");
  const [practitionerDetails, setPractitionerDetails] = useState<PractitionerDetails | null>(null);
  const { getPractitionerDetails, loading, error } = usePractitioners();
  const { getValue} = useLocalStorage<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {

      const id = getValue("practitionerId")
      setPractitionerId(id ?? "");
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
