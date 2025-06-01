import SimpleFrame from "@/lib/components/simple-frame";

export default function Home() {
  return (
    <div className="flex justify-between items-center w-full px-4 overflow-hidden flex-col app-bg">
      <h1>Services</h1>
      <SimpleFrame
        src="http://localhost:3000/services"
        className="website-width"
        style={{ height: "100vh" }}
      />
      <h1>Therapies</h1>
      <SimpleFrame src="http://localhost:3000/therapies" className="w-full" />
      <h1>Practitioners</h1>
      <SimpleFrame src="http://localhost:3000/practitioners" />
      <h1>Therapy / Services </h1>
      <SimpleFrame
        src="http://localhost:3000/therapies/services"
        className="website-width"
      />
    </div>
  );
}
