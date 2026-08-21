import { useAccessibility } from "../../context/AccessibilityContext";
import { IconContrast, IconType } from "../../lib/icons";

export function AccessibilityBar() {
  const { increaseFont, decreaseFont, canIncrease, canDecrease, fontScaleLabel, highContrast, toggleContrast } =
    useAccessibility();

  return (
    <div className="bg-[#0e1f12] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-1.5 px-4 py-2 text-xs sm:px-6">
        <button
          onClick={toggleContrast}
          aria-pressed={highContrast}
          className="flex items-center gap-1.5 rounded px-1.5 py-1 font-medium hover:bg-white/10"
        >
          <IconContrast className="size-4" />
          Alto contraste{highContrast ? ": ativado" : ""}
        </button>
        <div className="flex items-center gap-1.5">
          <IconType className="size-4" />
          <span className="font-medium">Tamanho do texto</span>
          <span className="sr-only" aria-live="polite">
            {fontScaleLabel}
          </span>
          <button
            onClick={decreaseFont}
            disabled={!canDecrease}
            aria-label="Diminuir tamanho do texto"
            className="rounded px-2 py-0.5 font-bold hover:bg-white/10 disabled:opacity-40"
          >
            A-
          </button>
          <button
            onClick={increaseFont}
            disabled={!canIncrease}
            aria-label="Aumentar tamanho do texto"
            className="rounded px-2 py-0.5 font-bold hover:bg-white/10 disabled:opacity-40"
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
}
