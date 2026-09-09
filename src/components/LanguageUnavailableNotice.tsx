import { useEffect, useState } from "react";
import type { Language } from "@/i18n/languages";

const REVERT_MS = 3000;

export function LanguageUnavailableNotice({
  language,
  onRevert,
}: {
  language: Language;
  onRevert: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const tick = window.setInterval(() => {
      setProgress(Math.min(100, ((Date.now() - started) / REVERT_MS) * 100));
    }, 50);
    const revert = window.setTimeout(onRevert, REVERT_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(revert);
    };
  }, [language.code, onRevert]);

  return (
    <div
      className="fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-[80] flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-line bg-background shadow-[0_18px_50px_-12px_rgba(16,32,64,0.28)]">
        <div className="px-4 py-3.5">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-muted-fg uppercase">
            Coming soon
          </p>
          <p className="mt-1.5 text-[15px] leading-snug text-foreground">
            <span dir={language.dir} lang={language.code} className="font-semibold">
              {language.name}
            </span>{" "}
            is not available on this site yet. Returning you to English.
          </p>
        </div>
        <div className="h-1 bg-light-grey" aria-hidden="true">
          <div
            className="h-full bg-navy transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
