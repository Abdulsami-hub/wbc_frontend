import { Link } from "@tanstack/react-router";

export function CTASection({
  title,
  description,
  ctaLabel,
  to,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
}) {
  return (
    <section className="bg-navy py-16 lg:py-20">
      <div className="container-wbc text-center">
        <h2 className="text-[26px] leading-tight font-bold text-white sm:text-3xl lg:text-[34px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-white/80">{description}</p>
        <Link to={to} className="btn-orange mt-8">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
