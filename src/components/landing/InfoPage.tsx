"use client";

import { useLang } from "../../context/LangContext";

export default function InfoPage() {
  const { t } = useLang();

  return (
    <section className="bg-black">

      <div className="relative h-[500px] flex items-center justify-center mt-20 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPTKQadZFYn4lODfrng5rUknglSEtRDeOMYN3cPserjVRATiACfjb6_IjUmU5qBcyzSgVdywMQJMA2TcMkTBBfnu8rMC2nqszFq5zand2d8xSm-CqdIv5PYdffeXqQpClcPuLvJJd7qrGqcOUG8JhOu4XAFK8fdIoO7Z74bc1mRXl0HytfHMCVbr-s9gN9WO1f8Eo6HHVtGjBcbbXt8xzJTVDoRZyIFwRpeTO7Qbo5rg3yTFod9OOM7XcBzNfj3FAFWeEeIelnDvVe')] bg-cover bg-center opacity-20 grayscale" />
        
        <div className="relative z-10 text-center px-6">
          <h3 className="text-primary font-black italic text-sm tracking-[0.5em] mb-12 uppercase">
            {t.infoPage.badge}
          </h3>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            <div className="text-center">
              <p className="text-6xl font-black italic text-white">
                 98%
              </p>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest italic">
                {t.infoPage.stat_1}
              </p>
            </div>

            <div className="text-center">
              <p className="text-6xl font-black italic text-white">
              S/ 60
              </p>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest italic">
                {t.infoPage.stat_2}
              </p>
            </div>

            <div className="text-center">
              <p className="text-6xl font-black italic text-white">
                0
              </p>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest italic">
                {t.infoPage.stat_3}
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-32 px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        <div>
          <h2 className="text-5xl font-black italic uppercase text-white mb-8 leading-none">
            {t.infoPage.mission_1}{" "}
            <span className="text-primary">{t.infoPage.mission_2}</span>
          </h2>

          <p className="text-gray-400 text-[15px] leading-loose italic">
            {t.infoPage.mission_text}
          </p>
        </div>

        <div className="space-y-6">

          <div className="bg-[#080808] p-8 border-l-2 border-primary">
            <h4 className="text-white font-black text-lg uppercase italic mb-2 tracking-widest">
              {t.infoPage.card_1_title}
            </h4>
            <p className="text-gray-500 text-[15px] leading-relaxed italic">
              {t.infoPage.card_1_text}
            </p>
          </div>

          <div className="bg-[#080808] p-8 border-l-2 border-primary">
            <h4 className="text-white font-black text-lg uppercase italic mb-2 tracking-widest">
              {t.infoPage.card_2_title}
            </h4>
            <p className="text-gray-500 text-[15px] leading-relaxed italic">
              {t.infoPage.card_2_text}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}