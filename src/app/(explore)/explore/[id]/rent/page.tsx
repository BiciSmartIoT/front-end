import { MOCK_DATA } from "../../../../../data/vehicles";
import RentClient from "./RentClient";

export function generateStaticParams() {
  return MOCK_DATA.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export default async function RentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RentClient id={id} />;
}
