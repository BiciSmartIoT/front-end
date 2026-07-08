"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Battery,
  ChevronLeft,
  Cpu,
  Gauge,
  Lock,
  MapPin,
  Radio,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "../../../../components/ui/Button";

function SpecsContent() {
  const params = useSearchParams();
  const bike = {
    id: params.get("id") || "GENERAL",
    title: params.get("title") || "BiciSmartIoT Machine",
    description:
      params.get("description") ||
      "Unidad conectada al ecosistema BiciSmartIoT con monitoreo de ubicacion, control remoto y telemetria operativa.",
    price: params.get("price") || "0",
    status: params.get("status") || "AVAILABLE",
    image:
      params.get("image") ||
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  };

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

          <div className="aspect-video bg-zinc-950 overflow-hidden">
            <img
              src={bike.image}
              alt={bike.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition duration-500"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
            <MapPin size={11} className="text-gray-600" />
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">
              Zona configurada desde la app movil
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
                ${bike.price}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                per hour
              </span>
            </div>
          </div>

          <p className="text-zinc-500 text-[12px] leading-relaxed uppercase tracking-wide">
            {bike.description}
          </p>

          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
              General IoT Specs
            </p>
            <div className="grid grid-cols-2 gap-3">
              <SpecCard icon={<Battery size={14} className="text-primary" />} label="Range" value="60 km" />
              <SpecCard icon={<Gauge size={14} className="text-primary" />} label="Speed Limit" value="30 km/h" />
              <SpecCard icon={<Shield size={14} className="text-primary" />} label="Geofence" value="Enabled" />
              <SpecCard icon={<Zap size={14} className="text-primary" />} label="Lock" value="Servo" />
            </div>
          </div>

          <div className="border border-primary/30 bg-primary/5 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">
              BiciSmartIoT Package
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Feature icon={<Radio size={15} />} title="GPS Tracking" text="Ubicacion y salida de zona." />
              <Feature icon={<Lock size={15} />} title="Remote Lock" text="Bloqueo por comando o geocerca." />
              <Feature icon={<Cpu size={15} />} title="Edge Device" text="ESP32 listo para telemetria." />
            </div>
          </div>

          <div className="mt-auto pt-2">
            <Link href="/explore/active-session">
              <Button className="w-full h-14 text-sm font-black italic uppercase tracking-[0.15em]">
                Initiate Rental
              </Button>
            </Link>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider text-center mt-3">
              Specs generales sujetas al modelo fisico conectado.
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

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-white/10 bg-black/60 p-4">
      <div className="text-primary mb-3">{icon}</div>
      <p className="text-[10px] font-black uppercase tracking-widest">{title}</p>
      <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

export default function SpecsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-500">
          Loading specs...
        </div>
      }
    >
      <SpecsContent />
    </Suspense>
  );
}
