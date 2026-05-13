import Image from "next/image";
import { Button } from "../ui/Button";

export default function Contact() {
  return (
    <section className="bg-black min-h-screen flex flex-col md:flex-row border-t border-white/5">
      
      <div className="md:w-1/2 relative min-h-[600px] overflow-hidden group">
       <Image 
          src="/assets/bike-contact.png" 
          alt="Seguridad BiciSmart"
          fill 
          priority
          className="object-cover grayscale transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-12 md:p-20 space-y-6">
          <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter text-white">
            Únete a la <br /> <span className="text-primary">red</span>
          </h2>
          <p className="max-w-md text-gray-400 text-xs md:text-sm font-medium uppercase leading-relaxed tracking-tight">
            Accede al sistema de protección ciclista más avanzado del mercado. Ingeniería IoT diseñada para quienes no comprometen su seguridad ni la de su vehículo.
          </p>
          
          <div className="flex gap-12 pt-8">
            <div>
              <div className="text-xl font-black italic text-primary">100%</div>
              <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">Rastreo Activo</div>
            </div>
            <div>
              <div className="text-xl font-black italic text-primary">S/ 60</div>
              <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">Instalación Única</div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-[#050505]">
        <div className="max-w-md w-full mx-auto space-y-12">
          <div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Comienza Ahora</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2 text-primary">Configura tu perfil de seguridad</p>
          </div>

          <form className="space-y-8">
             <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-primary tracking-[0.2em]">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="JUAN PÉREZ" 
                  className="w-full bg-black border border-white/10 p-5 text-xs font-bold uppercase outline-none focus:border-primary transition-all text-white placeholder:text-gray-800" 
                />
             </div>

             <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-primary tracking-[0.2em]">Correo Electrónico</label>
                <input 
                  type="email" 
                  placeholder="JUAN@BICISMART.PE" 
                  className="w-full bg-black border border-white/10 p-5 text-xs font-bold uppercase outline-none focus:border-primary transition-all text-white placeholder:text-gray-800" 
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-primary tracking-[0.2em]">Teléfono</label>
                  <input type="text" placeholder="+51 900 000" className="w-full bg-black border border-white/10 p-5 text-xs font-bold uppercase outline-none focus:border-primary text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-primary tracking-[0.2em]">Contraseña</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 p-5 text-xs font-bold outline-none focus:border-primary text-white" />
                </div>
             </div>

             <div className="flex items-start gap-4">
               <input type="checkbox" className="mt-1 accent-primary bg-black border-white/10 w-4 h-4 cursor-pointer" />
               <p className="text-[8px] font-bold text-gray-600 uppercase leading-relaxed">
                 Acepto los <span className="text-white underline cursor-pointer">Términos de Servicio</span> y la <span className="text-white underline cursor-pointer">Política de Privacidad</span> sobre el monitoreo y protección de mi unidad.
               </p>
             </div>

             <Button className="w-full py-8 text-sm italic font-black tracking-widest shadow-[0_0_20px_rgba(50,205,50,0.2)]">
                CREAR CUENTA
             </Button>
          </form>

          <p className="text-center text-[9px] font-black uppercase tracking-widest text-gray-700">
            ¿Ya eres parte de la red? <span className="text-primary cursor-pointer hover:text-white transition-colors">Inicia Sesión</span>
          </p>
        </div>
      </div>
    </section>
  );
}