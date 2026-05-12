// ./src/app/(dashboard)/dashboard/overview/page.tsx
"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/Button";
import { Plus, Zap, Activity, DollarSign, MapPin, Battery, Navigation } from "lucide-react";

export default function OverviewPage() {
  const [stats] = useState([
    { label: "Total Revenue", value: "$1,240.50", icon: <DollarSign className="text-primary" size={20}/> },
    { label: "Units Online", value: "3 Active", icon: <Zap className="text-primary" size={20}/> },
    { label: "System Health", value: "98%", icon: <Activity className="text-primary" size={20}/> },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 bg-black min-h-screen text-white">
      <header className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            System <span className="text-primary">Overview</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
            Real-time node telemetry / Lima Central
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/5 p-6 relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
              <p className="text-4xl font-black italic mt-2 tracking-tighter">{stat.value}</p>
            </div>
            <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-100 transition-opacity">
                {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 h-[450px] relative group">
          <div className="absolute inset-0 bg-zinc-900/20 flex items-center justify-center overflow-hidden">
             <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-pulse" />
             <div className="relative flex flex-col items-center">
                <div className="absolute -top-12 bg-primary text-black text-[9px] font-black px-2 py-1 uppercase italic tracking-tighter whitespace-nowrap">
                    NODE_LIMA_01_ONLINE
                </div>
                <div className="bg-primary p-2 rotate-45 animate-bounce shadow-lg shadow-primary/50">
                    <Navigation className="-rotate-45 text-black" size={20} />
                </div>
             </div>
          </div>
          <div className="absolute bottom-6 left-6 bg-black border border-white/10 p-4">
             <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Live GPS</p>
             <p className="text-xs font-mono font-bold">-12.0463, -77.0427</p>
          </div>
        </div>

      
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 border-l-2 border-primary pl-3">
            Active Hardware
          </h3>
          
          {[1, 2].map((id) => (
            <div key={id} className="bg-[#0A0A0A] border border-white/5 p-5 space-y-4 hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start">
                <p className="text-xs font-black italic uppercase">UNIT_ID: 00{id}</p>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[8px] font-black text-green-500 uppercase">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-black p-2 border border-white/5">
                    <p className="text-[8px] text-gray-600 uppercase font-black">Speed</p>
                    <p className="text-lg font-black italic">24<span className="text-[10px] ml-1 uppercase">kmh</span></p>
                </div>
                <div className="bg-black p-2 border border-white/5">
                    <p className="text-[8px] text-gray-600 uppercase font-black">Battery</p>
                    <p className="text-lg font-black italic text-primary">82%</p>
                </div>
              </div>
            </div>
          ))}
          <Button className="w-full py-6">
            <Plus size={18} className="mr-2"/> Register Machine
          </Button>
        </div>
      </div>
    </div>
  );
}