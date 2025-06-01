import { useState } from "react";
import { API_ROUTES } from "../constants/api-constants";
import useApi from "./useApi";
import useDocLinks from "./useDocLinks";
import { DMS_PATHS } from "../constants/dms-path-constants";

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
  getPractitionerProfilePic: (
    practitionerId: string,
    onSuccess?: (profilePicUrl: DocLinkDetails) => void
  ) => void;
}

const usePractitioners = (): PractitionersState => {
  const {
    error: docLinksError,
    isLoading: docLinksLoading,
    getDocLink,
  } = useDocLinks();
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

  const getPractitionerProfilePic = async (
    practitionerId: string,
    onSuccess?: (profilePicUrl: DocLinkDetails) => void
  ) => {
    // Query docLink to get the profile pic URL
    const docLinkDetails: Partial<DocLinkDetails> = {
      parentId: practitionerId,
      path: `${DMS_PATHS.IMAGES.BASE}${DMS_PATHS.IMAGES.PRACTITIONERS}/${practitionerId}${DMS_PATHS.IMAGES.PRACTITIONER_PROFILE}`,
    };

    await getDocLink(docLinkDetails.parentId, docLinkDetails.path, (response) =>
      onSuccess(response)
    );
  };

  return {
    loading:
      getAllPractitionersLoading ||
      getPractitionerDetailsLoading ||
      docLinksLoading,
    error: error || docLinksError,
    practitioners,
    getAllPractitioners,
    getPractitionerDetails,
    getPractitionerProfilePic,
  };
};

export default usePractitioners;
