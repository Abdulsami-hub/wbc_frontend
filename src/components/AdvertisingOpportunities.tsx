import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import eventsImg from "@/assets/events.jpg";
import forumImg from "@/assets/news-forum.jpg";
import membershipImg from "@/assets/membership.jpg";

const OPPORTUNITIES = [
  {
    title: "Event sponsorship",
    body: "Position your brand beside summits, forums, and trade programmes attended by institutional and corporate leaders.",
    kicker: "Visibility",
    image: eventsImg,
    alt: "Business audience at a WBC sponsored programme",
  },
  {
    title: "Digital & print features",
    body: "Reach members and partners through newsletters, web features, and campaign placements across the WBC network.",
    kicker: "Reach",
    image: forumImg,
    alt: "International business forum stage and audience",
  },
  {
    title: "Partnership packages",
    body: "Build multi-touch visibility with tailored packages spanning events, content, and network introductions.",
    kicker: "Growth",
    image: membershipImg,
    alt: "Professionals collaborating in a WBC partnership setting",
  },
] as const;

const AUTO_MS = 5000;

/**
 * Lightweight carousel without Embla — Embla's MutationObserver reInit path
 * contributed to production freezes when other page DOM changed (forms/modals).
 */
export function AdvertisingOpportunities() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % OPPORTUNITIES.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);
  const current = OPPORTUNITIES[index]!;

  return (
    <section
      id="advertising"
      className="relative isolate border-t border-line bg-surface px-5 py-10 sm:px-8 sm:py-12 lg:py-16"
      aria-roledescription="carousel"
      aria-label="Advertising opportunities"
    >
      <div
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-card border border-line bg-background shadow-card"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) resume();
        }}
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden bg-navy-deep">
            {OPPORTUNITIES.map((o, i) => (
              <div
                key={o.title}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === index ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <img
                  src={o.image}
                  alt={i === index ? o.alt : ""}
                  width={1400}
                  height={900}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-left"
                />
              </div>
            ))}
            <div
              className="absolute inset-0 z-[2] bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy/25 lg:bg-gradient-to-r lg:from-navy-deep/90 lg:via-navy-deep/40 lg:to-transparent rtl:lg:bg-gradient-to-l"
              aria-hidden="true"
            />
            <div className="relative z-[3] flex h-full flex-col justify-end p-5 sm:p-7 lg:p-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/75 uppercase sm:text-[12px]">
                Grow with WBC
              </p>
              <h2 className="mt-2 max-w-md text-[24px] font-bold leading-tight text-white sm:text-[30px] lg:text-[32px]">
                Advertising Opportunities
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/85 sm:text-[14px] lg:mt-3">
                Connect your organisation with decision-makers through sponsorships, features, and partnership packages.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center border-line px-6 py-7 sm:px-10 lg:aspect-video lg:overflow-hidden lg:border-s lg:px-10 lg:py-6 xl:px-12">
            <div className="mb-4 flex items-end justify-between gap-4 lg:mb-5">
              <div>
                <p className="text-[12px] font-bold tracking-[0.18em] text-muted-fg uppercase">Ways to partner</p>
                <p className="mt-1.5 text-[14px] text-muted-fg sm:text-[15px]">
                  <span className="font-bold text-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-line">/</span>
                  <span className="tabular-nums">{String(OPPORTUNITIES.length).padStart(2, "0")}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + OPPORTUNITIES.length) % OPPORTUNITIES.length)}
                  className="flex size-10 items-center justify-center border border-line bg-background text-foreground transition-colors hover:border-navy hover:bg-navy hover:text-white"
                  aria-label="Previous opportunity"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % OPPORTUNITIES.length)}
                  className="flex size-10 items-center justify-center border border-line bg-background text-foreground transition-colors hover:border-navy hover:bg-navy hover:text-white"
                  aria-label="Next opportunity"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <article className="pe-2">
              <span className="font-display text-[40px] leading-none font-bold text-blue/25 tabular-nums sm:text-[48px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[12px] font-bold tracking-[0.18em] text-blue uppercase">{current.kicker}</p>
              <h3 className="mt-1.5 text-[20px] font-bold tracking-tight text-foreground sm:text-[24px]">{current.title}</h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-fg sm:text-[15px]">{current.body}</p>
            </article>

            <div className="mt-5 flex items-center gap-3 lg:mt-6">
              {OPPORTUNITIES.map((o, i) => (
                <button
                  key={o.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1 flex-1 transition-colors ${i === index ? "bg-orange" : "bg-line hover:bg-navy/30"}`}
                  aria-label={`Go to ${o.title}`}
                />
              ))}
            </div>

            <div className="mt-5 lg:mt-6">
              <Link to="/advertising" className="btn-orange-to-outline !min-h-9 !rounded-md !px-4 !text-[12px]">
                Enquire about advertising
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
