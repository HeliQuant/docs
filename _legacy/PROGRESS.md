# Progress Tracker

Milestone progress for the Mantle Turing Test Hackathon 2026 submission.

## M0 — Foundation ✅
- [x] Monorepo scaffold (contracts/agents/frontend/relayer)
- [x] Foundry configured for Mantle Sepolia + Mainnet
- [x] Git initialized
- [x] OpenZeppelin v5 + Solady installed
- [x] .env.example documented

## M1 — Smart Contracts ✅ (deployed + verified)
- [x] ERC-8004 Identity Registry — soulbound sub-agents, transferable firm NFT (7/7 tests)
- [x] ERC-8004 Reputation Registry — totalJobs, winRate, PnL, drawdown (3/3 tests)
- [x] ERC-8004 Validation Registry — credentials per settled Job (2/2 tests)
- [x] ERC-8183 JobManager — escrow + deterministic settlement w/ perf fee
- [x] TradingVault — per-job escrow, DEX router integration (Uniswap V2-compatible)
- [x] AlloraConsumer — EIP-712 signed inferences, replay-protected (5/5 tests)
- [x] Foundry test suite — 23/23 passing
- [x] Deploy script ready (`script/Deploy.s.sol`)
- [x] Deployed to Mantle Sepolia (2026-05-28) — all 6 verified on Mantlescan

## M2 — Agents + Pivot ✅ (pivot done, real impls = stubs for now)
- [x] Paperclip orchestration setup (HTTP adapter to Python workers)
- [x] Python FastAPI worker scaffold
- [x] ML model v0 trained on MNT/USD (CV 57.4%, test 58.4%) — superseded by regime classifier
- [x] **Pivot Step 1**: Regime classifier (forward 4h, 61.75% test, 70.55% gated)
- [x] **Pivot Step 2**: 3 rule-based strategies (momentum, mean-reversion, defensive) — 11/11 tests
- [x] **Pivot Step 3**: Strategy router + adaptive position sizing
- [x] **Pivot Step 4**: Backtester upgrade + comparison (OLD +1.02% vs NEW -1.88% honest finding)
- [x] **Multi-Source 1**: Sentiment proxy (CoinGecko price/volume/trending)
- [x] **Multi-Source 2**: Whale tracker (Mantle RPC, mock fallback)
- [x] **Multi-Source 3**: Rugpull screener (GoPlus API)
- [x] **Multi-Source 4**: Composite voter (weighted multi-source)
- [x] **Multi-Source 5**: 3-layer Signal Agent integration (live tested)
- [x] **Whale L3**: Auto-detect via GeckoTerminal, watchlist generated
- [ ] **Pivot Step 5**: Pitch narrative reframe + docs (next session)
- [ ] Research Agent (real Claude integration — currently stub)
- [ ] Risk Agent (real vault state read — currently mock)
- [ ] Execution Agent (real web3.py signing — currently stub)
- [ ] Reputation Agent (off-chain mirror — currently stub)
- [ ] 48h paper-trade on Mantle testnet

## M2.5 — Alpha + Smart-Money Engine ✅ (2026-06-01, Bybit session)
- [x] **OI-contrarian = Strategy #1 VALIDATED** (first real edge): OI 24h-change contrarian, +47–64% aggregate OOS vs buy&hold −60%, hedge-like (scripts 39-43). Honest caveats: environment-amplified, per-fold inconsistent → risk-controlled hedge input, not all-weather.
- [x] Honest negatives recorded: momentum (overfit), mean-reversion (0/16), funding-capture (fee-churn) all FAIL — rigor = credibility.
- [x] **Bybit data**: OHLCV+volume (MNT/mETH/USDe + majors, 375d, scripts/35) + positioning funding/OI/long-short (scripts/37). ⚠️ Bybit intermittently geo/IP-blocked from dev env → cache+fallback.
- [x] **DexScreener Mantle DEX** flow desk (scripts/44) — real on-chain Mantle data, no key.
- [x] **mETH staking conviction** (Etherscan L1, 59k ETH/$118M locked, scripts/49b).
- [x] **Dynamic Smart-Money Flow Engine** (scripts/51): auto mode/asset — CONTRACT(Mantle) + POSITIONING(majors). Capital-flow desk (scripts/50). Forward-logged.
- [x] On-chain whale honest verdict: individual whales thin on Mantle (2 mETH EOA whales); paid APIs (Cielo/Etherscan-PRO/CoinAlyze) all free-tier-walled. Deep-research → `RESEARCH_SMARTMONEY.md`.
- [x] **Dual-execution architecture decided**: Bybit-testnet (paper trade) + Mantle-SC `TradingVault.record` (verifiable record + ERC-8004 + callable AI-fn). TradingVault already has DEX-router integration (optional on-chain swap).
- [x] **Smart-Money Flow desk WIRED into Org** (`firm/organization.py`, 5th desk) — dynamic engine → analysts → debate → PM (now synthesizes 5 desks). Verified: build_desks→5 desks, clean output.
- [ ] Wire 2 execution lines (Bybit testnet order + Mantle SC record)
- [ ] Docs polish sweep (ARCHITECTURE/README/FRONTEND/LLM_ORCHESTRATOR) after org-wiring

## M3 — Allora Relayer ✅ (manual run)
- [x] Off-chain → on-chain signing pipeline (`relayer/allora_relayer.py`)
- [x] Allora API → EIP-712 sign → AlloraConsumer.submitInference()
- [x] First successful submission: tx 0x0d7c09c945f74595a484b16f185db5c78d175eb286596a881bc78868a6c745b1
- [ ] Cron deployment (VPS or GitHub Actions) — currently manual every-30-min runs
- [x] On-chain BTC price prediction queryable via AlloraConsumer.getLatestInference(14)

## M4 — Frontend
- [ ] Next.js + RainbowKit + Wagmi + viem on Mantle
- [ ] "Hire AI Trading Firm" marketplace
- [ ] Live PnL dashboard
- [ ] Transparent trade log

## M5 — Submission
- [ ] Vercel deployment (public URL)
- [ ] Demo video (≥ 2 min)
- [ ] README + architecture diagram + deployed addresses
- [ ] DoraHacks submission

## Deployed Contract Addresses (Mantle Sepolia, chain 5003)

Deployed + verified on Mantlescan, 2026-05-28. Deployer: `0x48379F4d1427209311E9FF0bcC4a354953ea631B`.

| Contract | Address | Mantlescan |
|---|---|---|
| IdentityRegistry | `0x0fAE6342195fdc0007B94Fb3293bF56463C55ff3` | [verify](https://sepolia.mantlescan.xyz/address/0x0fAE6342195fdc0007B94Fb3293bF56463C55ff3) |
| ReputationRegistry | `0x5A18F8D33D551666233701025754274dCA9B2929` | [verify](https://sepolia.mantlescan.xyz/address/0x5A18F8D33D551666233701025754274dCA9B2929) |
| ValidationRegistry | `0x8e55E41dc9a93E30aaf580DBA0B3Ee6B34e14a1B` | [verify](https://sepolia.mantlescan.xyz/address/0x8e55E41dc9a93E30aaf580DBA0B3Ee6B34e14a1B) |
| AlloraConsumer | `0x7A072465AC232709C114C5DAa842a9b7010D1d4f` | [verify](https://sepolia.mantlescan.xyz/address/0x7A072465AC232709C114C5DAa842a9b7010D1d4f) |
| TradingVault | `0x3BbD1f5e8733e901A8FdFf5cFA7E18e575896424` | [verify](https://sepolia.mantlescan.xyz/address/0x3BbD1f5e8733e901A8FdFf5cFA7E18e575896424) |
| JobManager (ERC-8183) | `0x10421Eb1A230F484eEdB64642505d073e791823c` | [verify](https://sepolia.mantlescan.xyz/address/0x10421Eb1A230F484eEdB64642505d073e791823c) |
