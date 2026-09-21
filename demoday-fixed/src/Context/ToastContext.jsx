import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext();

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3500) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), duration);
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

export const useToast = () => useContext(ToastContext);
