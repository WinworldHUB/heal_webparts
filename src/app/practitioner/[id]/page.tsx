"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Skeleton className="w-full h-48" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-48 text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#f2f0ea] h-screen flex flex-col items-center p-4">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 h-full bg-white rounded-l-lg shadow-lg p-4">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p className="text-gray-700">Profile details go here...</p>
        </div>
        <div className="flex flex-col w-1/2 h-full bg-white rounded-r-lg shadow-lg p-4">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <p className="text-gray-700">Settings options go here...</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
