import type { ReactNode } from "react";
import { useI18n } from "@/i18n";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  light?: boolean;
}) {
  const { tx } = useI18n();
  const centered = align === "center";
  const heading = typeof title === "string" ? tx(title) : title;
  return (
    <div data-reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && <p className="eyebrow">{tx(eyebrow)}</p>}
      <Tag
        className={`mt-3 text-[26px] leading-tight font-bold sm:text-3xl lg:text-[34px] ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {heading}
      </Tag>
      <span className={`accent-rule mt-4 ${centered ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-5 text-[15px] leading-relaxed ${light ? "text-white/80" : "text-muted-fg"}`}>
          {tx(description)}
        </p>
      )}
    </div>
  );
}
