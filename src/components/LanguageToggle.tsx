"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "pisos-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "es";
    }

    const stored = window.localStorage.getItem(storageKey);
    return stored === "en" || stored === "es" ? stored : "es";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.dataset.language = language;
    window.localStorage.setItem(storageKey, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState
    }),
    [language]
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

export function Lang({ es, en }: { es: React.ReactNode; en: React.ReactNode }) {
  const { language } = useLanguage();

  return <>{language === "en" ? en : es}</>;
}

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div className="language-switch" aria-label="Language switch">
      <button
        type="button"
        className={!isEnglish ? "is-active" : undefined}
        aria-pressed={!isEnglish}
        onClick={() => setLanguage("es")}
      >
        ES
      </button>
      <button
        type="button"
        className={isEnglish ? "is-active" : undefined}
        aria-pressed={isEnglish}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
