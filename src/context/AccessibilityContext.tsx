import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const FONT_SCALES = [0.9, 1, 1.15, 1.3] as const;
const FONT_LABELS = ["Pequeno", "Padrão", "Grande", "Extra grande"];
const STORAGE_KEY_SCALE = "situamap:font-scale-index";
const STORAGE_KEY_CONTRAST = "situamap:high-contrast";

interface AccessibilityContextValue {
  fontScaleIndex: number;
  fontScaleLabel: string;
  increaseFont: () => void;
  decreaseFont: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
  highContrast: boolean;
  toggleContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function readInitialScaleIndex(): number {
  if (typeof window === "undefined") return 1;
  const stored = window.localStorage.getItem(STORAGE_KEY_SCALE);
  const parsed = stored ? Number.parseInt(stored, 10) : 1;
  return Number.isFinite(parsed) && parsed >= 0 && parsed < FONT_SCALES.length ? parsed : 1;
}

function readInitialContrast(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY_CONTRAST) === "true";
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontScaleIndex, setFontScaleIndex] = useState(readInitialScaleIndex);
  const [highContrast, setHighContrast] = useState(readInitialContrast);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(FONT_SCALES[fontScaleIndex]));
    window.localStorage.setItem(STORAGE_KEY_SCALE, String(fontScaleIndex));
  }, [fontScaleIndex]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute("data-contrast", "high");
    } else {
      document.documentElement.removeAttribute("data-contrast");
    }
    window.localStorage.setItem(STORAGE_KEY_CONTRAST, String(highContrast));
  }, [highContrast]);

  const value: AccessibilityContextValue = {
    fontScaleIndex,
    fontScaleLabel: FONT_LABELS[fontScaleIndex],
    increaseFont: () => setFontScaleIndex((i) => Math.min(i + 1, FONT_SCALES.length - 1)),
    decreaseFont: () => setFontScaleIndex((i) => Math.max(i - 1, 0)),
    canIncrease: fontScaleIndex < FONT_SCALES.length - 1,
    canDecrease: fontScaleIndex > 0,
    highContrast,
    toggleContrast: () => setHighContrast((v) => !v),
  };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility deve ser usado dentro de AccessibilityProvider");
  return ctx;
}
