import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useStore } from "../Store/useStore";
import { useToast } from "../Context/ToastContext";

const CATEGORIES = [
  "Dasturlash va IT",
  "Grafika va dizayn",
  "SEO va targ'ibot",
  "Ijtimoiy tarmoqlar",
  "Matn va tarjimalar",
  "Biznes va rivojlanish",
];

const inputClass =
  "w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition";

const emptyDefaults = {
  client: "",
  title: "",
  category: CATEGORIES[0],
  budget: "",
  deadline: "",
  description: "",
};

const Jobmodal = ({ isOpen, onClose, editingJob = null }) => {
  const { addJob, updateJob } = useStore();
  const { showToast } = useToast();
  const isEditMode = Boolean(editingJob);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: emptyDefaults });

  useEffect(() => {
    if (isOpen) {
      reset(
        editingJob
          ? {
              client: editingJob.client || "",
              title: editingJob.title || "",
              category: editingJob.category || CATEGORIES[0],
              budget: (editingJob.budget || "").replace("$", ""),
              deadline: editingJob.deadline || "",
              description: editingJob.description || "",
            }
          : emptyDefaults,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editingJob]);

  if (!isOpen) return null;

  const borderClass = (field) =>
    errors[field]
      ? "border-rose-400 focus:border-rose-500"
      : "border-transparent focus:border-emerald-500";

  const onSubmit = async (data) => {
    // Fake API kechikishi (haqiqiy so'rovni simulyatsiya qilish uchun)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedBudget = data.budget.trim().startsWith("$")
      ? data.budget.trim()
      : `$${data.budget.trim()}`;

    if (isEditMode) {
      updateJob(editingJob.id, {
        title: data.title.trim(),
        category: data.category,
        budget: normalizedBudget,
        deadline: data.deadline.trim() || "3 kun",
        description: data.description.trim() || "Tavsif kiritilmagan",
        client: data.client.trim(),
      });
      showToast("E'lon muvaffaqiyatli yangilandi!", "success");
    } else {
      const newJob = {
        id: Date.now(),
        title: data.title.trim(),
        category: data.category,
        budget: normalizedBudget,
        deadline: data.deadline.trim() || "3 kun",
        description: data.description.trim() || "Tavsif kiritilmagan",
        client: data.client.trim(),
        isMine: true,
      };
      addJob(newJob);
      showToast("E'lon muvaffaqiyatli joylandi!", "success");
    }

    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {isEditMode ? "E'lonni tahrirlash" : "Yangi topshiriq joylashtirish"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Ismingiz (Buyurtmachi)
            </label>
            <input
              type="text"
              placeholder="Masalan: Anvar Karimov"
              className={`${inputClass} ${borderClass("client")}`}
              {...register("client", {
                required: "Ismingizni kiriting",
                minLength: { value: 2, message: "Kamida 2 ta belgi" },
              })}
            />
            {errors.client && (
              <p className="text-rose-500 text-xs mt-1">
                {errors.client.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Loyiha nomi / Sarlavha
            </label>
            <input
              type="text"
              placeholder="Masalan: Internet-do'kon veb-sayti"
              className={`${inputClass} ${borderClass("title")}`}
              {...register("title", {
                required: "Sarlavhani kiriting",
                minLength: { value: 5, message: "Kamida 5 ta belgi" },
              })}
            />
            {errors.title && (
              <p className="text-rose-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Kategoriya
              </label>
              <select
                className={`${inputClass} ${borderClass("category")}`}
                {...register("category", { required: true })}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Byudjet ($)
              </label>
              <input
                type="text"
                placeholder="Masalan: 300"
                className={`${inputClass} ${borderClass("budget")}`}
                {...register("budget", {
                  required: "Byudjetni kiriting",
                  pattern: {
                    value: /^\$?\d+(\.\d+)?$/,
                    message: "Faqat raqam kiriting",
                  },
                })}
              />
              {errors.budget && (
                <p className="text-rose-500 text-xs mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Ijro muddati
            </label>
            <input
              type="text"
              placeholder="Masalan: 5 kun"
              className={`${inputClass} border-transparent focus:border-emerald-500`}
              {...register("deadline")}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Batafsil tavsif
            </label>
            <textarea
              rows={3}
              placeholder="Loyihaga qo'yiladigan talablar va shartlar..."
              className={`${inputClass} resize-none ${borderClass("description")}`}
              {...register("description", {
                required: "Tavsifni kiriting",
                minLength: { value: 15, message: "Kamida 15 ta belgi" },
              })}
            />
            {errors.description && (
              <p className="text-rose-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {isEditMode ? "Saqlanmoqda..." : "Yuborilmoqda..."}
              </>
            ) : isEditMode ? (
              "O'zgarishlarni saqlash"
            ) : (
              "E'lonni e'lon qilish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Jobmodal;
