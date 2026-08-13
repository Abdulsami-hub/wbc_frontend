import { createFileRoute, Link } from "@tanstack/react-router";
import { ServiceCard } from "@/components/ServiceCard";
import heroImg from "@/assets/wwd-hero.jpg";
import networkImg from "@/assets/wwd-network.jpg";
import councilImg from "@/assets/wwd-council.jpg";
import tradeImg from "@/assets/wwd-trade.jpg";
import eventsImg from "@/assets/wwd-events.jpg";
import innovationImg from "@/assets/wwd-innovation.jpg";
import trainingImg from "@/assets/wwd-training.jpg";
import membersImg from "@/assets/wwd-members.jpg";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: [
      { title: "What We Do — Core Activities & Services | WBC" },
      {
        name: "description",
        content:
          "WBC's 13 strategic pillars of support: global networking, council development, trade facilitation, events, advisory, training, membership services, and more.",
      },
      { property: "og:title", content: "Core Activities & Services — WBC" },
      {
        property: "og:description",
        content: "A structured overview of WBC services across networking, advisory support, events, and growth initiatives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhatWeDo,
});

const TAGS = ["Networking", "Advisory", "Events"] as const;

const PILLARS = [
  {
    kicker: "Network",
    title: "Global Business Networking",
    body: "Connects companies, institutions, and professionals across regions and sectors to build trusted relationships, practical collaboration, and long-term business opportunities.",
    image: networkImg,
  },
  {
    kicker: "Frameworks",
    title: "Business Council Development & Support",
    body: "Supports the establishment and strengthening of Business Councils and associations through governance guidance, operational frameworks, and member-focused development.",
    image: councilImg,
  },
  {
    kicker: "Trade",
    title: "International Trade & Investment Facilitation",
    body: "Facilitates cross-border trade and investment through introductions, delegation support, market-entry pathways, and coordination between relevant stakeholders.",
    image: tradeImg,
  },
  {
    kicker: "Events",
    title: "Conferences, Forums & Global Events",
    body: "Organizes international conferences, forums, and executive events that advance dialogue, share expertise, and catalyze new partnerships.",
    image: eventsImg,
  },
  {
    kicker: "Innovation",
    title: "Innovation & Ideas Development Platform — Ideas Place (IP)",
    body: "Provides a structured platform for generating, refining, and piloting ideas by connecting innovators, enterprises, and institutions around shared challenges.",
    image: innovationImg,
  },
  {
    kicker: "Advisory",
    title: "Business Advisory & Consultancy Support",
    body: "Delivers advisory and consultancy support in strategy, market expansion, institutional positioning, and practical implementation planning.",
    image: heroImg,
  },
  {
    kicker: "Learning",
    title: "Training, Education & Capacity Building",
    body: "Builds institutional and professional capability through workshops, expert sessions, learning programs, and practical skills development.",
    image: trainingImg,
  },
  {
    kicker: "Members",
    title: "Membership Services & Community Engagement",
    body: "Strengthens member experience through onboarding, tailored services, active communication, and community programs that sustain meaningful engagement.",
    image: membersImg,
  },
  {
    kicker: "Partnerships",
    title: "Strategic Partnerships & Institutional Relations",
    body: "Develops strategic partnerships with public and private institutions, chambers, and international organizations to expand impact and cooperation.",
    image: tradeImg,
  },
  {
    kicker: "Policy",
    title: "Lobbying & Advocacy",
    body: "Represents member interests in policy and regulatory dialogue, advocating for transparent frameworks and a stronger environment for business growth.",
    image: councilImg,
  },
  {
    kicker: "Insights",
    title: "Research, Publications & Market Insights",
    body: "Produces research, reports, and market intelligence that help members make informed decisions and anticipate international business trends.",
    image: heroImg,
  },
  {
    kicker: "Digital",
    title: "Digital Business Platform",
    body: "Provides a digital ecosystem for networking, resources, event access, and cross-border collaboration, extending engagement beyond physical meetings.",
    image: innovationImg,
  },
  {
    kicker: "Sustainability",
    title: "Sustainability & Responsible Business Initiatives",
    body: "Promotes responsible business practices, sustainability alignment, and inclusive long-term development across member organizations and partner networks.",
    image: trainingImg,
  },
] as const;

function WhatWeDo() {
  return (
    <>
      {/* Split hero */}
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-orange px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white uppercase">What We Do</p>
            <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
              Core Activities &amp; Services
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
              WBC brings members, institutions, and partners together through practical international cooperation across
              networking, advisory support, events, and strategic growth initiatives.
            </p>
            <ul className="intro-4 mt-9 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="border border-white/60 px-4 py-2.5 text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative min-h-[280px] bg-navy-deep lg:min-h-0">
          <img
            src={heroImg}
            alt="WBC members presenting business insights in a boardroom"
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      {/* Service portfolio */}
      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div className="rounded-card border border-line bg-background p-6 sm:p-10 lg:p-12 transition-shadow duration-300 hover:shadow-card">
            <div data-reveal className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">Service Portfolio</p>
                <h2 className="mt-3 text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
                  13 Strategic Pillars of Support
                </h2>
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-muted-fg">
                  A structured, image-led overview of WBC services designed to help organizations identify where
                  cooperation starts and where growth can be accelerated.
                </p>
              </div>
              <span aria-hidden="true" className="rtl-mirror mt-2 hidden text-[22px] text-muted-fg sm:block">
                →
              </span>
            </div>

            <hr className="mt-10 border-line" />

            <ul data-reveal data-reveal-group className="mt-10 grid gap-6 lg:grid-cols-2">
              {PILLARS.map((p, i) => (
                <ServiceCard
                  key={p.title}
                  kicker={p.kicker}
                  title={p.title}
                  body={p.body}
                  image={p.image}
                  index={i}
                  className={i === PILLARS.length - 1 ? "lg:col-span-2" : ""}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wbc">
          <div
            data-reveal
            className="relative overflow-hidden rounded-card border border-line bg-background p-8 sm:p-12 lg:p-16 transition-shadow duration-300 hover:shadow-card"
          >
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">Membership</p>
                <span className="accent-rule mt-3" />
                <h2 className="mt-6 text-[30px] leading-[1.1] font-bold text-foreground sm:text-4xl lg:text-[46px]">
                  Join the World Business Council
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-fg">
                  WBC offers 5 distinct types of membership tailored to meet diverse needs.
                </p>
                <Link to="/membership" hash="application" className="btn-orange mt-8">
                  Become a Member
                </Link>
              </div>

              <div className="relative hidden aspect-[4/3] border border-line lg:block">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />
                <span className="absolute top-[12%] right-[12%] size-32 rounded-full bg-orange/15" />
                <span className="absolute bottom-[22%] left-[16%] size-28 border border-navy/25" />
                <span className="absolute bottom-[28%] left-[26%] size-28 border border-orange/45" />
                <span className="absolute right-[10%] bottom-[12%] text-[12px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
                  International Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
