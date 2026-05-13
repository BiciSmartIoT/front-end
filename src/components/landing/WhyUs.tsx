import { Radio, BellRing, Activity } from "lucide-react";

const features = [
  {
    icon: <Radio size={28} className="text-primary" />,
    title: "Rastreo 24/7",
    desc: "Localización GPS en tiempo real con tecnología IoT/SIM y Bluetooth Low Energy para una vigilancia ininterrumpida.",
    meta: "CONECTIVIDAD: GLOBAL",
    num: "01",
  },
  {
    icon: <BellRing size={28} className="text-primary" />,
    title: "Alertas Inteligentes",
    desc: "Notificaciones push instantáneas ante movimientos irregulares o intentos de manipulación del sistema de seguridad.",
    meta: "RESPUESTA: INMEDIATA",
    num: "02",
  },
  {
    icon: <Activity size={28} className="text-primary" />,
    title: "Detección de Caídas",
    desc: "Sensores analíticos (acelerómetro y giroscopio) que envían señales de auxilio SOS a tus contactos de emergencia.",
    meta: "SEGURIDAD: PREVENTIVA",
    num: "03",
  },
];

export default function WhyUs() {
  return (
    <section className="relative  bg-black py-3 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        

        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="h-[3px] w-20 bg-primary mb-8" />
            <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-tight text-white">
              Por qué{" "}
             
                Elegirnos
  
            </h2>
          </div>

          <div className="flex flex-col items-end gap-5 md:max-w-sm">
            <p className="text-gray-400 text-xs font-semibold leading-relaxed uppercase tracking-widest text-right">
              Diseñado para proteger, construido para conectar. La nueva era de seguridad inteligente para ciclistas urbanos y atletas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10">
          {features.map((f) => (
            <article
              key={f.num}
              className="relative bg-[#080808] p-12 flex flex-col border-white/5 md:first:border-l-0 border-l"
            >
              <div className="absolute top-0 left-0 h-[2px] w-full bg-primary/40" />

              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 border border-primary/20 flex items-center justify-center bg-primary/5">
                  {f.icon}
                </div>
                <span className="text-2xl font-black text-white/5 tabular-nums">
                  {f.num}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase italic mb-6 text-white">
                {f.title}
              </h3>

              <p className="text-gray-400 text-[13px] leading-relaxed mb-12 flex-1">
                {f.desc}
              </p>

              <div className="border-t border-white/10 pt-6">
                <span className="text-[10px] font-black text-primary tracking-[0.25em]">
                  {f.meta}
                </span>
              </div>
            </article>
          ))}
        </div>

 
        <div className="mt-px border border-t-0 border-white/10 bg-[#080808] px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-xs uppercase font-bold text-gray-500 tracking-[0.2em]">
            Infraestructura IoT de alta disponibilidad • <span className="text-white">98% SLA GLOBAL</span>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {["GPS/GLONASS", "Bluetooth 5.0", "LTE-M / NB-IoT", "IMU 6-Axis"].map((tech) => (
              <span key={tech} className="text-[10px] font-black uppercase text-white/20 tracking-[0.15em] border-b border-primary/30 pb-1">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}