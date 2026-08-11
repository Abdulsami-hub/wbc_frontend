import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTeamMember } from "@/content/team";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/wbc-team/$slug")({
  loader: ({ params }) => {
    const member = getTeamMember(params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.member.name ?? "Team Member";
    return {
      meta: [
        { title: `${name} — WBC Team` },
        {
          name: "description",
          content: loaderData?.member.bio ?? "World Business Council team profile.",
        },
        { property: "og:title", content: `${name} — WBC Team` },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TeamProfile,
});

function TeamProfile() {
  const { member } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-line py-10">
        <div className="container-wbc">
          <nav aria-label="Breadcrumb" className="text-[14px] text-muted-fg">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/wbc-team" className="hover:text-foreground">
                  WBC Team
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-foreground">{member.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container-wbc grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <img
            data-reveal
            src={member.image}
            alt={`${member.name}, ${member.role} at the World Business Council`}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full rounded-card object-cover object-top shadow-card"
          />
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">{member.group}</p>
            <h1 className="mt-3 text-[34px] font-bold leading-tight text-foreground sm:text-[42px]">{member.name}</h1>
            <p className="mt-3 text-[15px] font-bold tracking-[0.14em] text-foreground uppercase">{member.role}</p>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-muted-fg">{member.bio}</p>

            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4 text-[16px]">
              <p className="text-muted-fg">
                Email:{" "}
                <a href={`mailto:${member.email}`} className="text-foreground underline decoration-line">
                  {member.email}
                </a>
              </p>
              <p className="text-muted-fg">
                Phone: <span className="text-foreground">{member.phone}</span>
              </p>
            </div>

            <div className="mt-8 flex items-center gap-8 text-[16px] text-muted-fg">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
                LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
                X
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Contact the WBC Team"
        description="Reach out to discuss membership, partnerships, or programme collaboration."
        ctaLabel="Contact Us"
        to="/contact"
      />
    </>
  );
}
