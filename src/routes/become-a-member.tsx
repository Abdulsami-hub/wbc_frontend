import { createFileRoute, Link } from "@tanstack/react-router";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/become-a-member")({
  head: () => ({
    meta: [
      { title: "Become a Member — World Business Council" },
      {
        name: "description",
        content:
          "Apply for WBC membership online. Choose your category, submit the application form, and receive confirmation within 3 working days.",
      },
      { property: "og:title", content: "Apply for WBC Membership" },
      {
        property: "og:description",
        content: "Choose your membership category and submit the online application form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BecomeAMember,
});

const STEPS = [
  {
    title: "Complete the Application",
    body: "Fill the online Application-Form.",
    tone: "text-orange/70",
  },
  {
    title: "Process Payment",
    body: "Process membership payment.",
    tone: "text-teal",
  },
  {
    title: "Receive Confirmation",
    body: "Confirmation and certificate within 3 working days.",
    tone: "text-orange",
    highlight: true,
  },
] as const;

function BecomeAMember() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy to-navy-dark rtl:bg-gradient-to-l"
          aria-hidden="true"
        />
        <div className="container-wbc relative py-16 text-center lg:py-24">
          <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white/80 uppercase">Membership</p>
          <h1 className="intro-2 mt-4 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[52px]">
            Apply for Membership
          </h1>
          <p className="intro-3 mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
            Choose your membership category and submit the online application form.
          </p>
          <Link to="/membership" hash="join" className="btn-orange intro-4 mt-8">
            View Membership Benefits
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading
            title="How to Apply"
            description="Fill the online Application-Form and process the payment. You will receive the membership confirmation and certificate within 3 working days."
          />

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border border-line bg-background p-7 shadow-card sm:p-8">
                <span
                  className={`inline-flex size-10 items-center justify-center bg-surface text-[14px] font-bold tabular-nums ${step.tone}`}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <h3
                  className={`mt-5 text-[20px] leading-snug font-bold ${
                    step.highlight ? "text-orange" : "text-navy"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="application" className="bg-surface py-16 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-4xl border border-line bg-background p-6 shadow-card sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="eyebrow">Application Form</p>
              <h2 className="mt-3 text-[26px] leading-tight font-bold text-navy sm:text-3xl">Become a Member</h2>
              <span className="accent-rule mt-4" />
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-fg">
                Select your membership category and complete the form below. Required fields are marked with an asterisk.
              </p>
            </div>
            <MembershipApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
