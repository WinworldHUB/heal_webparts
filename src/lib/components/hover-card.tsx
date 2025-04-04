"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { truncateText } from "../utils/string-util";

interface HoverCardProps {
  name: string;
  image: string;
  practice: string;
  description: string;
  onCardClick: () => void;
}

const HoverCard: FC<HoverCardProps> = ({
  name,
  image,
  practice,
  description,
  onCardClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="relative w-84 h-100 overflow-hidden cursor-pointer p-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
    >
      <CardContent className="p-4 h-full relative">
        <Image src={image} alt={name} fill className="object-cover" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 text-center left-0 w-full h-1/2 bg-[#a99870]/90 p-4 flex flex-col justify-start rounded-t-lg shadow-md overflow-hidden"
        >
          <p className="text-xl font-semibold text-white">{practice}</p>
          <p className="text-lg text-white mt-1">
            {truncateText(description, 140)}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default HoverCard;
