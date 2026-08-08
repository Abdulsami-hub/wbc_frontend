import { createFileRoute, Link } from "@tanstack/react-router";
import heroCity from "@/assets/hero-city.jpg";
import whoWeAre from "@/assets/who-we-are-building.webp.asset.json";
import visionMissionBg from "@/assets/vision-mission-bg.jpg";
import { Glance } from "@/components/Glance";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { SignalsAtGlance } from "@/components/SignalsAtGlance";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "World Business Council — Connecting Businesses, Creating Opportunities" },
      {
        name: "description",
        content:
          "WBC is a global business support organization headquartered in Paris, empowering businesses through collaboration, innovation, and trust.",
      },
      { property: "og:title", content: "World Business Council — Connecting Businesses" },
      {
        property: "og:description",
        content: "A global network that empowers businesses through collaboration, innovation, and trust.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroCity, fetchPriority: "high" }],
  }),
  component: Home,
});

const VALUES = [
  {
    title: "Inclusivity",
    body: "Embrace diversity and welcome individuals of all genders, nationalities, cultures, and backgrounds, recognising the strength that comes from a blend of different perspectives.",
  },
  {
    title: "Collaboration",
    body: "Foster a culture of partnership, encouraging businesses to share objectives, exchange knowledge, and collectively contribute to the growth of the international business network.",
  },
  {
    title: "Innovation",
    body: "Promote a mindset of innovation, driving businesses to explore new ideas, technologies, and approaches to adapt and thrive in the dynamic global business environment.",
  },
  {
    title: "Integrity",
    body: "Uphold the highest standards of honesty, transparency, and ethical behaviour, ensuring trust and credibility in all interactions with members, partners, and stakeholders.",
  },
  {
    title: "Excellence",
    body: "Strive for excellence in all services and activities, committed to delivering high quality support, networking opportunities, and resources to advance the success of businesses.",
  },
  {
    title: "Global Citizenship",
    body: "Advocate for practices that contribute to a prosperous and resilient global business environment, reflecting a commitment to responsible global citizenship and sustainable business practices.",
  },
] as const;

const SERVICES = [
  {
    title: "Global Business Networking",
    body: "Facilitating high-value connections and opportunities that span continents, industries, and sectors.",
  },
  {
    title: "Business Council Development & Support",
    body: "Providing strategic guidance and operational support for the creation and development of councils.",
  },
  {
    title: "International Trade & Investment Facilitation",
    body: "Supporting cross-border trade and investment opportunities by connecting businesses with partners.",
  },
  {
    title: "Conferences, Forums & Global Events",
    body: "Organising international summits, business forums, conferences, exhibitions, and roundtables.",
  },
  {
    title: "Innovation & Ideas Development Platform",
    body: "Operating an innovation platform where members can share ideas, develop projects, and collaborate.",
  },
  {
    title: "Business Advisory & Consultancy Support",
    body: "Offering advisory services to businesses, startups, and established councils in international markets.",
  },
] as const;

function Home() {
  return (
    <>
      <HeroSlider />


      <section className="py-16 lg:py-20">
        <div className="container-wbc grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading align="left" title="Who We Are" />
            <p data-reveal className="mt-6 rounded-card border border-line p-6 text-[16px] leading-relaxed text-muted-fg">
              The World Business Council (WBC) is an international business support organization headquartered in Paris,
              built on a simple belief: behind every business is a person, an idea, and the ambition to create something
              meaningful. We bring businesses, entrepreneurs, professionals, and organizations closer together, helping
              them find the right connections, knowledge, support, and opportunities to move forward. Through our
              international network, WBC turns connections into cooperation, ideas into action, and business
              relationships into lasting opportunities for growth.
            </p>
          </div>
          <img
            src={whoWeAre.url}
            alt="Modern glass office building"
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            data-reveal
            className="aspect-[4/3] w-full rounded-card object-cover shadow-card"
          />
        </div>
      </section>

      <SignalsAtGlance />

      <Glance />


      <section className="relative isolate overflow-hidden">
        <img
          src={visionMissionBg}
          alt=""
          width={1920}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-white/75" aria-hidden="true" />
        <div className="container-wbc relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div data-reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy/70 sm:text-[13px]">
              Institutional Framework
            </p>
            <h2 className="mt-4 text-[30px] leading-[1.1] font-bold text-navy sm:text-[38px] lg:text-[44px]">
              The foundations behind practical global cooperation.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-navy/70 sm:text-[17px]">
              A clear institutional compass that guides every connection, service, and partnership within the WBC ecosystem.
            </p>
          </div>
          <div data-reveal data-reveal-group className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-card border border-white/60 bg-white/85 p-6 shadow-card backdrop-blur-md transition-shadow duration-300 hover:shadow-lg sm:p-7">
              <h3 className="text-lg font-bold text-navy">Our Vision</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                To be the global hub of business excellence, with a local presence in every city, empowering and uniting businesses worldwide through innovation, collaboration, and sustainable development.
              </p>
            </article>
            <article className="rounded-card border border-white/60 bg-white/85 p-6 shadow-card backdrop-blur-md transition-shadow duration-300 hover:shadow-lg sm:p-7">
              <h3 className="text-lg font-bold text-navy">Our Mission</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                Building a global network that empowers businesses through collaboration, innovation, and trust.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading
            eyebrow="Strategic Partnerships"
            title="Partnership Showcase"
            description="Developing partnerships with chambers of commerce, governments, and wider social entities to enhance global cooperation and expand impact."
          />
          <p data-reveal className="mt-8 border-t border-line pt-8 text-center text-[14px] text-muted-fg">
            Partnership listings are updated regularly as new collaborations are established.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading title="Our Values" />
          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <li key={v.title} className="rounded-card bg-background p-6 shadow-card">
                <span className="text-[12px] font-semibold text-orange">0{i + 1}</span>
                <h3 className="mt-2 text-[17px] font-bold text-navy">{v.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-fg">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading
            eyebrow="Core Activities & Services"
            title="What We Do"
            description="Explore how WBC connects, supports, and empowers businesses worldwide."
          />
          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.title} className="rounded-card border border-line bg-background p-6 transition-shadow hover:shadow-card">
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-navy/5" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-navy">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18" />
                  </svg>
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-navy">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-fg">{s.body}</p>
                <Link to="/global-network" className="mt-4 inline-block text-[14px] font-semibold text-orange">
                  Learn More →
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 text-center">
            <Link to="/global-network" className="text-[15px] font-semibold text-orange">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Explore What We Do"
        description="From global networking to trade facilitation and advisory support, discover the full range of WBC activities and services."
        ctaLabel="What We Do"
        to="/global-network"
      />
    </>
  );
}
