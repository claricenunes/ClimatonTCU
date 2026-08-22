import type { ConteudoEducativo } from "../types";

export const CONTEUDOS: ConteudoEducativo[] = [
  {
    id: "e1",
    titulo: "O que é a Mudança do Clima?",
    resumo: "Entenda o fenômeno global causado pelas ações humanas e como ele afeta o planeta.",
    conteudo: [
      "As mudanças climáticas são um fenômeno global causado pela ação humana, especificamente pela forma de produção e consumo energético, descarte de resíduos e mudanças no uso da terra.",
      "A atmosfera é repleta de gases que retêm o calor vindo do sol, criando o chamado Efeito Estufa. Esse fenômeno é natural e moldou como a vida evoluiu ao longo dos anos.",
      "Com a revolução industrial, a quantidade de Gases de Efeito Estufa (como CO2 e CH4) na atmosfera aumentou significativamente, principalmente pela queima de combustíveis fósseis.",
      "As atividades humanas que mais contribuem para as mudanças climáticas no Brasil incluem energia, agricultura, industrial e resíduos.",
    ],
    categoria: "mudancas_climaticas",
    nivel: "comece_por_aqui",
    tempoLeituraMin: 5,
  },
  {
    id: "e2",
    titulo: "Principais Riscos das Mudanças Climáticas",
    resumo: "Conheça os três grandes fatores climáticos que impactam a saúde e infraestrutura.",
    conteudo: [
      "As mudanças climáticas aumentam a frequência, duração e intensidade de eventos meteorológicos extremos que seriam raros em determinado local.",
      "Existem 3 grandes categorias de fatores climáticos com impacto direto na saúde, infraestrutura e ecossistemas: extremos de temperatura, extremos de precipitação e poluição do ar.",
      "Esses eventos afetam principalmente populações vulneráveis como idosos, crianças, gestantes e pessoas com doenças crônicas.",
      "Os custos da adaptação são altos, pois envolvem ajustes de infraestruturas em grandes escalas como obras de proteção contra inundações, estradas e instalações de geração de energia.",
    ],
    categoria: "riscos_impactos",
    nivel: "comece_por_aqui",
    tempoLeituraMin: 6,
  },
  {
    id: "e3",
    titulo: "Extremos de Temperatura: Ondas de Calor e Frio",
    resumo: "Compreenda os riscos de temperaturas extremas e como elas afetam a saúde e infraestrutura.",
    conteudo: [
      "Extremos de temperatura referem-se à exposição a níveis de calor ou frio que superam os limites fisiológicos aos quais os seres humanos estão adaptados.",
      "Ondas de calor são longos períodos de temperatura elevada além do comum que podem causar desidratação, insolação e agravar doenças cardiovasculares e respiratórias.",
      "Ondas de frio são quedas acentuadas e persistentes de temperatura abaixo dos níveis comuns, desencadeando hipotermia e agravando doenças respiratórias, cardiovasculares, metabólicas e infecciosas.",
      "A infraestrutura das cidades também sofre com esses extremos: prédios, asfalto e sistemas de transporte podem ser afetados por temperaturas muito altas ou muito baixas.",
    ],
    categoria: "riscos_impactos",
    nivel: "aprofunde",
    tempoLeituraMin: 7,
  },
  {
    id: "e4",
    titulo: "Extremos de Precipitação: Chuvas Intensas e Secas",
    resumo: "Saiba como chuvas extremas e secas prolongadas afetam cidades, saúde e produção de alimentos.",
    conteudo: [
      "Chuvas intensas podem levar a deslizamentos de terra, enchentes, inundações e interrupção de serviços básicos de energia, transporte e saúde.",
      "O excesso hídrico pode aumentar doenças contagiosas como leptospirose, hepatites, doenças diarreicas agudas e infecções respiratórias, além de dermatites, afogamento e eletrochoque.",
      "A seca se caracteriza como uma redução anormal e prolongada de precipitações que compromete a disponibilidade de água para consumo, higiene, produção de alimentos e transporte.",
      "A poluição atmosférica, principalmente de incêndios florestais e queimadas, libera material particulado e gases tóxicos que viajam por longas distâncias, impactando tanto áreas urbanas quanto rurais.",
    ],
    categoria: "riscos_impactos",
    nivel: "aprofunde",
    tempoLeituraMin: 7,
  },
  {
    id: "e5",
    titulo: "O que Você Pode Fazer Para Mitigar as Mudanças Climáticas",
    resumo: "Descubra ações concretas para ajudar a prevenir novas mudanças climáticas.",
    conteudo: [
      "A mitigação pode ser entendida como o esforço para prevenir novas mudanças climáticas, sendo de âmbito global e exigindo mudanças amplas de comportamento e avanços tecnológicos.",
      "As estratégias de mitigação incluem redução do consumo energético, adoção de fontes renováveis, melhoria da eficiência na indústria e agricultura, e proteção de florestas.",
      "Embora sejam caras a curto prazo, as estratégias de mitigação requerem mudanças profundas na forma como construímos sistemas urbanos e usamos nossos recursos energéticos.",
      "Você pode contribuir reduzindo seu consumo de energia, usando transporte sustentável, consumindo alimentos locais e de forma consciente, e apoiando políticas públicas de sustentabilidade.",
    ],
    categoria: "mitigacao",
    nivel: "voce_pode_fazer",
    tempoLeituraMin: 6,
  },
  {
    id: "e6",
    titulo: "Como Se Adaptar às Mudanças Climáticas",
    resumo: "Estratégias práticas para ajustar a vida à nova realidade climática.",
    conteudo: [
      "A adaptação implica fazer o reajuste da vida para a realidade que acontecerá, independente dos esforços de mitigação, já que alguma parcela de mudança do clima ocorrerá inevitavelmente.",
      "Previsões indicam aumento de temperatura para todas as regiões do Brasil: de 1°C a 8°C no Norte, Centro-Oeste, Sul e Sudeste, e de 2°C a 6°C no Nordeste.",
      "Possíveis impactos incluem desabastecimento de energia, mudanças na vegetação (savanização da Amazônia e aridização do semiárido), maior risco de incêndios no Pantanal e Cerrado, e impactos na saúde pública.",
      "Adaptação envolve: proteger infraestruturas contra inundações, ajustar sistemas agrícolas, investir em recursos hídricos, preparar sistemas de saúde e criar planos comunitários de resiliência.",
    ],
    categoria: "adaptacao",
    nivel: "voce_pode_fazer",
    tempoLeituraMin: 6,
  },
  {
    id: "e7",
    titulo: "Saiba Mais e Recursos",
    resumo: "Links e ferramentas para aprofundar seu conhecimento sobre riscos climáticos da sua região.",
    conteudo: [
      "Painel Cidades do AdaptaBrasil (MCTI): Acesse https://painelcidades.adaptabrasil.mcti.gov.br/ para saber mais sobre os riscos climáticos da região em que você mora.",
      "Índice Confea de Infraestrutura do Brasil (Infra-BR): Consulte https://www.infrabr.org.br/ para descobrir a resiliência da infraestrutura do seu estado.",
      "Guia de Bolso do Ministério da Saúde: 'Mudanças Climáticas para Profissionais de Saúde' oferece orientações técnicas sobre o tema (disponível no site do Ministério da Saúde).",
      "Cartilha FUNAI-IPAM-IPE: Material sobre povos indígenas enfrentando a mudança do clima fornece perspectivas importantes sobre adaptação comunitária.",
    ],
    categoria: "recursos",
    nivel: "comece_por_aqui",
    tempoLeituraMin: 3,
  },
];

export function getConteudoById(id: string): ConteudoEducativo | undefined {
  return CONTEUDOS.find((c) => c.id === id);
}
