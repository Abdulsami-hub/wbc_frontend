export type LangCode = "en" | "fr" | "es" | "ar" | "zh" | "ru";

export type Language = {
  code: LangCode;
  badge: string;
  name: string;
  dir: "ltr" | "rtl";
};

/** Six official UN languages — names shown in their own language. */
export const LANGUAGES: Language[] = [
  { code: "en", badge: "EN", name: "English", dir: "ltr" },
  { code: "fr", badge: "FR", name: "Français", dir: "ltr" },
  { code: "es", badge: "ES", name: "Español", dir: "ltr" },
  { code: "ar", badge: "AR", name: "العربية", dir: "rtl" },
  { code: "zh", badge: "ZH", name: "中文", dir: "ltr" },
  { code: "ru", badge: "RU", name: "Русский", dir: "ltr" },
];

export const DEFAULT_LANG: LangCode = "en";
export const STORAGE_KEY = "wbc-lang";
