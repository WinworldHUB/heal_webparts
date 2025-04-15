import { Skeleton } from "@/lib/components/ui/skeleton";
import React, { FC } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import { Separator } from "@/lib/components/ui/separator";

interface PractitionerInfoProps {
  practitioner: Practitioner | null;
  loading: boolean;
  error: string;
}

const PractitionerInfo: FC<PractitionerInfoProps> = ({
  practitioner,
  loading,
  error,
}) => {
  if (!practitioner) {
    return (
      <div className="flex justify-center items-center w-full">
        <Skeleton className="w-full h-48" />
      </div>
    );
  }

  if (error) {
    console.log("error:", error);

    return (
      <div className="flex justify-center items-center w-full">
        <Skeleton className="w-full h-48" />
      </div>
    );
  }

  return (
    <div className="bg-[#f2f0ea] min-h-dvh flex flex-col items-center py-4">
      <div className="flex flex-row justify-center items-start gap-8 w-full">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex flex-col h-full bg-white w-full shadow-lg p-4">
            <div className="flex flex-col items-start  text-start mb-2">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {practitioner?.firstName + practitioner?.lastName}{" "}
              </h1>
              <p
                className="text-gray-700 mb-1"
                dangerouslySetInnerHTML={{
                  __html: practitioner?.businessSummary,
                }}
              />
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
          <div className="flex flex-col h-full bg-white rounded-l-lg shadow-lg p-4">
            {practitioner?.availability?.map((slot, index) => (
              <>
                <div
                  key={index}
                  className="flex flex-row items-center justify-between font-light mb-2"
                >
                  <p className="text-gray-900  mr-2 text-nowrap text-sm">
                    {slot.day}
                  </p>
                  {"status" in slot ? (
                    <p className="text-gray-500 italic text-sm">
                      {slot.status}
                    </p>
                  ) : (
                    <p className="text-gray-900 text-sm">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  )}
                </div>
                {index != practitioner?.availability.length - 1 && (
                  <Separator className="my-2" />
                )}
              </>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full h-full p-0 border-0 bg-transparent">
          <div className="w-full 2xl:w-3/4 h-96 relative mb-4">
            <Image
              src="/assets/doctor_image.jpg"
              alt="Practitioner"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-semibold text-gray-800 mb-6">
              {practitioner?.firstName + practitioner.lastName}{" "}
            </h3>
            <p
              className="text-gray-500 mb-4"
              dangerouslySetInnerHTML={{
                __html: practitioner?.biography || "",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractitionerInfo;
