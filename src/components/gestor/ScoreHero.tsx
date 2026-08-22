import { NIVEL_SEMAFORO_META, nivelFromPontuacao, pontuacaoGeral } from "../../lib/avaliacaoClimatica";
import type { ItemAvaliacaoClimatica } from "../../types";

interface ScoreHeroProps {
  itens: ItemAvaliacaoClimatica[];
  estadoNome: string;
}

export function ScoreHero({ itens, estadoNome }: ScoreHeroProps) {
  const pontuacao = pontuacaoGeral(itens);
  const nivel = nivelFromPontuacao(pontuacao);
  const meta = NIVEL_SEMAFORO_META[nivel];
  const Icon = meta.icon;
  const pct = Math.round(pontuacao * 100);

  return (
    <div className="surface flex flex-col gap-4 rounded-2xl border border-[#e0ede1] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-[#3f5b45]">Pontuação geral da ação climática — {estadoNome}</p>
        <p className="mt-1 text-5xl font-extrabold tabular-nums text-[#17301c]">{pct}%</p>
        <p className="mt-1 text-xs text-[#5c7a62]">
          Média de {itens.length} itens avaliados nos 3 eixos (Políticas públicas, Financiamento, Governança)
        </p>
      </div>
      <span
        className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-bold ${meta.bg} ${meta.text} ${meta.border}`}
      >
        <Icon className="size-5" />
        {meta.label}
      </span>
    </div>
  );
}
