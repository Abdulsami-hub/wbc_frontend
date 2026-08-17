import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { AffiliateProfile } from "@/content/affiliates";
import {
  getAffiliateDetails,
  placeTitle,
  type AffiliateContact,
  type AffiliateMedia,
  type AffiliateOfficer,
} from "@/content/affiliate-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import flyerImg from "@/assets/events.jpg";
import photoA from "@/assets/news-forum.jpg";
import photoB from "@/assets/membership.jpg";
import photoC from "@/assets/wwd-network.jpg";
import photoD from "@/assets/wwd-events.jpg";
import photoE from "@/assets/wwd-trade.jpg";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#officers", label: "Officers" },
  { href: "#contact", label: "Contact" },
] as const;

export function AffiliateLocationProfile({
  affiliate,
}: {
  affiliate: Extract<AffiliateProfile, { kind: "country" | "city" }>;
}) {
  const details = getAffiliateDetails(affiliate);
  const title = placeTitle(affiliate);
  const isActive = affiliate.status === "active";
  const seed = title.length + affiliate.slug.length;
  const stats = [
    { label: "Established", value: String(2015 + (seed % 9)) },
    { label: "Members", value: `${40 + ((seed * 11) % 160)}+` },
    { label: "Programmes / year", value: String(6 + (seed % 10)) },
    { label: "Status", value: isActive ? "Active" : "Inactive" },
  ];
  const media: AffiliateMedia = {
    flyer: details.media.flyer ?? flyerImg,
    photos: details.media.photos.length > 0 ? details.media.photos : [photoA, photoB, photoC, photoD, photoE],
    videos:
      details.media.videos.length > 0
        ? details.media.videos
        : ["https://www.youtube.com/embed/LXb3EKWsInQ", "https://www.youtube.com/embed/sNhhvQGsMEc"],
  };

  const [activeNav, setActiveNav] = useState("#about");
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveNav(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="grid lg:grid-cols-[1.12fr_1fr]">
        <div className="relative overflow-hidden bg-teal px-6 py-14 sm:px-10 lg:py-20 xl:px-16">
          <span className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <span className="pointer-events-none absolute -start-10 bottom-0 size-40 rounded-full bg-navy/20 blur-2xl" aria-hidden="true" />

          <div className="relative mx-auto max-w-xl">
            <nav aria-label="Breadcrumb" className="intro-1 text-[13px] text-white/75">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/affiliates" className="hover:text-white">
                    Affiliates
                  </Link>
                </li>
                {affiliate.kind === "city" ? (
                  <>
                    <li aria-hidden="true">/</li>
                    <li>
                      <Link to="/affiliates/$slug" params={{ slug: affiliate.countrySlug }} className="hover:text-white">
                        {affiliate.countryName}
                      </Link>
                    </li>
                  </>
                ) : null}
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-white">{affiliate.name}</li>
              </ol>
            </nav>

            <p className="intro-1 mt-8 font-display text-[12px] tracking-[0.22em] text-white/80 uppercase">
              {affiliate.region}
            </p>

            <div className="intro-2 mt-5 flex items-center gap-4">
              {details.logo ? (
                <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1.5 shadow-card">
                  <img src={details.logo} alt="" className="size-full object-contain" />
                </span>
              ) : null}
              <h1 className="text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[52px]">{title}</h1>
            </div>

            <div className="intro-3 mt-5 flex flex-wrap gap-2">
              <span className="border border-white/70 px-3 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-white uppercase">
                {isActive ? "Active affiliate" : "Inactive affiliate"}
              </span>
              <span className="border border-white/40 px-3 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-white/85 uppercase">
                {affiliate.kind === "city" ? "City" : "Country"}
              </span>
            </div>

            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
              {details.locationIntro}
            </p>

            <div className="intro-4 mt-8 flex flex-wrap gap-3">
              <a href="#about" className="btn-orange-to-outline !min-h-9 !rounded-md !px-4 !text-[12px]">
                Explore the affiliate
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-9 items-center border-b-2 border-white pb-0.5 text-[14px] font-bold text-white"
              >
                Contact details <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden bg-navy-deep lg:min-h-[560px]">
          {details.heroImage ? (
            <img
              src={details.heroImage}
              alt=""
              className="affiliate-hero-img absolute inset-0 size-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </div>
      </section>

      <div className="sticky top-[57px] z-30 border-b border-line bg-background/90 shadow-[0_8px_24px_oklch(0.28_0.02_255_/_0.06)] backdrop-blur-md">
        <nav className="container-wbc flex gap-2 overflow-x-auto py-3" aria-label="On this page">
          {NAV.map((item) => {
            const on = activeNav === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.04em] transition-all duration-300 ${
                  on ? "bg-navy text-white shadow-card" : "text-muted-fg hover:bg-surface hover:text-navy"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <section className="relative overflow-hidden border-b border-line bg-surface py-10 lg:py-12">
        <div className="pointer-events-none absolute -start-16 top-0 size-48 rounded-full bg-teal/10 blur-3xl" aria-hidden="true" />
        <div className="container-wbc relative">
          <ul data-reveal data-reveal-group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.label}>
                <article className="group relative overflow-hidden rounded-card border border-line bg-background p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg sm:p-6">
                  <span className="guide-glow -end-10 -top-10 size-28 bg-orange/30" aria-hidden="true" />
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">{s.label}</p>
                    <span className="font-display text-[15px] font-bold text-blue/30 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-[28px] font-bold tracking-tight text-navy transition-transform duration-300 group-hover:translate-x-0.5">
                    {s.value}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-28 overflow-hidden border-b border-line py-16 lg:py-24">
        <div className="pointer-events-none absolute -end-24 top-10 size-[320px] rounded-full bg-blue/8 blur-3xl" aria-hidden="true" />
        <div className="container-wbc relative grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div data-reveal>
            <p className="eyebrow">About the affiliate</p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-foreground sm:text-[40px]">
              Local presence, global reach
            </h2>
            <span className="accent-rule mt-5" />
            <p className="mt-6 text-[17px] leading-relaxed text-muted-fg sm:text-[18px]">{details.about}</p>

            {affiliate.kind === "country" && affiliate.cities.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-[12px] font-semibold tracking-[0.16em] text-muted-fg uppercase">Cities in this country</h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {affiliate.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        to="/affiliates/$slug"
                        params={{ slug: city.slug }}
                        className={`inline-flex rounded-card border px-4 py-2 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${
                          city.status === "active"
                            ? "border-teal/55 text-teal hover:bg-teal/5"
                            : "border-line text-muted-fg hover:border-muted-fg/40"
                        }`}
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {affiliate.kind === "city" ? (
              <Link
                to="/affiliates/$slug"
                params={{ slug: affiliate.countrySlug }}
                className="mt-8 inline-flex items-center gap-2 rounded-card border border-line bg-background px-4 py-3 text-[15px] font-semibold shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40"
              >
                Country profile: {affiliate.countryName}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>

          <aside data-reveal className="group relative overflow-hidden rounded-card border border-navy/10 bg-navy p-7 text-white shadow-card sm:p-8">
            <span className="pointer-events-none absolute -end-10 -top-10 size-36 rounded-full bg-orange/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange/25" aria-hidden="true" />
            <p className="relative text-[12px] font-bold tracking-[0.18em] text-white/60 uppercase">At a glance</p>
            <ul className="relative mt-6 space-y-5">
              <GlanceRow label="Type" value={affiliate.kind === "city" ? "City affiliate" : "Country affiliate"} />
              <GlanceRow label="Region" value={affiliate.region} />
              <GlanceRow label="Headquarters" value="Paris" />
            </ul>
            <Link
              to="/affiliates"
              className="relative mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-0.5 text-[14px] font-semibold text-white transition-colors hover:border-orange hover:text-orange"
            >
              ← All affiliates
            </Link>
          </aside>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 border-b border-line bg-surface py-16 lg:py-24">
        <div className="container-wbc">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-[30px] font-bold text-foreground sm:text-[38px]">Services & activities</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Practical support for members on the ground, plus a year-round calendar of local programmes.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div data-reveal>
              <h3 className="text-[13px] font-bold tracking-[0.16em] text-blue uppercase">Services</h3>
              <ul className="mt-5 grid gap-3">
                {details.services.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-card border border-line bg-background p-4 shadow-card transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="font-display text-[18px] font-bold text-orange/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-snug text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className="text-[13px] font-bold tracking-[0.16em] text-blue uppercase">Activities</h3>
              <ul className="mt-5 grid gap-3">
                {details.activities.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-card border border-line bg-background p-4 shadow-card transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="font-display text-[18px] font-bold text-navy/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-snug text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <MediaSection media={media} />
      <OfficersSection officers={details.officers} />
      <ContactSection contact={details.contact} place={title} />
    </>
  );
}

function MediaSection({ media }: { media: AffiliateMedia }) {
  const [active, setActive] = useState<{ kind: "image" | "video"; src: string; label: string } | null>(null);

  const items: { kind: "image" | "video"; src: string; label: string }[] = [];
  if (media.flyer) items.push({ kind: "image", src: media.flyer, label: "Flyer" });
  media.photos.forEach((src, i) => items.push({ kind: "image", src, label: `Photo ${i + 1}` }));
  media.videos.forEach((src, i) => items.push({ kind: "video", src, label: `Video ${i + 1}` }));

  if (items.length === 0) return null;

  const [hero, sideA, sideB, ...rest] = items;

  return (
    <section id="gallery" className="scroll-mt-28 border-b border-line py-16 lg:py-24">
      <div className="container-wbc">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-3 text-[30px] font-bold text-foreground sm:text-[38px]">Flyer, pictures & video</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Featured media in a collage layout. Click any tile to open it larger — add as many files as you need.
            </p>
          </div>
          <p className="text-[13px] font-semibold text-muted-fg">{items.length} items</p>
        </div>

        <div data-reveal className="mt-10 space-y-3">
          {/* Bento hero: large left + stacked right (reference layout) */}
          <div
            className={`grid gap-3 ${
              items.length === 1
                ? "grid-cols-1"
                : items.length === 2
                  ? "min-h-[280px] grid-cols-1 sm:min-h-[380px] sm:grid-cols-3 sm:grid-rows-2 lg:min-h-[440px]"
                  : "min-h-[320px] grid-cols-1 sm:min-h-[400px] sm:grid-cols-3 sm:grid-rows-2 lg:min-h-[480px]"
            }`}
          >
            <MediaBentoTile
              item={hero}
              featured
              className={
                items.length === 1
                  ? "aspect-[16/10] sm:aspect-[21/9]"
                  : "aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-0 sm:h-full"
              }
              onOpen={setActive}
            />
            {sideA ? (
              <MediaBentoTile
                item={sideA}
                className={
                  items.length === 2
                    ? "aspect-[4/3] sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-full sm:min-h-0"
                    : "aspect-[4/3] sm:col-span-1 sm:row-span-1 sm:aspect-auto sm:h-full sm:min-h-0"
                }
                onOpen={setActive}
              />
            ) : null}
            {sideB ? (
              <MediaBentoTile
                item={sideB}
                className="aspect-[4/3] sm:col-span-1 sm:row-span-1 sm:aspect-auto sm:h-full sm:min-h-0"
                onOpen={setActive}
              />
            ) : null}
          </div>

          {/* Additional media — masonry-style rows */}
          {rest.length > 0 ? (
            <ul data-reveal data-reveal-group className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {rest.map((item, i) => (
                <li key={`${item.label}-${item.src}`} className={i === 0 && rest.length >= 3 ? "md:col-span-2" : ""}>
                  <MediaBentoTile
                    item={item}
                    className={i === 0 && rest.length >= 3 ? "aspect-[21/9]" : "aspect-[4/3]"}
                    onOpen={setActive}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-[min(720px,calc(100vw-1.5rem))] overflow-hidden p-0">
          <DialogHeader className="px-5 pt-5">
            <DialogTitle>{active?.label ?? "Media"}</DialogTitle>
          </DialogHeader>
          <div className="bg-navy/5 p-5 pt-3">
            {active?.kind === "image" ? (
              <img src={active.src} alt={active.label} className="mx-auto max-h-[70vh] w-auto max-w-full object-contain" />
            ) : active?.kind === "video" ? (
              <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                <iframe
                  src={active.src}
                  title={active.label}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function MediaBentoTile({
  item,
  className = "",
  featured,
  onOpen,
}: {
  item: { kind: "image" | "video"; src: string; label: string };
  className?: string;
  featured?: boolean;
  onOpen: (item: { kind: "image" | "video"; src: string; label: string }) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative block h-full w-full overflow-hidden rounded-lg bg-navy/10 text-start shadow-card transition-transform duration-500 hover:scale-[1.01] ${className}`}
    >
      {item.kind === "image" ? (
        <img
          src={item.src}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <>
          <iframe
            src={item.src}
            title={item.label}
            className="pointer-events-none absolute inset-0 size-full scale-110 object-cover"
            tabIndex={-1}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-navy/20 transition-colors duration-300 group-hover:bg-navy/35">
            <span
              className={`flex items-center justify-center rounded-full bg-white/95 text-navy shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                featured ? "size-14 text-[22px]" : "size-11 text-[18px]"
              }`}
            >
              ▶
            </span>
          </span>
        </>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 translate-y-full px-4 py-3 text-[12px] font-semibold tracking-[0.1em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
        {item.label}
      </span>
    </button>
  );
}

function OfficersSection({ officers }: { officers: AffiliateOfficer[] }) {
  if (officers.length === 0) return null;

  return (
    <section id="officers" className="scroll-mt-28 border-b border-line bg-surface py-16 lg:py-24">
      <div className="container-wbc">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-3 text-[30px] font-bold text-foreground sm:text-[38px]">Officers</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
            A compact directory that scales with the team. Portraits, roles, and contact details stay aligned as people
            are added or removed.
          </p>
        </div>

        <ul data-reveal data-reveal-group className="mt-10 grid gap-4 md:grid-cols-2">
          {officers.map((officer) => (
            <li key={`${officer.position}-${officer.name}`}>
              <article className="flex h-full items-center gap-4 rounded-card border border-line bg-background p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-5 sm:p-5">
                <div className="size-[88px] shrink-0 overflow-hidden rounded-full border border-line bg-navy/10 sm:size-[96px]">
                  {officer.photo ? (
                    <img
                      src={officer.photo}
                      alt=""
                      width={192}
                      height={192}
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-[18px] font-bold text-navy/40">
                      {initials(officer.name)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-orange uppercase">{officer.position}</p>
                  <h3 className="mt-1 text-[18px] font-bold text-foreground sm:text-[19px]">{officer.name}</h3>
                  <div className="mt-2 space-y-0.5 text-[13px] text-muted-fg sm:text-[14px]">
                    {officer.email ? (
                      <a href={`mailto:${officer.email}`} className="block truncate hover:text-navy">
                        {officer.email}
                      </a>
                    ) : null}
                    {officer.phone ? (
                      <a href={`tel:${officer.phone}`} className="block hover:text-navy">
                        {officer.phone}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactSection({ contact, place }: { contact: AffiliateContact; place: string }) {
  const rows = [
    { label: "Address", value: contact.address },
    { label: "Website", value: contact.website, href: contact.website },
    { label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { label: "Phone", value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : undefined },
  ];
  const mapQuery = encodeURIComponent(contact.address ?? place);

  return (
    <section id="contact" className="scroll-mt-28 py-16 lg:py-24">
      <div className="container-wbc">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-[30px] font-bold text-foreground sm:text-[38px]">Visit & get in touch</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
            Sample contact details for layout review. Replace with the affiliate’s official address and channels.
          </p>
        </div>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-card border border-line shadow-card lg:grid-cols-2">
          <div data-reveal className="bg-background p-7 sm:p-9">
            <dl className="space-y-5">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">{row.label}</dt>
                  <dd className="mt-1.5 text-[16px] text-foreground">
                    {row.value && row.href ? (
                      <a
                        href={row.href}
                        className="hover:text-teal"
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span>{row.value ?? "To be added"}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-8 text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">Social media</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {contact.socials.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-md border border-line px-3 py-2 text-[13px] font-semibold transition-colors hover:border-teal hover:text-teal"
                    >
                      {s.label}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
          <iframe
            title={`Map — ${place}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
            className="h-[280px] w-full lg:h-full lg:min-h-[420px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-white/15 pb-4 last:border-0 last:pb-0">
      <span className="text-[13px] text-white/65">{label}</span>
      <span className="max-w-[60%] text-end text-[15px] font-semibold">{value}</span>
    </li>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
