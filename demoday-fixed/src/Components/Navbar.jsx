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
  Bookmark,
  User,
} from "lucide-react";
import { translations } from "../utils/lang";
import { useTheme } from "../Context/ThemeContext";
import { useStore } from "../Store/useStore";
import NotificationPanel from "./NotificationPanel";

const Navbar = ({ onPostJob }) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, lang, cycleLanguage } = useTheme();
  const t = translations[lang];

  const savedJobs = useStore((state) => state.savedJobs) || [];
  const savedCount = Array.isArray(savedJobs) ? savedJobs.length : 0;

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

  // ✅ Esc bilan mobile menyu yopiladi
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

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

        {/* ✅ Qidiruv: md (768px) dan ko'rinadigan qilindi */}
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

        {/* ✅ Desktop navigatsiya: lg (1024px)+ ko'rinadi */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
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
                <div className="h-px bg-slate-200 dark:border-slate-800 my-1"></div>
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

          {/* ✅ Saqlanganlar (Bookmark) */}
          <Link
            to="/saved"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition relative"
            title="Saqlangan loyihalar"
          >
            <Bookmark className="w-4 h-4" />
            <span>Saqlanganlar</span>
            {savedCount > 0 && (
              <span className="text-[10px] font-bold bg-emerald-500 text-white w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {savedCount}
              </span>
            )}
          </Link>

          {/* ✅ Profil */}
          <Link
            to="/profile"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition"
            title="Shaxsiy kabinet"
          >
            <User className="w-4 h-4" />
            <span>Profil</span>
          </Link>
        </div>

        {/* Til, tema, bildirishnoma, post, hamburger tugmalar */}
        <div className="flex items-center gap-2">
          {/* ✅ Bildirishnomalar */}
          <NotificationPanel />

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

          {/* ✅ md (768px) dan ko'rinadigan "Post" tugma */}
          <button
            onClick={onPostJob}
            className="hidden md:flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.postJobNav}</span>
          </button>

          {/* ✅ Hamburger: faqat lg'dan kichik ekranlarda ko'rinadi */}
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Menyu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Mobile menyu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative md:hidden">
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
              to="/saved"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> Saqlangan loyihalar
              </div>
              {savedCount > 0 && (
                <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <User className="w-4 h-4" /> Profil va sozlamalar
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
              to="/stats"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <BarChart2 className="w-4 h-4" /> {t.stats}
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
              className="flex-1 md:hidden flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition"
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
