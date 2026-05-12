// src/app/explore/[id]/rent/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import {  CheckCircle2, Navigation } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

export default function RentPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-[#0A0A0A] border border-white/10 p-10 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle2 size={120} className="text-primary" />
        </div>

        <div className="relative z-10 text-center">
          <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/50">
            <CheckCircle2 size={32} className="text-primary" />
          </div>
          
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
            RESERVATION <span className="text-primary">LOCKED</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
            Unit Reference: {id} — Encryption Active
          </p>

   
          <div className="bg-black border border-white/5 p-8 mb-10 text-left group hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-primary text-[8px] font-black uppercase tracking-[0.4em] mb-2">Meeting Point</p>
                    <p className="text-2xl font-black italic uppercase tracking-tight">AV. LARCO 1245</p>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Miraflores, Sector 4</p>
                </div>
                <div className="bg-zinc-900 p-3 border border-white/5">
                    <Navigation size={20} className="text-white" />
                </div>
            </div>
            
            <div className="h-px bg-white/5 w-full my-4" />
            
            <p className="text-[9px] text-zinc-500 font-bold uppercase leading-relaxed">
                Present your <span className="text-white">QR Code</span> or <span className="text-white">Auth Token</span> to the host upon arrival to release the security clamp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           // En src/app/explore/[id]/rent/page.tsx
<Button 
  onClick={() => router.push("/explore/active-session")} 
  className="py-6 text-[10px] font-black tracking-[0.2em]"
>
  START RIDE / UNLOCK
</Button>
            
            <Button 
              onClick={() => window.open('https://maps.google.com', '_blank')} 
              className="py-6 text-[10px] font-black tracking-[0.2em]"
            >
              OPEN NAVIGATION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}