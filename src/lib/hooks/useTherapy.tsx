import { useState } from "react";
import { API_ROUTES } from "../constants/api-constants";
import useApi from "./useApi";
import { DMS_PATHS } from "../constants";
import useDocLinks from "./useDocLinks";

interface TherapyState {
  loading: boolean;
  error: string;
  therapies: Therapy[];
  getAllTherapies: (onSuccess?: (allTherapies: Therapy[]) => void) => void;
  getTherapyDetails: (
    id: string,
    onSuccess?: (therapyDetails: TherapyDetails) => void
  ) => void;
  getTherapyImage: (
    therapyId: string,
    onSuccess?: (docLink: DocLinkDetails) => void
  ) => void;
}

const useTherapy = (): TherapyState => {
  const [error, setError] = useState<string>(null);
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const { getDocLink } = useDocLinks();

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

  const getTherapyImage = async (
    therapyId: string,
    onSuccess?: (docLink: DocLinkDetails) => void
  ) => {
    // Query docLink to get the profile pic URL
    const docLinkDetails: Partial<DocLinkDetails> = {
      parentId: therapyId,
      path: `${DMS_PATHS.IMAGES.BASE}${DMS_PATHS.IMAGES.THERAPY}/${therapyId}`,
    };

    await getDocLink(docLinkDetails.parentId, docLinkDetails.path, (response) =>
      onSuccess(response)
    );
  };

  return {
    loading: getAllClinicsLoading || getTherapyDetailsLoading,
    error,
    therapies,
    getAllTherapies,
    getTherapyDetails,
    getTherapyImage,
  };
};

export default useTherapy;
