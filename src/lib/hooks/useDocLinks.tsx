import { useState } from "react";
import useApi from "./useApi";
import { API_ROUTES } from "../constants/api-constants";

interface DocLinkState {
  isLoading: boolean;
  error: string | null;
  createDocLink: (
    docDetails: DocLinkDetails,
    onSuccess?: (doc: DocLinkDetails) => void
  ) => void;
  getDocLink: (
    parentId: string,
    path?: string,
    onSuccess?: (doc: DocLinkDetails) => void
  ) => void;
  updateDocLink: (
    docDetails: DocLinkDetails,
    onSuccess?: (doc: DocLinkDetails) => void
  ) => void;
}

const useDocLinks = (): DocLinkState => {
  const [error, setError] = useState<string | null>(null);
  const {
    postData: createDocLinkRequest,
    loading: createDocLinkRequestLoading,
  } = useApi<DocLinkDetails>();

  const {
    putData: updateDocLinkRequest,
    loading: updateDocLinkRequestLoading,
  } = useApi<DocLinkDetails>();

  const { getData: getDocLinkRequest, loading: getDocLinkRequestLoading } =
    useApi<DocLinkDetails>();

  const createDocLink = async (
    docDetails: DocLinkDetails,
    onSuccess?: (doc: DocLinkDetails) => void
  ) => {
    try {
      setError(null);
      const response = await createDocLinkRequest(
        API_ROUTES.DOC_LINK.base,
        docDetails,
        onSuccess
      );

      console.log("Doc Link Created: ", response);
    } catch (error) {
      setError(error.message);
    }
  };

  const getDocLink = async (
    parentId: string,
    path?: string,
    onSuccess?: (doc: any) => void
  ) => {
    try {
      setError(null);
      const response = await getDocLinkRequest(
        `${API_ROUTES.DOC_LINK.base}/${parentId}?path=${path}`,
        onSuccess
      );

      console.log("Doc Link fetched: ", response);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateDocLink = async (
    docDetails: DocLinkDetails,
    onSuccess?: (doc: any) => void
  ) => {
    try {
      setError(null);
      const response = await updateDocLinkRequest(
        API_ROUTES.DOC_LINK.base,
        docDetails,
        onSuccess
      );

      console.log("Doc Link updated: ", response);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    error,
    isLoading:
      createDocLinkRequestLoading ||
      updateDocLinkRequestLoading ||
      getDocLinkRequestLoading,
    createDocLink,
    getDocLink,
    updateDocLink,
  };
};

export default useDocLinks;
