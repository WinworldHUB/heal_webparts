import { FC } from "react";

interface RawHTMLProps {
  html: string;
}

const RawHTML: FC<RawHTMLProps> = ({ html }) => {
  return (
    <span className="raw-html" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default RawHTML;