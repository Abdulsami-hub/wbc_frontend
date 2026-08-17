import { createFileRoute } from "@tanstack/react-router";
import contactBuilding from "@/assets/contact-building.jpg";
import { SplitHero } from "@/components/SplitHero";
import { ContactForm } from "@/components/ContactForm";

const ADDRESS_LINE = "36, rue Scheffer, 75016 Paris";
const EMAIL = "contact@wbccme.org";
const MAPS_QUERY = encodeURIComponent(`${ADDRESS_LINE}, France`);
const MAP_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — World Business Council" },
      {
        name: "description",
        content: `Get in touch with the World Business Council at ${ADDRESS_LINE}. Email ${EMAIL} or send a message.`,
      },
      { property: "og:title", content: "Contact the World Business Council" },
      {
        property: "og:description",
        content: "Reach the WBC team in Paris by email or through our contact form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact the World Business Council",
          mainEntity: {
            "@type": "Organization",
            name: "World Business Council",
            email: EMAIL,
            address: {
              "@type": "PostalAddress",
              streetAddress: "36, rue Scheffer",
              postalCode: "75016",
              addressLocality: "Paris",
              addressCountry: "FR",
            },
          },
        }),
      },
    ],
  }),
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

function Contact() {
  return (
    <>
      <SplitHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Questions about membership, partnerships, or events? Our team in Paris is here to help."
        tags={["Membership", "Partnerships", "Media"]}
        image={contactBuilding}
        imageAlt="WBC headquarters building in Paris"
        tone="orange"
      />

      <section className="py-16 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-reveal>
            <h2 className="text-[22px] font-bold text-foreground lg:text-2xl">Contact Information</h2>
            <span className="accent-rule mt-4" />
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg text-justify">
              The World Business Council (WBC) connects members and partners across the world. Reach us by email or at
              our Paris mailbox address.
            </p>

            <dl className="mt-10 space-y-8">
              <div>
                <dt className="flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                  <span className="text-navy">
                    <PinIcon />
                  </span>
                  Mailbox Address
                </dt>
                <dd className="mt-2 text-[22px] font-bold leading-snug text-foreground sm:text-[24px]">
                  {ADDRESS_LINE}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-[22px] font-bold text-foreground underline-offset-4 hover:underline sm:text-[24px]"
                  >
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Website</dt>
                <dd className="mt-2">
                  <a
                    href="https://www.wbccme.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[22px] font-bold text-foreground underline-offset-4 hover:underline sm:text-[24px]"
                  >
                    www.wbccme.org
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Follow us</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/wbccme" },
                    { label: "X", href: "https://x.com/WBCCME" },
                    { label: "Facebook", href: "https://www.facebook.com/WBCCME" },
                    { label: "YouTube", href: "https://www.youtube.com/@WBCCME" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-line px-3 py-1.5 text-[13px] font-semibold text-foreground transition-colors hover:border-navy hover:text-navy"
                    >
                      {s.label}
                    </a>
                  ))}
                </dd>
                <p className="mt-3 text-[14px] font-semibold tracking-[0.08em] text-muted-fg uppercase">@WBCCME</p>
              </div>
            </dl>

            <div className="mt-10 overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
              <iframe
                title={`Map — ${ADDRESS_LINE}`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full border-0"
                allowFullScreen
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-background px-4 py-3 sm:px-5">
                <p className="text-[14px] font-medium text-foreground">{ADDRESS_LINE}</p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy hover:underline"
                >
                  Open in Maps <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <div data-reveal className="rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card lg:p-8">
            <h2 className="text-[22px] font-bold text-foreground lg:text-2xl">Send Us a Message</h2>
            <span className="accent-rule mt-4 mb-6" />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
