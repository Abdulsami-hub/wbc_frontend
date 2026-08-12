import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a-member")({
  beforeLoad: () => {
    throw redirect({ to: "/membership", hash: "application" });
  },
});
