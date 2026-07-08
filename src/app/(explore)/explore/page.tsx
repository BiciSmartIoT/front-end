// src/app/explore/page.tsx
"use client";

import Link from "next/link";
import { Button } from "../../../components/ui/Button";
import { useFleet } from "../../../hooks/useFleet";
const mockBikeImages = [
  "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1200&auto=format&fit=crop",
];
export default function ExplorePage() {

  const { vehicles } = useFleet("all");

  const getSpecsHref = (bike: (typeof vehicles)[number], index: number) => {
    const params = new URLSearchParams({
      id: String(bike.id),
      title: bike.title,
      description: bike.description || "Bicicleta conectada a BiciSmartIoT.",
      price: String(bike.hourlyPrice),
      status: bike.status,
      image: bike.image || mockBikeImages[index % mockBikeImages.length],
    });

    return `/explore/specs?${params.toString()}`;
  };

  return (

    <div className="min-h-screen bg-black p-12 pt-24">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black italic uppercase text-white mb-12 tracking-tighter">
          Available <span className="text-primary">Machines</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{vehicles.map((bike, index) => (
            <div
              key={bike.id}
              className="border border-white/10 bg-[#0A0A0A] overflow-hidden group hover:border-primary/50 transition-all"
            >

              {/* IMAGE */}

              <div className="aspect-video overflow-hidden bg-zinc-900">

              <img
  src={
    mockBikeImages[
      index % mockBikeImages.length
    ]
  }
  alt={bike.title}
  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
/>
              </div>

              {/* CONTENT */}

              <div className="p-6">

                <div className="flex justify-between items-start mb-4">

                  <h3 className="text-white font-black italic uppercase text-xl tracking-tight">
                    {bike.title}
                  </h3>

                  <div
                    className={`
                      text-[10px]
                      px-2
                      py-1
                      font-black
                      uppercase
                      tracking-widest
                      ${
                        bike.status === "AVAILABLE"
                          ? "bg-primary text-black"
                          : "bg-red-600 text-white"
                      }
                    `}
                  >
                    {bike.status}
                  </div>

                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2">

                  {bike.description ||
                    "No technical specs provided."}

                </p>

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-[10px] uppercase tracking-widest text-gray-600 font-black">
                      Hourly Price
                    </p>

                    <h4 className="text-2xl font-black text-primary">
                      ${bike.hourlyPrice}
                    </h4>

                  </div>

                </div>

                <Link href={getSpecsHref(bike, index)}>

                  <Button
                    className="w-full text-[10px] tracking-[0.2em]"
                  >
                    VIEW SPECS
                  </Button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
