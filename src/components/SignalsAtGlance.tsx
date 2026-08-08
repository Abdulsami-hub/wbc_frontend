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
        <div data-reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue sm:text-xs">
            Institutional Momentum at a Glance
          </p>
          <h2 className="mt-3 text-[26px] leading-tight font-bold text-navy sm:text-3xl lg:text-[34px]">
            Trusted signals of WBC
          </h2>
          <span className="accent-rule mt-4" />
        </div>
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
              isLeftCol ? "border-line sm:border-r" : "",
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
