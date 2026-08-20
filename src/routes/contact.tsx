import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import contactHero from "@/assets/contact-hero.png";
import { SplitHero } from "@/components/SplitHero";
import { ContactForm } from "@/components/ContactForm";

const ADDRESS_LINE = "36, rue Scheffer, 75016 Paris";
const EMAIL = "contact@wbccme.org";
const MAPS_QUERY = encodeURIComponent(`${ADDRESS_LINE}, France`);
const MAP_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export const Route = createFileRoute("/contact")({
  // Per-route `head` is omitted for the static SPA — TanStack head sync on the
  // live document was freezing Chrome when focusing Contact inputs.
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

function ContactMap() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="mt-10 overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
      {showMap ? (
        <iframe
          title={`Map — ${ADDRESS_LINE}`}
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[16/10] w-full border-0"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-surface px-6 text-center transition-colors hover:bg-light-grey"
        >
          <span className="text-[15px] font-semibold text-foreground">Load map</span>
          <span className="text-[13px] text-muted-fg">{ADDRESS_LINE}</span>
        </button>
      )}
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
        image={contactHero}
        imageAlt="WBC headquarters at 36 rue Scheffer in Paris at dusk"
        tone="orange"
      />

      <section className="py-16 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
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
            </dl>

            <ContactMap />
          </div>

          <div
            data-no-translate
            className="rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card lg:p-8"
          >
            <h2 className="text-[22px] font-bold text-foreground lg:text-2xl">Send Us a Message</h2>
            <span className="accent-rule mt-4 mb-6" />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
