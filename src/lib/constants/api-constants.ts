export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const DEFAULT_GET_API_HEADER = (session_jwt: string) => {
  return {
    Authorization: `Bearer ${session_jwt}`,
  };
};
export const DEFAULT_POST_API_HEADER = (session_jwt: string) => {
  return {
    Authorization: `Bearer ${session_jwt}`,
    "Content-Type": "application/json",
  };
};

export const DEFAULT_FORM_DATA_HEADER = (session_jwt: string) => {
  return {
    Authorization: `Bearer ${session_jwt}`,
  };
};

export const API_ROUTES = {
  BASE_URL: "/analytics",
  CLINICS: "/clinics",
  THERAPIES: "/therapies",
  PRACTITIONERS: "/practitioners",
  ALL: "/all",
};
