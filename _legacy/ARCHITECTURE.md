# Architecture

## High-level flow

```
┌─ INTELLIGENCE LAYER ─────────────────────────────────┐
│  Allora Network (off-chain)                          │
│    Topics consumed: BTC/USD, ETH/USD, MNT/USD        │
│    Output: signed price + volatility predictions     │
│  Relayer                                             │
│    Cron job → signed payload → Mantle on-chain       │
│  LLM ensemble (Claude/GPT)                           │
│    Sentiment & news analysis (off-chain)             │
└──────────────────────────────────────────────────────┘
                       ↓
┌─ ORCHESTRATION LAYER (Paperclip control plane) ──────┐
│  Research Agent    → scan news, sentiment, topics    │
│  Signal Agent      → Allora PRIMARY + ML cross-val   │
│                      Only trade when both align      │
│  Risk Agent        → position sizing, drawdown gate  │
│  Execution Agent   → submit trade to Trading Vault   │
│  Reputation Agent  → post-trade update to ERC-8004   │
└──────────────────────────────────────────────────────┘

Trading pair: MNT/USDC on Mantle DEX (Merchant Moe + Agni)
                       ↓
┌─ ON-CHAIN LAYER (Mantle Network) ────────────────────┐
│  ERC-8004 Registries                                 │
│    └─ Identity, Reputation, Validation               │
│  ERC-8183 JobManager                                 │
│    └─ escrow client deposits, evaluator settlement   │
│  TradingVault                                        │
│    └─ holds client funds, routes to DEXs             │
│  AlloraConsumer                                      │
│    └─ verifies signed predictions, exposes getInf()  │
│  DEX Router → Merchant Moe / Agni / Fluxion          │
└──────────────────────────────────────────────────────┘
                       ↓
┌─ UX LAYER (Next.js) ─────────────────────────────────┐
│  "Hire an AI Trading Firm" marketplace               │
│  Live PnL dashboard + agent activity feed            │
│  Transparent on-chain trade log w/ Explorer links    │
└──────────────────────────────────────────────────────┘
```

## Smart contract design

### ERC-8004 (Identity + Reputation + Validation)

Three registries per spec:

- **IdentityRegistry**: NFT-based on-chain agent identity. Each of the 5 sub-agents + the parent Firm gets a unique tokenId. Soulbound (non-transferable) for sub-agents; Firm token is the bridge to ERC-7857.
- **ReputationRegistry**: Tracks per-agent performance counters. Updated by Reputation Agent post-trade. Fields: totalTrades, winRate, sharpeProxy, maxDrawdown, totalPnL.
- **ValidationRegistry**: Stake-secured proof of work. Every settled Job gets a credential recorded here, tied back to the Firm's IdentityRegistry tokenId.

### ERC-8183 (Job escrow)

A `Job` primitive with three roles:

- **Client**: user who deposits funds (USDC/USDT/MNT) and sets duration + risk profile
- **Provider**: the Firm (its ERC-8004 identity)
- **Evaluator**: a deterministic smart contract that reads PnL from TradingVault post-period and triggers settlement

Settlement formula:
```
ifProfit:   client = principal + (1 - perfFee) * profit
            firm   = perfFee * profit
ifLoss:     client = principal - loss
            firm   = 0  (no perf fee on loss)
```

### TradingVault

- Holds escrowed funds per Job
- Only authorized Execution Agent (whitelisted signer) can call `executeTrade()`
- Routes via a DexRouter that supports Merchant Moe + Agni + Fluxion
- Records every fill as an event for indexing + benchmark

### AlloraConsumer

- Ports `allora-network/allora-consumer` reference impl
- Verifies ECDSA signatures from Allora topic publisher
- Exposes `getInference(topicId, timestamp)` view
- Signal Agent reads this on-chain (or off-chain via RPC) to fuse with sentiment

## Agent design (Paperclip)

Each agent is a Paperclip-managed worker with:
- A model adapter (Claude default, swappable)
- A monthly USD budget cap (Paperclip enforces)
- A heartbeat schedule (varies per role)
- A signed wallet key (only Execution Agent has tx-capable key, kept in TEE/secret manager)

| Agent | Heartbeat | Inputs | Output |
|---|---|---|---|
| Research | 30 min | News API, Twitter, Reddit, Allora topics | Sentiment & event summary |
| Signal | 5 min | Allora getInference + Research output | Trade signal (BUY/SELL/HOLD + size hint) |
| Risk | per-signal | Signal + Vault state | Approved trade params (or veto) |
| Execution | per-approved-trade | Risk-approved params | Signed tx to TradingVault |
| Reputation | per-settled-job | Trade history + PnL | tx to ReputationRegistry |

## Failure modes & mitigations

| Risk | Mitigation |
|---|---|
| Paperclip blocks us | Fallback: custom asyncio Python orchestrator using Claude SDK directly |
| Allora has no Mantle endpoint | We deploy consumer contract ourselves (planned, this is the narrative win) |
| Demo day trade is a loser | Show backtest + paper-trade history alongside; emphasize verifiable process not point-in-time PnL |
| Mantle DEX liquidity thin | Use small notional sizes; deploy on testnet first for demo |
| Gas spike | Configure max-fee caps in Execution Agent |
