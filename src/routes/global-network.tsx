import { createFileRoute, Link } from "@tanstack/react-router";
import networkBg from "@/assets/network-bg.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/global-network")({
  head: () => ({
    meta: [
      { title: "Global Network — World Business Council" },
      {
        name: "description",
        content:
          "WBC's global network: headquarters, affiliates, institutional members, and strategic partners connecting businesses worldwide.",
      },
      { property: "og:title", content: "WBC Global Network" },
      { property: "og:description", content: "Headquarters, affiliates, institutional members, and strategic partners." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GlobalNetwork,
});

const TAGS = ["Global Coordination", "Local Presence", "Institutional Trust"] as const;

const PILLARS = [
  {
    title: "WBC Headquarters",
    body: "Paris-based coordination of the council's international activities, standards, and governance.",
  },
  {
    title: "WBC Affiliates",
    body: "Local councils and affiliates extending WBC's presence into cities and regions worldwide.",
  },
  {
    title: "Institutional Members",
    body: "Chambers of commerce, associations, and public institutions cooperating with WBC.",
  },
  {
    title: "Strategic Partners",
    body: "Organizations partnering with WBC to deliver programmes, events, and joint initiatives.",
  },
] as const;

const STATS = [
  { value: "5", label: "World regions covered" },
  { value: "60+", label: "Countries in the network" },
  { value: "120+", label: "Cities represented" },
  { value: "1", label: "Coordinated framework" },
] as const;

function GlobalNetwork() {
  return (
    <>
      <SplitHero
        eyebrow="Our Reach"
        title="Global Network"
        description="A connected structure of headquarters, affiliates, members, and partners working together across borders."
        tags={TAGS}
        image={networkBg}
        imageAlt="Illuminated world map representing the WBC global network"
        ctaLabel="Explore Affiliates"
        ctaTo="/affiliates"
      />

      {/* Intro */}
      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 sm:p-10 lg:p-12">
            <h2 className="text-[26px] leading-tight font-bold text-navy sm:text-[34px]">
              How the network works
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">
              WBC operates through a layered network that keeps global coordination close to local business realities.
              Each layer has a defined role, so cooperation between institutions, companies, and professionals stays
              practical and accountable.
            </p>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">Network Structure</p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-navy sm:text-4xl lg:text-[46px]">
              Four connected layers
            </h2>
          </div>

          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <li
                key={p.title}
                className="group relative overflow-hidden rounded-card border border-line bg-background p-7 transition-all hover:-translate-y-1 hover:border-orange/50 hover:shadow-card sm:p-8"
              >
                <span className="block h-[3px] w-10 bg-orange" aria-hidden="true" />
                <span className="absolute top-6 right-7 text-[14px] font-bold text-line">0{i + 1}</span>
                <h3 className="mt-7 text-[21px] leading-snug font-bold text-navy">{p.title}</h3>
                <p className="mt-4 text-[16px] leading-[1.75] text-muted-fg">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal data-reveal-group className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-background p-8">
                <p className="text-[38px] leading-none font-extrabold tracking-tight text-navy">{s.value}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{s.label}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-10 text-center">
            <Link to="/affiliates" className="text-[16px] font-bold text-orange">
              See where WBC is represented →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Join WBC?"
        description="Become part of a network built on collaboration, innovation, and trust."
        ctaLabel="Become a Member"
        to="/membership"
      />
    </>
  );
}
