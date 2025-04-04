"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import PractitionerInfo from "@/lib/components/practitioner-info";
import { truncateText } from "@/lib/utils/string-util";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa6";

const ProfilePage = () => {
  const params = useParams();

  const practitionerId = params.id as string;

  const [practitioner, setPractitioner] = useState<Practitioner | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  console.log(practitionerId);

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/practitioner/" + practitionerId);
        if (!response.ok) {
          setError("Failed to fetch practitioners");
        }

        const data = await response.json();

        console.log(data);
        if (!data) {
          setError("Practitioner not found");
        }

        setPractitioner(data);
      } catch (error) {
        console.error("Error fetching practitioners:", error);
        setError(`Unable to load practitioners at this time. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPractitioners();
  }, []);

  if (!practitioner) {
    return (
      <div className="flex justify-center items-center w-full p-4">
        <Skeleton className="w-1/2 h-48" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start w-full h-screen bg-[#f2f0ea] p-4">
      {practitioner ? (
     <div className="w-3/4">

          <PractitionerInfo
            practitioner={practitioner}
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
