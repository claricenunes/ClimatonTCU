import { useState } from "react";
import { Link } from "react-router-dom";
import { getEstadoByUf } from "../data/estados";
import { useEstado } from "../context/EstadoContext";
import { HeroBrazilMap } from "../components/map/HeroBrazilMap";
import { RegiaoLegend } from "../components/map/RegiaoLegend";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { EixoDetalhe } from "../components/estado/EixoDetalhe";
import { Reveal } from "../components/ui/Reveal";
import { RotatingWord } from "../components/ui/RotatingWord";
import type { EixoAvaliacaoClimatica } from "../types";
import {
  IconNewspaper,
  IconUsers,
  IconMegaphone,
  IconGraduationCap,
  IconChevronRight,
  IconMapPin,
  IconFileText,
  IconCoins,
  IconLandmark,
  IconChevronDown,
  type IconProps,
} from "../lib/icons";

interface DashboardInfo {
  id: string;
  icon: (props: IconProps) => React.ReactElement;
  title: EixoAvaliacaoClimatica;
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
  const { uf: selectedUf, setUf, clearUf } = useEstado();
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);

  const estadoSelecionado = selectedUf ? getEstadoByUf(selectedUf) : undefined;

  function handleSelectUf(uf: string) {
    setUf(uf);
    setSelectedDashboard(null);
  }

  function handleClearUf() {
    clearUf();
    setSelectedDashboard(null);
  }

  return (
    <div id="conteudo-principal">
      {/* Hero */}
      <section className="bg-white px-4 pb-10 pt-12 text-center sm:pt-16">
        <h1 className="font-heading text-[2.15rem] font-extrabold uppercase leading-[1.2] tracking-wide text-nav sm:text-5xl md:text-[3.4rem]">
          Ajude a evitar crises
          <br />
          <RotatingWord
            words={["climáticas", "ambientais", "hídricas"]}
            className="-rotate-2 rounded-lg bg-badge-blue px-3 text-white"
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
                    uf={selectedUf}
                    estadoNome={estadoSelecionado?.nome}
                  />
                ))}
              </div>
            </div>
            <div className="lg:order-1 lg:col-span-3">
              <HeroBrazilMap selectedUf={selectedUf} onSelect={handleSelectUf} onClear={handleClearUf} />
            </div>
          </div>
        ) : (
          <div className="mt-8 sm:mt-10">
            <HeroBrazilMap selectedUf={selectedUf} onSelect={handleSelectUf} onClear={handleClearUf} />
          </div>
        )}

        {selectedUf !== "BA" && (
          <div className="mx-auto mt-8 max-w-3xl">
            <RegiaoLegend />
          </div>
        )}
      </section>

      {/* CTA */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CtaCard to="/noticias" icon={<IconNewspaper className="size-6" />} title="Notícias" description="Acompanhe as últimas atualizações sobre o clima no Brasil." />
            <CtaCard to="/comunidade" icon={<IconUsers className="size-6" />} title="Comunidade" description="Veja organizações locais e canais de denúncia no seu estado." />
            <CtaCard to="/relatos" icon={<IconMegaphone className="size-6" />} title="Relatos" description="Veja relatos de moradores e compartilhe o que acontece na sua região." />
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
  uf,
  estadoNome,
}: {
  dashboard: DashboardInfo;
  selected: boolean;
  onToggle: () => void;
  uf: string | null;
  estadoNome: string | undefined;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-card transition-colors ${
        selected ? "border-brand-600 ring-2 ring-brand-500/30" : "border-ink-150 hover:border-brand-300"
      } bg-white`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={selected}
        className="w-full p-5 text-left transition-transform hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
              selected ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
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
      </button>

      {selected && uf && (
        <div className="animate-fade-in border-t border-ink-150 bg-[#fafcf9] p-5">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-700">{title}</p>
          <h4 className="mb-4 text-base font-extrabold text-ink-900">Avaliação da ação climática em {estadoNome}</h4>
          <EixoDetalhe uf={uf} eixo={title} />

          <div className="mt-5 border-t border-ink-150 pt-5">
            <p className="mb-3 text-sm font-semibold text-ink-600">
              Quer entrar em contato ou relatar uma situação na sua região?
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                to="/comunidade"
                className="flex items-center gap-3 rounded-lg border border-ink-150 bg-white p-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <IconUsers className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">Comunidade</span>
                  <span className="block text-xs text-ink-600">Organizações e canais de contato no estado</span>
                </span>
              </Link>
              <Link
                to="/relatos"
                className="flex items-center gap-3 rounded-lg border border-ink-150 bg-white p-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <IconMegaphone className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">Relatos</span>
                  <span className="block text-xs text-ink-600">Relate uma situação climática na sua região</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
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
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-200 group-hover:scale-x-100"
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
