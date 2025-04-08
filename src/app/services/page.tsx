import ServicePageContent from "@/lib/components/service-page-content";
import React, { Suspense } from "react";

const ServicePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicePageContent />
    </Suspense>
  );
};

export default ServicePage;
