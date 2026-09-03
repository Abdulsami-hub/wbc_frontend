import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import contactHeroImg from "@/assets/contact-hero.png";
import { ContactForm } from "@/components/ContactForm";
import { ContactMap } from "@/components/ContactMap";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { contactQueryOptions } from "@/lib/queries/contact";

export const Route = createFileRoute("/contact")({
  // Per-route `head` is omitted for the static SPA — TanStack head sync on the
  // live document was freezing Chrome when focusing Contact inputs.
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(contactQueryOptions),
  component: Contact,
});

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ContactSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block" aria-hidden="true" />
        <div className="bg-orange lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-40 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-orange/80">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="py-16 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-2">
          <Skeleton className="h-[28rem] w-full" />
          <Skeleton className="h-[28rem] w-full" />
        </div>
      </section>
    </>
  );
}

function resolveCta(url: string, fallback = "/contact") {
  const resolved = resolveCmsUrl(url, fallback);
  if (resolved.kind === "internal") {
    const [path, hash] = resolved.path.split("#");
    return {
      ctaTo: path || fallback,
      ctaHash: hash || undefined,
      ctaHref: undefined as string | undefined,
    };
  }
  return { ctaTo: undefined, ctaHash: undefined, ctaHref: resolved.href };
}

function Contact() {
  const { data, isPending } = useQuery(contactQueryOptions);

  if (isPending) return <ContactSkeleton />;
  if (!data) return null;

  const { hero, info } = data;
  const heroCta = hero.cta ? resolveCta(hero.cta.url) : null;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        image={hero.image || contactHeroImg}
        imageAlt={hero.imageAlt}
        tone="orange"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
        ctaHash={heroCta?.ctaHash}
      />

      <section className="py-16 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8">
          <div>
            <h2 className="text-[22px] font-bold text-foreground lg:text-2xl">{info.sectionTitle}</h2>
            <span className="accent-rule mt-4" />
            {info.sectionDescription && (
              <p className="mt-5 text-[16px] leading-relaxed text-muted-fg text-justify">{info.sectionDescription}</p>
            )}

            <dl className="mt-10 space-y-8">
              {info.address && (
                <div>
                  <dt className="flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                    <span className="text-navy">
                      <PinIcon />
                    </span>
                    {info.addressLabel || "Address"}
                  </dt>
                  <dd className="mt-2 text-[22px] font-bold leading-snug text-foreground sm:text-[24px]">
                    {info.address}
                  </dd>
                </div>
              )}
              {info.email && (
                <div>
                  <dt className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${info.email}`}
                      className="text-[22px] font-bold text-foreground underline-offset-4 hover:underline sm:text-[24px]"
                    >
                      {info.email}
                    </a>
                  </dd>
                </div>
              )}
              {info.websiteUrl && (
                <div>
                  <dt className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Website</dt>
                  <dd className="mt-2">
                    <a
                      href={info.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[22px] font-bold text-foreground underline-offset-4 hover:underline sm:text-[24px]"
                    >
                      {info.websiteLabel || info.websiteUrl}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div
            data-no-translate
            className="flex flex-col rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card lg:row-span-2 lg:h-full lg:p-8"
          >
            <h2 className="text-[22px] font-bold text-foreground lg:text-2xl">Send Us a Message</h2>
            <span className="accent-rule mt-4 mb-6" />
            <ContactForm className="min-h-0 flex-1" />
          </div>

          <div>
            {info.hasMap && (
              <ContactMap
                address={info.address}
                lat={info.mapLat}
                lng={info.mapLng}
                linkUrl={info.mapLinkUrl}
              />
            )}

            {!info.address && !info.email && !info.websiteUrl && !info.hasMap && (
              <p className="text-[15px] text-muted-fg">
                Contact details will appear here once they are published. You can still send a message using the form.
              </p>
            )}

            <p className="mt-8 text-[14px] text-muted-fg">
              Looking for careers?{" "}
              <Link to="/jobs" className="font-semibold text-navy hover:underline">
                View open internships
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
