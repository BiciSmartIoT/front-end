"use client";

import { Search, MapPin, Calendar, Bike, Mountain, Zap } from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useLang } from "../../context/LangContext";

const POPULAR_CITIES = ["Madrid", "Barcelona", "Miami", "Berlin", "London"];

export default function Hero() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const { t } = useLang();

  return (
    <section className="relative min-h-screen w-full -mt-4 flex flex-col justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
        <img
          src="assets/homepage/home1.png"
          alt="Biker on asphalt"
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-6">
        <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4 block animate-pulse">
          {t.hero.badge}
        </span>

        <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter mb-12 drop-shadow-2xl">
          {t.hero.title_1} <br />
          <span className="text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.5)]">
            {t.hero.title_2}
          </span>
        </h1>

        <div className="w-full max-w-5xl bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-2 flex flex-col md:flex-row items-center gap-2 mb-10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)]">
          
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-r border-white/5 focus-within:bg-white/5 transition-colors">
            <MapPin size={20} className="text-primary" />
            <div className="flex flex-col flex-1">
              <span className="text-[9px] uppercase font-bold text-gray-500">
                {t.hero.location_label}
              </span>
              <input
                list="cities"
                type="text"
                placeholder={t.hero.location_placeholder}
                className="bg-transparent text-sm outline-none uppercase font-black text-white placeholder:text-gray-800"
              />
              <datalist id="cities">
                {POPULAR_CITIES.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-r border-white/5">
            <Calendar size={20} className="text-primary" />
            <div className="flex flex-col flex-1">
              <span className="text-[9px] uppercase font-bold text-gray-500">
                {t.hero.start_date}
              </span>
              <input
                type="date"
                min={today}
                className="bg-transparent text-sm outline-none uppercase font-black text-white [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 md:border-r border-white/5">
            <Calendar size={20} className="text-primary" />
            <div className="flex flex-col flex-1">
              <span className="text-[9px] uppercase font-bold text-gray-500">
                {t.hero.end_date}
              </span>
              <input
                type="date"
                min={today}
                className="bg-transparent text-sm outline-none uppercase font-black text-white [color-scheme:dark]"
              />
            </div>
          </div>

          <Button
            onClick={() => router.push("/explore")}
            className="w-full md:w-auto py-8 px-12 group bg-primary hover:bg-white text-black transition-all duration-300"
          >
            <span className="font-black italic tracking-tighter text-lg">
              {t.hero.cta}
            </span>

            <Search
              size={20}
              className="ml-3 group-hover:rotate-12 transition-transform"
            />
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <CategoryButton icon={<Bike size={18} />} label={t.hero.cat_road} />
          <CategoryButton icon={<Mountain size={18} />} label={t.hero.cat_mtb} />
          <CategoryButton icon={<Zap size={18} />} label={t.hero.cat_electric} />
        </div>
      </div>
    </section>
  );
}

function CategoryButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 bg-[#0D0D0D] border border-white/5 px-8 py-4 hover:border-primary/50 hover:bg-zinc-900 transition-all group shadow-2xl">
      <span className="text-gray-500 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
        {icon}
      </span>
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white">
        {label}
      </span>
    </button>
  );
}