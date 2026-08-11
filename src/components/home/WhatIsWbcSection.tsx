import { Link } from "@tanstack/react-router";
import whoWeAre from "@/assets/who-we-are-building.png";
import visionMissionBg from "@/assets/vision-mission-bg.jpg";
import { SectionHeading } from "@/components/SectionHeading";

export function WhatIsWbcSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wbc">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
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

            <div data-reveal data-reveal-group className="mt-6 grid gap-5 sm:grid-cols-2">
              <article className="rounded-card border border-line bg-surface/80 p-6 transition-shadow duration-300 hover:shadow-card">
                <h3 className="text-lg font-bold text-foreground">Vision</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg text-justify">
                  To be the global hub of business excellence, with a local presence in every city, empowering and
                  uniting businesses worldwide through innovation, collaboration, and sustainable development.
                </p>
              </article>
              <article className="rounded-card border border-line bg-surface/80 p-6 transition-shadow duration-300 hover:shadow-card">
                <h3 className="text-lg font-bold text-foreground">Mission</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg text-justify">
                  Building a global network that empowers businesses through collaboration, innovation, and trust.
                </p>
              </article>
            </div>
          </div>

          <div data-reveal className="relative">
            <div className="overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
              <img
                src={whoWeAre}
                alt="Modern glass and concrete office building exterior against a blue sky"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[3/4]"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-6 -end-4 hidden max-w-[220px] overflow-hidden rounded-card border border-white/70 shadow-card sm:block lg:-end-8">
              <img
                src={visionMissionBg}
                alt=""
                width={440}
                height={280}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
