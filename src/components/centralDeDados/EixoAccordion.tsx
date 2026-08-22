import { NIVEL_SEMAFORO_META } from "../../lib/avaliacaoClimatica";
import type { EixoAgregado, EixoAvaliacaoClimatica, ComponenteAgregado } from "../../lib/avaliacaoClimatica";
import { IconChevronDown, IconChevronRight, IconCoins, IconFileText, IconLandmark, type IconProps } from "../../lib/icons";
import { ScoreBar } from "./ScoreBar";
import { EstagioBadge } from "./EstagioBadge";
import { EstagioDistribuicao } from "./EstagioDistribuicao";

const EIXO_ICON: Record<EixoAvaliacaoClimatica, (props: IconProps) => React.ReactElement> = {
  "Políticas públicas": IconFileText,
  Financiamento: IconCoins,
  Governança: IconLandmark,
};

interface EixoAccordionProps {
  eixoAgregado: EixoAgregado;
}

export function EixoAccordion({ eixoAgregado }: EixoAccordionProps) {
  const Icon = EIXO_ICON[eixoAgregado.eixo];
  const meta = NIVEL_SEMAFORO_META[eixoAgregado.nivel];
  const NivelIcon = meta.icon;
  const pct = Math.round(eixoAgregado.pontuacaoMedia * 100);
  const itensDoEixo = eixoAgregado.componentes.flatMap((c) => c.itens);

  return (
    <details className="group surface overflow-hidden rounded-2xl border border-[#e0ede1] bg-white" open>
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${meta.bg} ${meta.text}`}>
          <Icon className="size-5" />
        </span>
        <h3 className="min-w-0 flex-1 font-bold text-[#17301c]">{eixoAgregado.eixo}</h3>
        <IconChevronDown className="size-5 shrink-0 text-[#5c7a62] transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-4 border-t border-[#e0ede1] bg-[#fafcf9] px-5 py-4">
        <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${meta.bg} ${meta.border}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#5c7a62]">Pontuação geral</p>
            <p className={`mt-1 text-3xl font-extrabold tabular-nums ${meta.text}`}>{pct}%</p>
            <ScoreBar pontuacao={eixoAgregado.pontuacaoMedia} nivel={eixoAgregado.nivel} className="mt-2 w-40" />
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-bold ${meta.text} ${meta.border}`}
          >
            <NivelIcon className="size-4" />
            {meta.label}
          </span>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#5c7a62]">Distribuição por estágio</p>
          <EstagioDistribuicao itens={itensDoEixo} />
        </div>
      </div>
      <div className="divide-y divide-[#e0ede1] border-t border-[#e0ede1] px-5">
        {eixoAgregado.componentes.map((componente) => (
          <ComponenteRow key={componente.componente} componente={componente} />
        ))}
      </div>
    </details>
  );
}

function ComponenteRow({ componente }: { componente: ComponenteAgregado }) {
  const meta = NIVEL_SEMAFORO_META[componente.nivel];
  const pct = Math.round(componente.pontuacaoMedia * 100);

  return (
    <details className="group py-3">
      <summary className="flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
        <span
          className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-bold ${meta.bg} ${meta.text}`}
        >
          {componente.componente}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#17301c]">{componente.label}</p>
            <span className={`shrink-0 text-xs font-bold tabular-nums ${meta.text}`}>{pct}%</span>
          </div>
          <ScoreBar pontuacao={componente.pontuacaoMedia} nivel={componente.nivel} className="mt-1.5 h-1.5" />
        </div>
        <IconChevronRight className="mt-0.5 size-4 shrink-0 text-[#8ba690] transition-transform group-open:rotate-90" />
      </summary>
      <ul className="mt-3 space-y-3 pl-1">
        {componente.itens.map((item) => (
          <li key={item.id} className="rounded-xl bg-[#f4f9f4] p-3">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#5c7a62]">Item {item.item}</span>
              <EstagioBadge estagio={item.estagio} />
            </div>
            <p className="text-sm leading-relaxed text-[#3f5b45]">{item.resumo}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-semibold text-brand-700 hover:underline">
                Ver evidência completa da auditoria
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#5c7a62]">{item.comentario}</p>
            </details>
          </li>
        ))}
      </ul>
    </details>
  );
}
