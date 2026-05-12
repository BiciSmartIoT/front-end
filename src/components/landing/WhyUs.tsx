import { Gauge, Wrench, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
 
const features = [
  {
    icon: <Gauge size={20} className="text-primary" />,
    title: "Pro Performance",
    desc: "Every bike in our fleet is a top-tier model, tuned for maximum aerodynamic efficiency.",
    meta: "LEVEL: ELITE",
    num: "01",
  },
  {
    icon: <Wrench size={20} className="text-primary" />,
    title: "Precision Care",
    desc: "Daily inspections by certified mechanics ensure your ride is flawless from the first pedal.",
    meta: "MAINTENANCE: ZERO-TOLERANCE",
    num: "02",
  },
  {
    icon: <ShieldCheck size={20} className="text-primary" />,
    title: "Premium Gear",
    desc: "Rental includes high-end helmets, lock systems, and optional navigation computers.",
    meta: "GEAR: PROFESSIONAL",
    num: "03",
  },
];
 
export default function WhyUs() {
  return (
    <section className="relative bg-black py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
 
        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            {/* Accent bar */}
            <div className="h-[2px] w-14 bg-primary mb-6" />
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-tight">
              Por qué{" "}
              <span
                className="text-primary"
                style={{ textShadow: "0 0 60px rgba(232,255,0,0.25)" }}
              >
                Elegirnos
              </span>
            </h2>
          </div>
 
          <div className="flex flex-col items-end gap-5 md:max-w-xs">
            <p className="text-gray-600 text-[10px] font-semibold leading-relaxed uppercase tracking-tight text-right">
              Engineered for speed, built for reliability. Experience the elite
              standard of urban and trail performance.
            </p>
            <Button variant="primary" size="sm" className="group">
              All features{" "}
              <ArrowRight
                size={12}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </div>
 
        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 border border-white/5">
          {features.map((f) => (
            <article
              key={f.num}
              className="group relative bg-[#060606] p-10 flex flex-col transition-colors duration-300 hover:bg-[#0c0c0c]"
            >
              {/* Top-left primary accent on hover */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
 
              {/* Number + icon row */}
              <div className="flex justify-between items-start mb-10">
                <div className="w-10 h-10 border border-white/8 flex items-center justify-center transition-colors duration-300 group-hover:border-primary/30">
                  {f.icon}
                </div>
                <span className="text-[11px] font-black text-white/8 transition-colors duration-300 group-hover:text-primary/25 tabular-nums">
                  {f.num}
                </span>
              </div>
 
              {/* Title */}
              <h3 className="text-xl font-black uppercase italic mb-4 transition-colors duration-200 group-hover:text-primary">
                {f.title}
              </h3>
 
              {/* Description */}
              <p className="text-gray-500 text-[11px] leading-loose mb-10 flex-1">
                {f.desc}
              </p>
 
              {/* Footer */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[8px] font-black text-primary tracking-[0.2em]">
                  {f.meta}
                </span>
              </div>
            </article>
          ))}
        </div>
 
        {/* ── Bottom strip ── */}
        <div className="mt-px border border-t-0 border-white/5 bg-[#060606] px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
            Trusted by professional riders across 18 cities
          </p>
          <div className="flex items-center gap-6">
            {["Cervélo", "Trek", "Specialized", "Cannondale"].map((brand) => (
              <span key={brand} className="text-[9px] font-black uppercase text-white/15 tracking-widest">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}