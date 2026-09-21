import React from "react";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";

const Stats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[75vh]">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
        Platforma Statistikasi
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        WORKK.UZ ko'rsatkichlari va faollik hisoboti
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <Users className="w-8 h-8 text-emerald-500 mb-3" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            12,450+
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ro'yxatdan o'tgan frilanserlar
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <Briefcase className="w-8 h-8 text-emerald-500 mb-3" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            3,820+
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bajarilgan loyihalar</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <CheckCircle className="w-8 h-8 text-emerald-500 mb-3" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            98%
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Muvaffaqiyatli bitimlar</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <TrendingUp className="w-8 h-8 text-emerald-500 mb-3" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            $450K+
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Umumiy to'lovlar hajmi</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
