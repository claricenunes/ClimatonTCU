import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RELATOS as RELATOS_INICIAIS } from "../data/comunidade";
import { MUNICIPIOS, getMunicipioById } from "../data/municipios";
import { getOrganizacoesByEstado } from "../data/organizacoes";
import { getCanaisDenunciaByEstado } from "../data/canaisDenuncia";
import { getEstadoByUf } from "../data/estados";
import { useEstado } from "../context/EstadoContext";
import type { CategoriaRelato, NivelConfiabilidade, RelatoComunidade } from "../types";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { FilterChips } from "../components/ui/FilterChips";
import { CardSkeletonGrid, EmptyState } from "../components/ui/States";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { EstadoSelect } from "../components/municipio/EstadoSelect";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { useToast } from "../components/ui/Toast";
import { formatData, CANAL_TIPO_LABEL } from "../lib/status";
import { CONFIABILIDADE_META } from "../lib/confiabilidade";
import {
  IconHeart,
  IconPlus,
  IconUsers,
  IconCheckCircle,
  IconInfo,
  IconLandmark,
  IconMapPin,
  IconMegaphone,
  IconShare,
} from "../lib/icons";

const MENSAGEM_MINHA_CAUSA = "Venha apoiar minha causa";
const MENSAGEM_ESSA_CAUSA = "Vamos apoiar essa causa";

const CATEGORIA_LABEL: Record<CategoriaRelato, string> = {
  falta_agua: "Falta de água",
  alagamento: "Alagamento",
  vegetacao: "Vegetação seca",
  calor_extremo: "Calor extremo",
  outro: "Outro",
};

const CATEGORIA_OPTIONS = (Object.keys(CATEGORIA_LABEL) as CategoriaRelato[]).map((c) => ({
  value: c,
  label: CATEGORIA_LABEL[c],
}));

export default function Comunidade() {
  const { uf: selectedUf, setUf, clearUf } = useEstado();
  const [relatos, setRelatos] = useState<RelatoComunidade[]>(RELATOS_INICIAIS);
  const [categoria, setCategoria] = useState<CategoriaRelato | "todos">("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [meusRelatosIds, setMeusRelatosIds] = useState<Set<string>>(new Set());
  const { showToast } = useToast();

  const estadoSelecionado = selectedUf ? getEstadoByUf(selectedUf) : undefined;
  const organizacoes = selectedUf ? getOrganizacoesByEstado(selectedUf) : [];
  const canaisDenuncia = selectedUf ? getCanaisDenunciaByEstado(selectedUf) : [];

  const filtrados = useMemo(() => {
    let list = relatos;
    if (selectedUf) {
      list = list.filter((r) => getMunicipioById(r.municipioId)?.estadoUf === selectedUf);
    }
    if (categoria !== "todos") list = list.filter((r) => r.categoria === categoria);
    return [...list].sort((a, b) => (a.data < b.data ? 1 : -1));
  }, [relatos, selectedUf, categoria]);

  const loading = useSimulatedLoading(`${selectedUf}-${categoria}`);

  function handleApoiar(id: string) {
    setRelatos((prev) => prev.map((r) => (r.id === id ? { ...r, apoios: r.apoios + 1 } : r)));
  }

  function handleNovoRelato(novo: Omit<RelatoComunidade, "id" | "apoios" | "status" | "data" | "autorConfiabilidade">) {
    const relato: RelatoComunidade = {
      ...novo,
      id: `r-${Date.now()}`,
      apoios: 0,
      status: "pendente",
      data: new Date().toISOString().slice(0, 10),
      autorConfiabilidade: "novo",
    };
    setRelatos((prev) => [relato, ...prev]);
    setMeusRelatosIds((prev) => new Set(prev).add(relato.id));
    setModalOpen(false);
    showToast("Relato enviado! Ele passará por verificação antes de ser destacado.");
  }

  async function handleCompartilhar(relato: RelatoComunidade, municipioNome: string | undefined) {
    const mensagem = meusRelatosIds.has(relato.id) ? MENSAGEM_MINHA_CAUSA : MENSAGEM_ESSA_CAUSA;
    const texto = `${mensagem}: "${relato.titulo}"${municipioNome ? ` — ${municipioNome}` : ""}`;
    const url = `${window.location.origin}/comunidade`;

    if (navigator.share) {
      try {
        await navigator.share({ title: relato.titulo, text: texto, url });
      } catch {
        // usuário cancelou o compartilhamento — não é um erro
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${texto} ${url}`);
      showToast("Mensagem de compartilhamento copiada!");
    } catch {
      showToast(texto);
    }
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
            <p className="text-[#3f5b45]">Relatos de moradores sobre a situação climática local.</p>
          </div>
        </div>
        <Button icon={<IconPlus className="size-4" />} onClick={() => setModalOpen(true)}>
          Fazer um relato
        </Button>
      </div>

      <div className="mb-6 max-w-xs">
        <EstadoSelect selectedUf={selectedUf} onSelect={setUf} />
      </div>

      {organizacoes.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
            <IconLandmark className="size-5 text-brand-700" /> Organizações locais em {estadoSelecionado?.nome}
          </h2>
          <p className="mb-4 text-sm text-[#3f5b45]">
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
        </div>
      )}

      {canaisDenuncia.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-1 flex items-center gap-1.5 text-lg font-bold text-[#17301c]">
            <IconMegaphone className="size-5 text-brand-700" /> Canais de denúncia em {estadoSelecionado?.nome}
          </h2>
          <p className="mb-4 text-sm text-[#3f5b45]">
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
        </div>
      )}

      <div className="mb-6">
        <FilterChips label="Filtrar por tipo de relato" options={CATEGORIA_OPTIONS} selected={categoria} onChange={setCategoria} />
      </div>

      {loading ? (
        <CardSkeletonGrid count={4} />
      ) : filtrados.length === 0 ? (
        <EmptyState
          title="Nenhum relato encontrado"
          description={
            selectedUf && selectedUf !== "BA"
              ? `Ainda não temos relatos de moradores para ${estadoSelecionado?.nome}. A Bahia é o estado piloto do projeto, com cobertura completa.`
              : "Ainda não há relatos para esse tipo. Que tal ser o primeiro a compartilhar?"
          }
          action={
            selectedUf && selectedUf !== "BA" ? (
              <Button variant="outline" onClick={clearUf}>
                Ver todos os estados
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setModalOpen(true)}>
                Fazer um relato
              </Button>
            )
          }
        />
      ) : (
        <ul className="space-y-4">
          {filtrados.map((r) => {
            const municipio = getMunicipioById(r.municipioId);
            return (
              <li key={r.id} className="surface rounded-2xl border border-[#e0ede1] bg-white p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                    {CATEGORIA_LABEL[r.categoria]}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                      r.status === "verificado" ? "bg-[#e5f5e8] text-[#1f7a3d]" : "bg-[#f0eee0] text-[#6b6338]"
                    }`}
                  >
                    {r.status === "verificado" ? <IconCheckCircle className="size-3.5" /> : <IconInfo className="size-3.5" />}
                    {r.status === "verificado" ? "Verificado" : "Em verificação"}
                  </span>
                  {municipio && (
                    <Link to={`/municipio/${municipio.id}`} className="text-xs font-semibold text-brand-700 hover:underline">
                      {municipio.nome}
                    </Link>
                  )}
                </div>
                <h2 className="text-lg font-bold text-[#17301c]">{r.titulo}</h2>
                <p className="mt-1 text-sm text-[#3f5b45]">{r.descricao}</p>
                <p className="mt-2 text-sm font-bold text-brand-700">
                  {meusRelatosIds.has(r.id) ? MENSAGEM_MINHA_CAUSA : MENSAGEM_ESSA_CAUSA}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs text-[#5c7a62]">
                      {r.autor} · {formatData(r.data)}
                    </p>
                    <ConfiabilidadeBadge nivel={r.autorConfiabilidade} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCompartilhar(r, municipio?.nome)}
                      aria-label="Compartilhar relato"
                      className="flex items-center gap-1.5 rounded-full border border-[#c9dfcd] px-3 py-1.5 text-sm font-semibold text-[#3f5b45] hover:border-brand-400 hover:text-brand-700"
                    >
                      <IconShare className="size-4" />
                    </button>
                    <button
                      onClick={() => handleApoiar(r.id)}
                      className="flex items-center gap-1.5 rounded-full border border-[#c9dfcd] px-3 py-1.5 text-sm font-semibold text-[#3f5b45] hover:border-brand-400 hover:text-brand-700"
                    >
                      <IconHeart className="size-4" /> {r.apoios}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <NovoRelatoModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNovoRelato} />
    </div>
  );
}

function NovoRelatoModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (r: Omit<RelatoComunidade, "id" | "apoios" | "status" | "data" | "autorConfiabilidade">) => void;
}) {
  const [autor, setAutor] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [categoria, setCategoria] = useState<CategoriaRelato>("falta_agua");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const valid = autor.trim() && municipioId && titulo.trim() && descricao.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ autor: autor.trim(), municipioId, categoria, titulo: titulo.trim(), descricao: descricao.trim() });
      setSubmitting(false);
      setAutor("");
      setMunicipioId("");
      setCategoria("falta_agua");
      setTitulo("");
      setDescricao("");
    }, 600);
  }

  return (
    <Modal open={open} onClose={onClose} title="Fazer um relato">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Seu nome">
          <input
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Como podemos te chamar?"
          />
        </Field>
        <Field label="Município">
          <select
            value={municipioId}
            onChange={(e) => setMunicipioId(e.target.value)}
            required
            className="w-full rounded-lg border border-[#c9dfcd] bg-white px-3.5 py-2.5 focus:border-brand-500"
          >
            <option value="">Selecione um município</option>
            {MUNICIPIOS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo de relato">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as CategoriaRelato)}
            className="w-full rounded-lg border border-[#c9dfcd] bg-white px-3.5 py-2.5 focus:border-brand-500"
          >
            {CATEGORIA_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Título">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            maxLength={80}
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Resuma o que está acontecendo"
          />
        </Field>
        <Field label="Descrição">
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            rows={4}
            maxLength={500}
            className="w-full rounded-lg border border-[#c9dfcd] px-3.5 py-2.5 focus:border-brand-500"
            placeholder="Conte com detalhes o que você está observando"
          />
        </Field>
        <p className="text-xs text-[#5c7a62]">
          Seu relato passará por uma verificação simples antes de aparecer como confirmado para os demais usuários.
          Como é seu primeiro envio, ele aparecerá marcado como "Novo colaborador" até que você construa um
          histórico de relatos confirmados pela comunidade.
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!valid || submitting}>
            {submitting ? "Enviando..." : "Enviar relato"}
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

function ConfiabilidadeBadge({ nivel }: { nivel: NivelConfiabilidade }) {
  const meta = CONFIABILIDADE_META[nivel];
  const Icon = meta.icon;
  return (
    <span
      title={meta.descricao}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${meta.bg} ${meta.text}`}
    >
      <Icon className="size-3.5 shrink-0" />
      {meta.label}
    </span>
  );
}
