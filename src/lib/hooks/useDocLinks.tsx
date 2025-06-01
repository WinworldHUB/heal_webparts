import { useState } from "react";
import useApi from "./useApi";
import { API_ROUTES } from "../constants/api-constants";

interface DocLinkState {
  isLoading: boolean;
  error: string | null;
  getDocLink: (
    parentId: string,
    path?: string,
    onSuccess?: (doc: DocLinkDetails) => void
  ) => Promise<DocLinkDetails>;
}

const useDocLinks = (): DocLinkState => {
  const [error, setError] = useState<string | null>(null);

  const { getData: getDocLinkRequest, loading: getDocLinkRequestLoading } =
    useApi<DocLinkDetails[]>();

  const getDocLink = async (
    parentId: string,
    path?: string,
    onSuccess?: (doc: DocLinkDetails) => void
  ) => {
    try {
      setError(null);
      const response = await getDocLinkRequest(
        `${API_ROUTES.DOC_LINK.base}/${parentId}?path=${path}`,
        (values) => onSuccess(values?.[0])
      );

      return Promise.resolve(response?.[0]);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    error,
    isLoading: getDocLinkRequestLoading,
    getDocLink,
  };
};

export default useDocLinks;
