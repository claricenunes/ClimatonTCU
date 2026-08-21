import { useMemo, useRef, useState } from "react";
import { ESTADOS } from "../../data/estados";
import { SearchInput } from "../ui/SearchInput";
import { StatusDot } from "../ui/StatusBadge";
import type { EstadoSummary } from "../../hooks/useEstadoStatus";
import { IconMapPin } from "../../lib/icons";

interface EstadoSearchProps {
  summaries: Record<string, EstadoSummary>;
  onSelect: (uf: string) => void;
}

export function EstadoSearch({ summaries, onSelect }: EstadoSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return ESTADOS;
    const q = query.trim().toLowerCase();
    return ESTADOS.filter((e) => e.nome.toLowerCase().includes(q) || e.uf.toLowerCase() === q);
  }, [query]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <SearchInput
        label="Buscar estado por nome ou sigla"
        placeholder="Buscar estado (ex: Bahia ou BA)"
        value={query}
        onChange={(v) => {
          setQuery(v);
          setOpen(true);
        }}
      />
      {open && (
        <div className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[#d7e8da] bg-white shadow-lg animate-fade-in">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[#3f5b45]">Nenhum estado encontrado para "{query}".</p>
          ) : (
            <ul>
              {results.map((e) => (
                <li key={e.uf}>
                  <button
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-brand-50"
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                      onSelect(e.uf);
                    }}
                  >
                    <IconMapPin className="size-4 shrink-0 text-brand-600" />
                    <span className="flex-1">
                      <span className="block font-semibold text-[#17301c]">
                        {e.nome} <span className="font-normal text-[#5c7a62]">({e.uf})</span>
                      </span>
                      <span className="block text-xs text-[#5c7a62]">{e.regiao}</span>
                    </span>
                    <StatusDot status={summaries[e.uf]?.status ?? "normal"} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
