"use client";

import { useLang } from "../../context/LangContext";

export default function Footer() {
  const { lang, setLang, t } = useLang();

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        
        <div className="flex flex-col gap-4 items-center md:items-start">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest max-w-[220px] text-center md:text-left leading-relaxed">
            {t.footer.copy}
          </p>
        </div>

        <div className="flex gap-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">
          <a href="#" className="hover:text-primary transition">
            {t.footer.privacy}
          </a>

          <a href="#" className="hover:text-primary transition">
            {t.footer.terms}
          </a>

          <a href="#" className="hover:text-primary transition">
            {t.footer.fleet}
          </a>

          <a href="#" className="hover:text-primary transition">
            {t.footer.contact}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">
            {t.footer.lang}
          </span>

          <div className="flex items-center border border-white/10">
            <button
              onClick={() => setLang("es")}
              className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest transition ${
                lang === "es"
                  ? "bg-primary text-black"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              ES
            </button>

            <div className="w-px h-4 bg-white/10" />

            <button
              onClick={() => setLang("en")}
              className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest transition ${
                lang === "en"
                  ? "bg-primary text-black"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}