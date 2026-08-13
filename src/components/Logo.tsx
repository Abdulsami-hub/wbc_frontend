import { Link } from "@tanstack/react-router";
import logoNavy from "@/assets/wbc-logo.png";
import logoLight from "@/assets/wbc-logo-light.png";
import logoFooter from "@/assets/wbc-logo-footer.png";

export function Logo({
  variant = "navy",
  size = "default",
  framed = false,
  onClick,
}: {
  variant?: "navy" | "light" | "footer";
  size?: "default" | "lg";
  /** White padded background — use on dark surfaces when the logo needs contrast. */
  framed?: boolean;
  onClick?: () => void;
}) {
  const src =
    variant === "footer" ? logoFooter : variant === "light" && !framed ? logoLight : logoNavy;
  const heightClass =
    variant === "footer"
      ? size === "lg"
        ? "h-12 w-auto sm:h-14"
        : "h-11 w-auto sm:h-12"
      : size === "lg"
        ? "h-11 w-auto sm:h-12 lg:h-[52px]"
        : "h-10 w-auto sm:h-11";

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center ${framed ? "w-fit rounded-md bg-white px-3 py-2 shadow-sm" : ""}`}
      aria-label="World Business Council home"
    >
      <img
        src={src}
        alt="World Business Council"
        width={variant === "footer" ? 320 : 260}
        height={variant === "footer" ? 80 : 68}
        className={`${heightClass} object-contain object-left`}
        decoding="async"
      />
    </Link>
  );
}
