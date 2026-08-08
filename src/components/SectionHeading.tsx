import type { ReactNode } from "react";

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
  const centered = align === "center";
  return (
    <div data-reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        className={`mt-3 text-[26px] leading-tight font-bold sm:text-3xl lg:text-[34px] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </Tag>
      <span className={`accent-rule mt-4 ${centered ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-5 text-[15px] leading-relaxed ${light ? "text-white/80" : "text-muted-fg"}`}>{description}</p>
      )}
    </div>
  );
}
