import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/index.html" });
  },
  component: HomePreview,
});

function HomePreview() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-foreground">
      <a className="underline" href="/index.html">
        Abrir Instituto Dr. Maxwell Pereira
      </a>
    </main>
  );
}
