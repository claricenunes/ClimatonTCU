import { ESTADOS } from "../../data/estados";
import type { RegiaoBR } from "../../types";
import { IconChevronDown, IconMapPin } from "../../lib/icons";

interface EstadoSelectProps {
  selectedUf: string | null;
  onSelect: (uf: string) => void;
}

const REGIOES_BR_ORDEM: RegiaoBR[] = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

export function EstadoSelect({ selectedUf, onSelect }: EstadoSelectProps) {
  return (
    <div className="relative">
      <label htmlFor="estado-select" className="mb-1.5 block text-sm font-semibold text-ink-800">
        {selectedUf ? "Estado selecionado" : "Ou selecione um estado"}
      </label>
      <IconMapPin className="pointer-events-none absolute left-4 top-[calc(50%+0.65rem)] size-5 -translate-y-1/2 text-ink-500" />
      <select
        id="estado-select"
        value={selectedUf ?? ""}
        onChange={(e) => {
          if (e.target.value) onSelect(e.target.value);
        }}
        className="w-full appearance-none rounded-lg border border-ink-200 bg-white py-3.5 pl-12 pr-11 text-base font-medium text-ink-900 shadow-card transition-colors focus:border-brand-500"
      >
        <option value="" disabled>
          Escolha um estado brasileiro
        </option>
        {REGIOES_BR_ORDEM.map((regiao) => (
          <optgroup key={regiao} label={regiao}>
            {ESTADOS.filter((e) => e.regiao === regiao).map((e) => (
              <option key={e.uf} value={e.uf}>
                {e.nome} ({e.uf})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-4 top-[calc(50%+0.65rem)] size-5 -translate-y-1/2 text-ink-500" />
    </div>
  );
}
