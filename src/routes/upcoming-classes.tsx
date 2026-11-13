import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL redirect — old /upcoming-classes links now resolve to /live-classes.
export const Route = createFileRoute("/upcoming-classes")({
  beforeLoad: () => {
    throw redirect({ to: "/live-classes" });
  },
});
