"use client";

import { Zap, Shield, Battery, Gauge, ChevronLeft, MapPin } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import Link from "next/link";
import { MOCK_DATA } from "../../../../data/vehicles";

export default function MachineDetailClient({ id }: { id: string }) {
  const bike = MOCK_DATA.find((v) => v.id === id);

  if (!bike) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-600">
          Unit not found
        </p>
        <Link
          href="/explore"
          className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition"
        >
          Back to Circuit
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-24">
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition mb-10"
      >
        <ChevronLeft size={13} />
        Back to Circuit
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
              UNIT_REF: {bike.id}
            </span>
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 ${
                bike.status === "AVAILABLE"
                  ? "bg-primary text-black"
                  : "border border-yellow-400/60 text-yellow-400"
              }`}
            >
              {bike.status}
            </span>
          </div>

          <div className="p-10 flex items-center justify-center">
            <img
              src={bike.image}
              alt={bike.title}
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition duration-500"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
            <MapPin size={11} className="text-gray-600" />
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">
              Lima Centro
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              {bike.title}
            </h1>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-black italic text-primary">
                ${bike.hourlyPrice}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                per hour
              </span>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-4">
              Specifications
            </p>
            <div className="grid grid-cols-2 gap-3">
              <SpecCard icon={<Battery size={14} className="text-primary" />} label="Range" value="60 km" />
              <SpecCard icon={<Gauge size={14} className="text-primary" />} label="Max Speed" value="45 km/h" />
              <SpecCard icon={<Shield size={14} className="text-primary" />} label="Insurance" value="Included" />
              <SpecCard icon={<Zap size={14} className="text-primary" />} label="Motor" value="750 W" />
            </div>
          </div>
          <p className="text-zinc-500 text-[12px] leading-relaxed uppercase tracking-wide">
            {bike.description}
          </p>
          <div className="mt-auto pt-2">
            <Link href={`/explore/${bike.id}/rent`}>
              <Button className="w-full h-14 text-sm font-black italic uppercase tracking-[0.15em]">
                Initiate Rental
              </Button>
            </Link>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider text-center mt-3">
              No deposit required - Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 px-4 py-3 flex items-center justify-between gap-3 hover:border-white/20 transition">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-sm font-black italic">{value}</span>
    </div>
  );
}
