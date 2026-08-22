import { PILARES } from "../../data/pilares";
import { getPilarStatus, PILAR_STATUS_META } from "../../lib/pilarStatus";

export function PilaresGrid({ uf }: { uf: string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {PILARES.map((pilar) => {
        const status = getPilarStatus(uf, pilar.id);
        const meta = PILAR_STATUS_META[status];
        const Icon = meta.icon;
        return (
          <li
            key={pilar.id}
            className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center ${meta.bg} ${meta.border}`}
          >
            <span className="text-xs font-bold text-ink-500">{pilar.id}</span>
            <p className="min-h-9 text-sm font-bold leading-tight text-ink-900">{pilar.titulo}</p>
            <span className={`flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold ${meta.text}`}>
              <Icon className="size-4 shrink-0" />
              {meta.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
