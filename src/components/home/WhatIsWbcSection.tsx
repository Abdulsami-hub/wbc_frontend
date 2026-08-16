import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";

const STATS = [
  { value: "Paris", label: "Global headquarters" },
  { value: "2026", label: "Founded" },
  { value: "Worldwide", label: "Council network" },
] as const;

export function WhatIsWbcSection() {
  return (
    <section className="border-t border-line bg-surface/30 py-16 lg:py-24">
      <div className="container-wbc">
        <SectionHeading
          align="left"
          eyebrow="About WBC"
          title="What is WBC?"
          description="An international business support organization connecting people, ideas, and ambition across borders."
        />

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <div data-reveal className="flex min-h-0 flex-col">
            <div className="relative flex-1 overflow-hidden rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
              <span className="absolute start-0 top-0 h-full w-1 bg-orange" aria-hidden="true" />
              <p className="text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
                The World Business Council (WBC) is an international business support organization headquartered in Paris,
                built on a simple belief: behind every business is a person, an idea, and the ambition to create something
                meaningful. We bring businesses, entrepreneurs, professionals, and organizations closer together, helping
                them find the right connections, knowledge, support, and opportunities to move forward. Through our
                international network, WBC turns connections into cooperation, ideas into action, and business
                relationships into lasting opportunities for growth.
              </p>
              <p className="mt-6 text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
                We believe that no business should have to grow alone—and that meaningful connections are built on trust.
                Behind every successful partnership is the confidence to share an idea, open a door, take a chance, and
                move forward together. WBC works to create an environment where people and businesses can connect with
                confidence, build trusted relationships, and turn those relationships into meaningful opportunities,
                lasting cooperation, and shared progress.
              </p>
            </div>
          </div>

          <div data-reveal data-reveal-group className="flex flex-col gap-5 sm:gap-6">
            <article className="group relative flex flex-1 flex-col overflow-hidden rounded-card bg-navy p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
              <span
                className="pointer-events-none absolute -end-12 -top-12 size-44 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <span
                className="relative inline-flex size-12 items-center justify-center rounded-md bg-white/10 text-white"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.6" />
                </svg>
              </span>
              <p className="relative mt-6 text-[12px] font-bold tracking-[0.2em] text-white/70 uppercase">Our Vision</p>
              <p className="relative mt-4 flex-1 text-[16px] leading-relaxed text-white sm:text-[17px]">
                To be the global hub of business excellence, with a local presence in every city, empowering and uniting
                businesses worldwide through innovation, collaboration, and sustainable development.
              </p>
            </article>

            <article className="group relative flex flex-1 flex-col overflow-hidden rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
              <span
                className="pointer-events-none absolute -end-12 -top-12 size-44 rounded-full bg-teal/15 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <span
                className="relative inline-flex size-12 items-center justify-center rounded-md bg-orange/10 text-foreground"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="8.5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
                </svg>
              </span>
              <p className="relative mt-6 text-[12px] font-bold tracking-[0.2em] text-foreground uppercase">Our Mission</p>
              <p className="relative mt-4 flex-1 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                We build a global network that empowers businesses through collaboration, innovation, and trust.
              </p>
            </article>
          </div>
        </div>

        <dl
          data-reveal
          className="mt-10 grid grid-cols-3 gap-4 rounded-card border border-line bg-background px-5 py-6 sm:gap-6 sm:px-8 sm:py-7 lg:max-w-xl"
        >
          {STATS.map((s) => (
            <div key={s.label} className="min-w-0">
              <dt className="text-[20px] font-bold text-foreground sm:text-[22px]">{s.value}</dt>
              <dd className="mt-1 text-[11px] leading-snug tracking-[0.06em] text-muted-fg uppercase sm:text-[12px]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-8">
          <Link to="/who-we-are" className="card-link">
            Learn more about WBC
            <span aria-hidden="true" className="card-link-arrow rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
