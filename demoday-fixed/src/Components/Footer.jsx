import React from "react";
import { Link } from "react-router-dom";
import { translations } from "../utils/lang";
import { useTheme } from "../Context/ThemeContext";

const Footer = () => {
  const { lang } = useTheme();
  const t = translations[lang];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <Link
            to="/"
            className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight inline-block mb-4"
          >
            WORKK<span className="text-emerald-500">.UZ</span>
          </Link>
          <p className="leading-relaxed mb-4 text-slate-500 dark:text-slate-400">
            {t.footerDesc}
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition"
          >
            <span>&lt;&gt; GitHub</span>
          </a>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">
            {t.footerCat}
          </h4>
          <ul className="space-y-2">
            {t.catList.map((cat, index) => (
              <li key={index}>
                <Link
                  to={`/jobs?cat=${encodeURIComponent(cat)}`}
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">
            {t.footerPages}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/jobs"
                className="hover:text-emerald-500 dark:hover:text-emerald-400 transition"
              >
                {t.allAds}
              </Link>
            </li>
            <li>
              <Link
                to="/stats"
                className="hover:text-emerald-500 dark:hover:text-emerald-400 transition"
              >
                {t.stats}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-emerald-500 dark:hover:text-emerald-400 transition"
              >
                {t.home}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">
            {t.footerContact}
          </h4>
          <p className="text-slate-500 dark:text-slate-400 mb-3">
            {lang === "UZ"
              ? "Savollar yoki takliflar bo'yicha:"
              : lang === "RU"
                ? "По вопросам и предложениям:"
                : "For questions or suggestions:"}
          </p>
          <a
            href="mailto:support@workk.uz"
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            support@workk.uz
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 dark:text-slate-500 text-center sm:text-left">
        <p>{t.rights}</p>
        <div className="flex items-center gap-6">
          <Link
            to="/privacy"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition"
          >
            {t.privacy}
          </Link>
          <Link
            to="/terms"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition"
          >
            {t.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
