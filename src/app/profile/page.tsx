"use client";

import { useState } from "react";
import { User, Mail, Phone, Shield, MapPin, Camera, Save, HardDrive } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "BRUNO BIKES SAC",
    email: "bruno@bikelab.com",
    phone: "+51 900 800 700",
    role: "PROVIDER",
    status: "APPROVED",
    joined: "MAY 2026",
    location: "Lima, Peru"
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 bg-black min-h-screen text-white">      <header className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            User <span className="text-primary">Profile</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
            Account Management & Security
          </p>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-gray-500 uppercase">Status</span>
            <span className="text-xs font-bold text-primary flex items-center gap-1 italic">
               <Shield size={12} /> {user.status}
            </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="space-y-6">
          <div className="relative group w-full aspect-square bg-[#0A0A0A] border border-white/5 flex items-center justify-center overflow-hidden">
            <User size={80} className="text-zinc-800 group-hover:text-primary transition-colors" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20">
                <div className="h-full bg-primary w-1/3 shadow-[0_0_10px_#ccff00]" />
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 p-4 space-y-4">
             <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Member Since</p>
                <p className="text-sm font-bold italic">{user.joined}</p>
             </div>
             <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Account Type</p>
                <p className="text-sm font-bold text-primary italic underline underline-offset-4">{user.role}</p>
             </div>
          </div>
        </div>

  
        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput label="Full Name / Entity" value={user.name} icon={<User size={14}/>} />
            <ProfileInput label="Email Address" value={user.email} icon={<Mail size={14}/>} />
            <ProfileInput label="Phone Number" value={user.phone} icon={<Phone size={14}/>} />
            <ProfileInput label="Primary Location" value={user.location} icon={<MapPin size={14}/>} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 border-l-2 border-primary pl-3">
                Security & Storage
            </h3>
            <div className="bg-[#0A0A0A] border border-white/5 p-6 flex justify-between items-center group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                    <HardDrive className="text-gray-500 group-hover:text-primary" />
                    <div>
                        <p className="text-xs font-bold uppercase tracking-tight">Cloud Data Sync</p>
                        <p className="text-[10px] text-gray-600 font-bold uppercase">Last backup: 10m ago</p>
                    </div>
                </div>
                <div className="h-2 w-24 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]" />
                </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
             <Button variant="outlined" className="px-10 text-[10px] tracking-widest uppercase">
                Cancel
             </Button>
             <Button onClick={handleSave} disabled={loading} className="px-12 text-[10px] tracking-widest uppercase flex items-center gap-2">
                {loading ? "PROCESSING..." : <><Save size={14} /> Update Profile</>}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileInput({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[9px] font-black uppercase text-gray-500 tracking-tighter flex items-center gap-2">
        {icon} {label}
      </label>
      <input 
        defaultValue={value}
        className="w-full bg-black border border-white/10 p-4 text-xs font-bold uppercase outline-none focus:border-primary transition-all text-zinc-300 focus:text-white"
      />
    </div>
  );
}