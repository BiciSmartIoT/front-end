import { MOCK_DATA } from "../../../../data/vehicles";
import MachineDetailClient from "./MachineDetailClient";

export function generateStaticParams() {
  return MOCK_DATA.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MachineDetailClient id={id} />;
}
