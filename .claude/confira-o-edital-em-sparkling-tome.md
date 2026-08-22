# Relatório comparativo: projeto vs. Edital ClimatonBrasil 2026

> **Isto não é um plano de implementação.** O usuário pediu para eu conferir o edital,
> comparar com o projeto atual e dar notas — sem mudar nada no código ou na estrutura.
> Este arquivo é o relatório final que será apresentado como texto na resposta ao
> usuário; nenhuma ação de escrita no projeto está planejada.

## Contexto

O usuário pediu para eu ler `docs/Edital_ClimatonBrasil_retificado.pdf` (o edital oficial
do TCU para o hackathon ClimatonBrasil 2026) e comparar com o estado atual do projeto
ClimAqui Brasil / Central de Dados, apontando o que está bom e o que precisa melhorar
conforme os critérios do edital — sem alterar nada no projeto agora. Investiguei via dois
agentes de exploração paralelos: um focado em rastrear se os dados exibidos vêm
realmente do Painel ClimaBrasil (PCB) ou são simulados, outro em mapear a estrutura
geral do projeto (páginas, documentação, uso de IA declarado, cobertura por estado,
acessibilidade, exportação de dados).

## O que o edital exige (resumo dos pontos que mais importam para avaliar o projeto)

- **5.4.1 — obrigatório usar dados do Painel ClimaBrasil (PCB)**: soluções que não usem
  esses dados são desclassificadas.
- **5.1 — a apresentação final deve conter**: demo prática (solução funcional/protótipo/MVP),
  descrição do problema público, identificação do público usuário, descrição de como os
  dados do PCB foram usados, e explicação do potencial de implementação prática.
- **5.8 — critérios de nota**: Impacto 30%, Qualidade da solução 25% (inclui "uso
  estratégico dos dados do Painel ClimaBrasil"), Aplicabilidade 20%, Inovação e
  criatividade 15%, Qualidade da apresentação 10%.
- **2.3 — perguntas norteadoras**: (I) como usar os dados do PCB para empoderar cidadãos
  a cobrar ações climáticas mais efetivas; (II) como usar os dados, na prática, para
  melhorar/acompanhar/avaliar políticas públicas climáticas.
- **8.2/8.3 — uso de IA**: permitido, mas equipes vencedoras devem declarar quais
  ferramentas de IA usaram e como, mantendo autoria intelectual dos participantes.

## O que está bom (alinhado com o edital)

1. **O projeto realmente usa dados reais do PCB — não é conceitual.** A seção
   "Diagnóstico da ação climática estadual" (`src/data/avaliacaoClimatica.ts`) foi
   conferida item a item: é cópia fiel (mesmo `id`, `pontuacao`, texto de `comentario`)
   das linhas da Bahia em `docs/amostra-apresentacao-ba-mg.csv`, que por sua vez é um
   recorte de `docs/pcb-dados-limpos.csv` (o CSV limpo do Painel ClimaBrasil). Isso
   satisfaz o requisito não-negociável do item 5.4.1 — o projeto não corre risco de
   desclassificação por "não usar dados do PCB".
2. **Responde diretamente às duas perguntas norteadoras (2.3).** Pergunta I
   (empoderar cidadão a cobrar do governo) → páginas Relatos, Comunidade (canais de
   denúncia/ouvidorias reais) e a nova seção "Encontre um grupo de mobilização".
   Pergunta II (acompanhar/avaliar políticas) → Central de Dados: navegação por
   eixo/componente/item com evidência de auditoria, gráficos de distribuição por
   estágio, exportação de dados.
3. **Cobre vários formatos priorizados no item 2.4**: dashboard/plataforma digital (I),
   visualização e interpretação de dados (III), mecanismo de controle social via canais
   de denúncia (IV), ferramenta analítica aplicada (VII), sistema de acompanhamento de
   indicadores (VIII).
4. **MVP funcional de verdade, não só conceito** — satisfaz 5.1.I e evita a rejeição
   automática do item 5.4.1 ("não serão aceitas soluções exclusivamente conceituais").
   É um app React completo, clicável, com 9 páginas navegáveis.
5. **Exportação de dados (CSV/JSON) e visualizações (pizza, rosca, ranking, barras com
   hover detalhado)** reforçam diretamente "ampliar transparência" e "facilitar
   acesso/interpretação de dados públicos" (2.2.I e II) — e mostram esforço técnico
   real para o critério "Qualidade da solução".
6. **Acessibilidade de verdade**: escala de fonte (4 níveis), alto contraste, navegação
   por teclado, atributos ARIA — vai ao encontro da própria aspiração do edital em 8.10
   e é um diferencial defensável em "Inovação" ou "Qualidade da solução".
7. **Segmentação clara de público**: Central de Dados para gestores, Relatos/Comunidade
   para cidadãos, Notícias/Educação para o público geral — conecta bem com a diversidade
   de perfis de participantes descrita em 3.2 e com "apoiar cidadãos, pesquisadores e
   gestores públicos" (2.2.III).

## O que precisa melhorar (riscos e lacunas)

1. **[Prioridade alta] O rodapé afirma uma fonte de dados errada.** `Footer.tsx` diz
   *"os dados exibidos são reais, coletados a partir da plataforma Climate Scanner"* —
   isso nunca menciona o Painel ClimaBrasil/TCU em lugar nenhum visível do app, e atribui
   os dados reais a uma plataforma externa não relacionada. Como o item 5.1.IV exige que
   a apresentação final descreva explicitamente o uso dos dados do PCB, e a banca é do
   próprio TCU (que vai reconhecer o dataset), essa contradição é um risco real de
   credibilidade — mesmo sem mudar o código agora, vale corrigir esse texto antes da
   apresentação e garantir que o pitch credite o Painel ClimaBrasil corretamente.
2. **[Prioridade alta] O uso de dados do PCB está concentrado em 1 de ~9 páginas.**
   A home, o mapa, os cards de município, notícias e relatos — a primeira impressão do
   app — são inteiramente fabricados (dados aleatórios com seed ou inventados à mão), sem
   nenhuma relação com o PCB. Só "Central de Dados" usa dados reais. Como "Qualidade da
   solução" (25%) pesa explicitamente o "uso estratégico dos dados do Painel ClimaBrasil",
   ter o uso real concentrado numa aba secundária dilui o argumento central da solução.
3. **[Prioridade alta] Dado real do PCB existe para todos os 27 estados, mas só a Bahia
   foi usada.** `docs/pcb-dados-limpos.csv` tem 4.877 linhas cobrindo todos os estados;
   o app só transcreveu manualmente as 44 linhas da Bahia. Como "Impacto" é o critério de
   maior peso (30%) e mede "fortalecer políticas públicas" e "potencial de utilização
   institucional", uma ferramenta limitada a 1 estado é bem menos convincente que uma
   cobrindo vários — inclusive os estados já identificados como melhores/piores no ranking
   em `docs/contexto-projeto-mapa-climatico.md` (SP/MA/MG bem avaliados; RR/DF/RO mal
   avaliados). Essa é provavelmente a melhoria de maior retorno, e o CSV já está limpo,
   só falta carregá-lo.
4. **[Prioridade média] Nenhum uso de IA está declarado em lugar nenhum.** O item 8.2
   exige que equipes vencedoras declarem quais ferramentas de IA usaram e como. Não há
   nada disso hoje (nem no README, nem em `docs/`). Vale preparar essa declaração com
   antecedência para não virar um aperto de última hora se a equipe for premiada.
5. **[Prioridade baixa] O "Assistente ClimAqui" é um FAQ com respostas fixas, não uma IA
   de verdade.** Não é um problema de conformidade, mas se um avaliador testar esperando
   uma IA real ao vivo, pode parecer raso — vale gerenciar a expectativa na fala.
6. **[Prioridade média] Falta um roteiro objetivo de apresentação cobrindo os 4 pontos do
   item 5.1** (problema público, público usuário, uso dos dados do PCB, potencial de
   implementação) — a equipe terá só 3 minutos (item 5.2), então vale ensaiar essas 4
   respostas de forma direta antes do dia.
7. **[Prioridade baixa] Exportação em Excel está anunciada na interface (`DownloadCard`
   suporta o formato `excel`) mas não está de fato implementada** — só CSV e JSON
   funcionam. Pequeno ponto de polimento que pode aparecer se um avaliador testar ao vivo.
8. **[Prioridade baixa] O potencial de implementação institucional não está articulado
   como narrativa em lugar nenhum.** Os canais de denúncia reais e o formato "JSON API"
   da exportação já sugerem um caminho de integração institucional, mas isso está
   implícito — vale transformar em uma frase explícita no pitch (ex: "esta ferramenta
   poderia ser adotada por tribunais de contas estaduais como painel de acompanhamento").

## Nota geral (minha leitura, não uma pontuação oficial)

O projeto **cumpre o requisito mínimo não-negociável** (usa dados reais do PCB, tem MVP
funcional, não é conceitual) e tem pontos fortes genuínos em acessibilidade, visualização
de dados e cobertura de múltiplos públicos. O maior risco não é desclassificação — é
**deixar pontos na mesa nos dois critérios de maior peso** (Impacto 30% e Qualidade da
solução 25%) por ter o uso do PCB restrito a Bahia e mal-atribuído no rodapé. As duas
melhorias de maior alavancagem, se a equipe decidir agir antes da apresentação, seriam:
(a) corrigir a atribuição da fonte de dados no rodapé/pitch, e (b) expandir a cobertura
do PCB para mais alguns estados usando o CSV que já está limpo e parado em `docs/`.

## Verificação

Nenhuma — este é um relatório de leitura, não uma mudança de código. As descobertas
foram verificadas por dois agentes de exploração lendo diretamente os arquivos fonte
(`src/data/avaliacaoClimatica.ts`, `docs/pcb-dados-limpos.csv`, `src/App.tsx`,
`src/components/layout/Footer.tsx`, `README.md`, `docs/contexto-projeto-mapa-climatico.md`,
entre outros) e citando os caminhos exatos.
