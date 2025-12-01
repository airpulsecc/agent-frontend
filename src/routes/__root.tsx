import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";

import { type RouterContext } from "@/router";
import { Layout } from "@/layouts/layout";
import { events, useTrack } from "@/lib/posthog";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((mod) => ({
        default: mod.TanStackRouterDevtools,
      }))
    );

const TanStackQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-query-devtools").then((mod) => ({
        default: mod.ReactQueryDevtools,
      }))
    );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const track = useTrack();
  const location = useLocation();

  useEffect(() => {
    track(events.PAGE_VIEW, { path: location.pathname });
  }, [track, location.pathname]);

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>

      <Suspense>
        <TanStackRouterDevtools />
        <TanStackQueryDevtools />
      </Suspense>
    </>
  );
}
