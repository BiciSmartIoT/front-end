"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function FaqPage() {
  const [active, setActive] = useState<number | null>(null);

  const faqs = [
    { q: "¿Por qué hay un costo de instalación?", a: "El hardware BiciSmart es un microcontrolador de grado industrial. Los S/ 60 cubren el dispositivo, la configuración de los sensores de movimiento y la instalación física discreta por nuestros técnicos." },
    { q: "¿Qué tecnología de red utilizan?", a: "Utilizamos protocolos de área amplia (LTE-M / NB-IoT) combinados con Bluetooth Low Energy para garantizar que nunca pierdas la conexión, incluso en zonas con baja cobertura celular." },
    { q: "¿Cómo funciona el envío de señal SOS?", a: "El dispositivo integra un acelerómetro y giroscopio. Al detectar una desaceleración violenta o impacto seguido de inmovilidad, envía automáticamente tu ubicación GPS a tus contactos configurados." },
    { q: "¿Es compatible con cualquier bicicleta?", a: "Sí. El diseño es universal y se fija de forma segura y discreta en el cuadro, sin importar el material o modelo de la unidad." }
  ];

  return (
    <section className="bg-black py-32 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-lg font-black uppercase italic tracking-[0.4em] text-white mb-20">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-white/5">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className="text-[12px] font-black uppercase italic tracking-widest text-white group-hover:text-primary transition-colors">{f.q}</span>
                <Plus size={16} className={`text-primary transition-transform ${active === i ? 'rotate-45' : ''}`} />
              </button>
              {active === i && (
                <div className="px-8 pb-8 text-gray-500 text-[15px] leading-loose italic border-t border-white/5 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}