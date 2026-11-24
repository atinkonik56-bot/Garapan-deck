async function main() {
  const d = await (await fetch('data.json')).json();
  document.getElementById('updated').textContent =
    'Data terakhir diperbarui: ' + new Date(d.updatedAt).toLocaleString('id-ID');
  document.getElementById('checked').textContent = d.checkedAt || '';

  // Agent Pass summary
  const ap = d.agentPass;
  document.getElementById('agentpass').innerHTML =
    '<h2>🎫 Agent Pass — hackathon Binance Agent ID</h2>' +
    'Total di-mint: <b>' + ap.totalMinted + ' / ' + ap.maxSupply + '</b> · ' +
    'formulir proyek sudah terkirim 24 Nov 2026 · kontrak ' +
    '<span class="addr">' + ap.contract + '</span>';

  // Wallet cards
  const w = document.getElementById('wallets');
  for (const wallet of d.wallets) {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = '<h2>' + wallet.name + '</h2>' +
      '<div class="addr">' + wallet.address + '<br>Agent #' + wallet.agentId + '</div>' +
      '<div class="bnb">BNB: ' + wallet.bnb + '</div>' +
      '<ul>' + wallet.holdings.map(h => '<li>' + h.label + '</li>').join('') + '</ul>';
    w.appendChild(el);
  }

  // Miner timers
  const m = document.getElementById('miners');
  for (const miner of d.miners) {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = '<h2>' + miner.wallet + '</h2>' +
      '<div>' + miner.ratePerHour + ' $PXIO/jam · kapasitas ' + miner.cap + ' $PXIO</div>' +
      '<div class="timer" data-last="' + (miner.lastClaimAt || '') + '" data-full="' +
      (miner.fullSince || '') + '" data-rate="' +
      miner.ratePerHour + '" data-cap="' + miner.cap + '"></div>';
    m.appendChild(el);
  }

  // Prices: static note from data.json, then try a live DexScreener check
  // for tokens that have an address. A failed/empty lookup keeps the note.
  const pr = document.getElementById('prices');
  for (const p of d.prices) {
    const row = document.createElement('div');
    row.className = 'price';
    row.innerHTML = '<span class="sym">' + p.symbol + '</span>' +
      '<span class="val" data-token="' + (p.token || '') + '">' + p.pairNote + '</span>';
    pr.appendChild(row);
  }
  for (const el of document.querySelectorAll('#prices .val[data-token]')) {
    const token = el.dataset.token;
    if (!token) continue;
    try {
      const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/' + token);
      const j = await res.json();
      const pair = (j.pairs || [])[0];
      if (pair && pair.priceUsd) {
        const liq = pair.liquidity && pair.liquidity.usd ? '$' + Number(pair.liquidity.usd).toLocaleString('en-US') : '-';
        const chg = pair.priceChange && pair.priceChange.h24 != null ? pair.priceChange.h24 + '%' : '-';
        el.innerHTML = '<span class="ok">$' + pair.priceUsd + '</span> · likuiditas ' + liq + ' · 24j ' + chg;
      }
    } catch (e) {
      // keep the static note: "harga belum bisa dicek"
    }
  }

  // Deadlines, nearest first; done items get a green check
  const dl = document.getElementById('deadlines');
  const items = d.deadlines.slice().sort((a, b) => new Date(a.at) - new Date(b.at));
  const now = new Date();
  for (const item of items) {
    const at = new Date(item.at);
    const row = document.createElement('div');
    if (item.done) {
      row.className = 'deadline done';
      row.innerHTML = '<span>✓ ' + item.label + '</span><span>' +
        at.toLocaleString('id-ID', {day: 'numeric', month: 'short'}) + '</span>';
    } else {
      row.className = 'deadline' + (at < now ? ' past' : '');
      row.innerHTML = '<span>' + item.label + '</span><span>' +
        at.toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) + '</span>';
    }
    dl.appendChild(row);
  }

  // Per-second miner countdown
  function tick() {
    const nowMs = Date.now();
    document.querySelectorAll('.timer').forEach(el => {
      if (el.dataset.full) {
        el.innerHTML = '<span class="full">PENH ' + el.dataset.cap +
          ' $PXIO sejak ' + new Date(el.dataset.full).toLocaleString('id-ID') +
          ' — klaim sekarang</span>';
        return;
      }
      const last = new Date(el.dataset.last).getTime();
      const rate = parseFloat(el.dataset.rate);
      const cap = parseFloat(el.dataset.cap);
      const accrued = Math.min(cap, (nowMs - last) / 3600000 * rate);
      if (accrued >= cap) {
        el.innerHTML = '<span class="full">PENH ' + cap + ' $PXIO — klaim sekarang</span>';
      } else {
        const remainMs = (cap - accrued) / rate * 3600000;
        const h = Math.floor(remainMs / 3600000);
        const min = Math.floor(remainMs % 3600000 / 60000);
        el.innerHTML = '<span class="ok">' + accrued.toFixed(1) + ' / ' + cap +
          ' $PXIO</span> · penuh lagi dalam ' + h + ' jam ' + min + ' mnt';
      }
    });
  }
  tick();
  setInterval(tick, 1000);
}
main();
