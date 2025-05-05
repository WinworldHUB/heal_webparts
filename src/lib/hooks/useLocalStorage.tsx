"use client";

import { EncodeBase64Aes, DecodeBase64Aes } from "../utils/hash-utils";

interface UseLocalStorageState<T> {
  setValue: (key: string, value: T) => void;
  getValue: (key: string) => T | null;
  clearAll: VoidFunction;
  removeValue: (key: string) => void;
}

const useLocalStorage = <T,>(): UseLocalStorageState<T> => {
  if (typeof window === "undefined") {
    return {
      setValue: () => {},
      getValue: () => null,
      clearAll: () => {},
      removeValue: () => {},
    };
  }

  const setValue = (key: string, value: T) => {
    const encodedValue = EncodeBase64Aes(JSON.stringify(value));
    window.localStorage.setItem(key, encodedValue);
  };

  const getValue = (key: string): T | null => {
    const value = window.localStorage.getItem(key);
    if (!value) return null;
    const decodedValue = DecodeBase64Aes(value);
    if (value === decodedValue) window.localStorage.removeItem(key);

    return JSON.parse(decodedValue);
  };

  const clearAll = () => {
    window.localStorage.clear();
  };

  const removeValue = (key: string) => {
    window.localStorage.removeItem(key);
  };

  return {
    getValue,
    setValue,
    clearAll,
    removeValue,
  };
};

export default useLocalStorage;
