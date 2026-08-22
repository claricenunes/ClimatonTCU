interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Seções"
      className="flex gap-1 overflow-x-auto border-b border-[#d7e8da] [-webkit-mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]"
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              active
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-[#3f5b45] hover:text-brand-700"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
