import type { Organizacao } from "../types";

/** Organizações parceiras da sociedade civil atuando em causas socioambientais
 * e climáticas na Bahia — fonte: docs/projeto_sociais_pleo_clima.docx */
export const ORGANIZACOES: Organizacao[] = [
  {
    id: "avante",
    nome: "Avante – Educação e Mobilização Social",
    missao:
      "Contribuir para a formação do cidadão, pela educação e o desenvolvimento de tecnologias de intervenção social, visando à garantia dos direitos sociais básicos e ao fortalecimento da sociedade civil.",
    linhasDeAtuacao: [
      "Formação de cidadãos e organizações",
      "Fomento à participação cidadã",
      "Defesa de direitos",
      "Mobilização da sociedade",
    ],
    areaTematica: "Educação; Direitos humanos; Políticas sociais e cidadania",
    ambito: "Federal",
    localizacao: "Salvador - BA",
    estadoUf: "BA",
    telefone: "(71) 3332 3344",
    email: "contato@avante.org.br",
    site: "https://avante.org.br/",
  },
  {
    id: "mecenas-da-vida",
    nome: "Movimento Mecenas da Vida",
    missao:
      "Nascido em 2007 para mobilizar e engajar pessoas e instituições públicas e privadas nas causas socioambientais, com foco em democratizar a conservação ambiental e dar protagonismo a agricultores familiares e populações tradicionais.",
    linhasDeAtuacao: ["Mobilização de pessoas e instituições", "Conservação ambiental", "Protagonismo comunitário"],
    areaTematica: "Meio ambiente e recursos naturais",
    ambito: "Estadual",
    localizacao: "Uruçuca – BA",
    estadoUf: "BA",
    telefone: "(73) 99996-1575",
    email: "contato@mecenasdavida.org.br",
    site: "https://www.mecenasdavida.org.br/bahia/",
    instagram: "@turismoco2legal",
  },
  {
    id: "imaterra",
    nome: "Instituto Mãos da Terra - IMATERRA",
    missao:
      "Desenvolver projetos e ações, com excelência técnica e inovação, que contribuam para a conservação e uso sustentável da biodiversidade, o conhecimento tradicional, a defesa do patrimônio histórico e cultural, e políticas públicas que assegurem os direitos humanos e o bem-estar social.",
    linhasDeAtuacao: [
      "Fomento à participação cidadã",
      "Formação de cidadãos e organizações",
      "Análise e melhoria de políticas",
      "Defesa de direitos",
      "Mobilização da sociedade",
    ],
    areaTematica: "Meio ambiente e recursos naturais",
    ambito: "Federal",
    localizacao: "Simões Filho - BA",
    estadoUf: "BA",
    email: "imaterra.socioambiental@gmail.com",
    site: "https://www.imaterra.org/",
    instagram: "https://www.instagram.com/imaterra.ong/",
  },
  {
    id: "fundacao-baia-viva",
    nome: "Fundação Baía Viva",
    missao:
      "Atua há mais de 20 anos na região da Baía de Todos os Santos, com proteção ambiental, saneamento (abastecimento de água, esgotamento sanitário, drenagem pluvial e limpeza urbana), pesquisa sobre fauna e flora, e administração de Unidades de Conservação.",
    linhasDeAtuacao: ["Defesa de direitos", "Mobilização da sociedade", "Fomento à participação cidadã"],
    areaTematica: "Meio ambiente e recursos naturais",
    ambito: "Estadual",
    localizacao: "Salvador - BA",
    estadoUf: "BA",
    telefone: "(71) 2108 9000",
    email: "contato@fundacaobaiaviva.org",
    site: "https://fundacaobaiaviva.org.br/",
  },
];

export function getOrganizacoesByEstado(uf: string): Organizacao[] {
  return ORGANIZACOES.filter((o) => o.estadoUf === uf);
}
