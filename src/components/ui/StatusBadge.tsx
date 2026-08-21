import type { StatusClimatico } from "../../types";
import { STATUS_STYLES } from "../../lib/status";

interface StatusBadgeProps {
  status: StatusClimatico;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const s = STATUS_STYLES[status];
  const Icon = s.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${padding} ${s.bg} ${s.text} ${s.border}`}
    >
      <Icon className={iconSize} />
      {s.label}
    </span>
  );
}

export function StatusDot({ status }: { status: StatusClimatico }) {
  const s = STATUS_STYLES[status];
  return <span className={`inline-block size-2.5 rounded-full ${s.dot}`} aria-hidden="true" />;
}
