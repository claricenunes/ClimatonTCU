export interface ChipOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string> {
  label: string;
  options: ChipOption<T>[];
  selected: T | "todos";
  onChange: (value: T | "todos") => void;
  allLabel?: string;
}

export function FilterChips<T extends string>({
  label,
  options,
  selected,
  onChange,
  allLabel = "Todos",
}: FilterChipsProps<T>) {
  return (
    <div>
      <span className="sr-only">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        <Chip active={selected === "todos"} onClick={() => onChange("todos")}>
          {allLabel}
        </Chip>
        {options.map((opt) => (
          <Chip key={opt.value} active={selected === opt.value} onClick={() => onChange(opt.value)}>
            {opt.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-brand-600 bg-brand-600 text-white shadow-card"
          : "border-ink-200 bg-white text-ink-700 hover:border-brand-400 hover:text-brand-700"
      }`}
    >
      {children}
    </button>
  );
}
