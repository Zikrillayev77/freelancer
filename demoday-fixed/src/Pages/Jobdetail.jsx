import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "../Store/useStore";
import { useToast } from "../Context/ToastContext";
import { useFakeLoading } from "../utils/useFakeLoading";
import { JobDetailSkeleton } from "../Components/Skeleton";

const DEFAULT_SKILLS = ["Muloqot", "Vaqtida topshirish"];

const Jobdetail = () => {
  const { id } = useParams();
  const jobs = useStore((state) => state.jobs);
  const { showToast } = useToast();
  const [applied, setApplied] = useState(false);
  const [proposalText, setProposalText] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const isLoading = useFakeLoading([id], 400);

  const storeJob = jobs.find((j) => String(j.id) === String(id));

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (!storeJob) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Bu topshiriq topilmadi
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          E'lon o'chirilgan yoki havola noto'g'ri bo'lishi mumkin.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Loyihalarga qaytish
        </Link>
      </div>
    );
  }

  const job = {
    ...storeJob,
    postedDate: storeJob.postedDate || "Yaqinda",
    client: {
      name: storeJob.client || "Buyurtmachi",
      rating: storeJob.rating || 4.8,
      completedJobs: storeJob.completedJobs || 0,
      verified: true,
    },
    skills: storeJob.skills || DEFAULT_SKILLS,
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!proposalText.trim() || !bidPrice.trim()) return;
    setApplied(true);
    showToast("Taklifingiz muvaffaqiyatli yuborildi!", "success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-500 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Loyihalarga qaytish</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asosiy ma'lumot */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {job.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {job.postedDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 py-4 border-y border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400">Byudjet</p>
                  <p className="font-bold text-sm">{job.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400">Muddati</p>
                  <p className="font-bold text-sm">{job.deadline}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Loyiha tavsifi
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold uppercase text-slate-400 mb-3">
                Talab qilinadigan ko‘nikmalar
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ariza yuborish qismi */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Taklifingizni yuboring
            </h3>

            {applied ? (
              <div className="flex flex-col items-center justify-center p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300">
                  Taklifingiz muvaffaqiyatli yuborildi!
                </h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  Mijoz siz bilan tez orada bog'lanadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Taklif narxingiz ($)
                  </label>
                  {/* ✅ min="0" — manfiy raqam kiritilmasligi uchun, step="1" */}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder="Masalan: 400"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Nima uchun aynan siz? (Loyihaga taklifingiz)
                  </label>
                  <textarea
                    rows="4"
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    placeholder="O'zingiz haqingizda qisqacha va bu ishni qanday bajarishingizni yozing..."
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-4 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-sm shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Ariza topshirish</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mijoz haqida ma'lumot */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">
              Mijoz haqida
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-bold text-lg">
                {(job.client?.name || "B").charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">
                    {job.client.name}
                  </h4>
                  {job.client.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <p className="text-xs text-slate-400">O‘zbekiston, Toshkent</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Reyting:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  ⭐ {job.client.rating}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bajarilgan loyihalar:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {job.client.completedJobs} ta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobdetail;
