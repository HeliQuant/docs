# HELIQUANT — Frontend Generation Prompt (end-to-end)

Copy everything in the fenced block below into your frontend generation tool
(v0.dev / Lovable / Bolt / Claude with frontend-design skill). It is self-contained:
brand, design system, page specs, real verified data, and tech constraints.

---

```prompt
ROLE
You are a senior product designer + frontend engineer. Build a complete, production-grade
marketing + app frontend for "HELIQUANT". Avoid generic AI-template aesthetics. Aim for the
visual maturity of Linear, Stripe, Ramp, and quant-desk terminals (think a Bloomberg/Jane
Street feel made beautiful). Distinctive, confident, editorial — not another rounded-card SaaS.

PRODUCT
HELIQUANT = autonomous, multi-source intelligence trading firm native to the Mantle blockchain.
Name = Helios (Greek sun god who sees everything from the sky) + Quant (quantitative discipline).
One-line: "The all-seeing quant." Tagline options: "See everything. Trade with discipline." /
"The all-seeing quant on Mantle."
It hires out as an on-chain trading firm: users deposit USDC into an ERC-8183 escrow Job, the
firm trades MNT/USDC on Mantle DEXs using a 3-layer decision pipeline, settles deterministically
on-chain, with reputation tracked via ERC-8004.

BRAND & ART DIRECTION
- Mood: solar, precise, nocturnal-terminal. A "sun intelligence over a dark market" motif.
- Palette: deep near-black base (#0A0A0B / #0E1014), high-contrast off-white text, ONE solar
  accent — warm gold/amber (#F5B301 / #FFC53D) as the Helios sun, with a secondary cool signal
  color (emerald #10B981 or electric cyan) for "positive/live" data. Use accent sparingly for
  punch, not everywhere.
- Typography: a characterful display face for headlines (e.g. Geist, Söhne, General Sans, or
  a serif like Editorial New for an editorial-quant contrast), and a monospace (Geist Mono /
  JetBrains Mono) for ALL numbers, addresses, tickers, and data. The mono-for-data discipline
  is core to the quant identity.
- Motion: restrained, purposeful. Subtle number count-ups, a slow sun-glow gradient, scroll-
  reveal on sections, a live "ticker tape" of decisions. No bouncy spring everything.
- Texture: fine grid lines, hairline borders (1px, low-opacity), faint noise/grain, radial
  sun-glow behind the hero. Charts and data viz are first-class citizens, not afterthoughts.

IMAGERY / GRAPHIC PLACEMENT (landing should be image-rich but BALANCED with content)
Use generous visual placements — but every image must earn its place and pair with real data.
Provide clearly-labeled placeholder slots (with suggested alt text + aspect ratio) so the user
can drop in real assets later. Required visual slots on the landing page:
  1. HERO backdrop: abstract solar/orbital render — a luminous sun/eye over a dark gridded
     "market field". Full-bleed, behind headline. (16:9, faint, low-contrast so text stays legible)
  2. ARCHITECTURE diagram: a real, custom 3-layer pipeline diagram (Regime → Intelligence →
     Reconciliation) rendered as an elegant SVG/figure, not a stock image.
  3. "FOUR EYES" intelligence motif: a 2x2 or radial graphic showing the 4 sources
     (Allora / Whale flow / Sentiment / Rugpull) converging into one decision. Custom illustration.
  4. PERFORMANCE chart: an equity-curve style chart for the MNT validated result (use the data
     below; render as a real area/line chart component with the gold accent).
  5. "ON-CHAIN PROOF" band: a visual of the 6 deployed contracts as a connected node graph or
     a sleek table with Mantlescan links + a subtle Mantle logo lockup.
  6. CLOSING CTA: a wide solar-horizon image with the tagline.
Balance rule: alternate text-left/visual-right and full-bleed visual bands so the page reads as
editorial sections, never a wall of cards. Target ~50/50 content-to-visual on the landing page.

PAGES (App Router, multi-page)
1. "/" LANDING (marketing, image-rich). Sections in order:
   - Sticky translucent header: wordmark "HELIQUANT" (sun glyph + mono), nav [Firm, Assets,
     Whales, Hire], "Connect Wallet" button (RainbowKit).
   - Hero: tagline headline, one-paragraph sub, two CTAs ("Hire the firm" primary,
     "See the architecture" ghost), hero solar backdrop, and a row of 4 hero stats (mono):
        Win rate 69% · ROI (90d) +1.36% · vs buy-and-hold +8.4pp · Profit factor 1.70
        (small footnote: "MNT/USDC, 90-day hourly replay, realistic 0.10% per-swap cost")
   - "How HELIQUANT decides" — the 3-layer pipeline with the custom diagram:
        Layer 1 REGIME: deterministic regime detection + XGBoost forecasts the t+4h regime,
          only acts at ≥65% confidence; a Strategy Lifecycle Manager keeps momentum dormant
          until a macro trend is confirmed.
        Layer 2 INTELLIGENCE: four independent sources vote — Allora Network (decentralized AI,
          BTC macro), on-chain whale flow (Mantle DEX swaps), sentiment proxy, and a GoPlus
          rugpull safety veto.
        Layer 3 RECONCILIATION: the strategy decision and the source-vote must agree; hard veto
          on safety; position size scales with combined conviction. Every gate is logged on-chain.
   - "Four eyes" intelligence section with the converging-sources graphic.
   - Performance section: equity curve chart + the iteration story table (V0→V5):
        V0 49.0% win / -5.27% ROI → V1 52.8% / -3.47% → V2 61.1% / -1.31% →
        V3 63.6% / -0.66% → V4 63.6% / -0.66% → V5 69% / +1.36% (highlight V5).
        Caption it honestly: "Data-driven iteration, not a lucky run."
   - On-chain proof band: 6 contracts (table below) + "First Allora prediction infrastructure
     deployed on Mantle" callout linking the relayer tx.
   - Honesty strip (this is a differentiator — keep it, make it tasteful): a short line —
     "We validate one market (MNT) and disclose what we haven't. No annualized hype."
   - Footer: repos, hackathon credit, tagline, sun glyph.
2. "/firms/heliquant" FIRM DETAIL: strategy roster (Mean Reversion ACTIVE, Momentum PENDING,
   Defensive STANDBY) as status-badged rows; the V0→V5 iteration table; the 4 intelligence
   sources as cards; a "Hire" CTA. Data-dense, terminal-flavored.
3. "/assets" MARKETS: ONE validated hero (MNT: 69% win, +1.36% ROI, PF 1.70, config
   "RSI 25/75 · TP 1.8×ATR · flat-gate 3%"). Then an HONEST "explored, not validated" section:
   we built a per-asset config system + grid-search tuner across BTC, mETH, fBTC, cmETH, USDe,
   but tuned configs overfit out-of-sample (a BTC config scoring +0.94% in-sample fell to
   -0.31% out-of-sample) — so they are explored, not validated; walk-forward optimization is the
   roadmap. Present this maturely as a strength (understanding overfitting), with the 5 explored
   tickers as muted "explored" chips. DO NOT show fake profit numbers for these.
4. "/whales" SMART MONEY: a live whale watchlist table (rank, address shortlink to Mantle
   explorer, bias badge accumulating/distributing/neutral, total volume, net volume, realized
   PnL, trades, score). Read from /public/data/whale_watchlist.json at request time. Summary
   stat tiles on top (tracked wallets, accumulating, distributing, total volume). Add a clear
   methodology footnote (GeckoTerminal ~24h coverage, composite ranking; 30-90d via RPC = roadmap).
5. "/jobs/new" HIRE FLOW: an ERC-8183 escrow Job form — select firm (HELIQUANT), USDC deposit
   amount, duration (1h/24h/3d/7d), performance fee % (cap 30). Disabled "Connect wallet to
   deposit" button for the demo with a note that contracts are live on Mantle Sepolia and the
   JobManager is callable directly (link it). Below: a 4-step "what happens after deposit"
   explainer (escrow → agent evaluates regime+sources every 5 min → on-chain trade + ERC-8004
   reputation update → deterministic settlement).

REAL DATA (use verbatim — these are deployed + verified on Mantle Sepolia, chain 5003)
- IdentityRegistry   0x0fAE6342195fdc0007B94Fb3293bF56463C55ff3
- ReputationRegistry 0x5A18F8D33D551666233701025754274dCA9B2929
- ValidationRegistry 0x8e55E41dc9a93E30aaf580DBA0B3Ee6B34e14a1B
- AlloraConsumer     0x7A072465AC232709C114C5DAa842a9b7010D1d4f
- TradingVault       0x3BbD1f5e8733e901A8FdFf5cFA7E18e575896424
- JobManager         0x10421Eb1A230F484eEdB64642505d073e791823c
- Explorer base: https://sepolia.mantlescan.xyz/address/<addr>
- First Allora-on-Mantle relayer tx:
  https://sepolia.mantlescan.xyz/tx/0x0d7c09c945f74595a484b16f185db5c78d175eb286596a881bc78868a6c745b1
- Hackathon: Mantle Turing Test 2026, Track 1 (AI Trading & Strategy), aiming Grand Champion.

TECH CONSTRAINTS
- Next.js (App Router) + TypeScript + Tailwind. Server components for marketing content; isolate
  wallet/client logic ("use client") to small islands.
- Wallet: RainbowKit + Wagmi v2 + viem, configured for Mantle Sepolia (5003) + Mantle (5000).
  Note: RainbowKit getDefaultConfig is client-only — keep it in a "use client" module and keep
  server-safe constants (addresses) in a separate plain module.
- Charts: lightweight (Recharts or visx or a hand-rolled SVG). Numbers in monospace.
- Fully responsive, keyboard-accessible, dark-first. Add tasteful empty/loading states.
- Provide clearly named <ImagePlaceholder/> slots with alt text + aspect ratio comments so real
  art can be dropped in. Ship a cohesive design-token file (colors, type scale, spacing, radii).

DELIVERABLES
- Complete file tree, every page, shared header/footer, design tokens, and the custom SVG
  architecture + "four eyes" figures. Production-quality copy in an confident, precise,
  understated-quant voice. No lorem ipsum — use the real content above.

NON-NEGOTIABLES
- Distinctive and mature; zero generic-template vibe.
- Numbers are honest: MNT is the only validated market; everything else is "explored."
- Mono for all data; gold solar accent used with restraint; image-rich but editorially balanced.
```

---

## How to use

- **v0.dev / Lovable / Bolt**: paste the whole block. Then iterate page-by-page
  ("now refine /whales", "make the hero backdrop more solar").
- **Claude (frontend-design skill)**: paste the block; it already matches our Next.js +
  RainbowKit stack so you can drop output into `frontend/` with minimal wiring.
- **Image slots**: every `<ImagePlaceholder/>` has an aspect ratio + alt — generate art
  (Midjourney/Ideogram) with the "solar intelligence over dark market" motif, or commission.
- Keep the **honesty strip** and the **/assets overfitting disclosure** — they are the
  credibility differentiator versus typical hype submissions.
