import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Clock, Tag, Bookmark, BookmarkCheck } from "lucide-react";
import { useStore } from "../Store/useStore";
import { useToast } from "../Context/ToastContext";

// ✅ React.memo — parent re-render bo'lganda agar props o'zgarmaganda qayta render qilmaydi
const Jobcard = memo(({ job }) => {
  const savedJobs = useStore((state) => state.savedJobs) || [];
  const toggleSaveJob = useStore((state) => state.toggleSaveJob);
  const { showToast } = useToast();

  const isSaved = Array.isArray(savedJobs) ? savedJobs.includes(job.id) : false;

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(job.id);
    showToast(
      isSaved ? "Saqlangan ishlardan olib tashlandi" : "Saqlangan ishlarga qo'shildi! 🔖",
      isSaved ? "info" : "success",
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/50 transition flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Tag className="w-3 h-3" /> {job.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {job.deadline || "—"}
            </span>
            {/* ✅ Bookmark tugmasi */}
            <button
              onClick={handleToggleSave}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                isSaved
                  ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50"
                  : "text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              aria-label={isSaved ? "Saqlangandan olib tashlash" : "Saqlash"}
              title={isSaved ? "Saqlangandan olib tashlash" : "Keyinroq ko'rish uchun saqlash"}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-1">
          {job.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 line-clamp-2">
          {job.description || "Tavsif kiritilmagan"}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-[10px] text-slate-400 block">Byudjet:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            {job.budget}
          </span>
        </div>
        <Link
          to={`/jobs/${job.id}`}
          className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl hover:bg-emerald-500 hover:text-white transition"
        >
          Batafsil
        </Link>
      </div>
    </div>
  );
});

Jobcard.displayName = "Jobcard";

export default Jobcard;
