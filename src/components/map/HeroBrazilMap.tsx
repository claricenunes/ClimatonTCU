import { useLayoutEffect, useRef, useState, type MutableRefObject } from "react";
import { ESTADOS, BRASIL_MAP_PATHS, BRASIL_MAP_VIEWBOX, getEstadoByUf } from "../../data/estados";
import { REGIAO_BR_COLORS } from "../../lib/regiaoBrColors";
import { IconArrowLeft } from "../../lib/icons";

const BAHIA_UF = "BA";

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TooltipState {
  uf: string;
  x: number;
  y: number;
}

interface HeroBrazilMapProps {
  selectedUf: string | null;
  onSelect: (uf: string) => void;
  onClear: () => void;
}

/**
 * The Hero's map: every state is shaded by its official macro-region, purely
 * for orientation. Every state also lifts + darkens on hover so the whole
 * map feels alive, but only Bahia carries real data in this prototype, so
 * it's the only one that's actually clickable/keyboard-focusable — the rest
 * just show an informational tooltip on hover.
 */
export function HeroBrazilMap({ selectedUf, onSelect, onClear }: HeroBrazilMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map()) as MutableRefObject<Map<string, SVGPathElement>>;
  const bahiaMeasureRef = useRef<SVGPathElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [bahiaBox, setBahiaBox] = useState<Box | null>(null);

  // Bahia's bounding box is measured from a hidden path that's always in the
  // DOM, independent of whether the visible view below is the full map or
  // the isolated one — the isolated view previously only got its box when it
  // happened to mount right after the full map (never true if the user
  // jumps straight to Bahia via the dropdown/list), which made it fall back
  // to the full-Brazil viewBox and render tiny and off-center.
  useLayoutEffect(() => {
    const el = bahiaMeasureRef.current;
    if (!el) return;
    const box = el.getBBox();
    setBahiaBox({ x: box.x, y: box.y, width: box.width, height: box.height });
  }, []);

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

  const measureSvg = (
    <svg aria-hidden="true" className="sr-only" width="0" height="0">
      <path ref={bahiaMeasureRef} d={BRASIL_MAP_PATHS[BAHIA_UF]} />
    </svg>
  );

  if (selectedUf === BAHIA_UF) {
    const bahiaColor = REGIAO_BR_COLORS.Nordeste;
    const pad = bahiaBox ? Math.max(bahiaBox.width, bahiaBox.height) * 0.1 : 0;
    const viewBox = bahiaBox
      ? `${bahiaBox.x - pad} ${bahiaBox.y - pad} ${bahiaBox.width + pad * 2} ${bahiaBox.height + pad * 2}`
      : BRASIL_MAP_VIEWBOX;

    return (
      <div className="mx-auto w-full max-w-2xl">
        {measureSvg}
        <button
          onClick={onClear}
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg px-1 py-1 text-sm font-semibold text-brand-700 hover:underline"
        >
          <IconArrowLeft className="size-4" /> Ver mapa do Brasil completo
        </button>
        {bahiaBox ? (
          <svg
            viewBox={viewBox}
            role="img"
            aria-label="Mapa da Bahia, o estado disponível nesta demonstração"
            className="h-auto w-full animate-fade-in"
          >
            <path d={BRASIL_MAP_PATHS[BAHIA_UF]} fill={bahiaColor.solid} />
          </svg>
        ) : (
          <div className="aspect-[4/5] w-full animate-pulse rounded-xl bg-ink-100" />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      {measureSvg}
      <svg
        viewBox={BRASIL_MAP_VIEWBOX}
        role="group"
        aria-label="Mapa do Brasil colorido por região. A Bahia é o estado disponível nesta demonstração."
        className="h-auto w-full animate-fade-in"
      >
        {ESTADOS.map((estado) => {
          const color = REGIAO_BR_COLORS[estado.regiao];
          const isHovered = tooltip?.uf === estado.uf;
          const isBahia = estado.uf === BAHIA_UF;
          const fill = isHovered ? color.hover : color.solid;
          const liftClass =
            "outline-none transition-[fill,transform,filter] duration-200 ease-out hover:-translate-y-1.5 hover:drop-shadow-[0_10px_14px_rgba(11,31,16,0.35)] focus-visible:-translate-y-1.5 focus-visible:drop-shadow-[0_10px_14px_rgba(11,31,16,0.35)]";

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
              tabIndex={isBahia ? 0 : -1}
              role={isBahia ? "button" : undefined}
              aria-label={isBahia ? "Bahia (BA), Região Nordeste — disponível para explorar" : undefined}
              aria-hidden={isBahia ? undefined : true}
              onMouseEnter={() => showTooltipFor(estado.uf)}
              onMouseLeave={() => setTooltip(null)}
              onFocus={isBahia ? () => showTooltipFor(estado.uf) : undefined}
              onBlur={isBahia ? () => setTooltip(null) : undefined}
              onClick={isBahia ? () => onSelect(estado.uf) : undefined}
              onKeyDown={
                isBahia
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(estado.uf);
                      }
                    }
                  : undefined
              }
              className={`${isBahia ? "cursor-pointer" : "cursor-default"} ${liftClass}`}
              style={{ stroke: "#f6f9f6", strokeWidth: 1.1 }}
            />
          );
        })}
      </svg>

      {tooltip &&
        (() => {
          const estado = getEstadoByUf(tooltip.uf);
          if (!estado) return null;
          const isBahia = tooltip.uf === BAHIA_UF;
          return (
            <div
              className="pointer-events-none absolute z-10 w-max max-w-56 -translate-x-1/2 -translate-y-full rounded-lg bg-ink-900 px-3 py-2 text-xs font-medium text-white shadow-elevated animate-fade-in"
              style={{ left: tooltip.x, top: tooltip.y - 6 }}
            >
              <strong className="block">
                {estado.nome} <span className="font-normal text-ink-300">({estado.uf})</span>
              </strong>
              Região {estado.regiao}
              <br />
              {isBahia ? "Disponível para explorar" : "Dados ainda não disponíveis no protótipo"}
            </div>
          );
        })()}
    </div>
  );
}
