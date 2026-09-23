import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * BackToTop — sahifa 400px pastga tushganda chiquvchi "Yuqoriga" tugmasi.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer animate-toast-in"
      aria-label="Yuqoriga qaytish"
      title="Sahifa boshiga"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
