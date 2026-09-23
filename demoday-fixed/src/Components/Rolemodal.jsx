import React, { useEffect, useCallback } from "react";
import { UserCheck, Briefcase, X } from "lucide-react";
import { useStore } from "../Store/useStore";
import { useTheme } from "../Context/ThemeContext";
import { useToast } from "../Context/ToastContext";

const Rolemodal = ({ isOpen, onClose }) => {
  const setRole = useStore((state) => state.setRole);
  const { lang } = useTheme();
  const { showToast } = useToast();

  // ✅ Esc bilan yopish
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    const label =
      selectedRole === "mijoz"
        ? lang === "UZ"
          ? "Mijoz"
          : lang === "RU"
            ? "Заказчик"
            : "Client"
        : lang === "UZ"
          ? "Frilanser"
          : lang === "RU"
            ? "Фрилансер"
            : "Freelancer";
    showToast(
      lang === "UZ"
        ? `Xush kelibsiz, ${label}!`
        : lang === "RU"
          ? `Добро пожаловать, ${label}!`
          : `Welcome, ${label}!`,
      "success",
    );
    onClose();
  };

  // ✅ Backdrop'ga bosilganda yopish
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {lang === "UZ"
            ? "Xush kelibsiz!"
            : lang === "RU"
              ? "Добро пожаловать!"
              : "Welcome!"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {lang === "UZ"
            ? "Davom etish uchun platformadagi rolingizni tanlang:"
            : lang === "RU"
              ? "Выберите вашу роль на платформе, чтобы продолжить:"
              : "Choose your role on the platform to continue:"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect("mijoz")}
            className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition cursor-pointer group"
          >
            <UserCheck className="w-8 h-8 text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition mb-2" />
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-emerald-500">
              {lang === "UZ" ? "Mijoz" : lang === "RU" ? "Заказчик" : "Client"}
            </span>
          </button>

          <button
            onClick={() => handleSelect("frilanser")}
            className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition cursor-pointer group"
          >
            <Briefcase className="w-8 h-8 text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition mb-2" />
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-emerald-500">
              {lang === "UZ"
                ? "Frilanser"
                : lang === "RU"
                  ? "Фрилансер"
                  : "Freelancer"}
            </span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
        >
          {lang === "UZ"
            ? "Hozircha o'tkazib yuborish"
            : lang === "RU"
              ? "Пропустить пока"
              : "Skip for now"}
        </button>
      </div>
    </div>
  );
};

export default Rolemodal;
