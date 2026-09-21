import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-500 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
      </Link>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Foydalanish shartlari
          </h1>
        </div>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            1. Ushbu platforma (WORKK.UZ) buyurtmachilar va frilanserlarni
            o'zaro bog'lash uchun mo'ljallangan.
          </p>
          <p>
            2. Ro'yxatdan o'tish vaqtida kiritilgan ma'lumotlarning to'g'riligi
            uchun foydalanuvchi o'zi mas'uldir.
          </p>
          <p>
            3. Platformada haqoratli, aldov yoki O'zbekiston qonunchiligiga zid
            e'lonlarni joylashtirish qat'iyan taqiqlanadi.
          </p>
          <p>
            4. Barcha kelishuvlar va to'lovlar xavfsiz muhitda amalga
            oshirilishi tavsiya etiladi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
