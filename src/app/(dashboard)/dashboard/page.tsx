"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { TrendingUp, Zap, Clock } from "lucide-react";

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
    apiFetch("/vehicles/own").then(setVehicles).catch(console.error);
  }, []);

  const available = vehicles.filter((v) => v.status === "AVAILABLE").length;
  const inUse = vehicles.filter((v) => v.status === "IN_USE").length;
  const revenue = inUse * 12.5;

  const stats = [
    {
      label: "Total Machines",
      value: vehicles.length,
      icon: Zap,
      delta: "Fleet registered",
    },
    {
      label: "Available",
      value: available,
      icon: TrendingUp,
      delta: `${inUse} in use`,
      highlight: true,
    },
    {
      label: "Est. Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: Clock,
      delta: "Active sessions",
    },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">

      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            Provider <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            Fleet performance overview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/10 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#0a0a0a] px-5 py-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <Icon
                  size={13}
                  className={stat.highlight ? "text-primary" : "text-gray-600"}
                />
              </div>
              <p
                className={`text-3xl font-black italic tracking-tight ${
                  stat.highlight ? "text-primary" : "text-white"
                }`}
              >
                {stat.value}
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-2">
                {stat.delta}
              </p>
            </div>
          );
        })}
      </div>
      {vehicles.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
              Registered Units
            </p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="border border-white/10">
            {vehicles.map((v, index) => (
              <div
                key={v.id}
                className="flex items-stretch border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition"
              >
                <div className="w-12 flex items-center justify-center text-[11px] font-black text-white/15 border-r border-white/10 flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-[13px] uppercase tracking-tight">
                      {v.title}
                    </p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-1 line-clamp-1">
                      {v.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="font-black text-primary text-sm">
                      ${v.hourlyPrice}/h
                    </span>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 ${
                        v.status === "AVAILABLE"
                          ? "bg-primary text-black"
                          : v.status === "IN_USE"
                          ? "border border-yellow-400/60 text-yellow-400"
                          : "border border-white/20 text-white/30"
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {vehicles.length === 0 && (
        <div className="border border-dashed border-white/10 py-16 flex flex-col items-center gap-3">
          <Zap size={28} className="text-white/10" />
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-600">
            No machines registered
          </p>
        </div>
      )}
    </div>
  );
}