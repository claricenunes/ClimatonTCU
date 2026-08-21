import { useRef, useState, type MutableRefObject } from "react";
import { ESTADOS, BRASIL_MAP_PATHS, BRASIL_MAP_VIEWBOX } from "../../data/estados";
import type { EstadoSummary } from "../../hooks/useEstadoStatus";
import { STATUS_STYLES } from "../../lib/status";

const FILL_COLOR: Record<string, string> = {
  normal: "#8fcb98",
  atencao: "#f0d377",
  alerta: "#f0a25c",
  emergencia: "#e78680",
};

const FILL_COLOR_HOVER: Record<string, string> = {
  normal: "#6fb87c",
  atencao: "#e2bd4c",
  alerta: "#e28438",
  emergencia: "#d95f57",
};

interface TooltipState {
  uf: string;
  x: number;
  y: number;
}

interface BrazilMapProps {
  summaries: Record<string, EstadoSummary>;
  selectedUf: string | null;
  onSelect: (uf: string) => void;
}

export function BrazilMap({ summaries, selectedUf, onSelect }: BrazilMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map()) as MutableRefObject<Map<string, SVGPathElement>>;
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  function showTooltipFor(uf: string) {
    const el = pathRefs.current.get(uf);
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setTooltip({
      uf,
      x: elRect.left + elRect.width / 2 - containerRect.left,
      y: elRect.top - containerRect.top,
    });
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <svg
        viewBox={BRASIL_MAP_VIEWBOX}
        role="group"
        aria-label="Mapa do Brasil por estado. Selecione um estado para ver os municípios monitorados."
        className="h-auto w-full"
      >
        {ESTADOS.map((estado) => {
          const summary = summaries[estado.uf];
          const status = summary?.status ?? "normal";
          const isSelected = selectedUf === estado.uf;
          const isHovered = tooltip?.uf === estado.uf;
          const fill = isHovered || isSelected ? FILL_COLOR_HOVER[status] : FILL_COLOR[status];
          const label = `${estado.nome} (${estado.uf}): situação ${STATUS_STYLES[status].label.toLowerCase()}, ${summary?.total ?? 0} municípios monitorados`;

          return (
            <path
              key={estado.uf}
              ref={(el) => {
                if (el) pathRefs.current.set(estado.uf, el);
                else pathRefs.current.delete(estado.uf);
              }}
              d={BRASIL_MAP_PATHS[estado.uf]}
              fill={fill}
              strokeLinejoin="round"
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={label}
              onMouseEnter={() => showTooltipFor(estado.uf)}
              onMouseLeave={() => setTooltip(null)}
              onFocus={() => showTooltipFor(estado.uf)}
              onBlur={() => setTooltip(null)}
              onClick={() => onSelect(estado.uf)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(estado.uf);
                }
              }}
              className="cursor-pointer outline-none transition-[fill] duration-150"
              style={{
                stroke: isSelected ? "#123018" : "#f4f9f4",
                strokeWidth: isSelected ? 2.2 : 0.9,
              }}
            />
          );
        })}
      </svg>

      {tooltip &&
        (() => {
          const estado = ESTADOS.find((e) => e.uf === tooltip.uf)!;
          const summary = summaries[tooltip.uf];
          return (
            <div
              className="pointer-events-none absolute z-10 w-max max-w-56 -translate-x-1/2 -translate-y-full rounded-lg bg-[#123018] px-3 py-2 text-xs font-medium text-white shadow-lg animate-fade-in"
              style={{ left: tooltip.x, top: tooltip.y - 6 }}
            >
              <strong className="block">
                {estado.nome} <span className="font-normal text-brand-100">({estado.uf})</span>
              </strong>
              {STATUS_STYLES[summary?.status ?? "normal"].label} · {summary?.total ?? 0} município
              {summary?.total === 1 ? "" : "s"} monitorado{summary?.total === 1 ? "" : "s"}
            </div>
          );
        })()}
    </div>
  );
}
