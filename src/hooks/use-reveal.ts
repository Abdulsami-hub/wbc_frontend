import { useEffect } from "react";

/**
 * Scroll-reveal: sets `data-revealed` on `[data-reveal]` when in view.
 * No scroll/resize listeners — focusing inputs (mobile keyboard) or opening
 * dropdowns fired resize/scroll storms that froze Contact / Affiliates in production.
 */
export function useReveal(key?: string, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealAll = () => {
      for (const n of document.querySelectorAll("[data-reveal], [data-reveal-group]")) {
        n.setAttribute("data-revealed", "");
      }
    };

    if (typeof IntersectionObserver === "undefined" || reduced) {
      const t = window.setTimeout(revealAll, 150);
      return () => window.clearTimeout(t);
    }

    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );

    const scan = () => {
      for (const n of document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]")) {
        if (observed.has(n)) continue;
        observed.add(n);
        observer.observe(n);
      }
    };

    // Route-change scans only — never re-scan on scroll/resize (production freeze source).
    const startTimer = window.setTimeout(scan, 150);
    const retryTimers = [500, 1200, 2500].map((ms) => window.setTimeout(scan, ms));

    return () => {
      window.clearTimeout(startTimer);
      for (const t of retryTimers) window.clearTimeout(t);
      observer.disconnect();
    };
  }, [key, enabled]);
}
