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
    text: "text-status-normal",
    bg: "bg-status-normal-bg",
    border: "border-status-normal/25",
    dot: "bg-status-normal",
  },
  atencao: {
    label: "Atenção",
    icon: IconInfo,
    text: "text-status-atencao",
    bg: "bg-status-atencao-bg",
    border: "border-status-atencao/25",
    dot: "bg-status-atencao",
  },
  alerta: {
    label: "Alerta",
    icon: IconTriangleAlert,
    text: "text-status-alerta",
    bg: "bg-status-alerta-bg",
    border: "border-status-alerta/25",
    dot: "bg-status-alerta",
  },
  emergencia: {
    label: "Emergência",
    icon: IconOctagonAlert,
    text: "text-status-emergencia",
    bg: "bg-status-emergencia-bg",
    border: "border-status-emergencia/25",
    dot: "bg-status-emergencia",
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
