# HeliQuant — Documentation

The official docs for **HeliQuant**, an autonomous multi-desk AI trading firm on Mantle.
Built with [Fumadocs](https://fumadocs.dev) (Next.js + MDX), themed "Night Garage" (dark automotive
brutalism). Deployed on Vercel.

- **Live firm:** https://heliquant.vercel.app
- **Source:** [`HeliQuant/agents`](https://github.com/HeliQuant/agents) ·
  [`HeliQuant/contracts`](https://github.com/HeliQuant/contracts) ·
  [`HeliQuant/frontend`](https://github.com/HeliQuant/frontend)

## Pages

`index` · `architecture` · `desks` · `self-learning` · `on-chain` · `findings` · `verifiability` ·
`self-host` · `api` — content lives in [`content/docs/`](./content/docs).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Vercel uses this)
```

## Deploy (Vercel)

Import this repo in Vercel — framework auto-detected (Next.js), no config needed.

> Older internal dev notes (architecture / multi-tenancy / progress) are preserved under
> [`_legacy/`](./_legacy) — superseded by the docs pages above.
