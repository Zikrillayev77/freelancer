import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight } from "lucide-react";
import { useStore } from "../Store/useStore";
import Jobcard from "../Components/Jobcard";

const SavedJobs = () => {
  const jobs = useStore((state) => state.jobs) || [];
  const savedJobs = useStore((state) => state.savedJobs) || [];

  const bookmarkedJobs = jobs.filter((job) =>
    Array.isArray(savedJobs) && savedJobs.includes(job.id),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[75vh]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-emerald-500 fill-emerald-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Saqlangan loyihalar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keyinroq ko'rish yoki ariza topshirish uchun xatcho'pga olgan loyihalaringiz
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
          {bookmarkedJobs.length} ta saqlangan
        </span>
      </div>

      {bookmarkedJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookmarkedJobs.map((job) => (
            <Jobcard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
            Hozircha hech qanday loyiha saqlanmagan
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
            Loyihalar ro'yxatida kartochka burchagidagi xatcho'p (🔖) belgisini bosib, o'zingizga ma'qul ishlarni shu yerda saqlab borishingiz mumkin.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            Loyihalarni ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
