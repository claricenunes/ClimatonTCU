import { useNavigate, useParams } from "react-router-dom";
import { getNoticiaById } from "../data/noticias";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/States";
import { IconArrowLeft, IconClock } from "../lib/icons";
import { formatData } from "../lib/status";
import { CATEGORIA_LABEL } from "./Noticias";

export default function NoticiaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noticia = id ? getNoticiaById(id) : undefined;

  if (!noticia) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Notícia não encontrada"
          description="Essa notícia pode ter sido removida ou o link está incorreto."
          action={
            <Button onClick={() => navigate("/noticias")} icon={<IconArrowLeft className="size-4" />}>
              Voltar para Notícias
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div id="conteudo-principal" className="min-h-screen bg-gradient-to-b from-brand-50 to-[#f0f4e8] py-8">
      <article className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Notícias", to: "/noticias" }, { label: noticia.titulo }]} />

        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-brand-700 hover:bg-white/50"
        >
          <IconArrowLeft className="size-4" /> Voltar
        </button>

        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
              {CATEGORIA_LABEL[noticia.categoria]}
            </span>
            {noticia.estadoUf && (
              <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-2.5 py-1 text-xs font-bold text-[#4a5d2e]">
                {noticia.estadoUf}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight text-[#17301c] sm:text-3xl">{noticia.titulo}</h1>
          <p className="mt-3 flex items-center gap-1 text-sm text-[#5c7a62]">
            <IconClock className="size-3.5" /> {noticia.tempoLeituraMin} min de leitura
          </p>
          <p className="mt-2 text-sm text-[#5c7a62]">
            {formatData(noticia.data)} • Fonte: {noticia.fonte}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#17301c]">
            {noticia.conteudo.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {noticia.url && (
            <div className="mt-8 border-t border-[#e0ede1] pt-6">
              <p className="mb-3 text-sm text-[#5c7a62]">Para saber mais, acesse a notícia na fonte:</p>
              <a
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Acessar notícia original →
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
