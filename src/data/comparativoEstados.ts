/** Pontuação média por componente (F1, G3, P2, ...) para Bahia e Minas Gerais, calculada a
 * partir dos itens de auditoria em docs/amostra-apresentacao-ba-mg.csv. Minas Gerais é usada
 * como referência de comparação por ter, na amostra, o melhor desempenho médio entre os
 * estados avaliados. Usado para destacar, na Central de Dados, os indicadores em que a Bahia
 * mais está atrás desse estado de referência. */
export interface ComponenteComparativo {
  componente: string;
  pontuacaoBa: number;
  pontuacaoMg: number;
  /** Explicação, em linguagem simples, do que Minas Gerais tem e a Bahia ainda não tem
   * nesse componente — resumida a partir dos comentários de auditoria dos dois estados
   * em docs/amostra-apresentacao-ba-mg.csv. */
  porque?: string;
}

/** G3 é listado antes de F3 propositalmente: os dois têm o mesmo gap (0.5) e, no
 * desempate por ordem, isso garante que o comparativo mostre um gap de cada eixo
 * (Financiamento, Políticas públicas, Governança) em vez de dois de Financiamento. */
export const COMPARATIVO_BA_MG: ComponenteComparativo[] = [
  { componente: "F1", pontuacaoBa: 0.416, pontuacaoMg: 0.666 },
  {
    componente: "F2",
    pontuacaoBa: 0.111,
    pontuacaoMg: 0.889,
    porque:
      "Minas Gerais já transformou a busca por recursos externos em rotina institucional: aderiu a programas federais (Progestão, AdaptaCidades, Consórcio Brasil Verde) e fechou parcerias internacionais de financiamento verde — um memorando com o Reino Unido, um projeto com o UK PACT e o BDMG, cooperação com a França (ClimAtiva) —, com o BDMG atuando como agente financeiro dedicado a captar essas linhas. A Bahia aderiu a alguns dos mesmos programas federais, mas não tem processo formalizado para mapear oportunidades de financiamento nem mecanismo para monitorar quanto já foi captado — a própria SEMA reconhece a lacuna.",
  },
  { componente: "G1", pontuacaoBa: 0.555, pontuacaoMg: 0.777 },
  { componente: "G2", pontuacaoBa: 1.0, pontuacaoMg: 1.0 },
  {
    componente: "G3",
    pontuacaoBa: 0.333,
    pontuacaoMg: 0.833,
    porque:
      "Minas Gerais tem um mapa de vulnerabilidade climática pronto e em uso: o Índice Mineiro de Vulnerabilidade Climática (IMVC) combina exposição, sensibilidade e capacidade adaptativa por município, está disponível ao público na plataforma IDE-SISEMA e alimenta oficialmente o planejamento territorial e a resposta a emergências pelo SIMGE. Na Bahia, o Mapa Estadual de Vulnerabilidade às Mudanças Climáticas é previsto em lei desde 2011, mas ainda não foi elaborado — hoje o mapeamento de risco existe só em iniciativas pontuais e isoladas de algumas secretarias.",
  },
  { componente: "F3", pontuacaoBa: 0.333, pontuacaoMg: 0.833 },
  { componente: "G4", pontuacaoBa: 0.889, pontuacaoMg: 1.0 },
  { componente: "G5", pontuacaoBa: 0.833, pontuacaoMg: 1.0 },
  { componente: "G6", pontuacaoBa: 0.222, pontuacaoMg: 0.666 },
  { componente: "G7", pontuacaoBa: 0.555, pontuacaoMg: 0.889 },
  { componente: "P1", pontuacaoBa: 0.333, pontuacaoMg: 0.666 },
  { componente: "P2", pontuacaoBa: 0.222, pontuacaoMg: 0.666 },
  { componente: "P3", pontuacaoBa: 0.583, pontuacaoMg: 0.666 },
  { componente: "P4", pontuacaoBa: 0.583, pontuacaoMg: 1.0 },
  {
    componente: "P5",
    pontuacaoBa: 0.333,
    pontuacaoMg: 1.0,
    porque:
      "Minas Gerais integra a dimensão climática em instrumentos já publicados e em uso: o PLAC-MG (2023) e o IMVC mapeiam risco por município, articulados a sistemas de alerta como SIMGE, CEMADEN e INMET, com ações de prevenção (reflorestamento, contenção de encostas) e planos de recuperação pós-desastre — mesmo sem um Plano Estadual de Defesa Civil formal. A Bahia só instituiu sua Política de Defesa Civil em 2025, e o Plano Estadual (PLEPDEC), previsto desde 2013, ainda não foi criado — hoje há apenas monitoramento isolado de seca e chuva pelo INEMA.",
  },
];
