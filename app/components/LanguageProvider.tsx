"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "fr" | "en";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("site-lang");
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
      document.documentElement.lang = stored;
      document.cookie = `site-lang=${stored}; path=/; max-age=31536000; samesite=lax`;
    }
  }, []);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    window.localStorage.setItem("site-lang", nextLang);
    document.documentElement.lang = nextLang;
    document.cookie = `site-lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
  };

  const toggleLang = () => {
    setLang(lang === "fr" ? "en" : "fr");
  };

  const value = useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
