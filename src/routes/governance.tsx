import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/gov-hero.png";
import assemblyImg from "@/assets/gov-assembly.png";
import boardImg from "@/assets/gov-board.jpg";
import honoraryImg from "@/assets/gov-honorary.png";
import secretariatImg from "@/assets/gov-secretariat.jpg";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Governance — Structure, Oversight & Accountability | WBC" },
      {
        name: "description",
        content:
          "How the World Business Council is governed: General Assembly, Board of Directors, Honorary Board, Staff Members, and Committees & Working Groups.",
      },
      { property: "og:title", content: "Governance that protects trust and drives coordinated action — WBC" },
      {
        property: "og:description",
        content:
          "WBC governance structure: General Assembly, Board of Directors, Honorary Board, Staff Members, and Committees & Working Groups.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Governance,
});

const TAGS = ["Transparency", "Stewardship", "Leadership"] as const;

type Body = {
  id: string;
  name: string;
  image: string;
  icon: "user" | "lines" | "shield";
  rows: { label: string; value: string }[];
};

const BODIES: Body[] = [
  {
    id: "general-assembly",
    name: "General Assembly (GA)",
    image: assemblyImg,
    icon: "user",
    rows: [
      {
        label: "Role",
        value:
          "The General Assembly is the highest governing body of WBC, bringing together its members to approve major decisions, policies, and strategic directions.",
      },
    ],
  },
  {
    id: "board-of-directors",
    name: "Board of Directors (BoD)",
    image: boardImg,
    icon: "lines",
    rows: [
      {
        label: "Role",
        value:
          "The Board of Directors provides strategic leadership and oversight, guiding the organization's vision, governance, and development.",
      },
    ],
  },
  {
    id: "honorary-board",
    name: "Honorary Board (HB)",
    image: honoraryImg,
    icon: "user",
    rows: [
      {
        label: "Role",
        value:
          "The Honorary Board is a consultative body composed of distinguished individuals who provide advice, expertise, and support to WBC and its international mission.",
      },
    ],
  },
  {
    id: "staff-members",
    name: "Staff Members",
    image: secretariatImg,
    icon: "shield",
    rows: [
      {
        label: "Role",
        value:
          "The staff members, led by the Director General, are responsible for the day-to-day management and administration of WBC. They support the implementation of policies, programmes, and decisions adopted by the General Assembly and the Board of Directors.",
      },
    ],
  },
  {
    id: "committees-working-groups",
    name: "Committees & Working Groups",
    image: assemblyImg,
    icon: "lines",
    rows: [
      {
        label: "Role",
        value:
          "Committees and Working Groups support WBC by providing expertise and contributing to specific programmes, initiatives, projects, and areas of activity.",
      },
    ],
  },
];

const FAQ = [
  {
    q: "How is WBC's leadership structure organized?",
    a: "WBC is governed by its General Assembly, with the support of a Board of Directors, Honorary Board, Staff Members, Committees and Working Groups.",
  },
  {
    q: "How are board members or senior leaders appointed?",
    a: "Appointments follow the council's statutes and rules of procedure, with candidates reviewed against institutional criteria and confirmed through formal assembly decisions.",
  },
  {
    q: "How can members contribute to governance discussions?",
    a: "Members participate through the General Assembly, committee work, and consultation rounds where priorities, policies, and programme direction are reviewed.",
  },
  {
    q: "What accountability measures guide governance decisions?",
    a: "Decisions are documented, reviewed against approved policies, and supported by financial reporting, audit readiness, and periodic performance review.",
  },
  {
    q: "How do strategic decisions move from proposal to approval?",
    a: "Proposals are prepared by the Staff Members, examined by the Board of Directors, and submitted for approval to the General Assembly where the mandate requires it.",
  },
] as const;

function BodyIcon({ icon }: { icon: Body["icon"] }) {
  return (
    <span className="inline-flex size-12 shrink-0 items-center justify-center border border-line text-foreground">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        {icon === "user" && (
          <>
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
          </>
        )}
        {icon === "lines" && <path d="M4 8h16M4 12h11M4 16h7" />}
        {icon === "shield" && <path d="M12 3l7 3.5v5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5v-5L12 3z" />}
      </svg>
    </span>
  );
}

function Governance() {
  const [open, setOpen] = useState<number>(0);

  return (
    <>
      {/* Split hero */}
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block" aria-hidden="true" />
        <div className="bg-teal lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <div className="max-w-xl">
            <p className="intro-1 hero-kicker">Governance</p>
            <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
              Governance that protects trust and drives coordinated action.
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
              Clear oversight and defined mandates for confident international cooperation.
            </p>
            <ul className="intro-4 mt-10 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="border border-white/60 px-4 py-2.5 text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="intro-4 mt-8 inline-flex items-center gap-3 border-b border-white pb-1 text-[16px] font-bold text-white"
            >
              Contact the governance office <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
            </div>
          </div>
        </div>
        <div className="hero-media-right bg-navy">
          <img
            src={heroImg}
            alt="WBC boardroom prepared for a governance session"
            width={1200}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      {/* Governance structure */}
      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Governance Structure</p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[44px]">
              Institutional governance for transparent and accountable delivery
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted-fg">
              The World Business Council (WBC) is governed by its General Assembly, with the support of a Board of
              Directors, Honorary Board, Staff Members, Committees and Working Groups. It operates in accordance with
              its Statutes, Rules of Procedure, and internal policies, ensuring transparency, accountability, and
              effective governance in support of its international mission.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {BODIES.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className="inline-block rounded-full border border-line px-5 py-2.5 text-[15px] text-foreground transition-colors hover:border-orange hover:text-foreground"
                  >
                    {b.name.replace(/\s*\(.*\)$/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            {BODIES.map((b, i) => (
              <article
                key={b.id}
                id={b.id}
                data-reveal
                className="group scroll-mt-28 border border-line bg-background p-4 sm:p-6"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={b.image}
                    alt={`${b.name} setting at the World Business Council`}
                    width={1200}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="card-zoom-img aspect-[15/7] w-full object-cover"
                  />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <BodyIcon icon={b.icon} />
                  <h3 className="flex-1 text-[22px] leading-snug font-bold text-foreground sm:text-[26px]">{b.name}</h3>
                  <span className="hidden shrink-0 border border-line px-3 py-2 text-[14px] text-muted-fg sm:inline-block">
                    Group {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <dl className="mt-6">
                  {b.rows.map((r) => (
                    <div key={r.label} className="border-t border-line py-5 ps-16">
                      <dt className="text-[16px] font-bold text-foreground">{r.label}</dt>
                      <dd className="mt-2 text-[16px] leading-relaxed text-muted-fg">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Governance FAQ */}
      <section className="bg-surface py-14 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Governance FAQ</p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
              Clear answers on how WBC governance works
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted-fg">
              Quick guidance on leadership structure, member participation, and how decisions are made across the council.
            </p>
          </div>

          <div>
            <ul data-reveal className="border border-line bg-background">
              {FAQ.map((f, i) => (
                <li key={f.q} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-center justify-between gap-6 px-5 py-6 text-start transition-colors hover:bg-surface sm:px-8"
                  >
                    <span className="text-[18px] leading-snug font-bold text-foreground sm:text-[20px]">{f.q}</span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                      className={`shrink-0 text-foreground transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-7 text-[17px] leading-relaxed text-muted-fg sm:px-8">{f.a}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[17px] leading-relaxed text-muted-fg">
              Need more detail on a governance topic?{" "}
              <Link to="/contact" className="font-semibold text-foreground hover:underline">
                Contact the WBC team
              </Link>{" "}
              and we'll direct your question to the right office.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
