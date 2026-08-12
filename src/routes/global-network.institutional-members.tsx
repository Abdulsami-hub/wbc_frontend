import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/global-network/institutional-members")({
  beforeLoad: () => {
    throw redirect({ to: "/our-members" });
  },
});
