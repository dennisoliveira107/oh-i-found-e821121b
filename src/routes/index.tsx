import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/index.html" });
  },
  component: HomePreview,
});

function HomePreview() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
      <h1 className="text-2xl font-semibold">Instituto Dr. Maxwell Pereira</h1>
      <a className="underline" href="/index.html">
        Abrir Instituto Dr. Maxwell Pereira
      </a>
    </main>
  );
}
