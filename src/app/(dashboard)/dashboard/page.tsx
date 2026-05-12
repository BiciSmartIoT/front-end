"use client";
import { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';
import { Zap, Plus, Settings2, Power, DollarSign } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface Vehicle {
  id: string;
  title: string;
  status: string;
  hourlyPrice: number;
  description: string;
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    title: '',
    description: '',
    hourlyPrice: 0,
    latitude: -12.046374,
    longitude: -77.042793
  });

  const fetchVehicles = () => {
    setLoading(true);
    apiFetch('/vehicles/own')
      .then(data => setVehicles(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/vehicles', {
        method: 'POST',
        body: JSON.stringify(newVehicle),
      });
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      alert("Error al registrar máquina");
    }
  };

  if (loading && vehicles.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Zap className="animate-pulse text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* HEADER TÉCNICO */}
      <header className="max-w-7xl mx-auto flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Machine <span className="text-primary">Fleet</span>
          </h1>
          <p className="text-gray-500 uppercase text-[10px] font-black tracking-[0.3em] mt-2">
            Active Units: {vehicles.length}
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex gap-2 items-center">
          <Plus size={18} /> Register Machine
        </Button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((bike) => (
          <div key={bike.id} className="group border border-white/5 bg-[#0A0A0A] p-6 hover:border-primary transition-all relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-black italic uppercase text-xl tracking-tight leading-none">
                {bike.title}
              </h3>
              <div className={`text-[10px] font-black px-2 py-1 uppercase tracking-widest ${bike.status === 'AVAILABLE' ? 'bg-primary text-black' : 'bg-red-600 text-white'}`}>
                {bike.status}
              </div>
            </div>

            <p className="text-gray-500 text-xs uppercase mb-6 line-clamp-2 leading-relaxed">
              {bike.description || "No technical specs provided."}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-600 uppercase font-black tracking-tighter">Hourly Revenue</span>
                <span className="text-2xl font-black text-white">${bike.hourlyPrice}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-white border border-white/5 hover:border-white/20 transition-all">
                  <Settings2 size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 border border-white/5 hover:border-red-500/20 transition-all">
                  <Power size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0A0A] border border-white/10 p-10 max-w-md w-full shadow-2xl shadow-primary/10">
            <h2 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">New Machine</h2>
            <p className="text-gray-500 uppercase text-[10px] font-black tracking-[0.3em] mb-8">Deploy unit to the grid</p>
            
            <form onSubmit={handleAddVehicle} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Model Title</label>
                <input 
                  required
                  className="w-full bg-black border border-white/10 p-3 text-sm focus:border-primary outline-none transition-all uppercase placeholder:text-gray-800"
                  placeholder="TREK FUEL EX 9.8"
                  onChange={(e) => setNewVehicle({...newVehicle, title: e.target.value.toUpperCase()})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Specifications</label>
                <textarea 
                  className="w-full bg-black border border-white/10 p-3 text-sm focus:border-primary outline-none h-24 transition-all"
                  placeholder="Carbon frame, FOX suspension..."
                  onChange={(e) => setNewVehicle({...newVehicle, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Rate (USD / HOUR)</label>
                <div className="relative">
                  <input 
                    type="number"
                    className="w-full bg-black border border-white/10 p-3 pl-8 text-sm focus:border-primary outline-none"
                    onChange={(e) => setNewVehicle({...newVehicle, hourlyPrice: parseFloat(e.target.value)})}
                  />
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outlined" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1">Deploy</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}