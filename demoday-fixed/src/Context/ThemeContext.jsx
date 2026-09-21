import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const LANG_CYCLE = ["UZ", "RU", "EN"];

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [lang, setLang] = useState(
    () => localStorage.getItem("appLang") || "UZ",
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const setLanguage = (next) => setLang(next);
  const cycleLanguage = () =>
    setLang((prev) => {
      const idx = LANG_CYCLE.indexOf(prev);
      return LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
    });

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleDarkMode, lang, setLanguage, cycleLanguage }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
