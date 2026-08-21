import { Link } from "react-router-dom";
import { IconChevronRight } from "../../lib/icons";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[#3f5b45]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <IconChevronRight className="size-3.5 text-[#8ba690]" />}
              {item.to && !isLast ? (
                <Link to={item.to} className="rounded px-1 py-0.5 font-medium hover:text-brand-700 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "px-1 py-0.5 font-semibold text-[#17301c]" : "px-1 py-0.5"} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
