import { useState } from "react";
import { API_ROUTES } from "../constants/api-constants";
import useApi from "./useApi";

interface TherapyState {
  loading: boolean;
  error: string;
  therapies: Therapy[];
  getAllTherapies: (onSuccess?: (allTherapies: Therapy[]) => void) => void;
  getTherapyDetails: (
    id: string,
    onSuccess?: (therapyDetails: TherapyDetails) => void
  ) => void;
}

const useTherapy = (): TherapyState => {
  const [error, setError] = useState<string>(null);
  const [therapies, setTherapies] = useState<Therapy[]>([]);

  const { getData: getAllTherapiesRequest, loading: getAllClinicsLoading } =
    useApi<Therapy[]>();
  const {
    getData: getTherapyDetailsRequest,
    loading: getTherapyDetailsLoading,
  } = useApi<TherapyDetails>();

  const getAllTherapies = async (
    onSuccess?: (allTherapies: Therapy[]) => void
  ) => {
    try {
      await getAllTherapiesRequest(
        `${API_ROUTES.BASE_URL}${API_ROUTES.THERAPIES}${API_ROUTES.ALL}`,
        (response) => {
          setTherapies(response);
          onSuccess?.(response);
        },
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const getTherapyDetails = async (
    id: string,
    onSuccess?: (therapyDetails: TherapyDetails) => void
  ) => {
    try {
      await getTherapyDetailsRequest(
        `${API_ROUTES.BASE_URL}${API_ROUTES.THERAPIES}/${id}`,
        onSuccess,
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    loading: getAllClinicsLoading,
    error,
    therapies,
    getAllTherapies,
    getTherapyDetails,
  };
};

export default useTherapy;
