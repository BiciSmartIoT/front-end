// src/app/explore/[id]/page.tsx
"use client";
import { Zap, Shield, Battery, Gauge, ChevronLeft } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MachineDetailPage() {
  const { id } = useParams();

  const bikeSpecs = {
    title: "CARBON-X NODE 01",
    price: "15.00",
    range: "60km",
    topSpeed: "45km/h",
    weight: "18kg",
    description: "High-performance urban interceptor with carbon fiber frame and integrated telemetry.",
    locationName: "Central Garage - Sector 7"
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <Link href="/explore" className="text-gray-500 hover:text-primary flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-10">
        <ChevronLeft size={14} /> Back to Circuit
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
       
        <div className="bg-[#0A0A0A] border border-white/5 p-12 flex items-center justify-center relative group">
           <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-700">UNIT_REF: {id}</div>
           <img src="/bike-hero.png" alt="bike" className="w-full h-auto object-contain" />
        </div>

   
        <div className="space-y-10">
          <header>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">{bikeSpecs.title}</h1>
            <p className="text-primary text-2xl font-black mt-4 italic">${bikeSpecs.price} <span className="text-[10px] text-zinc-500 uppercase tracking-widest">per hour</span></p>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <SpecCard icon={<Battery className="text-primary"/>} label="Range" value={bikeSpecs.range} />
            <SpecCard icon={<Gauge className="text-primary"/>} label="Top Speed" value={bikeSpecs.topSpeed} />
            <SpecCard icon={<Shield className="text-primary"/>} label="Insurance" value="Included" />
            <SpecCard icon={<Zap className="text-primary"/>} label="Power" value="750W" />
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed uppercase font-medium tracking-wide">
            {bikeSpecs.description}
          </p>

          <Link href={`/explore/${id}/rent`}>
            <Button className="w-full py-8 text-lg italic font-black shadow-[0_0_30px_rgba(204,255,0,0.2)]">
              INITIATE RENTAL
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SpecCard({ icon, label, value }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-black uppercase text-zinc-500 tracking-[0.2em]">{label}</span>
        {icon}
      </div>
      <span className="text-xl font-black italic">{value}</span>
    </div>
  );
}