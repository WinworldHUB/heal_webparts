import { useState } from "react";
import { API_ROUTES } from "../constants/api-constants";
import useApi from "./useApi";

interface ClinicState {
  loading: boolean;
  error: string;
  clinics: Clinic[];
  getAllClinics: (onSuccess?: (allClinics: Clinic[]) => void) => void;
  getClinicDetails: (
    id: string,
    onSuccess?: (clinicDetails: ClinicDetails) => void
  ) => void;
}

const useClinics = (): ClinicState => {
  const [error, setError] = useState<string>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);

  const { getData: getAllClinicsRequest, loading: getAllClinicsLoading } =
    useApi<Clinic[]>();
  const { getData: getClinicDetailsRequest, loading: getClinicDetailsLoading } =
    useApi<ClinicDetails>();

  const getAllClinics = async (onSuccess?: (allClinics: Clinic[]) => void) => {
    try {
      await getAllClinicsRequest(
        `${API_ROUTES.BASE_URL}${API_ROUTES.CLINICS}${API_ROUTES.ALL}`,
        (response) => {
          setClinics(response);
          onSuccess?.(response);
        },
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const getClinicDetails = async (
    id: string,
    onSuccess?: (clinicDetails: ClinicDetails) => void
  ) => {
    try {
      await getClinicDetailsRequest(
        `${API_ROUTES.BASE_URL}${API_ROUTES.CLINICS}/${id}`,
        onSuccess,
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    loading: getAllClinicsLoading || getClinicDetailsLoading,
    error,
    clinics,
    getAllClinics,
    getClinicDetails,
  };
};

export default useClinics;
