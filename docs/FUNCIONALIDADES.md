# ✨ Funcionalidades - ClimAqui

## 🗺️ Página Home (Mapa Interativo)

**Rota**: `/`

### Componentes

- **Mapa do Brasil** — Estados interativos, clicáveis
  - Cores por região (Nordeste, Sudeste, etc)
  - Tooltip ao passar mouse
  - Suporta navegação por teclado (Tab + Enter)

- **Seletor de Estado** — Dropdown com busca
  - Digite nome ou sigla (BA, MG, SP)
  - Filtra em tempo real
  - Sincroniza com mapa

- **KPIs Gerais** — Indicadores nacionais
  - Temperatura média
  - Chuva últimos 30 dias
  - Índice de seca

- **Lista de Municípios** — Filtrável por
  - Estado selecionado
  - Status climático (normal, atenção, alerta, emergência)
  - Paginada (10 por página)

- **Cards de Município** — Cada um mostra
  - Nome + população
  - Status visual (cor)
  - Indicadores resumidos (temperatura, chuva, seca)
  - Link para detalhes

### Interações

```
1. Usuário abre app → Vê mapa nacional
2. Clica em estado → Mapa ativa + lista de municípios
3. Busca município → Lista filtra em tempo real
4. Clica em card → Vai para detalhe do município
```

---

## 📍 Página Município (MunicipioDetalhe)

**Rota**: `/municipio/:id`

### Componentes

- **Breadcrumb** — Navegação: Início > Educação > [Título]

- **Cabeçalho** — 
  - Título + população
  - Estado + região (se aplicável)
  - Data de atualização

- **Indicadores** — Cards com
  - Temperatura média (°C)
  - Chuva últimos 30 dias (mm)
  - Chuva média histórica (mm)
  - Índice de seca (0-100)
  - Risco climático

- **Alertas Ativos** — Lista de alertas
  - Tipo (seca, chuva intensa, temperatura, queimada, abastecimento)
  - Nível (normal, atenção, alerta, emergência)
  - Título + descrição
  - Data do alerta

- **Relatos Comunitários** — Posts de cidadãos
  - Autor
  - Categoria (falta água, alagamento, vegetação, calor)
  - Texto do relato
  - Número de apoios
  - Status (pendente/verificado)

- **Botão Voltar** — Retorna ao mapa

---

## 📰 Página Notícias

**Rota**: `/noticias`

### Componentes

- **Filtro por Categoria** — Chips selecionáveis
  - Seca
  - Chuvas
  - Política Pública
  - Meio Ambiente
  - Prevenção

- **Feed de Notícias** — Cards com
  - Título + resumo
  - Categoria (tag colorida)
  - Data publicação
  - Tempo de leitura (min)
  - Link para detalhe

- **Ordenação** — Por data (mais recente primeiro)

### Interações

```
1. Usuário abre Notícias
2. Vê todas as notícias (padrão)
3. Clica em categoria → Filtra apenas aquela
4. Clica em card → Abre detalhe
```

---

## 📰 Página Notícia Detalhe

**Rota**: `/noticias/:id`

### Componentes

- **Breadcrumb** — Início > Notícias > [Título]

- **Cabeçalho**
  - Título grande
  - Categoria + data
  - Fonte da notícia
  - Tempo de leitura

- **Conteúdo** — Parágrafos (texto puro)

- **Botão Voltar** — Retorna a Notícias

---

## 👥 Página Comunidade

**Rota**: `/comunidade`

### Componentes

- **Descrição** — Contexto sobre relatos comunitários

- **Filtro por Categoria** — Chips selecionáveis
  - Falta de água
  - Alagamento
  - Vegetação
  - Calor Extremo
  - Outro

- **Lista de Relatos** — Cards com
  - Autor + nível de confiança (novo/confiável/baixa confiança)
  - Categoria (tag)
  - Título + descrição (truncado)
  - Data do relato
  - Número de apoios (botão: "Apoiar")
  - Status (pendente/verificado)

- **Ranking** — Relatos ordenados por apoios

- **Formulário Simulado** — Enviar novo relato
  - Seu nome
  - Município/localização
  - Categoria
  - Descrição
  - Botão "Enviar" (simulado)

### Interações

```
1. Cidadão abre Comunidade
2. Vê relatos de outras pessoas
3. Clica "Apoiar" em relato → Aumenta contador
4. Filtra por categoria → Vê apenas aquele tipo
5. Preenche formulário → Simula envio
```

---

## 📚 Página Educação

**Rota**: `/educacao`

### Componentes

- **Descrição** — "Conteúdos simples sobre clima..."

- **Filtro por Tema** — Chips selecionáveis
  - Conceitos Básicos (mudanças climáticas)
  - Riscos e Impactos
  - Mitigação
  - Adaptação
  - Recursos e Links

- **Filtro por Nível** — Chips selecionáveis
  - Comece por aqui (básico)
  - Aprofunde (intermediário)
  - Você pode fazer (ações práticas)

- **Grid de Cards** — Cada conteúdo mostra
  - Título
  - Resumo (2-3 linhas)
  - Tema + nível (tags coloridas)
  - Tempo de leitura (min)
  - Link para detalhe

### Interações

```
1. Cidadão abre Educação
2. Vê todos os 7 conteúdos
3. Filtra por tema → Reduz a lista
4. Filtra por nível → Mais específico ainda
5. Clica em card → Abre conteúdo completo
```

---

## 📚 Página Educação Detalhe

**Rota**: `/educacao/:id`

### Componentes

- **Breadcrumb** — Início > Educação > [Título]

- **Cabeçalho**
  - Título grande
  - Tema + nível (tags)
  - Tempo de leitura

- **Fundo Colorido** — Gradiente suave para melhor contraste

- **Card Branco** — Conteúdo dentro de card com sombra
  - Parágrafos do conteúdo educativo
  - Espaçamento generoso

- **Botão Voltar** — Retorna a Educação

---

## ♿ Acessibilidade em Todas as Páginas

### Alto Contraste
- Toggle em settings (localStorage)
- Ativa cores mais escuras/saturadas
- Aumenta contraste de texto

### Tamanho de Fonte
- 3 opções: Pequeno, Normal, Grande
- Aplicado globalmente
- Persistente em localStorage

### Navegação por Teclado
- Tab para navegar entre elementos
- Enter/Espaço para ativar botões
- Setas para scrollar (alguns navegadores)

### Cores + Ícones
- Nunca usa só cor para informação
- Sempre ícone + texto juntos
- ARIA labels em elementos não óbvios

---

## Status Visual (Cores)

| Status | Cor | Ícone | Significado |
|--------|-----|-------|-------------|
| Normal | 🟢 Verde | ✓ | Tudo bem |
| Atenção | 🟡 Amarelo | ⚠️ | Monitorar |
| Alerta | 🟠 Laranja | ⚠️ | Risco |
| Emergência | 🔴 Vermelho | 🚨 | Crítico |

---

## Fluxos Típicos de Uso

### Fluxo 1: Cidadão Quer Entender Situação do Seu Estado

```
1. Abre app → Home (mapa)
2. Clica no estado (ou busca)
3. Vê lista de municípios + KPIs
4. Clica em Educação → Aprende sobre clima
5. Volta para mapa → Seleciona seu município
6. Vê indicadores + alertas
7. Clica em Comunidade → Vê outros relatando
8. Apoiar relato ou enviar novo
```

### Fluxo 2: Jornalista Quer Pesquisar

```
1. Abre app → Home
2. Clica em vários estados → Compara indicadores
3. Vai a Notícias → Filtra por categoria
4. Lê notícias → Pega fontes
5. Volta ao mapa → Verifica dados específicos de município
6. Usa tudo como fundamentação para matéria
```

### Fluxo 3: Ativista Quer Mobilizar

```
1. Abre Comunidade → Vê relatos de sua região
2. Apoia relatos que faz sentido
3. Vai a Educação → Entende o problema melhor
4. Volta ao mapa → Vê status geral do estado
5. Encontra grupos no campo "Grupos" (futuro)
6. Se conecta com movimento local
```

---

## Funcionalidades Futuras (Roadmap)

- [ ] Aba "Grupos e Movimentos" — Conectar com ONGs locais
- [ ] Aba "Cobrança" — Enviar formalização de cobranças ao governo
- [ ] Mapa com fronteiras reais dos estados (IBGE)
- [ ] Dados em tempo real (API integrada)
- [ ] Ranking entre estados
- [ ] Histórico comparativo (ano a ano)
- [ ] API pública para terceiros
- [ ] App mobile (React Native)
- [ ] Notificações de alertas
