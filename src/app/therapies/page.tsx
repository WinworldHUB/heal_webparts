"use client";

import PractitionerPageContent from "@/lib/components/practitioner-page-content";
import { Suspense } from "react";

 const TherapyPage = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PractitionerPageContent />
    </Suspense>
  );
};


export default TherapyPage;