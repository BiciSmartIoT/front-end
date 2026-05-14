"use client";

import { useState } from "react";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    bike: "TRIKA A1",
    date: "12 MAY 2026",
    duration: "2H 30M",
    total: 50,
  },
  {
    id: 2,
    bike: "MONARK RESET 2",
    date: "10 MAY 2026",
    duration: "1H 15M",
    total: 18,
  },
];

export default function HistoryPage() {
  const totalSpent = mockHistory.reduce((acc, r) => acc + r.total, 0);
  const totalRides = mockHistory.length;

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            Ride <span className="text-primary">History</span>
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            Previous Rentals
          </p>
        </div>

        <span className="bg-primary text-black text-[9px] font-black uppercase tracking-widest px-2 py-1">
          {totalRides} rides
        </span>
      </div>


      <div className="grid grid-cols-3 gap-px bg-white/10 mb-px">
        <div className="bg-[#0a0a0a] px-5 py-4">
          <p className="text-xl font-black">${totalSpent}</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Total spent</p>
        </div>
        <div className="bg-[#0a0a0a] px-5 py-4">
          <p className="text-xl font-black">3H 45M</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Total time</p>
        </div>
        <div className="bg-[#0a0a0a] px-5 py-4">
          <p className="text-xl font-black">{totalRides}</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Bikes rented</p>
        </div>
      </div>


      <div className="border border-white/10">
        {mockHistory.map((ride, index) => (
          <div
            key={ride.id}
            className="flex items-stretch border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition"
          >
            <div className="w-12 flex items-center justify-center text-[11px] font-black text-white/15 border-r border-white/10 flex-shrink-0">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-[14px] uppercase tracking-tight">
                  {ride.bike}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider">
                    <Calendar size={11} />
                    {ride.date}
                  </span>
                  <span className="w-px h-3 bg-white/15" />
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider">
                    <Clock size={11} />
                    {ride.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[22px] font-black text-primary leading-none">
                    ${ride.total}
                  </p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-1">
                    Total paid
                  </p>
                </div>

                <button className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition">
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}