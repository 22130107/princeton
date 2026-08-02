"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LANG,
  dictionaries,
  LANG_COOKIE,
  parseLang,
  translate,
  type Lang,
  type TDict,
} from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dict: TDict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookieLang(): Lang {
  if (typeof document === "undefined") return DEFAULT_LANG;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LANG_COOKIE}=`));
  return parseLang(match ? match.split("=")[1] : undefined);
}

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang ?? DEFAULT_LANG);

  useEffect(() => {
    setLangState(readCookieLang());
  }, []);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      setLangState(next);
      router.refresh();
    },
    [lang, router]
  );

  const dict = dictionaries[lang];

  const value: LanguageContextValue = {
    lang,
    setLang,
    dict,
    t: useCallback((key: string) => translate(dict, key), [dict]),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
