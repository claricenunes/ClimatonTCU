import { Link } from "react-router-dom";
import { getMunicipiosByEstado } from "../data/municipios";
import { getCanaisDenunciaByEstado } from "../data/canaisDenuncia";
import { getEstadoByUf } from "../data/estados";
import { getAvaliacaoByEstado } from "../data/avaliacaoClimatica";
import { useEstado } from "../context/EstadoContext";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { IndicatorCard } from "../components/municipio/IndicatorCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { EmptyState } from "../components/ui/States";
import { AvaliacaoClimaticaSection } from "../components/centralDeDados/AvaliacaoClimaticaSection";
import { formatPopulacao, RISCO_LABEL, CANAL_TIPO_LABEL } from "../lib/status";
import type { StatusClimatico } from "../types";
import { STATUS_INFO } from "../types";
import {
  IconLandmark,
  IconUsers,
  IconTriangleAlert,
  IconOctagonAlert,
  IconMegaphone,
  IconMapPin,
} from "../lib/icons";

const STATUS_ORDER: StatusClimatico[] = ["emergencia", "alerta", "atencao", "normal"];

export default function CentralDeDados() {
  const { uf: selectedUf, setUf } = useEstado();

  const estadoSelecionado = selectedUf ? getEstadoByUf(selectedUf) : undefined;
  const municipios = selectedUf ? getMunicipiosByEstado(selectedUf) : [];
  const canaisDenuncia = selectedUf ? getCanaisDenunciaByEstado(selectedUf) : [];
  const avaliacaoItens = selectedUf ? getAvaliacaoByEstado(selectedUf) : [];

  const contagemPorStatus = STATUS_ORDER.reduce(
    (acc, status) => {
      acc[status] = municipios.filter((m) => m.status === status).length;
      return acc;
    },
    {} as Record<StatusClimatico, number>,
  );

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
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <IndicatorCard icon={<IconUsers className="size-5" />} label="Municípios" value={String(municipios.length)} />
            <IndicatorCard
              icon={<IconOctagonAlert className="size-5" />}
              label={STATUS_INFO.emergencia.label}
              value={String(contagemPorStatus.emergencia)}
              tone={contagemPorStatus.emergencia > 0 ? "warn" : "neutral"}
            />
            <IndicatorCard
              icon={<IconTriangleAlert className="size-5" />}
              label={STATUS_INFO.alerta.label}
              value={String(contagemPorStatus.alerta)}
              tone={contagemPorStatus.alerta > 0 ? "warn" : "neutral"}
            />
            <IndicatorCard
              icon={<IconTriangleAlert className="size-5" />}
              label={STATUS_INFO.atencao.label}
              value={String(contagemPorStatus.atencao)}
            />
          </div>

          <div className="mb-8">
            <AvaliacaoClimaticaSection itens={avaliacaoItens} estadoNome={estadoSelecionado?.nome ?? ""} />
          </div>

          <div className="mb-8">
            <h2 className="mb-1 text-lg font-bold text-[#17301c]">Municípios monitorados</h2>
            <p className="mb-4 text-sm text-[#3f5b45]">
              Situação climática e indicadores hídricos por município, atualizados periodicamente.
            </p>
            <div className="surface overflow-x-auto rounded-2xl border border-[#e0ede1] bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e0ede1] text-xs font-semibold uppercase tracking-wide text-[#5c7a62]">
                    <th className="px-4 py-3">Município</th>
                    <th className="px-4 py-3">População</th>
                    <th className="px-4 py-3">Situação</th>
                    <th className="px-4 py-3">Chuva (30 dias)</th>
                    <th className="px-4 py-3">Índice de seca</th>
                    <th className="px-4 py-3">Risco</th>
                  </tr>
                </thead>
                <tbody>
                  {municipios.map((m) => (
                    <tr key={m.id} className="border-b border-[#e0ede1] last:border-0 hover:bg-[#f4f9f4]">
                      <td className="px-4 py-3 font-semibold text-[#17301c]">
                        <Link to={`/municipio/${m.id}`} className="hover:underline">
                          {m.nome}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[#3f5b45]">{formatPopulacao(m.populacao)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={m.status} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-[#3f5b45]">
                        {m.indicadores.chuvaUltimos30Dias} mm
                        <span className="text-xs text-[#8ba690]"> / {m.indicadores.chuvaMediaHistorica} mm média</span>
                      </td>
                      <td className="px-4 py-3 text-[#3f5b45]">{m.indicadores.indiceSeca} / 100</td>
                      <td className="px-4 py-3 text-[#3f5b45]">{RISCO_LABEL[m.indicadores.risco]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

          {municipios.length === 0 && (
            <p className="mt-4 flex items-center gap-1.5 text-sm text-[#5c7a62]">
              <IconMapPin className="size-4 shrink-0" /> Nenhum município monitorado neste estado ainda.
            </p>
          )}
        </>
      )}
    </div>
  );
}
