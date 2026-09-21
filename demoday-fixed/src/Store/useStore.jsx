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
    }),
    {
      name: "workk-storage",
      version: 2,
    },
  ),
);
