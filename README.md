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
- `/admin/marketing`: conteúdo e imagens da Home
- `/admin/unidades`: gestão de unidades

## Segurança

O painel usa Supabase Auth com acesso somente por convite e perfis `ADM FULL`,
`Marketing`, `Gerente` e `Visualizador`. Toda Server Action administrativa
valida novamente a identidade, o status e a permissão no servidor. Nunca exponha
`SUPABASE_SERVICE_ROLE_KEY` ou `RESEND_API_KEY` no navegador.

## Deploy

O projeto é publicado automaticamente pela Vercel a partir da branch principal.
O domínio de produção é `https://forbodyacademia.com.br`.
