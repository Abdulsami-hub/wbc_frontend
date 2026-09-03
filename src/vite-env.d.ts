/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  /** Canonical public site origin, e.g. https://wbccme.org */
  readonly VITE_SITE_URL?: string;
  /** Google reCAPTCHA v2 site key (public) */
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
