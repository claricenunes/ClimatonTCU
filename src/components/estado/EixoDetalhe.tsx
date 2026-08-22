import { useMemo } from "react";
import { getAvaliacaoByEstado } from "../../data/avaliacaoClimatica";
import { agruparAvaliacaoPorEixo, NIVEL_SEMAFORO_META, nivelFromPontuacao } from "../../lib/avaliacaoClimatica";
import type { EixoAvaliacaoClimatica } from "../../types";
import { EmptyState } from "../ui/States";
import { EstagioDistribuicao } from "../centralDeDados/EstagioDistribuicao";
import { IconChevronDown } from "../../lib/icons";

/** Real assessment data (audit-sourced) currently only covers Bahia. */
export function EixoDetalhe({ uf, eixo }: { uf: string; eixo: EixoAvaliacaoClimatica }) {
  const itens = useMemo(() => getAvaliacaoByEstado(uf).filter((i) => i.eixo === eixo), [uf, eixo]);

  if (itens.length === 0) {
    return (
      <EmptyState
        title="Ainda não temos esses dados"
        description="A Bahia é o estado piloto do projeto, com avaliação completa de auditoria sobre a ação climática estadual. Ainda não temos esses dados para os demais estados."
      />
    );
  }

  const [agregado] = agruparAvaliacaoPorEixo(itens);
  const meta = NIVEL_SEMAFORO_META[agregado.nivel];
  const Face = meta.icon;

  return (
    <div>
      <div className={`mb-5 flex items-center gap-4 rounded-xl border ${meta.border} ${meta.bg} p-4`}>
        <Face className={`size-12 shrink-0 ${meta.text}`} />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-600">Pontuação geral</p>
          <p className={`text-2xl font-extrabold ${meta.text}`}>{Math.round(agregado.pontuacaoMedia * 100)}%</p>
          <p className="text-sm font-semibold text-ink-600">Estágio médio: {meta.label}</p>
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-600">Distribuição por estágio</p>
        <EstagioDistribuicao itens={itens} />
      </div>

      <ul className="space-y-2">
        {agregado.componentes.map((c) => {
          const cMeta = NIVEL_SEMAFORO_META[c.nivel];
          const CFace = cMeta.icon;
          return (
            <li key={c.componente} className={`overflow-hidden rounded-xl border ${cMeta.border} ${cMeta.bg}`}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-3">
                  <CFace className={`size-6 shrink-0 ${cMeta.text}`} />
                  <span className="flex-1 text-sm font-bold text-ink-900">
                    {c.componente} · {c.label}
                  </span>
                  <span className={`text-sm font-bold ${cMeta.text}`}>{Math.round(c.pontuacaoMedia * 100)}%</span>
                  <IconChevronDown
                    className={`size-4 shrink-0 ${cMeta.text} transition-transform group-open:rotate-180`}
                  />
                </summary>
                <div className="space-y-3 border-t border-ink-150 bg-white p-3">
                  {c.itens.map((item) => {
                    const iMeta = NIVEL_SEMAFORO_META[nivelFromPontuacao(item.pontuacao)];
                    return (
                      <div key={item.id} className="text-sm">
                        <p className={`mb-0.5 font-bold ${iMeta.text}`}>
                          {c.componente}
                          {item.item} — {item.estagio}
                        </p>
                        <p className="text-ink-600">{item.resumo}</p>
                        <details className="mt-1.5">
                          <summary className="cursor-pointer text-xs font-semibold text-brand-700 hover:underline">
                            Ver evidência completa da auditoria
                          </summary>
                          <p className="mt-2 text-ink-500">{item.comentario}</p>
                        </details>
                      </div>
                    );
                  })}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
