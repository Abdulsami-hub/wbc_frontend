import { useEffect } from "react";

/**
 * Lightweight scroll-reveal: adds `.is-revealed` to any `[data-reveal]` element
 * when it enters the viewport. No dependencies, one shared IntersectionObserver,
 * and a no-op when the user prefers reduced motion.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      for (const n of nodes) n.setAttribute("data-revealed", "");
      return;
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

    for (const n of nodes) {
      if (n.getBoundingClientRect().top < window.innerHeight * 0.9) {
        n.setAttribute("data-revealed", "");
      } else {
        observer.observe(n);
      }
    }

    return () => observer.disconnect();
  }, [key]);
}
