import { useMemo } from "react";
import type { StatusClimatico } from "../types";
import { MUNICIPIOS, getMunicipiosByEstado } from "../data/municipios";
import { ESTADOS } from "../data/estados";

const SEVERITY: Record<StatusClimatico, number> = {
  normal: 0,
  atencao: 1,
  alerta: 2,
  emergencia: 3,
};

export interface EstadoSummary {
  uf: string;
  status: StatusClimatico;
  counts: Record<StatusClimatico, number>;
  total: number;
}

function summarize(municipios: { status: StatusClimatico }[]): Omit<EstadoSummary, "uf"> {
  const counts: Record<StatusClimatico, number> = { normal: 0, atencao: 0, alerta: 0, emergencia: 0 };
  let worst: StatusClimatico = "normal";
  for (const m of municipios) {
    counts[m.status]++;
    if (SEVERITY[m.status] > SEVERITY[worst]) worst = m.status;
  }
  return { status: municipios.length > 0 ? worst : "normal", counts, total: municipios.length };
}

export function useEstadoStatus(): Record<string, EstadoSummary> {
  return useMemo(() => {
    const result: Record<string, EstadoSummary> = {};
    for (const estado of ESTADOS) {
      result[estado.uf] = { uf: estado.uf, ...summarize(getMunicipiosByEstado(estado.uf)) };
    }
    return result;
  }, []);
}

export function useNacionalSummary(): Omit<EstadoSummary, "uf"> {
  return useMemo(() => summarize(MUNICIPIOS), []);
}
