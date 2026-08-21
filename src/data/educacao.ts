import type { ConteudoEducativo } from "../types";

export const CONTEUDOS: ConteudoEducativo[] = [
  {
    id: "e1",
    titulo: "O que é o índice de seca e como interpretá-lo",
    resumo: "Um guia simples sobre o indicador usado para classificar o risco climático dos municípios.",
    conteudo: [
      "O índice de seca é um número de 0 a 100 que resume o quanto um município está distante do seu padrão normal de chuvas.",
      "Valores até 30 indicam situação normal. Entre 31 e 55, é hora de atenção. Acima de 70, o risco é considerado alto ou muito alto.",
      "Esse índice é apenas um dos indicadores usados pelo SituaMap — ele deve sempre ser interpretado junto com o histórico local e outras informações de contexto.",
    ],
    categoria: "clima",
    nivel: "iniciante",
    tempoLeituraMin: 3,
  },
  {
    id: "e2",
    titulo: "Como economizar água em casa durante períodos de estiagem",
    resumo: "Dicas práticas para reduzir o consumo doméstico sem grandes mudanças de rotina.",
    conteudo: [
      "Pequenos hábitos, como fechar a torneira ao escovar os dentes e reaproveitar a água da máquina de lavar, podem reduzir o consumo em até 30%.",
      "Reparar vazamentos rapidamente é uma das medidas mais eficazes: uma torneira pingando pode desperdiçar mais de 40 litros por dia.",
      "Reutilizar água de chuveiro e cozinha para regar plantas e lavar áreas externas também ajuda a aliviar a pressão sobre o abastecimento.",
    ],
    categoria: "agua",
    nivel: "iniciante",
    tempoLeituraMin: 4,
  },
  {
    id: "e3",
    titulo: "Cisternas rurais: como funcionam e quem pode solicitar",
    resumo: "Entenda o programa de cisternas para convivência com o semiárido e os critérios de acesso.",
    conteudo: [
      "As cisternas de placas armazenam água da chuva captada do telhado, garantindo reserva para meses de estiagem.",
      "Famílias de zona rural em municípios com histórico de escassez hídrica podem se cadastrar por meio da prefeitura ou de organizações parceiras do programa estadual.",
      "Uma cisterna de 16 mil litros bem gerenciada pode abastecer uma família de quatro pessoas por até 8 meses sem chuva.",
    ],
    categoria: "agua",
    nivel: "intermediario",
    tempoLeituraMin: 5,
  },
  {
    id: "e4",
    titulo: "Agricultura de sequeiro x irrigada: o que muda em anos de seca",
    resumo: "Como diferentes sistemas de produção agrícola reagem à escassez de chuva.",
    conteudo: [
      "A agricultura de sequeiro depende exclusivamente da chuva, sendo mais vulnerável a longos períodos de estiagem.",
      "Sistemas irrigados, como os do Oeste Baiano, conseguem manter produtividade mesmo com chuvas irregulares, mas dependem de rios e reservatórios com bom nível.",
      "Em anos de seca severa, mesmo áreas irrigadas podem sofrer restrições, caso as fontes de água também estejam comprometidas.",
    ],
    categoria: "agricultura",
    nivel: "intermediario",
    tempoLeituraMin: 5,
  },
  {
    id: "e5",
    titulo: "O papel da Defesa Civil em situações de emergência hídrica",
    resumo: "Como funciona a resposta municipal quando um decreto de emergência é publicado.",
    conteudo: [
      "Ao identificar risco elevado, a Defesa Civil municipal pode recomendar a decretação de situação de emergência, liberando recursos extraordinários.",
      "Isso permite, por exemplo, a contratação direta de carros-pipa e a distribuição prioritária de água para hospitais, escolas e famílias em maior vulnerabilidade.",
      "A população pode acompanhar decretos e ações em andamento diretamente pelos canais oficiais da prefeitura e do estado.",
    ],
    categoria: "politicas_publicas",
    nivel: "iniciante",
    tempoLeituraMin: 4,
  },
  {
    id: "e6",
    titulo: "Como identificar sinais de estresse hídrico na vegetação",
    resumo: "Orientações simples para reconhecer os primeiros sinais de seca em plantações e áreas verdes.",
    conteudo: [
      "Folhas amareladas, queda prematura de folhas e crescimento mais lento são sinais comuns de estresse hídrico em plantas.",
      "Em áreas de mata, a vegetação seca aumenta significativamente o risco de incêndios florestais, especialmente em períodos de vento forte.",
      "Relatar áreas de vegetação visivelmente seca à Defesa Civil ajuda a antecipar ações preventivas na comunidade.",
    ],
    categoria: "prevencao",
    nivel: "iniciante",
    tempoLeituraMin: 3,
  },
];

export function getConteudoById(id: string): ConteudoEducativo | undefined {
  return CONTEUDOS.find((c) => c.id === id);
}
