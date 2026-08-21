# SituaMap Brasil

Protótipo clicável de uma plataforma de acompanhamento da situação climática dos estados e municípios do Brasil. Sem backend: os dados são mockados em `src/data/`, com uma estrutura pensada para receber uma API/base de dados real no futuro sem mudanças na camada de apresentação. A Bahia é o piloto com maior nível de detalhamento (municípios reais, alertas, sub-regiões); os demais 26 estados + DF têm cobertura mínima (capital + uma cidade) para que o mapa nacional já seja totalmente navegável.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- React Router 7
- [`@svg-maps/brazil`](https://www.npmjs.com/package/@svg-maps/brazil) — geometria real dos 26 estados + DF (CC-BY-4.0)

## Rodando o projeto

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  types/        modelos de dados (Estado, Município, Alerta, Notícia, Relato, Conteúdo educativo...)
  data/         dados mockados, isolados da camada de apresentação
  context/      preferências de acessibilidade (contraste, tamanho de fonte)
  hooks/        agregações derivadas dos dados (status por estado, loading simulado)
  lib/          ícones SVG e helpers de formatação/estilo
  components/   UI reutilizável, layout, mapa (Brasil) e componentes de município
  pages/        telas roteadas (Home, Município, Notícias, Comunidade, Educação)
```

## Páginas

- **SituaMap (`/`)** — mapa interativo do Brasil por estado (clique, busca/dropdown, teclado), indicadores gerais e lista de municípios filtrável por estado e situação.
- **Município (`/municipio/:id`)** — indicadores, alertas ativos e relatos da comunidade para um município.
- **Notícias (`/noticias`)** — atualizações filtráveis por categoria.
- **Comunidade (`/comunidade`)** — relatos de moradores, com formulário simulado de envio.
- **Educação (`/educacao`)** — conteúdos explicativos sobre clima e convivência com a seca.

## O mapa

Cada UF é um `<path>` independente (geometria real via `@svg-maps/brazil`), colorido pela situação climática predominante entre seus municípios monitorados. Clique, tecla Enter/Espaço com foco no estado, ou o campo de busca por nome/sigla selecionam o estado — todos atualizam o mesmo estado React (`selectedUf`) em `pages/Home.tsx`, que por sua vez filtra a lista de municípios e recalcula os KPIs. O tooltip acompanha o estado focado/sob o cursor via `getBoundingClientRect`.

## Acessibilidade

Alto contraste e tamanho de fonte ajustável (persistidos em `localStorage`), navegação por teclado no mapa e nos filtros, estados de carregamento/vazio/erro, e uso de ícone + texto em todos os indicadores de status (nunca só cor).
