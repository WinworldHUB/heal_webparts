import { useContext, useState } from "react";
import { API_BASE_URL } from "../constants/api-constants";

const OPTIONS: RequestInit = {
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

interface APIState<T> {
  loading: boolean;
  data: T;
  /**
   * API Get method.
   * @param url: Url of the endpoint starting with '/'
   * @returns: Requested object or array of objects
   */
  getData: (
    url: string,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => Promise<void>;
  /**
   * API Post Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Post API Method.
   * @returns: Added object with additional details like id, etc...
   */
  postData: (
    url: string,
    body: unknown,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => Promise<void>;
  /**
   * API Put Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Put API Method.
   * @returns: Updated record with additional details like id, etc...
   */
  putData: (
    url: string,
    body: unknown,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => Promise<void>;
  /**
   * API Delete Method.
   * @param url: Url of the endpoint starting with '/' and ending with id.
   *
   * For example: /api/v1/users/1
   * @returns: Deleted record
   */
  deleteData: (
    url: string,
    body?: unknown,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => Promise<void>;
  /**
   * API Post Method for form data.
   * @param url: Url of the endpoint starting with '/'
   * @param formData: Form data to be passed as parameter for the Post API Method.
   * @returns: Added object with additional details like id, etc...
   */
  postFormData: (
    url: string,
    formData: FormData,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => Promise<void>;
}

const useApi = <T,>(baseUrl?: string): APIState<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = (
    response: GeneralAPIResponse,
    onSuccess?: (value: T) => void
  ) => {
    setLoading(false);
    onSuccess?.(response.data as T);
    setData(response.data as T);
  };
  const handleFailure = (
    error?: string,
    onFailure?: (error: string) => void
  ): Error => {
    setLoading(false);

    onFailure?.(error ?? "Unknown error");
    return new Error(error ?? "Unknown error");
  };

  /**
   * API Get method.
   * @param url: Url of the endpoint starting with '/'
   * @returns: Requested object or array of objects
   */
  const getData = async (
    url: string,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "GET",
        ...OPTIONS,
      });

      const response = (await apiResponse.json()) as GeneralAPIResponse;

      if (!response.success) {
        throw handleFailure(
          response.message ?? "Data fetching failed.",
          onFailure
        );
      }

      handleSuccess(response, onSuccess);
    } catch (error) {
      const err = error as Error;
      handleFailure(err.message, onFailure);
    }
  };

  /**
   * API Post Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Post API Method.
   * @returns: Added record with additional details like id, etc...
   */
  const postData = async (
    url: string,
    body: unknown,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = (await apiResponse.json()) as GeneralAPIResponse;

      if (!response.success) {
        throw handleFailure(response.message, onFailure);
      }

      handleSuccess(response, onSuccess);
    } catch (error) {
      const err = error as Error;
      handleFailure(err.message, onFailure);
    }
  };

  /**
   * API Put Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Put API Method.
   * @returns: Updated record with additional details like id, etc...
   */
  const putData = async (
    url: string,
    body: unknown,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      const response = (await apiResponse.json()) as GeneralAPIResponse;

      if (!response.success) {
        throw handleFailure(
          response.message ?? "Data fetching failed.",
          onFailure
        );
      }

      handleSuccess(response, onSuccess);
    } catch (error) {
      const err = error as Error;
      handleFailure(err.message, onFailure);
    }
  };

  /**
   * API Delete Method.
   * @param url: Url of the endpoint starting with '/' and ending with id.
   *
   * For example: /api/v1/users/1
   * @returns: Deleted record
   */
  const deleteData = async (
    url: string,
    body?: unknown,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "DELETE",
        body: JSON.stringify(body ?? null),
      });

      const response = (await apiResponse.json()) as GeneralAPIResponse;

      if (!response.success) {
        throw handleFailure(
          response.message ?? "Data fetching failed.",
          onFailure
        );
      }

      handleSuccess(response, onSuccess);
    } catch (error) {
      const err = error as Error;
      handleFailure(err.message, onFailure);
    }
  };
  /**
   * API Post Method for multipart form data.
   * @param url: Url of the endpoint starting with '/'
   * @param formData: FormData object containing files or other form fields
   * @returns: Response data from server after file upload
   */
  const postFormData = async (
    url: string,
    formData: FormData,
    onSuccess?: (value: T) => void,
    onFailure?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "POST",
        body: formData,
      });

      const response = (await apiResponse.json()) as GeneralAPIResponse;

      if (!response.success) {
        throw handleFailure(
          response.message ?? "Data fetching failed.",
          onFailure
        );
      }

      handleSuccess(response, onSuccess);
    } catch (error) {
      const err = error as Error;
      handleFailure(err.message, onFailure);
    }
  };

  return {
    data,
    loading,
    getData,
    postData,
    putData,
    deleteData,
    postFormData,
  };
};

export default useApi;
