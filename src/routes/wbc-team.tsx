import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/team-hero.jpg";
import { TEAM, type TeamMember } from "@/content/team";

export const Route = createFileRoute("/wbc-team")({
  head: () => ({
    meta: [
      { title: "WBC Team — Leadership & Secretariat | World Business Council" },
      {
        name: "description",
        content:
          "Meet the WBC team: our Board of Directors and Secretariat combine institutional experience with practical support for trusted global business cooperation.",
      },
      { property: "og:title", content: "The team behind global business cooperation — WBC" },
      {
        property: "og:description",
        content: "Board of Directors and Secretariat leading the World Business Council's international cooperation work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WbcTeam,
});

const TAGS = ["Leadership", "Member Support", "Global Coordination"] as const;

const PRACTICE = [
  {
    title: "Coordinated Planning",
    body: "We define priorities jointly, map responsibilities early, and keep every initiative connected to member and partner objectives.",
  },
  {
    title: "Responsive Execution",
    body: "Cross-team check-ins and practical escalation paths allow us to respond quickly while preserving consistency and quality.",
  },
  {
    title: "Shared Accountability",
    body: "We review outcomes together, apply lessons quickly, and keep long-term cooperation at the center of every engagement.",
  },
] as const;

function PersonCard({ member }: { member: TeamMember }) {
  return (
    <li className="group overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card">
      <Link to="/wbc-team/$slug" params={{ slug: member.slug }} className="block w-full text-start">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at the World Business Council`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="border-t border-line p-5 sm:p-6">
          <h4 className="text-[19px] leading-snug font-bold text-foreground">{member.name}</h4>
          <p className="mt-2 text-[13px] font-semibold tracking-[0.12em] text-foreground/70 uppercase">{member.role}</p>
          <span className="mt-5 block text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase transition-colors group-hover:text-foreground">
            View full profile
          </span>
        </div>
      </Link>
    </li>
  );
}

function WbcTeam() {
  const board = TEAM.filter((m) => m.group === "Board of Directors");
  const secretariat = TEAM.filter((m) => m.group === "Secretariat");

  return (
    <>
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-orange px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white uppercase">WBC Team</p>
            <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
              The team behind global business cooperation.
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
              WBC staff connects members, institutions, and partners to practical international collaboration.
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
              className="intro-4 mt-8 inline-block border border-white px-7 py-4 text-[16px] font-bold text-white transition-colors hover:bg-white hover:text-foreground"
            >
              Contact WBC Team
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] bg-navy lg:min-h-0">
          <img
            src={heroImg}
            alt="WBC team members collaborating around a boardroom table"
            width={1200}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-foreground uppercase">People of WBC</p>
            <h2 className="mt-4 max-w-3xl text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[44px]">
              Leadership and staff guiding international cooperation
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
              Meet the team behind the World Business Council. Our Board of Directors and Secretariat combine
              institutional experience with practical support to help organizations build trusted global connections.
            </p>
          </div>

          <hr className="mt-12 border-line" />

          <div data-reveal className="mt-12 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-[22px] font-bold text-foreground sm:text-[26px]">Board of Directors (BoD)</h3>
            <p className="text-[15px] text-muted-fg">
              Strategic oversight for governance, finance, policy direction, and institutional accountability.
            </p>
          </div>
          <ul data-reveal data-reveal-group className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {board.map((m) => (
              <PersonCard key={m.slug} member={m} />
            ))}
          </ul>

          <div data-reveal className="mt-16 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-[22px] font-bold text-foreground sm:text-[26px]">Secretariat</h3>
            <p className="text-[15px] text-muted-fg">
              Daily management, operations, communications, and program delivery for members and partners.
            </p>
          </div>
          <ul data-reveal data-reveal-group className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {secretariat.map((m) => (
              <PersonCard key={m.slug} member={m} />
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface py-14 lg:py-20">
        <span
          className="pointer-events-none absolute -left-24 -top-24 size-[380px] rounded-full border border-line"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Collaboration in Practice</p>
            <h2 className="mt-4 max-w-3xl text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
              How the WBC team works as one coordinated network
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
              Our teams align across functions and regions to keep decisions clear, responses timely, and outcomes tied
              to a shared institutional mission.
            </p>
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-3">
            {PRACTICE.map((p, i) => (
              <li key={p.title} className="rounded-card border border-line bg-background p-6 sm:p-8 transition-shadow duration-300 hover:shadow-card">
                <p className="text-[15px] font-semibold tracking-[0.16em] text-muted-fg">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-[20px] font-bold text-foreground">{p.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">{p.body}</p>
              </li>
            ))}
          </ul>

          <hr data-reveal className="mt-14 border-line" />

          <Link to="/contact" className="btn-orange mt-10">
            Contact WBC to Start a Conversation <span aria-hidden="true" className="rtl-mirror">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
