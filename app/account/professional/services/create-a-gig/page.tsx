import CardInformation from "./CardInformation";
import JobInformation from "./JobInformation";

export default function page() {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <CardInformation />
      <JobInformation />
    </div>
  );
}
