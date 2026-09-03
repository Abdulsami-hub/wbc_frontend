import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useMemo } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvertisingOpportunities } from "@/components/AdvertisingOpportunities";
import { JsonLd } from "@/components/seo/JsonLd";
import { I18nProvider } from "@/i18n";
import { footerCarouselQueryOptions } from "@/lib/queries/advertising-footer";
import { siteSettingsQueryOptions } from "@/lib/queries/site-settings";
import { DEFAULT_DESCRIPTION, graphSchema, organizationSchema, websiteSchema } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <>
      <title>Page Not Found | World Business Council</title>
      <meta
        name="description"
        content="This page could not be found on the World Business Council website."
      />
      <meta name="robots" content="noindex, follow" />
      <meta name="googlebot" content="noindex, follow" />

      <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
        <div className="max-w-lg text-center">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
            Error 404
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            The page you requested does not exist, was moved, or is no longer available. Use the
            links below to continue exploring the World Business Council.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go home
            </Link>
            <Link
              to="/news"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              News
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Events
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Opportunities
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <>
      <title>Something went wrong | World Business Council</title>
      <meta name="robots" content="noindex, follow" />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            This page didn't load
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Document shell for TanStack Start (`hydrateRoot(document)` / SSR only).
 *
 * CRITICAL (React 19): never render <html>/<body>/<head> under
 * createRoot(#root). That creates HostSingleton fibers whose container is
 * div#root while selectionchange targets #document — infinite loop →
 * Chrome "Page Unresponsive" on any input/textarea focus.
 *
 * Static SPA index.html already has the real document; shell must be a no-op.
 * Dev SSR still needs stylesheet + <Scripts /> or the page renders unstyled.
 * HeadContent lives here for SSR; SPA uses HeadContent inside RootComponent
 * (React 19 hoists title/meta/link to the document head).
 */
function RootShell({ children }: { children: ReactNode }) {
  const spaMount = typeof document !== "undefined" && document.getElementById("root") !== null;

  if (spaMount) {
    return children;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <HeadContent />
        <link rel="stylesheet" href={appCss} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Michroma&display=swap"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(footerCarouselQueryOptions),
      queryClient.ensureQueryData(siteSettingsQueryOptions),
    ]);
  },
  head: () => ({
    meta: [
      { title: "World Business Council | Connecting Businesses, Creating Opportunities" },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "developer", content: "Abdul Sami Fazilyar" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function SiteWideJsonLd() {
  const { data } = useQuery(siteSettingsQueryOptions);
  const schema = useMemo(() => {
    const sameAs = data?.socialLinks?.map((l) => l.url) ?? [];
    return graphSchema([
      organizationSchema({
        description: data?.footerDescription || DEFAULT_DESCRIPTION,
        sameAs,
      }),
      websiteSchema(),
    ]);
  }, [data?.footerDescription, data?.socialLinks]);

  return <JsonLd data={schema} />;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        {/* React 19 hoists these into document.head in the SPA mount */}
        <HeadContent />
        <SiteWideJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[60] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Outlet />
          {pathname !== "/advertising" &&
          pathname !== "/contact" &&
          pathname !== "/become-a-member" ? (
            <AdvertisingOpportunities />
          ) : null}
        </main>
        <Footer />
      </I18nProvider>
    </QueryClientProvider>
  );
}
