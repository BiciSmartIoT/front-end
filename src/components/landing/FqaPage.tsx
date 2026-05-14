"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
export default function FaqPage() {
  const [active, setActive] = useState<number | null>(null);
  const { t } = useLang();

  const faqs = t.faq.items;

  return (
    <section className="bg-black py-32 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-lg font-black uppercase italic tracking-[0.4em] text-white mb-20">
          {t.faq.title_1}{" "}
          <span className="text-primary">{t.faq.title_2}</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-white/5">
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className="text-[12px] font-black uppercase italic tracking-widest text-white group-hover:text-primary transition-colors">
                  {f.q}
                </span>

                <Plus
                  size={16}
                  className={`text-primary transition-transform ${
                    active === i ? "rotate-45" : ""
                  }`}
                />
              </button>

              {active === i && (
                <div className="px-8 pb-8 text-gray-500 text-[15px] leading-loose italic border-t border-white/5 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}