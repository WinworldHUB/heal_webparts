"use client";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api-constants";

interface usePractitionerData {
  loading: boolean;
  error: string;
  practitioners: Practitioner[];
  selectedPractitioner: Practitioner | null;
  getAllPractitioners: VoidFunction;
  getPractitionerById: VoidFunction;
}

const usePractitioners = (practitionerId?: string): usePractitionerData => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPractitioners = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL + "/analytics/practitioners/all");
      if (!response.ok) throw new Error("Failed to fetch practitioners");
      const data = await response.json();
      setPractitioners(data.data);
    } catch (error) {
      console.error("Error fetching practitioners:", error);
      setError("Unable to load practitioners at this time.");
    } finally {
      setLoading(false);
    }
  };

  const getPractitionerById = async () => {
    if (!practitionerId) return;

    try {
      setLoading(true);
      const response = await fetch(
        API_BASE_URL + `/analytics/practitioners/${practitionerId}`
      );
      if (!response.ok) throw new Error("Failed to fetch practitioner");
      const data = await response.json();
      setSelectedPractitioner(data.data.practitioner);
    } catch (error) {
      console.error("Error fetching practitioner:", error);
      setError("Unable to load practitioner at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (practitionerId) getPractitionerById();
  }, [practitionerId]);

  return {
    practitioners,
    selectedPractitioner,
    loading,
    error,
    getAllPractitioners,
    getPractitionerById,
  };
};

export default usePractitioners;
