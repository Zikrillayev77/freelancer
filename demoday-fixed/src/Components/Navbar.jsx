import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Globe,
  Sun,
  Moon,
  Briefcase,
  BarChart2,
  ChevronDown,
  Menu,
  X,
  Plus,
  ClipboardList,
} from "lucide-react";
import { translations } from "../utils/lang";
import { useTheme } from "../Context/ThemeContext";

const Navbar = ({ onPostJob }) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, lang, cycleLanguage } = useTheme();
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileOpen(false);
    }
  };

  const categories = t.catList;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white shrink-0"
        >
          WORKK<span className="text-emerald-500">.UZ</span>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center relative flex-1 max-w-xs"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 focus:border-emerald-500 outline-none transition"
          />
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
        </form>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition cursor-pointer"
            >
              <span>{t.categories}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50">
                <Link
                  to="/jobs"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {t.allAds}
                </Link>
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
                {categories.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/jobs?cat=${encodeURIComponent(cat)}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/jobs"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition"
          >
            <Briefcase className="w-4 h-4" />
            <span>{t.projects}</span>
          </Link>

          <Link
            to="/stats"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition"
          >
            <BarChart2 className="w-4 h-4" />
            <span>{t.stats}</span>
          </Link>

          <Link
            to="/my-jobs"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition"
          >
            <ClipboardList className="w-4 h-4" />
            <span>
              {lang === "UZ"
                ? "Mening e'lonlarim"
                : lang === "RU"
                  ? "Мои объявления"
                  : "My listings"}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleLanguage}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-emerald-500 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
            aria-label="Tilni almashtirish"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>{lang}</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer"
            aria-label="Mavzuni almashtirish"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onPostJob}
            className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.postJobNav}</span>
          </button>

          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Menyu"
          >
            {isMobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-800 focus:border-emerald-500 outline-none transition"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          </form>

          <div className="flex flex-col gap-1">
            <Link
              to="/jobs"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <Briefcase className="w-4 h-4" /> {t.projects}
            </Link>
            <Link
              to="/stats"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <BarChart2 className="w-4 h-4" /> {t.stats}
            </Link>
            <Link
              to="/my-jobs"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <ClipboardList className="w-4 h-4" />
              {lang === "UZ"
                ? "Mening e'lonlarim"
                : lang === "RU"
                  ? "Мои объявления"
                  : "My listings"}
            </Link>
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t.home}
            </Link>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
            <p className="text-[11px] font-semibold uppercase text-slate-400 mb-2 px-3">
              {t.categories}
            </p>
            <div className="flex flex-wrap gap-2 px-3">
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  to={`/jobs?cat=${encodeURIComponent(cat)}`}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={cycleLanguage}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-800"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang}</span>
            </button>
            <button
              onClick={() => {
                onPostJob();
                setIsMobileOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.postJobNav}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
