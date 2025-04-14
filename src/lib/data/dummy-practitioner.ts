import { getRandomTherapies } from "../utils/therapy-util";
import { therapies } from "./dummy_therapies";

export const DUMMY_PRACTITIONERS: Practitioner[] = [
  {
    id: "1",
    name: "Dr. Megan R. Ramos",
    email: "info@example.com",
    phone: "888-123-4567",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Plastic And Cosmetic Surgeon",
    description:
      "We provide the highest quality medical care, individualized treatment by the country’s leading experts, and in the shortest amount of time...",
    availability: [
      { day: "Monday - Friday", startTime: "09:00", endTime: "13:00" },
      { day: "Saturday", startTime: "09:00", endTime: "17:00" },
      { day: "Sunday", status: "Not working" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
  {
    id: "2",
    name: "Dr. John A. Carter",
    email: "dr.carter@example.com",
    phone: "777-987-6543",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Cardiologist",
    description:
      "I'm a highly experienced cardiologist dedicated to providing top-notch heart care...",
    availability: [
      { day: "Monday - Friday", startTime: "08:00", endTime: "14:00" },
      { day: "Saturday", startTime: "10:00", endTime: "16:00" },
      { day: "Sunday", status: "Not working" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
  {
    id: "3",
    name: "Sabrina Khaliya",
    email: "sabrina@example.com",
    phone: "555-234-5678",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Holistic Therapist",
    description:
      "Sabrina is an integrative holistic therapist specializing in Vortex Energy Therapy, Reiki with Crystals, Flower Essence Remedies, and Quantum Biofeedback...",
    availability: [
      { day: "Monday - Thursday", startTime: "10:00", endTime: "16:00" },
      { day: "Friday", startTime: "12:00", endTime: "18:00" },
      { day: "Saturday - Sunday", status: "By Appointment Only" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
  {
    id: "4",
    name: "Rajiv Raja",
    email: "rajiv@example.com",
    phone: "555-987-1234",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Ayurvedic Practitioner",
    description:
      "Rajiv is an Ayurvedic practitioner and health coach, guiding individuals toward optimal health through Ayurveda and Yoga...",
    availability: [
      { day: "Monday - Friday", startTime: "09:00", endTime: "15:00" },
      { day: "Saturday", startTime: "10:00", endTime: "14:00" },
      { day: "Sunday", status: "Not working" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
  {
    id: "5",
    name: "Dr. Amelia Stone",
    email: "amelia@example.com",
    phone: "555-678-4321",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Chiropractic & Acupuncture Specialist",
    description:
      "Dr. Amelia is a certified chiropractor and acupuncture specialist, focusing on musculoskeletal alignment and holistic pain relief...",
    availability: [
      { day: "Monday - Wednesday", startTime: "08:00", endTime: "14:00" },
      { day: "Thursday - Friday", startTime: "10:00", endTime: "18:00" },
      { day: "Saturday", startTime: "10:00", endTime: "16:00" },
      { day: "Sunday", status: "Not working" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
  {
    id: "6",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "555-789-6543",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Clinical Nutrition & Holistic Wellness",
    description:
      "Sophia is a clinical nutritionist dedicated to helping individuals achieve optimal health through personalized nutrition plans...",
    availability: [
      { day: "Monday - Friday", startTime: "09:00", endTime: "17:00" },
      { day: "Saturday", startTime: "10:00", endTime: "14:00" },
      { day: "Sunday", status: "By Appointment Only" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
  {
    id: "7",
    name: "Ethan Williams",
    email: "ethan@example.com",
    phone: "555-456-7890",
    image:
      "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg",
    practice: "Breathwork & Meditation",
    description:
      "Ethan specializes in breathwork and meditation techniques to promote relaxation, mental clarity, and overall well-being...",
    availability: [
      { day: "Monday - Friday", startTime: "07:00", endTime: "12:00" },
      { day: "Saturday", startTime: "09:00", endTime: "13:00" },
      { day: "Sunday", status: "Closed" },
    ],
    therapies: getRandomTherapies(3, therapies),
  },
];
