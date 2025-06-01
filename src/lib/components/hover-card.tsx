"use client";

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { getFullName, truncateText } from "../utils/string-util";

interface HoverCardProps {
  practitioner: Practitioner;
  onCardClick: () => void;
}

const HoverCard: FC<HoverCardProps> = ({ practitioner, onCardClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="relative w-84 h-100 overflow-hidden cursor-pointer p-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
    >
      <CardContent className="p-4 h-full relative">
        <Image
          src={
            practitioner.practitionerImage ??
            "https://stanmorewellnessclinic.com/wp-content/uploads/2024/11/Luis-Osteo-67-scaled.jpg"
          }
          alt={practitioner.firstName + practitioner.lastName}
          fill
          className="object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 text-center left-0 w-full h-1/2 bg-[#a99870]/90 p-4 flex flex-col justify-start rounded-t-lg shadow-md overflow-hidden"
        >
          <p className="text-xl font-semibold text-white">
            {practitioner.businessName?.trim()
              ? practitioner.businessName
              : getFullName(practitioner.firstName, practitioner.lastName)}
          </p>
          <p className="text-lg text-white mt-1">
            {truncateText(
              practitioner.businessSummary?.trim()
                ? practitioner.businessSummary
                : practitioner.biography,
              100
            )}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default HoverCard;
