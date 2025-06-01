export const DMS_PATHS = {
  DOCUMENTS: {
    BASE: "documents",
    PRACTITIONERS: "/practitioners",
    PRACTITIONER_CERTIFICATE: "/certificate",
    PRACTITIONER_LATEST_CONTRACT: "/latest-contract",
  },
  IMAGES: {
    BASE: "images",
    THERAPY: "/therapy",
    CLINICS: "/clinics",
    CLINIC_PROFILE: "/profile",
    PRACTITIONERS: "/practitioners",
    PRACTITIONER_PROFILE: "/profile",
  },
  PRACTITIONERS: {
    PRACTITIONER_PROFILE_PIC_PATH:
      "images/practitioners/{{PRACTITIONER_ID}}/profile",
    PRACTITIONER_EDUCATION_CERTIFICATE_PATH:
      "documents/practitioners/{{PRACTITIONER_ID}}/certificate",
    PRACTITIONER_SUBSCRIPTION_LICENSES_PATH:
      "documents/practitioners/{{PRACTITIONER_ID}}/latest-contract/{{SUBSCRIPTION_ID}}",
  },
};
