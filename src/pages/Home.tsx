import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MUNICIPIOS, getMunicipiosByEstado } from "../data/municipios";
import { ESTADOS, getEstadoByUf } from "../data/estados";
import { BrazilMap } from "../components/map/BrazilMap";
import { HeroBrazilMap } from "../components/map/HeroBrazilMap";
import { MapLegend } from "../components/map/MapLegend";
import { useEstadoStatus, useNacionalSummary } from "../hooks/useEstadoStatus";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { EstadoSearch } from "../components/municipio/EstadoSearch";
import { MunicipioCard } from "../components/municipio/MunicipioCard";
import { CardSkeletonGrid, EmptyState } from "../components/ui/States";
import { FilterChips } from "../components/ui/FilterChips";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import type { RegiaoBR, StatusClimatico } from "../types";
import { STATUS_INFO } from "../types";
import {
  IconNewspaper,
  IconUsers,
  IconGraduationCap,
  IconChevronRight,
  IconX,
  IconMapPin,
  IconAiAssistant,
} from "../lib/icons";

const STATUS_OPTIONS = (Object.keys(STATUS_INFO) as StatusClimatico[]).map((s) => ({
  value: s,
  label: STATUS_INFO[s].label,
}));

const REGIOES_BR_ORDEM: RegiaoBR[] = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

export default function Home() {
  const summaries = useEstadoStatus();
  const nacional = useNacionalSummary();
  const [selectedUf, setSelectedUf] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusClimatico | "todos">("todos");

  const estadoSelecionado = selectedUf ? getEstadoByUf(selectedUf) : undefined;
  const resumoAtivo = selectedUf ? summaries[selectedUf] : { ...nacional, uf: "" };

  const municipiosFiltrados = useMemo(() => {
    let list = selectedUf ? getMunicipiosByEstado(selectedUf) : MUNICIPIOS;
    if (statusFilter !== "todos") list = list.filter((m) => m.status === statusFilter);
    return list;
  }, [selectedUf, statusFilter]);

  const loading = useSimulatedLoading(`${selectedUf}-${statusFilter}`);

  const estadosPorRegiao = useMemo(() => {
    const grupos = new Map<RegiaoBR, typeof ESTADOS>();
    for (const regiao of REGIOES_BR_ORDEM) grupos.set(regiao, []);
    for (const estado of ESTADOS) grupos.get(estado.regiao)?.push(estado);
    return grupos;
  }, []);

  return (
    <div id="conteudo-principal">
      {/* Hero */}
      <section className="bg-white px-4 pb-10 pt-12 text-center sm:pt-16">
        <h1 className="font-heading text-[2.15rem] font-extrabold uppercase leading-[1.15] tracking-wide text-[#1c9750] sm:text-5xl md:text-[3.4rem]">
          Confira a situação
          <br />
          climática do seu estado
        </h1>

        <div className="mt-8 sm:mt-10">
          <HeroBrazilMap />
        </div>
      </section>

      <button
        type="button"
        aria-label="Assistente virtual (em breve)"
        className="fixed bottom-5 right-5 z-30 flex size-[88px] items-center justify-center rounded-full border-[3px] border-brand-600 bg-white text-brand-600 shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:right-8 sm:size-[110px]"
      >
        <IconAiAssistant className="size-9 sm:size-11" strokeWidth={1.6} />
      </button>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-2 text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-[#17301c]">Mapa do Brasil</h2>
        </div>
        <p className="mb-8 flex items-center justify-center gap-1.5 text-center text-[#3f5b45] sm:justify-start sm:text-left">
          <IconMapPin className="size-4 shrink-0 text-brand-600" />
          Clique em um estado para explorar os dados daquela região.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="surface rounded-2xl border border-[#e0ede1] bg-white p-6">
              <BrazilMap summaries={summaries} selectedUf={selectedUf} onSelect={setSelectedUf} />
            </div>
            <div className="mt-4">
              <EstadoSearch summaries={summaries} onSelect={setSelectedUf} />
            </div>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#3f5b45]">Legenda</h3>
              <MapLegend />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="surface sticky top-4 max-h-[36rem] overflow-y-auto rounded-2xl border border-[#e0ede1] bg-white p-6">
              {estadoSelecionado ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#17301c]">
                        {estadoSelecionado.nome} <span className="text-[#5c7a62]">({estadoSelecionado.uf})</span>
                      </h3>
                      <p className="text-xs text-[#5c7a62]">
                        Região {estadoSelecionado.regiao} · Capital: {estadoSelecionado.capital}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedUf(null)}
                      aria-label="Limpar seleção e voltar para o Brasil todo"
                      className="shrink-0 rounded-lg p-1.5 text-[#5c7a62] hover:bg-brand-50 hover:text-brand-800"
                    >
                      <IconX className="size-4" />
                    </button>
                  </div>
                  <StatusBadge status={resumoAtivo.status} size="sm" />
                  <button
                    onClick={() => setSelectedUf(null)}
                    className="mt-4 block text-sm font-semibold text-brand-700 hover:underline"
                  >
                    ← Ver o Brasil todo
                  </button>
                  <hr className="my-4 border-[#e0ede1]" />
                </>
              ) : (
                <>
                  <h3 className="mb-1 text-lg font-bold text-[#17301c]">Brasil</h3>
                  <p className="mb-4 text-sm text-[#3f5b45]">
                    Nenhum estado selecionado. Toque em uma área do mapa, use a busca acima ou escolha um estado na
                    lista abaixo.
                  </p>
                </>
              )}

              {REGIOES_BR_ORDEM.map((regiaoBR) => (
                <div key={regiaoBR} className="mb-4 last:mb-0">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[#8ba690]">{regiaoBR}</p>
                  <ul className="space-y-1 text-sm">
                    {estadosPorRegiao.get(regiaoBR)?.map((e) => {
                      const s = summaries[e.uf];
                      return (
                        <li key={e.uf}>
                          <button
                            onClick={() => setSelectedUf(e.uf)}
                            className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left transition-colors ${
                              selectedUf === e.uf ? "bg-brand-50 text-brand-800" : "hover:bg-[#f4f9f4]"
                            }`}
                          >
                            <span className="font-medium">
                              {e.nome} <span className="text-xs text-[#8ba690]">({e.uf})</span>
                            </span>
                            <StatusBadge status={s?.status ?? "normal"} size="sm" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Municípios list */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#17301c]">
              {estadoSelecionado ? `Municípios em ${estadoSelecionado.nome}` : "Todos os municípios"}
            </h2>
            <p className="mt-1 text-[#3f5b45]">
              {municipiosFiltrados.length} município{municipiosFiltrados.length === 1 ? "" : "s"} encontrado
              {municipiosFiltrados.length === 1 ? "" : "s"}
            </p>
          </div>
          <FilterChips label="Filtrar por situação" options={STATUS_OPTIONS} selected={statusFilter} onChange={setStatusFilter} />
        </div>

        {loading ? (
          <CardSkeletonGrid count={6} />
        ) : municipiosFiltrados.length === 0 ? (
          <EmptyState
            title="Nenhum município encontrado"
            description="Tente selecionar outro estado ou outro filtro de situação climática."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedUf(null);
                  setStatusFilter("todos");
                }}
              >
                Limpar filtros
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {municipiosFiltrados.map((m) => (
              <MunicipioCard key={m.id} municipio={m} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CtaCard to="/noticias" icon={<IconNewspaper className="size-6" />} title="Notícias" description="Acompanhe as últimas atualizações sobre o clima no Brasil." />
          <CtaCard to="/comunidade" icon={<IconUsers className="size-6" />} title="Comunidade" description="Veja relatos de moradores e compartilhe o que acontece na sua região." />
          <CtaCard to="/educacao" icon={<IconGraduationCap className="size-6" />} title="Educação" description="Aprenda mais sobre convivência com a seca e uso consciente da água." />
        </div>
      </section>
    </div>
  );
}

function CtaCard({ to, icon, title, description }: { to: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link
      to={to}
      className="surface group flex items-center gap-4 rounded-2xl border border-[#e0ede1] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-lg font-bold text-[#17301c] group-hover:text-brand-700">{title}</span>
        <span className="block text-sm text-[#3f5b45]">{description}</span>
      </span>
      <IconChevronRight className="size-5 shrink-0 text-[#8ba690] transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
    </Link>
  );
}
