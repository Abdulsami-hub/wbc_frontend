import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type MegaMenuLink = {
  title: string;
  desc: string;
  to: string;
  hash?: string;
};

export function MegaMenuShell({
  title,
  description,
  children,
  promo,
}: {
  title: string;
  description: string;
  children: ReactNode;
  promo: {
    image: string;
    alt: string;
    text: string;
    cta: string;
    to: string;
    hash?: string;
    onNavigate?: () => void;
  };
}) {
  return (
    <div className="megamenu-panel border-t border-line bg-background shadow-card">
      <div className="container-wbc grid gap-10 py-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr] lg:gap-12 lg:py-12">
        <div className="megamenu-col" style={{ animationDelay: "40ms" }}>
          <h2 className="text-[26px] font-bold text-foreground lg:text-[30px]">{title}</h2>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-muted-fg">{description}</p>
        </div>

        {children}

        <div
          className="megamenu-col group/promo overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card"
          style={{ animationDelay: "160ms" }}
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={promo.image}
              alt={promo.alt}
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="megamenu-promo-img h-full w-full object-cover"
            />
            <div className="megamenu-promo-fade pointer-events-none absolute inset-0" aria-hidden="true" />
          </div>
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-fg">{promo.text}</p>
            <Link
              to={promo.to}
              {...(promo.hash ? { hash: promo.hash } : {})}
              {...(promo.onNavigate ? { onClick: promo.onNavigate } : {})}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-foreground transition-[color,transform] duration-500 ease-out delay-0 group-hover/promo:text-navy group-hover/promo:delay-300"
            >
              {promo.cta}
              <span
                aria-hidden="true"
                className="rtl-mirror transition-transform duration-500 ease-out delay-0 group-hover/promo:translate-x-1 group-hover/promo:delay-300"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MegaMenuGroup({
  label,
  items,
  onNavigate,
  delayMs = 80,
}: {
  label: string;
  items: readonly MegaMenuLink[];
  onNavigate?: () => void;
  delayMs?: number;
}) {
  return (
    <div className="megamenu-col" style={{ animationDelay: `${delayMs}ms` }}>
      <p className="text-[11px] font-bold tracking-[0.18em] text-blue uppercase">{label}</p>
      <ul className="mt-4 space-y-1.5">
        {items.map((it) => (
          <li key={`${it.to}-${it.hash ?? it.title}`}>
            <Link
              to={it.to}
              {...(it.hash ? { hash: it.hash } : {})}
              {...(onNavigate ? { onClick: onNavigate } : {})}
              className="group relative block rounded-lg px-3 py-3 transition-all duration-300 hover:bg-navy/[0.04]"
            >
              <span
                className="absolute start-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-orange opacity-0 transition-all duration-300 group-hover:h-8 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="block text-[15px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                {it.title}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted-fg transition-colors duration-300 group-hover:text-foreground/70">
                {it.desc}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
