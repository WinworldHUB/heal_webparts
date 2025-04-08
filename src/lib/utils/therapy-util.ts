import { therapies } from "../data/dummy_therapies";

export const getRandomTherapies = (count: number): Therapy[] => {
    const shuffled = [...therapies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  