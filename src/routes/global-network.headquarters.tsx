import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/global-network/headquarters")({
  beforeLoad: () => {
    throw redirect({ to: "/who-we-are" });
  },
});
