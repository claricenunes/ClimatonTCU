# 📖 Guia do Desenvolvedor - ClimAqui

## Como Rodar Localmente

### Instalação
```bash
# 1. Clone o repositório
git clone [url-do-repositorio]
cd ClimatonTCU

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

### Para Compartilhar na Rede Local
```bash
# Mostra a URL com IP + porta para outros acessarem na mesma rede
npm start
```

## Comandos Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento em http://localhost:5173
npm run build    # Build de produção (dist/)
npm run lint     # Verificar erros com OXLint
npm start        # Dev com URL compartilhável na rede local
npm run preview  # Preview da build de produção
```

## Estrutura de Pastas

```
src/
├── types/              # Interfaces TypeScript
│   └── index.ts       # Estado, Município, Noticia, Alerta, Relato, Educação
│
├── data/              # Dados mockados (pronto para API real)
│   ├── estados.ts     # Lista de estados + getter
│   ├── municipios.ts  # Dados de municípios + alertas
│   ├── noticias.ts    # Feed de notícias
│   ├── educacao.ts    # Conteúdos educativos
│   ├── comunidade.ts  # Relatos de cidadãos
│   ├── regioes.ts     # Sub-regiões (Bahia)
│   └── pilares.ts     # Pilares de ação climática
│
├── context/           # Context API
│   └── Acessibilidade # Contraste + tamanho de fonte
│
├── hooks/             # Hooks customizados
│   └── useSimulatedLoading.ts
│
├── lib/               # Utilitários
│   ├── icons.tsx      # Ícones SVG
│   ├── formatacao.ts  # Helpers de data, número
│   └── cores.ts       # Paleta de cores
│
├── components/        # Componentes React reutilizáveis
│   ├── ui/           # Base (Button, Card, FilterChips, etc)
│   ├── map/          # Mapa do Brasil
│   ├── municipio/    # Cards e detalhes de município
│   └── estado/       # Componentes de estado
│
└── pages/            # Páginas roteadas
    ├── Home.tsx              # Mapa + lista de municípios
    ├── MunicipioDetalhe.tsx  # Indicadores, alertas, relatos
    ├── Noticias.tsx          # Feed de notícias
    ├── NoticiaDetalhe.tsx    # Detalhe da notícia
    ├── Comunidade.tsx        # Relatos de cidadãos
    ├── Educacao.tsx          # Conteúdo educativo
    ├── EducacaoDetalhe.tsx   # Detalhe do conteúdo
    └── NotFound.tsx          # 404
```

## Como Adicionar Dados

### 1. Criar novo arquivo em `src/data/`

```typescript
// src/data/minhasfuncionalidades.ts
import type { TipoAqui } from "../types";

export const DADOS: TipoAqui[] = [
  {
    id: "exemplo-1",
    titulo: "Exemplo",
    // ... outros campos
  },
];

export function getById(id: string) {
  return DADOS.find((d) => d.id === id);
}
```

### 2. Importar em `src/pages/`

```typescript
import { DADOS, getById } from "../data/minhasfuncionalidades";
```

### 3. Usar no componente

```typescript
const dados = DADOS.filter(/* seu filtro */);
```

## Padrões de Código

### TypeScript
- ✅ Sem `any` — use tipos explícitos
- ✅ Interfaces em `src/types/index.ts`
- ✅ Tipos exported para reutilização

### Componentes React
- ✅ Componentes funcionais com hooks
- ✅ Nomes em português
- ✅ Props tipadas com TypeScript
- ✅ Eventos nomeados `on` (onClick, onChange)

### Estilo
- ✅ Tailwind CSS v4 (utility-first)
- ✅ Sem CSS custom (tudo em Tailwind)
- ✅ Variáveis de cor em `lib/cores.ts`
- ✅ Breakpoints: `sm:`, `md:`, `lg:`

### Exemplo Componente

```typescript
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({ children, variant = "primary", onClick }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Acessibilidade

Sempre verifique:

✅ **Alto Contraste** — Ativar em context (localStorage)
✅ **Tamanho de Fonte** — 3 opções disponíveis
✅ **Navegação por Teclado** — Tab, Enter, Espaço funcionam
✅ **Ícone + Texto** — Nunca use só cor para informação
✅ **ARIA Labels** — Para elementos não óbvios

```typescript
// Bom: ícone + texto
<button>
  <IconDelete className="size-4" />
  Deletar
</button>

// Ruim: só ícone
<button>
  <IconDelete className="size-4" />
</button>

// Bom: com ARIA
<button aria-label="Deletar item">
  <IconDelete className="size-4" />
</button>
```

## Como Testar Antes de Fazer PR

```bash
# 1. Verificar tipos
npm run build

# 2. Verificar linting
npm run lint

# 3. Testar no navegador
npm run dev
# Abrir http://localhost:5173

# 4. Testar acessibilidade
# - Ativar alto contraste (settings)
# - Navegar só com teclado (Tab + Enter)
# - Verificar contraste de cores
```

## Estrutura de Roteamento

```typescript
// App.tsx usa React Router
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/municipio/:id" element={<MunicipioDetalhe />} />
  <Route path="/noticias" element={<Noticias />} />
  <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
  <Route path="/comunidade" element={<Comunidade />} />
  <Route path="/educacao" element={<Educacao />} />
  <Route path="/educacao/:id" element={<EducacaoDetalhe />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Variáveis de Ambiente

Criar arquivo `.env.local` (não commitar):

```
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

Usar no código:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Debug

### Console
```typescript
console.log("valor:", valor); // Log simples
console.table(array);          // Tabela
console.time("label");         // Cronômetro
```

### React DevTools
- Instale extensão Chrome/Firefox
- Inspecione componentes, props, hooks

### Lighthouse
- Abra DevTools → Lighthouse
- Rode audit (Performance, Accessibility, Best Practices)

## Dúvidas Comuns

**P: Como adicionar novo estado?**
A: Criar novo arquivo `src/data/municipios_ESTADO.ts` e importar em Home.tsx

**P: Como mudar a paleta de cores?**
A: Editar `lib/cores.ts` ou Tailwind config (prefira cores.ts)

**P: Posso usar CSS custom?**
A: Não, use Tailwind. Se precisar algo especial, veja se Tailwind já tem.

**P: Como testar em outro device?**
A: Use `npm start` que mostra URL da rede local
