# Forbody V2

Site institucional e painel administrativo da Forbody Academia.

## Stack

- Next.js 16 e React 19
- TypeScript e Tailwind CSS 4
- Supabase (Postgres e Storage)
- Vercel
- Resend para leads de franquia

## Desenvolvimento

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

## Estrutura principal

- `/`: site público
- `/unidades`: unidades da rede
- `/franquias`: captação de interessados
- `/admin/login`: acesso administrativo
- `/admin/users`: convites, perfis e bloqueios de acesso
- `/admin/marketing`: conteúdo e imagens da Home
- `/admin/unidades`: gestão de unidades

## Segurança

O painel usa Supabase Auth com acesso somente por convite e perfis `ADM FULL`,
`Marketing`, `Gerente` e `Visualizador`. Toda Server Action administrativa
valida novamente a identidade, o status e a permissão no servidor. Nunca exponha
`SUPABASE_SERVICE_ROLE_KEY` ou `RESEND_API_KEY` no navegador.

O formulário de franquias usa validação no servidor, honeypot, tempo mínimo de
preenchimento e limite persistente de tentativas no Supabase.

## Banco de dados

As alterações de esquema e os ajustes de dados ficam em `supabase/migrations`.
As tabelas administrativas e de leads usam RLS e não concedem acesso direto aos
papéis públicos.

## Integração contínua

O workflow `.github/workflows/ci.yml` executa `npm ci`, lint, TypeScript e build
em pushes e pull requests para `main`.

## Deploy

O projeto é publicado automaticamente pela Vercel a partir da branch principal.
O domínio de produção é `https://forbodyacademia.com.br`.
