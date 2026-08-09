import { useEffect, useRef, useState } from "react";
import { LANGUAGES, useI18n } from "@/i18n";

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex size-9 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-orange hover:text-orange"
      >
        <GlobeIcon />
        <span className="sr-only">{current.name}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("lang.label")}
          className="absolute end-0 top-[calc(100%+10px)] z-[60] max-h-[70vh] w-64 overflow-y-auto border border-line bg-background py-2 shadow-[0_18px_50px_-12px_rgba(16,32,64,0.28)]"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-4 px-4 py-2.5 text-start transition-colors ${
                  active ? "bg-orange/10" : "hover:bg-light-grey"
                }`}
              >
                <span
                  className={`inline-flex h-8 min-w-9 items-center justify-center px-1.5 text-[13px] font-bold tracking-wide ${
                    active ? "bg-orange/15 text-orange" : "bg-light-grey text-navy"
                  }`}
                >
                  {l.badge}
                </span>
                <span
                  className={`text-[16px] font-medium ${active ? "text-orange" : "text-navy"}`}
                  dir={l.dir}
                >
                  {l.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
