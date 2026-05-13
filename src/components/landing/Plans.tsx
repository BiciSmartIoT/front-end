import { Check, X } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      type: "CASUAL",
      name: "SMART SHIELD",
      price: "15",
      features: [
        { text: "Rastreo GPS 24/7", inc: true },
        { text: "Geocercas de seguridad", inc: true },
        { text: "Alertas de movimiento", inc: true },
        { text: "Detección SOS", inc: false },
      ],
      btn: "ELEGIR PLAN",
      fav: false
    },
    {
      type: "PRO",
      name: "ELITE RESCUE",
      price: "25",
      features: [
        { text: "Todo en Smart Shield", inc: true },
        { text: "Detección SOS Activa", inc: true },
        { text: "Alertas a contactos", inc: true },
        { text: "Prioridad de red NB-IoT", inc: true },
      ],
      btn: "UNIRSE A ELITE",
      fav: true
    },
    {
      type: "ELITE",
      name: "FLEET CONTROL",
      price: "49",
      features: [
        { text: "Multi-dispositivos", inc: true },
        { text: "Dashboard de gestión", inc: true },
        { text: "Reportes de incidentes", inc: true },
        { text: "Soporte técnico VIP", inc: true },
      ],
      btn: "PLAN FLOTILLA",
      fav: false
    }
  ];

  return (
    <section className="bg-black py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-center text-sm font-black uppercase italic tracking-[0.4em] text-white mb-20">
                  Nuestros Planes
                </h2>
              

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <div key={i} className={`relative border ${p.fav ? 'border-primary border-2 bg-[#050505]' : 'border-white/10 bg-[#080808]'} p-10 flex flex-col`}>
              {p.fav && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black px-4 py-1 uppercase tracking-widest">
                  MÁS POPULAR
                </div>
              )}
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2">{p.type}</span>
              <h3 className="text-3xl font-black italic text-white mb-6 uppercase">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-black italic text-white">S/ {p.price}</span>
                <span className="text-gray-500 text-xs font-bold uppercase italic">/mes</span>
              </div>
              <div className="space-y-4 mb-12 flex-1">
                {p.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {f.inc ? <Check size={16} className="text-primary" /> : <X size={16} className="text-white/20" />}
                    <span className={`text-[11px] font-bold uppercase italic ${f.inc ? 'text-white' : 'text-white/20'}`}>{f.text}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full py-4 text-[10px] font-black tracking-widest uppercase transition-all ${p.fav ? 'bg-primary text-black' : 'border border-primary text-primary hover:bg-primary/5'}`}>
                {p.btn}
              </button>
            </div>
          ))}
        </div>
         <div className="text-center mb-16 mt-10">
          <p className="text-white text-xs uppercase font-bold opacity-50 italic">Cada suscripción requiere instalación previa de S/ 60</p>
        </div>
      </div>
    </section>
  );
}