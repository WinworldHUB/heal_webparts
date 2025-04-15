import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api-constants";

interface UseClinicData {
  loading: boolean;
  error: string;
  clinics: Clinic[];
  selectedClinic: Clinic | null;
  getAllClinics: VoidFunction;
  getClinicById: (id: string) => void;
}

const useClinics = (clinicId?: string): UseClinicData => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const getAllClinics = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL + "/analytics/clinics/all");
      if (!response.ok) throw new Error("Failed to fetch practitioners");
      const data = await response.json();

      if ((data.data as Clinic[]).length > 0) {
        setClinics(data.data);
      } else {
        setClinics([]);
      }
    } catch (error) {
      console.error("Error fetching practitioners:", error);
      setError("Unable to load practitioners at this time.");
    } finally {
      setLoading(false);
    }
  };

  const getClinicById = async (id: string) => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL + `/analytics/clinics/${id}`);
      if (!response.ok) throw new Error("Failed to fetch practitioners");
      const data = await response.json();
      console.log(data);

      //   if (data.data as Clinic) {
      //     setSelectedClinic(data.data);
      //   } else {
      //     setSelectedClinic(null);
      //   }
    } catch (error) {
      console.error("Error fetching practitioners:", error);
      setError("Unable to load practitioners at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clinicId) getClinicById(clinicId);
  }, [clinicId]);

  useEffect(() => {
    getAllClinics();
  }, []);

  return {
    loading,
    error,
    clinics,
    selectedClinic,
    getAllClinics,
    getClinicById,
  };
};

export default useClinics;
