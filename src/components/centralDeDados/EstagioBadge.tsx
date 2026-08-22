import { ESTAGIO_META } from "../../lib/avaliacaoClimatica";
import type { EstagioAvaliacaoClimatica } from "../../types";

interface EstagioBadgeProps {
  estagio: EstagioAvaliacaoClimatica;
  size?: "sm" | "md";
}

export function EstagioBadge({ estagio, size = "sm" }: EstagioBadgeProps) {
  const s = ESTAGIO_META[estagio];
  const Icon = s.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${padding} ${s.bg} ${s.text} ${s.border}`}
    >
      <Icon className={iconSize} />
      {s.label}
    </span>
  );
}
