# Garapan Deck — Kiroween 2026

**Hackathon:** Kiroween 2026 (Devpost, sponsor AWS) — $100,000 total prizes
**Category:** Frankenstein — stitch together seemingly incompatible things into one app
**Submission deadline:** 5 Dec 2026, 05:00 WIB (Dec 4, 2:00 PM PT)
**Credit request deadline:** 2 Dec 2026, 03:00 WIB (Dec 1, 12:00 PM PT) — 4,000 free Kiro credits

## What it is

One dashboard for Mohammad's three Binance Agent ID wallets
(misbah995.ai, aprilia21.ai, junaidi21.ai) that stitches together things
that normally live in separate places:

- On-chain holdings per wallet (free-mint NFTs, PTAH, $PXIO, $LAB, $AGN, $LOOT, …)
- PXIO mining timers — storage cap 150 $PXIO, claim before it fills
- Claim deadlines and competition result dates (Kaggle, make.fun, Daisy, $LAB pool)
- Live prices where a pair exists (DexScreener), plainly marked "no pair yet" otherwise

Everything is read-only. No signing, no spending, no wallet connection.

## Eligibility — verified 2026-11-24 from the official rules

https://kiroween.devpost.com/rules — the "NOT open to" list names Quebec,
Argentina, Brazil, Italy, Philippines, Russia, Cuba, Iran, North Korea,
Syria, Belarus, Crimea, DNR, LNR, UAE and OFAC-sanctioned countries.
**Indonesia is NOT on that list.** (Some third-party summaries wrongly
list Indonesia as excluded — the official rules page is the authority.)

## Build status

- Kiro CLI 3.5.0 installed and verified in this VM
  (`curl -fsSL https://cli.kiro.dev/install | bash`, `kiro-cli --version` → 3.5.0)
  — **auth status: NOT logged in** (`kiro-cli whoami` → "Not logged in",
  checked 2026-11-24). Login needs Mohammad's Kiro account; the app was
  built with regular tools instead, no login attempted.
- Spec written in `.kiro/specs/garapan-deck/` (requirements, design, tasks)
- Steering in `.kiro/steering/product.md`
- **App COMPLETE 2026-11-24 ~20:35 WIB** (static, deployable to Netlify):
  `app/index.html` (55 lines), `app/app.js` (114 lines), `app/data.json`
  (7,678 bytes, pretty-printed). Data: 3 wallets, 53 holdings, 3 miners,
  21 deadlines, 10 price notes. BNB / $PXIO / $LAB / FLUOR balances and
  Agent Pass ownerOf #30/#31/#32 re-verified live via BSC RPC that evening;
  DexScreener checked — NO pair for $PXIO (V3 pool exists on-chain but is
  not indexed) and 0 pairs for $LAB, so the app shows "belum ada pair"
  honestly and the client-side fetch degrades to the static note.
  Verified rendering with headless Chromium (mobile 390px screenshot +
  DOM check, no console errors, no wallet prompt). Tasks 1.x and 2.x in
  `.kiro/specs/garapan-deck/tasks.md` are checked off; 3.x (deploy) and
  4.x (submission package) remain.

## Still needed

1. ~~Create a Kiro account / Builder ID (kiro.dev)~~ — **DONE 2026-11-24 ~20:43 WIB** (signed in with Google hudinmisbah32@gmail.com, free plan 50 credits, User ID d-9067c98495…).
2. ~~Register for the hackathon at https://kiroween.devpost.com~~ — **DONE 2026-11-24 ~21:09 WIB** ("Thanks for registering!").
3. ~~Request the 4,000 free Kiro credits via the Credit Request Form~~ — **SUBMITTED 2026-11-24 ~21:00 WIB** ("Jawaban Anda telah direkam."); review within 48 business hours; redeem the code by 4 Dec. Identity verification (ID photo + face via Didit) instructions arrive by email — Devpost profile name should match KTP "Mohammad Misbah Hudin" exactly (currently "misbah hudin").
4. At submit time: public GitHub repo under atinkonik56-bot with `/.kiro`
   at the root, live app URL, demo video under 3 minutes, short write-up.

## Prizes

1st $30,000 · 2nd $20,000 · 3rd $10,000 · category winners $5,000 each.
Judging 16 Dec 2026 – 29 Jan 2027; winners announced ~3 Feb 2027.
