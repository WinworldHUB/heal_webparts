type Therapy = {
  title: string;
  description: string;
  image: string;
  link: string;
};

type Availability =
  | { day: string; startTime: string; endTime: string }
  | { day: string; status: string};


type Practitioner = {
  id: string;
  name: string;
  qualification: string;
  email: string;
  phone: string;
  image: string;
  practice: string;
  description: string;
  availability: Availability[];
}