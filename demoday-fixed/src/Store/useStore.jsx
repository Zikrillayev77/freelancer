import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fakeJobs } from "../data/fakeApi";

export const useStore = create(
  persist(
    (set) => ({
      role: null, // "mijoz" yoki "frilanser"
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),

      jobs: fakeJobs,

      addJob: (newJob) => set((state) => ({ jobs: [newJob, ...state.jobs] })),
      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            String(job.id) === String(id) ? { ...job, ...updates } : job,
          ),
        })),
      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => String(job.id) !== String(id)),
        })),

      // ✅ Saqlangan ishlar (Bookmark)
      savedJobs: [],
      toggleSaveJob: (jobId) =>
        set((state) => {
          const current = Array.isArray(state.savedJobs) ? state.savedJobs : [];
          return {
            savedJobs: current.includes(jobId)
              ? current.filter((id) => id !== jobId)
              : [...current, jobId],
          };
        }),
      isJobSaved: (jobId) => false,

      // ✅ Bildirishnomalar
      notifications: [
        {
          id: 1,
          type: "info",
          message: "WORKK.UZ ga xush kelibsiz! Bugun 12 ta yangi e'lon qo'shildi.",
          read: false,
          time: "Hozir",
        },
        {
          id: 2,
          type: "success",
          message: "Sizning taklifingiz ko'rib chiqilmoqda.",
          read: false,
          time: "2 daqiqa oldin",
        },
        {
          id: 3,
          type: "info",
          message: "Yangi kategoriya: 'Biznes va rivojlanish' bo'yicha 8 ta ish.",
          read: true,
          time: "1 soat oldin",
        },
      ],
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: (state.notifications || []).map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: (state.notifications || []).map((n) => ({ ...n, read: true })),
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            { ...notification, id: Date.now(), read: false, time: "Hozir" },
            ...(state.notifications || []),
          ],
        })),
    }),
    {
      name: "workk-storage",
      version: 4,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return persistedState;
        }
        return {
          ...persistedState,
          jobs: Array.isArray(persistedState.jobs) && persistedState.jobs.length > 0 ? persistedState.jobs : fakeJobs,
          savedJobs: Array.isArray(persistedState.savedJobs) ? persistedState.savedJobs : [],
          notifications: Array.isArray(persistedState.notifications) ? persistedState.notifications : [
            {
              id: 1,
              type: "info",
              message: "WORKK.UZ ga xush kelibsiz! Bugun 12 ta yangi e'lon qo'shildi.",
              read: false,
              time: "Hozir",
            },
          ],
        };
      },
    },
  ),
);
