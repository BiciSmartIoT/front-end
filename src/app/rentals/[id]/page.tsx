import { Button } from "../../../components/ui/Button";
import { Cpu, Weight, Disc, Calendar, ChevronDown } from "lucide-react";

export default function RentalDetailPage() {
  return (
    <main className="bg-black min-h-screen text-white pb-20">
 
      <div className="max-w-7xl mx-auto px-6 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        
        <div className="space-y-4">
          <div className="bg-[#0A0A0A] border border-white/5 aspect-video flex items-center justify-center relative group">
            <img src="/bike-main.png" alt="Specialized Tarmac" className="w-4/5 object-contain" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 aspect-square flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={`/bike-thumb-${i}.png`} alt="thumbnail" className="w-3/4 object-contain" />
              </div>
            ))}
          </div>
        </div>

   
        <div className="space-y-8">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="bg-[#1A1A1A] text-[9px] font-black px-2 py-1 uppercase">Road Performance</span>
              <span className="bg-primary text-black text-[9px] font-black px-2 py-1 uppercase">Available</span>
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Specialized Tarmac SL7</h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              One bike to rule them all. Engineered for the win, combining aerodynamics with lightweight performance.
            </p>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 p-8 space-y-6">
            <h3 className="text-primary text-[10px] font-black uppercase tracking-widest">Technical Specifications</h3>
            <SpecRow icon={<Cpu size={16}/>} label="Frame Material" value="FACT 10r Carbon" />
            <SpecRow icon={<Weight size={16}/>} label="Weight" value="6.8 kg (Size 56)" />
            <SpecRow icon={<Disc size={16}/>} label="Groupset" value="SRAM Rival eTap AXS" />
          </div>

   
          <div className="border border-primary p-8 bg-[#050505] space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-gray-500 text-[10px] font-bold uppercase">Rental Price</span>
                <div className="text-3xl font-black italic">$120 <span className="text-sm text-gray-500">/ day</span></div>
              </div>
              <span className="border border-primary text-primary text-[8px] font-black px-2 py-1 uppercase">Best Value</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-400">Select Pickup Date</label>
                <div className="relative flex items-center">
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-black border border-white/10 p-4 text-xs font-bold outline-none" />
                  <Calendar size={14} className="absolute right-4 text-gray-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-400">Duration</label>
                <div className="relative flex items-center">
                  <select className="w-full bg-black border border-white/10 p-4 text-xs font-bold outline-none appearance-none uppercase">
                    <option>1 Day</option>
                    <option>3 Days</option>
                    <option>1 Week</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 text-gray-600" />
                </div>
              </div>
            </div>

            <Button className="w-full py-8 text-sm italic font-black">CONFIRM RESERVATION</Button>
            <p className="text-center text-[9px] text-gray-600 font-bold uppercase">Security deposit of $500 required upon pickup.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-gray-400">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
      </div>
      <span className="text-xs font-bold uppercase text-white/80">{value}</span>
    </div>
  );
}