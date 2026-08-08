import { createFileRoute } from "@tanstack/react-router";
import contactBuilding from "@/assets/contact-building.jpg";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — World Business Council" },
      {
        name: "description",
        content: "Get in touch with the World Business Council in Paris. Send us a message and our team will respond.",
      },
      { property: "og:title", content: "Contact the World Business Council" },
      { property: "og:description", content: "Reach the WBC team in Paris by email or through our contact form." },
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
            email: "info@wbccme.org",
            address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
          },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        image={contactBuilding}
        width={1600}
        height={800}
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Questions about membership, partnerships, or events? Our team in Paris is here to help."
      />

      <section className="py-16 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-[22px] font-bold text-navy lg:text-2xl">Contact Information</h2>
            <span className="accent-rule mt-4" />
            <p className="mt-5 text-[13.5px] leading-relaxed text-muted-fg">
              Reach out to the World Business Council for membership enquiries, partnership proposals, or general
              questions.
            </p>

            <dl className="mt-8 space-y-5 text-[13.5px]">
              <div>
                <dt className="font-semibold text-navy">Mailing Address</dt>
                <dd className="mt-1 text-muted-fg">World Business Council, Paris, France</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Email</dt>
                <dd className="mt-1">
                  <a href="mailto:info@wbccme.org" className="text-orange hover:underline">
                    info@wbccme.org
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 grid aspect-[16/9] w-full place-items-center rounded-card border border-line bg-surface text-[12px] text-muted-fg">
              Map — Paris, France
            </div>
          </div>

          <div className="rounded-card border border-line bg-background p-6 shadow-card lg:p-8">
            <h2 className="text-[22px] font-bold text-navy lg:text-2xl">Send Us a Message</h2>
            <span className="accent-rule mt-4 mb-6" />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
