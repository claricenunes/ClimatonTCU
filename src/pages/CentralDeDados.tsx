import { getCanaisDenunciaByEstado } from "../data/canaisDenuncia";
import { getEstadoByUf } from "../data/estados";
import { getAvaliacaoByEstado } from "../data/avaliacaoClimatica";
import { useEstado } from "../context/EstadoContext";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { EmptyState } from "../components/ui/States";
import { AvaliacaoClimaticaSection } from "../components/centralDeDados/AvaliacaoClimaticaSection";
import { ComparativoEstadosCard } from "../components/centralDeDados/ComparativoEstadosCard";
import { DataVisualization } from "../components/centralDeDados/DataVisualization";
import { ExportData } from "../components/centralDeDados/ExportData";
import { CANAL_TIPO_LABEL } from "../lib/status";
import { IconLandmark, IconMegaphone } from "../lib/icons";

export default function CentralDeDados() {
  const { uf: selectedUf, setUf } = useEstado();

  const estadoSelecionado = selectedUf ? getEstadoByUf(selectedUf) : undefined;
  const canaisDenuncia = selectedUf ? getCanaisDenunciaByEstado(selectedUf) : [];
  const avaliacaoItens = selectedUf ? getAvaliacaoByEstado(selectedUf) : [];

  const loading = useSimulatedLoading(selectedUf);

  return (
    <div id="conteudo-principal" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Central de Dados" }]} />

      <div className="mb-8 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <IconLandmark className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-[#17301c] sm:text-3xl">
            Central de Dados{estadoSelecionado ? ` — ${estadoSelecionado.nome}` : ""}
          </h1>
          <p className="text-[#3f5b45]">
            Indicadores por município e canais de prestação de contas para apoiar a gestão pública.
          </p>
        </div>
      </div>

      <div className="mb-8 max-w-xs">
        <EstadoSelect selectedUf={selectedUf} onSelect={setUf} />
      </div>

      <div className="mb-8">
        <ComparativoEstadosCard />
      </div>

      {!selectedUf ? (
        <EmptyState
          title="Selecione um estado"
          description="Escolha um estado acima para ver os indicadores climáticos dos municípios e os canais de prestação de contas disponíveis."
        />
      ) : loading ? (
        <div className="animate-pulse space-y-6" aria-hidden="true">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl border border-[#e0ede1] bg-white" />
            ))}
          </div>
          <div className="h-64 rounded-2xl border border-[#e0ede1] bg-white" />
        </div>
      ) : (
        <>
          <div className="mb-8">
            <AvaliacaoClimaticaSection itens={avaliacaoItens} estadoNome={estadoSelecionado?.nome ?? ""} />
          </div>

          <div className="mb-8">
            <DataVisualization
              avaliacoes={avaliacaoItens}
              estadoNome={estadoSelecionado?.nome ?? ""}
            />
          </div>

          <div className="mb-8">
            <ExportData
              avaliacoes={avaliacaoItens}
              estadoNome={estadoSelecionado?.nome ?? ""}
            />
          </div>

          <div>
            <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
              <IconMegaphone className="size-5 text-brand-700" /> Órgãos de controle e prestação de contas
            </h2>
            <p className="mb-4 text-sm text-[#3f5b45]">
              Ouvidorias e órgãos de fiscalização a quem o gestor público presta contas em {estadoSelecionado?.nome}.
            </p>
            {canaisDenuncia.length === 0 ? (
              <EmptyState
                title="Ainda não mapeamos os canais deste estado"
                description={`A Bahia é o estado piloto do projeto, com cobertura completa de órgãos de controle. Ainda não temos esses dados para ${estadoSelecionado?.nome}.`}
              />
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {canaisDenuncia.map((c) => (
                  <li key={c.id} className="surface rounded-2xl border border-[#e0ede1] bg-white p-5">
                    <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                      {c.orgao}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-[#17301c]">{c.nome}</h3>
                    <p className="mt-1 text-sm text-[#3f5b45]">{c.descricao}</p>
                    <ul className="mt-3 space-y-1 text-xs text-[#3f5b45]">
                      {c.canais.map((canal, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="font-semibold text-[#5c7a62]">{CANAL_TIPO_LABEL[canal.tipo]}:</span>
                          {canal.href ? (
                            <a
                              href={canal.href}
                              target={canal.href.startsWith("http") ? "_blank" : undefined}
                              rel={canal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="font-semibold text-brand-700 hover:underline"
                            >
                              {canal.label}
                            </a>
                          ) : (
                            <span>{canal.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
