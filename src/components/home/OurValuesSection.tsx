// Temporary preview background. To restore the original:
// import VALUES_BG from "@/assets/vision-mission-bg.jpg";
import VALUES_BG from "@/assets/our-values-bg-temp.png";

const VALUES = [
  {
    title: "Inclusivity",
    body: "Embracing diversity and valuing different perspectives.",
    icon: "users",
  },
  {
    title: "Collaboration",
    body: "Connecting people and businesses to create shared success.",
    icon: "link",
  },
  {
    title: "Innovation",
    body: "Encouraging creativity and forward-thinking solutions.",
    icon: "spark",
  },
  {
    title: "Integrity & Excellence",
    body: "Upholding ethics, transparency, and high standards.",
    icon: "shield",
  },
  {
    title: "Sustainable Development",
    body: "Promoting responsible growth for a better future.",
    icon: "leaf",
  },
  {
    title: "Global Citizenship",
    body: "Supporting positive impact on communities and the world.",
    icon: "globe",
  },
] as const;

function ValueIcon({ name }: { name: string }) {
  const common = {
    width: 44,
    height: 44,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 6.5a3 3 0 0 1 0 5.6M17 19c0-2.2-1-3.8-2.5-4.6" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="2.6" />
          <circle cx="16" cy="9" r="2.6" />
          <circle cx="12" cy="16" r="2.6" />
          <path d="M9.8 10.6 11 14.2M14.2 10.6 13 14.2M10.4 9h3.2" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M18 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
          <path d="M9 12l2.2 2.2L15.5 10" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5.5-12 15-12 0 9-4.5 13-11 13H5z" />
          <path d="M9 19c1.5-4 4-6.5 7.5-8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
  }
}

export function OurValuesSection() {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Fixed on scroll — photo stays put while section content moves */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${VALUES_BG})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/58" aria-hidden="true" />

      <div className="container-wbc relative">
        <p data-reveal className="font-display text-[12px] tracking-[0.24em] text-white/80 uppercase">
          Our Values
        </p>
        <h2
          data-reveal
          className="mt-4 max-w-3xl text-[38px] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-sm sm:text-[52px] lg:text-[64px]"
        >
          Six principles of WBC.
        </h2>
        <p data-reveal className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/90 drop-shadow-sm">
          These values shape how we convene institutions, support members and partners, and turn international
          connections into practical cooperation.
        </p>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {VALUES.map((v) => (
            <li key={v.title}>
              <article className="values-glass-card flex min-h-[240px] flex-col items-center justify-center rounded-none px-7 py-10 text-center sm:min-h-[260px] sm:px-8 sm:py-12 lg:min-h-[280px]">
                <span className="text-white" aria-hidden="true">
                  <ValueIcon name={v.icon} />
                </span>
                <h3 className="mt-6 text-[20px] leading-tight font-bold tracking-tight text-white sm:text-[22px]">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-[20rem] text-[15px] leading-relaxed text-white sm:text-[16px]">
                  {v.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
