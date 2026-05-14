"use client";
import { Battery, Zap, Map, Lock, AlertTriangle } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { useState, useEffect } from "react";
import { BillSummary } from "./BillSummary"; // Importamos el nuevo componente

export default function ActiveSessionPage() {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isPaused, setIsPaused] = useState(false);
  const [showBill, setShowBill] = useState(false);

  useEffect(() => {
    let timer: any;
    if (!isPaused && !showBill) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, showBill]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Si el usuario termina, renderizamos la Pre-Boleta
  if (showBill) {
    return <BillSummary timeLeft={timeLeft} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Session <span className={isPaused ? "text-orange-500" : "text-primary"}>{isPaused ? "Paused" : "Active"}</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Unit: Carbon-X Node 01 | ID: #M1-992</p>
          </div>
          <div className="text-right">
            <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1 text-zinc-400">Time Remaining</p>
            <p className={`text-4xl font-mono font-black ${isPaused ? "text-orange-500 animate-pulse" : "text-white"}`}>
                {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        {/* Telemetría (Igual a tu diseño original) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TelemetryCard label="Battery Level" value="84%" icon={<Battery className={isPaused ? "text-orange-500" : "text-primary"} size={20} />} subValue="Est. 42km left" />
          <TelemetryCard label="Current Speed" value={isPaused ? "0" : "24"} unit="km/h" icon={<Zap className={isPaused ? "text-orange-500" : "text-primary"} size={20} />} subValue={isPaused ? "Locked" : "Eco Mode"} />
          <TelemetryCard label="Range Radius" value="5.2" unit="km" icon={<Map className={isPaused ? "text-orange-500" : "text-primary"} size={20} />} subValue="Safe Zone" />
        </div>

        {/* Mapa Mock */}
        <div className="bg-[#0A0A0A] border border-white/10 h-64 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/d/u/0/thumbnail?mid=1_vN_Jv6XyU-8q3A')] bg-cover bg-center" />
            <div className="relative z-10 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full mb-2 ${isPaused ? "bg-orange-500" : "bg-primary animate-ping"}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest bg-black/80 px-3 py-1 border ${isPaused ? "border-orange-500 text-orange-500" : "border-primary/50 text-primary"}`}>
                  {isPaused ? "GPS Locked" : "Live GPS Tracking"}
                </span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setIsPaused(!isPaused)} variant="outlined" className={`py-8 flex flex-col gap-2 border-white/10 ${isPaused ? "border-orange-500 text-orange-500" : ""}`}>
            <Lock size={20} />
            <span className="text-[9px] font-black uppercase">{isPaused ? "Resume Session" : "Pause Session"}</span>
          </Button>
          
          <Button onClick={() => setShowBill(true)} className="py-8 flex flex-col gap-2 bg-red-600/10 border border-red-600/50 hover:bg-red-600 text-red-500 hover:text-white">
            <AlertTriangle size={20} />
            <span className="text-[9px] font-black uppercase">Terminate</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function TelemetryCard({ label, value, unit, icon, subValue }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-6 flex flex-col justify-between hover:border-primary/20 transition-all">
      <div className="flex justify-between items-start mb-4 text-zinc-500 uppercase tracking-widest text-[8px] font-black">
        <span>{label}</span> {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black italic">{value}</span>
          {unit && <span className="text-xs font-bold text-zinc-500 uppercase">{unit}</span>}
        </div>
        <p className="text-[9px] font-bold text-primary/70 uppercase mt-1 tracking-wider">{subValue}</p>
      </div>
    </div>
  );
}