type TherapyResponse = {
  therapyId: string;
  therapyName: string;
  therapyDescription: string;
  expiryDate: string | null;
  preRequisites: string | null;
};

type TherapyDummy = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

type Therapy = {
  link: string;
} & TherapyResponse;

type Availability =
  | { day: string; startTime: string; endTime: string }
  | { day: string; status: string};


type Option = {
  label: string
  value: string
}

type PractitionerResponse = {
  id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  biography: string;
  practitionerImage: string;
  status: string;
  isActive: boolean;
  websiteLink: string;
  businessSummary: string;
};


type Practitioner = {
  availability: Availability[];
  therapies: TherapyDummy[];
} & PractitionerResponse;
