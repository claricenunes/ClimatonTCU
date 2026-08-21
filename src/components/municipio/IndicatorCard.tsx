import type { ReactNode } from "react";

interface IndicatorCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  helpText?: string;
  tone?: "neutral" | "warn";
}

export function IndicatorCard({ icon, label, value, helpText, tone = "neutral" }: IndicatorCardProps) {
  return (
    <div className="surface rounded-2xl border border-[#e0ede1] bg-white p-5">
      <div
        className={`mb-3 flex size-10 items-center justify-center rounded-xl ${
          tone === "warn" ? "bg-[#fbe4cf] text-[#a34a00]" : "bg-brand-50 text-brand-700"
        }`}
      >
        {icon}
      </div>
      <p className="text-sm font-medium text-[#3f5b45]">{label}</p>
      <p className="mt-0.5 text-2xl font-extrabold text-[#17301c]">{value}</p>
      {helpText && <p className="mt-1 text-xs text-[#5c7a62]">{helpText}</p>}
    </div>
  );
}
