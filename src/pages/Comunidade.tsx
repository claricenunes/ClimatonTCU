import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RELATOS as RELATOS_INICIAIS } from "../data/comunidade";
import { MUNICIPIOS, getMunicipioById } from "../data/municipios";
import type { CategoriaRelato, RelatoComunidade } from "../types";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { FilterChips } from "../components/ui/FilterChips";
import { CardSkeletonGrid, EmptyState } from "../components/ui/States";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";
import { useToast } from "../components/ui/Toast";
import { formatData } from "../lib/status";
import { IconHeart, IconPlus, IconUsers, IconCheckCircle, IconInfo } from "../lib/icons";

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
  const [relatos, setRelatos] = useState<RelatoComunidade[]>(RELATOS_INICIAIS);
  const [categoria, setCategoria] = useState<CategoriaRelato | "todos">("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const filtrados = useMemo(() => {
    let list = relatos;
    if (categoria !== "todos") list = list.filter((r) => r.categoria === categoria);
    return [...list].sort((a, b) => (a.data < b.data ? 1 : -1));
  }, [relatos, categoria]);

  const loading = useSimulatedLoading(categoria);

  function handleApoiar(id: string) {
    setRelatos((prev) => prev.map((r) => (r.id === id ? { ...r, apoios: r.apoios + 1 } : r)));
  }

  function handleNovoRelato(novo: Omit<RelatoComunidade, "id" | "apoios" | "status" | "data">) {
    const relato: RelatoComunidade = {
      ...novo,
      id: `r-${Date.now()}`,
      apoios: 0,
      status: "pendente",
      data: new Date().toISOString().slice(0, 10),
    };
    setRelatos((prev) => [relato, ...prev]);
    setModalOpen(false);
    showToast("Relato enviado! Ele passará por verificação antes de ser destacado.");
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
            <h1 className="text-2xl font-extrabold text-[#17301c] sm:text-3xl">Comunidade</h1>
            <p className="text-[#3f5b45]">Relatos de moradores sobre a situação climática local.</p>
          </div>
        </div>
        <Button icon={<IconPlus className="size-4" />} onClick={() => setModalOpen(true)}>
          Fazer um relato
        </Button>
      </div>

      <div className="mb-6">
        <FilterChips label="Filtrar por tipo de relato" options={CATEGORIA_OPTIONS} selected={categoria} onChange={setCategoria} />
      </div>

      {loading ? (
        <CardSkeletonGrid count={4} />
      ) : filtrados.length === 0 ? (
        <EmptyState
          title="Nenhum relato encontrado"
          description="Ainda não há relatos para esse tipo. Que tal ser o primeiro a compartilhar?"
          action={
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Fazer um relato
            </Button>
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
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-[#5c7a62]">
                    {r.autor} · {formatData(r.data)}
                  </p>
                  <button
                    onClick={() => handleApoiar(r.id)}
                    className="flex items-center gap-1.5 rounded-full border border-[#c9dfcd] px-3 py-1.5 text-sm font-semibold text-[#3f5b45] hover:border-brand-400 hover:text-brand-700"
                  >
                    <IconHeart className="size-4" /> {r.apoios}
                  </button>
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
  onSubmit: (r: Omit<RelatoComunidade, "id" | "apoios" | "status" | "data">) => void;
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
