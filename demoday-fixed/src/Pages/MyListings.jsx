import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, PlusCircle, Briefcase } from "lucide-react";
import { useStore } from "../Store/useStore";
import { useToast } from "../Context/ToastContext";
import Jobmodal from "../Components/Jobmodal";
import ConfirmModal from "../Components/ConfirmModal";

const MyListings = ({ onPostJob }) => {
  const jobs = useStore((state) => state.jobs);
  const deleteJob = useStore((state) => state.deleteJob);
  const { showToast } = useToast();

  const [editingJob, setEditingJob] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const myJobs = jobs.filter((job) => job.isMine);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteJob(deleteTarget.id);
      showToast("E'lon o'chirildi", "info");
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mening e'lonlarim
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Siz joylashtirgan barcha topshiriqlarni shu yerdan boshqarasiz.
          </p>
        </div>
        <button
          onClick={onPostJob}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          Yangi e'lon
        </button>
      </div>

      {myJobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Siz hali hech qanday e'lon joylamagansiz.
          </p>
          <button
            onClick={onPostJob}
            className="inline-flex items-center gap-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl transition"
          >
            <PlusCircle className="w-4 h-4" />
            Birinchi e'lonni joylash
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          {/* Desktop: table */}
          <table className="w-full hidden md:table">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-left">
                <th className="px-6 py-3 text-[11px] font-semibold uppercase text-slate-400">
                  Sarlavha
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold uppercase text-slate-400">
                  Kategoriya
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold uppercase text-slate-400">
                  Byudjet
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold uppercase text-slate-400 text-right">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {myJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="font-medium text-sm text-slate-800 dark:text-slate-100 hover:text-emerald-500 transition line-clamp-1"
                    >
                      {job.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                      {job.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {job.budget}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingJob(job)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition cursor-pointer"
                        aria-label="Tahrirlash"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(job)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        aria-label="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: stacked cards */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {myJobs.map((job) => (
              <div key={job.id} className="p-4">
                <Link
                  to={`/jobs/${job.id}`}
                  className="font-medium text-sm text-slate-800 dark:text-slate-100 hover:text-emerald-500 transition line-clamp-1 block mb-2"
                >
                  {job.title}
                </Link>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                    {job.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {job.budget}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Tahrirlash
                  </button>
                  <button
                    onClick={() => setDeleteTarget(job)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> O'chirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Jobmodal
        isOpen={Boolean(editingJob)}
        onClose={() => setEditingJob(null)}
        editingJob={editingJob}
      />

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="E'lonni o'chirmoqchimisiz?"
        description={
          deleteTarget
            ? `"${deleteTarget.title}" butunlay o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.`
            : ""
        }
      />
    </div>
  );
};

export default MyListings;
