import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api-constants";

interface UseTherapyData {
  loading: boolean;
  error: string;
  therapies: Therapy[];
  selectedTherapy: Therapy | null;
  getAllTherapies: VoidFunction;
  getTherapyById: (id: string) => void;
}

const useTherapies = (therapyId?: string): UseTherapyData => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);

  const getAllTherapies = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL + "/analytics/therapies/all");
      if (!response.ok) throw new Error("Failed to fetch therapies");
      const data = await response.json();

      if ((data.data as Therapy[]).length > 0) {
        setTherapies(data.data);
      } else {
        setTherapies([]);
      }
    } catch (error) {
      console.error("Error fetching therapies:", error);
      setError("Unable to load therapies at this time.");
    } finally {
      setLoading(false);
    }
  };

  const getTherapyById = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL + `/analytics/therapies/${id}`);
      if (!response.ok) throw new Error("Failed to fetch therapy");
      const data = await response.json();

      if (data.data as Therapy) {
        setSelectedTherapy(data.data);
      } else {
        setSelectedTherapy(null);
      }
    } catch (error) {
      console.error("Error fetching therapy:", error);
      setError("Unable to load therapy at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (therapyId) getTherapyById(therapyId);
  }, [therapyId]);

  useEffect(() => {
    getAllTherapies();
  }, []);

  return {
    loading,
    error,
    therapies,
    selectedTherapy,
    getAllTherapies,
    getTherapyById,
  };
};

export default useTherapies;
