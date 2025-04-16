"use client";

import TherapyPageContent from "@/lib/components/content/therapies-page-content";
import { Suspense } from "react";

 const TherapyPage = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TherapyPageContent />
    </Suspense>
  );
};


export default TherapyPage;