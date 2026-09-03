import { ExternalLink } from "lucide-react";
import { SimpleModal } from "@/components/SimpleModal";
import type { NewsItem } from "@/content/news";

export function NewsStoryModal({
  item,
  open,
  onOpenChange,
}: {
  item: NewsItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!item) return null;

  const hasSource = Boolean(item.sourceLabel || item.sourceUrl);

  return (
    <SimpleModal
      open={open}
      onOpenChange={onOpenChange}
      title={item.title}
      description={item.detail}
      className="w-[min(720px,calc(100vw-1.5rem))] p-0"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          width={1200}
          height={640}
          className="aspect-[16/9] w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/25 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-white/80 uppercase">
            {item.category}
            {item.dateLabel ? ` · ${item.dateLabel}` : ""}
          </p>
          <h2 className="mt-2 max-w-2xl text-[22px] font-bold leading-tight text-white sm:text-[28px]">
            {item.title}
          </h2>
        </div>
      </div>

      <div className="p-5 sm:p-7 lg:p-8">
        {hasSource ? (
          <div className="rounded-card border border-line bg-surface p-4 sm:p-5">
            {item.sourceLabel ? (
              <p className="text-[13px] leading-relaxed text-muted-fg sm:text-[14px]">
                <span className="font-semibold text-foreground">Source: </span>
                {item.sourceLabel}
              </p>
            ) : null}
            {item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-blue transition-colors hover:text-navy"
              >
                Original Article
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}

        {item.detail ? (
          <p className="mt-6 text-[16px] leading-relaxed text-muted-fg text-justify sm:text-[17px]">{item.detail}</p>
        ) : null}

        {item.bullets.length > 0 ? (
          <>
            <span className="accent-rule mt-6" />
            <h3 className="mt-6 text-[15px] font-bold tracking-[0.08em] text-foreground uppercase">Key points</h3>
            <ul className="mt-4 space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-foreground/90 sm:text-[16px]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </SimpleModal>
  );
}
