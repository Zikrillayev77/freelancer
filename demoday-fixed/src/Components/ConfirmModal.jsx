import React from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Ishonchingiz komilmi?",
  description = "Bu amalni ortga qaytarib bo'lmaydi.",
  confirmLabel = "O'chirish",
  cancelLabel = "Bekor qilish",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-rose-500 hover:bg-rose-600 text-white transition cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
