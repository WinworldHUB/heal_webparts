"use client";

import TherapyPageServiceContent from "@/lib/components/content/therapies-service-page";
import { Suspense } from "react";

const TherapyServicePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TherapyPageServiceContent />
    </Suspense>
  );
};

export default TherapyServicePage;
