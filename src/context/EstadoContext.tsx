import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "situamap:estado-selecionado";

interface EstadoContextValue {
  uf: string | null;
  setUf: (uf: string) => void;
  clearUf: () => void;
}

const EstadoContext = createContext<EstadoContextValue | null>(null);

function readInitialUf(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function EstadoProvider({ children }: { children: ReactNode }) {
  const [uf, setUfState] = useState<string | null>(readInitialUf);

  useEffect(() => {
    try {
      if (uf) window.localStorage.setItem(STORAGE_KEY, uf);
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [uf]);

  const value: EstadoContextValue = {
    uf,
    setUf: setUfState,
    clearUf: () => setUfState(null),
  };

  return <EstadoContext.Provider value={value}>{children}</EstadoContext.Provider>;
}

export function useEstado(): EstadoContextValue {
  const ctx = useContext(EstadoContext);
  if (!ctx) throw new Error("useEstado deve ser usado dentro de EstadoProvider");
  return ctx;
}
