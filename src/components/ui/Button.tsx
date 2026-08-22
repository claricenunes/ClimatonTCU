import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const VARIANTS: Record<string, string> = {
  primary: "bg-brand-600 text-white shadow-card hover:bg-brand-700 hover:shadow-card-hover active:bg-brand-800",
  secondary: "bg-ink-100 text-ink-900 hover:bg-ink-150 active:bg-ink-200",
  outline: "bg-white text-ink-800 border border-ink-200 hover:border-brand-400 hover:text-brand-700 active:bg-brand-50",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-50 hover:text-brand-700 active:bg-ink-100",
};

const SIZES: Record<string, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-base px-4 py-2.5 gap-2",
  lg: "text-lg px-6 py-3.5 gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition-all duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
