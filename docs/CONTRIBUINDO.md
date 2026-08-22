# 🤝 Como Contribuir - ClimAqui

Obrigado por querer ajudar a melhorar ClimAqui! Este documento guia como contribuir com código, dados ou ideias.

## Tipos de Contribuição

### 1. 🐛 Reportar Bugs

Encontrou um problema? Abra uma Issue no GitHub com:

**Título**: Breve descrição do bug
```
Ex: "Mapa não carrega em dispositivo móvel"
```

**Descrição**: 
```markdown
## O que esperava
O mapa deveria carregar normalmente no iPhone

## O que aconteceu
Mapa fica em branco, não carrega os estados

## Como reproduzir
1. Abrir app no iPhone (Safari)
2. Esperar 3 segundos
3. Ver que mapa não aparece

## Logs
[Adicione console errors se tiver]

## Ambiente
- Dispositivo: iPhone 12
- Navegador: Safari 15
- OS: iOS 15.1
```

---

### 2. 💡 Sugerir Funcionalidades

Tem uma ideia legal? Abra uma Discussion ou Issue:

**Título**: Sua ideia em 1 frase
```
Ex: "Adicionar gráfico de tendência histórica de seca"
```

**Descrição**:
```markdown
## O que você quer fazer
Mostrar gráfico com série histórica dos últimos 5 anos de índice de seca

## Por que é importante
Cidadão consegue ver se está piorando ou melhorando, não só o status atual

## Como funcionaria
- Página Município teria aba "Histórico"
- Mostraria gráfico com linha do índice de seca ano a ano
- Permitiria comparar com outros municípios
```

---

### 3. 🛠️ Contribuir com Código

#### Pré-requisitos
- Node.js 16+
- Git
- Conhecimento básico de React + TypeScript

#### Workflow

**1. Fork e Clone**
```bash
# Fork via GitHub
# Clone seu fork
git clone https://github.com/SEU-USUARIO/ClimatonTCU.git
cd ClimatonTCU

# Adicione upstream
git remote add upstream https://github.com/USUARIO-ORIGINAL/ClimatonTCU.git
```

**2. Create Branch**
```bash
# Sempre crie branch para sua feature/fix
git checkout -b feature/sua-funcionalidade
# ou
git checkout -b fix/seu-bug
```

**3. Faça Mudanças**

Siga os padrões de código (ver Padrões de Código abaixo)

**4. Teste Localmente**
```bash
npm install
npm run dev
# Abrir http://localhost:5173
# Testar sua mudança
```

**5. Commit**
```bash
git add .
git commit -m "Descrição clara do que mudou"
# Exemplo: "feat: adicionar filtro de categoria em notícias"
```

**6. Push**
```bash
git push origin feature/sua-funcionalidade
```

**7. Abra Pull Request**

No GitHub, você verá um botão "Compare & pull request". Clique e preencha:

**Título**: Breve e descritivo (max 70 chars)
```
Ex: "Add category filter to news feed"
```

**Descrição**:
```markdown
## What does this PR do?
Adiciona filtro por categoria na página de notícias (seca, chuvas, política pública, etc)

## Why?
Cidadão consegue focar nas notícias que importam para ele

## Changes
- [ ] New component `FilterChips` in `components/ui/FilterChips.tsx`
- [ ] Update `Noticias.tsx` to use filter
- [ ] Add categories to news data

## Testing
- [ ] Filtro funciona ao clicar (mobile + desktop)
- [ ] Filtro persiste ao recarregar página? [Sim/Não]
- [ ] Nenhuma notícia quebrada

## Accessibility
- [ ] Navegação por teclado (Tab) funciona
- [ ] Alto contraste ativado — ainda legível?
```

---

## Padrões de Código

### TypeScript

✅ **Bom**
```typescript
interface MunicipioDados {
  id: string;
  nome: string;
  status: StatusClimatico;
}

export function MunicipioCard({ municipio }: { municipio: MunicipioDados }) {
  return <div>{municipio.nome}</div>;
}
```

❌ **Ruim**
```typescript
// Sem tipos explícitos
export function MunicipioCard(municipio: any) {
  return <div>{municipio.nome}</div>;
}
```

### Nomes em Português

✅ **Bom**
```typescript
const municipiosFiltrados = municipios.filter(m => m.status === status);
```

❌ **Ruim**
```typescript
const filtered = municipios.filter(m => m.status === status);
```

### Componentes React

✅ **Bom**
```typescript
interface BotaoProps {
  label: string;
  onClick: () => void;
  variante?: "primaria" | "secundaria";
}

export function Botao({ label, onClick, variante = "primaria" }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      className={variante === "primaria" ? "bg-blue-600" : "bg-gray-300"}
    >
      {label}
    </button>
  );
}
```

### Tailwind CSS

✅ **Bom**
```tsx
<div className="px-4 py-2 rounded-lg bg-blue-600 text-white">
  Conteúdo
</div>
```

❌ **Ruim**
```tsx
<div style={{ padding: "8px 16px", borderRadius: "8px", backgroundColor: "blue" }}>
  Conteúdo
</div>
```

### Acessibilidade

✅ **Bom**
```tsx
<button aria-label="Deletar município">
  <IconDelete className="size-4" />
  Deletar
</button>
```

❌ **Ruim**
```tsx
<button>
  <IconDelete className="size-4" />
</button>
```

---

## Checklist Antes de Fazer PR

- [ ] Código segue padrões (TypeScript, nomes em português, etc)
- [ ] Sem erros de lint: `npm run lint`
- [ ] Build sem warnings: `npm run build`
- [ ] Testei localmente: `npm run dev`
- [ ] Acessibilidade testada:
  - [ ] Navegação por teclado (Tab, Enter, Espaço)
  - [ ] Alto contraste ativado — ainda legível?
  - [ ] Ícone + texto (nunca só cor)
- [ ] Arquivos irrelevantes não estão no commit (.env, node_modules, etc)
- [ ] Commit message é clara

---

## Adicionando Dados

Quer adicionar novo município ou notícia?

### 1. Novo Município

**Arquivo**: `src/data/municipios.ts`

```typescript
const MUNICIPIOS_BA: Municipio[] = [
  // ... existentes
  {
    id: "novo-municipio",
    nome: "Novo Município",
    estadoUf: "BA",
    regiaoId: "regiao-id",
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
    resumo: "Descrição breve",
  },
];
```

### 2. Nova Notícia

**Arquivo**: `src/data/noticias.ts`

```typescript
export const NOTICIAS: Noticia[] = [
  // ... existentes
  {
    id: "noticia-001",
    titulo: "Título da notícia",
    resumo: "Resumo em 1-2 linhas",
    conteudo: [
      "Parágrafo 1...",
      "Parágrafo 2...",
    ],
    categoria: "seca",
    data: "2026-08-21",
    fonte: "G1",
    tempoLeituraMin: 5,
  },
];
```

---

## Código de Conduta

- Seja respeitoso
- Não spam
- Sem conteúdo discriminatório ou ofensivo
- Foco em colaboração

---

## Dúvidas?

- Leia [GUIA_DESENVOLVEDORA.md](GUIA_DESENVOLVEDORA.md) para setup
- Leia [ARQUITETURA.md](ARQUITETURA.md) para entender o projeto
- Abra uma Discussion se tiver dúvida
- Comente na Issue se travar

---

**Obrigado por contribuir! 🙏**
