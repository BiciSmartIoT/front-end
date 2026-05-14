"use client";

import { useEffect, useState } from "react";
import { Plus, Power, Cpu, Camera, X, MapPin } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { VehicleService, Vehicle } from "../../../../services/vehicle-service";

const mockBikeImages = [
  "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1200&auto=format&fit=crop",
];

const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: "bg-primary text-black",
  IN_USE: "border border-yellow-400/60 text-yellow-400",
  OFFLINE: "border border-white/20 text-white/30",
};

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Vehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState({
    title: "",
    description: "",
    hourlyPrice: 0,
    latitude: -12.0464,
    longitude: -77.0428,
  });

  const fetchVehicles = async () => {
    try {
      const data = await VehicleService.getOwnFleet();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await VehicleService.createVehicle(newVehicle);
      setShowRegister(false);
      setNewVehicle({ title: "", description: "", hourlyPrice: 0, latitude: -12.0464, longitude: -77.0428 });
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Error creating vehicle");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-white">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">
            Loading fleet...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">

      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            My <span className="text-primary">Fleet</span>
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            {vehicles.length} units registered
          </p>
        </div>

        <Button className="px-6 h-11 text-[10px] tracking-[0.15em]" onClick={() => setShowRegister(true)}>
          <Plus size={13} className="mr-2" />
          Add Machine
        </Button>
      </div>


      <div className="grid grid-cols-3 gap-px bg-white/10 mb-8">
        <div className="bg-[#0a0a0a] px-5 py-4">
          <p className="text-xl font-black">{vehicles.length}</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Total units</p>
        </div>
        <div className="bg-[#0a0a0a] px-5 py-4">
          <p className="text-xl font-black text-primary">
            {vehicles.filter((v) => v.status === "AVAILABLE").length}
          </p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Available</p>
        </div>
        <div className="bg-[#0a0a0a] px-5 py-4">
          <p className="text-xl font-black text-yellow-400">
            {vehicles.filter((v) => v.status === "IN_SERVICE").length}
          </p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">In use</p>
        </div>
      </div>

  
      {vehicles.length === 0 ? (
        <div className="border border-dashed border-white/10 py-20 flex flex-col items-center gap-4">
          <Cpu size={32} className="text-white/10" />
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-600">
            No vehicles detected
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition mt-2"
          >
            Register first unit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((bike, index) => (
            <div key={bike.id} className="border border-white/10 bg-[#0a0a0a] hover:border-white/20 transition group">
       
              <div className="relative overflow-hidden" style={{ height: "180px" }}>
                <img
                  src={mockBikeImages[index % mockBikeImages.length]}
                  alt={bike.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 ${
                      STATUS_STYLES[bike.status] ?? "border border-white/20 text-white/30"
                    }`}
                  >
                    {bike.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black text-[15px] uppercase tracking-tight leading-tight">
                    {bike.title}
                  </h3>
                  <span className="font-black text-primary text-sm whitespace-nowrap ml-3">
                    ${bike.hourlyPrice}/h
                  </span>
                </div>

                <p className="text-gray-500 text-[11px] mb-4 leading-relaxed line-clamp-2">
                  {bike.description}
                </p>

                <div className="flex items-center gap-1.5 mb-5">
                  <MapPin size={11} className="text-gray-600 flex-shrink-0" />
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                    Lima Centro
                  </span>
                  <span className="text-[9px] text-white/15 font-mono ml-1">
                    {bike.latitude.toFixed(3)}, {bike.longitude.toFixed(3)}
                  </span>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[9px] text-gray-600 uppercase tracking-widest font-black">
                    Unit #{String(index + 1).padStart(3, "0")}
                  </span>
                  <button
                    onClick={() => { setSelectedBike(bike); setShowActivation(true); }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider border border-white/10 px-3 py-2 hover:border-primary hover:text-primary transition"
                  >
                    <Power size={12} />
                    Activate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex justify-center overflow-y-auto pt-20 pb-10">
          <div className="bg-[#050505] border border-white/10 p-10 max-w-xl w-full h-fit relative my-auto">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black italic uppercase">
                Add <span className="text-primary">Machine</span>
              </h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.25em] mt-2">
                System Deployment Protocol
              </p>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-5">
              <div>
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-1.5">
                  Unit Designation
                </label>
                <input
                  required
                  placeholder="E.G. VECTOR-X1"
                  className="w-full bg-transparent border border-white/10 px-4 h-12 text-sm font-mono uppercase outline-none focus:border-primary transition placeholder:text-zinc-800"
                  onChange={(e) => setNewVehicle({ ...newVehicle, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-1.5">
                  Hardware Specs / Description
                </label>
                <textarea
                  placeholder="Initialize description..."
                  className="w-full bg-transparent border border-white/10 px-4 py-3 h-24 text-sm outline-none focus:border-primary transition placeholder:text-zinc-800 resize-none"
                  onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-1.5">
                  Hourly Rate (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-transparent border border-white/10 px-4 h-12 text-sm font-mono outline-none focus:border-primary transition"
                  onChange={(e) => setNewVehicle({ ...newVehicle, hourlyPrice: Number(e.target.value) })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-1.5">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="-12.0464"
                    className="w-full bg-transparent border border-white/10 px-4 h-12 text-sm font-mono outline-none focus:border-primary transition"
                    onChange={(e) => setNewVehicle({ ...newVehicle, latitude: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-1.5">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="-77.0428"
                    className="w-full bg-transparent border border-white/10 px-4 h-12 text-sm font-mono outline-none focus:border-primary transition"
                    onChange={(e) => setNewVehicle({ ...newVehicle, longitude: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="flex-1 border border-white/10 h-12 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <Button type="submit" className="flex-[2] h-12 text-[10px] tracking-[0.2em]">
                  Deploy Unit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showActivation && selectedBike && (
        <ActivationModal bike={selectedBike} onClose={() => setShowActivation(false)} />
      )}
    </div>
  );
}

function ActivationModal({ bike, onClose }: { bike: Vehicle; onClose: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const handleActivate = async () => {
    if (images.length < 2) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("vehicleId", String(bike.id));
      images.forEach((img) => formData.append("images", img));
      await fetch("http://localhost:8080/api/vehicles/activate", { method: "POST", body: formData });
      alert("Vehicle activated");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Activation failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#050505] border border-white/10 p-8 max-w-lg w-full">

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black italic uppercase">
              Activate <span className="text-primary">{bike.title}</span>
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
              Photo verification required
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition mt-1">
            <X size={18} />
          </button>
        </div>

 
        <label className="flex flex-col items-center justify-center border border-dashed border-white/15 hover:border-primary/50 transition cursor-pointer py-8 mb-4">
          <Camera size={20} className="text-white/20 mb-3" />
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">
            Upload Photos
          </span>
          <span className="text-[10px] text-gray-700 uppercase tracking-wider mt-1">
            Click or drag &amp; drop
          </span>
          <input type="file" multiple className="hidden" accept="image/*" onChange={handleFiles} />
        </label>


        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] text-gray-600 uppercase tracking-wider">
            {images.length} / 2+ photos selected
          </span>
          {images.length < 2 && (
            <span className="text-[10px] text-yellow-500/70 uppercase tracking-wider font-black">
              Min. 2 required
            </span>
          )}
          {images.length >= 2 && (
            <span className="text-[10px] text-primary uppercase tracking-wider font-black">
              ✓ Ready to activate
            </span>
          )}
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-6">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-full h-24 object-cover border border-white/10"
              />
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-white/10 h-11 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition"
          >
            Cancel
          </button>
          <Button
            className="flex-1 h-11 text-[10px] tracking-[0.2em]"
            disabled={images.length < 2 || uploading}
            onClick={handleActivate}
          >
            {uploading ? "Uploading..." : "Activate"}
          </Button>
        </div>
      </div>
    </div>
  );
}