import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/team-hero.jpg";
import { CmsLink } from "@/components/CmsLink";
import { SimpleModal } from "@/components/SimpleModal";
import { Skeleton } from "@/components/ui/skeleton";
import type { TeamMember } from "@/content/wbc-team";
import { wbcTeamQueryOptions } from "@/lib/queries/wbc-team";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/wbc-team/")({
  ssr: false,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(wbcTeamQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero?.image;
    const title = loaderData?.hero?.title ?? "WBC Team";
    const description =
      loaderData?.hero?.description ??
      "Meet the World Business Council team supporting members, affiliates, and partners worldwide.";
    return seoHead({
      title,
      description,
      path: "/wbc-team",
      image: heroImage,
      preloadImage: heroImage,
    });
  },
  component: WbcTeam,
});

function PersonCard({ member, onOpen }: { member: TeamMember; onOpen: (m: TeamMember) => void }) {
  return (
    <li className="group overflow-hidden rounded-card border border-line bg-background">
      <button
        type="button"
        onClick={() => onOpen(member)}
        className="block w-full cursor-pointer text-start"
      >
        <div className="relative overflow-hidden">
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} at the World Business Council`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="card-zoom-img aspect-[4/5] w-full object-cover object-top"
          />
        </div>
        <div className="border-t border-line p-5 sm:p-6">
          <h4 className="text-[19px] leading-snug font-bold text-foreground">{member.name}</h4>
          <p className="mt-2 text-[13px] font-semibold tracking-[0.12em] text-foreground/70 uppercase">
            {member.role}
          </p>
          <span className="mt-5 block text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">
            View full profile
          </span>
        </div>
      </button>
    </li>
  );
}

function TeamProfileModal({
  member,
  open,
  onOpenChange,
}: {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!member) return null;

  return (
    <SimpleModal
      open={open}
      onOpenChange={onOpenChange}
      title={member.name}
      description={member.role}
      className="flex max-h-[min(90vh,760px)] flex-col overflow-hidden p-0"
    >
      <div className="grid shrink-0 lg:grid-cols-[minmax(240px,0.85fr)_1.15fr]">
        <div className="relative aspect-[4/5] max-h-[280px] bg-navy-deep sm:max-h-[320px] lg:aspect-auto lg:max-h-none lg:min-h-[320px]">
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} at the World Business Council`}
            width={800}
            height={1000}
            className="absolute inset-0 size-full object-cover object-top"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-deep/20"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:py-10 lg:pe-10">
          <p className="text-start text-[12px] font-bold tracking-[0.18em] text-muted-fg uppercase">
            {member.groupLabel}
          </p>
          <h2 className="mt-3 text-start text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">
            {member.name}
          </h2>
          <p className="mt-2 text-start text-[14px] font-bold tracking-[0.12em] text-navy uppercase">
            {member.role}
          </p>
          <span className="accent-rule mt-5" />

          {(member.email || member.phone) && (
            <div className="mt-6 space-y-3 border-t border-line pt-6 text-[15px]">
              {member.email && (
                <p className="text-muted-fg">
                  Email:{" "}
                  <a
                    href={`mailto:${member.email}`}
                    className="font-semibold text-foreground underline decoration-line underline-offset-4"
                  >
                    {member.email}
                  </a>
                </p>
              )}
              {member.phone && (
                <p className="text-muted-fg">
                  Phone: <span className="font-semibold text-foreground">{member.phone}</span>
                </p>
              )}
            </div>
          )}

          {(member.linkedinUrl || member.xUrl) && (
            <div className="mt-4 flex flex-wrap gap-6 text-[14px] font-semibold text-muted-fg">
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  LinkedIn
                </a>
              )}
              {member.xUrl && (
                <a
                  href={member.xUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  X
                </a>
              )}
            </div>
          )}

          <div className="mt-6">
            <Link to="/contact" className="btn-orange" onClick={() => onOpenChange(false)}>
              Contact WBC Team
            </Link>
          </div>
        </div>
      </div>

      {member.bio.trim() && (
        <div className="min-h-0 shrink border-t border-line bg-surface/30">
          <div className="max-h-[min(28vh,200px)] overflow-y-auto px-6 py-5 sm:px-8 [-webkit-overflow-scrolling:touch]">
            <p className="text-start text-[16px] leading-relaxed text-muted-fg">{member.bio}</p>
          </div>
        </div>
      )}
    </SimpleModal>
  );
}

function WbcTeamHeroSkeleton() {
  return (
    <section className="relative flex flex-col">
      <div
        className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block"
        aria-hidden="true"
      />
      <div className="bg-orange lg:bg-transparent">
        <div className="container-wbc py-16 lg:py-24">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
          <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
        </div>
      </div>
      <div className="hero-media-right bg-navy">
        <Skeleton className="absolute inset-0 size-full bg-white/10" />
      </div>
    </section>
  );
}

function WbcTeam() {
  const { data, isPending } = useQuery(wbcTeamQueryOptions);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  if (isPending) {
    return (
      <>
        <WbcTeamHeroSkeleton />
        <section className="py-14 lg:py-20">
          <div className="container-wbc">
            <Skeleton className="h-96 rounded-lg" />
          </div>
        </section>
      </>
    );
  }

  if (!data) return null;

  const { hero, people, members, collaborations } = data;
  const heroImage = hero.image ?? heroImg;
  const board = members.filter((member) => member.group === "board");
  const secretariat = members.filter((member) => member.group === "secretariat");

  return (
    <>
      <section className="relative flex flex-col">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block"
          aria-hidden="true"
        />
        <div className="bg-orange lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <div className="max-w-xl">
              <p className="intro-1 hero-kicker">{hero.kicker}</p>
              <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
                {hero.title}
              </h1>
              <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
                {hero.description}
              </p>
              {hero.tags.length > 0 && (
                <ul className="intro-4 mt-10 flex flex-wrap gap-3">
                  {hero.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-white/60 px-4 py-2.5 text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              {hero.cta && (
                <CmsLink
                  href={hero.cta.url}
                  fallback="/contact"
                  className="intro-4 mt-8 inline-block border border-white px-7 py-4 text-[16px] font-bold text-white transition-colors hover:bg-white hover:text-foreground"
                >
                  {hero.cta.label}
                </CmsLink>
              )}
            </div>
          </div>
        </div>
        <div className="hero-media-right bg-navy">
          <img
            src={heroImage}
            alt={hero.imageAlt}
            width={1200}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-foreground uppercase">
              {people.kicker}
            </p>
            <h2 className="mt-4 max-w-3xl text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[44px]">
              {people.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
              {people.description}
            </p>
          </div>

          <hr className="mt-12 border-line" />

          {board.length > 0 && (
            <>
              <div data-reveal className="mt-12 max-w-3xl border-s-4 border-orange ps-6">
                <h3 className="text-start text-[22px] font-bold text-foreground sm:text-[26px]">
                  {people.boardTitle}
                </h3>
                <p className="mt-3 text-start text-[15px] leading-relaxed text-muted-fg">
                  {people.boardDescription}
                </p>
              </div>
              <ul
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                aria-label={people.boardTitle}
              >
                {board.map((member) => (
                  <PersonCard key={member.slug} member={member} onOpen={setSelected} />
                ))}
              </ul>
            </>
          )}

          {secretariat.length > 0 && (
            <>
              <div data-reveal className="mt-16 max-w-3xl border-s-4 border-teal ps-6">
                <h3 className="text-start text-[22px] font-bold text-foreground sm:text-[26px]">
                  {people.secretariatTitle}
                </h3>
                <p className="mt-3 text-start text-[15px] leading-relaxed text-muted-fg">
                  {people.secretariatDescription}
                </p>
              </div>
              <ul
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                aria-label={people.secretariatTitle}
              >
                {secretariat.map((member) => (
                  <PersonCard key={member.slug} member={member} onOpen={setSelected} />
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface py-14 lg:py-20">
        <span
          className="pointer-events-none absolute -left-24 -top-24 size-[380px] rounded-full border border-line"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
              Collaboration in Practice
            </p>
            <h2 className="mt-4 max-w-3xl text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
              How the WBC team works as one coordinated network
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
              Our teams align across functions and regions to keep decisions clear, responses
              timely, and outcomes tied to a shared institutional mission.
            </p>
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-3">
            {collaborations.map((item, i) => (
              <li
                key={item.id}
                className="group relative overflow-hidden rounded-card border border-line bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-card sm:p-8"
              >
                <span
                  className="pointer-events-none absolute -end-8 -top-8 size-24 rounded-full bg-orange/10 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                <p className="relative text-start text-[15px] font-semibold tracking-[0.16em] text-muted-fg">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="relative mt-5 text-start text-[20px] font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="relative mt-4 text-start text-[16px] leading-relaxed text-muted-fg">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <hr data-reveal className="mt-14 border-line" />

          <Link to="/contact" className="btn-orange mt-10">
            Contact WBC to Start a Conversation{" "}
            <span aria-hidden="true" className="rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </section>

      <TeamProfileModal
        member={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </>
  );
}
