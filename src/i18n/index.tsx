import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANG, LANGUAGES, STORAGE_KEY, type LangCode } from "./languages";
import { DICTIONARIES, type TranslationKey } from "./dictionary";
import { applyDocumentTranslation, loadMap } from "./dom-translate";

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

  useEffect(() => {
    // English strings are rendered via t(); skip the synchronous body DOM walk.
    if (lang === "en") return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let idle = 0;

    loadMap(lang).then((map) => {
      if (cancelled || !map) return;
      const run = () => {
        if (cancelled) return;
        cleanup = applyDocumentTranslation(map);
      };
      // Idle scheduling keeps input focus / modal open responsive during translation.
      if (typeof requestIdleCallback === "function") {
        idle = requestIdleCallback(run, { timeout: 2000 });
      } else {
        idle = window.setTimeout(run, 0) as unknown as number;
      }
    });

    return () => {
      cancelled = true;
      if (typeof cancelIdleCallback === "function" && idle) cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, [lang]);

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
