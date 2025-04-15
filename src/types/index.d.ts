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


type Practitioner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  practice: string;
  description: string;
  availability: Availability[];
  therapies: TherapyDummy[];
}

type Option = {
  label: string
  value: string
}