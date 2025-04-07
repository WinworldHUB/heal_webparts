"use client";

import { useEffect, useState } from "react";

export default function TestPage2() {
  const [value, setValue] = useState<string>("0");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("HEAL_APP");
      if (stored) {
        setValue(stored);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <p className="text-xl font-semibold">HEAL LOCAL STORAGE VALUE: {value}</p>
    </div>
  );
}
