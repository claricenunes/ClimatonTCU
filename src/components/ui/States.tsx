import type { ReactNode } from "react";
import { IconInfo, IconTriangleAlert } from "../../lib/icons";
import { Button } from "./Button";

export function CardSkeleton() {
  return (
    <div className="surface animate-pulse rounded-xl border border-ink-150 bg-white p-5 shadow-card">
      <div className="mb-3 h-4 w-2/3 rounded bg-ink-100" />
      <div className="mb-2 h-3 w-full rounded bg-ink-100" />
      <div className="mb-4 h-3 w-4/5 rounded bg-ink-100" />
      <div className="h-6 w-24 rounded-full bg-ink-100" />
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-ink-200 bg-ink-50 px-6 py-14 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
        <IconInfo className="size-7" />
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-ink-900">{title}</h3>
      <p className="max-w-sm text-ink-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ description, onRetry }: { description: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-status-alerta/25 bg-status-alerta-bg px-6 py-14 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-white text-status-alerta">
        <IconTriangleAlert className="size-7" />
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-ink-900">Não foi possível carregar os dados</h3>
      <p className="max-w-sm text-ink-600">{description}</p>
      <div className="mt-5">
        <Button variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
