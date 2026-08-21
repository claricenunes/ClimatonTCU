import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MUNICIPIOS } from "../../data/municipios";
import { SearchInput } from "../ui/SearchInput";
import { StatusDot } from "../ui/StatusBadge";
import { getMunicipioLocalLabel } from "../../lib/status";
import { IconMapPin } from "../../lib/icons";

export function MunicipioSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return MUNICIPIOS.filter((m) => m.nome.toLowerCase().includes(q)).slice(0, 6);
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
        label="Buscar município brasileiro"
        placeholder="Buscar meu município (ex: Vitória da Conquista)"
        value={query}
        onChange={(v) => {
          setQuery(v);
          setOpen(true);
        }}
      />
      {open && query.trim() && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#d7e8da] bg-white shadow-lg animate-fade-in">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[#3f5b45]">
              Nenhum município encontrado para "{query}". Confira a grafia e tente novamente.
            </p>
          ) : (
            <ul>
              {results.map((m) => (
                <li key={m.id}>
                  <button
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-brand-50"
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                      navigate(`/municipio/${m.id}`);
                    }}
                  >
                    <IconMapPin className="size-4 shrink-0 text-brand-600" />
                    <span className="flex-1">
                      <span className="block font-semibold text-[#17301c]">{m.nome}</span>
                      <span className="block text-xs text-[#5c7a62]">
                        {getMunicipioLocalLabel(m)} ({m.estadoUf})
                      </span>
                    </span>
                    <StatusDot status={m.status} />
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
