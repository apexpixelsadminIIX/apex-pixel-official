import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AnimatedOutlet } from "@/components/site/AnimatedOutlet";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/site/ButtonLink";
import { FloatingMark } from "@/components/site/FloatingMark";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Stripes } from "@/components/site/Stripes";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

function NotFoundComponent() {
  return (
    <main
      id="main"
      className="tone-dark grid-bg-dark flex min-h-[80vh] flex-col items-center justify-center px-4 text-center"
    >
      <FloatingMark className="mx-auto w-56" />
      <h1 className="mt-8 font-display text-4xl font-bold tracking-tight md:text-5xl">
        This page took a wrong turn.
      </h1>
      <p className="muted mt-3 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <ButtonLink href="/" size="md">
          Back to Home
        </ButtonLink>
      </div>
      <Stripes count={6} className="mt-10" itemClassName="h-2 w-6" />
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading this page. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
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
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} — ${site.tagline}` },
      {
        name: "description",
        content:
          "Apex Pixels designs and builds websites, web apps and business software from Chennai, for businesses anywhere in India.",
      },
      { name: "author", content: site.name },
      { property: "og:site_name", content: site.name },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon-512.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Respect prefers-reduced-motion for every Framer Motion animation:
          movements become simple opacity fades. */}
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-orange focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <AnimatedOutlet />
        <Footer />
        <WhatsAppFab />
      </MotionConfig>
    </QueryClientProvider>
  );
}
