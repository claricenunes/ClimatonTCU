import type { Municipio, StatusClimatico } from "../types";
import { getRegiaoById } from "../data/regioes";
import { getEstadoByUf } from "../data/estados";
import { IconCheckCircle, IconInfo, IconTriangleAlert, IconOctagonAlert, type IconProps } from "./icons";

export interface StatusStyle {
  label: string;
  icon: (props: IconProps) => React.ReactElement;
  text: string;
  bg: string;
  border: string;
  dot: string;
}

export const STATUS_STYLES: Record<StatusClimatico, StatusStyle> = {
  normal: {
    label: "Normal",
    icon: IconCheckCircle,
    text: "text-[#1f7a3d]",
    bg: "bg-[#e5f5e8]",
    border: "border-[#bfe3c6]",
    dot: "bg-[#1f7a3d]",
  },
  atencao: {
    label: "Atenção",
    icon: IconInfo,
    text: "text-[#8a6400]",
    bg: "bg-[#fbf0d0]",
    border: "border-[#f0dfa0]",
    dot: "bg-[#8a6400]",
  },
  alerta: {
    label: "Alerta",
    icon: IconTriangleAlert,
    text: "text-[#a34a00]",
    bg: "bg-[#fbe4cf]",
    border: "border-[#f0c39a]",
    dot: "bg-[#a34a00]",
  },
  emergencia: {
    label: "Emergência",
    icon: IconOctagonAlert,
    text: "text-[#a3241f]",
    bg: "bg-[#fbdad8]",
    border: "border-[#f0a9a5]",
    dot: "bg-[#a3241f]",
  },
};

export function formatPopulacao(n: number): string {
  return n.toLocaleString("pt-BR");
}

export function formatData(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export function formatDataCurta(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/** Região (Bahia's territórios de identidade) when available, otherwise the state name. */
export function getMunicipioLocalLabel(municipio: Municipio): string {
  const regiao = municipio.regiaoId ? getRegiaoById(municipio.regiaoId) : undefined;
  if (regiao) return regiao.nome;
  return getEstadoByUf(municipio.estadoUf)?.nome ?? municipio.estadoUf;
}
