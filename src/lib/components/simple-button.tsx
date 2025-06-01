import { FC } from "react";
import { Button } from "./ui/button";

interface SimpleButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SimpleButton: FC<SimpleButtonProps> = ({ text, children, onClick }) => {
  return (
    <Button className="cursor-pointer" onClick={onClick}>
      {children ?? text}
    </Button>
  );
};

export default SimpleButton;
