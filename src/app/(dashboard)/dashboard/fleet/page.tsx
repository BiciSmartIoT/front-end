"use client";
import { useEffect, useState } from 'react';
import { apiFetch } from '../../../../lib/api';
import { Plus, Power, Cpu, Camera, X } from "lucide-react";
import { Button } from '../../../../components/ui/Button';

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedBike, setSelectedBike] = useState<any>(null);
  const [showActivation, setShowActivation] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const data = await apiFetch('/vehicles/own');
      setVehicles(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleOpenActivation = (bike: any) => {
    setSelectedBike(bike);
    setShowActivation(true);
  };

  if (loading) return <div className="p-10 text-primary animate-pulse font-black italic">SYNCING_FLEET...</div>;

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">My <span className="text-primary">Fleet</span></h2>
          <div className="flex items-center gap-4 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
             <span>Hardware Inventory</span>
             <div className="h-[1px] w-12 bg-white/20"></div>
             <span className="text-primary">{vehicles.length} Units Online</span>
          </div>
        </div>
        <Button className="px-8 shadow-lg shadow-primary/20"><Plus size={20} className="mr-2" /> Add Machine</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((bike) => (
          <MachineCard key={bike.id} bike={bike} onActivate={handleOpenActivation} />
        ))}

        {vehicles.length === 0 && (
          <div className="col-span-full border border-dashed border-white/10 h-64 flex flex-col items-center justify-center bg-[#0A0A0A]">
            <Cpu className="text-white/10 mb-4" size={48} />
            <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">No hardware detected</p>
          </div>
        )}
      </div>

      {showActivation && (
        <ActivationModal 
          bike={selectedBike} 
          onClose={() => setShowActivation(false)} 
          onConfirm={(files) => {
            console.log(`Activating ${selectedBike.title} with files:`, files);
            setShowActivation(false);
          }}
        />
      )}
    </div>
  );
}

function MachineCard({ bike, onActivate }: { bike: any, onActivate: (bike: any) => void }) {
  return (
    <div className="group border border-white/5 bg-[#0A0A0A] p-6 hover:border-primary transition-all relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-black italic uppercase text-2xl tracking-tight leading-none group-hover:text-primary transition-colors italic">
          {bike.title}
        </h3>
        <div className={`text-[9px] font-black px-2 py-1 uppercase tracking-[0.2em] ${bike.status === 'AVAILABLE' ? 'bg-primary text-black' : 'bg-zinc-800 text-zinc-500'}`}>
          {bike.status}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter border-b border-white/5 pb-2">
          <span className="text-gray-600 italic">Rate/Hr</span>
          <span className="text-white">${bike.hourlyPrice} USD</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outlined" className="flex-1 text-[10px]">Technical Specs</Button>
        <button 
          onClick={() => onActivate(bike)}
          className={`px-4 py-2 border transition-all ${
            bike.status === 'AVAILABLE' 
            ? 'bg-primary text-black border-primary' 
            : 'bg-zinc-900 text-zinc-500 border-white/5 hover:border-primary/50'
          }`}
        >
          <Power size={16} />
        </button>
      </div>
    </div>
  );
}

function ActivationModal({ bike, onClose, onConfirm }: { bike: any, onClose: () => void, onConfirm: (files: File[]) => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
      <div className="bg-[#050505] border border-white/10 p-8 max-w-lg w-full relative">
        <div className="mb-8">
          <span className="text-primary text-[10px] font-black uppercase tracking-[.4em]">Hardware Verification</span>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mt-2">{bike?.title}</h2>
        </div>

        <div className="space-y-6 text-xs uppercase font-bold tracking-tight text-gray-500">
          <p>Debes subir al menos <span className="text-white">2 fotos reales</span> del estado actual de la máquina para activarla en la red.</p>

          <div className="grid grid-cols-2 gap-4">
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-video bg-zinc-900 border border-white/10 overflow-hidden">
                <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black p-1 text-red-500"><X size={14}/></button>
              </div>
            ))}
            
            {images.length < 4 && (
              <label className="aspect-video border-2 border-dashed border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-white/5 transition-all group">
                <Camera className="text-gray-700 group-hover:text-primary mb-2" size={24} />
                <span className="text-[9px] font-black tracking-widest uppercase">Upload View</span>
                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <Button variant="outlined" className="flex-1 italic" onClick={onClose}>Abort System</Button>
            <Button 
              className="flex-1 italic" 
              disabled={images.length < 2}
              onClick={() => onConfirm(images)}
            >
              Confirm Deployment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}