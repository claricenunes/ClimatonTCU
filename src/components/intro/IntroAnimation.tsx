import { useEffect, useRef, useState } from "react";
import logo from "../../icons/logo.png";

const SESSION_KEY = "situamap:intro-seen";
const HOLD_MS = 3400;
const EXIT_MS = 500;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
}

export function IntroAnimation() {
  const [phase, setPhase] = useState<"hidden" | "playing" | "leaving">(() =>
    alreadySeen() || prefersReducedMotion() ? "hidden" : "playing",
  );
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase !== "playing") return;
    skipButtonRef.current?.focus();
    const holdTimer = setTimeout(() => setPhase("leaving"), HOLD_MS);
    return () => clearTimeout(holdTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    markSeen();
    const exitTimer = setTimeout(() => setPhase("hidden"), EXIT_MS);
    return () => clearTimeout(exitTimer);
  }, [phase]);

  useEffect(() => {
    if (phase === "hidden") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("leaving");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bem-vindo ao SituaMap"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-6 text-center transition-opacity duration-500 ${
        phase === "leaving" ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => setPhase("leaving")}
    >
      <img
        src={logo}
        alt=""
        className="size-28 animate-scale-in sm:size-36"
        style={{ animationDelay: "0ms", animationFillMode: "both" }}
      />
      <p
        className="mt-8 max-w-xl animate-fade-in font-heading text-2xl font-extrabold leading-snug text-white sm:text-4xl"
        style={{ animationDelay: "500ms", animationFillMode: "both" }}
      >
        Mudança climática não é só sobre temperatura
      </p>
      <p
        className="mt-4 animate-fade-in text-base font-medium text-brand-100 sm:text-lg"
        style={{ animationDelay: "1000ms", animationFillMode: "both" }}
      >
        Descubra como está sua região
      </p>

      <button
        ref={skipButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPhase("leaving");
        }}
        className="absolute bottom-8 rounded-lg px-4 py-2 text-sm font-semibold text-brand-100 underline decoration-brand-300 underline-offset-4 hover:text-white"
      >
        Pular introdução
      </button>
    </div>
  );
}
