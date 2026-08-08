import { Link } from "@tanstack/react-router";

export function PageHero({
  image,
  breadcrumb,
  eyebrow,
  title,
  description,
  width,
  height,
}: {
  image: string;
  breadcrumb?: { label: string }[];
  eyebrow: string;
  title: string;
  description: string;
  width: number;
  height: number;
}) {
  return (
    <section className="relative isolate bg-navy-deep">
      <img
        src={image}
        alt=""
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="container-wbc relative py-20 lg:py-28">
        <div className="max-w-2xl">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="intro-1 mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-[14px] text-white/70">
                <li>
                  <Link to="/" className="transition-colors hover:text-orange">
                    Home
                  </Link>
                </li>
                {breadcrumb.map((b, i) => (
                  <li key={b.label} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-white/40">/</span>
                    <span className={i === breadcrumb.length - 1 ? "font-semibold text-white" : ""}>{b.label}</span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <span className="intro-1 accent-rule" />
          <p className="intro-2 mt-5 text-[14px] font-semibold tracking-[0.18em] text-white/80 uppercase">{eyebrow}</p>
          <h1 className="intro-3 mt-3 text-[30px] leading-tight font-bold text-white sm:text-4xl lg:text-[44px]">{title}</h1>
          <p className="intro-4 mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">{description}</p>
        </div>
      </div>
    </section>
  );
}
