# 🏗️ Arquitetura - ClimAqui

## Visão Geral

ClimAqui é uma plataforma web que traduz dados técnicos de políticas climáticas em ação cidadã acessível.

**Princípio**: Centralizar informação sobre clima + educar + conectar com comunidades + incentivar ação.

## Fluxo de Dados

```
Painel ClimaBrasil (CSV)
    ↓
src/data/ (TypeScript estruturado)
    ↓
React Components (reutilizáveis)
    ↓
UI Interativa (Tailwind + Acessibilidade)
    ↓
Cidadão informado e motivado
```

## Stack Técnica

| Camada | Tecnologia | Versão | Razão |
|--------|-----------|--------|-------|
| **Runtime** | React | 19 | UI moderna, componentização |
| | TypeScript | 6.0 | Tipagem forte, segurança |
| **Build** | Vite | 8 | Build rápido, dev experience ótima |
| | Tailwind CSS | 4 | Estilo consistente, utility-first |
| **Navegação** | React Router | 7 | Multi-página sem refresh |
| **Geo** | @svg-maps/brazil | 2.0 | Geometria real dos estados (CC-BY) |
| **Qualidade** | OXLint | 1.75 | Linting rápido |
| | TypeScript Compiler | 6.0 | Verificação de tipos |

## Modelo de Dados

### Hierarquia de Informação

```
Brasil (27 estados + DF)
├── Estado
│   ├── Indicadores gerais (agregados de municípios)
│   └── Municípios (25 principais)
│       ├── Status climático (normal/atenção/alerta/emergência)
│       ├── Indicadores (temperatura, chuva, seca)
│       ├── Alertas (seca, chuva intensa, etc)
│       └── Relatos comunitários (cidadãos relatam situação)
│
├── Notícias (feed filtável por categoria)
├── Conteúdo Educativo (7 tópicos sobre clima)
└── Grupos Sociais (ONGs, movimentos locais)
```

### Tipos Principais (src/types/index.ts)

```typescript
// Estado
interface Estado {
  uf: string              // "BA"
  nome: string            // "Bahia"
  regiao: RegiaoBR        // "Nordeste"
  capital: string         // "Salvador"
}

// Município
interface Municipio {
  id: string
  nome: string
  estadoUf: string
  status: StatusClimatico // "normal" | "atencao" | "alerta" | "emergencia"
  indicadores: {
    temperaturaMedia: number
    chuvaUltimos30Dias: number
    chuvaMediaHistorica: number
    indiceSeca: number     // 0-100
    risco: "baixo" | "medio" | "alto" | "muito_alto"
  }
  atualizadoEm: string    // ISO date
  resumo: string
}

// Notícia
interface Noticia {
  id: string
  titulo: string
  resumo: string
  conteudo: string[]
  categoria: CategoriaNoticia
  data: string
  municipioId?: string
  fonte: string
  tempoLeituraMin: number
}

// Educação
interface ConteudoEducativo {
  id: string
  titulo: string
  resumo: string
  conteudo: string[]
  categoria: CategoriaEducacao // mudancas_climaticas | riscos_impactos | etc
  nivel: NivelEducacao          // comece_por_aqui | aprofunde | voce_pode_fazer
  tempoLeituraMin: number
}
```

## Páginas (Rotas)

| Rota | Componente | Descrição | Dados Usados |
|------|-----------|-----------|-------------|
| `/` | `Home.tsx` | Mapa interativo + lista municípios | estados, municipios |
| `/municipio/:id` | `MunicipioDetalhe.tsx` | Indicadores, alertas, relatos | municipios, alertas, relatos |
| `/noticias` | `Noticias.tsx` | Feed filtável de notícias | noticias |
| `/noticias/:id` | `NoticiaDetalhe.tsx` | Detalhe da notícia | noticias |
| `/comunidade` | `Comunidade.tsx` | Relatos de cidadãos | relatos |
| `/educacao` | `Educacao.tsx` | Conteúdos educativos | educacao |
| `/educacao/:id` | `EducacaoDetalhe.tsx` | Detalhe do conteúdo | educacao |

## Decisões de Arquitetura

### 1. Dados Mockados (Pronto para API)

**Decisão**: Usar dados locais em `src/data/`, não banco de dados.

**Razão**: 
- Rápido para prototipagem
- Estrutura preparada para receber API real sem mudanças na UI
- Fácil de fazer deploy estático

**Como Migrar para API**: Substituir `src/data/municipios.ts` por fetch de API, mantendo a mesma interface TypeScript.

### 2. TypeScript Strict

**Decisão**: Sem `any`, tipos explícitos sempre.

**Razão**: 
- Evita bugs em runtime
- Autocompletar melhor
- Mais fácil refatorar

### 3. Context para Acessibilidade

**Decisão**: Preferências de usuário (contraste, tamanho fonte) em Context + localStorage.

**Razão**:
- Persiste ao recarregar
- Acessível em qualquer componente
- Sem props drilling

### 4. Tailwind + Sem CSS Custom

**Decisão**: 100% Tailwind, zero CSS custom.

**Razão**:
- Consistência visual
- Mudanças de tema mais fáceis
- Menor bundle size

## Fluxo de Interação do Usuário

```
1. Usuário abre o app
   ↓
2. Vê mapa do Brasil com estados coloridos
   ↓
3. Clica em um estado
   ↓
4. Vê indicadores + lista de municípios daquele estado
   ↓
5. Clica em um município
   ↓
6. Vê detalhes: indicadores, alertas, relatos comunitários
   ↓
7. Clica em "Notícias" → vê feed
   ↓
8. Clica em "Educação" → aprende sobre clima
   ↓
9. Clica em "Comunidade" → vê grupos para agir
```

## Performance

- **Bundle Size**: ~150KB (gzipped)
- **First Paint**: <1s
- **Time to Interactive**: <2s

Otimizações:
- Code splitting por rota (React Router)
- Tree-shaking de imports não usados
- Tailwind purge de CSS não usados

## Segurança

- Sem backend = sem exposição de dados sensíveis
- HTTPS recomendado para deploy
- Sem coleta de dados pessoais
- Acesso público aos dados do Painel ClimaBrasil

## Escalabilidade

### Curto Prazo (MVP Atual)
- 27 estados + 25 municípios
- 7 conteúdos educativos
- Feed de notícias

### Médio Prazo
- Integração com API de dados em tempo real
- Mais municípios (500+)
- Sistema de cobranças (cidadão → governo)
- Registro de grupos sociais

### Longo Prazo
- API pública para terceiros
- Integração com governo
- Gamificação (badges, desafios)
- Comparação histórica (ano a ano)
