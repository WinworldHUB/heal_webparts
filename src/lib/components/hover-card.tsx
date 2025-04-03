"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useState } from "react";

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
      className="relative w-80 h-100 overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
    >
      <CardContent className="p-4">
        <Image src={image} alt={name} fill />
      </CardContent>

      {/* Description Overlay */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: hovered ? "10%" : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-24 bg-black/80 text-white flex items-center justify-center p-3"
      >
        <div className="text-center">
          <p className="text-sm">{practice}</p>
          <p className="text-xs mt-1">{description}</p>
        </div>
      </motion.div>


    </Card>
  );
};

export default HoverCard;
