export const getRandomTherapies = (count: number, therapies: TherapyDummy[]): TherapyDummy[] => {
  if (!Array.isArray(therapies)) {
    console.error("getRandomTherapies received invalid therapies:", therapies);
    return [];
  }
  const shuffled = [...therapies].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}
