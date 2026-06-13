# HeliQuant — Multi-Tenancy & Parallel Operation

How HeliQuant goes from **one hardcoded instance** (the live demo on Railway) to **many people
running it in parallel, each with their own credentials** — without HeliQuant ever holding the
secrets it has no business holding.

This document designs all three tiers, classifies every credential by trust, and gives the
concrete schema / endpoints / contracts for the buildable parts. It is honest about what is
shipped, what is scaffolded, and what is design-only.

---

## 0. The crux: custody, not compute

Running many firms in parallel is **not** hard because of compute — it is hard because of
**secrets**. Not all secrets are equal:

| Class | Examples | Blast radius if leaked | Rule |
|---|---|---|---|
| **CUSTODY** | wallet private key (`DEPLOYER_/EXECUTOR_PRIVATE_KEY`), `BYBIT_API_SECRET` | **drain funds / move money** | **NEVER hold another person's.** Replace with scoped on-chain authorization. |
| **PRIVATE** | `GROQ_API_KEY`, `ELFA_API_KEY`, `NANSEN_API_KEY`, `ALLORA_API_KEY`, `MANTLESCAN_API_KEY` | quota theft (rate-limited) | BYO. If ever held server-side, **encrypt at rest** (per-tenant envelope key). |
| **PUBLIC** | DeFiLlama, GeckoTerminal, Hyperliquid, Fear&Greed, CoinGecko, Allora public reads | none (keyless) | **Shared** for all tenants — one path. |
| **SHARED INFRA** | Supabase project | tenant data isolation | **We provide one project**, isolated per-tenant by row. |

> The whole design follows from row 1: **a platform that holds users' wallet/exchange secrets is a
> custodial money business and a single hack from ruin.** So we don't. Custody stays with the user
> (self-host) or is reduced to a *scoped, non-withdrawing session key* on-chain (Tier 3).

---

## 1. The three tiers

| Tier | What the user does | Who holds CUSTODY secrets | Who holds PRIVATE keys | Status |
|---|---|---|---|---|
| **1 · Demo** | watches the live floor | nobody (no trading of user funds) | us (our own keys) | ✅ **shipped** (`/app`) |
| **2 · Self-host** | deploys their own instance via `/setup` | **the user, on their own infra** | the user | ✅ enabled (`/setup` builds the `.env`) — this doc adds **shared Supabase** safely |
| **3 · Hosted** | authorizes a scoped session key; we run the loop | **nobody holds a withdrawing key** — funds in vault escrow, firm trades via policy-bounded session key | shared metered LLM (no user secret needed) or encrypted-at-rest | 🔵 **designed here**, not built |

Tiers 1 + 2 are the realistic, safe, hackathon-grade target. Tier 3 is the credible "how it
scales to a real product" story — built on the session-key pattern, not on holding keys.

---

## 2. Tier 2 — Self-host + shared Supabase (no user makes a DB)

Each user runs their **own** HeliQuant agents instance (their Railway, their `.env`, their private
keys — these never touch us). The only shared resource is **our Supabase**, because making every
user stand up a database is absurd. The problem: writes need elevated access, and we cannot hand
out the `service_role` key (it can read/write *everything*). Two clean ways to scope a tenant to
its own rows:

### 2a. Recommended: tenant-JWT + Row-Level Security (Supabase-native, no extra infra)

1. **Schema** — every HeliQuant table carries a `tenant_id uuid`. (SQL in
   [`deploy/multitenant_schema.sql`](../deploy/multitenant_schema.sql).)
2. **A tiny token endpoint** mints a short-ish-lived JWT signed with the project's `JWT secret`,
   carrying `{ role: "authenticated", tenant_id }`. The JWT secret lives **only** on that endpoint.
3. The user puts that JWT in their `.env` as `SUPABASE_KEY` (in place of a service-role key).
4. **RLS policies** scope every write to the caller's own tenant:

   ```sql
   -- read: public (the live floor reads every tenant's demo data)
   create policy hq_read on hq_state for select using (true);
   -- write: only your own tenant_id, taken from the JWT claim
   create policy hq_write on hq_state for insert with check
     (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
   create policy hq_update on hq_state for update using
     (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
   ```

   Now a tenant can only ever write its own rows; a stolen tenant JWT can corrupt only that tenant
   and expires. The `service_role` key never leaves us.

### 2b. Alternative: write-proxy endpoint

If we'd rather not mint Supabase JWTs, a thin **proxy** holds the `service_role` and authenticates
tenants by an opaque bearer token:

```
POST /tenant/state   Authorization: Bearer <tenant_api_token>
  body: { key, value }
  → proxy validates token → resolves tenant_id → upserts {tenant_id, key, value} with service_role
```

Same isolation, one extra hop, one service to run. The `state_store` adapter already abstracts the
backend, so wiring this is a one-file change (see [`agents/firm/tenant.py`](../agents/firm/tenant.py)).

**Recommendation:** 2a (JWT+RLS) — serverless, Supabase-native, fewer moving parts. Use 2b only if
custom JWT minting is undesirable.

### What stays BYO in Tier 2

Everything in the PRIVATE/CUSTODY classes lives in the **user's own deploy** and never reaches us:
`GROQ_API_KEY`, `ELFA_API_KEY`, `NANSEN_API_KEY`, `BYBIT_*`, `DEPLOYER_PRIVATE_KEY`. The `/setup`
page already builds exactly this `.env`. The only change for shared-DB: `SUPABASE_URL` is ours
(public), `SUPABASE_KEY` becomes the **tenant JWT** instead of a service-role key.

---

## 3. Tier 3 — Hosted, parallel, with on-chain session-key custody

The hard version: **we** run the loop for many users at once. To do this without becoming a
custodian, we solve the two secret classes separately.

### 3a. CUSTODY → scoped on-chain session keys (never hold a withdrawing key)

Funds already sit in escrow: a client `createJob()`s on the **ERC-8183 JobManager**, principal held
by the **TradingVault**, which only lets an **`onlyExecutor`** address call `trade()` and routes
through a fixed DEX router; settlement returns principal + PnL to the client. Today there is one
global executor key. For hosted multi-tenant, replace "one trusted executor key" with **per-job,
policy-bounded session keys the user authorizes**:

```
TradingVault (extension)
  mapping(uint256 jobId => JobAuth) public jobAuth;   // per-job, not global
  struct JobAuth { address sessionKey; uint64 expiry; uint256 maxNotional; bool active; }

  function authorizeJobExecutor(uint256 jobId, address sessionKey, uint64 expiry, uint256 maxNotional)
      external onlyJobClient(jobId);                  // ONLY the fund owner can grant
  modifier withinPolicy(uint256 jobId, uint256 notional) { ... expiry, maxNotional, active ... }
  function trade(uint256 jobId, ...) external withinPolicy(jobId, notional) { require(msg.sender == jobAuth[jobId].sessionKey); ... }
```

The hosted firm holds a **session key per job**, and that key can do **exactly one thing**: call
`trade()` on that job, under that job's notional cap, until expiry — **it can never withdraw, never
exceed size, never touch another job.** Compromise of the hosted key drains nothing; it can at worst
make in-policy trades the user already consented to. This is the difference between an *executor*
and a *custodian*.

Account models that give the user this without a bespoke wallet:
- **ERC-4337 smart accounts** with a **session-key module** (Safe modules, Kernel, etc.): the user's
  account authorizes the session key with the policy above.
- **ERC-7702** (Pectra) EOA delegation: a plain EOA delegates to a policy contract for the job's
  lifetime, then revokes. Lowest onboarding friction.

Either way the on-chain authorization, not a stored private key, is the trust anchor. Revocation is
on-chain and instant (`active = false` / let the delegation lapse).

### 3b. PRIVATE keys → shared metered LLM (so we hold no user secret)

The desks need an LLM key. Rather than hold each user's `GROQ_API_KEY`, run a **shared, metered LLM
gateway**: we pay, and meter per tenant (requests/day, or x402 pay-per-call). Then **no user LLM
secret exists server-side at all** — the cleanest custody posture. Users who want their *own* model
or private desks (Nansen/Elfa) can attach those keys, which we then hold under **per-tenant envelope
encryption** (a per-tenant data key, itself wrapped by a KMS master key; decrypt only in-process for
the duration of a call; never log; rotate on demand). Public desks (DeFiLlama, HL, Allora reads,
Fear&Greed) are shared and keyless for everyone.

### 3c. Parallel isolation

- **State**: the Tier-2 multi-tenant Supabase (`tenant_id` + RLS) already isolates each firm's
  positioning / decisions / campaign / whales.
- **Compute**: one worker pool runs N tenant loops; per-tenant fairness via the metered gateway +
  a per-tenant cycle budget. The org loop is already stateless between cycles (state in Supabase),
  so horizontal scaling is "more workers reading the tenant table."
- **Cost**: shared public desks cost nothing; the LLM gateway is the real cost lever → meter it.

### Tier 3 trust boundary

```
USER                         HOSTED HELIQUANT                     ON-CHAIN (Mantle)
────                         ───────────────                     ─────────────────
funds  ──createJob()──────────────────────────────────────────►  JobManager escrow → TradingVault
authorize(sessionKey,        holds session key (per job)          authorizeJobExecutor() ← only user
  expiry, maxNotional) ─────►   trade() within policy ──────────►  withinPolicy ✓ → DEX
(optional) private API keys  encrypted-at-rest, per-tenant                   │
LLM: none needed             shared metered gateway               settleJob() → principal+PnL → USER
```

The firm **decides and trades within a box the user drew**; it never holds the keys to the vault.

---

## 4. Migration path (ordered, honest)

1. **[shipped]** Tier 1 live floor (`/app`) — read-only demo of our instance.
2. **[shipped]** `/setup` builds the BYO `.env`; deploy `.env` template in `deploy/.env`.
3. **[next, small]** Apply `deploy/multitenant_schema.sql` to the HeliQuant Supabase tables
   (`hq_state`, `decisions_hq`) — add `tenant_id` + RLS. **Touches only HeliQuant tables, never the
   shared project's other apps.**
4. **[next, small]** Mint tenant JWTs (token endpoint) + teach `state_store` to read/write with a
   `tenant_id` (scaffold: `agents/firm/tenant.py`). `/setup` emits `SUPABASE_KEY=<tenant JWT>`.
5. **[later]** Tier 3 contracts: `authorizeJobExecutor` + `withinPolicy` on the TradingVault;
   session-key module wiring (ERC-4337 or 7702); shared metered LLM gateway.

Steps 3–4 turn every self-hosted instance into a tenant of the shared DB **without** anyone making
their own database — exactly the requirement. Step 5 is the product.

---

## 5. Security checklist (per tier)

- **Tier 2:** service-role key never shipped to users; tenant JWTs are short-lived + tenant-scoped;
  RLS denies cross-tenant writes; public read is intentional (the live floor). Private/custody keys
  live only in the user's own deploy.
- **Tier 3:** no withdrawing key ever held; session keys are per-job, capped, expiring, revocable
  on-chain; user API keys (if attached) are envelope-encrypted and never logged; LLM via metered
  gateway means the common case holds **zero** user secrets.
- **Both:** every external desk degrades gracefully if its key/endpoint is absent (the org never
  breaks on a missing tool — already true in `organization.py`). Honesty rule unchanged: no number
  is shown that a real run didn't produce.

---

*The one-line version: users bring what only they should hold (wallet, exchange, private API keys);
HeliQuant shares what's safe to share (a multi-tenant DB, all the public data desks); and where the
firm must act on a user's funds, it does so through a session key bounded by a box the user drew
on-chain — never as a custodian.*
