import whoWeAre from "@/assets/who-we-are-building.png";
import { SectionHeading } from "@/components/SectionHeading";

export function WhatIsWbcSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wbc">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-h-0 flex-col">
            <SectionHeading align="left" title="What is WBC?" />
            <p
              data-reveal
              className="mt-6 rounded-card border border-line bg-background p-6 text-[16px] leading-relaxed text-muted-fg text-justify transition-shadow duration-300 hover:shadow-card sm:p-7"
            >
              The World Business Council (WBC) is an international business support organization headquartered in Paris,
              built on a simple belief: behind every business is a person, an idea, and the ambition to create something
              meaningful. We bring businesses, entrepreneurs, professionals, and organizations closer together, helping
              them find the right connections, knowledge, support, and opportunities to move forward. Through our
              international network, WBC turns connections into cooperation, ideas into action, and business
              relationships into lasting opportunities for growth.
            </p>

            <div data-reveal data-reveal-group className="mt-6 grid flex-1 gap-5 sm:grid-cols-2">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-navy p-6 transition-shadow duration-300 hover:shadow-card sm:p-7">
                <span
                  className="pointer-events-none absolute -end-10 -top-10 size-36 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                <span
                  className="relative inline-flex size-11 items-center justify-center rounded-md bg-white/10 text-white"
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                    <circle cx="12" cy="12" r="2.6" />
                  </svg>
                </span>
                <p className="relative mt-5 text-[12px] font-bold tracking-[0.2em] text-white/70 uppercase">Our Vision</p>
                <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-white sm:text-[16px]">
                  To be the global hub of business excellence, with a local presence in every city, empowering and
                  uniting businesses worldwide through innovation, collaboration, and sustainable development.
                </p>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card sm:p-7">
                <span
                  className="pointer-events-none absolute -end-10 -top-10 size-36 rounded-full bg-teal/15 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                <span
                  className="relative inline-flex size-11 items-center justify-center rounded-md bg-orange/10 text-foreground"
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="8.5" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
                  </svg>
                </span>
                <p className="relative mt-5 text-[12px] font-bold tracking-[0.2em] text-foreground uppercase">
                  Our Mission
                </p>
                <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                  Building a global network that empowers businesses through collaboration, innovation, and trust.
                </p>
              </article>
            </div>
          </div>

          <div data-reveal className="relative min-h-[300px] lg:min-h-full">
            <div className="absolute inset-0 overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
              <img
                src={whoWeAre}
                alt="Modern glass and concrete office building exterior against a blue sky"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
