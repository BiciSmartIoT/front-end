"use client";

import { Radio, ShieldAlert, Activity } from "lucide-react";
import { useLang } from "../../context/LangContext";

export default function HistoryFeatures() {
  const { t } = useLang();

  return (
    <section className="bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-16 mb-32 items-start">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary text-[11px] font-black tracking-[0.4em] uppercase">
                {t.historyFeatures.badge}
              </span>
            </div>

            <h2 className="text-7xl md:text-8xl font-black text-white uppercase italic leading-[0.85] tracking-tighter mb-10">
              {t.historyFeatures.title_1} <br />
              <span className="text-primary">{t.historyFeatures.title_2}</span>
            </h2>

            <p className="text-gray-400 text-[16px] leading-relaxed max-w-xl font-light">
              {t.historyFeatures.description}
            </p>
          </div>
          
          <div className="lg:w-1/2 space-y-8 bg-[#080808] p-12 border-l-2 border-primary/50">
            <p className="text-gray-400 text-[15px] leading-loose">
              <strong className="text-gray-200 block mb-2 uppercase tracking-widest text-lg">
                {t.historyFeatures.problem_title}
              </strong>
              {t.historyFeatures.problem_text}
            </p>

            <div className="flex gap-10">
              <div>
                <span className="text-primary font-black text-3xl italic">
                  98%
                </span>
                <p className="text-[10px] text-gray-200 uppercase tracking-tighter mt-1">
                  {t.historyFeatures.uptime}
                </p>
              </div>

              <div>
                <span className="text-primary font-black text-3xl italic">
                  24/7
                </span>
                <p className="text-[10px] text-gray-200 uppercase tracking-tighter mt-1">
                  {t.historyFeatures.monitoring}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-px bg-white/5 border-y border-white/5">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-4 bg-black items-center">
            <div className="md:col-span-1 text-white/10 text-6xl font-black italic">01</div>
            <div className="md:col-span-1 flex justify-center">
              <Radio size={40} className="text-primary" strokeWidth={1} />
            </div>

            <div className="md:col-span-4">
              <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">
                {t.historyFeatures.feature_1_title}
              </h3>
              <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">
                {t.historyFeatures.feature_1_subtitle}
              </span>
            </div>

            <div className="md:col-span-6">
              <p className="text-gray-400 text-[15px] leading-relaxed border-l border-white/10 pl-8">
                {t.historyFeatures.feature_1_text}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-4 bg-black items-center">
            <div className="md:col-span-1 text-white/10 text-6xl font-black italic">02</div>
            <div className="md:col-span-1 flex justify-center">
              <ShieldAlert size={40} className="text-primary" strokeWidth={1} />
            </div>

            <div className="md:col-span-4">
              <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">
                {t.historyFeatures.feature_2_title}
              </h3>
              <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">
                {t.historyFeatures.feature_2_subtitle}
              </span>
            </div>

            <div className="md:col-span-6">
              <p className="text-gray-400 text-[15px] leading-relaxed border-l border-white/10 pl-8">
                {t.historyFeatures.feature_2_text}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-4 bg-black items-center">
            <div className="md:col-span-1 text-white/10 text-6xl font-black italic">03</div>
            <div className="md:col-span-1 flex justify-center">
              <Activity size={40} className="text-primary" strokeWidth={1} />
            </div>

            <div className="md:col-span-4">
              <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">
                {t.historyFeatures.feature_3_title}
              </h3>
              <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">
                {t.historyFeatures.feature_3_subtitle}
              </span>
            </div>

            <div className="md:col-span-6">
              <p className="text-gray-400 text-[15px] leading-relaxed border-l border-white/10 pl-8">
                {t.historyFeatures.feature_3_text}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}