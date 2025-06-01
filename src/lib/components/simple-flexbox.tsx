import { FC } from "react";

interface SimpleFlexboxProps {
  children: React.ReactNode;
  className?: string;
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly";
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
  flexDirection?: "row" | "col" | "row-reverse" | "col-reverse";
}

const SimpleFlexbox: FC<SimpleFlexboxProps> = ({
  children,
  flexDirection = "row",
  justifyContent = "between",
  alignItems = "center",
  className = "",
}) => {
  const direction = flexDirection === "row" ? "flex" : "flex-" + flexDirection;

  return (
    <div
      className={`w-full ${direction} justify-${justifyContent} items-${alignItems} gap-3  ${className}`}
    >
      {children}
    </div>
  );
};

export default SimpleFlexbox;
