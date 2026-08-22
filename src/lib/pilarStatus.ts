import { hashString, mulberry32 } from "./seededRandom";
import { IconFaceHappy, IconFaceNeutral, IconFaceSad, type IconProps } from "./icons";

export type PilarStatusValue = "implementado" | "em_implementacao" | "inicial";

export interface PilarStatusMeta {
  label: string;
  icon: (props: IconProps) => React.ReactElement;
  text: string;
  bg: string;
  border: string;
}

export const PILAR_STATUS_META: Record<PilarStatusValue, PilarStatusMeta> = {
  implementado: {
    label: "Implementado",
    icon: IconFaceHappy,
    text: "text-status-normal",
    bg: "bg-status-normal-bg",
    border: "border-status-normal/25",
  },
  em_implementacao: {
    label: "Em implementação",
    icon: IconFaceNeutral,
    text: "text-status-atencao",
    bg: "bg-status-atencao-bg",
    border: "border-status-atencao/25",
  },
  inicial: {
    label: "Inicial",
    icon: IconFaceSad,
    text: "text-status-alerta",
    bg: "bg-status-alerta-bg",
    border: "border-status-alerta/25",
  },
};

/** Deterministic mock status per state + pillar — same state always shows
 * the same picture across reloads, without hand-authoring 15 x 27 values. */
export function getPilarStatus(uf: string, pilarId: number): PilarStatusValue {
  const random = mulberry32(hashString(`${uf}-pilar-${pilarId}`));
  const v = random();
  if (v < 0.3) return "implementado";
  if (v < 0.7) return "em_implementacao";
  return "inicial";
}
