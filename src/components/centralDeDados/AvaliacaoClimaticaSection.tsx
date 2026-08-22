import { agruparAvaliacaoPorEixo } from "../../lib/avaliacaoClimatica";
import type { ItemAvaliacaoClimatica } from "../../types";
import { IconFileText } from "../../lib/icons";
import { EmptyState } from "../ui/States";
import { ScoreHero } from "./ScoreHero";
import { EstagioDistribuicao } from "./EstagioDistribuicao";
import { EixoAccordion } from "./EixoAccordion";

interface AvaliacaoClimaticaSectionProps {
  itens: ItemAvaliacaoClimatica[];
  estadoNome: string;
}

export function AvaliacaoClimaticaSection({ itens, estadoNome }: AvaliacaoClimaticaSectionProps) {
  if (itens.length === 0) {
    return (
      <EmptyState
        title="Ainda não mapeamos a auditoria climática deste estado"
        description={`A Bahia é o estado piloto do projeto, com diagnóstico completo de auditoria de ação climática. Ainda não temos esses dados para ${estadoNome}.`}
      />
    );
  }

  const eixosAgregados = agruparAvaliacaoPorEixo(itens);

  return (
    <div>
      <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
        <IconFileText className="size-5 text-brand-700" /> Diagnóstico da ação climática estadual
      </h2>
      <p className="mb-4 text-sm text-[#3f5b45]">
        Avaliação de auditoria (TCE/TCU) sobre políticas públicas, financiamento e governança climática de{" "}
        {estadoNome}. Clique em cada eixo e componente para ver os itens avaliados e as evidências da auditoria.
      </p>

      <div className="mb-6">
        <ScoreHero itens={itens} estadoNome={estadoNome} />
      </div>

      <div className="surface mb-6 rounded-2xl border border-[#e0ede1] bg-white p-5">
        <h3 className="mb-3 text-sm font-bold text-[#17301c]">Distribuição por estágio</h3>
        <EstagioDistribuicao itens={itens} />
      </div>

      <div className="space-y-4">
        {eixosAgregados.map((eixoAgregado) => (
          <EixoAccordion key={eixoAgregado.eixo} eixoAgregado={eixoAgregado} />
        ))}
      </div>
    </div>
  );
}
