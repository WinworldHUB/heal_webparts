import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openUrlInNewTab = (url: string) => {
  const newWindow = window?.open(url, "_blank", "noopener, noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const openUrlInSameTab = (url: string) => {
  try {
    if (window.parent) {
      window.parent?.open(url, "_self");
    } else {
      openUrlInNewTab(url);
    }
  } catch (error) {
    openUrlInNewTab(url);
  }
};

export const getDocumentFromUrl = async (
  url: string,
  name: string = "document"
): Promise<File | null> => {
  try {
    if (!url) {
      console.error("No URL provided to fetch document.");
      return null;
    }
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const blob = await response.blob();
    return new File([blob], name, { type: blob.type });
  } catch (error) {
    console.error("Error fetching document from URL:", error);
    return null;
  }
};
