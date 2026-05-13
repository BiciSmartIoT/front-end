export default function InfoPage() {
  return (
    <section className="bg-black">

      <div className="relative h-[500px] flex items-center justify-center mt-20 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPTKQadZFYn4lODfrng5rUknglSEtRDeOMYN3cPserjVRATiACfjb6_IjUmU5qBcyzSgVdywMQJMA2TcMkTBBfnu8rMC2nqszFq5zand2d8xSm-CqdIv5PYdffeXqQpClcPuLvJJd7qrGqcOUG8JhOu4XAFK8fdIoO7Z74bc1mRXl0HytfHMCVbr-s9gN9WO1f8Eo6HHVtGjBcbbXt8xzJTVDoRZyIFwRpeTO7Qbo5rg3yTFod9OOM7XcBzNfj3FAFWeEeIelnDvVe')] bg-cover bg-center opacity-20 grayscale" />
        <div className="relative z-10 text-center px-6">
          <h3 className="text-primary font-black italic text-sm tracking-[0.5em] mb-12 uppercase">Precision Meets Safety</h3>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="text-center">
              <p className="text-6xl font-black italic text-white">98%</p>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest italic">SLA de Conexión</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-black italic text-white">S/ 60</p>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest italic">Costo Instalación</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-black italic text-white">0</p>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest italic">Falsas Alertas</p>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-5xl mx-auto py-32 px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-black italic uppercase text-white mb-8 leading-none">Nuestra <span className="text-primary">Misión</span></h2>
          <p className="text-gray-400 text-sm leading-loose italic">
            Observamos que los usuarios urbanos enfrentan altos niveles de inseguridad. Los sistemas de resguardo tradicionales son pasivos. BiciSmart IoT nace para ofrecer un sistema inteligente, accesible y discreto que permite rastrear bicicletas 24/7 y alertar en situaciones de riesgo.
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-[#080808] p-8 border-l-2 border-primary">
            <h4 className="text-white font-black text-xs uppercase italic mb-2 tracking-widest">Antirrobo Activo</h4>
            <p className="text-gray-500 text-[11px] leading-relaxed italic">Notificaciones push instantáneas cada vez que el microcontrolador detecta un movimiento irregular.</p>
          </div>
          <div className="bg-[#080808] p-8 border-l-2 border-primary">
            <h4 className="text-white font-black text-xs uppercase italic mb-2 tracking-widest">Diseño Integrado</h4>
            <p className="text-gray-500 text-[11px] leading-relaxed italic">Hardware reducido con batería prolongada que se adhiere naturalmente a la geometría de la bicicleta.</p>
          </div>
        </div>
      </div>
    </section>
  );
}