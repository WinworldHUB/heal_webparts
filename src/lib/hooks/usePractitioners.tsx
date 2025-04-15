"use client";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api-constants";

interface usePractitionerData {
  loading: boolean;
  error: string;
  practitioners: Practitioner[];
  selectedPractitioner: Practitioner;
  getAllPractitioner: VoidFunction;
}

const usePractitioners = (): usePractitionerData => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner>({} as Practitioner);

  const getAllPractitioner = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        API_BASE_URL + "/analytics/practitioners/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch practitioners");
      }
      const data = await response.json();
      setPractitioners(data.data);
    } catch (error) {
      console.error("Error fetching practitioners:", error);
      setError("Unable to load practitioners at this time.");
    } finally {
      setLoading(false);
    }
  };

  return {
    practitioners,
    loading,
    error,
    selectedPractitioner,
    getAllPractitioner,
  };
};

export default usePractitioners;
