import React from "react";

export const JobCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
    <div className="flex items-center justify-between mb-3">
      <div className="skeleton-shimmer h-5 w-28 rounded-lg" />
      <div className="skeleton-shimmer h-4 w-14 rounded-lg" />
    </div>
    <div className="skeleton-shimmer h-4 w-4/5 rounded-lg mb-2" />
    <div className="skeleton-shimmer h-3 w-full rounded-lg mb-1.5" />
    <div className="skeleton-shimmer h-3 w-3/5 rounded-lg mb-4" />
    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div className="skeleton-shimmer h-5 w-16 rounded-lg" />
      <div className="skeleton-shimmer h-8 w-20 rounded-xl" />
    </div>
  </div>
);

export const FreelancerCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
    <div className="skeleton-shimmer w-16 h-16 rounded-full mb-4" />
    <div className="skeleton-shimmer h-4 w-24 rounded-lg mb-2" />
    <div className="skeleton-shimmer h-3 w-20 rounded-lg mb-3" />
    <div className="skeleton-shimmer h-3 w-28 rounded-lg mb-4" />
    <div className="flex gap-1.5 mb-4">
      <div className="skeleton-shimmer h-5 w-12 rounded-lg" />
      <div className="skeleton-shimmer h-5 w-12 rounded-lg" />
    </div>
    <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <div className="skeleton-shimmer h-4 w-14 rounded-lg" />
      <div className="skeleton-shimmer h-7 w-16 rounded-xl" />
    </div>
  </div>
);

export const JobDetailSkeleton = () => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <div className="skeleton-shimmer h-4 w-40 rounded-lg mb-6" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="skeleton-shimmer h-6 w-32 rounded-full" />
            <div className="skeleton-shimmer h-4 w-16 rounded-lg" />
          </div>
          <div className="skeleton-shimmer h-7 w-3/4 rounded-lg mb-6" />
          <div className="skeleton-shimmer h-16 w-full rounded-xl mb-6" />
          <div className="skeleton-shimmer h-3 w-full rounded-lg mb-2" />
          <div className="skeleton-shimmer h-3 w-full rounded-lg mb-2" />
          <div className="skeleton-shimmer h-3 w-2/3 rounded-lg" />
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="skeleton-shimmer w-12 h-12 rounded-full" />
            <div className="flex-1">
              <div className="skeleton-shimmer h-4 w-24 rounded-lg mb-2" />
              <div className="skeleton-shimmer h-3 w-16 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
