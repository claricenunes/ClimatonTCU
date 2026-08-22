import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMunicipioById, getAlertasByMunicipio } from "../data/municipios";
import { getRegiaoById } from "../data/regioes";
import { getEstadoByUf } from "../data/estados";
import { NOTICIAS } from "../data/noticias";
import { getRelatosByMunicipio } from "../data/comunidade";
import { Breadcrumbs, type Crumb } from "../components/ui/Breadcrumbs";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Tabs } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/States";
import { Avatar } from "../components/ui/Avatar";
import { IndicatorCard } from "../components/municipio/IndicatorCard";
import { formatPopulacao, formatData, RISCO_LABEL, STATUS_STYLES } from "../lib/status";
import {
  IconArrowLeft,
  IconThermometer,
  IconDroplet,
  IconTriangleAlert,
  IconUsers,
} from "../lib/icons";
import { STATUS_INFO } from "../types";

const TABS = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "indicadores", label: "Indicadores" },
  { id: "alertas", label: "Alertas" },
  { id: "comunidade", label: "Relatos da comunidade" },
];

export default function MunicipioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState("visao-geral");

  const municipio = id ? getMunicipioById(id) : undefined;

  if (!municipio) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Município não encontrado"
          description="O município que você procura não está na nossa base de monitoramento no momento."
          action={
            <Button onClick={() => navigate("/")} icon={<IconArrowLeft className="size-4" />}>
              Voltar para o início
            </Button>
          }
        />
      </div>
    );
  }

  const regiao = municipio.regiaoId ? getRegiaoById(municipio.regiaoId) : undefined;
  const estado = getEstadoByUf(municipio.estadoUf);
  const alertas = getAlertasByMunicipio(municipio.id);
  const relatos = getRelatosByMunicipio(municipio.id);
  const noticiasRelacionadas = NOTICIAS.filter((n) => n.municipioId === municipio.id);
  const style = STATUS_STYLES[municipio.status];

  const breadcrumbItems: Crumb[] = [
    { label: "Início", to: "/" },
    { label: estado?.nome ?? municipio.estadoUf, to: "/" },
  ];
  if (regiao) breadcrumbItems.push({ label: regiao.nome, to: "/" });
  breadcrumbItems.push({ label: municipio.nome });

  return (
    <div id="conteudo-principal" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={breadcrumbItems} />

      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        <IconArrowLeft className="size-4" /> Voltar
      </button>

      <div className={`mb-6 rounded-2xl border p-6 ${style.bg} ${style.border}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#17301c]">
              {municipio.nome} <span className="text-xl font-bold text-[#5c7a62]">— {municipio.estadoUf}</span>
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#3f5b45]">
              <IconUsers className="size-4" /> {formatPopulacao(municipio.populacao)} habitantes ·{" "}
              {regiao?.nome ?? estado?.nome}
            </p>
          </div>
          <StatusBadge status={municipio.status} />
        </div>
        <p className="mt-4 text-[#17301c]">{municipio.resumo}</p>
        <p className="mt-3 text-xs text-[#5c7a62]">Atualizado em {formatData(municipio.atualizadoEm)}</p>
      </div>

      <Tabs items={TABS} activeId={tab} onChange={setTab} />

      <div className="py-6">
        {tab === "visao-geral" && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-[#5c7a62]">{STATUS_INFO[municipio.status].description}.</p>
              <p className="text-[#17301c]">{municipio.resumo}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <IndicatorCard
                icon={<IconThermometer className="size-5" />}
                label="Temperatura média"
                value={`${municipio.indicadores.temperaturaMedia.toFixed(1)}°C`}
              />
              <IndicatorCard
                icon={<IconDroplet className="size-5" />}
                label="Chuva (30 dias)"
                value={`${municipio.indicadores.chuvaUltimos30Dias} mm`}
                tone={municipio.indicadores.chuvaUltimos30Dias < municipio.indicadores.chuvaMediaHistorica * 0.6 ? "warn" : "neutral"}
              />
              <IndicatorCard
                icon={<IconTriangleAlert className="size-5" />}
                label="Alertas ativos"
                value={String(alertas.length)}
                tone={alertas.length > 0 ? "warn" : "neutral"}
              />
            </div>
          </div>
        )}

        {tab === "indicadores" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <IndicatorCard
              icon={<IconThermometer className="size-5" />}
              label="Temperatura média"
              value={`${municipio.indicadores.temperaturaMedia.toFixed(1)}°C`}
              helpText="Média dos últimos 30 dias"
            />
            <IndicatorCard
              icon={<IconDroplet className="size-5" />}
              label="Chuva acumulada (30 dias)"
              value={`${municipio.indicadores.chuvaUltimos30Dias} mm`}
              helpText={`Média histórica: ${municipio.indicadores.chuvaMediaHistorica} mm`}
              tone={municipio.indicadores.chuvaUltimos30Dias < municipio.indicadores.chuvaMediaHistorica * 0.6 ? "warn" : "neutral"}
            />
            <IndicatorCard
              icon={<IconTriangleAlert className="size-5" />}
              label="Índice de seca"
              value={`${municipio.indicadores.indiceSeca} / 100`}
              helpText="Quanto maior, mais distante do padrão normal de chuvas"
              tone={municipio.indicadores.indiceSeca >= 60 ? "warn" : "neutral"}
            />
            <IndicatorCard
              icon={<IconTriangleAlert className="size-5" />}
              label="Nível de risco"
              value={RISCO_LABEL[municipio.indicadores.risco]}
              helpText="Avaliação combinada dos indicadores acima"
              tone={municipio.indicadores.risco === "alto" || municipio.indicadores.risco === "muito_alto" ? "warn" : "neutral"}
            />
          </div>
        )}

        {tab === "alertas" && (
          <>
            {alertas.length === 0 ? (
              <EmptyState title="Nenhum alerta ativo" description="Este município não possui alertas climáticos registrados no momento." />
            ) : (
              <ul className="space-y-3">
                {alertas.map((a) => {
                  const s = STATUS_STYLES[a.nivel];
                  const Icon = s.icon;
                  return (
                    <li key={a.id} className={`rounded-xl border p-4 ${s.bg} ${s.border}`}>
                      <div className="flex items-start gap-3">
                        <Icon className={`mt-0.5 size-5 shrink-0 ${s.text}`} />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="font-bold text-[#17301c]">{a.titulo}</h3>
                            <span className="text-xs text-[#5c7a62]">{formatData(a.data)}</span>
                          </div>
                          <p className="mt-1 text-sm text-[#3f5b45]">{a.descricao}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        {tab === "comunidade" && (
          <>
            {relatos.length === 0 ? (
              <EmptyState
                title="Nenhum relato por aqui ainda"
                description="Seja o primeiro a compartilhar o que está acontecendo neste município."
                action={
                  <Link to="/relatos">
                    <Button variant="outline">Ir para Relatos</Button>
                  </Link>
                }
              />
            ) : (
              <ul className="space-y-3">
                {relatos.map((r) => (
                  <li key={r.id} className="rounded-xl border border-[#e0ede1] bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-bold text-[#17301c]">{r.titulo}</h3>
                      <span className="text-xs text-[#5c7a62]">{formatData(r.data)}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#3f5b45]">{r.descricao}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Avatar name={r.autor} size="sm" />
                      <p className="text-xs font-medium text-[#5c7a62]">Relato de {r.autor}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {noticiasRelacionadas.length > 0 && (
        <div className="mt-4 border-t border-[#e0ede1] pt-6">
          <h2 className="mb-3 text-lg font-bold text-[#17301c]">Notícias relacionadas</h2>
          <ul className="space-y-2">
            {noticiasRelacionadas.map((n) => (
              <li key={n.id}>
                <Link to={`/noticias/${n.id}`} className="font-semibold text-brand-700 hover:underline">
                  {n.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
