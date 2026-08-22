import { useNavigate, useParams } from "react-router-dom";
import { getConteudoById } from "../data/educacao";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/States";
import { IconArrowLeft, IconClock } from "../lib/icons";
import { CATEGORIA_LABEL } from "./Educacao";

const NIVEL_LABEL: Record<string, string> = {
  comece_por_aqui: "Comece por aqui",
  aprofunde: "Aprofunde",
  voce_pode_fazer: "Você pode fazer",
};

export default function EducacaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const conteudo = id ? getConteudoById(id) : undefined;

  if (!conteudo) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Conteúdo não encontrado"
          description="Esse material pode ter sido removido ou o link está incorreto."
          action={
            <Button onClick={() => navigate("/educacao")} icon={<IconArrowLeft className="size-4" />}>
              Voltar para Educação
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div id="conteudo-principal" className="min-h-screen bg-gradient-to-b from-brand-50 to-[#f0f4e8] py-8">
      <article className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Educação", to: "/educacao" }, { label: conteudo.titulo }]} />

        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-brand-700 hover:bg-white/50"
        >
          <IconArrowLeft className="size-4" /> Voltar
        </button>

        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
              {CATEGORIA_LABEL[conteudo.categoria]}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-2.5 py-1 text-xs font-bold text-[#4a5d2e]">
              {NIVEL_LABEL[conteudo.nivel]}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold leading-tight text-[#17301c] sm:text-3xl">{conteudo.titulo}</h1>
          <p className="mt-3 flex items-center gap-1 text-sm text-[#5c7a62]">
            <IconClock className="size-3.5" /> {conteudo.tempoLeituraMin} min de leitura
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#17301c]">
            {conteudo.conteudo.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
