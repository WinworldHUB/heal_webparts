"use client";

import { useEffect, useState } from "react";

export default function TestPage1() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("HEAL_APP");
      if (saved) {
        setCount(parseInt(saved));
      }
    }
  }, []);

  const onButtonClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("HEAL_APP", newCount.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-lg mb-4">Count: {count}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={onButtonClick}
      >
        Increment
      </button>
    </div>
  );
}
