import { useRouter } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";
import { resolveCmsUrl } from "@/lib/cms-url";

type CmsLinkProps = {
  href: string;
  fallback?: string;
  className?: string;
  children: ReactNode;
};

function shouldHandleClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey
  );
}

/** CMS/admin URL → SPA navigation or external link. */
export function CmsLink({ href, fallback = "/", className, children }: CmsLinkProps) {
  const router = useRouter();
  const resolved = resolveCmsUrl(href, fallback);

  if (resolved.kind === "external") {
    return (
      <a
        href={resolved.href}
        className={className}
        {...(resolved.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={resolved.path}
      className={className}
      onClick={(event) => {
        if (!shouldHandleClick(event)) return;
        event.preventDefault();
        void router.navigate({ to: resolved.path });
      }}
    >
      {children}
    </a>
  );
}
