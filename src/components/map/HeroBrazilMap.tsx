import { ESTADOS, BRASIL_MAP_PATHS, BRASIL_MAP_VIEWBOX } from "../../data/estados";

/**
 * Purely decorative Brazil silhouette for the Hero, reusing the same real
 * state geometry as the interactive map further down the page. No status
 * colors, no interaction — the functional, clickable map lives in the
 * "Mapa do Brasil" section below and is untouched by this component.
 */
export function HeroBrazilMap() {
  return (
    <svg
      viewBox={BRASIL_MAP_VIEWBOX}
      role="img"
      aria-label="Ilustração do mapa do Brasil"
      className="mx-auto h-auto w-full max-w-md sm:max-w-xl md:max-w-2xl"
    >
      {ESTADOS.map((estado) => (
        <path
          key={estado.uf}
          d={BRASIL_MAP_PATHS[estado.uf]}
          fill="#2a9d4f"
          stroke="#ffffff"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
