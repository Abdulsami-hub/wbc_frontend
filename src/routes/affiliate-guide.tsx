import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import networkBg from "@/assets/network-bg.jpg";

export const Route = createFileRoute("/affiliate-guide")({
  head: () => ({
    meta: [
      { title: "Affiliate Establishment Guide — World Business Council" },
      {
        name: "description",
        content:
          "FAQ-style guide to establishing a WBC affiliate in your city or country: requirements, process, and support from headquarters.",
      },
      { property: "og:title", content: "Affiliate Establishment Guide — WBC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliateGuide,
});

const SECTIONS = [
  {
    id: "overview",
    title: "What does establishing an affiliate involve?",
    body: "Establishing a WBC affiliate means building a local presence that connects entrepreneurs, institutions, and the business community with the global WBC network. Affiliates operate under shared standards while remaining close to local market realities.",
  },
  {
    id: "who",
    title: "Who can initiate an affiliate?",
    body: "Chambers of commerce, business associations, institutional partners, established companies, and executive sponsors may initiate discussions. WBC reviews alignment with mission, governance capacity, and long-term commitment to cooperation.",
  },
  {
    id: "process",
    title: "What is the typical process?",
    body: "The pathway usually includes an initial conversation with headquarters, a written expression of interest, alignment on scope (city or country), review of proposed leadership and activities, and formal confirmation before public listing as an active affiliate.",
  },
  {
    id: "support",
    title: "What support does WBC provide?",
    body: "WBC provides framework guidance, introductions across the network, programme visibility, and coordination with headquarters. Support packages can be tailored for organizations seeking to establish presence in a specific city or country.",
  },
  {
    id: "status",
    title: "How are Active and Inactive statuses used?",
    body: "Active affiliates are currently engaged or operating. Inactive locations remain in the network record for continuity but are not currently operating. Status can change as engagement evolves.",
  },
  {
    id: "next",
    title: "How do we get started?",
    body: "Begin by submitting a membership or affiliate interest application, then schedule a conversation with the WBC team. You can also explore the current affiliate footprint to see regional coverage.",
  },
] as const;

function AffiliateGuide() {
  return (
    <>
      <SplitHero
        eyebrow="Network Development"
        title="Affiliate Establishment Guide"
        description="A practical FAQ for organizations and executives seeking to establish WBC presence in their city or country."
        tags={["Framework", "Process", "Support"]}
        image={networkBg}
        imageAlt="Global network map representing WBC affiliate development"
        ctaLabel="Fill the Application Form"
        ctaTo="/become-a-member"
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc max-w-3xl">
          <ul className="space-y-5">
            {SECTIONS.map((s) => (
              <li key={s.id} id={s.id} data-reveal className="scroll-mt-28 rounded-card border border-line bg-background p-6 sm:p-8 transition-shadow duration-300 hover:shadow-card">
                <h2 className="text-[20px] font-bold text-foreground sm:text-[22px]">{s.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">{s.body}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <Link to="/become-a-member" className="btn-orange">
              Fill the Application Form
            </Link>
            <Link to="/affiliates" className="inline-flex items-center text-[16px] font-semibold text-foreground underline underline-offset-4">
              View affiliate footprint
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to establish presence?"
        description="Start the application and connect with the WBC team about affiliate development."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
