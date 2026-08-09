import { Link } from "@tanstack/react-router";
import logoNavy from "@/assets/wbc-logo.png";
import logoLight from "@/assets/wbc-logo-light.png";

export function Logo({ variant = "navy" }: { variant?: "navy" | "light" }) {
  const src = variant === "light" ? logoLight : logoNavy;

  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="World Business Council home">
      <img
        src={src}
        alt="World Business Council"
        width={220}
        height={58}
        className="h-9 w-auto object-contain object-left sm:h-10"
        decoding="async"
      />
    </Link>
  );
}
