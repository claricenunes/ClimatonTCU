# 📊 Documentação de Dados - ClimAqui

## Origem dos Dados

**Fonte Principal**: Painel ClimaBrasil (TCU)
- 2.375 registros avaliativos
- 51 entidades (27 estados, 25 municípios, DF)
- 3 eixos (Financiamento, Governança, Políticas Públicas)
- Arquivo original: `docs/pcb-dados-limpos.csv`

**Amostra de Apresentação**: `docs/amostra-apresentacao-ba-mg.csv`
- Bahia (estado) + Salvador (município)
- Minas Gerais (estado)
- Todas as 3 eixos + comentários/justificativas

## Estrutura dos Tipos

### Interface Município (src/types/index.ts)

```typescript
interface Municipio {
  id: string                      // Identificador único: "salvador"
  nome: string                    // Nome: "Salvador"
  estadoUf: string               // Estado: "BA"
  regiaoId?: string              // Sub-região (opcional, só BA): "metropolitano-reconcavo"
  populacao: number              // Número: 2418000
  status: StatusClimatico        // "normal" | "atencao" | "alerta" | "emergencia"
  indicadores: {
    temperaturaMedia: number     // Celsius: 27.4
    chuvaUltimos30Dias: number   // mm: 68
    chuvaMediaHistorica: number  // mm: 110
    indiceSeca: number           // 0-100: 42
    risco: string                // "baixo" | "medio" | "alto" | "muito_alto"
  }
  atualizadoEm: string           // ISO date: "2026-08-19"
  resumo: string                 // Descrição breve
}
```

### Status Climático

| Status | Código | Cor | Significado |
|--------|--------|-----|-------------|
| Normal | `"normal"` | 🟢 Verde | Indicadores dentro da média esperada |
| Atenção | `"atencao"` | 🟡 Amarelo | Indicadores fora da média, monitoramento reforçado |
| Alerta | `"alerta"` | 🟠 Laranja | Risco elevado, ação preventiva recomendada |
| Emergência | `"emergencia"` | 🔴 Vermelho | Situação crítica, resposta imediata necessária |

### Alertas (src/types/index.ts)

```typescript
interface Alerta {
  id: string                      // "al-01"
  municipioId: string             // "salvador"
  tipo: TipoAlerta                // "seca" | "chuva_intensa" | "temperatura" | "queimada" | "abastecimento"
  nivel: StatusClimatico          // "alerta"
  titulo: string                  // "Reservatórios em monitoramento"
  descricao: string               // Descrição detalhada
  data: string                    // "2026-08-19"
}
```

### Relatos Comunitários (src/types/index.ts)

```typescript
interface RelatoComunidade {
  id: string                      // "rel-001"
  autor: string                   // Nome do cidadão
  municipioId: string             // "salvador"
  categoria: CategoriaRelato      // "falta_agua" | "alagamento" | "vegetacao" | "calor_extremo"
  titulo: string                  // "Falta de água no bairro X"
  descricao: string               // Detalhes do problema
  data: string                    // ISO date
  apoios: number                  // Quantas pessoas apoiaram: 23
  status: StatusRelato            // "pendente" | "verificado"
}
```

### Notícias (src/types/index.ts)

```typescript
interface Noticia {
  id: string                      // "noticia-001"
  titulo: string                  // "Estado reduz emissões em 15%"
  resumo: string                  // Resumo 1-2 linhas
  conteudo: string[]              // Array de parágrafos
  categoria: CategoriaNoticia     // "seca" | "chuvas" | "politica_publica" | "meio_ambiente" | "prevencao"
  data: string                    // ISO date
  municipioId?: string            // Opcional: qual município afeta
  fonte: string                   // "G1", "Folha", etc
  tempoLeituraMin: number         // 5 minutos
}
```

### Conteúdo Educativo (src/types/index.ts)

```typescript
interface ConteudoEducativo {
  id: string                      // "e1"
  titulo: string                  // "O que é a Mudança do Clima?"
  resumo: string                  // Resumo 1 linha
  conteudo: string[]              // Array de parágrafos
  categoria: CategoriaEducacao    // "mudancas_climaticas" | "riscos_impactos" | "mitigacao" | "adaptacao" | "recursos"
  nivel: NivelEducacao            // "comece_por_aqui" | "aprofunde" | "voce_pode_fazer"
  tempoLeituraMin: number         // 5 minutos
}
```

## Onde os Dados Vivem

### Arquivos de Dados

```
src/data/
├── estados.ts              # Lista de 27 estados + DF
├── municipios.ts           # ~20 municípios da Bahia + alertas
├── municipiosOutrosEstados.ts  # Capital + 1 cidade de cada outro estado
├── noticias.ts             # Feed de notícias
├── educacao.ts             # 7 conteúdos educativos
├── comunidade.ts           # Relatos de cidadãos
└── regioes.ts              # Sub-regiões da Bahia
```

### Como os Dados São Usados

| Página | Dados Usados | Função |
|--------|-------------|--------|
| Home (Mapa) | `estados`, `municipios` | Mostrar mapa + lista |
| Município | `municipios`, `alertas`, `relatos` | Detalhes do município |
| Notícias | `noticias` | Feed filtrado |
| Educação | `educacao` | Conteúdos filtrados |
| Comunidade | `relatos` | Relatos com ranking |

## Como Adicionar Novo Município

### 1. Abrir `src/data/municipios.ts`

### 2. Adicionar à array correta

```typescript
// Se for Bahia, adiciona a MUNICIPIOS_BA
const MUNICIPIOS_BA: Municipio[] = [
  // ... municípios existentes
  {
    id: "novo-municipio",
    nome: "Novo Município",
    regiaoId: "regiao-id",
    estadoUf: "BA",
    populacao: 100000,
    status: "normal",
    indicadores: {
      temperaturaMedia: 26.5,
      chuvaUltimos30Dias: 80,
      chuvaMediaHistorica: 100,
      indiceSeca: 30,
      risco: "baixo",
    },
    atualizadoEm: "2026-08-21",
    resumo: "Descrição breve da situação",
  },
];
```

### 3. Verificar se o `id` é único

```bash
# Grep por duplicatas
grep "id: \"novo-municipio\"" src/data/*.ts
```

### 4. Testar
```bash
npm run dev
# Verificar se aparece na Home
```

## Como Atualizar Dados de Produção

Quando novos dados do Painel ClimaBrasil forem lançados:

### 1. Baixar CSV atualizado
- Salvar em `docs/pcb-dados-limpos.csv`

### 2. Converter para TypeScript
- Usar script Python ou Excel para gerar arrays TypeScript
- Exemplo:
```python
import csv
with open('pcb-dados-limpos.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f'{{ id: "{row["id"]}", nome: "{row["nome"]}", ... }}')
```

### 3. Atualizar `src/data/municipios.ts`
- Copiar arrays geradas
- Verificar tipos com TypeScript

### 4. Atualizar amostra de apresentação
- `docs/amostra-apresentacao-ba-mg.csv`
- Incluir comentários/justificativas das avaliações

### 5. Testar
```bash
npm run build    # Verificar erros de tipo
npm run dev      # Testar no navegador
```

## Referência de Valores

### Escala de Pontuação (Painel ClimaBrasil)

| Estágio | Código | Valor | Significado |
|---------|--------|-------|-------------|
| Sem Progresso | - | 0 | Nenhuma ação identificada |
| Estágio Inicial | 1 | 0.333 | Primeiras ações, estrutura mínima |
| Estágio Intermediário | 2 | 0.666 | Ações implementadas, alguns resultados |
| Estágio Avançado | 3 | 1.000 | Ações consolidadas, resultados claros |

### Categorias de Notícia

- `"seca"` — Falta de chuva, estiagem
- `"chuvas"` — Chuvas intensas, enchentes
- `"politica_publica"` — Programas, leis, investimentos
- `"meio_ambiente"` — Conservação, biodiversidade
- `"prevencao"` — Preparo para eventos climáticos

### Categorias de Educação

- `"mudancas_climaticas"` — O que é, causas, história
- `"riscos_impactos"` — Riscos e impactos específicos
- `"mitigacao"` — Ações para reduzir emissões
- `"adaptacao"` — Como se adaptar a eventos
- `"recursos"` — Links e ferramentas úteis

### Níveis de Educação

- `"comece_por_aqui"` — Conceitos básicos, essencial
- `"aprofunde"` — Mais detalhado, para quem quer entender melhor
- `"voce_pode_fazer"` — Ações práticas que pessoa pode fazer

## Validação de Dados

Antes de fazer commit com novos dados:

```bash
# TypeScript vai reclamar se houver erros de tipo
npm run build

# Lint vai verificar se há valores faltando
npm run lint

# Teste visual
npm run dev
# Clique nos municípios/notícias/educação para verificar
```

## Performance de Dados

- **Tamanho total**: ~50KB (não gzipped)
- **Load time**: Instantâneo (dados no browser)
- **Limitação**: Cresce linear com quantidade de municípios

Quando chegar a 1000+ municípios:
- Considerar pagination
- Lazy load de detalhes
- Migrar para backend com cache
