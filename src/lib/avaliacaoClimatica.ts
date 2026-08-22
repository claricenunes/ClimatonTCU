import { COMPONENTE_LABEL } from "../data/avaliacaoClimatica";
import { COMPARATIVO_BA_MG } from "../data/comparativoEstados";
import type { EixoAvaliacaoClimatica, EstagioAvaliacaoClimatica, ItemAvaliacaoClimatica, NivelSemaforo } from "../types";
import {
  IconCheckCircle,
  IconFaceHappy,
  IconFaceNeutral,
  IconFaceSad,
  IconInfo,
  IconOctagonAlert,
  IconTriangleAlert,
  type IconProps,
} from "./icons";

export interface NivelMeta {
  label: string;
  icon: (props: IconProps) => React.ReactElement;
  text: string;
  bg: string;
  border: string;
  dot: string;
}

export const NIVEL_SEMAFORO_META: Record<NivelSemaforo, NivelMeta> = {
  verde: {
    label: "Avançado",
    icon: IconFaceHappy,
    text: "text-status-normal",
    bg: "bg-status-normal-bg",
    border: "border-status-normal/25",
    dot: "bg-status-normal",
  },
  amarelo: {
    label: "Intermediário",
    icon: IconFaceNeutral,
    text: "text-status-atencao",
    bg: "bg-status-atencao-bg",
    border: "border-status-atencao/25",
    dot: "bg-status-atencao",
  },
  vermelho: {
    label: "Inicial / sem progresso",
    icon: IconFaceSad,
    text: "text-status-emergencia",
    bg: "bg-status-emergencia-bg",
    border: "border-status-emergencia/25",
    dot: "bg-status-emergencia",
  },
};

export function nivelFromPontuacao(pontuacao: number): NivelSemaforo {
  if (pontuacao >= 0.75) return "verde";
  if (pontuacao >= 0.4) return "amarelo";
  return "vermelho";
}

export const ORDEM_ESTAGIOS: EstagioAvaliacaoClimatica[] = [
  "Sem progresso",
  "Estágio inicial",
  "Estágio intermediário",
  "Estágio avançado",
];

/** Estilo de cada estágio de auditoria, na mesma paleta de status (verde/amarelo/
 * laranja/vermelho) já usada para o risco climático dos municípios — mesma cor,
 * mesmo significado ("nível de atenção"), em outro domínio. */
export const ESTAGIO_META: Record<EstagioAvaliacaoClimatica, NivelMeta> = {
  "Sem progresso": {
    label: "Sem progresso",
    icon: IconOctagonAlert,
    text: "text-status-emergencia",
    bg: "bg-status-emergencia-bg",
    border: "border-status-emergencia/25",
    dot: "bg-status-emergencia",
  },
  "Estágio inicial": {
    label: "Estágio inicial",
    icon: IconTriangleAlert,
    text: "text-status-alerta",
    bg: "bg-status-alerta-bg",
    border: "border-status-alerta/25",
    dot: "bg-status-alerta",
  },
  "Estágio intermediário": {
    label: "Estágio intermediário",
    icon: IconInfo,
    text: "text-status-atencao",
    bg: "bg-status-atencao-bg",
    border: "border-status-atencao/25",
    dot: "bg-status-atencao",
  },
  "Estágio avançado": {
    label: "Estágio avançado",
    icon: IconCheckCircle,
    text: "text-status-normal",
    bg: "bg-status-normal-bg",
    border: "border-status-normal/25",
    dot: "bg-status-normal",
  },
};

export function contarPorEstagio(itens: ItemAvaliacaoClimatica[]): { estagio: EstagioAvaliacaoClimatica; count: number }[] {
  return ORDEM_ESTAGIOS.map((estagio) => ({
    estagio,
    count: itens.filter((i) => i.estagio === estagio).length,
  }));
}

export function pontuacaoGeral(itens: ItemAvaliacaoClimatica[]): number {
  return media(itens);
}

export interface ComponenteAgregado {
  componente: string;
  label: string;
  pontuacaoMedia: number;
  nivel: NivelSemaforo;
  itens: ItemAvaliacaoClimatica[];
}

export interface EixoAgregado {
  eixo: EixoAvaliacaoClimatica;
  pontuacaoMedia: number;
  nivel: NivelSemaforo;
  componentes: ComponenteAgregado[];
}

export type { EixoAvaliacaoClimatica };

function media(itens: ItemAvaliacaoClimatica[]): number {
  return itens.reduce((soma, i) => soma + i.pontuacao, 0) / itens.length;
}

const ORDEM_EIXOS: EixoAvaliacaoClimatica[] = ["Políticas públicas", "Financiamento", "Governança"];

export function agruparAvaliacaoPorEixo(itens: ItemAvaliacaoClimatica[]): EixoAgregado[] {
  const eixos = new Map<EixoAvaliacaoClimatica, ItemAvaliacaoClimatica[]>();
  for (const item of itens) {
    const lista = eixos.get(item.eixo) ?? [];
    lista.push(item);
    eixos.set(item.eixo, lista);
  }

  return ORDEM_EIXOS.filter((eixo) => eixos.has(eixo)).map((eixo) => {
    const itensDoEixo = eixos.get(eixo)!;
    const componentesMap = new Map<string, ItemAvaliacaoClimatica[]>();
    for (const item of itensDoEixo) {
      const lista = componentesMap.get(item.componente) ?? [];
      lista.push(item);
      componentesMap.set(item.componente, lista);
    }

    const componentes: ComponenteAgregado[] = Array.from(componentesMap.entries())
      .map(([componente, itensDoComponente]) => {
        const pontuacaoMedia = media(itensDoComponente);
        return {
          componente,
          label: COMPONENTE_LABEL[componente] ?? componente,
          pontuacaoMedia,
          nivel: nivelFromPontuacao(pontuacaoMedia),
          itens: itensDoComponente,
        };
      })
      .sort((a, b) => a.componente.localeCompare(b.componente));

    const pontuacaoMedia = media(itensDoEixo);
    return {
      eixo,
      pontuacaoMedia,
      nivel: nivelFromPontuacao(pontuacaoMedia),
      componentes,
    };
  });
}

export interface GapIndicadorEstados {
  componente: string;
  label: string;
  pontuacaoBa: number;
  pontuacaoMg: number;
  gap: number;
  porque?: string;
}

/** Retorna os `quantidade` componentes em que a Bahia mais está atrás de Minas Gerais
 * (maior gap de pontuação), ordenados do maior para o menor gap. */
export function pioresGapsBaVsMg(quantidade: number): GapIndicadorEstados[] {
  return COMPARATIVO_BA_MG.map((c) => ({
    componente: c.componente,
    label: COMPONENTE_LABEL[c.componente] ?? c.componente,
    pontuacaoBa: c.pontuacaoBa,
    pontuacaoMg: c.pontuacaoMg,
    gap: c.pontuacaoMg - c.pontuacaoBa,
    porque: c.porque,
  }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, quantidade);
}
