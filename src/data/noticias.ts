import type { Noticia } from "../types";

export const NOTICIAS: Noticia[] = [
  {
    id: "n1",
    titulo: "Guanambi e Brumado decretam emergência hídrica",
    resumo: "Dois municípios do sudoeste baiano ampliam distribuição de água por carros-pipa após meses sem chuva significativa.",
    conteudo: [
      "As prefeituras de Guanambi e Brumado decretaram situação de emergência hídrica nesta semana, após índices de chuva chegarem a menos de 10% da média histórica para o período.",
      "Segundo as administrações municipais, a medida permite a contratação emergencial de carros-pipa e a liberação de recursos estaduais para reforço no abastecimento de comunidades rurais.",
      "A Defesa Civil orienta a população a reduzir o consumo de água e reforça pontos de distribuição em bairros mais afetados.",
    ],
    categoria: "seca",
    data: "2026-08-17",
    estadoUf: "BA",
    municipioId: "guanambi",
    fonte: "Secretaria de Meio Ambiente da Bahia",
    tempoLeituraMin: 3,
  },
  {
    id: "n2",
    titulo: "Chuvas abaixo da média afetam 22 municípios monitorados",
    resumo: "Levantamento aponta redução progressiva do volume de chuvas em regiões do sertão e sudoeste do estado nas últimas oito semanas.",
    conteudo: [
      "Dados do ClimAqui mostram que 9 dos 22 municípios monitorados registraram chuvas pelo menos 30% abaixo da média histórica nos últimos 30 dias.",
      "As regiões do Sertão Produtivo e Sudoeste da Bahia concentram os casos mais severos, com destaque para Guanambi, Brumado e Vitória da Conquista.",
      "Especialistas recomendam atenção redobrada ao uso da água em atividades agrícolas nas próximas semanas.",
    ],
    categoria: "seca",
    data: "2026-08-15",
    estadoUf: "BA",
    fonte: "ClimAqui Bahia",
    tempoLeituraMin: 4,
  },
  {
    id: "n3",
    titulo: "Rio São Francisco opera com vazão reduzida em Juazeiro",
    resumo: "Órgão gestor recomenda uso racional da água para irrigação após queda no nível do rio.",
    conteudo: [
      "A vazão do Rio São Francisco no trecho de Juazeiro segue abaixo do esperado para agosto, mês tradicionalmente seco na região.",
      "Produtores rurais que dependem de irrigação foram orientados a otimizar o uso da água e evitar desperdícios nos sistemas de captação.",
      "O monitoramento é feito em conjunto com a Companhia de Desenvolvimento dos Vales do São Francisco e do Parnaíba.",
    ],
    categoria: "seca",
    data: "2026-08-14",
    estadoUf: "BA",
    municipioId: "juazeiro",
    fonte: "Codevasf",
    tempoLeituraMin: 3,
  },
  {
    id: "n4",
    titulo: "Governo do Estado amplia investimento em cisternas rurais",
    resumo: "Programa prevê instalação de 4 mil novas cisternas em municípios com histórico de escassez hídrica até o fim do ano.",
    conteudo: [
      "O programa estadual de convivência com o semiárido vai priorizar municípios que registram estiagem recorrente, como Guanambi, Brumado e Jequié.",
      "Cada cisterna tem capacidade para armazenar até 16 mil litros de água da chuva, suficiente para abastecer uma família por meses de estiagem.",
      "A previsão é concluir a instalação até dezembro, em parceria com organizações da sociedade civil.",
    ],
    categoria: "politica_publica",
    data: "2026-08-12",
    estadoUf: "BA",
    fonte: "Governo da Bahia",
    tempoLeituraMin: 3,
  },
  {
    id: "n5",
    titulo: "Litoral Sul mantém regime de chuvas regular apesar do calor",
    resumo: "Municípios como Ilhéus e Itabuna seguem com indicadores estáveis mesmo diante das altas temperaturas registradas no estado.",
    conteudo: [
      "Diferente do padrão observado no sertão, os municípios do Litoral Sul mantêm volumes de chuva próximos à média histórica.",
      "Meteorologistas explicam que a proximidade com o oceano contribui para manter a umidade relativa mais estável na região.",
      "Ainda assim, o monitoramento contínuo é mantido como medida preventiva.",
    ],
    categoria: "meio_ambiente",
    data: "2026-08-10",
    estadoUf: "BA",
    fonte: "ClimAqui Bahia",
    tempoLeituraMin: 2,
  },
  {
    id: "n6",
    titulo: "Como funciona o índice de seca usado no ClimAqui",
    resumo: "Entenda a metodologia por trás do indicador que classifica o risco climático dos municípios baianos.",
    conteudo: [
      "O índice de seca combina dados de volume de chuva, temperatura média e histórico de precipitação para gerar uma pontuação de 0 a 100.",
      "Quanto maior o índice, maior o risco de escassez hídrica no curto prazo. Índices acima de 70 costumam indicar necessidade de ação preventiva.",
      "A metodologia será refinada continuamente à medida que novas fontes de dados forem integradas à plataforma.",
    ],
    categoria: "prevencao",
    data: "2026-08-05",
    estadoUf: "BA",
    fonte: "ClimAqui Bahia",
    tempoLeituraMin: 4,
  },
];

export function getNoticiaById(id: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.id === id);
}
