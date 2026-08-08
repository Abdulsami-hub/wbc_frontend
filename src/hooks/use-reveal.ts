import { useEffect } from "react";

/**
 * Lightweight scroll-reveal: sets `data-revealed` on any `[data-reveal]` element
 * when it enters the viewport. One shared IntersectionObserver, no dependencies,
 * and an instant no-op when the user prefers reduced motion.
 *
 * A plain attribute (not a className) is used so React never sees a hydration
 * mismatch on elements it owns.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof IntersectionObserver === "undefined" || reduced) {
      const reveal = () => {
        for (const n of document.querySelectorAll("[data-reveal]")) n.setAttribute("data-revealed", "");
      };
      reveal();
      const t = window.setTimeout(reveal, 300);
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      for (const n of document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-observed])")) {
        n.setAttribute("data-observed", "");
        if (n.getBoundingClientRect().top < window.innerHeight * 0.92) {
          n.setAttribute("data-revealed", "");
        } else {
          observer.observe(n);
        }
      }
    };

    scan();
    // Route content can hydrate/mount a tick after this effect runs.
    const raf = requestAnimationFrame(scan);
    const timer = window.setTimeout(scan, 250);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [key]);
}
