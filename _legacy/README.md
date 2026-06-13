# docs

> Architecture, progress, and deployment docs for **[HeliQuant](https://github.com/HeliQuant)**.
>
> Submitted to **Mantle Turing Test Hackathon 2026** — Track 1: AI Trading & Strategy.

## Contents

| File | What |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | System architecture diagram + 3-layer decision pipeline + per-component design |
| [`PROGRESS.md`](PROGRESS.md) | Milestone tracker (M0 → M5) + deployed contract addresses + test counts |
| [`NEXT_SESSION.md`](NEXT_SESSION.md) | Resume checklist for development continuation |

## Component repos

HeliQuant is organised as a multi-repo project under the [HeliQuant org](https://github.com/HeliQuant):

| Repo | Role |
|---|---|
| [contracts](https://github.com/HeliQuant/contracts) | Solidity smart contracts (ERC-8004 + ERC-8183 + AlloraConsumer + TradingVault) deployed on Mantle Sepolia |
| [agents](https://github.com/HeliQuant/agents) | Python ML regime classifier + 3-layer decision pipeline + multi-source intelligence engine |
| [relayer](https://github.com/HeliQuant/relayer) | Off-chain Allora → Mantle prediction bridge (first Allora infra on Mantle) |
| [frontend](https://github.com/HeliQuant/frontend) | Next.js dApp (landing + firm detail + hire flow + whale watchlist) |
| [docs](https://github.com/HeliQuant/docs) | This repo |

## License

MIT
