import { createFileRoute, Link } from "@tanstack/react-router";
import networkBg from "@/assets/network-bg.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/global-network/")({
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
    title: "WBC Headquarters (Paris)",
    body: "The global headquarters responsible for the leadership, governance, and coordination of WBC.",
    to: "/who-we-are" as const,
  },
  {
    title: "WBC Affiliates",
    body: "Official WBC representatives established in countries and cities to promote and implement WBC's mission and activities.",
    to: "/affiliates" as const,
  },
  {
    title: "WBC Members",
    body: "Institutional, corporate, SME, and individual members forming the core of the WBC community.",
    to: "/our-members" as const,
  },
  {
    title: "Partners and Sponsors",
    body: "Organizations and institutions collaborating with WBC through partnerships, sponsorships, joint initiatives, and international cooperation.",
    to: "/global-network/strategic-partners" as const,
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
        description="The World Business Council (WBC) is built on a collaborative global network that connects businesses, business support organizations, and strategic partners across countries and regions. Together, this network strengthens international cooperation, creates new opportunities, and supports sustainable business growth worldwide."
        tags={TAGS}
        image={networkBg}
        imageAlt="Illuminated world map representing the WBC global network"
        tone="blue"
        ctaLabel="Explore Affiliates"
        ctaTo="/affiliates"
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 sm:p-10 lg:p-12 transition-shadow duration-300 hover:shadow-card">
            <h2 className="text-[26px] leading-tight font-bold text-foreground sm:text-[34px]">
              Become part of the WBC Global Network
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">
              Become part of the WBC Global Network by joining as a member or strategic partner, and connect with a
              growing international community committed to collaboration, innovation, and shared success.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Lead WBC&apos;s mission in your country or city by establishing a WBC Affiliate and become the official
              local representative, connecting businesses with global opportunities while strengthening your local
              business community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/become-a-member" className="btn-orange">
                Become a Member
              </Link>
              <Link to="/affiliate-guide" className="btn-navy !rounded-md">
                Establish an Affiliate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">Network Structure</p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[46px]">
              Four connected layers
            </h2>
          </div>

          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <li key={p.title}>
                <Link
                  to={p.to}
                  className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-background p-7 pe-14 transition-shadow duration-300 hover:shadow-card sm:p-8 sm:pe-14"
                >
                  <span className="block h-[3px] w-10 bg-orange" aria-hidden="true" />
                  <span className="absolute top-6 end-7 text-[14px] font-bold tabular-nums text-line">0{i + 1}</span>
                  <h3 className="mt-7 text-[21px] leading-snug font-bold text-foreground">{p.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.75] text-muted-fg">{p.body}</p>
                  <span className="link-arrow mt-6">
                    Learn more
                    <span aria-hidden="true" className="link-arrow-icon rtl-mirror">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal data-reveal-group className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-background p-8">
                <p className="text-[38px] leading-none font-extrabold tracking-tight text-foreground">{s.value}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{s.label}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-10 text-center">
            <Link to="/affiliates" className="text-[16px] font-bold text-foreground">
              See where WBC is represented <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Join WBC?"
        description="Become part of a network built on collaboration, innovation, and trust."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
