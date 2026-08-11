import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_INTERVAL_MS, HERO_SLIDES, type HeroSlide } from "@/content/hero";
import { useI18n } from "@/i18n";

function Cta({
  cta,
  className,
}: {
  cta: NonNullable<HeroSlide["primary"]>;
  className?: string;
}) {
  if (cta.variant === "outline") {
    return (
      <Link to={cta.to} className={`btn-outline-light ${className ?? ""}`}>
        {cta.label}
      </Link>
    );
  }
  return (
    <Link
      to={cta.to}
      className={`btn-base border border-white/30 bg-white/15 text-white hover:bg-white/25 ${className ?? ""}`}
    >
      {cta.label}
    </Link>
  );
}

function SlideBody({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const media = (
    <div className={`relative overflow-hidden ${active ? "intro-img" : ""}`}>
      {slide.videoUrl ? (
        <video
          className="h-56 w-full object-cover sm:h-80 lg:h-full lg:min-h-[420px]"
          src={slide.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-label={slide.alt}
        />
      ) : slide.image ? (
        <img
          src={slide.image}
          alt={slide.alt ?? ""}
          width={1600}
          height={776}
          loading={active ? "eager" : "lazy"}
          fetchPriority={active ? "high" : "auto"}
          decoding="async"
          className="h-56 w-full object-cover sm:h-80 lg:h-full lg:min-h-[420px]"
        />
      ) : null}
    </div>
  );

  const copy = (
    <div className="container-wbc !mx-0 !max-w-none py-14 pb-24 lg:ms-auto lg:max-w-[640px] lg:py-28">
      <div className="lg:max-w-[560px]">
        <p className={`${active ? "intro-1" : ""} font-display text-[13px] font-normal tracking-[0.14em] text-white/90 uppercase`}>
          {slide.eyebrow}
        </p>
        <h1 className={`${active ? "intro-2" : ""} mt-3 text-[30px] leading-[1.12] font-bold text-white sm:text-4xl lg:text-[42px]`}>
          {slide.title.map((t, k) => (
            <span key={k} className="block">
              {t}
            </span>
          ))}
        </h1>
        <p className={`${active ? "intro-3" : ""} mt-5 max-w-md text-[15px] leading-relaxed text-white/85`}>
          {slide.description}
        </p>
        <div className={`${active ? "intro-4" : ""} mt-8 flex flex-wrap gap-3`}>
          <Cta cta={slide.primary} />
          {slide.secondary ? <Cta cta={slide.secondary} /> : null}
        </div>
      </div>
    </div>
  );

  if (slide.layout === "full") {
    return (
      <div className={`relative min-h-[420px] lg:min-h-[560px] ${slide.panelClass}`}>
        <div className="absolute inset-0">{media}</div>
        <div className="absolute inset-0 bg-navy/55" aria-hidden="true" />
        <div className="relative flex min-h-[420px] items-end lg:min-h-[560px]">{copy}</div>
      </div>
    );
  }

  if (slide.layout === "media") {
    return (
      <div className={`grid min-h-[420px] lg:min-h-[560px] lg:grid-cols-[1.1fr_0.9fr] ${slide.panelClass}`}>
        {media}
        {copy}
      </div>
    );
  }

  // split | half-color (default): text panel + image
  return (
    <div className={`${slide.panelClass} grid h-full min-h-[420px] lg:min-h-[560px] lg:grid-cols-[1fr_1fr]`}>
      {copy}
      {media}
    </div>
  );
}

export function HeroSlider() {
  const { dir } = useI18n();
  const slides = HERO_SLIDES;
  const n = slides.length;
  // Track includes a clone of the first slide at the end for seamless L→R wrap.
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (i: number) => {
      setAnimate(true);
      setIndex(((i % n) + n) % n);
    },
    [n],
  );

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((v) => v + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, HERO_INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, next]);

  useEffect(() => {
    if (index !== n) return;
    const id = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 720);
    return () => window.clearTimeout(id);
  }, [index, n]);

  const trackSlides = [...slides, slides[0]];
  const visualIndex = index === n ? 0 : index;

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
      <div dir="ltr">
        <div
          className={`flex items-stretch ${animate ? "transition-transform duration-700 ease-out" : ""}`}
          style={{
            transform: `translateX(-${index * (100 / trackSlides.length)}%)`,
            width: `${trackSlides.length * 100}%`,
          }}
          onTransitionEnd={() => {
            if (index === n) {
              setAnimate(false);
              setIndex(0);
            }
          }}
        >
          {trackSlides.map((s, i) => {
            const active = i === index || (index === n && i === 0);
            return (
              <div
                key={`${s.id}-${i}`}
                dir={dir}
                role="group"
                aria-roledescription="slide"
                aria-label={`${(i % n) + 1} of ${n}`}
                aria-hidden={!active}
                inert={!active}
                className="w-full shrink-0"
                style={{ flex: "0 0 auto", width: `${100 / trackSlides.length}%` }}
              >
                <SlideBody slide={s} active={active} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-4 start-0 z-10 lg:bottom-8">
        <div className="container-wbc flex items-center">
          <div className="flex items-center gap-3 rounded-full bg-navy-dark/40 px-3.5 py-2 backdrop-blur-sm">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === visualIndex}
                className={`size-2.5 rounded-full border border-white transition-colors ${
                  i === visualIndex ? "bg-white" : "bg-white/20 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
