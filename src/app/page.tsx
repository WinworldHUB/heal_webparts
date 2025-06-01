import SimpleFrame from "@/lib/components/simple-frame";

export default function Home() {
  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden flex-col">
      <h1>Therapies</h1>
      <SimpleFrame src="http://localhost:3000/therapies" />
      <h1>Practitioners</h1>
      <SimpleFrame src="http://localhost:3000/practitioners" />
    </div>
  );
}
