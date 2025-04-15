export const getArrayFromTo = (from: number, to: number): number[] => {
  const output = [];

  for (let index = from; index <= to; index++) {
    output.push(index);
  }

  return output;
};

export const getPropsAsArrayFromArray = <T, K extends keyof T>(
  array: T[] = [],
  key: K
): T[K][] => {
  const output = [];
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item[key]) {
      output.push(item[key]);
    }
  }
  return output;
};

export const getArrayFrom = <T>(obj: Object, isKeys?: boolean): T[] =>
  isKeys ? (Object.keys(obj) as unknown[] as T[]) : Object.values(obj);

export const getArrayOfValuesFromArray = <T, K extends keyof T>(
  array: T[],
  key: K
): T[K][] => {
  const output = [];
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item[key]) {
      output.push(item[key]);
    }
  }
  return output;
};

export const mergeArrays = <T>(array1: T[], array2: T[]): T[] =>
  array1.concat(array2);

export const getItemFromArray = <T>(
  array: T[],
  key: string,
  value: string
): T => array.find((item) => item[key] === value) ?? ({} as T);

export const getItemsFromArray = <T>(
  array: T[],
  key: string,
  value: string
): T[] => array.filter((item) => item[key] === value);

export const getItemsFromArrayStringified = <T>(
  array: T[],
  key: string,
  value: string
): string[] =>
  getItemsFromArray(array, key, value).map((item) => JSON.stringify(item));

export const isItemInArray = <T>(
  array: T[],
  key: string,
  value: string
): boolean => array.some((item) => item[key] === value);

export const updateArrayItem = <T>(
  array: T[],
  key: string,
  value: string,
  newValue: T
): T[] => {
  const index = array.findIndex((item) => item[key] === value);
  if (index !== -1) {
    const updatedArray = [...array];
    updatedArray[index] = newValue;
    return updatedArray;
  }
  return array;
};

export const removeArrayItem = <T>(
  array: T[],
  key: string,
  value: string
): T[] => {
  if (array.length === 0) return array;

  const index = (array ?? []).findIndex((item) => item?.[key] === value);
  if (index !== -1) {
    const updatedArray = [...array];
    updatedArray.splice(index, 1);
    return updatedArray;
  }
  return array;
};
export const removeArrayItems = <T>(
  array: T[],
  key: string,
  value: string
): T[] => {
  const updatedArray = [...array];
  return updatedArray.filter((item) => item[key] !== value);
};