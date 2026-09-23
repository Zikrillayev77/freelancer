import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { translations } from "../utils/lang";
import { useTheme } from "../Context/ThemeContext";
import { useFakeLoading } from "../utils/useFakeLoading";
import { topFreelancers } from "../data/fakeApi";
import Freelancercard from "../Components/Freelancercard";
import { FreelancerCardSkeleton } from "../Components/Skeleton";
import ContactModal from "../Components/ContactModal";
import FaqSection from "../Components/FaqSection";

const Home = ({ onPostJob }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactFreelancer, setContactFreelancer] = useState(null);
  const { lang } = useTheme();
  const t = translations[lang];
  const isLoadingFreelancers = useFakeLoading([], 600);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularTags = [
    "veb-sayt",
    "logo",
    "SMM",
    "Telegram bot",
    "tarjima",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-6">
        <span>{t.heroTag}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mb-4 leading-tight">
        {t.heroTitle}
      </h1>

      <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl mb-10">
        {t.heroDesc}
      </p>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl flex items-center gap-2 shadow-xl mb-6"
      >
        <div className="flex items-center pl-3 flex-1 gap-2 min-w-0">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full min-w-0 bg-transparent text-slate-900 dark:text-slate-100 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition cursor-pointer shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-12">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {t.popular}
        </span>
        {popularTags.map((tag, index) => (
          <Link
            key={index}
            to={`/jobs?q=${encodeURIComponent(tag)}`}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 px-3 py-1.5 rounded-xl transition text-slate-700 dark:text-slate-300"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button
          onClick={onPostJob}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-lg transition cursor-pointer"
        >
          {t.postJob}
        </button>
        <Link
          to="/jobs"
          className="w-full sm:w-auto text-center bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-semibold text-xs px-6 py-3 rounded-xl transition"
        >
          {t.viewServices}
        </Link>
      </div>

      {/* Tanlangan frilanserlar */}
      <div className="w-full mt-20 text-left">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === "UZ"
              ? "Tanlangan frilanserlar"
              : lang === "RU"
                ? "Избранные фрилансеры"
                : "Featured freelancers"}
          </h2>
          <Link
            to="/jobs"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline whitespace-nowrap flex items-center gap-1"
          >
            {lang === "UZ"
              ? "Barcha loyihalarni ko'rish"
              : lang === "RU"
                ? "Смотреть все проекты"
                : "View all projects"}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoadingFreelancers
            ? Array.from({ length: 4 }).map((_, i) => (
                <FreelancerCardSkeleton key={i} />
              ))
            : topFreelancers.map((freelancer) => (
                <Freelancercard
                  key={freelancer.id}
                  freelancer={freelancer}
                  onContact={(f) => setContactFreelancer(f)}
                />
              ))}
        </div>
      </div>

      {/* FAQ bo'limi */}
      <FaqSection />

      {/* Bog'lanish modali */}
      <ContactModal
        freelancer={contactFreelancer}
        isOpen={Boolean(contactFreelancer)}
        onClose={() => setContactFreelancer(null)}
      />
    </div>
  );
};

export default Home;
