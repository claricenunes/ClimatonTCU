import type { ReactNode } from "react";
import { IconInfo, IconTriangleAlert } from "../../lib/icons";
import { Button } from "./Button";

export function CardSkeleton() {
  return (
    <div className="surface animate-pulse rounded-2xl border border-[#e0ede1] bg-white p-5">
      <div className="mb-3 h-4 w-2/3 rounded bg-[#e5f0e6]" />
      <div className="mb-2 h-3 w-full rounded bg-[#eef5ef]" />
      <div className="mb-4 h-3 w-4/5 rounded bg-[#eef5ef]" />
      <div className="h-6 w-24 rounded-full bg-[#eef5ef]" />
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
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfe2d2] bg-[#f6fbf6] px-6 py-14 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
        <IconInfo className="size-7" />
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-[#17301c]">{title}</h3>
      <p className="max-w-sm text-[#3f5b45]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ description, onRetry }: { description: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#f0c39a] bg-[#fff6ee] px-6 py-14 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#fbe4cf] text-[#a34a00]">
        <IconTriangleAlert className="size-7" />
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-[#17301c]">Não foi possível carregar os dados</h3>
      <p className="max-w-sm text-[#3f5b45]">{description}</p>
      <div className="mt-5">
        <Button variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
