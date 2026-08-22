import type { NivelConfiabilidade } from "../types";
import { IconCheckCircle, IconInfo, IconTriangleAlert, type IconProps } from "./icons";

export interface ConfiabilidadeMeta {
  label: string;
  descricao: string;
  icon: (props: IconProps) => React.ReactElement;
  text: string;
  bg: string;
}

export const CONFIABILIDADE_META: Record<NivelConfiabilidade, ConfiabilidadeMeta> = {
  confiavel: {
    label: "Autor confiável",
    descricao: "Histórico de relatos consistentes e confirmados pela comunidade.",
    icon: IconCheckCircle,
    text: "text-status-normal",
    bg: "bg-status-normal-bg",
  },
  novo: {
    label: "Novo colaborador",
    descricao: "Primeiro relato desta pessoa — ainda sem histórico de verificação.",
    icon: IconInfo,
    text: "text-status-atencao",
    bg: "bg-status-atencao-bg",
  },
  baixa_confianca: {
    label: "Confiabilidade baixa",
    descricao: "Relatos anteriores deste autor foram contestados ou não confirmados. Leia com atenção.",
    icon: IconTriangleAlert,
    text: "text-status-alerta",
    bg: "bg-status-alerta-bg",
  },
};
