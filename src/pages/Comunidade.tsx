import { getOrganizacoesByEstado } from "../data/organizacoes";
import { getCanaisDenunciaByEstado } from "../data/canaisDenuncia";
import { getEstadoByUf } from "../data/estados";
import { useEstado } from "../context/EstadoContext";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { EmptyState } from "../components/ui/States";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { CANAL_TIPO_LABEL } from "../lib/status";
import { IconUsers, IconLandmark, IconMapPin, IconMegaphone } from "../lib/icons";

export default function Comunidade() {
  const { uf: selectedUf, setUf } = useEstado();

  const effectiveUf = selectedUf ?? "BA";
  const estadoSelecionado = getEstadoByUf(effectiveUf);
  const organizacoes = getOrganizacoesByEstado(effectiveUf);
  const canaisDenuncia = getCanaisDenunciaByEstado(effectiveUf);
  const semDados = organizacoes.length === 0 && canaisDenuncia.length === 0;

  return (
    <div id="conteudo-principal" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Comunidade" }]} />

      <div className="mb-8 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <IconUsers className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-[#17301c] sm:text-3xl">
            Comunidade{estadoSelecionado ? ` — ${estadoSelecionado.nome}` : ""}
          </h1>
          <p className="text-[#3f5b45]">Organizações e canais de participação climática no seu estado.</p>
        </div>
      </div>

      <div className="mb-8 max-w-xs">
        <EstadoSelect selectedUf={effectiveUf} onSelect={setUf} />
      </div>

      {semDados ? (
        <EmptyState
          title="Ainda não mapeamos esses dados"
          description={`A Bahia é o estado piloto do projeto, com cobertura completa de organizações e canais de denúncia. Ainda não temos esses dados para ${estadoSelecionado?.nome}.`}
        />
      ) : (
        <div className="space-y-8">
          {organizacoes.length > 0 && (
            <section className="rounded-2xl border border-[#e0ede1] bg-[#f4f9f4] p-6">
              <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
                <IconLandmark className="size-5 text-brand-700" /> Organizações locais em {estadoSelecionado?.nome}
              </h2>
              <p className="mb-5 text-sm text-[#3f5b45]">
                Instituições da sociedade civil que atuam em causas socioambientais e climáticas no estado.
              </p>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {organizacoes.map((o) => (
                  <li key={o.id} className="surface rounded-2xl border border-[#e0ede1] bg-white p-5">
                    <h3 className="text-base font-bold text-[#17301c]">{o.nome}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#5c7a62]">
                      <IconMapPin className="size-3.5 shrink-0" /> {o.localizacao} · {o.ambito}
                    </p>
                    <p className="mt-2 text-sm text-[#3f5b45]">{o.missao}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {o.linhasDeAtuacao.map((linha) => (
                        <span key={linha} className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                          {linha}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5c7a62]">
                      {o.telefone && <span>{o.telefone}</span>}
                      {o.email && <span>{o.email}</span>}
                      {o.site && (
                        <a href={o.site} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">
                          Site
                        </a>
                      )}
                      {o.instagram && <span>{o.instagram}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {canaisDenuncia.length > 0 && (
            <section className="rounded-2xl border border-[#e0ede1] bg-[#f4f9f4] p-6">
              <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
                <IconMegaphone className="size-5 text-brand-700" /> Canais de denúncia em {estadoSelecionado?.nome}
              </h2>
              <p className="mb-5 text-sm text-[#3f5b45]">
                Órgãos oficiais para denunciar, reclamar ou cobrar ação em política climática e ambiental no estado.
              </p>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {canaisDenuncia.map((c) => (
                  <li key={c.id} className="surface rounded-2xl border border-[#e0ede1] bg-white p-5">
                    <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                      {c.orgao}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-[#17301c]">{c.nome}</h3>
                    <p className="mt-1 text-sm text-[#3f5b45]">{c.descricao}</p>
                    {c.nota && <p className="mt-1.5 text-xs italic text-[#5c7a62]">{c.nota}</p>}
                    {c.temas.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.temas.map((tema) => (
                          <span
                            key={tema}
                            className="inline-flex items-center rounded-full bg-[#f0eee0] px-2.5 py-1 text-xs font-semibold text-[#6b6338]"
                          >
                            {tema}
                          </span>
                        ))}
                      </div>
                    )}
                    <ul className="mt-3 space-y-1 text-xs text-[#3f5b45]">
                      {c.canais.map((canal, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="font-semibold text-[#5c7a62]">{CANAL_TIPO_LABEL[canal.tipo]}:</span>
                          {canal.href ? (
                            <a
                              href={canal.href}
                              target={canal.href.startsWith("http") ? "_blank" : undefined}
                              rel={canal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="font-semibold text-brand-700 hover:underline"
                            >
                              {canal.label}
                            </a>
                          ) : (
                            <span>{canal.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
