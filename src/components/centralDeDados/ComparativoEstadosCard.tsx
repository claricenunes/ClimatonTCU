import { pioresGapsBaVsMg } from "../../lib/avaliacaoClimatica";
import { IconScale } from "../../lib/icons";

export function ComparativoEstadosCard() {
  const indicadores = pioresGapsBaVsMg(3);

  return (
    <div className="surface rounded-2xl border border-[#e0ede1] bg-white p-6">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <IconScale className="size-5" />
        </span>
        <h2 className="text-lg font-bold text-[#17301c]">Comparação com estados com melhores indicadores</h2>
      </div>
      <p className="mb-5 text-sm text-[#3f5b45]">
        Os 3 indicadores em que a Bahia mais está atrás de Minas Gerais — o estado com melhor desempenho médio na
        amostra de auditoria — nos eixos de Financiamento, Governança e Políticas públicas.
      </p>
      <div className="space-y-4">
        {indicadores.map((ind) => (
          <div key={ind.componente} className="rounded-xl bg-[#f9fdf9] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#17301c]">
                <span className="text-brand-700">{ind.componente}</span> · {ind.label}
              </p>
              <span className="shrink-0 rounded-full bg-status-emergencia-bg px-2.5 py-0.5 text-xs font-bold text-status-emergencia">
                -{Math.round(ind.gap * 100)} p.p.
              </span>
            </div>
            <div className="space-y-2">
              <BarraComparativa estado="Bahia" pontuacao={ind.pontuacaoBa} cor="bg-status-emergencia" />
              <BarraComparativa estado="Minas Gerais" pontuacao={ind.pontuacaoMg} cor="bg-status-normal" />
            </div>
            {ind.porque && (
              <details className="mt-3">
                <summary className="cursor-pointer text-xs font-semibold text-brand-700 hover:underline">
                  Entenda o porquê
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[#3f5b45]">{ind.porque}</p>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BarraComparativa({ estado, pontuacao, cor }: { estado: string; pontuacao: number; cor: string }) {
  const pct = Math.round(pontuacao * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-xs text-[#3f5b45]">{estado}</span>
      <div
        className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e0ede1]"
        role="img"
        aria-label={`${estado}: ${pct}%`}
      >
        <div className={`h-full rounded-full ${cor}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-bold text-[#17301c]">{pct}%</span>
    </div>
  );
}
