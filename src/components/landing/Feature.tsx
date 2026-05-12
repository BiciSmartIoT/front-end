import { Gauge, ShieldCheck, Wrench } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Gauge className="text-primary" />,
      title: "Pro Performance",
      desc: "Every bike in our fleet is a top-tier model, tuned for maximum aerodynamic efficiency.",
      meta: "LEVEL: ELITE"
    },
    {
      icon: <Wrench className="text-primary" />,
      title: "Precision Care",
      desc: "Daily inspections by certified mechanics ensure your ride is flawless from the first pedal.",
      meta: "MAINTENANCE: ZERO-TOLERANCE"
    },
    {
      icon: <ShieldCheck className="text-primary" />,
      title: "Premium Gear",
      desc: "Rental includes high-end helmets, lock systems, and optional navigation computers.",
      meta: "GEAR: PROFESSIONAL"
    }
  ];

  return (
    <section className="bg-black py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="h-1 w-20 bg-primary mb-6" />
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">
            Por qué <span className="text-primary">Elegirnos</span>
          </h2>
        </div>
        <p className="max-w-sm text-gray-500 text-xs font-medium leading-relaxed uppercase tracking-tight text-right">
          Engineered for speed, built for reliability. Experience the elite standard of urban and trail performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-[#080808] border border-white/5 p-10 hover:border-primary/30 transition-colors">
            <div className="mb-8">{f.icon}</div>
            <h3 className="text-xl font-black uppercase italic mb-4">{f.title}</h3>
            <p className="text-gray-400 text-xs leading-loose mb-8">{f.desc}</p>
            <div className="h-[1px] w-full bg-white/5 mb-4" />
            <span className="text-[8px] font-black text-primary tracking-[0.2em]">{f.meta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}