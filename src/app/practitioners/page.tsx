"use client";

import PractitionerPageContent from "@/lib/components/content/practitioner-page-content";
import { Suspense } from "react";

export default function PractitionerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PractitionerPageContent />
    </Suspense>
  );
}
