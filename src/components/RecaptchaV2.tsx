import { useEffect, useId, useRef, useState } from "react";

const SCRIPT_ID = "google-recaptcha-v2";
const SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA failed to load")), {
        once: true,
      });
      if (window.grecaptcha) resolve();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });
}

export type RecaptchaV2Handle = {
  reset: () => void;
  getToken: () => string;
};

type RecaptchaV2Props = {
  siteKey: string;
  onChange: (token: string | null) => void;
  onReady?: (api: RecaptchaV2Handle) => void;
  className?: string;
  error?: string | undefined;
};

/**
 * Invisible-host Google reCAPTCHA v2 checkbox ("I'm not a robot").
 * Requires VITE_RECAPTCHA_SITE_KEY and matching domains in Google admin.
 */
export function RecaptchaV2({
  siteKey,
  onChange,
  onReady,
  className = "",
  error,
}: RecaptchaV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const onReadyRef = useRef(onReady);
  const [loadError, setLoadError] = useState("");
  const labelId = useId();

  onChangeRef.current = onChange;
  onReadyRef.current = onReady;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;
    const container = containerRef.current;

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !container || !window.grecaptcha) return;

        window.grecaptcha.ready(() => {
          if (cancelled || !container || !window.grecaptcha) return;
          if (widgetIdRef.current !== null) return;

          // Avoid double-render if React Strict Mode remounts quickly
          if (container.childElementCount > 0) {
            container.innerHTML = "";
          }

          widgetIdRef.current = window.grecaptcha.render(container, {
            sitekey: siteKey,
            callback: (token) => onChangeRef.current(token),
            "expired-callback": () => onChangeRef.current(null),
            "error-callback": () => onChangeRef.current(null),
          });

          onReadyRef.current?.({
            reset: () => {
              if (widgetIdRef.current !== null && window.grecaptcha) {
                window.grecaptcha.reset(widgetIdRef.current);
              }
              onChangeRef.current(null);
            },
            getToken: () => {
              if (widgetIdRef.current === null || !window.grecaptcha) return "";
              return window.grecaptcha.getResponse(widgetIdRef.current) || "";
            },
          });
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Security check could not load. Please refresh the page and try again.");
          onChangeRef.current(null);
        }
      });

    return () => {
      cancelled = true;
      // Google does not support destroy; clear DOM so remount can re-render
      container.innerHTML = "";
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  return (
    <div className={className}>
      <p id={labelId} className="sr-only">
        Complete the security check to prove you are not a robot
      </p>
      <div ref={containerRef} aria-labelledby={labelId} />
      {(error || loadError) && (
        <p className="mt-2 text-[14px] text-foreground" role="alert">
          {error || loadError}
        </p>
      )}
    </div>
  );
}

export function getRecaptchaSiteKey(): string {
  return (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined)?.trim() || "";
}
