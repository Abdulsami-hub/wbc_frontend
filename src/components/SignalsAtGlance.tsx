import { SectionHeading } from "@/components/SectionHeading";

const SIGNALS = [
  {
    title: "Global Reach",
    body: "Active presence across international business corridors",
  },
  {
    title: "Meaningful Introductions",
    body: "Senior decision-makers connected with clear intent",
  },
  {
    title: "Collaborative Momentum",
    body: "Partnership conversations progressing through WBC events",
  },
  {
    title: "Business Support Programs",
    body: "Practical guidance for market access and sustainable growth",
  },
] as const;

export function SignalsAtGlance() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-wbc">
        <SectionHeading
          eyebrow="Institutional Momentum at a Glance"
          title="Trusted signals of WBC"
          align="left"
        />
        <div
          data-reveal
          data-reveal-group
          className="mt-10 grid overflow-hidden rounded-card border border-line bg-background sm:grid-cols-2"
        >
          {SIGNALS.map((s, i) => {
            const isTopRow = i < 2;
            const isLeftCol = i % 2 === 0;
            const borderClass = [
              isTopRow ? "border-b border-line" : "",
              isLeftCol ? "sm:border-r border-line" : "",
            ].join(" ");

            return (
              <div
                key={s.title}
                className={`p-8 sm:p-10 lg:p-12 ${borderClass}`}
              >
                <h3 className="text-[22px] font-bold leading-tight text-navy sm:text-2xl lg:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
