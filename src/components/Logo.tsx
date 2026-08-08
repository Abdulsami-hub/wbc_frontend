import { Link } from "@tanstack/react-router";

export function Logo({ variant = "navy" }: { variant?: "navy" | "light" }) {
  const mark = variant === "light" ? "text-white" : "text-navy";
  const sub = variant === "light" ? "text-white/70" : "text-muted-fg";

  return (
    <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="World Business Council home">
      <span className={`font-bold tracking-tight ${mark}`} style={{ fontSize: "1.75rem", lineHeight: 1 }}>
        W<span className="text-orange">B</span>C
      </span>
      <span className={`hidden text-[9px] leading-[1.15] font-semibold uppercase sm:block ${sub}`}>
        World
        <br />
        Business
        <br />
        Council
      </span>
    </Link>
  );
}
