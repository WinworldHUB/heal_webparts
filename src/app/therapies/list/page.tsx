"use client";

import TherapyListContent from "@/lib/components/content/therapy-list-content";
import { Suspense } from "react";

const TherapyListPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TherapyListContent />
    </Suspense>
  );
};

export default TherapyListPage;
