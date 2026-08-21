import type { StatusClimatico } from "../../types";
import { STATUS_INFO } from "../../types";
import { STATUS_STYLES } from "../../lib/status";

const ORDER: StatusClimatico[] = ["normal", "atencao", "alerta", "emergencia"];

export function MapLegend() {
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {ORDER.map((status) => {
        const style = STATUS_STYLES[status];
        const Icon = style.icon;
        return (
          <li key={status} className={`flex items-start gap-2.5 rounded-lg border p-2.5 ${style.bg} ${style.border}`}>
            <Icon className={`size-5 shrink-0 ${style.text}`} />
            <div>
              <p className={`text-sm font-bold ${style.text}`}>{STATUS_INFO[status].label}</p>
              <p className="text-xs text-[#3f5b45]">{STATUS_INFO[status].description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
