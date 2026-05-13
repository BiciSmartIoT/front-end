"use client";

import { Clock3 } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    bike: "Carbon Fiber Pro",
    date: "12 MAY 2026",
    duration: "2h 30m",
    total: 50,
  },
  {
    id: 2,
    bike: "Urban Stealth",
    date: "10 MAY 2026",
    duration: "1h 15m",
    total: 18,
  },
];

export default function History() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Clock3 className="text-primary" size={34} />

          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tight">
              Ride History
            </h1>

            <p className="text-gray-500 text-xs uppercase mt-2">
              Previous rentals and sessions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {mockHistory.map((ride) => (
            <div
              key={ride.id}
              className="border border-white/10 bg-[#0A0A0A] p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-sm font-black uppercase">
                  {ride.bike}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {ride.date}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">
                  {ride.duration}
                </p>

                <h3 className="text-2xl font-black text-primary mt-1">
                  ${ride.total}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}