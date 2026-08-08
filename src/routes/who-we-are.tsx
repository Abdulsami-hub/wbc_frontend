import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroBuilding from "@/assets/who-we-are-building.webp.asset.json";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — World Business Council" },
      {
        name: "description",
        content:
          "The World Business Council is an international business support organization built on trust, connection, cooperation, and long-term growth for businesses worldwide.",
      },
      { property: "og:title", content: "Who We Are — World Business Council" },
      {
        property: "og:description",
        content: "Our story, vision, mission, and the six core values that guide the WBC network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhoWeAre,
});

const TAGS = ["Trust", "Connection", "Global Reach"] as const;

const VALUES = [
  { title: "Inclusivity", body: "Embracing diversity and valuing different perspectives.", icon: "users" },
  { title: "Collaboration", body: "Connecting people and businesses to create shared success.", icon: "link" },
  { title: "Innovation", body: "Encouraging creativity and forward-thinking solutions.", icon: "spark" },
  { title: "Integrity & Excellence", body: "Upholding ethics, transparency, and high standards.", icon: "shield" },
  { title: "Sustainable Development", body: "Promoting responsible growth for a better future.", icon: "leaf" },
  { title: "Global Citizenship", body: "Supporting positive impact on communities and the world.", icon: "globe" },
] as const;

function ValueIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true } as const;
  switch (name) {
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 6.5a3 3 0 0 1 0 5.6M17 19c0-2.2-1-3.8-2.5-4.6" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7L11 6.8" />
          <path d="M14 10.5a4 4 0 0 0-5.7 0L6 12.8a4 4 0 0 0 5.7 5.7l1.3-1.3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M18 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
          <path d="M9 12l2.2 2.2L15.5 10" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5.5-12 15-12 0 9-4.5 13-11 13H5z" />
          <path d="M9 19c1.5-4 4-6.5 7.5-8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
  }
}

function ValuesOrbit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % VALUES.length), 3000);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = VALUES[active] ?? VALUES[0];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div
        data-reveal
        className="relative mx-auto aspect-square w-full max-w-[420px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="absolute inset-[9%] rounded-full border border-line" aria-hidden="true" />
        <span className="absolute inset-[22%] rounded-full border border-dashed border-orange/25" aria-hidden="true" />

        <div className="orbit-spin absolute inset-0" style={{ animationPlayState: paused ? "paused" : "running" }}>
          {VALUES.map((v, i) => {
            const angle = (360 / VALUES.length) * i;
            return (
              <button
                key={v.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={v.title}
                aria-current={i === active}
                className="absolute left-1/2 top-1/2 size-0"
                style={{ transform: `rotate(${angle}deg) translate(0, -46%) translate(0, -${0}px)` }}
              >
                <span
                  className="orbit-counter absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(-${angle}deg)`, animationPlayState: paused ? "paused" : "running" }}
                >
                  <span
                    className={`flex size-14 items-center justify-center rounded-full border bg-background shadow-card transition-colors ${
                      i === active ? "border-orange text-orange" : "border-line text-navy"
                    }`}
                  >
                    <ValueIcon name={v.icon} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="absolute left-1/2 top-1/2 flex size-[46%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-center shadow-card">
          <span className="px-4">
            <span className="block text-[13px] font-semibold tracking-[0.18em] text-white/70 uppercase">Our</span>
            <span className="block text-[22px] font-bold text-white">Values</span>
          </span>
        </div>
      </div>

      <div>
        <p data-reveal className="eyebrow">Core Values</p>
        <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-navy lg:text-[36px]">
          Six principles of WBC.
        </h2>
        <span data-reveal className="accent-rule mt-4" />
        <div key={current.title} className="fade-up mt-8 rounded-card border border-line bg-background p-7 shadow-card">
          <h3 className="text-[20px] font-bold text-navy">{current.title}</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-muted-fg">{current.body}</p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {VALUES.map((v, i) => (
            <li key={v.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                  i === active ? "border-orange bg-orange text-orange-foreground" : "border-line text-navy hover:border-orange/50"
                }`}
              >
                {v.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WhoWeAre() {
  return (
    <>
      <section className="grid items-stretch lg:grid-cols-2">
        <div className="flex items-center bg-orange px-6 py-16 sm:px-10 lg:py-24">
          <div className="mx-auto w-full max-w-xl">
            <nav aria-label="Breadcrumb" className="intro-1 mb-6 text-[14px] text-white/80">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="transition-colors hover:text-navy">Home</Link>
                </li>
                <li aria-hidden="true" className="text-white/60">/</li>
                <li>
                  <Link to="/about" className="transition-colors hover:text-navy">About Us</Link>
                </li>
                <li aria-hidden="true" className="text-white/60">/</li>
                <li className="font-semibold text-white">Who We Are</li>
              </ol>
            </nav>
            <h1 className="intro-2 text-[38px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[52px] lg:text-[60px]">
              The World Business Council
            </h1>
            <p className="intro-3 mt-7 max-w-lg text-[17px] leading-relaxed text-white/95 sm:text-[19px]">
              An international business support organization built on trust, connection, cooperation, and long-term
              growth for businesses, professionals, and institutions worldwide.
            </p>
            <ul className="intro-4 mt-9 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="border border-white/70 px-4 py-2 text-[13px] font-bold tracking-[0.14em] text-white uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <img
          src={heroBuilding.url}
          alt="Modern glass office building under a clear sky"
          width={1600}
          height={1000}
          fetchPriority="high"
          decoding="async"
          className="intro-img h-72 w-full object-cover sm:h-96 lg:h-auto"
        />
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wbc grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <div data-reveal className="rounded-card border border-line bg-background p-7 shadow-card lg:p-12">
            <p className="text-[14px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Who We Are</p>
            <p className="mt-7 text-justify text-[17px] leading-[1.9] text-navy/90">
              The World Business Council (WBC) is an international business support organization headquartered in Paris,
              built on a simple belief: behind every business is a person, an idea, and the ambition to create something
              meaningful. We bring businesses, entrepreneurs, professionals, and organizations closer together, helping
              them find the right connections, knowledge, support, and opportunities to move forward. Through our
              international network, WBC turns connections into cooperation, ideas into action, and business
              relationships into lasting opportunities for growth.
            </p>
            <p className="mt-7 text-justify text-[17px] leading-[1.9] text-navy/90">
              We believe that no business should have to grow alone — and that meaningful connections are built on trust.
              Behind every successful partnership is the confidence to share an idea, open a door, take a chance, and
              move forward together. WBC works to create an environment where people and businesses can connect with
              confidence, build trusted relationships, and turn those relationships into meaningful opportunities,
              lasting cooperation, and shared progress across borders.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <article data-reveal className="rounded-card border border-line bg-background p-7 shadow-card">
              <p className="text-[14px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Our Vision</p>
              <p className="mt-4 text-[17px] leading-relaxed text-navy/90">
                To be the global hub of business excellence, with a local presence in every city, empowering and uniting
                businesses worldwide through innovation, collaboration, and sustainable development.
              </p>
            </article>
            <article data-reveal className="rounded-card border border-line bg-background p-7 shadow-card">
              <p className="text-[14px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Our Mission</p>
              <p className="mt-4 text-[17px] leading-relaxed text-navy/90">
                We build a global network that empowers businesses through collaboration, innovation, and trust.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <div className="container-wbc">
          <ValuesOrbit />
        </div>
      </section>
    </>
  );
}
