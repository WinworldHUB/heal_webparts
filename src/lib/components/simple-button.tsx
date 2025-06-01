import { FC } from "react";
import { Button } from "./ui/button";

interface SimpleButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SimpleButton: FC<SimpleButtonProps> = ({ text, children, onClick,className }) => {
  return (
    <Button className={`cursor-pointer ${className}`} onClick={onClick}>
      {children ?? text}
    </Button>
  );
};

export default SimpleButton;
