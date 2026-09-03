import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length < 2) return null;

  const schema = breadcrumbSchema(items);

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-surface/60">
      <div className="container-wbc py-3">
        <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted-fg">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-1">
                {index > 0 ? (
                  <ChevronRight
                    className="size-3.5 shrink-0 opacity-60 rtl-mirror"
                    aria-hidden="true"
                  />
                ) : null}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.name}
                  </span>
                ) : item.path === "/" ? (
                  <Link to="/" className="transition-colors hover:text-navy">
                    {item.name}
                  </Link>
                ) : (
                  <a href={item.path} className="transition-colors hover:text-navy">
                    {item.name}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <JsonLd data={schema} />
    </nav>
  );
}
