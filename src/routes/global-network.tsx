import { createFileRoute } from "@tanstack/react-router";
import networkBg from "@/assets/network-bg.jpg";
import { SectionHeading } from "@/components/SectionHeading";
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

const PILLARS = [
  { title: "WBC Headquarters", body: "Paris-based coordination of the council's international activities and governance." },
  { title: "WBC Affiliates", body: "Local councils and affiliates extending WBC's presence into cities and regions." },
  { title: "Institutional Members", body: "Chambers of commerce, associations, and public institutions cooperating with WBC." },
  { title: "Strategic Partners", body: "Organizations partnering with WBC to deliver programmes, events, and initiatives." },
] as const;

function GlobalNetwork() {
  return (
    <>
      <section className="relative isolate bg-navy-deep">
        <img
          src={networkBg}
          alt=""
          width={1600}
          height={700}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-55"
        />
        <div className="container-wbc relative py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="accent-rule" />
            <p className="mt-5 text-[12px] font-semibold tracking-[0.18em] text-white/80 uppercase">Our Reach</p>
            <h1 className="mt-3 text-[30px] leading-tight font-bold text-white sm:text-4xl lg:text-[44px]">
              Global Network
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-white/85">
              A connected structure of headquarters, affiliates, members, and partners working together across borders.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading
            eyebrow="Network Structure"
            title="How the Network Works"
            description="WBC operates through a layered network that keeps global coordination close to local business realities."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <li key={p.title} className="rounded-card border border-line bg-background p-7">
                <span className="text-[11px] font-semibold text-orange">0{i + 1}</span>
                <h2 className="mt-2 text-[16px] font-bold text-navy">{p.title}</h2>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-fg">{p.body}</p>
              </li>
            ))}
          </ul>
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
