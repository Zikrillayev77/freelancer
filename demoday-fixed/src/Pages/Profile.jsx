import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Bookmark,
  Bell,
  CheckCircle2,
  ShieldCheck,
  Edit3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../Store/useStore";
import { useToast } from "../Context/ToastContext";

const Profile = () => {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const jobs = useStore((state) => state.jobs) || [];
  const savedJobs = useStore((state) => state.savedJobs) || [];
  const notifications = useStore((state) => state.notifications) || [];
  const { showToast } = useToast();

  const [name, setName] = useState("Azizbek Rahimov");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [email, setEmail] = useState("azizbek@workk.uz");
  const [bio, setBio] = useState(
    "Full-stack dasturchi va frilanser. Web ilovalar yaratish va UI/UX dizayn bo'yicha 4 yillik tajribaga egaman.",
  );
  const [isEditing, setIsEditing] = useState(false);

  const myJobCount = jobs.filter((j) => j.isMine).length;

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast("Profil ma'lumotlari yangilandi! ✅", "success");
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    showToast(`Rol o'zgartirildi: ${newRole === "mijoz" ? "Mijoz" : "Frilanser"}`, "info");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-[75vh]">
      {/* Top Banner / Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-500/20">
              {(name.trim() || "User").split(/\s+/).map((n) => n[0] || "").join("") || "U"}
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Toshkent, O'zbekiston &middot; WORKK.UZ a'zosi
                </p>
              </div>

              {/* Role Badge & Switcher */}
              <div className="flex items-center gap-2 self-center sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => handleRoleChange("frilanser")}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                    role === "frilanser"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                  }`}
                >
                  Frilanser
                </button>
                <button
                  onClick={() => handleRoleChange("mijoz")}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                    role === "mijoz"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                  }`}
                >
                  Mijoz (Buyurtmachi)
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 max-w-2xl leading-relaxed">
              {bio}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/my-jobs"
            className="flex flex-col items-center sm:items-start p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
              <span>E'lonlarim</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {myJobCount}
            </span>
          </Link>

          <Link
            to="/saved"
            className="flex flex-col items-center sm:items-start p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
              <span>Saqlanganlar</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {savedJobs.length}
            </span>
          </Link>

          <div className="flex flex-col items-center sm:items-start p-3 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Bell className="w-3.5 h-3.5 text-emerald-500" />
              <span>Bildirishnomalar</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {notifications.length}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              Shaxsiy ma'lumotlar
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? "Bekor qilish" : "Tahrirlash"}
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  To'liq ism
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 disabled:opacity-75 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Telefon raqam
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 disabled:opacity-75 text-slate-900 dark:text-slate-100 pl-9 pr-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Elektron pochta
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  disabled={!isEditing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 disabled:opacity-75 text-slate-900 dark:text-slate-100 pl-9 pr-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                O'zingiz haqingizda (Bio)
              </label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 disabled:opacity-75 text-slate-900 dark:text-slate-100 p-3 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none transition resize-none"
              />
            </div>

            {isEditing && (
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                >
                  O'zgarishlarni saqlash
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Security & Verification Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Xavfsizlik & Holat
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Telefon tasdiqlangan
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    SMS orqali xavfsizlik faol
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                Faol
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Xavfsiz bitim
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kafolatlangan to'lov tizimi
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-sky-500 text-white font-bold px-2 py-0.5 rounded-full">
                Uланган
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
