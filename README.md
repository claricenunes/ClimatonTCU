# ClimAqui Brasil

Plataforma web que traduz os dados oficiais de auditoria do **Painel ClimaBrasil (TCU)** sobre ação climática estadual em linguagem acessível, e conecta esse diagnóstico a canais reais de participação — denúncia, mobilização e educação. Sem backend: os dados são mockados em `src/data/`, com uma estrutura pensada para receber uma API/base de dados real no futuro sem mudanças na camada de apresentação.

A Bahia é o piloto com maior nível de detalhamento (municípios reais, alertas, sub-regiões, canais de denúncia, organizações locais). Na **Central de Dados**, a avaliação de auditoria do TCU já cobre dados reais de Bahia e Minas Gerais — os demais 26 estados + DF têm cobertura mínima (capital + uma cidade) para que o mapa nacional já seja totalmente navegável.

🔗 **Acesso**: [claricenunes.github.io/ClimatonTCU](https://claricenunes.github.io/ClimatonTCU/)
📘 **Manual da solução**: [docs/ClimAqui-Brasil-Manual-da-Solucao.pdf](docs/ClimAqui-Brasil-Manual-da-Solucao.pdf)

## Stack

### Runtime
- **React 19** — biblioteca de UI com renderização reativa
- **React DOM 19** — integração React com o DOM
- **React Router 7** — roteamento e navegação entre páginas
- **TypeScript ~6.0** — tipagem estática e verificação em tempo de desenvolvimento

### Construção & Desenvolvimento
- **Vite 8** — build tool e dev server rápido
- **Vite Plugin React 6** — suporte JSX otimizado para Vite
- **Tailwind CSS 4** — framework CSS utility-first para estilização
- **Tailwind CSS Vite 4** — integração Tailwind com Vite

### Qualidade & Linting
- **OXLint 1.75** — linter JavaScript/TypeScript rápido e zero-config
- **TypeScript Compiler** — verificação de tipos durante build

### UI & Dados
- **[@svg-maps/brazil](https://www.npmjs.com/package/@svg-maps/brazil) 2.0** — geometria real dos 26 estados + DF (CC-BY-4.0)

### Ferramentas de Desenvolvimento
- **@types/react** — type definitions para React
- **@types/react-dom** — type definitions para React DOM
- **@types/node** — type definitions para Node.js (suporte ao TypeScript)

## Rodando o projeto

```bash
npm install
npm run dev
```

## Deploy

Publicado no GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`): a cada push na `main`, o workflow roda lint + verificação de tipos, builda o projeto e publica o resultado na branch `gh-pages`. O `vite.config.ts` só aplica o `base: '/ClimatonTCU/'` no build de produção (dev local continua em `/`), e `public/404.html` + o script em `index.html` implementam o fallback padrão de SPA para GitHub Pages, para que rotas internas (ex: `/central-dados`) funcionem em acesso direto ou F5.

## Estrutura

```
src/
  types/        modelos de dados (Estado, Município, Alerta, Notícia, Relato, Conteúdo educativo, Avaliação climática...)
  data/         dados mockados e dados reais de auditoria (TCU), isolados da camada de apresentação
  context/      preferências de acessibilidade (contraste, tamanho de fonte) e estado global (estado selecionado)
  hooks/        agregações derivadas dos dados (status por estado, loading simulado)
  lib/          ícones SVG e helpers de formatação/estilo/avaliação climática
  components/   UI reutilizável, layout, mapa (Brasil), componentes de município e da Central de Dados
  pages/        telas roteadas (Home, Município, Notícias, Comunidade, Relatos, Educação, Central de Dados)
```

## Páginas

- **ClimAqui (`/`)** — mapa interativo do Brasil por estado (clique, busca/dropdown, teclado), indicadores gerais e lista de municípios filtrável por estado e situação.
- **Município (`/municipio/:id`)** — indicadores, alertas ativos e relatos da comunidade para um município.
- **Notícias (`/noticias`)** — atualizações filtráveis por categoria.
- **Comunidade (`/comunidade`)** — grupos de mobilização e organizações locais (com mapa de localização e cadastro), e canais oficiais de denúncia por estado.
- **Relatos (`/relatos`)** — relatos de moradores sobre a situação climática local, com apoio, compartilhamento e formulário de envio.
- **Educação (`/educacao`)** — conteúdos explicativos sobre clima, filtráveis por tema e nível de profundidade.
- **Central de Dados (`/central-dados`)** — avaliação de auditoria do TCU (Painel ClimaBrasil) por eixo/componente/item, com evidências, gráficos de distribuição, comparação Bahia × Minas Gerais nos indicadores com maior gap, e exportação de dados (CSV/JSON).

## O mapa

Cada UF é um `<path>` independente (geometria real via `@svg-maps/brazil`), colorido pela situação climática predominante entre seus municípios monitorados. Clique, tecla Enter/Espaço com foco no estado, ou o campo de busca por nome/sigla selecionam o estado — todos atualizam o mesmo estado React (`selectedUf`) em `pages/Home.tsx`, que por sua vez filtra a lista de municípios e recalcula os KPIs. O tooltip acompanha o estado focado/sob o cursor via `getBoundingClientRect`.

## Acessibilidade

Alto contraste e tamanho de fonte ajustável (persistidos em `localStorage`), navegação por teclado no mapa e nos filtros, estados de carregamento/vazio/erro, e uso de ícone + texto em todos os indicadores de status (nunca só cor). Um assistente virtual flutuante (`AiHelperWidget`) oferece respostas prontas e atalhos de navegação para dúvidas comuns sobre a plataforma.

## Documentação

Documentação adicional em [`docs/`](docs/):

- [ARQUITETURA.md](docs/ARQUITETURA.md) — visão geral da arquitetura e fluxo de dados
- [FUNCIONALIDADES.md](docs/FUNCIONALIDADES.md) — detalhamento de cada página e fluxo de uso
- [DADOS.md](docs/DADOS.md) — origem e estrutura dos dados (Painel ClimaBrasil/TCU)
- [GUIA_DESENVOLVEDORA.md](docs/GUIA_DESENVOLVEDORA.md) — guia para rodar e desenvolver localmente
- [CONTRIBUINDO.md](docs/CONTRIBUINDO.md) — como contribuir com código, dados ou ideias
- [ClimAqui-Brasil-Manual-da-Solucao.pdf](docs/ClimAqui-Brasil-Manual-da-Solucao.pdf) — manual da solução (quando e como usar cada funcionalidade, por perfil de usuário)

## Uso de Inteligência Artificial

Este projeto foi desenvolvido com apoio de assistentes de IA (Claude, da Anthropic) como
par de programação ao longo de todo o desenvolvimento — geração e revisão de código,
componentes de UI, organização dos dados e diagnóstico/correção de bugs. Todas as
decisões de produto, design e priorização foram definidas e revisadas pela equipe; a
IA atuou como ferramenta de execução sob orientação humana, nunca de forma autônoma.
