import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const ThemeContext = createContext(null);

const LANG_CYCLE = ["UZ", "RU", "EN"];

// ✅ localStorage xatoliklariga qarshi xavfsiz yordamchi funksiyalar
function safeGetItem(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode yoki storage bloklangan — jimgina o'tib ketamiz
  }
}

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => safeGetItem("theme") === "dark",
  );
  const [lang, setLang] = useState(() => {
    const saved = safeGetItem("appLang");
    if (saved && typeof saved === "string") {
      const upper = saved.toUpperCase();
      if (LANG_CYCLE.includes(upper)) return upper;
    }
    return "UZ";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    safeSetItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    safeSetItem("appLang", lang);
  }, [lang]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const setLanguage = (next) => setLang(next);
  const cycleLanguage = () =>
    setLang((prev) => {
      const idx = LANG_CYCLE.indexOf(prev);
      return LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
    });

  // ✅ useMemo — Provider value har render'da yangi object yaratmasligini oldini oladi
  const value = useMemo(
    () => ({ darkMode, toggleDarkMode, lang, setLanguage, cycleLanguage }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkMode, lang],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme() faqat <ThemeProvider> ichida ishlatilishi mumkin!");
  }
  return ctx;
};
