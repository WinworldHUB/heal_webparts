type GeneralAPIResponse = {
  success: boolean;
  message: string;
  data: any;
};

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
};

type Therapy1 = {
  link: string;
} & TherapyResponse;

type Availability =
  | { day: string; startTime: string; endTime: string }
  | { day: string; status: string };

type Option = {
  label: string;
  value: string;
};

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

type Practitioner1 = {
  availability: Availability[];
  therapies: Therapy[];
} & PractitionerResponse;

interface AvailableHour1 {
  day: string;
  fromTime: string;
  toTime: string;
}

interface Clinic1 {
  id: string;
  name: string;
  address: string;
  postCode: string;
  websiteURL: string;
  noOfAvailableRooms: number;
  availableHours: AvailableHour[];
  metadata: Record<string, any>;
}

type FilterSelections = {
  selectedClinicId?: string;
  selectedTherapyId?: string;
  selectedPractitionerId?: string;
};

/** API Response */
type ClinicDetails = {
  clinic: Clinic;
  calendar: Calendar;
  practitioners: Practitioner[];
  therapies: Therapy[];
};

type TherapyDetails = {
  therapy: Therapy;
  practitioners: Practitioner[];
  clinics: Clinic[];
};

type PractitionerDetails = {
  practitioner: Practitioner;
  clinics: Clinic[];
  therapies: Therapy[];
};

type Clinic = {
  id: string;
  name: string;
  address: string;
  postCode: string;
  websiteURL: string;
  noOfAvailableRooms: number;
  availableHours: AvailableHour[];
  metadata: unknown;
};

interface AvailableHour {
  day: string;
  toTime: string;
  fromTime: string;
}

interface Calendar {
  id: string;
  parentId: string;
  parentType: string;
  holidays: Holiday[];
  unavailableDates: UnavailableDate[];
  metadata: Metadata2;
}

interface Holiday {
  date: string;
  type: string;
  title: string;
  internalDate: string;
}

interface UnavailableDate {
  date: string;
  type: string;
  title: string;
  internalDate: string;
}

type Practitioner = {
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
  therapies?: Therapy[];
};

type Therapy = {
  id: string;
  name: string;
  description: string;
  expiryDate: any;
  prerequisites: any;
  sessionTime: string;
  perSessionPrice: string;
};

/** API Response */
