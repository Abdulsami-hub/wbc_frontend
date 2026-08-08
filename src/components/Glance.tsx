import networkBg from "@/assets/network-bg.jpg";

const STATS = [
  { value: "2026", label: "Founded" },
  { value: "Paris", label: "Headquarters" },
  { value: "Global", label: "Countries Engaged" },
] as const;

export function Glance() {
  return (
    <section className="relative isolate bg-navy-deep">
      <img
        src={networkBg}
        alt=""
        width={1600}
        height={700}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-60"
      />
      <div className="container-wbc relative py-14 lg:py-16">
        <h2 data-reveal className="text-center text-xl font-bold text-white lg:text-2xl">WBC at a Glance</h2>
        <ul data-reveal data-reveal-group className="mt-8 grid gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <li key={s.label} className="rounded-card bg-white/95 px-6 py-6 text-center shadow-card">
              <p className="text-2xl font-bold text-orange lg:text-[28px]">{s.value}</p>
              <p className="mt-1 text-[12px] text-muted-fg">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
