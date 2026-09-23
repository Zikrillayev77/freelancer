import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  // ✅ Map orqali barcha taymerlarni saqlash — to'g'ri cleanup uchun
  const timersRef = useRef(new Map());

  // Component unmount bo'lganda barcha taymerlarni tozalash
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    // ✅ Toast o'chirilganda taymerini ham tozalaymiz
    const timers = timersRef.current;
    if (timers.has(id)) {
      clearTimeout(timers.get(id));
      timers.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3500) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);

      // ✅ Taymer ID'sini Map'da saqlaymiz
      const timerId = setTimeout(() => removeToast(id), duration);
      timersRef.current.set(id, timerId);

      return id;
    },
    [removeToast],
  );

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
  };

  const borderMap = {
    success: "border-l-emerald-500",
    error: "border-l-rose-500",
    info: "border-l-sky-500",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="status"
              aria-live="polite"
              className={`animate-toast-in flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 ${
                borderMap[toast.type]
              } rounded-xl shadow-lg p-4 text-sm text-slate-700 dark:text-slate-200`}
            >
              {iconMap[toast.type]}
              <p className="flex-1 leading-snug">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (ctx === null) {
    throw new Error("useToast() faqat <ToastProvider> ichida ishlatilishi mumkin!");
  }
  return ctx;
};
