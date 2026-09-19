import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";

export function CTASection({
  title,
  description,
  ctaLabel,
  to,
  hash,
  dynamic = false,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  hash?: string;
  dynamic?: boolean;
}) {
  const { tx } = useI18n();
  return (
    <section className="bg-navy py-16 lg:py-20">
      <div data-reveal className="container-wbc text-center" {...(dynamic ? { "data-dynamic": "" } : {})}>
        <h2 className="text-[26px] leading-tight font-bold text-white sm:text-3xl lg:text-[34px]">
          {dynamic ? title : tx(title)}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
          {dynamic ? description : tx(description)}
        </p>
        <Link to={to} {...(hash ? { hash } : {})} className="btn-orange mt-8">
          {dynamic ? ctaLabel : tx(ctaLabel)}
        </Link>
      </div>
    </section>
  );
}
