import type { Municipio, StatusClimatico } from "../types";

/**
 * Mock coverage for states other than Bahia (capital + one additional
 * well-known city each), so the national map has real data to filter into
 * everywhere. Bahia keeps the richer, hand-authored dataset in municipios.ts.
 * Indicators are derived deterministically from the município id so the
 * demo is stable across reloads without hardcoding dozens of numbers by hand.
 */
const CIDADES: Array<[uf: string, nome: string, populacao: number]> = [
  ["AC", "Rio Branco", 420000],
  ["AC", "Cruzeiro do Sul", 90000],
  ["AL", "Maceió", 1030000],
  ["AL", "Arapiraca", 235000],
  ["AP", "Macapá", 522000],
  ["AP", "Santana", 120000],
  ["AM", "Manaus", 2220000],
  ["AM", "Parintins", 115000],
  ["CE", "Fortaleza", 2700000],
  ["CE", "Juazeiro do Norte", 275000],
  ["DF", "Brasília", 3100000],
  ["ES", "Vitória", 365000],
  ["ES", "Vila Velha", 510000],
  ["GO", "Goiânia", 1560000],
  ["GO", "Anápolis", 400000],
  ["MA", "São Luís", 1110000],
  ["MA", "Imperatriz", 260000],
  ["MT", "Cuiabá", 650000],
  ["MT", "Rondonópolis", 230000],
  ["MS", "Campo Grande", 920000],
  ["MS", "Dourados", 225000],
  ["MG", "Belo Horizonte", 2530000],
  ["MG", "Uberlândia", 700000],
  ["PA", "Belém", 1500000],
  ["PA", "Santarém", 310000],
  ["PB", "João Pessoa", 825000],
  ["PB", "Campina Grande", 415000],
  ["PR", "Curitiba", 1970000],
  ["PR", "Londrina", 580000],
  ["PE", "Recife", 1660000],
  ["PE", "Caruaru", 370000],
  ["PI", "Teresina", 870000],
  ["PI", "Parnaíba", 150000],
  ["RJ", "Rio de Janeiro", 6800000],
  ["RJ", "Niterói", 515000],
  ["RN", "Natal", 890000],
  ["RN", "Mossoró", 300000],
  ["RS", "Porto Alegre", 1490000],
  ["RS", "Caxias do Sul", 520000],
  ["RO", "Porto Velho", 540000],
  ["RO", "Ji-Paraná", 130000],
  ["RR", "Boa Vista", 430000],
  ["RR", "Rorainópolis", 30000],
  ["SC", "Florianópolis", 530000],
  ["SC", "Joinville", 600000],
  ["SP", "São Paulo", 12300000],
  ["SP", "Campinas", 1220000],
  ["SE", "Aracaju", 670000],
  ["SE", "Itabaiana", 95000],
  ["TO", "Palmas", 310000],
  ["TO", "Araguaína", 180000],
];

const RESUMOS: Record<StatusClimatico, (nome: string) => string> = {
  normal: () => "Indicadores dentro da média esperada para a região.",
  atencao: () => "Volume de chuva abaixo da média histórica nas últimas semanas, em monitoramento.",
  alerta: () => "Redução expressiva das chuvas exige atenção redobrada ao uso da água.",
  emergencia: () => "Situação crítica de estiagem, com risco elevado de desabastecimento.",
};

const DIACRITICS_RE = new RegExp("[̀-ͯ]", "g");

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(DIACRITICS_RE, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function statusFromIndice(indice: number): { status: StatusClimatico; risco: Municipio["indicadores"]["risco"] } {
  if (indice >= 80) return { status: "emergencia", risco: "muito_alto" };
  if (indice >= 55) return { status: "alerta", risco: "alto" };
  if (indice >= 30) return { status: "atencao", risco: "medio" };
  return { status: "normal", risco: "baixo" };
}

function gerarMunicipio(uf: string, nome: string, populacao: number): Municipio {
  const id = slugify(nome);
  const random = mulberry32(hashString(`${uf}-${id}`));
  const indiceSeca = Math.round(random() * 100);
  const { status, risco } = statusFromIndice(indiceSeca);
  const chuvaMediaHistorica = Math.round(40 + random() * 110);
  const chuvaUltimos30Dias = Math.max(0, Math.round(chuvaMediaHistorica * (1 - indiceSeca / 130)));
  const temperaturaMedia = Math.round((19 + random() * 11) * 10) / 10;

  return {
    id,
    nome,
    estadoUf: uf,
    populacao,
    status,
    indicadores: { temperaturaMedia, chuvaUltimos30Dias, chuvaMediaHistorica, indiceSeca, risco },
    atualizadoEm: "2026-08-19",
    resumo: RESUMOS[status](nome),
  };
}

export const MUNICIPIOS_OUTROS_ESTADOS: Municipio[] = CIDADES.map(([uf, nome, populacao]) =>
  gerarMunicipio(uf, nome, populacao),
);
