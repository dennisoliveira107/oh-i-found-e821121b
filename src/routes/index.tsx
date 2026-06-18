import { createFileRoute } from "@tanstack/react-router";

// O site real é servido estaticamente de /public/index.html (deploy via Hostinger).
// Aqui, para que o PREVIEW do Lovable exiba o site (em vez de ficar em branco),
// renderizamos o index.html estático dentro de um iframe em tela cheia.
// Isto NÃO afeta o site em produção, que serve /public/index.html diretamente.
export const Route = createFileRoute("/")({
  component: HomePreview,
});

function HomePreview() {
  return (
    <iframe
      src="/index.html"
      title="Instituto Dr. Maxwell Pereira"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
