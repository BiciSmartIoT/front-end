
"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Settings className="text-primary" size={34} />

          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tight">
              Settings
            </h1>

            <p className="text-gray-500 text-xs uppercase mt-2">
              Account preferences and configuration
            </p>
          </div>
        </div>

        <div className="border border-white/10 bg-[#0A0A0A] p-8 space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">
              Full Name
            </label>

            <input
              defaultValue="Maita Levi"
              className="w-full mt-2 bg-black border border-white/10 p-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">
              Email
            </label>

            <input
              defaultValue="teast2@gmail.com"
              className="w-full mt-2 bg-black border border-white/10 p-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">
              Phone
            </label>

            <input
              defaultValue="+51 954 848 803"
              className="w-full mt-2 bg-black border border-white/10 p-4 outline-none focus:border-primary"
            />
          </div>

          <button className="bg-primary text-black px-6 py-4 font-black uppercase text-sm hover:opacity-90 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
