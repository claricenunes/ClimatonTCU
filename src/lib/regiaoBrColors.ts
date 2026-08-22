import type { RegiaoBR } from "../types";

export interface RegiaoColorSet {
  /** SVG fill for the map. */
  solid: string;
  /** SVG fill on hover/focus. */
  hover: string;
  /** Tailwind classes for legend chips (light wash + dark saturated text). */
  chipClass: string;
}

export const REGIAO_BR_COLORS: Record<RegiaoBR, RegiaoColorSet> = {
  Norte: {
    solid: "#2967ae",
    hover: "#1d497c",
    chipClass: "bg-regiao-norte-bg text-regiao-norte-text",
  },
  Nordeste: {
    solid: "#d3a122",
    hover: "#9e781a",
    chipClass: "bg-regiao-nordeste-bg text-regiao-nordeste-text",
  },
  "Centro-Oeste": {
    solid: "#278670",
    hover: "#195749",
    chipClass: "bg-regiao-centro-oeste-bg text-regiao-centro-oeste-text",
  },
  Sudeste: {
    solid: "#ce5927",
    hover: "#9a431d",
    chipClass: "bg-regiao-sudeste-bg text-regiao-sudeste-text",
  },
  Sul: {
    solid: "#bc2f50",
    hover: "#8b233b",
    chipClass: "bg-regiao-sul-bg text-regiao-sul-text",
  },
};

export const REGIOES_BR_UFS: Record<RegiaoBR, string[]> = {
  Norte: ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
  Nordeste: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
  "Centro-Oeste": ["DF", "GO", "MT", "MS"],
  Sudeste: ["ES", "MG", "RJ", "SP"],
  Sul: ["PR", "RS", "SC"],
};
