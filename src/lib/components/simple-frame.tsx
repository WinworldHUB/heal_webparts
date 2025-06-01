"use client";

import { FC } from "react";

interface SimpleFrameProps extends React.HTMLAttributes<HTMLIFrameElement> {
  src: string;
  style?: React.CSSProperties;
}

const SimpleFrame: FC<SimpleFrameProps> = ({ src, style, ...props }) => {
  const defaultStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
  };
  return <iframe src={src} style={style ?? defaultStyle} {...props} />;
};

export default SimpleFrame;
