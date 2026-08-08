import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import slide1 from "@/assets/hero-slide-1.webp.asset.json";
import slide2 from "@/assets/hero-slide-2.webp.asset.json";
import slide3 from "@/assets/hero-slide-3.webp.asset.json";

type Slide = {
  eyebrow: string;
  title: string[];
  description: string;
  image: string;
  alt: string;
  panel: string;
  secondary: { label: string; to: string; className: string };
};

const SLIDES: Slide[] = [
  {
    eyebrow: "World Business Council",
    title: ["Connecting Businesses.", "Creating Opportunities"],
    description: "Building a global network that empowers businesses through collaboration, innovation, and trust.",
    image: slide1.url,
    alt: "Modern glass business centre at dusk with people in the plaza",
    panel: "bg-navy",
    secondary: { label: "What We Do", to: "/global-network", className: "bg-white/10 text-orange border border-white/25" },
  },
  {
    eyebrow: "World Business Council",
    title: ["Our Mission"],
    description: "Building a global network that empowers businesses through collaboration, innovation, and trust.",
    image: slide2.url,
    alt: "Haussmannian Paris boulevard at dusk",
    panel: "bg-teal",
    secondary: { label: "Join WBC", to: "/membership", className: "bg-white/15 text-white border border-white/30" },
  },
  {
    eyebrow: "World Business Council",
    title: ["Connecting Businesses.", "Creating Opportunities"],
    description: "Building a global network that empowers businesses through collaboration, innovation, and trust.",
    image: slide3.url,
    alt: "Business professionals networking in front of a city skyline at sunset",
    panel: "bg-orange",
    secondary: { label: "What We Do", to: "/global-network", className: "bg-white/20 text-navy border border-white/30" },
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((v) => (v + 1) % SLIDES.length), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      aria-label="Highlights"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={!active}
            className={`${active ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"} transition-opacity duration-700 ease-out`}
          >
            <div className={`${s.panel} grid lg:grid-cols-[1fr_1fr]`}>
              <div className="container-wbc !mx-0 !max-w-none py-14 lg:ml-auto lg:max-w-[640px] lg:py-28">
                <div className="lg:max-w-[560px]">
                  <p
                    className={`${active ? "intro-1" : ""} text-[13px] font-semibold tracking-[0.22em] text-white/90 uppercase`}
                  >
                    {s.eyebrow}
                  </p>
                  <h1
                    className={`${active ? "intro-2" : ""} mt-3 text-[30px] leading-[1.12] font-bold text-white sm:text-4xl lg:text-[42px]`}
                  >
                    {s.title.map((t, k) => (
                      <span key={k} className="block">
                        {t}
                      </span>
                    ))}
                  </h1>
                  <p className={`${active ? "intro-3" : ""} mt-5 max-w-md text-[14px] leading-relaxed text-white/85`}>
                    {s.description}
                  </p>
                  <div className={`${active ? "intro-4" : ""} mt-8 flex flex-wrap gap-3`}>
                    <Link to="/about" className="btn-outline-light">
                      Who We Are
                    </Link>
                    <Link to={s.secondary.to} className={`btn-base ${s.secondary.className}`}>
                      {s.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>

              <div className={active ? "intro-img" : ""}>
                <img
                  src={s.image}
                  alt={s.alt}
                  width={1600}
                  height={776}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="h-56 w-full object-cover sm:h-80 lg:h-full lg:min-h-[420px]"
                />
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-4 left-0 z-10 lg:bottom-8">
        <div className="container-wbc flex items-center gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`size-2.5 rounded-full border border-white/70 transition-colors ${
                i === index ? "bg-white" : "bg-transparent hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
