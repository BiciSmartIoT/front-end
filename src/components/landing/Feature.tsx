import { Radio, ShieldAlert, Activity, ChevronRight } from "lucide-react";

export default function HistoryFeatures() {
  return (
    <section className="bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-16 mb-32 items-start">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary text-[11px] font-black tracking-[0.4em] uppercase">
                Génesis del Proyecto
              </span>
            </div>
            <h2 className="text-7xl md:text-8xl font-black text-white uppercase italic leading-[0.85] tracking-tighter mb-10">
              BiciSmart <br /> 
              <span className="text-primary">IoT</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light">
              Nacimos de una realidad cruda: el incremento de robos sigilosos y la falta de auxilio en accidentes aislados. Entendimos que los candados tradicionales son sistemas pasivos y vulnerables que no ofrecen tranquilidad real.
            </p>
          </div>
          
          <div className="lg:w-1/2 space-y-8 bg-[#080808] p-12 border-l-2 border-primary/50">
            <p className="text-gray-300 text-sm leading-loose">
              <strong className="text-white block mb-2 uppercase tracking-widest text-xs">La Problemática</strong>
              Identificamos que los usuarios urbanos y equipos de emergencia carecen de alertas inmediatas. El robo ocurre en segundos, pero la respuesta suele tardar horas. BiciSmart IoT rompe este ciclo transformando la bicicleta en un nodo inteligente capaz de defenderse y pedir ayuda por sí mismo.
            </p>
            <div className="flex gap-10">
              <div>
                <span className="text-primary font-black text-3xl italic">98%</span>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">Uptime de Red</p>
              </div>
              <div>
                <span className="text-primary font-black text-3xl italic">24/7</span>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">Monitoreo Activo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-px bg-white/5 border-y border-white/5">
        
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-4 bg-black items-center">
            <div className="md:col-span-1 text-white/10 text-6xl font-black italic">01</div>
            <div className="md:col-span-1 flex justify-center">
              <Radio size={40} className="text-primary" strokeWidth={1} />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Rastreo Omnipresente</h3>
              <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Tecnología GPS + SIM</span>
            </div>
            <div className="md:col-span-6">
              <p className="text-gray-500 text-sm leading-relaxed border-l border-white/10 pl-8">
                Implementamos un sistema de localización en tiempo real con geofencing dinámico. Si tu bicicleta sale del radio permitido, el microcontrolador activa una alerta crítica directamente en tu smartphone.
              </p>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-4 bg-black items-center">
            <div className="md:col-span-1 text-white/10 text-6xl font-black italic">02</div>
            <div className="md:col-span-1 flex justify-center">
              <ShieldAlert size={40} className="text-primary" strokeWidth={1} />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Protección de Vida</h3>
              <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Módulo SOS Analítico</span>
            </div>
            <div className="md:col-span-6">
              <p className="text-gray-500 text-sm leading-relaxed border-l border-white/10 pl-8">
                Utilizando acelerómetros de precisión, detectamos caídas o colisiones repentinas. Ante un incidente, el sistema envía tu ubicación exacta a contactos de emergencia sin intervención manual.
              </p>
            </div>
          </div>

      
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-4 bg-black items-center">
            <div className="md:col-span-1 text-white/10 text-6xl font-black italic">03</div>
            <div className="md:col-span-1 flex justify-center">
              <Activity size={40} className="text-primary" strokeWidth={1} />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Ecosistema Discreto</h3>
              <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Diseño Integrado</span>
            </div>
            <div className="md:col-span-6">
              <p className="text-gray-500 text-sm leading-relaxed border-l border-white/10 pl-8">
                El hardware de BiciSmart IoT es pequeño y energéticamente eficiente (NB-IoT), diseñado para ser imperceptible a la vista del ladrón y resistente a las condiciones climáticas más duras.
              </p>
            </div>
          </div>
        </div>

      
      </div>
    </section>
  );
}