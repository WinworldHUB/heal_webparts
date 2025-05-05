import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { PiCaretRight } from "react-icons/pi";
import { truncateText } from "../utils/string-util";
import useDocLinks from "../hooks/useDocLinks";
import { SkeletonCard } from "./ui/skeleton";
import { DMS_PATHS } from "../constants";

interface TherapyWidgetProps {
  therapy: Therapy;
}

const TherapyWidget: FC<TherapyWidgetProps> = ({ therapy }) => {
  const {
    getDocLink,
    error: docLinkError,
    isLoading: docLinkLoading,
  } = useDocLinks();

  const [therapyImage, setTherapyImage] = useState<string>("/assets/therapies/therapy_placeholder.jpg");

  useEffect(() => {
    if (therapy) {
      getDocLink(
        therapy.id,
        `${DMS_PATHS.IMAGES.BASE}${DMS_PATHS.IMAGES.THERAPY}/${therapy.id}`,
        (docLinks) => {
          setTherapyImage(docLinks?.[0]?.url);
        }
      );
    }
  }, [therapy]);

  if (docLinkLoading || docLinkError) {
    return <SkeletonCard className="min-h-dvh w-full" />;
  }

  return (
    <Card className="w-full max-w-sm h-full flex flex-col items-center text-center p-6 border-0 rounded-none shadow-none">
      {/* Avatar */}
      <Avatar className="h-44 w-44 shadow-lg">
        <AvatarImage
          src={therapyImage ?? "/assets/therapies/therapy_placeholder.jpg"}
          alt="Therapist"
          className="size-full object-cover rounded-full"
        />
      </Avatar>

      {/* Name + Truncated Desc */}
      <CardContent className="flex flex-col flex-grow mt-4">
        <h3 className="text-xl font-semibold h-[35px] w-[250px] truncate">{therapy.name}</h3>
        <p className="mt-2 text-gray-600 h-[70px]">
          {truncateText(therapy.description, 50)}
        </p>

        <div className="pt-4 flex justify-center my-1">
          <Link
            href="https://heal-wellness.co.uk/services/"
            className="group w-40 border border-[#a99870] text-[#a99870] px-4 py-2 rounded-4xl flex items-center justify-center transition-all duration-300 hover:bg-[#a99870] hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
            <span className="max-w-0 overflow-hidden transition-all group-hover:max-w-fit group-hover:ml-2 duration-300 flex items-center">
              <PiCaretRight className="text-2xl text-white" size={24} />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyWidget;
