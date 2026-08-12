import visionMissionBg from "@/assets/vision-mission-bg.jpg";

const VALUES = [
  { title: "Inclusivity", body: "Embracing diversity and valuing different perspectives." },
  { title: "Collaboration", body: "Connecting people and businesses to create shared success." },
  { title: "Innovation", body: "Encouraging creativity and forward-thinking solutions." },
  { title: "Integrity & Excellence", body: "Upholding ethics, transparency, and high standards." },
  { title: "Sustainable Development", body: "Promoting responsible growth for a better future." },
  { title: "Global Citizenship", body: "Supporting positive impact on communities and the world." },
] as const;

export function OurValuesSection() {
  return (
    <section
      className="relative isolate bg-cover bg-center bg-no-repeat bg-fixed py-20 lg:py-28"
      style={{ backgroundImage: `url(${visionMissionBg})` }}
    >
      <div className="absolute inset-0 bg-navy-deep/75" aria-hidden="true" />
      <div className="container-wbc relative">
        <p data-reveal className="font-display text-[12px] tracking-[0.24em] text-white/70 uppercase">
          Our Values
        </p>
        <h2
          data-reveal
          className="mt-4 max-w-3xl text-[38px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[52px] lg:text-[64px]"
        >
          Six principles of WBC.
        </h2>
        <p data-reveal className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/80">
          These values shape how we convene institutions, support members and partners, and turn international
          connections into practical cooperation.
        </p>

        <ul data-reveal data-reveal-group className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <li
              key={v.title}
              className="rounded-card border border-white/20 bg-white/10 p-7 backdrop-blur-md transition-shadow duration-300 hover:shadow-card hover:bg-white/15"
            >
              <span className="text-[13px] font-bold tracking-[0.16em] text-white/55 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[22px] font-bold tracking-tight text-white">{v.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-white/80">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
