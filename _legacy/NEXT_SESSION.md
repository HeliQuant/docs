# Next Session Checklist

Resume point untuk HELIQUANT — Mantle Turing Test Hackathon 2026 submission.
**Current progress: ~25/35 tasks done (~71% MVP)**.

> ⚠️ **UPDATED 2026-06-01 — READ FIRST (honesty rule):** The "V5 +1.23% ROI / 77.78% win" + Sharpe 20.72 numbers below are **SUPERSEDED** (90-day single-window artifact) — **DO NOT put them in the submission/pitch.** Honest current state:
> - **Validated trading strategy = OI-contrarian** (OI 24h-change contrarian, hedge-like, **+47–64% aggregate OOS** vs buy&hold −60%, caveated: env-amplified + per-fold inconsistent). The only real edge — momentum/mean-rev/funding-capture all failed (see PROGRESS M2.5 + INFRA_AUDIT).
> - **Dynamic Smart-Money Flow Engine** (`scripts/51`): CONTRACT(Mantle DEX+staking) + POSITIONING(majors Bybit OI/funding/long-short). Forward-logged.
> - **Regime classifier 82-88% OOS** = capital ALLOCATOR (not price predictor; resolves accuracy≠profit).
> - **Honest differentiator = rigor + multi-source + Mantle-native + brutal honesty**, NOT a magic ROI.
> - Pitch reframe: *"verifiable autonomous trading-intelligence org on Mantle"* — not "+1.23% magic."
> - **NEXT**: wire Smart-Money Engine → Org (Layer 2 `firm/organization.py`); 2 execution lines (Bybit-testnet trade + Mantle-SC record); then frontend/demo. Sections below partly stale (frontend/relayer/contracts still valid).

## ✅ Yang Udah Selesai (Done)

### M0 Foundation
- Monorepo (contracts/agents/relayer/frontend/scripts/docs)
- Foundry, OZ v5 + Solady installed

### M1 Smart Contracts (6/6 deployed + verified Mantle Sepolia)
- IdentityRegistry, ReputationRegistry, ValidationRegistry (ERC-8004)
- AlloraConsumer (EIP-712 signed inferences)
- TradingVault (per-job escrow + DEX router)
- JobManager (ERC-8183 escrow + deterministic settlement)
- 23/23 Foundry tests passing

### M2 Agents (production architecture done)
- ML regime classifier (forward 4h, 61.75% test / 70.55% conf-gated)
- **Strategy Lifecycle Manager** (`firm/agents/strategy_lifecycle.py`) — auto-PENDING for momentum until macro trend confirmed
- 3 rule-based strategies (momentum / mean reversion / defensive) with 11/11 unit tests
- Strategy router + adaptive position sizing
- **3-layer Signal Agent** end-to-end live working (regime + intelligence + reconciliation)

### M2 Multi-Source Intelligence (4/4 + composite voter)
- Allora Network decentralised AI (BTC macro)
- On-chain whale flow tracker (with auto-detect via PnL/volume ranking)
- Sentiment proxy (CoinGecko free API)
- Rugpull screener (GoPlus Security, HARD VETO)
- Composite Voter (weighted consensus + reasoning trace)

### M2 Performance Validation (V5 production)
- **MNT 90-day replay: 77.78% win rate, +1.23% ROI**
- Profit factor 1.70, max drawdown 1.75%, Sharpe 20.72
- Beat MNT buy-and-hold by 8.23pp during 7% MNT decline
- 6 iterations from V0 (49% / -5.27%) to V5 (77.78% / +1.23%)
- Multi-asset pipeline (`scripts/multi_asset.py`) — BTC tested as roadmap

### M3 Allora Relayer (live on Mantle)
- Pulls BTC Topic 14 (8h price prediction) from Allora mainnet
- EIP-712 signs with trusted publisher key
- Submits to AlloraConsumer on Mantle Sepolia
- **First Allora-on-Mantle submission**: tx `0x0d7c09c9...c469`

### M4 Frontend (4 pages built, build clean)
- `/` Landing with hero metrics + 3-layer architecture + 6 contracts
- `/firms/heliquant` Firm detail + strategy roster + iteration history (V0→V5)
- `/jobs/new` Hire flow form (cosmetic wallet integration for hackathon scope)
- `/whales` Live whale watchlist from real on-chain data
- Next.js 16 + Tailwind v4 + RainbowKit + Wagmi v2 + viem on Mantle Sepolia + Mainnet

## ⏳ Sisa Pekerjaan (~3-4 jam target)

### Priority 1 — Deploy Frontend ke Vercel (15-30 menit)
```powershell
cd C:\Users\hansg\HansProject\Mantle-Hackathon\frontend

# Option A: Vercel CLI
pnpm dlx vercel --prod
# (login interactive, follow prompts, choose mantle-mantis as project name)

# Option B: GitHub-first (recommended)
cd ..
git init  # if not already
git add .
git commit -m "HELIQUANT hackathon submission"
gh repo create mantle-heliquant-hackathon --public --source . --push
# Then connect Vercel to the GitHub repo via web UI for auto-deploy
```

### Priority 2 — Record Demo Video ≥2 menit (30-60 menit)
Script:
1. Open landing page (`/`) — show hero metrics + architecture
2. Click "Whales" — show real on-chain whale data
3. Click "Firm" — walk through iteration history V0→V5
4. Click "Hire" — show ERC-8183 escrow form
5. Open new tab — show Mantlescan with all 6 deployed contracts verified
6. Open another tab — show Allora relay tx live on Mantle
7. (Optional) Open terminal — run `python relayer/allora_relayer.py` showing Allora data submission
8. (Optional) Run `python scripts/09_live_paper_trade.py --minutes 5` showing real-time signal trace

Tools: OBS, Loom, ScreenStudio (Mac). Upload YouTube unlisted or Loom.

### Priority 3 — DoraHacks Submission (30 menit)
Required fields (based on Requirements.txt):
- Project name: HELIQUANT
- Track: Track 1 (AI Trading & Strategy) — apply for Grand Champion
- Description (use the pitch story from below)
- Demo video URL
- GitHub repo URL (public, with README polished)
- Live frontend URL (Vercel)
- Deployed contract addresses table

### Priority 4 — Polish README (30 menit)
Use the existing project_branding.md + pitch_story.md content. Add:
- Architecture diagram (3-layer)
- Quickstart commands
- Deployed addresses table with Mantlescan links
- Iteration story (V0→V5 win rate journey)
- Credits to Allora + Paperclip with honest framing
- "We extend Allora to Mantle" infra contribution callout

## 🎤 Pitch Story (locked)

> "**HELIQUANT — Patient. Precise. Predatory.** Autonomous adaptive trading firm
> native to Mantle. Three-layer decision pipeline: ML regime classifier (Layer 1),
> 4-source intelligence vote (Layer 2 — Allora decentralised AI + on-chain whale
> flow + sentiment + rugpull veto), reconciliation gate (Layer 3). Strategy
> Lifecycle Manager auto-disables underperformers — momentum stays PENDING
> until macro trend confirmed.
>
> **Honest verifiable alpha** (NOT a magic ROI — old V5 +1.23%/77.78% retracted as
> single-window artifact): OI-contrarian positioning strategy, hedge-like (profits when
> market falls), +47-64% aggregate OOS (caveated); regime classifier 82-88% as the capital
> ALLOCATOR; Dynamic Smart-Money Flow Engine (whale-mode majors / contract-mode Mantle).
> We rigorously REJECT strategies that fail out-of-sample — honesty is the differentiator.
> Verifiability via backtesting + forward-logs + on-chain decision records.
>
> **Ecosystem contribution**: First Allora prediction infrastructure deployed
> on Mantle. All 6 contracts (ERC-8004 stack + ERC-8183 JobManager +
> TradingVault + AlloraConsumer) verified on Mantlescan. Honest, data-driven,
> on-chain auditable."

## 🔐 Security Reminders

- Wallet `0x48379F...631B` leaked in chat history → hackathon-only forever
- Tidak ada real funds masuk wallet itu
- API keys (Allora, Mantlescan) di `.env` (gitignored)
- Saat push GitHub: confirm `.env` NOT staged

## 🛠️ Quick health-check (start sesi berikutnya)

```powershell
cd C:\Users\hansg\HansProject\Mantle-Hackathon

# Confirm contracts deployed
Get-Content docs\PROGRESS.md | Select-String "0x" | Select-Object -First 6

# Confirm Allora relayer still works
agents\.venv\Scripts\python.exe relayer\allora_relayer.py

# Confirm frontend builds
cd frontend; pnpm build

# Confirm Signal Agent live
cd ..\agents
.venv\Scripts\python.exe -c "import asyncio,os; from pathlib import Path; [os.environ.update({k.strip():v.strip()}) for k,_,v in [l.partition('=') for l in Path('..\.env').read_text().splitlines() if '=' in l and not l.startswith('#')]]; from firm.agents.signal import run; from firm.schemas import SignalInput; o=asyncio.run(run(SignalInput(pair='MNT/USDC'))); print(o.direction.value); print(o.reasoning)"

# Refresh whale watchlist
.venv\Scripts\python.exe scripts\07_build_whale_watchlist.py
```

## 📚 Key Files for Next Session

| Need | Where |
|---|---|
| Deployed contracts | `docs/PROGRESS.md` + `contracts/deployments/mantle_sepolia.json` + `.env` |
| Frontend ready | `frontend/` — `pnpm dev` for local |
| Signal Agent | `agents/firm/agents/signal.py` (3-layer) |
| Strategy lifecycle | `agents/firm/agents/strategy_lifecycle.py` |
| Performance proof | `agents/data/historical_replay_summary.json` (V5 result) |
| Whale data | `agents/data/whale_watchlist.json` (live) |
| Allora relayer | `relayer/allora_relayer.py` |
| Branding | `~/.claude/projects/.../memory/project_branding.md` |
