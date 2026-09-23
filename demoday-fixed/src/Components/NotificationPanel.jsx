import React, { useEffect, useState, useRef } from "react";
import { Bell, BellDot, Check, CheckCheck, X } from "lucide-react";
import { useStore } from "../Store/useStore";

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const notifications = useStore((state) => state.notifications) || [];
  const markNotificationRead = useStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useStore((state) => state.markAllNotificationsRead);

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).length
    : 0;

  // Tashqariga bosilganda yopish
  useEffect(() => {
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Esc bilan yopish
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const typeStyles = {
    success: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    info: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800",
    error: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800",
  };

  const dotStyles = {
    success: "bg-emerald-500",
    info: "bg-sky-500",
    error: "bg-rose-500",
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell tugmasi */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer"
        aria-label="Bildirishnomalar"
      >
        {unreadCount > 0 ? (
          <BellDot className="w-4 h-4 text-emerald-500" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-toast-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Bildirishnomalar
              </h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded-full">
                  {unreadCount} yangi
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition"
                  title="Hammasini o'qilgan deb belgilash"
                >
                  <CheckCheck className="w-3 h-3" /> Hammasini o'qi
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Bildirishnomalar yo'q</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                    !notif.read ? "bg-slate-50/70 dark:bg-slate-800/30" : ""
                  }`}
                  onClick={() => markNotificationRead(notif.id)}
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      !notif.read
                        ? dotStyles[notif.type] || "bg-slate-400"
                        : "bg-transparent"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs leading-relaxed ${
                        !notif.read
                          ? "text-slate-800 dark:text-slate-100 font-medium"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(notif.id);
                      }}
                      className="shrink-0 p-1 rounded text-slate-300 hover:text-emerald-500 transition"
                      title="O'qilgan deb belgilash"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
