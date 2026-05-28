# Padrões do Projeto Forbody-V2

Documento interno para padronização de commits, organização e fluxo de desenvolvimento.

---

## Estrutura de Commits

Seguir o padrão **Conventional Commits** para mensagens consistentes e rastreáveis.

### Tipos de Commit

```
feat:     nova funcionalidade
fix:      correção de bug
refactor: reorganização estrutural
style:    ajustes visuais/UI
docs:     documentação
chore:    tarefas auxiliares/setup
perf:     melhoria de performance
```

### Exemplos Práticos

```bash
feat: create admin site structure
feat: add admin themes section
fix: isolate admin login layout
refactor: separate admin panel route groups
style: improve unit page visuals
docs: add project standards
chore: redeploy admin env fix
perf: optimize carousel loading
```

### Formato Completo

```
<tipo>: <descrição curta>

<corpo opcional - detalhes da alteração>

<rodapé opcional - referências ou breaking changes>
```

---

## Regras do Projeto

### 1. Estrutura Antes de Funcionalidade
- Sempre planejar a arquitetura antes de implementar
- Criar layouts e estrutura visual primeiro
- Funcionalidades são adicionadas posteriormente

### 2. Build Obrigatório Antes de Commit
- Rodar `npm run build` é não-negociável
- Nunca commitar com build quebrado
- Validar TypeScript antes de push

### 3. Fluxo de Validação
Antes de alterações estruturais ou grandes:
```bash
npm run build
git status
git diff
```

### 4. Proteção de Áreas Críticas
- **Login/Admin**: validar múltiplas vezes antes de alterar
- Testar manual em browser antes de push
- Documentar qualquer mudança em auth/middleware

### 5. App Router: Route Groups
- Usar Route Groups `(groupName)` para organização
- Exemplo: `app/admin/(panel)/`
- Não afeta URL, melhora organização

### 6. Padrão Visual ForBody

#### Cores Principais
- **Fundo**: #0a0a0a (preto profundo) / #111 (container principal)
- **Primária**: #e30613 (vermelho ForBody)
- **Texto**: #ffffff (branco) / #ccc (cinza claro) / #999 (cinza médio)
- **Borderline**: border-white/10 ou border-red-600/20

#### Componentes Reutilizáveis
- `Button`: variantes b2c-primary, b2b-primary, b2b-outline, unit-primary, ghost
- `Card`: variantes b2c-explosive, b2b-luxury, unit-clean

#### Princípios
- Mobile First (responsive design)
- Dark mode premium
- Detalhes vermelhos em hover/focus
- Tipografia bold e uppercase para destaque

---

## Fluxo Padrão de Desenvolvimento

### Passo a Passo

```
1. Alterar código
   ↓
2. Testar localmente (npm run dev se necessário)
   ↓
3. Executar build (npm run build)
   ↓
4. Verificar status (git status)
   ↓
5. Revisar mudanças (git diff)
   ↓
6. Fazer commit (git add + git commit)
   ↓
7. Push para main (git push origin main)
```

### Comandos Essenciais

```bash
# Desenvolvimento
npm run dev

# Validação antes de commit
npm run build

# Git workflow
git status
git diff
git add <arquivo>
git commit -m "tipo: descrição"
git push origin main

# Verificação de histórico
git log --oneline -5
```

---

## Estrutura de Diretórios

```
src/
├── app/                    # App Router Next.js
│   ├── admin/              # Admin base
│   │   ├── (panel)/        # Route Group admin
│   │   │   ├── site/       # Gerenciador de site
│   │   │   ├── settings/   # Configurações
│   │   │   ├── marketing/  # Marketing
│   │   │   ├── reviews/    # Reviews
│   │   │   └── users/      # Usuários
│   │   ├── login/          # Login
│   │   └── logout/         # Logout
│   ├── franquias/          # Franquias públicas
│   └── unidades/           # Unidades públicas
├── components/             # Componentes React
│   ├── ui/                 # UI components (Button, Card, etc)
│   ├── layout/             # Layout components
│   └── sections/           # Page sections
├── actions.ts              # Server Actions
├── api.ts / api.service.ts # API integration
├── database.types.ts       # Tipos Supabase
└── utils.ts                # Utilitários
```

---

## Checklist de Commit

Antes de fazer commit, verificar:

- [ ] Build passa (`npm run build`)
- [ ] Não há console.log ou código de debug
- [ ] TypeScript sem erros
- [ ] Componentes reutilizáveis quando possível
- [ ] Padrão visual ForBody mantido
- [ ] Commit message segue Conventional Commits
- [ ] Git diff revisar mudanças

---

## Áreas de Atenção

### ✋ Não Alterar Sem Validação Dupla
- Middleware (`middleware.ts`)
- Login/Auth (`src/app/admin/login/`)
- Rotas API sensíveis
- Tipos de banco de dados

### ✅ Sempre Teste
- Login flow quando alterar auth
- Admin panel quando alterar layout
- Resposividade mobile
- Build production

### 📋 Documente
- Grandes refactors
- Novas convenções
- Breaking changes

---

## Próximas Fases

Após padrões consolidados:
1. Adicionar testes (Jest/Vitest)
2. Adicionar linting (ESLint avançado)
3. Adicionar pre-commit hooks
4. Documentação de API
5. Changelog automático

---

**Última atualização**: Maio 2026  
**Versão do projeto**: Forbody-V2  
**Estado**: Consolidando estrutura e visual
