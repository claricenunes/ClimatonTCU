export interface Pilar {
  id: number;
  titulo: string;
}

/** The 15 climate-action pillars shown once a citizen drills into any of the
 * 3 axes (Políticas Públicas / Financiamento / Governança) for a state. */
export const PILARES: Pilar[] = [
  { id: 1, titulo: "Leis ambiciosas" },
  { id: 2, titulo: "Instituições fortes" },
  { id: 3, titulo: "Combate às causas" },
  { id: 4, titulo: "Ajuste aos efeitos" },
  { id: 5, titulo: "Orçamento para o clima" },
  { id: 6, titulo: "Justiça climática" },
  { id: 7, titulo: "Mapear riscos" },
  { id: 8, titulo: "Atuação coordenada" },
  { id: 9, titulo: "Acesso a recursos" },
  { id: 10, titulo: "Engajamento amplo" },
  { id: 11, titulo: "Proteger de desastres" },
  { id: 12, titulo: "Manter acesso à água" },
  { id: 13, titulo: "Garantir boa saúde" },
  { id: 14, titulo: "Planejar seu território" },
  { id: 15, titulo: "Transporte sustentável" },
];
