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

function SlideCopy({ slide, active }: { slide: HeroSlide; active: boolean }) {
  return (
    <div className="max-w-[560px]">
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
  );
}

function SlideMedia({ slide, active }: { slide: HeroSlide; active: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${active ? "intro-img" : ""}`}>
      {slide.videoUrl ? (
        <video
          className="absolute inset-0 size-full object-cover"
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
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
    </div>
  );
}

function SlideBody({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const copyPanel = (
    <div className="flex flex-col justify-center py-10 pb-8 lg:py-28 lg:pb-28">
      <SlideCopy slide={slide} active={active} />
    </div>
  );

  if (slide.layout === "full") {
    return (
      <div className={`relative flex h-full min-h-0 flex-col lg:min-h-[560px] ${slide.panelClass}`}>
        <div className="absolute inset-0">
          <SlideMedia slide={slide} active={active} />
        </div>
        <div className="absolute inset-0 bg-navy/55" aria-hidden="true" />
        <div className="container-wbc relative flex min-h-0 flex-1 items-end lg:min-h-[560px]">
          {copyPanel}
        </div>
      </div>
    );
  }

  if (slide.layout === "media") {
    return (
      <div className={`relative flex h-full min-h-0 flex-col lg:min-h-[560px] ${slide.panelClass}`}>
        <div className="container-wbc grid min-h-inherit flex-1 lg:grid-cols-[1.1fr_0.9fr] lg:min-h-[560px]">
          <div className="relative min-h-[16rem] lg:min-h-0">
            <SlideMedia slide={slide} active={active} />
          </div>
          {copyPanel}
        </div>
      </div>
    );
  }

  // split | half-color (default): text panel + image
  return (
    <div className="relative flex h-full min-h-0 flex-col lg:block lg:min-h-[560px]">
      <div className={`absolute inset-y-0 start-0 hidden w-1/2 lg:block ${slide.panelClass}`} aria-hidden="true" />
      <div className={`shrink-0 ${slide.panelClass} lg:bg-transparent`}>
        <div className="container-wbc">{copyPanel}</div>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden lg:absolute lg:inset-y-0 lg:end-0 lg:w-1/2">
        <SlideMedia slide={slide} active={active} />
      </div>
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
      <div dir="ltr" className="h-[38rem] sm:h-[42rem] lg:h-auto lg:min-h-[560px]">
        <div
          className={`flex h-full items-stretch lg:h-auto ${animate ? "transition-transform duration-700 ease-out" : ""}`}
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
                className="flex h-full min-h-0 w-full shrink-0 flex-col lg:h-auto lg:min-h-[560px]"
                style={{ flex: "0 0 auto", width: `${100 / trackSlides.length}%` }}
              >
                <SlideBody slide={s} active={active} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-4 start-0 z-10 w-full lg:bottom-8">
        <div className="container-wbc">
            <div className="flex w-full items-center justify-center lg:w-1/2 lg:justify-start">
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
      </div>
    </section>
  );
}
