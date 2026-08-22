export type StatusClimatico = "normal" | "atencao" | "alerta" | "emergencia";

export interface StatusInfo {
  value: StatusClimatico;
  label: string;
  description: string;
}

export const STATUS_INFO: Record<StatusClimatico, StatusInfo> = {
  normal: {
    value: "normal",
    label: "Normal",
    description: "Indicadores dentro da média esperada",
  },
  atencao: {
    value: "atencao",
    label: "Atenção",
    description: "Indicadores fora da média, monitoramento reforçado",
  },
  alerta: {
    value: "alerta",
    label: "Alerta",
    description: "Risco elevado, ação preventiva recomendada",
  },
  emergencia: {
    value: "emergencia",
    label: "Emergência",
    description: "Situação crítica, resposta imediata necessária",
  },
};

export interface Regiao {
  id: string;
  nome: string;
  descricao: string;
  /** Approximate polygon points for the SVG map, in the 0-600 x 0-720 viewBox */
  path: string;
  /** point used for label / tooltip anchor */
  labelPoint: [number, number];
}

export type TipoAlerta = "seca" | "chuva_intensa" | "temperatura" | "queimada" | "abastecimento";

export interface Alerta {
  id: string;
  municipioId: string;
  tipo: TipoAlerta;
  nivel: StatusClimatico;
  titulo: string;
  descricao: string;
  data: string; // ISO date
}

export interface Indicadores {
  temperaturaMedia: number; // celsius
  chuvaUltimos30Dias: number; // mm
  chuvaMediaHistorica: number; // mm
  indiceSeca: number; // 0-100
  risco: "baixo" | "medio" | "alto" | "muito_alto";
}

export interface Municipio {
  id: string;
  nome: string;
  estadoUf: string;
  /** Only set for states with sub-regional breakdown (currently Bahia). */
  regiaoId?: string;
  populacao: number;
  status: StatusClimatico;
  indicadores: Indicadores;
  atualizadoEm: string; // ISO date
  resumo: string;
}

export type RegiaoBR = "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";

export interface Estado {
  uf: string;
  nome: string;
  regiao: RegiaoBR;
  capital: string;
}

export type CategoriaNoticia = "seca" | "chuvas" | "politica_publica" | "meio_ambiente" | "prevencao";

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string[];
  categoria: CategoriaNoticia;
  data: string;
  municipioId?: string;
  /** UF this news item is about, when the demo has state-scoped content. */
  estadoUf?: string;
  fonte: string;
  tempoLeituraMin: number;
}

export type CategoriaRelato = "falta_agua" | "alagamento" | "vegetacao" | "calor_extremo" | "outro";
export type StatusRelato = "pendente" | "verificado";

/** Trust level of the author, so readers can weigh a report knowing the
 * person's track record — protects against repeated false information. */
export type NivelConfiabilidade = "confiavel" | "novo" | "baixa_confianca";

export interface RelatoComunidade {
  id: string;
  autor: string;
  municipioId: string;
  categoria: CategoriaRelato;
  titulo: string;
  descricao: string;
  data: string;
  apoios: number;
  status: StatusRelato;
  autorConfiabilidade: NivelConfiabilidade;
}

export type CategoriaEducacao = "mudancas_climaticas" | "riscos_impactos" | "mitigacao" | "adaptacao" | "recursos";

export type NivelEducacao = "comece_por_aqui" | "aprofunde" | "voce_pode_fazer";

export interface ConteudoEducativo {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string[];
  categoria: CategoriaEducacao;
  nivel: NivelEducacao;
  tempoLeituraMin: number;
  /** UF this content is scoped to; omitted means it's shown regardless of the selected state. */
  estadoUf?: string;
}

export interface Organizacao {
  id: string;
  nome: string;
  missao: string;
  linhasDeAtuacao: string[];
  areaTematica: string;
  ambito: string;
  localizacao: string;
  estadoUf: string;
  telefone?: string;
  email?: string;
  site?: string;
  instagram?: string;
}

export type TipoCanalContato = "telefone" | "whatsapp" | "email" | "portal" | "app" | "instagram" | "facebook";

export interface CanalContato {
  tipo: TipoCanalContato;
  label: string;
  href?: string;
}

/** Official complaint/oversight channel (ouvidoria, disque-denúncia, etc.)
 * a citizen can use to report a public climate/environmental issue. */
export interface CanalDenuncia {
  id: string;
  orgao: string;
  nome: string;
  descricao: string;
  nota?: string;
  temas: string[];
  canais: CanalContato[];
  estadoUf: string;
}

export type EixoAvaliacaoClimatica = "Políticas públicas" | "Financiamento" | "Governança";

export type EstagioAvaliacaoClimatica = "Sem progresso" | "Estágio inicial" | "Estágio intermediário" | "Estágio avançado";

/** Semáforo de 3 níveis (verde/amarelo/vermelho) usado para resumir os estágios acima nos gráficos. */
export type NivelSemaforo = "verde" | "amarelo" | "vermelho";

/** Um item de avaliação de auditoria (ex: TCE/TCU) sobre a ação climática estadual,
 * agrupado por eixo (Políticas públicas, Financiamento, Governança) e componente (ex: F1, G3, P2). */
export interface ItemAvaliacaoClimatica {
  id: string;
  eixo: EixoAvaliacaoClimatica;
  componente: string;
  item: string;
  estagio: EstagioAvaliacaoClimatica;
  pontuacao: number;
  comentario: string;
  estadoUf: string;
}
