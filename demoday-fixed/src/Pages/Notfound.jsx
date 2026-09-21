import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-emerald-500 mb-2">404</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Sahifa topilmadi
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default Notfound;
