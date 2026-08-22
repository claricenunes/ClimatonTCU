import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MUNICIPIOS, getMunicipiosByEstado } from "../data/municipios";
import { getEstadoByUf } from "../data/estados";
import { HeroBrazilMap } from "../components/map/HeroBrazilMap";
import { RegiaoLegend } from "../components/map/RegiaoLegend";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { PilaresGrid } from "../components/estado/PilaresGrid";
import { MunicipioCard } from "../components/municipio/MunicipioCard";
import { CardSkeletonGrid, EmptyState } from "../components/ui/States";
import { FilterChips } from "../components/ui/FilterChips";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { RotatingWord } from "../components/ui/RotatingWord";
import type { StatusClimatico } from "../types";
import { STATUS_INFO } from "../types";
import {
  IconNewspaper,
  IconUsers,
  IconGraduationCap,
  IconChevronRight,
  IconMapPin,
  IconFileText,
  IconCoins,
  IconLandmark,
  IconChevronDown,
  type IconProps,
} from "../lib/icons";

const STATUS_OPTIONS = (Object.keys(STATUS_INFO) as StatusClimatico[]).map((s) => ({
  value: s,
  label: STATUS_INFO[s].label,
}));

interface DashboardInfo {
  id: string;
  icon: (props: IconProps) => React.ReactElement;
  title: string;
  question: string;
  description: string;
}

const DASHBOARDS: DashboardInfo[] = [
  {
    id: "politicas-publicas",
    icon: IconFileText,
    title: "Políticas públicas",
    question: "O que está sendo feito pelo governo?",
    description: "Programas, ações e iniciativas climáticas em andamento no estado.",
  },
  {
    id: "financiamento",
    icon: IconCoins,
    title: "Financiamento",
    question: "Como o dinheiro público é arrecadado e gasto?",
    description: "Orçamento, investimentos e execução de recursos para políticas climáticas.",
  },
  {
    id: "governanca",
    icon: IconLandmark,
    title: "Governança",
    question: "Como o governo funciona e toma decisões?",
    description: "Estrutura, responsabilidades e processos por trás das decisões climáticas.",
  },
];

export default function Home() {
  const [selectedUf, setSelectedUf] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusClimatico | "todos">("todos");
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);

  const estadoSelecionado = selectedUf ? getEstadoByUf(selectedUf) : undefined;

  const municipiosFiltrados = useMemo(() => {
    let list = selectedUf ? getMunicipiosByEstado(selectedUf) : MUNICIPIOS;
    if (statusFilter !== "todos") list = list.filter((m) => m.status === statusFilter);
    return list;
  }, [selectedUf, statusFilter]);

  const loading = useSimulatedLoading(`${selectedUf}-${statusFilter}`);

  function handleSelectUf(uf: string) {
    setSelectedUf(uf);
    setSelectedDashboard(null);
  }

  function handleClearUf() {
    setSelectedUf(null);
    setSelectedDashboard(null);
  }

  return (
    <div id="conteudo-principal">
      {/* Hero */}
      <section className="bg-white px-4 pb-10 pt-12 text-center sm:pt-16">
        <h1 className="font-heading text-[2.15rem] font-extrabold uppercase leading-[1.2] tracking-wide text-brand-700 sm:text-5xl md:text-[3.4rem]">
          Ajude a evitar crises
          <br />
          <RotatingWord
            words={["climáticas", "ambientais", "hídricas"]}
            className="-rotate-2 rounded-lg bg-accent-500 px-3 text-white"
          />{" "}
          em seu estado
        </h1>

        <div className="mx-auto mt-6 max-w-xs">
          <EstadoSelect selectedUf={selectedUf} onSelect={handleSelectUf} />
        </div>

        {!selectedUf && (
          <p className="mx-auto mt-4 flex max-w-md items-center justify-center gap-1.5 text-sm font-medium text-ink-500">
            <IconMapPin className="size-4 shrink-0 text-brand-600" />
            Ou clique em um estado no mapa abaixo
          </p>
        )}

        {selectedUf ? (
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 items-start gap-8 text-left sm:mt-10 lg:grid-cols-5 lg:gap-10">
            <div className="lg:order-2 lg:col-span-2">
              <p className="mb-3 text-sm font-semibold text-ink-600">Escolha um eixo para explorar:</p>
              <div className="grid grid-cols-1 gap-4">
                {DASHBOARDS.map((d) => (
                  <DashboardCard
                    key={d.id}
                    dashboard={d}
                    selected={selectedDashboard === d.id}
                    onToggle={() => setSelectedDashboard((cur) => (cur === d.id ? null : d.id))}
                  />
                ))}
              </div>
            </div>
            <div className="lg:order-1 lg:col-span-3">
              <HeroBrazilMap selectedUf={selectedUf} onSelect={handleSelectUf} onClear={handleClearUf} />
            </div>

            {selectedDashboard && (
              <div className="animate-fade-in rounded-xl border border-ink-150 bg-white p-5 shadow-card lg:order-3 lg:col-span-5 sm:p-6">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                  {DASHBOARDS.find((d) => d.id === selectedDashboard)?.title}
                </p>
                <h3 className="mb-4 text-lg font-extrabold text-ink-900">
                  Pilares da ação climática em {estadoSelecionado?.nome}
                </h3>
                <PilaresGrid uf={selectedUf} />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 sm:mt-10">
            <HeroBrazilMap selectedUf={selectedUf} onSelect={handleSelectUf} onClear={handleClearUf} />
          </div>
        )}

        <div className="mx-auto mt-8 max-w-3xl">
          <RegiaoLegend />
        </div>
      </section>

      {/* Municípios list */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-900">
                {estadoSelecionado ? `Municípios em ${estadoSelecionado.nome}` : "Todos os municípios"}
              </h2>
              <p className="mt-1 text-ink-600">
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
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <CtaCard to="/noticias" icon={<IconNewspaper className="size-6" />} title="Notícias" description="Acompanhe as últimas atualizações sobre o clima no Brasil." />
            <CtaCard to="/comunidade" icon={<IconUsers className="size-6" />} title="Comunidade" description="Veja relatos de moradores e compartilhe o que acontece na sua região." />
            <CtaCard to="/educacao" icon={<IconGraduationCap className="size-6" />} title="Educação" description="Aprenda mais sobre convivência com a seca e uso consciente da água." />
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function DashboardCard({
  dashboard: { icon: Icon, title, question, description },
  selected,
  onToggle,
}: {
  dashboard: DashboardInfo;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={selected}
      className={`w-full rounded-xl border p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover ${
        selected ? "border-accent-500 bg-accent-50 ring-2 ring-accent-500/30" : "border-ink-150 bg-white hover:border-accent-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
            selected ? "bg-accent-500 text-white" : "bg-brand-50 text-brand-700"
          }`}
        >
          <Icon className="size-5" />
        </span>
        <IconChevronDown
          className={`mt-2 size-4 shrink-0 text-ink-400 transition-transform ${selected ? "rotate-180" : ""}`}
        />
      </div>
      <h3 className="mt-3 text-base font-bold text-ink-900">{title}</h3>
      <p className="mt-0.5 text-sm font-semibold text-brand-700">{question}</p>
      <p className="mt-1.5 text-sm text-ink-600">{description}</p>
      {selected && (
        <p className="mt-3 border-t border-accent-200 pt-3 text-sm font-medium text-accent-700 animate-fade-in">
          Detalhamento completo deste eixo — em breve.
        </p>
      )}
    </button>
  );
}

function CtaCard({ to, icon, title, description }: { to: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link
      to={to}
      className="surface group relative flex items-center gap-4 overflow-hidden rounded-xl border border-ink-150 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-500 transition-transform duration-200 group-hover:scale-x-100"
      />
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-lg font-bold text-ink-900 group-hover:text-brand-700">{title}</span>
        <span className="block text-sm text-ink-600">{description}</span>
      </span>
      <IconChevronRight className="size-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
    </Link>
  );
}
