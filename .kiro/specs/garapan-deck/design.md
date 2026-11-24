# Design — Garapan Deck

## Overview

Static single-page app, no build step, no backend. One `index.html` +
`app.js` + `data.json`, deployable to Netlify as a static site.
Indonesian UI (the user reads Indonesian). Dark "mission control" look,
matching the token-radar dashboards he already liked.

## Architecture

```
app/
  index.html   — layout: 3 wallet cards, mining timers, deadline list
  app.js       — renders from data.json; countdown timers tick every second
  data.json    — holdings, rates, deadlines (edited by hand / by Muse)
```

- On-chain reads happen at data-update time (Muse, via public BSC RPC),
  not in the browser — the page never needs an RPC key.
- Live prices (DexScreener) are fetched client-side from the public
  DexScreener API, only for tokens with a known pair; failures degrade to
  "harga belum bisa dicek".

## Components

1. **WalletCard** — address (shortened), Agent ID number, holdings list.
2. **MinerTimer** — rate, cap, last claim, countdown to full, FULL state.
3. **DeadlineList** — sorted dated items, past items greyed out.
4. **PriceChip** — price + liquidity + 24h change, or "belum ada pair".

## Data model (data.json)

```json
{
  "updatedAt": "2026-11-24T12:00:00+07:00",
  "wallets": [
    {"name": "misbah995.ai", "address": "0x6F4E…", "agentId": 32955,
     "holdings": [{"label": "Agent Pass #30", "kind": "nft"}]},
    {"name": "aprilia21.ai", "address": "0xB878…", "agentId": 36271,
     "holdings": [{"label": "PTAH 3.988,61", "kind": "token"}]},
    {"name": "junaidi21.ai", "address": "0x6256…", "agentId": 60170,
     "holdings": []}
  ],
  "miners": [
    {"wallet": "aprilia21.ai", "ratePerHour": 19, "cap": 150,
     "lastClaimAt": "2026-11-18T04:54:00+07:00"}
  ],
  "deadlines": [
    {"label": "Kaggle Gemma — gerbang entri tutup", "at": "2026-11-26T06:59:00+07:00"},
    {"label": "Daisy Labs — pemenang diumumkan", "at": "2026-11-30T00:00:00+07:00"},
    {"label": "$LAB pool buka", "at": "2026-12-02T00:00:00+07:00"}
  ]
}
```

## Testing

- Open `app/index.html` in a browser: 3 cards render, timers count down,
  past deadlines grey out, no console errors, no wallet prompt appears.
- `data.json` must parse as JSON; every holding label must match a
  verified on-chain fact (no invented balances).
