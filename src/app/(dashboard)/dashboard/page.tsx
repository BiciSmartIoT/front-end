"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

interface Vehicle {
  id: string;
  title: string;
  status: string;
  hourlyPrice: number;
  description: string;
  image?: string;
}

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    apiFetch("/vehicles/own")
      .then(setVehicles)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-black italic uppercase mb-10">
        Provider <span className="text-primary">Dashboard</span>
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="border border-white/10 p-6 bg-[#0A0A0A]">
          <p className="text-gray-500 text-sm uppercase">
            Total Machines
          </p>

          <h2 className="text-4xl font-black mt-4">
            {vehicles.length}
          </h2>
        </div>

        <div className="border border-white/10 p-6 bg-[#0A0A0A]">
          <p className="text-gray-500 text-sm uppercase">
            Available
          </p>

          <h2 className="text-4xl font-black mt-4">
            {
              vehicles.filter(
                (v) => v.status === "AVAILABLE"
              ).length
            }
          </h2>
        </div>

      </div>
    </div>
  );
}