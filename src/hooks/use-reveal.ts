import { useEffect } from "react";

/**
 * Scroll-reveal: sets `data-revealed` on `[data-reveal]` when in view.
 * Rescans after navigation and when lazy route chunks mount so content
 * is not left invisible until a hard refresh.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealAll = () => {
      for (const n of document.querySelectorAll("[data-reveal]")) {
        n.setAttribute("data-revealed", "");
      }
    };

    if (typeof IntersectionObserver === "undefined" || reduced) {
      revealAll();
      const t = window.setTimeout(revealAll, 300);
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
      for (const n of document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-observed])")) {
        n.setAttribute("data-observed", "");
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

    scheduleScan();
    const retryTimers = [50, 150, 350, 800, 1600].map((ms) => window.setTimeout(scheduleScan, ms));

    const mo = new MutationObserver(() => scheduleScan());
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", scheduleScan, { passive: true });
    window.addEventListener("resize", scheduleScan, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      for (const t of retryTimers) window.clearTimeout(t);
      mo.disconnect();
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      observer.disconnect();
    };
  }, [key]);
}
