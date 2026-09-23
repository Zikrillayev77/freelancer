import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Briefcase, ArrowUpDown } from "lucide-react";
import { translations } from "../utils/lang";
import { useTheme } from "../Context/ThemeContext";
import { useStore } from "../Store/useStore";
import { useFakeLoading } from "../utils/useFakeLoading";
import useDebounce from "../utils/useDebounce";
import Jobcard from "../Components/Jobcard";
import { JobCardSkeleton } from "../Components/Skeleton";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const catQuery = searchParams.get("cat") || "";

  const [search, setSearch] = useState(query);
  const [selectedCat, setSelectedCat] = useState(catQuery);
  const [sortBy, setSortBy] = useState("newest");

  // ✅ 350ms debounce — har keystroke'da filtrlash ishlamaydi
  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setSearch(query);
    setSelectedCat(catQuery);
  }, [query, catQuery]);

  const { lang } = useTheme();
  const t = translations[lang];
  const jobs = useStore((state) => state.jobs) || [];
  const isLoading = useFakeLoading([debouncedSearch, selectedCat, sortBy], 450);

  const categories = t.catList;

  // Byudjetdan raqamni ajratib olish yordamchisi
  const parseBudgetNum = (val) => {
    if (!val) return 0;
    const num = String(val).replace(/[^0-9]/g, "");
    return parseInt(num, 10) || 0;
  };

  // ✅ useMemo — debouncedSearch, selectedCat va sortBy o'zgarganda hisoblaydi
  const filteredAndSortedJobs = useMemo(() => {
    const needle = debouncedSearch.toLowerCase();
    const result = jobs.filter((job) => {
      const matchesSearch =
        needle === "" ||
        (job.title || "").toLowerCase().includes(needle) ||
        (job.description || "").toLowerCase().includes(needle) ||
        (job.category || "").toLowerCase().includes(needle);
      const matchesCat = selectedCat === "" || job.category === selectedCat;
      return matchesSearch && matchesCat;
    });

    if (sortBy === "price-desc") {
      result.sort((a, b) => parseBudgetNum(b.budget) - parseBudgetNum(a.budget));
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => parseBudgetNum(a.budget) - parseBudgetNum(b.budget));
    }

    return result;
  }, [jobs, debouncedSearch, selectedCat, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[75vh]">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.allProjects}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Jami {filteredAndSortedJobs.length} ta loyiha mavjud
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Qidiruv */}
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchInJobs}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-800 focus:border-emerald-500 outline-none transition"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>

          {/* Saralash (Sort) */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 pl-8 pr-8 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-800 focus:border-emerald-500 outline-none font-medium cursor-pointer"
            >
              <option value="newest">Yangi e'lonlar</option>
              <option value="price-desc">Byudjet: yuqori</option>
              <option value="price-asc">Byudjet: arzon</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Kategoriya filtri */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => setSelectedCat("")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            selectedCat === ""
              ? "bg-emerald-500 text-white shadow-sm"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50"
          }`}
        >
          {lang === "UZ" ? "Barchasi" : lang === "RU" ? "Все" : "All"}
        </button>

        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCat === cat
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ro'yxat */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredAndSortedJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedJobs.map((job) => (
            <Jobcard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {t.noAds}
          </p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
