import type { CanalDenuncia } from "../types";

/** Canais oficiais de denúncia, reclamação e fiscalização disponíveis para
 * quem quer cobrar ação em política climática/ambiental na Bahia. */
export const CANAIS_DENUNCIA: CanalDenuncia[] = [
  {
    id: "oge-ba",
    orgao: "OGE",
    nome: "Ouvidoria Geral do Estado da Bahia — OGE",
    descricao:
      "Recebe, encaminha e acompanha denúncias, reclamações, solicitações e manifestações referentes aos serviços públicos estaduais.",
    temas: [
      "Política climática estadual que não está sendo implementada",
      "Programa ambiental que não está funcionando",
      "Órgão público que não responde",
      "Ausência de fiscalização",
      "Problemas na execução de programas de adaptação climática",
      "Omissão na implementação de políticas ambientais",
      "Problemas em programas públicos de recursos hídricos, florestas e prevenção de desastres",
    ],
    canais: [
      { tipo: "portal", label: "Portal: Ouvidoria Geral do Estado da Bahia" },
      { tipo: "telefone", label: "0800 284 0011", href: "tel:08002840011" },
      { tipo: "whatsapp", label: "0800 284 0011 — disponível 24h" },
      { tipo: "email", label: "ceaoouvidoria@ba.gov.br", href: "mailto:ceaoouvidoria@ba.gov.br" },
      { tipo: "instagram", label: "@ouvidoriageralbahia", href: "https://instagram.com/ouvidoriageralbahia" },
      { tipo: "facebook", label: "@ouvidoriageraldabahia", href: "https://facebook.com/ouvidoriageraldabahia" },
    ],
    estadoUf: "BA",
  },
  {
    id: "inema-disque-denuncia",
    orgao: "INEMA",
    nome: "INEMA — Disque Denúncia Ambiental",
    descricao: "Canal para denúncia de infração ambiental concreta.",
    nota: "Cobre todo o território da Bahia e permite denúncia anônima, com preservação da identidade quando identificada.",
    temas: [
      "Desmatamento",
      "Queimadas",
      "Poluição de rios",
      "Tráfico de animais",
      "Outras irregularidades ambientais",
      "Atividades potencialmente degradadoras",
      "Danos ambientais em geral",
    ],
    canais: [
      { tipo: "telefone", label: "0800 071 1400", href: "tel:08000711400" },
      { tipo: "email", label: "denuncia@inema.ba.gov.br", href: "mailto:denuncia@inema.ba.gov.br" },
    ],
    estadoUf: "BA",
  },
  {
    id: "ouvidoria-inema",
    orgao: "INEMA",
    nome: "Ouvidoria do INEMA",
    descricao:
      "Recebe denúncias, reclamações, solicitações, sugestões e manifestações sobre a atuação do órgão de fiscalização INEMA.",
    temas: [],
    canais: [
      { tipo: "telefone", label: "0800 284 1400", href: "tel:08002841400" },
      { tipo: "telefone", label: "(71) 3118-4554 / 3118-4556", href: "tel:71311845554" },
      { tipo: "email", label: "ouvidoria@inema.ba.gov.br", href: "mailto:ouvidoria@inema.ba.gov.br" },
    ],
    estadoUf: "BA",
  },
  {
    id: "ouvidoria-sema",
    orgao: "SEMA",
    nome: "Ouvidoria da SEMA — Secretaria do Meio Ambiente",
    descricao:
      "Recebe denúncias, reclamações, solicitações, sugestões e manifestações sobre a atuação do órgão de fiscalização SEMA.",
    temas: [],
    canais: [
      { tipo: "email", label: "ouvidoria.sema@sema.ba.gov.br", href: "mailto:ouvidoria.sema@sema.ba.gov.br" },
      { tipo: "telefone", label: "(71) 3118-5372", href: "tel:7131185372" },
    ],
    estadoUf: "BA",
  },
  {
    id: "tce-ba",
    orgao: "TCE-BA",
    nome: "TCE-BA — Tribunal de Contas do Estado da Bahia",
    descricao: "A Ouvidoria do TCE-BA recebe comunicações sobre:",
    temas: [
      "Irregularidades na aplicação de recursos públicos",
      "Implementação de programas governamentais",
      "Atos de gestão",
      "Atos administrativos",
      "Desperdício de recursos",
      "Possíveis irregularidades cometidas por gestores",
    ],
    canais: [
      { tipo: "telefone", label: "0800 284 3115", href: "tel:08002843115" },
      { tipo: "whatsapp", label: "(71) 99902-0166", href: "https://wa.me/5571999020166" },
      { tipo: "app", label: "Aplicativo TCE Cidadão / TCEMobile Cidadão" },
      { tipo: "portal", label: "Ouvidoria do TCE-BA" },
      { tipo: "email", label: "ouvidoria@tce.ba.gov.br", href: "mailto:ouvidoria@tce.ba.gov.br" },
    ],
    estadoUf: "BA",
  },
  {
    id: "mpba",
    orgao: "MPBA",
    nome: "Ministério Público do Estado da Bahia — MPBA",
    descricao:
      "O MPBA possui uma área específica para \"Fazer uma denúncia\", na qual o cidadão pode comunicar suspeitas de atos ilícitos ou irregularidades.",
    temas: [
      "Omissão do município ou Estado",
      "Irregularidade administrativa",
      "Descumprimento de obrigação ambiental",
      "Problemas em políticas públicas",
      "Danos ambientais",
      "Problemas relacionados a saneamento",
      "Proteção de recursos hídricos",
      "Defesa de comunidades afetadas por projetos",
      "Questões de patrimônio público",
      "Violações de direitos coletivos",
    ],
    canais: [
      { tipo: "portal", label: "Denúncia online" },
      { tipo: "portal", label: "Denúncia Geral — MPBA" },
      { tipo: "portal", label: "Ouvidoria do MPBA" },
      { tipo: "telefone", label: "0800 284 6803", href: "tel:08002846803" },
      { tipo: "telefone", label: "(71) 3103-0490 / 0491 / 0697 / 0698", href: "tel:7131030490" },
      { tipo: "email", label: "ouvidoria@mpba.mp.br", href: "mailto:ouvidoria@mpba.mp.br" },
    ],
    estadoUf: "BA",
  },
];

export function getCanaisDenunciaByEstado(uf: string): CanalDenuncia[] {
  return CANAIS_DENUNCIA.filter((c) => c.estadoUf === uf);
}
