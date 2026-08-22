import { NIVEL_SEMAFORO_META } from "../../lib/avaliacaoClimatica";
import type { NivelSemaforo } from "../../types";

interface ScoreBarProps {
  pontuacao: number;
  nivel: NivelSemaforo;
  className?: string;
}

export function ScoreBar({ pontuacao, nivel, className = "" }: ScoreBarProps) {
  const pct = Math.round(pontuacao * 100);
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-ink-100 ${className}`}
      role="img"
      aria-label={`Pontuação: ${pct}%`}
    >
      <div className={`h-full rounded-full ${NIVEL_SEMAFORO_META[nivel].dot}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
