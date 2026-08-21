# Contexto do projeto — Mapa climático interativo por estado

## 1. Origem dos dados

Planilha `pcb-dados-limpos.xlsx`, acessada via Google Drive, aba **"Dados Limpos"**.

- **2.375 linhas**, 13 colunas
- Cobre **51 entidades**: 27 estados, 25 municípios e o Distrito Federal
- Cada entidade é avaliada em **3 eixos**, divididos em **15 componentes**, cada um com vários itens (A, B, C...)

| Coluna | Descrição |
|---|---|
| ID | Identificador único do item avaliado |
| Eixo | Financiamento / Governança / Políticas públicas |
| Data da Avaliação | Data em que o item foi avaliado (ago–out/2025) |
| Tipo de Entidade | Estado / Município / Distrito Federal |
| Entidade | Nome do estado, município ou "consolidado" |
| Componente | Código do componente (F1–F3, G1–G7, P1–P5) |
| Item | Subitem dentro do componente (A, B, C...) |
| Estágio | Sem progresso / Inicial / Intermediário / Avançado |
| Pontuação | Nota numérica derivada do estágio |
| Comentário / Justificativa | Texto livre explicando a nota |

**Mapeamento Estágio → Pontuação:**

| Estágio | Pontuação |
|---|---|
| Sem progresso | sem nota (NaN) |
| Estágio inicial | 0,333 |
| Estágio intermediário | 0,666 |
| Estágio avançado | 1,000 |

**Atenção:** há linhas de `"Estados consolidados"` e `"Municípios consolidados"` que trazem médias agregadas em escala de 0–100 (diferente da escala 0–1 das entidades individuais). Essas linhas devem ser excluídas de qualquer ranking por entidade.

## 2. Principais achados da análise exploratória

- **Financiamento é o eixo mais fraco no Brasil** — 40,7% dos itens desse eixo estão em "sem progresso", contra 19,5% em Governança.
- Componentes mais críticos nacionalmente: **F3 (54,9% sem progresso)**, **P2 (48%)**, **F1 (39,7%)**.
- **Ranking de estados (pontuação geral média, excluindo linhas consolidadas):**
  - Melhores: São Paulo (0,93), Maranhão (0,85), Minas Gerais (0,83), Pará (0,76), Acre (0,76)
  - Piores: Roraima (0,42), Distrito Federal (0,50), Rondônia (0,50), Paraíba (0,51), Amazonas (0,53)
- Estados têm desempenho um pouco melhor que municípios em Financiamento e Governança; municípios saem à frente em Políticas Públicas.

## 3. Referência de inspiração

Site indicado como referência de estilo/interação: **Acelera Globe** (`resultados.aceleradev.com.br`) — conceito de visualização geográfica com pontos clicáveis que abrem painéis de detalhe.

## 4. Conceito do produto

Um mapa do Brasil onde:
1. **Cada estado é representado por um ponto** no mapa, posicionado na coordenada geográfica real da capital.
2. **A cor do ponto** reflete a pontuação geral do estado (vermelho = baixa, amarelo = média, verde = alta).
3. **Ao clicar em um estado**, abre um painel lateral com **3 ícones**, um por eixo:
   - 💰 Financiamento
   - 🏛 Governança
   - 📄 Políticas públicas
   Cada ícone mostra a pontuação daquele eixo para o estado selecionado.
4. **Ao clicar em um ícone de eixo**, ele expande (acordeão) e mostra a **lista de componentes** daquele eixo (ex: F1, F2, F3 para Financiamento), cada um com sua barra de progresso individual.

### Hierarquia de navegação

```
Mapa do Brasil
  └─ Clique no estado
       └─ Painel: 3 ícones de eixo (Financiamento / Governança / Políticas públicas)
            └─ Clique no ícone → expande lista de componentes (F1, G3, P2...)
                 └─ (próximo nível possível) Clique no componente → itens (A, B, C) + comentário/justificativa completo
```

## 5. Protótipos já construídos (nesta conversa)

1. **V1** — mapa de pontos + painel com barras dos 3 eixos ao clicar no estado.
2. **V2** (versão atual) — mapa de pontos + painel com **ícones de eixo em acordeão**, expandindo para lista de componentes com barra de progresso individual.

Em ambos, os pontos foram posicionados usando coordenadas reais (lat/lon) das capitais dos estados, mas **sem o contorno/fronteira dos estados desenhado** — ainda não foi encontrada uma fonte de dados geográficos (GeoJSON/TopoJSON) do Brasil acessível nos domínios liberados para fetch nesta sessão.

## 6. Decisões de design em aberto

- **Contorno do mapa**: buscar malha oficial do IBGE (`servicodados.ibge.gov.br/api/v3/malhas`) ou pacote `geobr` para desenhar as fronteiras reais dos estados, em vez de pontos soltos.
- **Codificação de cor do ponto no mapa**: pontuação geral (atual) vs. mapa neutro com cor só no painel de detalhe.
- **Ordem dos eixos no acordeão**: fixa vs. ordenada por criticidade (pior eixo primeiro).
- **Tratamento de itens "sem dado"**: atualmente aparecem em cinza/"sem dado" — avaliar se merece destaque visual (ex: ícone de alerta).
- **Nível de drill-down**: hoje vai até componente; decidir se abre também o comentário/justificativa de texto livre por item.
- **Comparação entre estados**: modo de selecionar 2–3 estados lado a lado (ainda não prototipado).

## 7. Stack técnica sugerida (para versão de produção)

- **Frontend**: React + D3.js (para o mapa com projeção geográfica real) ou Mapbox GL
- **Dados geográficos**: malha do IBGE (GeoJSON/TopoJSON) para fronteiras estaduais
- **Dados da planilha**: converter para JSON estático ou servir via API simples (os dados já foram extraídos e limpos em Python/pandas nesta conversa)
- **Interações**: clique no estado → painel lateral; clique no ícone de eixo → acordeão expansível

## 8. Arquivos gerados nesta conversa

- `planilha.xlsx` — cópia local da planilha original baixada do Drive
- `states_axes.csv` — pontuação média por estado e eixo
- `components_by_state.json` / `components_final.json` — pontuação por estado, eixo e componente (usado nos protótipos)
