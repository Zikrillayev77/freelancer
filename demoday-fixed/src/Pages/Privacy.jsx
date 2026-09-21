import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

const Privacy = () => {
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
          <Lock className="w-8 h-8 text-emerald-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Maxfiylik siyosati
          </h1>
        </div>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            1. Biz sizning shaxsiy ma'lumotlaringiz xavfsizligini ta'minlashga
            jiddiy yondashamiz.
          </p>
          <p>
            2. To'plangan ma'lumotlar faqat frilanser va buyurtmachi o'rtasidagi
            aloqani yaxshilash uchun ishlatiladi.
          </p>
          <p>
            3. Shaxsiy ma'lumotlaringiz uchinchi shaxslarga hech qachon
            sotilmaydi yoki berilmaydi.
          </p>
          <p>
            4. Saytdan foydalanish orqali siz ushbu maxfiylik siyosatiga rozilik
            bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
