# Requirements — Garapan Deck

## Introduction

A single-page dashboard for one person managing three Binance Agent ID
wallets on BSC. Today the same facts live in chat logs, cron watches and
memory files; the deck puts them in one glanceable place.

## Requirements

### Requirement 1 — Three-wallet overview

**User Story:** As Mohammad, I want to see all three wallets on one screen,
so I know what each one holds without asking in chat.

#### Acceptance Criteria

1. WHEN the page loads THEN it SHALL show one card per wallet
   (misbah995.ai, aprilia21.ai, junaidi21.ai) with its EVM address.
2. WHEN a wallet card renders THEN it SHALL list that wallet's known
   holdings (NFTs by project, token balances) from a local data file.
3. WHEN a balance is unknown or unverified THEN the card SHALL say so
   plainly instead of inventing a number.

### Requirement 2 — PXIO mining timers

**User Story:** As Mohammad, I want to see when each PXIO miner fills up,
so I claim before accrual is wasted.

#### Acceptance Criteria

1. WHEN the page loads THEN it SHALL show each miner's rate (19/hr Aprilia,
   10/hr Misbah, 10/hr Junaidi) and storage cap (150 $PXIO).
2. WHEN a last-claim time is known THEN it SHALL show a live countdown to
   full and highlight miners that are already full.
3. WHEN the countdown passes zero THEN it SHALL read "PENH — klaim sekarang".

### Requirement 3 — Deadlines

**User Story:** As Mohammad, I want every open deadline in one list, so
nothing with a hard date slips past.

#### Acceptance Criteria

1. WHEN the page loads THEN it SHALL list dated items (competition results,
   pool openings, claim windows) sorted by nearest date.
2. WHEN an item's date has passed THEN it SHALL move to a "Selesai / lewat"
   section instead of disappearing silently.

### Requirement 4 — Prices, honestly

**User Story:** As Mohammad, I want prices only where a real pair exists,
so I never act on an invented price.

#### Acceptance Criteria

1. WHEN a token has a DexScreener pair THEN the card MAY show its live
   price, liquidity and 24h change with the check time.
2. WHEN a token has no pair THEN the card SHALL say "belum ada pair —
   belum bisa dijual" and SHALL NOT show a price.

### Requirement 5 — Read-only, no wallet connection

**User Story:** As Mohammad, I want the deck to be safe to open anywhere,
so it never asks me to connect a wallet or sign anything.

#### Acceptance Criteria

1. WHEN the page loads THEN it SHALL NOT request a wallet connection.
2. WHEN the page loads THEN it SHALL NOT include any button that signs,
   sends, swaps or approves a transaction.
