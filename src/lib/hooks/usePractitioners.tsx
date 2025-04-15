import { useState } from "react";
import { API_ROUTES } from "../constants/api-constants";
import useApi from "./useApi";

interface PractitionersState {
  loading: boolean;
  error: string;
  practitioners: Practitioner[];
  getAllPractitioners: (
    onSuccess?: (allPractitioners: Practitioner[]) => void
  ) => void;
  getPractitionerDetails: (
    id: string,
    onSuccess?: (practitionerDetails: PractitionerDetails) => void
  ) => void;
}

const usePractitioners = (): PractitionersState => {
  const [error, setError] = useState<string>(null);
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);

  const {
    getData: getAllPractitionersRequest,
    loading: getAllPractitionersLoading,
  } = useApi<Practitioner[]>();
  const {
    getData: getPractitionerDetailsRequest,
    loading: getPractitionerDetailsLoading,
  } = useApi<PractitionerDetails>();

  const getAllPractitioners = async (
    onSuccess?: (allTherapies: Practitioner[]) => void
  ) => {
    try {
      await getAllPractitionersRequest(
        `${API_ROUTES.BASE_URL}${API_ROUTES.PRACTITIONERS}${API_ROUTES.ALL}`,
        (response) => {
          setPractitioners(response);
          onSuccess?.(response);
        },
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const getPractitionerDetails = async (
    id: string,
    onSuccess?: (PractitionerDetails: PractitionerDetails) => void
  ) => {
    try {
      await getPractitionerDetailsRequest(
        `${API_ROUTES.BASE_URL}${API_ROUTES.PRACTITIONERS}/${id}`,
        onSuccess,
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    loading: getAllPractitionersLoading,
    error,
    practitioners,
    getAllPractitioners,
    getPractitionerDetails,
  };
};

export default usePractitioners;
