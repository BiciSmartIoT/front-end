"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import es from "../messages/es.json";
import en from "../messages/en.json";

type Lang = "es" | "en";

const messages = { es, en };

type ContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof es;
};

const LangContext =
  createContext<ContextType | null>(
    null
  );

export function LangProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] =
    useState<Lang>("es");

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "lang"
      ) as Lang | null;

    if (
      saved === "es" ||
      saved === "en"
    ) {
      setLangState(saved);
    }
  }, []);

  const setLang = (next: Lang) => {
    localStorage.setItem(
      "lang",
      next
    );

    setLangState(next);
  };

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        t: messages[lang],
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context =
    useContext(LangContext);

  if (!context) {
    throw new Error(
      "useLang debe usarse dentro de LangProvider"
    );
  }

  return context;
}