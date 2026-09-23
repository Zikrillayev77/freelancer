import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    q: "WORKK.UZ orqali qanday qilib ish berish mumkin?",
    a: "Yuqoridagi 'Ish joylashtirish' tugmasini bosing, loyihangiz nomi, tavsifi, byudjeti va muddatini kiriting. E'loningiz darhol minglab malakali frilanserlarga ko'rinadi.",
  },
  {
    q: "Xavfsiz bitim (Escrow) tizimi qanday ishlaydi?",
    a: "Buyurtmachi to'lovni platformada muzlatib qo'yadi. Frilanser ishni to'liq bajarib, buyurtmachi tasdiqlaganidan keyingina mablag' frilanser hisobiga o'tkaziladi. Bu ikki tomon uchun 100% kafolat demakdir.",
  },
  {
    q: "Frilanser sifatida qanday qilib pul ishlash mumkin?",
    a: "'Loyihalar' bo'limiga o'ting, o'z sohangizga mos loyihani tanlang va taklif (ariza) qoldiring. Mijoz sizning portfoliongizni ko'rib, ishni sizga topshirishi mumkin.",
  },
  {
    q: "E'lon joylashtirish bepulmi?",
    a: "Ha, dastlabki standart loyihalarni joylashtirish mutlaqo bepul. Hech qanday yashirin to'lovlar yo'q.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="w-full mt-24 text-left max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Ko'p beriladigan savollar</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Savollaringiz bormi? Javoblarimiz tayyor
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Platformadan foydalanish, to'lovlar va xavfsizlik haqida eng muhim ma'lumotlar
        </p>
      </div>

      <div className="space-y-3">
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-500" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
