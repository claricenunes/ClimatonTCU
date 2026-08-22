import { Link } from "react-router-dom";
import type { Municipio } from "../../types";
import { StatusBadge } from "../ui/StatusBadge";
import { formatPopulacao, getMunicipioLocalLabel } from "../../lib/status";
import { IconChevronRight, IconMapPin } from "../../lib/icons";

export function MunicipioCard({ municipio }: { municipio: Municipio }) {
  return (
    <Link
      to={`/municipio/${municipio.id}`}
      className="surface group relative flex flex-col overflow-hidden rounded-xl border border-ink-150 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-500 transition-transform duration-200 group-hover:scale-x-100"
      />
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-ink-900 group-hover:text-brand-700">{municipio.nome}</h3>
        <span className="flex items-center gap-1.5">
          <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-600">
            {municipio.estadoUf}
          </span>
          <IconChevronRight className="size-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
        </span>
      </div>
      <p className="mb-3 flex items-center gap-1.5 text-sm text-ink-600">
        <IconMapPin className="size-4 shrink-0" />
        {getMunicipioLocalLabel(municipio)} · {formatPopulacao(municipio.populacao)} habitantes
      </p>
      <p className="mb-4 line-clamp-2 flex-1 text-sm text-ink-600">{municipio.resumo}</p>
      <StatusBadge status={municipio.status} size="sm" />
    </Link>
  );
}
