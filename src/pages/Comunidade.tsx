import { useState } from "react";
import { ORGANIZACOES } from "../data/organizacoes";
import { getCanaisDenunciaByEstado } from "../data/canaisDenuncia";
import { getEstadoByUf } from "../data/estados";
import { useEstado } from "../context/EstadoContext";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { EmptyState } from "../components/ui/States";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { CANAL_TIPO_LABEL } from "../lib/status";
import type { Organizacao } from "../types";
import { IconUsers, IconLandmark, IconMapPin, IconMegaphone, IconPlus } from "../lib/icons";

const AMBITO_OPTIONS = ["Municipal", "Estadual", "Federal"];

export default function Comunidade() {
  const { uf: selectedUf, setUf } = useEstado();
  const [organizacoesState, setOrganizacoesState] = useState<Organizacao[]>(ORGANIZACOES);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const effectiveUf = selectedUf ?? "BA";
  const estadoSelecionado = getEstadoByUf(effectiveUf);
  const organizacoes = organizacoesState.filter((o) => o.estadoUf === effectiveUf);
  const canaisDenuncia = getCanaisDenunciaByEstado(effectiveUf);
  const semDados = organizacoes.length === 0 && canaisDenuncia.length === 0;

  function handleNovaOrganizacao(nova: Omit<Organizacao, "id" | "estadoUf">) {
    const organizacao: Organizacao = {
      ...nova,
      id: `org-${Date.now()}`,
      estadoUf: effectiveUf,
    };
    setOrganizacoesState((prev) => [organizacao, ...prev]);
    setModalOpen(false);
    showToast("Grupo cadastrado com sucesso!");
  }

  return (
    <div id="conteudo-principal" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Comunidade" }]} />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
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
        <Button icon={<IconPlus className="size-4" />} onClick={() => setModalOpen(true)}>
          Cadastrar grupo
        </Button>
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
          <section className="rounded-2xl border border-[#e0ede1] bg-[#f4f9f4] p-6">
            <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
              <IconMapPin className="size-5 text-brand-700" /> Encontre um grupo de mobilização mais próximo de você
            </h2>
            <p className="mb-5 text-sm text-[#3f5b45]">
              Veja onde estão os grupos e organizações cadastrados em {estadoSelecionado?.nome}.
            </p>
            <img
              src="/mapa.png"
              alt={`Mapa com a localização dos grupos de mobilização cadastrados em ${estadoSelecionado?.nome}`}
              className="aspect-square w-full rounded-xl border border-[#e0ede1] object-cover sm:aspect-auto sm:h-80"
            />
          </section>

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

      <NovaOrganizacaoModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNovaOrganizacao} />
    </div>
  );
}

function NovaOrganizacaoModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (o: Omit<Organizacao, "id" | "estadoUf">) => void;
}) {
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [ambito, setAmbito] = useState(AMBITO_OPTIONS[1]);
  const [areaTematica, setAreaTematica] = useState("");
  const [missao, setMissao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const valid = nome.trim() && localizacao.trim() && areaTematica.trim() && missao.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        nome: nome.trim(),
        localizacao: localizacao.trim(),
        ambito,
        areaTematica: areaTematica.trim(),
        missao: missao.trim(),
        linhasDeAtuacao: [],
        telefone: telefone.trim() || undefined,
        email: email.trim() || undefined,
        site: site.trim() || undefined,
      });
      setSubmitting(false);
      setNome("");
      setLocalizacao("");
      setAmbito(AMBITO_OPTIONS[1]);
      setAreaTematica("");
      setMissao("");
      setTelefone("");
      setEmail("");
      setSite("");
    }, 600);
  }

  return (
    <Modal open={open} onClose={onClose} title="Cadastrar grupo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nome do grupo">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Como seu grupo se chama?"
          />
        </Field>
        <Field label="Localização">
          <input
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Ex: Salvador - BA"
          />
        </Field>
        <Field label="Âmbito de atuação">
          <select
            value={ambito}
            onChange={(e) => setAmbito(e.target.value)}
            className="w-full rounded-lg border border-[#c9dfcd] bg-white px-3.5 py-2.5 focus:border-brand-500"
          >
            {AMBITO_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Área temática">
          <input
            value={areaTematica}
            onChange={(e) => setAreaTematica(e.target.value)}
            required
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Ex: Meio ambiente e recursos naturais"
          />
        </Field>
        <Field label="Missão">
          <textarea
            value={missao}
            onChange={(e) => setMissao(e.target.value)}
            required
            rows={4}
            maxLength={500}
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Conte o que o seu grupo faz e por quê"
          />
        </Field>
        <Field label="Telefone (opcional)">
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="(00) 00000-0000"
          />
        </Field>
        <Field label="E-mail (opcional)">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="contato@organizacao.org.br"
          />
        </Field>
        <Field label="Site (opcional)">
          <input
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="https://..."
          />
        </Field>
        <p className="text-xs text-[#5c7a62]">
          Seu grupo passará por uma verificação simples antes de aparecer com destaque para os demais usuários.
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!valid || submitting}>
            {submitting ? "Enviando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[#17301c]">{label}</span>
      {children}
    </label>
  );
}
