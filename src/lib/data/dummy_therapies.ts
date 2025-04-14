const titles = [
  "Skin Nourshment",
  "Beautician",
  "Skin Rejuvenation",
  "Lip Enhancement",
  "Private GP Services",
  "Homeopathy",
  "Holistic Therapist",
  "Herbal & wellness practitioner",
  "Podiatrist",
  "Skin specialist",
  "test therapy 4 updated",
  "Acupuncture",
  "Health Psychologist",
  "Nutritionist",
  "Speech and language therapist",
  "Test Therapy",
  "Psychotherapist",
  "Chiropractor",
  "Reflexologist",
  "Aesthetics",
  "Osteopath",
  "Physiotherapist",
  "Medical Herbalist",
  "Massage Therapist",
  "Art Therapist",
  "Reiki Practitioner",
  "Ayurvedic Specialist"
];


const images = [
  "/assets/skin_nourishment.png",
  "/assets/beautician.png",
];

export const therapies: TherapyDummy[] = titles.map((title, idx) => ({
  id: `therapy-${idx + 1}`,
  title: title,
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
  image: images[idx % 2],
  link: "https://heal-wellness.co.uk/",
}));
