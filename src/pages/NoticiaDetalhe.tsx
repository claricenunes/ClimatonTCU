import { useNavigate, useParams, Link } from "react-router-dom";
import { getNoticiaById } from "../data/noticias";
import { getMunicipioById } from "../data/municipios";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/States";
import { formatData } from "../lib/status";
import { IconArrowLeft, IconClock, IconMapPin } from "../lib/icons";
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

  const municipio = noticia.municipioId ? getMunicipioById(noticia.municipioId) : undefined;

  return (
    <article id="conteudo-principal" className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Notícias", to: "/noticias" }, { label: noticia.titulo }]} />

      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        <IconArrowLeft className="size-4" /> Voltar
      </button>

      <span className="mb-3 inline-flex w-max items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
        {CATEGORIA_LABEL[noticia.categoria]}
      </span>
      <h1 className="text-2xl font-extrabold leading-tight text-[#17301c] sm:text-3xl">{noticia.titulo}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5c7a62]">
        <span>{formatData(noticia.data)}</span>
        <span className="flex items-center gap-1">
          <IconClock className="size-3.5" /> {noticia.tempoLeituraMin} min de leitura
        </span>
        <span>Fonte: {noticia.fonte}</span>
      </div>

      {municipio && (
        <Link
          to={`/municipio/${municipio.id}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-100"
        >
          <IconMapPin className="size-4" /> Ver dados de {municipio.nome}
        </Link>
      )}

      <div className="prose-content mt-6 space-y-4 text-base leading-relaxed text-[#17301c]">
        {noticia.conteudo.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
