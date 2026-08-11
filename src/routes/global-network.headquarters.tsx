import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import networkBg from "@/assets/network-bg.jpg";

export const Route = createFileRoute("/global-network/headquarters")({
  head: () => ({
    meta: [
      { title: "WBC Headquarters — Paris | World Business Council" },
      {
        name: "description",
        content:
          "WBC Headquarters in Paris coordinates international activities, standards, governance, and the global affiliate network.",
      },
      { property: "og:title", content: "WBC Headquarters — Paris" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Headquarters,
});

function Headquarters() {
  return (
    <>
      <SplitHero
        eyebrow="Global Network"
        title="WBC Headquarters"
        description="Paris-based coordination of the council's international activities, standards, and governance."
        tags={["Paris", "Governance", "Coordination"]}
        image={networkBg}
        imageAlt="Illuminated world map representing WBC headquarters coordination"
        ctaLabel="Contact Headquarters"
        ctaTo="/contact"
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc max-w-3xl">
          <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-10 transition-shadow duration-300 hover:shadow-card">
            <h2 className="text-[24px] font-bold text-foreground">Role of headquarters</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg">
              WBC Headquarters in Paris stewards the council's international agenda: aligning affiliates and members,
              setting shared standards, coordinating programmes, and ensuring governance remains transparent and
              accountable across the network.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">Address</dt>
                <dd className="mt-2 text-[15px] text-foreground">
                  31 Avenue de Ségur
                  <br />
                  75007 Paris, France
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">Email</dt>
                <dd className="mt-2">
                  <a href="mailto:info@wbccme.org" className="text-foreground underline underline-offset-4">
                    info@wbccme.org
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/affiliates" className="btn-orange">
                Explore Affiliates
              </Link>
              <Link to="/global-network" className="text-[15px] font-semibold text-foreground underline underline-offset-4">
                Back to Global Network
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Work with headquarters"
        description="Reach the Paris team for membership, partnerships, and network development."
        ctaLabel="Contact Us"
        to="/contact"
      />
    </>
  );
}
