import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/events" });
  },
});
