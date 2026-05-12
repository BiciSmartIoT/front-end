// src/app/explore/page.tsx
"use client";
import Link from "next/link";
import { Button } from "../../../components/ui/Button";
import { useFleet } from "../../../hooks/useFleet";
export default function ExplorePage() {
  const { vehicles } = useFleet("all");

  return (
    <div className="min-h-screen bg-black p-12 pt-24">
      <h1 className="text-5xl font-black italic uppercase text-white mb-12 tracking-tighter">
        Available <span className="text-primary">Machines</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vehicles.map((bike) => (
          <div key={bike.id} className="border border-white/10 bg-[#0A0A0A] p-6 group hover:border-primary/50 transition-all">
<div className="overflow-hidden mb-6 bg-zinc-900 aspect-video flex items-center justify-center">
      <img 
        src={bike.image || "/fallback-bike.png"}
        alt={bike.title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
      />
    </div>           
     <h3 className="text-white font-black italic uppercase text-xl">{bike.title}</h3>
            <p className="text-primary font-black mt-2 tracking-widest">${bike.hourlyPrice} / HOUR</p>
            
            <Link href={`/explore/${bike.id}`}>
              <Button variant="inverted" className="w-full mt-6 text-[10px] tracking-[0.2em]">
                VIEW SPECS
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}