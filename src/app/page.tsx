import TherapyWidget from "@/lib/components/therapy-widget";
import { therapies } from "@/lib/data/dummy_therapies";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {therapies.map((therapy, index) => (
        <TherapyWidget key={index} therapy={therapy} />
      ))}
    </>
  );
}
