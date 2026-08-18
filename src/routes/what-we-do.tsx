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
        content:
          "A structured overview of WBC services across networking, advisory support, events, and growth initiatives.",
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
    body: "Facilitating high-level networking opportunities that connect entrepreneurs, executives, investors, and organizations across industries and regions. WBC creates platforms where meaningful business relationships and long-term partnerships are developed.",
    image: networkImg,
  },
  {
    kicker: "Frameworks",
    title: "Business Council Development & Support",
    body: "Providing strategic guidance and operational support for the creation, development, and strengthening of Business Councils brand worldwide. This includes structure setup, governance models, and long-term operational assistance.",
    image: councilImg,
  },
  {
    kicker: "Trade",
    title: "International Trade & Investment Facilitation",
    body: "Supporting cross-border trade and investment opportunities by connecting businesses with international partners, markets, and investors, and promoting global commercial cooperation.",
    image: tradeImg,
  },
  {
    kicker: "Events",
    title: "Conferences, Forums & Global Events",
    body: "Organizing international summits, business forums, conferences, exhibitions, and roundtables that bring together global leaders to exchange knowledge, explore opportunities, and address key economic challenges.",
    image: eventsImg,
  },
  {
    kicker: "Innovation",
    title: "Innovation & Ideas Development Platform - Ideas Place(IP)",
    body: "Operating an innovation-driven platform where members can share ideas, develop projects, and collaborate on forward-thinking solutions that contribute to business transformation and economic progress.",
    image: innovationImg,
  },
  {
    kicker: "Advisory",
    title: "Business Advisory & Consultancy Support",
    body: "Offering advisory services to businesses, startups, and Business Councils in areas such as international expansion, strategic planning, market entry, organizational development, and partnerships.",
    image: heroImg,
  },
  {
    kicker: "Learning",
    title: "Training, Education & Capacity Building",
    body: "Providing workshops, executive training programs, mentorship, and educational resources aimed at strengthening leadership, entrepreneurship, and professional skills across global markets.",
    image: trainingImg,
  },
  {
    kicker: "Members",
    title: "Membership Services & Community Engagement",
    body: "Managing a global membership ecosystem that offers access to networking, business opportunities, resources, events, and exclusive platforms for collaboration and engagement.",
    image: membersImg,
  },
  {
    kicker: "Partnerships",
    title: "Strategic Partnerships & Institutional Relations",
    body: "Developing partnerships with chambers of commerce, NGO’s, international organizations, governments, and private sector entities to enhance global cooperation and expand impact.",
    image: tradeImg,
  },
  {
    kicker: "Policy",
    title: "Lobbying & Advocacy",
    body: "Developing representation, lobbying, and advocacy actions towards public and private stakeholders in order to support and promote the interests of businesses and Business Councils at the international level.",
    image: councilImg,
  },
  {
    kicker: "Insights",
    title: "Research, Publications & Market Insights",
    body: "Producing reports, studies, and publications on global business trends, economic developments, and industry insights to support informed decision-making for members.",
    image: heroImg,
  },
  {
    kicker: "Digital",
    title: "Digital Business Platform",
    body: "Building and maintaining a digital ecosystem that enables global connectivity, communication, opportunity sharing, and access to WBC services and resources.",
    image: innovationImg,
  },
  {
    kicker: "Sustainability",
    title: "Sustainability & Responsible Business Initiatives",
    body: "Promoting responsible and sustainable business practices in alignment with the United Nations Sustainable Development Goals (SDGs) through programs, partnerships, and initiatives.",
    image: trainingImg,
  },
] as const;

function WhatWeDo() {
  return (
    <>
      {/* Split hero */}
      <section className="relative flex flex-col">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block"
          aria-hidden="true"
        />
        <div className="bg-teal lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <div className="max-w-xl">
              <p className="intro-1 hero-kicker">
                What We Do
              </p>
              <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
                Core Activities &amp; Services
              </h1>
              <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
                The World Business Council (WBC) delivers a wide range of services and activities
                designed to connect, support, and empower businesses, Business Councils and business
                associations worldwide. Our work focuses on building a strong global ecosystem that
                promotes collaboration, innovation, and sustainable development.
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
        </div>
        <div className="hero-media-right bg-navy-deep">
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
          <div className="overflow-visible rounded-card border border-line bg-background p-6 sm:p-10 lg:p-12 transition-shadow duration-300 hover:shadow-card">
            <div data-reveal className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">
                  Service Portfolio
                </p>
                <h2 className="mt-3 text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
                  13 Strategic Pillars of Support
                </h2>
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-muted-fg">
                  A structured, image-led overview of WBC services designed to help organizations
                  identify where cooperation starts and where growth can be accelerated.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="rtl-mirror mt-2 hidden text-[22px] text-muted-fg sm:block"
              >
                →
              </span>
            </div>

            <hr className="mt-10 border-line" />

            <ul
              data-reveal
              data-reveal-group
              className="service-card-grid mt-10 grid items-stretch gap-6 overflow-visible lg:grid-cols-2"
            >
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
                <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">
                  Membership
                </p>
                <span className="accent-rule mt-3" />
                <h2 className="mt-6 text-[30px] leading-[1.1] font-bold text-foreground sm:text-4xl lg:text-[46px]">
                  Join the World Business Council
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-fg">
                  WBC offers 5 distinct types of membership tailored to meet diverse needs.
                </p>
                <Link to="/become-a-member" className="btn-orange mt-8">
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
