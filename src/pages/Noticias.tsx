import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { NOTICIAS } from "../data/noticias";
import type { CategoriaNoticia } from "../types";
import { SearchInput } from "../components/ui/SearchInput";
import { FilterChips } from "../components/ui/FilterChips";
import { CardSkeletonGrid, EmptyState } from "../components/ui/States";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { formatData } from "../lib/status";
import { IconClock, IconNewspaper } from "../lib/icons";

export const CATEGORIA_LABEL: Record<CategoriaNoticia, string> = {
  seca: "Seca",
  chuvas: "Chuvas",
  politica_publica: "Política pública",
  meio_ambiente: "Meio ambiente",
  prevencao: "Prevenção",
};

const CATEGORIA_OPTIONS = (Object.keys(CATEGORIA_LABEL) as CategoriaNoticia[]).map((c) => ({
  value: c,
  label: CATEGORIA_LABEL[c],
}));

export default function Noticias() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<CategoriaNoticia | "todos">("todos");

  const filtradas = useMemo(() => {
    let list = NOTICIAS;
    if (categoria !== "todos") list = list.filter((n) => n.categoria === categoria);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((n) => n.titulo.toLowerCase().includes(q) || n.resumo.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => (a.data < b.data ? 1 : -1));
  }, [query, categoria]);

  const loading = useSimulatedLoading(`${query}-${categoria}`);

  return (
    <div id="conteudo-principal" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Notícias" }]} />

      <div className="mb-8 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <IconNewspaper className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-[#17301c] sm:text-3xl">Notícias</h1>
          <p className="text-[#3f5b45]">Atualizações sobre a situação climática no Brasil.</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <SearchInput label="Buscar notícias" placeholder="Buscar por palavra-chave" value={query} onChange={setQuery} />
        <FilterChips label="Filtrar por categoria" options={CATEGORIA_OPTIONS} selected={categoria} onChange={setCategoria} />
      </div>

      {loading ? (
        <CardSkeletonGrid count={6} />
      ) : filtradas.length === 0 ? (
        <EmptyState
          title="Nenhuma notícia encontrada"
          description="Tente outra palavra-chave ou remova o filtro de categoria."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setCategoria("todos");
              }}
            >
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((n) => (
            <Link
              key={n.id}
              to={`/noticias/${n.id}`}
              className="surface group flex flex-col rounded-2xl border border-[#e0ede1] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <span className="mb-3 inline-flex w-max items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                {CATEGORIA_LABEL[n.categoria]}
              </span>
              <h2 className="mb-2 text-lg font-bold text-[#17301c] group-hover:text-brand-700">{n.titulo}</h2>
              <p className="mb-4 line-clamp-3 flex-1 text-sm text-[#3f5b45]">{n.resumo}</p>
              <div className="flex items-center justify-between text-xs text-[#5c7a62]">
                <span>{formatData(n.data)}</span>
                <span className="flex items-center gap-1">
                  <IconClock className="size-3.5" /> {n.tempoLeituraMin} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
