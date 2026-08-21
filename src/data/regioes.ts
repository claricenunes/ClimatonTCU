import type { Regiao } from "../types";

/**
 * Stylized, low-poly representation of Bahia's territory, split into 9
 * macro-regions. Not geographically precise — a decorative but legible
 * abstraction, consistent with the illustrative reference used for this
 * prototype. Built from a 4x4 grid of anchor points so every region shares
 * exact edges with its neighbors (no gaps, no overlaps).
 */
export const MAP_VIEWBOX = "0 0 600 760";

export const REGIOES: Regiao[] = [
  {
    id: "oeste-baiano",
    nome: "Oeste Baiano",
    descricao: "Região de agricultura irrigada e grandes lavouras de grãos.",
    path: "M120,30 L280,45 L250,275 L60,260 Z",
    labelPoint: [155, 150],
  },
  {
    id: "piemonte-diamantina",
    nome: "Piemonte da Diamantina",
    descricao: "Transição entre o semiárido e a Chapada Diamantina.",
    path: "M280,45 L430,60 L400,255 L250,275 Z",
    labelPoint: [335, 155],
  },
  {
    id: "baixo-medio-sao-francisco",
    nome: "Baixo Médio São Francisco",
    descricao: "Margens do Rio São Francisco, forte dependência hídrica do rio.",
    path: "M430,60 L520,110 L560,300 L400,255 Z",
    labelPoint: [470, 160],
  },
  {
    id: "chapada-diamantina",
    nome: "Chapada Diamantina",
    descricao: "Relevo montanhoso, nascentes de rios e turismo ecológico.",
    path: "M60,260 L250,275 L240,520 L50,500 Z",
    labelPoint: [140, 390],
  },
  {
    id: "sertao-produtivo",
    nome: "Sertão Produtivo",
    descricao: "Polo de fruticultura irrigada no semiárido baiano.",
    path: "M250,275 L400,255 L410,505 L240,520 Z",
    labelPoint: [325, 390],
  },
  {
    id: "litoral-norte",
    nome: "Litoral Norte",
    descricao: "Faixa litorânea ao norte de Salvador, turismo e pesca.",
    path: "M400,255 L560,300 L555,560 L410,505 Z",
    labelPoint: [480, 400],
  },
  {
    id: "sudoeste",
    nome: "Sudoeste da Bahia",
    descricao: "Planalto de altitude, café e pecuária.",
    path: "M50,500 L240,520 L300,700 L150,720 Z",
    labelPoint: [165, 610],
  },
  {
    id: "metropolitano-reconcavo",
    nome: "Metropolitano de Salvador e Recôncavo",
    descricao: "Capital, região metropolitana e Recôncavo Baiano.",
    path: "M240,520 L410,505 L430,690 L300,700 Z",
    labelPoint: [340, 610],
  },
  {
    id: "litoral-sul-extremo-sul",
    nome: "Litoral Sul e Extremo Sul",
    descricao: "Costa do cacau e extremo sul, turismo e agropecuária.",
    path: "M410,505 L555,560 L500,650 L430,690 Z",
    labelPoint: [470, 605],
  },
];

export function getRegiaoById(id: string): Regiao | undefined {
  return REGIOES.find((r) => r.id === id);
}
