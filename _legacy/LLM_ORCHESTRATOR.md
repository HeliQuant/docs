# HeliQuant — LLM Orchestrator ("Fund Manager Brain")

> The AI agent's brain is an LLM (Claude) that **orchestrates validated quant tools**,
> **self-manages** its data sources, and **explains every decision on-chain** — it does
> NOT crunch the trade math itself.

## Core principle: the LLM manages, the tools compute

| | Who | Why |
|---|---|---|
| Precise numbers (probabilities, ATR, R:R, sizing) | **Tools** (deterministic, walk-forward validated) | LLMs are weak at numeric optimization + can hallucinate |
| Orchestration, judgment, self-management, explanation | **Claude (LLM)** | This is what LLMs are genuinely good at |

**Honest validation boundary:** the LLM's real-time judgment is NOT historically backtestable
(Allora/whale have no historical API; an LLM can't be replayed over thousands of bars cheaply).
So **validated profit claims stay on the deterministic tools** (regime classifier + trend-following
+ dynamic R:R, all walk-forward OOS). The LLM layer is **demonstrated live**, never claimed as
"LLM-validated alpha."

## Tool registry (what Claude can call)

**Validated / backtestable (the edge):**
- `classify_regime(asset)` → XGBoost forward-4h regime + confidence
- `detect_current_regime(asset)` → deterministic current regime
- `evaluate_strategy(regime, window)` → trend-following / mean-reversion / defensive decision
- `compute_dynamic_rr(adx, adx_lo, adx_hi)` → TP multiple scaled by trend strength ✅ *(just validated: MNT +5.58% → +7.51% OOS)*
- `size_position(equity, risk_pct, atr)` → ATR-based position size
- `run_walkforward(asset, config)` → **self-validation**: agent OOS-tests a config before trusting it

**Live intelligence (not backtestable → judgment inputs only):**
- `get_allora_macro()` → decentralized AI BTC 8h prediction
- `scan_whale_flow(asset)` / `refresh_whale_watchlist()` → on-chain Mantle DEX smart-money
- `get_sentiment(asset)` → price/volume/trending proxy
- `check_rugpull(token)` → GoPlus safety **hard veto**

**On-chain agency:**
- `submit_trade(job_id, direction, size, sl, tp)` → ERC-8183 Job / TradingVault execution
- `record_reputation(agent_id, outcome)` → ERC-8004 reputation update

## Orchestration loop (per tick)

```
1. SENSE     classify_regime + detect_current_regime + (live) allora/whale/sentiment
2. JUDGE     act or ABSTAIN? which strategy? (LLM weighs tool outputs; abstain on low conf)
3. SIZE/R:R  call compute_dynamic_rr + size_position (tools give exact numbers)
4. GATE      check_rugpull hard-veto; if sources strongly disagree → reduce/abstain
5. EXECUTE   submit_trade on-chain (ERC-8183 / Vault)
6. RECORD    record_reputation on-chain (ERC-8004) — verifiable track record
7. EXPLAIN   write a reasoning trace (why this/why not) → logged on-chain
8. SELF-MANAGE  see below
```

## Self-management (the agentic edge — hard to backtest, clearly valuable)

The LLM monitors its own toolset and adapts:
- **Whale data degraded** → call `refresh_whale_watchlist()` to find new smart-money wallets
- **Allora topic stale/unavailable** → fall back to other sources + note it
- **Regime confidence low** → abstain / shrink size (discipline over activity)
- **New strategy idea** → `run_walkforward()` to OOS-validate BEFORE deploying (never deploy unvalidated)
- **Sources strongly disagree** → flag caution, don't force a trade

## On-chain mapping (why this is a real "agent", not a script)

- **ERC-8004** identity + reputation → the agent's verified track record lives on-chain
- **ERC-8183** Job + TradingVault → the agent is hireable; trades flow through escrow
- **Reasoning trace** → every decision (incl. abstain) is explainable + auditable on-chain

## What's proven vs demoed (say this to judges)

- **Proven (walk-forward OOS):** regime classifier + trend-following + dynamic R:R → MNT +7.51% OOS, beat buy-hold (−37.5%) by ~43pp; mean-reversion honestly fails 0/16 OOS (rigor shown openly).
- **Demoed (live):** Claude orchestrating + self-managing + explaining — the agentic layer.
- We do NOT claim the LLM "predicts price"; we claim it **manages a validated quant system intelligently and transparently.**
