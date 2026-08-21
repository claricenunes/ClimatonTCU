// @svg-maps/brazil ships a .d.ts that references an unpublished internal
// type package, so its import resolves to `any` — type the shape locally.
import brazilMap from "@svg-maps/brazil";
import type { Estado } from "../types";

interface SvgMapLocation {
  id: string;
  name: string;
  path: string;
}

interface SvgMap {
  viewBox: string;
  locations: SvgMapLocation[];
}

const typedBrazilMap = brazilMap as SvgMap;

export const BRASIL_MAP_VIEWBOX = typedBrazilMap.viewBox;

/** UF (uppercase) -> SVG path "d" attribute, sourced from @svg-maps/brazil. */
export const BRASIL_MAP_PATHS: Record<string, string> = Object.fromEntries(
  typedBrazilMap.locations.map((loc) => [loc.id.toUpperCase(), loc.path]),
);

export const ESTADOS: Estado[] = [
  { uf: "AC", nome: "Acre", regiao: "Norte", capital: "Rio Branco" },
  { uf: "AL", nome: "Alagoas", regiao: "Nordeste", capital: "Maceió" },
  { uf: "AP", nome: "Amapá", regiao: "Norte", capital: "Macapá" },
  { uf: "AM", nome: "Amazonas", regiao: "Norte", capital: "Manaus" },
  { uf: "BA", nome: "Bahia", regiao: "Nordeste", capital: "Salvador" },
  { uf: "CE", nome: "Ceará", regiao: "Nordeste", capital: "Fortaleza" },
  { uf: "DF", nome: "Distrito Federal", regiao: "Centro-Oeste", capital: "Brasília" },
  { uf: "ES", nome: "Espírito Santo", regiao: "Sudeste", capital: "Vitória" },
  { uf: "GO", nome: "Goiás", regiao: "Centro-Oeste", capital: "Goiânia" },
  { uf: "MA", nome: "Maranhão", regiao: "Nordeste", capital: "São Luís" },
  { uf: "MT", nome: "Mato Grosso", regiao: "Centro-Oeste", capital: "Cuiabá" },
  { uf: "MS", nome: "Mato Grosso do Sul", regiao: "Centro-Oeste", capital: "Campo Grande" },
  { uf: "MG", nome: "Minas Gerais", regiao: "Sudeste", capital: "Belo Horizonte" },
  { uf: "PA", nome: "Pará", regiao: "Norte", capital: "Belém" },
  { uf: "PB", nome: "Paraíba", regiao: "Nordeste", capital: "João Pessoa" },
  { uf: "PR", nome: "Paraná", regiao: "Sul", capital: "Curitiba" },
  { uf: "PE", nome: "Pernambuco", regiao: "Nordeste", capital: "Recife" },
  { uf: "PI", nome: "Piauí", regiao: "Nordeste", capital: "Teresina" },
  { uf: "RJ", nome: "Rio de Janeiro", regiao: "Sudeste", capital: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte", regiao: "Nordeste", capital: "Natal" },
  { uf: "RS", nome: "Rio Grande do Sul", regiao: "Sul", capital: "Porto Alegre" },
  { uf: "RO", nome: "Rondônia", regiao: "Norte", capital: "Porto Velho" },
  { uf: "RR", nome: "Roraima", regiao: "Norte", capital: "Boa Vista" },
  { uf: "SC", nome: "Santa Catarina", regiao: "Sul", capital: "Florianópolis" },
  { uf: "SP", nome: "São Paulo", regiao: "Sudeste", capital: "São Paulo" },
  { uf: "SE", nome: "Sergipe", regiao: "Nordeste", capital: "Aracaju" },
  { uf: "TO", nome: "Tocantins", regiao: "Norte", capital: "Palmas" },
];

export function getEstadoByUf(uf: string): Estado | undefined {
  return ESTADOS.find((e) => e.uf === uf.toUpperCase());
}
