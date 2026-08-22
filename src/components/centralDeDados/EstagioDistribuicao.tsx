import { useState } from "react";
import { contarPorEstagio, ESTAGIO_META } from "../../lib/avaliacaoClimatica";
import type { ItemAvaliacaoClimatica } from "../../types";

interface EstagioDistribuicaoProps {
  itens: ItemAvaliacaoClimatica[];
}

export function EstagioDistribuicao({ itens }: EstagioDistribuicaoProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const total = itens.length;
  const contagens = contarPorEstagio(itens).filter((c) => c.count > 0);

  return (
    <div>
      <div className="relative">
        <div
          className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-ink-100"
          role="img"
          aria-label={`Distribuição dos ${total} itens avaliados por estágio: ${contagens
            .map((c) => `${c.count} em ${ESTAGIO_META[c.estagio].label}`)
            .join(", ")}`}
        >
          {contagens.map(({ estagio, count }) => (
            <div
              key={estagio}
              className={`${ESTAGIO_META[estagio].dot} h-full first:rounded-l-full last:rounded-r-full cursor-pointer transition-opacity hover:opacity-80`}
              style={{ width: `${(count / total) * 100}%` }}
              onMouseEnter={() => setHoveredStage(estagio)}
              onMouseLeave={() => setHoveredStage(null)}
            />
          ))}
        </div>
        {hoveredStage && (
          <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-lg bg-[#17301c] px-3 py-2 text-xs text-white whitespace-nowrap">
            {hoveredStage in ESTAGIO_META && (
              <>
                {ESTAGIO_META[hoveredStage as keyof typeof ESTAGIO_META].label}:{" "}
                {contarPorEstagio(itens).find((c) => c.estagio === hoveredStage)?.count} de {total}
              </>
            )}
          </div>
        )}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {contarPorEstagio(itens).map(({ estagio, count }) => (
          <li key={estagio} className="flex items-center gap-1.5">
            <span className={`size-2.5 shrink-0 rounded-full ${ESTAGIO_META[estagio].dot}`} aria-hidden="true" />
            <span className="font-bold text-[#17301c]">{count}</span>
            <span className="text-[#3f5b45]">{ESTAGIO_META[estagio].label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
