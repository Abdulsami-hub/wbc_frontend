import { useEffect } from "react";

/**
 * Scroll-reveal: sets `data-revealed` on `[data-reveal]` when in view.
 * No MutationObserver — watching the whole document caused freezes when
 * dialogs, dropdowns, or form focus changed the DOM.
 */
export function useReveal(key?: string, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observed = new WeakSet<Element>();

    const revealAll = () => {
      for (const n of document.querySelectorAll("[data-reveal]")) {
        n.setAttribute("data-revealed", "");
      }
    };

    if (typeof IntersectionObserver === "undefined" || reduced) {
      const t = window.setTimeout(revealAll, 150);
      return () => window.clearTimeout(t);
    }

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
      for (const n of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        if (observed.has(n)) continue;
        observed.add(n);
        observer.observe(n);
      }
    };

    let debounce = 0;
    const scheduleScan = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(scan, 100);
    };

    // Initial scans after hydration / route change only.
    const startTimer = window.setTimeout(scan, 150);
    const retryTimers = [500, 1200].map((ms) => window.setTimeout(scan, ms));

    window.addEventListener("scroll", scheduleScan, { passive: true });
    window.addEventListener("resize", scheduleScan, { passive: true });

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(debounce);
      for (const t of retryTimers) window.clearTimeout(t);
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      observer.disconnect();
    };
  }, [key, enabled]);
}
