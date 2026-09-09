import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { LanguageUnavailableNotice } from "@/components/LanguageUnavailableNotice";
import {
  DEFAULT_LANG,
  LANGUAGES,
  STORAGE_KEY,
  isLanguageAvailable,
  type LangCode,
  type Language,
} from "./languages";
import { DICTIONARIES, type TranslationKey } from "./dictionary";
import { loadMap } from "./dom-translate";
import { translateValue } from "./translate-content";

function persistLang(code: LangCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
}

type TMap = Record<string, string>;

type I18nValue = {
  lang: LangCode;
  dir: "ltr" | "rtl";
  setLang: (code: LangCode) => void;
  t: (key: TranslationKey) => string;
  /** Translate API / hardcoded English using generated maps. */
  tx: (text: string) => string;
  map: TMap | null;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG);
  const [map, setMap] = useState<TMap | null>(null);
  const [unavailable, setUnavailable] = useState<Language | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (stored && isLanguageAvailable(stored)) {
      setLangState(stored);
      return;
    }
    if (stored && stored !== DEFAULT_LANG) persistLang(DEFAULT_LANG);
  }, []);

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    let cancelled = false;
    if (lang === "en") {
      setMap(null);
      return;
    }
    loadMap(lang).then((next) => {
      if (!cancelled) setMap(next);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const revertToDefault = useCallback(() => {
    setUnavailable(null);
    setLangState(DEFAULT_LANG);
    persistLang(DEFAULT_LANG);
  }, []);

  const setLang = useCallback(
    (code: LangCode) => {
      if (isLanguageAvailable(code)) {
        setUnavailable(null);
        setLangState(code);
        persistLang(code);
        return;
      }
      const selected = LANGUAGES.find((l) => l.code === code);
      if (selected) setUnavailable(selected);
    },
    [],
  );

  const t = useCallback(
    (key: TranslationKey) => DICTIONARIES[lang][key] ?? DICTIONARIES.en[key] ?? key,
    [lang],
  );

  const tx = useCallback(
    (text: string) => {
      if (!text || lang === "en" || !map) return text;
      return map[text.trim()] ?? text;
    },
    [lang, map],
  );

  const value = useMemo(() => ({ lang, dir, setLang, t, tx, map }), [lang, dir, setLang, t, tx, map]);

  return (
    <I18nContext.Provider value={value}>
      {children}
      {unavailable ? (
        <LanguageUnavailableNotice language={unavailable} onRevert={revertToDefault} />
      ) : null}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslatedContent<T>(value: T): T {
  const ctx = useContext(I18nContext);
  const lang = ctx?.lang ?? "en";
  const map = ctx?.map ?? null;
  return useMemo(() => {
    if (lang === "en" || !map) return value;
    return translateValue(value, map);
  }, [lang, map, value]);
}

export function useTranslatedQuery<TData>(
  options: UseQueryOptions<TData>,
): UseQueryResult<TData> {
  const result = useQuery(options);
  const data = useTranslatedContent(result.data);
  return { ...result, data };
}

export { LANGUAGES } from "./languages";
export type { LangCode } from "./languages";
export type { TranslationKey } from "./dictionary";
