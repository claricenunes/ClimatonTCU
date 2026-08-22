import { useState } from "react";
import { COMPONENTE_LABEL } from "../../data/avaliacaoClimatica";
import { contarPorEstagio, ESTAGIO_META } from "../../lib/avaliacaoClimatica";
import type { EstagioAvaliacaoClimatica, ItemAvaliacaoClimatica } from "../../types";

interface EstagioDistribuicaoProps {
  itens: ItemAvaliacaoClimatica[];
}

type Placement = "above" | "below";
type Align = "start" | "center" | "end";

interface HoveredState {
  estagio: EstagioAvaliacaoClimatica;
  placement: Placement;
  align: Align;
}

function alignFor(index: number, length: number): Align {
  if (index === 0) return "start";
  if (index === length - 1) return "end";
  return "center";
}

export function EstagioDistribuicao({ itens }: EstagioDistribuicaoProps) {
  // Estado único: garante que só existe UMA tooltip montada por vez, mesmo
  // movendo o mouse rápido entre segmentos vizinhos (com group-hover em CSS
  // puro, o fade-out de uma podia se sobrepor ao fade-in da próxima).
  const [hovered, setHovered] = useState<HoveredState | null>(null);
  const total = itens.length;
  const contagens = contarPorEstagio(itens).filter((c) => c.count > 0);
  const todosEstagios = contarPorEstagio(itens);

  function itensDoEstagio(estagio: EstagioAvaliacaoClimatica) {
    return itens
      .filter((i) => i.estagio === estagio)
      .slice()
      .sort((a, b) => (a.componente + a.item).localeCompare(b.componente + b.item));
  }

  function show(estagio: EstagioAvaliacaoClimatica, placement: Placement, align: Align) {
    setHovered({ estagio, placement, align });
  }

  function hide(estagio: EstagioAvaliacaoClimatica) {
    setHovered((h) => (h?.estagio === estagio ? null : h));
  }

  return (
    <div>
      <div className="relative h-3 w-full">
        <div
          className="flex h-full w-full gap-0.5 overflow-hidden rounded-full bg-ink-100"
          role="img"
          aria-label={`Distribuição dos ${total} itens avaliados por estágio: ${contagens
            .map((c) => `${c.count} em ${ESTAGIO_META[c.estagio].label}`)
            .join(", ")}`}
        >
          {contagens.map(({ estagio, count }) => (
            <div
              key={estagio}
              className={`${ESTAGIO_META[estagio].dot} h-full first:rounded-l-full last:rounded-r-full`}
              style={{ width: `${(count / total) * 100}%` }}
            />
          ))}
        </div>
        {/* Overlay de hover separado da barra: a barra tem overflow-hidden pra clipar as pontas
         * arredondadas, o que cortaria a tooltip se ela vivesse dentro dela. */}
        <div className="absolute inset-0 flex gap-0.5" aria-hidden="true">
          {contagens.map(({ estagio, count }, i) => {
            const align = alignFor(i, contagens.length);
            return (
              <div
                key={estagio}
                className="relative h-full cursor-pointer"
                style={{ width: `${(count / total) * 100}%` }}
                onMouseEnter={() => show(estagio, "above", align)}
                onMouseLeave={() => hide(estagio)}
              >
                {hovered?.estagio === estagio && hovered.placement === "above" && (
                  <EstagioTooltip estagio={estagio} itens={itensDoEstagio(estagio)} placement="above" align={align} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {todosEstagios.map(({ estagio, count }, i) => {
          const align = alignFor(i, todosEstagios.length);
          return (
            <li key={estagio} className="relative">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                onMouseEnter={() => show(estagio, "below", align)}
                onMouseLeave={() => hide(estagio)}
                onFocus={() => show(estagio, "below", align)}
                onBlur={() => hide(estagio)}
              >
                <span className={`size-2.5 shrink-0 rounded-full ${ESTAGIO_META[estagio].dot}`} aria-hidden="true" />
                <span className="font-bold text-[#17301c]">{count}</span>
                <span className="text-[#3f5b45]">{ESTAGIO_META[estagio].label}</span>
              </button>
              {hovered?.estagio === estagio && hovered.placement === "below" && (
                <EstagioTooltip estagio={estagio} itens={itensDoEstagio(estagio)} placement="below" align={align} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EstagioTooltip({
  estagio,
  itens,
  placement,
  align,
}: {
  estagio: EstagioAvaliacaoClimatica;
  itens: ItemAvaliacaoClimatica[];
  placement: Placement;
  align: Align;
}) {
  const meta = ESTAGIO_META[estagio];
  const positionClass = placement === "above" ? "bottom-full mb-2" : "top-full mt-2";
  const alignClass = align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <div
      role="tooltip"
      className={`pointer-events-none absolute z-20 w-72 max-w-[85vw] rounded-lg bg-[#17301c] p-3 text-left text-xs text-white shadow-elevated ${positionClass} ${alignClass}`}
    >
      <p className="mb-1.5 font-bold">
        {meta.label} — {itens.length} {itens.length === 1 ? "item" : "itens"}
      </p>
      <ul className="max-h-48 space-y-1 overflow-y-auto">
        {itens.map((item) => (
          <li key={item.id} className="flex gap-1.5 leading-snug">
            <span className="shrink-0 font-bold text-white/90">
              {item.componente}
              {item.item}
            </span>
            <span className="text-white/75">{COMPONENTE_LABEL[item.componente] ?? item.componente}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
