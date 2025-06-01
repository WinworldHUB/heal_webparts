import { FC } from "react";
import { Skeleton } from "./ui/skeleton";

interface SimpleLoaderProps {
  objects?: LoaderType[];
}

const CircleLoader = () => {
  return <Skeleton className="h-100 w-100 rounded-full" />;
};

const RectangleLoader = () => {
  return <Skeleton className="h-[100px] w-100" />;
};

const BarLoader = () => {
  return <Skeleton className="h-[10px] w-100" />;
};

const SimpleLoader: FC<SimpleLoaderProps> = ({ objects = ["circle"] }) => {
  return (
    <div
      className="inline-flex justify-center items-center space-x-4 w-100 h-100 flex-col gap-4"
      style={{ height: "100%", width: "100%" }}
    >
      {objects.map((object, index) => {
        switch (object) {
          case "circle":
            return <CircleLoader key={index} />;
          case "rectangle":
            return <RectangleLoader key={index} />;
          case "bar":
            return <BarLoader key={index} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SimpleLoader;
