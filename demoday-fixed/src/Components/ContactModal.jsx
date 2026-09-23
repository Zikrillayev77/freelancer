import React, { useState, useEffect } from "react";
import { X, Send, MessageCircle, Phone, Star, CheckCircle } from "lucide-react";
import { useToast } from "../Context/ToastContext";
import { useStore } from "../Store/useStore";

const ContactModal = ({ freelancer, isOpen, onClose }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const { showToast } = useToast();
  const addNotification = useStore((state) => state.addNotification);

  useEffect(() => {
    if (isOpen) {
      setTopic("");
      setMessage("");
      setIsSent(false);
    }
  }, [isOpen]);

  // Esc klavishi bilan yopish
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !freelancer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSent(true);
    addNotification({
      type: "success",
      message: `${freelancer.name} ga xabaringiz muvaffaqiyatli yuborildi! Tez orada javob olasiz.`,
    });
    showToast(`${freelancer.name} ga xabar yuborildi!`, "success");

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-toast-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Taklif yuborildi!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              {freelancer.name} taklifingiz bilan tanishib, tez orada siz bilan bog'lanadi.
            </p>
          </div>
        ) : (
          <>
            {/* Header / Info */}
            <div className="flex items-center gap-4 mb-6 pr-6">
              <div
                className={`w-14 h-14 rounded-2xl ${freelancer.color} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}
              >
                {freelancer.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">
                    {freelancer.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800 shrink-0">
                    Online
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {freelancer.role}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    {freelancer.rating}
                  </span>
                  <span>&middot;</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {freelancer.hourlyRate}
                  </span>
                </div>
              </div>
            </div>

            {/* Tezkor aloqa tugmalari */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={`https://t.me/${freelancer.name.toLowerCase().replace(/[^a-z]/g, "")}_uz`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 text-sky-600 dark:text-sky-400 text-xs font-semibold border border-sky-200 dark:border-sky-800 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram orqali
              </a>
              <a
                href="tel:+998901234567"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
              >
                <Phone className="w-4 h-4" />
                Qo'ng'iroq qilish
              </a>
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 uppercase font-semibold shrink-0">
                yoki platforma orqali xabar
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Loyiha mavzusi
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Masalan: Veb-sayt yaratish bo'yicha taklif"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Xabar matni
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Loyihangiz haqida qisqacha yozing va muddat/byudjetni ko'rsating..."
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Yuborish
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
