import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANG, LANGUAGES, STORAGE_KEY, type LangCode } from "./languages";
import { DICTIONARIES, type TranslationKey } from "./dictionary";

type I18nValue = {
  lang: LangCode;
  dir: "ltr" | "rtl";
  setLang: (code: LangCode) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) setLangState(stored);
  }, []);

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  // DOM-wide translation disabled — walking document.body froze Contact/modals in production.
  // Nav/UI strings still use t(); full-page maps can be re-enabled later with a safer strategy.

  const t = useCallback(
    (key: TranslationKey) => DICTIONARIES[lang][key] ?? DICTIONARIES.en[key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export { LANGUAGES } from "./languages";
export type { LangCode } from "./languages";
export type { TranslationKey } from "./dictionary";
