import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CONTEUDOS } from "../data/educacao";
import type { CategoriaEducacao } from "../types";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { FilterChips } from "../components/ui/FilterChips";
import { CardSkeletonGrid, EmptyState } from "../components/ui/States";
import { Button } from "../components/ui/Button";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { IconClock, IconGraduationCap } from "../lib/icons";

export const CATEGORIA_LABEL: Record<CategoriaEducacao, string> = {
  agua: "Água",
  clima: "Clima",
  prevencao: "Prevenção",
  agricultura: "Agricultura",
  politicas_publicas: "Políticas públicas",
};

const NIVEL_LABEL: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const CATEGORIA_OPTIONS = (Object.keys(CATEGORIA_LABEL) as CategoriaEducacao[]).map((c) => ({
  value: c,
  label: CATEGORIA_LABEL[c],
}));

export default function Educacao() {
  const [categoria, setCategoria] = useState<CategoriaEducacao | "todos">("todos");

  const filtrados = useMemo(() => {
    if (categoria === "todos") return CONTEUDOS;
    return CONTEUDOS.filter((c) => c.categoria === categoria);
  }, [categoria]);

  const loading = useSimulatedLoading(categoria);

  return (
    <div id="conteudo-principal" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Educação" }]} />

      <div className="mb-8 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <IconGraduationCap className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-[#17301c] sm:text-3xl">Educação</h1>
          <p className="text-[#3f5b45]">Conteúdos simples sobre clima, água e convivência com a seca.</p>
        </div>
      </div>

      <div className="mb-6">
        <FilterChips label="Filtrar por tema" options={CATEGORIA_OPTIONS} selected={categoria} onChange={setCategoria} />
      </div>

      {loading ? (
        <CardSkeletonGrid count={6} />
      ) : filtrados.length === 0 ? (
        <EmptyState
          title="Nenhum conteúdo encontrado"
          description="Tente selecionar outro tema."
          action={
            <Button variant="outline" onClick={() => setCategoria("todos")}>
              Ver todos os temas
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((c) => (
            <Link
              key={c.id}
              to={`/educacao/${c.id}`}
              className="surface group flex flex-col rounded-2xl border border-[#e0ede1] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                  {CATEGORIA_LABEL[c.categoria]}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-2.5 py-1 text-xs font-bold text-[#4a5d2e]">
                  {NIVEL_LABEL[c.nivel]}
                </span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-[#17301c] group-hover:text-brand-700">{c.titulo}</h2>
              <p className="mb-4 line-clamp-3 flex-1 text-sm text-[#3f5b45]">{c.resumo}</p>
              <span className="flex items-center gap-1 text-xs text-[#5c7a62]">
                <IconClock className="size-3.5" /> {c.tempoLeituraMin} min de leitura
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
