"use client";

import { useState } from "react";
import { DollarSign, Zap, Activity, Navigation, Battery } from "lucide-react";

export default function OverviewPage() {
  const [stats] = useState([
    { label: "Total Revenue", value: "$12.50", icon: DollarSign, delta: "+8% today" },
    { label: "Units Online", value: "3", suffix: "Active", icon: Zap, delta: "2 idle" },
    { label: "System Health", value: "98%", icon: Activity, delta: "Nominal" },
  ]);

  const units = [
    { id: "001", name: "TRIKA A1", speed: 24, battery: 82 },
    { id: "002", name: "MONARK R2", speed: 18, battery: 47 },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            System <span className="text-primary">Overview</span>
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            Real-time node telemetry · Lima Central
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
                <Icon size={13} className="text-primary opacity-60" />
              </div>
              <p className="text-3xl font-black italic tracking-tight">
                {stat.value}
                {stat.suffix && (
                  <span className="text-base ml-2 not-italic font-black text-gray-500">
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-2">
                {stat.delta}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 border border-white/10 bg-[#0a0a0a] h-[420px] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* label */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
              GPS Feed
            </span>
            <span className="bg-primary text-black text-[8px] font-black uppercase px-1.5 py-0.5 tracking-wider">
              Live
            </span>
          </div>

          {/* pin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-6 border border-primary/20 rounded-full" />
              <div className="absolute -inset-12 border border-primary/10 rounded-full" />
              <div className="bg-primary p-2 rotate-45">
                <Navigation className="-rotate-45 text-black" size={18} />
              </div>
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black border border-white/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                NODE_LIMA_01
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 border border-white/10 bg-black px-4 py-3">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">
              Coordinates
            </p>
            <p className="text-xs font-mono font-black">-12.0463, -77.0427</p>
          </div>
          <div className="absolute bottom-4 right-4 border border-white/10 bg-black px-4 py-3">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">
              Signal
            </p>
            <div className="flex items-end gap-0.5 h-4">
              {[3, 5, 7, 9, 11].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 ${i < 4 ? "bg-primary" : "bg-white/10"}`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
              Active Hardware
            </p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {units.map((unit) => (
            <div
              key={unit.id}
              className="border border-white/10 bg-[#0a0a0a] p-5 hover:border-primary/40 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-black text-[13px] uppercase tracking-tight">
                    {unit.name}
                  </p>
                  <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-0.5">
                    ID · {unit.id}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-wider">
                    Online
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-black border border-white/5 px-3 py-2.5">
                  <p className="text-[8px] text-gray-600 uppercase font-black tracking-wider">
                    Speed
                  </p>
                  <p className="text-lg font-black italic mt-0.5">
                    {unit.speed}
                    <span className="text-[10px] ml-1 not-italic text-gray-500">
                      km/h
                    </span>
                  </p>
                </div>
                <div className="bg-black border border-white/5 px-3 py-2.5">
                  <p className="text-[8px] text-gray-600 uppercase font-black tracking-wider">
                    Battery
                  </p>
                  <p
                    className={`text-lg font-black italic mt-0.5 ${
                      unit.battery > 60
                        ? "text-primary"
                        : unit.battery > 30
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {unit.battery}%
                  </p>
                </div>
              </div>

              <div>
                <div className="h-1 bg-white/5 w-full">
                  <div
                    className={`h-full transition-all ${
                      unit.battery > 60
                        ? "bg-primary"
                        : unit.battery > 30
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                    style={{ width: `${unit.battery}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}