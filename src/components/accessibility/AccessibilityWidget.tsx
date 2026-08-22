import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
import { IconContrast, IconType, IconX } from "../../lib/icons";

const STORAGE_KEY = "climaqui:a11y-widget-position";
const BUTTON_SIZE = 56;
const DRAG_THRESHOLD = 6;
const MARGIN = 8;
const PANEL_HALF_HEIGHT = 150;

interface Point {
  x: number;
  y: number;
}

function clamp(pos: Point): Point {
  const maxX = window.innerWidth - BUTTON_SIZE - MARGIN;
  const maxY = window.innerHeight - PANEL_HALF_HEIGHT;
  return {
    x: Math.min(Math.max(pos.x, MARGIN), Math.max(maxX, MARGIN)),
    y: Math.min(Math.max(pos.y, PANEL_HALF_HEIGHT), Math.max(maxY, PANEL_HALF_HEIGHT)),
  };
}

function readStoredPosition(): Point | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.x === "number" && typeof parsed?.y === "number") return parsed;
  } catch {
    // ignore malformed/inaccessible storage
  }
  return null;
}

export function AccessibilityWidget() {
  const { increaseFont, decreaseFont, canIncrease, canDecrease, fontScaleLabel, highContrast, toggleContrast } =
    useAccessibility();
  const [open, setOpen] = useState(false);
  // Starts near the bottom-left corner (mirroring the AI widget's bottom-right corner)
  // instead of vertical-center, so it doesn't land on top of hero/header content on
  // first load — it still remembers wherever the user drags it to.
  const [position, setPosition] = useState<Point>(() => ({
    x: MARGIN + 8,
    y: window.innerHeight - PANEL_HALF_HEIGHT - 24,
  }));
  const [dragging, setDragging] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startPointer: Point; startPos: Point; moved: boolean } | null>(null);

  useEffect(() => {
    const stored = readStoredPosition();
    if (stored) setPosition(clamp(stored));
  }, []);

  useEffect(() => {
    const onResize = () => setPosition((p) => clamp(p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>("button");
    firstFocusable?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== undefined && e.button !== 0) return;
    dragState.current = { startPointer: { x: e.clientX, y: e.clientY }, startPos: position, moved: false };
    toggleRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const state = dragState.current;
    if (!state) return;
    const dx = e.clientX - state.startPointer.x;
    const dy = e.clientY - state.startPointer.y;
    if (!state.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) state.moved = true;
    if (state.moved) {
      setPosition(clamp({ x: state.startPos.x + dx, y: state.startPos.y + dy }));
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    const state = dragState.current;
    toggleRef.current?.releasePointerCapture(e.pointerId);
    setDragging(false);
    if (state?.moved) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      } catch {
        // ignore storage errors (e.g. private browsing)
      }
    } else {
      setOpen((v) => !v);
    }
    dragState.current = null;
  }

  const openLeft = position.x > window.innerWidth / 2;

  return (
    <div
      className="fixed z-40"
      style={{ left: position.x, top: position.y, transform: "translateY(-50%)", touchAction: "none" }}
    >
      <button
        ref={toggleRef}
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        aria-expanded={open}
        aria-label={open ? "Fechar opções de acessibilidade. Arraste para mover." : "Abrir opções de acessibilidade. Arraste para mover."}
        className={`flex size-14 items-center justify-center rounded-full border-[3px] border-brand-600 bg-white text-brand-700 shadow-elevated transition-transform ${
          dragging ? "scale-105 cursor-grabbing" : "cursor-grab hover:scale-105 active:scale-95"
        }`}
      >
        <IconContrast className="size-6" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Opções de acessibilidade"
          className={`absolute top-1/2 w-[256px] max-w-[calc(100vw_-_32px)] -translate-y-1/2 animate-scale-in overflow-hidden rounded-2xl bg-white shadow-elevated ${
            openLeft ? "right-full mr-3" : "left-full ml-3"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
            <p className="text-sm font-bold text-ink-900">Acessibilidade</p>
            <button
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Fechar"
              className="flex size-7 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-800"
            >
              <IconX className="size-4" />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <button
              onClick={toggleContrast}
              aria-pressed={highContrast}
              className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                highContrast
                  ? "border-brand-600 bg-brand-50 text-brand-800"
                  : "border-ink-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50"
              }`}
            >
              <IconContrast className="size-4 shrink-0" />
              Alto contraste{highContrast ? ": ativado" : ""}
            </button>

            <div>
              <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink-700">
                <IconType className="size-4 shrink-0" />
                Tamanho do texto
                <span className="sr-only" aria-live="polite">
                  {fontScaleLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFont}
                  disabled={!canDecrease}
                  aria-label="Diminuir tamanho do texto"
                  className="flex-1 rounded-lg border border-ink-200 py-2 text-base font-bold text-ink-700 hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  A-
                </button>
                <button
                  onClick={increaseFont}
                  disabled={!canIncrease}
                  aria-label="Aumentar tamanho do texto"
                  className="flex-1 rounded-lg border border-ink-200 py-2 text-base font-bold text-ink-700 hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  A+
                </button>
              </div>
              <p className="mt-1.5 text-xs text-ink-500">{fontScaleLabel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
