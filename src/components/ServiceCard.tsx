export function ServiceCard({
  kicker,
  title,
  body,
  image,
  index,
  className = "",
}: {
  kicker: string;
  title: string;
  body: string;
  image: string;
  index: number;
  className?: string;
}) {
  return (
    <li className={`group rounded-card border border-line bg-background p-5 sm:p-7 ${className}`}>
      <div className="flex gap-5 sm:gap-7">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-card sm:size-32">
          <img
            src={image}
            alt=""
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="card-zoom-img size-full object-cover"
          />
        </div>
        <div className="min-w-0 border-s border-line ps-5 sm:ps-7">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-blue uppercase">
            {String(index + 1).padStart(2, "0")} · {kicker}
          </p>
          <h3 className="mt-2 text-[19px] leading-snug font-bold text-foreground sm:text-[22px]">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{body}</p>
        </div>
      </div>
    </li>
  );
}
