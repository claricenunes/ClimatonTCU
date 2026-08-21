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
  fonte: string;
  tempoLeituraMin: number;
}

export type CategoriaRelato = "falta_agua" | "alagamento" | "vegetacao" | "calor_extremo" | "outro";
export type StatusRelato = "pendente" | "verificado";

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
}

export type CategoriaEducacao = "agua" | "clima" | "prevencao" | "agricultura" | "politicas_publicas";

export interface ConteudoEducativo {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string[];
  categoria: CategoriaEducacao;
  nivel: "iniciante" | "intermediario" | "avancado";
  tempoLeituraMin: number;
}
