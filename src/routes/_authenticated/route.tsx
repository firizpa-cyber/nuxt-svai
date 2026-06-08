import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const session = localStorage.getItem("admin_session");
    if (!session) throw redirect({ to: "/auth" });
    return { user: { id: session, email: session } };
  },
  component: () => <Outlet />,
});
