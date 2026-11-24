# Implementation Plan — Garapan Deck

- [x] 1. Build the static app skeleton
  - [x] 1.1 Create `app/index.html` with the three wallet cards, mining
    timer section and deadline list (Indonesian labels, dark theme)
  - [x] 1.2 Create `app/app.js` rendering from `data.json`, with
    per-second countdown timers for the miners
  - [x] 1.3 Create `app/data.json` from verified on-chain facts only
    (Agent Pass #30/#31/#32, PTAH 3.988,61 Aprilia, PXIO rates/caps,
    $LAB 500.000/wallet, open deadlines) — populated 2026-11-24 ~20:35 WIB,
    53 holdings, 21 deadlines, 10 price notes; BNB/$PXIO/$LAB/FLUOR and
    ownerOf #30/#31/#32 re-verified live via BSC RPC that evening
  - [x] 1.4 Verify in a browser: renders, timers tick, no wallet prompt,
    no console errors — verified 2026-11-24 with headless Chromium
    (mobile 390px screenshot + DOM check: 53 holdings, 21 deadlines,
    10 price rows, all 3 miners PENH)
- [x] 2. Add live prices (DexScreener, pairs only)
  - [x] 2.1 Fetch price/liquidity/24h change for tokens with a known pair
    — checked 2026-11-24: DexScreener returns NO pair for $PXIO
    (V3 pool 0xb99d…f76 exists on-chain but is not indexed) and 0 pairs
    for $LAB; app.js attempts the fetch and degrades to the static note
  - [x] 2.2 Show "belum ada pair" for tokens without one; never invent a price
- [ ] 3. Deploy and record
  - [ ] 3.1 Deploy the static folder to Netlify (same API route as Agent Pass)
  - [ ] 3.2 Record the live URL in README.md and in the Devpost draft
- [ ] 4. Submission package (needs Mohammad)
  - [ ] 4.1 Public GitHub repo under atinkonik56-bot with `/.kiro` at root
  - [ ] 4.2 Demo video under 3 minutes (screen recording of the deck)
  - [ ] 4.3 Devpost submission text (features, how Kiro was used)
  - [ ] 4.4 Submit before 5 Dec 2026 05:00 WIB
