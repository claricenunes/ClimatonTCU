import { Link } from "react-router-dom";
import type { Municipio } from "../../types";
import { StatusBadge } from "../ui/StatusBadge";
import { formatPopulacao, getMunicipioLocalLabel } from "../../lib/status";
import { IconChevronRight, IconMapPin } from "../../lib/icons";

export function MunicipioCard({ municipio }: { municipio: Municipio }) {
  return (
    <Link
      to={`/municipio/${municipio.id}`}
      className="surface group flex flex-col rounded-2xl border border-[#e0ede1] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-[#17301c] group-hover:text-brand-700">{municipio.nome}</h3>
        <span className="flex items-center gap-1.5">
          <span className="rounded-full bg-[#f0f4e8] px-2 py-0.5 text-xs font-bold text-[#4a5d2e]">
            {municipio.estadoUf}
          </span>
          <IconChevronRight className="size-5 shrink-0 text-[#8ba690] transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
        </span>
      </div>
      <p className="mb-3 flex items-center gap-1.5 text-sm text-[#3f5b45]">
        <IconMapPin className="size-4 shrink-0" />
        {getMunicipioLocalLabel(municipio)} · {formatPopulacao(municipio.populacao)} habitantes
      </p>
      <p className="mb-4 line-clamp-2 flex-1 text-sm text-[#3f5b45]">{municipio.resumo}</p>
      <StatusBadge status={municipio.status} size="sm" />
    </Link>
  );
}
