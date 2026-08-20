import { useEffect } from "react";

/**
 * Scroll-reveal: sets `data-revealed` on `[data-reveal]` when in view.
 * First scan is deferred until after hydration so SSR HTML still matches
 * the client tree (lazy routes like Contact hydrate after the root effect).
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
        const top = n.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.96) {
          n.setAttribute("data-revealed", "");
        } else {
          observer.observe(n);
        }
      }
    };

    let raf = 0;
    const scheduleScan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(scan);
      });
    };

    let started = false;
    let mo: MutationObserver | undefined;
    const start = () => {
      if (started) return;
      started = true;
      scheduleScan();
      mo = new MutationObserver(() => scheduleScan());
      mo.observe(document.body, { childList: true, subtree: true });
      window.addEventListener("scroll", scheduleScan, { passive: true });
      window.addEventListener("resize", scheduleScan, { passive: true });
    };

    // Root useEffect runs before lazy page components hydrate. Wait one
    // macrotask + a frame so Contact (and similar) can match SSR HTML first.
    let startTimer = window.setTimeout(() => {
      startTimer = 0;
      requestAnimationFrame(start);
    }, 150);

    const retryTimers = [400, 900, 1800].map((ms) => window.setTimeout(scheduleScan, ms));

    return () => {
      if (startTimer) window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      for (const t of retryTimers) window.clearTimeout(t);
      mo?.disconnect();
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      observer.disconnect();
    };
  }, [key, enabled]);
}
