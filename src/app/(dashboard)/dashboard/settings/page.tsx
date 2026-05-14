"use client";

import { User, Mail, Phone, Check } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            Settings
          </h1>
          <p className="text-gray-500 text-[11px] uppercase mt-2 tracking-wider">
            Account preferences and configuration
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Last updated</p>
          <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">12 May 2026</p>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="flex items-center gap-4 px-5 py-4 border border-white/10 bg-[#050505] mb-px">
        <div className="w-12 h-12 bg-primary flex items-center justify-center text-black font-black text-base flex-shrink-0">
          ML
        </div>

        <div>
          <p className="font-black text-[15px] uppercase tracking-tight">Maita Levi</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
            Active member · Since 2024
          </p>
        </div>

        <div className="ml-auto">
          <span className="bg-primary text-black text-[9px] font-black uppercase tracking-widest px-2 py-1">
            Active
          </span>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="border border-white/10 bg-[#050505] p-6">
        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest pb-4 border-b border-white/[0.07] mb-5">
          Personal info
        </p>

        {/* FULL NAME */}
        <div className="mb-5">
          <label className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500 block mb-1.5">
            Full name
          </label>
          <div className="flex items-center border border-white/10 bg-transparent focus-within:border-primary transition">
            <div className="w-11 h-12 flex items-center justify-center text-white/20 border-r border-white/10 flex-shrink-0">
              <User size={15} />
            </div>
            <input
              defaultValue="Maita Levi"
              className="flex-1 bg-transparent outline-none text-sm px-4 h-12 uppercase tracking-wide"
            />
          </div>
        </div>

        {/* EMAIL + PHONE */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500 block mb-1.5">
              Email address
            </label>
            <div className="flex items-center border border-white/10 bg-transparent focus-within:border-primary transition">
              <div className="w-11 h-12 flex items-center justify-center text-white/20 border-r border-white/10 flex-shrink-0">
                <Mail size={15} />
              </div>
              <input
                defaultValue="teast2@gmail.com"
                type="email"
                className="flex-1 bg-transparent outline-none text-sm px-4 h-12"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500 block mb-1.5">
              Phone number
            </label>
            <div className="flex items-center border border-white/10 bg-transparent focus-within:border-primary transition">
              <div className="w-11 h-12 flex items-center justify-center text-white/20 border-r border-white/10 flex-shrink-0">
                <Phone size={15} />
              </div>
              <input
                defaultValue="+51 954 848 803"
                type="tel"
                className="flex-1 bg-transparent outline-none text-sm px-4 h-12"
              />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/[0.07] mb-5" />

        {/* ACTIONS */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-6 h-11 hover:opacity-90 transition">
            <Check size={13} />
            Save changes
          </button>

          <p className="text-[10px] text-white/20 uppercase tracking-wider">
            All fields required
          </p>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="flex items-center justify-between px-5 py-4 border border-red-500/25 mt-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-wider text-red-400">
            Delete account
          </p>
          <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">
            This action cannot be undone
          </p>
        </div>

        <button className="text-[10px] font-black uppercase tracking-wider px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 transition">
          Delete
        </button>
      </div>
    </div>
  );
}