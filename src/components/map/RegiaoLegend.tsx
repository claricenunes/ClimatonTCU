import type { RegiaoBR } from "../../types";
import { REGIAO_BR_COLORS, REGIOES_BR_UFS } from "../../lib/regiaoBrColors";

const ORDEM: RegiaoBR[] = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

export function RegiaoLegend() {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
      {ORDEM.map((regiao) => {
        const color = REGIAO_BR_COLORS[regiao];
        return (
          <li key={regiao} className={`rounded-lg px-3 py-2.5 text-left ${color.chipClass}`}>
            <span className="flex items-center gap-2 text-sm font-bold">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color.solid }}
                aria-hidden="true"
              />
              {regiao}
            </span>
            <span className="mt-0.5 block text-xs font-medium opacity-80">
              {REGIOES_BR_UFS[regiao].join(" · ")}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
