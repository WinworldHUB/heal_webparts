import { Skeleton } from "@/lib/components/ui/skeleton";
import React, { FC, useEffect, useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import { Separator } from "@/lib/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import RawHTML from "./raw-html";
import { getFullName } from "../utils/string-util";
import usePractitioners from "../hooks/usePractitioners";
import { USER_IMAGE_PLACEHOLDER } from "../constants";

interface PractitionerInfoProps {
  practitionerDetails: PractitionerDetails | null;
  loading: boolean;
  error: string;
}

const PractitionerInfo: FC<PractitionerInfoProps> = ({
  practitionerDetails,
  loading,
  error,
}) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const { getPractitionerProfilePic } = usePractitioners();

  useEffect(() => {
    if (practitionerDetails) {
      getPractitionerProfilePic(
        practitionerDetails?.practitioner?.id,
        (profilePic) => {
          console.log("Profile Pic URL:", profilePic);
          setProfilePicUrl(profilePic);
        }
      );
    }
  }, [practitionerDetails]);

  if (!practitionerDetails) {
    return (
      <div className="flex justify-center items-center w-full">
        <Skeleton className="w-full h-48" />
      </div>
    );
  }

  if (loading) {
    <div className="flex justify-center items-center w-full">
      <Skeleton className="w-full h-48" />
    </div>;
  }

  if (error) {
    console.log("error:", error);

    return (
      <div className="flex justify-center items-center w-full">
        <Skeleton className="w-full h-48" />
      </div>
    );
  }

  const { practitioner } = practitionerDetails;
  if (!practitioner) {
    return (
      <div className="flex justify-center items-center w-full bg-[#f2f0ea] ">
        <Skeleton className="w-full h-48" />
      </div>
    );
  }

  return (
    <div className="bg-[#f2f0ea] min-h-dvh flex flex-col items-center py-4">
      <div className="flex flex-row justify-center items-start gap-8 w-full">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex flex-col h-full bg-white w-full shadow-sm p-4">
            <div className="flex flex-col items-start  text-start mb-2">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {practitioner?.businessName ??
                  getFullName(practitioner?.firstName, practitioner?.lastName)}
              </h1>
              <RawHTML html={practitioner?.businessSummary} />
            </div>
            <Separator className="mb-2" />

            <div className="flex flex-col items-start text-start mb-2">
              <h2 className="flex flex-col text-gray-800 font-semibold mb-4 text-xl">
                Contacts
              </h2>

              <div className="flex flex-row items-start text-start">
                <FaPhone size={16} className="text-black mt-1 mx-2" />
                <p className="text-gray-700 mb-4">{practitioner?.email}</p>
              </div>

              <div className="flex flex-row items-start text-start">
                <FaEnvelope size={16} className="text-black mt-1 mx-2" />
                <p className="text-gray-700 mb-4">
                  {practitioner?.contactNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full bg-white rounded-l-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Clinic Availability
            </h2>

            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={practitionerDetails?.clinics[0]?.id}
            >
              {practitionerDetails?.clinics?.map((clinic, index) => (
                <AccordionItem key={clinic?.id} value={clinic?.id}>
                  <AccordionTrigger>{clinic?.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">
                        {clinic?.address}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {clinic?.postCode}
                      </p>

                      <h4 className="text-sm font-semibold text-gray-700 mt-2 mb-1">
                        Available Hours:
                      </h4>
                      {clinic?.availableHours.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {clinic?.availableHours.map((hour, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm text-gray-800"
                            >
                              <span>{hour?.day}</span>
                              <span>
                                {hour?.fromTime} - {hour?.toTime}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="italic text-sm text-gray-500">
                          No available hours listed
                        </p>
                      )}

                      {index !== practitionerDetails.clinics.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex flex-col w-full h-full p-0 border-0 bg-transparent">
          <div className="w-full 2xl:w-3/4 h-96 relative mb-4">
            <Image
              src={profilePicUrl ?? USER_IMAGE_PLACEHOLDER}
              alt="Practitioner"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-semibold text-gray-800 mb-6">
              {getFullName(practitioner?.firstName, practitioner?.lastName)}
            </h3>
            <RawHTML html={practitioner?.biography} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractitionerInfo;
