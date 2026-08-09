export type LangCode = "en" | "fr" | "es" | "de" | "ar" | "zh" | "it" | "tr" | "pt" | "ru";

export type Language = {
  code: LangCode;
  badge: string;
  name: string;
  dir: "ltr" | "rtl";
};

export const LANGUAGES: Language[] = [
  { code: "en", badge: "EN", name: "English", dir: "ltr" },
  { code: "fr", badge: "FR", name: "Français", dir: "ltr" },
  { code: "es", badge: "ES", name: "Español", dir: "ltr" },
  { code: "de", badge: "DE", name: "Deutsch", dir: "ltr" },
  { code: "ar", badge: "AR", name: "العربية", dir: "rtl" },
  { code: "zh", badge: "ZH", name: "中文", dir: "ltr" },
  { code: "it", badge: "IT", name: "Italiano", dir: "ltr" },
  { code: "tr", badge: "TR", name: "Türkçe", dir: "ltr" },
  { code: "pt", badge: "PT", name: "Português", dir: "ltr" },
  { code: "ru", badge: "RU", name: "Русский", dir: "ltr" },
];

export const DEFAULT_LANG: LangCode = "en";
export const STORAGE_KEY = "wbc-lang";
