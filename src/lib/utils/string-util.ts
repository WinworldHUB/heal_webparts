export const truncateText = (text: string, maxLength: number) => {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + "...";
  }
  return text;
};

export const getFullName = (firstName: string, lastName: string) => {
  return firstName + " " + lastName;
};
