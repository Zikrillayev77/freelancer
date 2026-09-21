import React from "react";
import { Star } from "lucide-react";

const Freelancercard = ({ freelancer }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition flex flex-col items-center text-center">
      <div
        className={`w-16 h-16 rounded-full ${freelancer.color} flex items-center justify-center text-white font-bold text-lg mb-4`}
      >
        {freelancer.initials}
      </div>

      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
        {freelancer.name}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
        {freelancer.role}
      </p>

      <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 mb-4">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="font-semibold">{freelancer.rating}</span>
        <span className="text-slate-400 dark:text-slate-500">
          &middot; {freelancer.reviews} sharh
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
        {freelancer.skills.map((skill, index) => (
          <span
            key={index}
            className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          {freelancer.hourlyRate}
        </span>
        <button className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-xl hover:bg-emerald-500 hover:text-white transition">
          Profil
        </button>
      </div>
    </div>
  );
};

export default Freelancercard;
