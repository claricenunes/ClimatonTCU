import { useState } from "react";
import type { ItemAvaliacaoClimatica } from "../../types";

interface DataVisualizationProps {
  avaliacoes: ItemAvaliacaoClimatica[];
  estadoNome: string;
}

export function DataVisualization({
  avaliacoes,
}: DataVisualizationProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  // 1. Pontuação por Eixo
  const eixoAgrupado = avaliacoes.reduce(
    (acc, item) => {
      if (!acc[item.eixo]) {
        acc[item.eixo] = { total: 0, count: 0 };
      }
      acc[item.eixo].total += item.pontuacao;
      acc[item.eixo].count += 1;
      return acc;
    },
    {} as Record<string, { total: number; count: number }>,
  );

  const eixoData = Object.entries(eixoAgrupado).map(([eixo, dados], i) => ({
    eixo,
    media: ((dados.total / dados.count) * 100).toFixed(1),
    cor: ["#10b981", "#f59e0b", "#ef4444"][i],
  }));

  // 2. Distribuição de Estágios (como dona)
  const estagioContagem = avaliacoes.reduce(
    (acc, item) => {
      acc[item.estagio] = (acc[item.estagio] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const estagioData = Object.entries(estagioContagem)
    .sort((a, b) => b[1] - a[1])
    .map(([estagio, count], index) => ({
      estagio,
      count,
      percentual: parseFloat(((count / avaliacoes.length) * 100).toFixed(1)),
      cor: ["#059669", "#d97706", "#dc2626", "#7c3aed"][index % 4],
    }));

  // 3. Ranking de Componentes
  const componenteAgrupado = avaliacoes.reduce(
    (acc, item) => {
      if (!acc[item.componente]) {
        acc[item.componente] = { total: 0, count: 0 };
      }
      acc[item.componente].total += item.pontuacao;
      acc[item.componente].count += 1;
      return acc;
    },
    {} as Record<string, { total: number; count: number }>,
  );

  const componenteData = Object.entries(componenteAgrupado)
    .map(([componente, dados]) => ({
      componente,
      media: ((dados.total / dados.count) * 100).toFixed(1),
      valor: ((dados.total / dados.count) * 100).toFixed(1),
    }))
    .sort((a, b) => parseFloat(b.media) - parseFloat(a.media))
    .slice(0, 8); // Top 8

  // 4. Contagem de Itens
  const itemContagem = avaliacoes.reduce((acc) => acc + 1, 0);

  // 5. Média geral
  const mediaPontuacao =
    (avaliacoes.reduce((acc, a) => acc + a.pontuacao, 0) / avaliacoes.length) * 100;

  // Função para renderizar pizza
  const renderPie = (
    data: Array<{ label: string; value: number; cor: string }>,
    size = 160,
  ) => {
    let currentAngle = 0;
    const radius = size / 2 - 10;
    const centerX = size / 2;
    const centerY = size / 2;

    const paths = data.map((item) => {
      const sliceAngle = (item.value / 100) * 360;
      const startAngle = (currentAngle * Math.PI) / 180;
      const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      currentAngle += sliceAngle;
      return { path, cor: item.cor };
    });

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
        {paths.map((p, i) => (
          <path key={i} d={p.path} fill={p.cor} stroke="white" strokeWidth="2" />
        ))}
      </svg>
    );
  };

  // Função para renderizar dona (donut) com interatividade
  const renderDonutInteractive = (
    data: Array<{ label: string; value: number; cor: string }>,
    size = 160,
  ) => {
    let currentAngle = 0;
    const outerRadius = size / 2 - 10;
    const innerRadius = size / 2 - 35;
    const centerX = size / 2;
    const centerY = size / 2;

    const segments = data.map((item) => {
      const sliceAngle = (item.value / 100) * 360;
      const startAngle = (currentAngle * Math.PI) / 180;
      const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;

      const x1 = centerX + outerRadius * Math.cos(startAngle);
      const y1 = centerY + outerRadius * Math.sin(startAngle);
      const x2 = centerX + outerRadius * Math.cos(endAngle);
      const y2 = centerY + outerRadius * Math.sin(endAngle);

      const x3 = centerX + innerRadius * Math.cos(endAngle);
      const y3 = centerY + innerRadius * Math.sin(endAngle);
      const x4 = centerX + innerRadius * Math.cos(startAngle);
      const y4 = centerY + innerRadius * Math.sin(startAngle);

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const path = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

      currentAngle += sliceAngle;
      return { path, cor: item.cor, label: item.label };
    });

    return (
      <div className="relative inline-block">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
          {segments.map((seg, i) => (
            <path
              key={i}
              d={seg.path}
              fill={seg.cor}
              stroke="white"
              strokeWidth="2"
              onMouseEnter={() => setHoveredStage(seg.label)}
              onMouseLeave={() => setHoveredStage(null)}
              className="cursor-pointer transition-opacity hover:opacity-80"
            />
          ))}
        </svg>
        {hoveredStage && (
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 rounded-lg bg-[#17301c] px-3 py-2 text-xs text-white whitespace-nowrap">
            {hoveredStage}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Grid 2x2 de Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pizza: Pontuação por Eixo */}
        <div className="rounded-2xl border border-[#e0ede1] bg-white p-6">
          <h3 className="mb-4 text-base font-semibold text-[#17301c]">Pontuação por eixo</h3>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div>
              {renderPie(
                eixoData.map((d) => ({
                  label: d.eixo,
                  value: parseFloat(d.media),
                  cor: d.cor,
                })),
                140,
              )}
            </div>
            <div className="space-y-2.5">
              {eixoData.map((item) => (
                <div key={item.eixo} className="flex items-center gap-2.5">
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.cor }}
                  />
                  <div>
                    <p className="text-xs text-[#3f5b45]">{item.eixo}</p>
                    <p className="text-sm font-bold text-[#17301c]">{item.media}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dona: Distribuição de Estágios */}
        <div className="rounded-2xl border border-[#e0ede1] bg-white p-6">
          <h3 className="mb-4 text-base font-semibold text-[#17301c]">Estágios de implementação</h3>
          <p className="mb-4 text-xs text-[#5c7a62]">Toque ou passe o mouse sobre o gráfico para ver detalhes</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div>
              {renderDonutInteractive(
                estagioData.map((d) => ({
                  label: d.estagio,
                  value: d.percentual,
                  cor: d.cor,
                })),
                140,
              )}
            </div>
            <div className="space-y-2.5">
              {estagioData.map((item) => (
                <div key={item.estagio} className="flex items-center gap-2.5">
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.cor }}
                  />
                  <div>
                    <p className="text-xs text-[#3f5b45]">{item.estagio}</p>
                    <p className="text-sm font-bold text-[#17301c]">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ranking de Componentes - Gráfico de Barra */}
      <div className="rounded-2xl border border-[#e0ede1] bg-white p-6">
        <h3 className="mb-4 text-base font-semibold text-[#17301c]">Ranking de componentes avaliados</h3>
        <div className="space-y-3">
          {componenteData.map((item) => (
            <div key={item.componente}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-[#17301c]">{item.componente}</span>
                <span className="text-sm font-bold text-brand-700">{item.media}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e0ede1]">
                <div
                  className="h-full bg-gradient-to-r from-brand-600 to-brand-400"
                  style={{ width: `${item.media}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs Resumido */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e0ede1] bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5c7a62]">
            Registros
          </p>
          <p className="mt-2 text-3xl font-bold text-[#17301c]">{itemContagem}</p>
        </div>
        <div className="rounded-xl border border-[#e0ede1] bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5c7a62]">
            Média geral
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-700">{mediaPontuacao.toFixed(1)}%</p>
        </div>
        <div className="rounded-xl border border-[#e0ede1] bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5c7a62]">
            Eixos
          </p>
          <p className="mt-2 text-3xl font-bold text-[#17301c]">{Object.keys(eixoAgrupado).length}</p>
        </div>
        <div className="rounded-xl border border-[#e0ede1] bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5c7a62]">
            Componentes
          </p>
          <p className="mt-2 text-3xl font-bold text-[#17301c]">{Object.keys(componenteAgrupado).length}</p>
        </div>
      </div>

      {/* Tabela de Estágios Detalhada */}
      <div className="rounded-2xl border border-[#e0ede1] bg-white p-6">
        <h3 className="mb-4 text-base font-semibold text-[#17301c]">Detalhamento de estágios</h3>
        <div className="space-y-3">
          {estagioData.map((item) => (
            <div key={item.estagio} className="flex items-center justify-between rounded-lg bg-[#f9fdf9] p-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.cor }}
                />
                <div>
                  <p className="font-medium text-[#17301c]">{item.estagio}</p>
                  <p className="text-xs text-[#5c7a62]">{item.count} registros</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#17301c]">{item.percentual}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
