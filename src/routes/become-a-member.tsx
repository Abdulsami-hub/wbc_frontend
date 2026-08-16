import { createFileRoute, Link } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { SplitHero } from "@/components/SplitHero";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";
import { APPLY_STEPS, AUDIENCES } from "@/content/membership";

export const Route = createFileRoute("/become-a-member")({
  head: () => ({
    meta: [
      { title: "Become a Member — World Business Council" },
      {
        name: "description",
        content:
          "Apply for WBC membership online. Fill the application form, process payment, and receive confirmation within 3 working days.",
      },
      { property: "og:title", content: "Become a Member — WBC" },
      {
        property: "og:description",
        content: "Start your WBC membership application and join a global business network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BecomeAMember,
});

function BecomeAMember() {
  return (
    <>
      <SplitHero
        eyebrow="Membership"
        title="Become a Member"
        description="Fill the online Application-Form and process the payment. You will receive the membership confirmation and certificate within 3 working days."
        tags={["Online Application", "Annual Fees", "3 Working Days"]}
        image={membershipImg}
        imageAlt="Business professionals shaking hands during a membership meeting"
        ctaLabel="View Benefits"
        ctaTo="/membership/benefits"
      />

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="container-wbc grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-reveal className="flex flex-col justify-center">
            <p className="eyebrow">Eligibility</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              Who can become a member
            </h2>
            <span className="accent-rule mt-5" />
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              All types of nonprofit organizations, corporations, entrepreneurs, professionals, individuals, students
              and academics.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {AUDIENCES.map((a) => (
                <li
                  key={a}
                  className="border border-line bg-surface px-4 py-2 text-[13px] font-semibold tracking-[0.04em] text-foreground"
                >
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link to="/membership/benefits" className="btn-navy !rounded-md">
                Compare Benefits
              </Link>
            </div>
          </div>

          <div data-reveal className="relative min-h-[320px] overflow-hidden rounded-card lg:min-h-full">
            <img
              src={membershipImg}
              alt="Business professionals shaking hands during a membership meeting"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-[12px] font-bold tracking-[0.18em] text-white/70 uppercase">Open network</p>
              <p className="mt-2 max-w-sm text-[20px] font-bold leading-snug text-white sm:text-[22px]">
                Whether you lead an institution, grow an SME, or work independently — there is a place for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -end-16 top-0 size-[360px] rounded-full bg-orange/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -start-20 bottom-0 size-[300px] rounded-full bg-teal/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
              Simple process
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[42px]"
            >
              How to apply
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-white/80">
              Fill the online Application-Form and process the payment. You will receive the membership confirmation and
              certificate within 3 working days.
            </p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            <span
              className="pointer-events-none absolute top-[2.75rem] start-[16%] end-[16%] hidden h-px bg-white/20 md:block"
              aria-hidden="true"
            />
            {APPLY_STEPS.map((step, i) => (
              <li key={step.title}>
                <article className="relative rounded-card border border-white/15 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 sm:p-8">
                  <span className="inline-flex size-12 items-center justify-center bg-orange text-[15px] font-bold tabular-nums text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-[20px] font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/75">{step.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/[0.04] to-transparent"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="mx-auto max-w-4xl">
            <div data-reveal className="mb-10 text-center sm:mb-12">
              <p className="eyebrow">Application Form</p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                Start your application
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-fg">
                Select your membership category and complete the form below. Required fields are marked with an asterisk.
              </p>
              <span className="accent-rule mx-auto mt-6" />
            </div>

            <div
              data-reveal
              className="relative overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-8 lg:p-10"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent"
                aria-hidden="true"
              />
              <MembershipApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
