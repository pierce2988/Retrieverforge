/* ============================================================
   RETRIEVERFORGE — RANKINGS LOGIC
   ============================================================ */

let rfActiveRankTab = 'topProducing';
const rfRankDeltas = ['up2','up1','flat','down1','up3','flat','down2','up1','flat','flat'];

document.addEventListener('DOMContentLoaded', () => {
  renderNav('rankings.html');
  renderRankings();
  document.querySelectorAll('.rf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rf-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      rfActiveRankTab = tab.dataset.tab;
      renderRankings();
    });
  });
});

function deltaHTML(i) {
  const code = rfRankDeltas[i % rfRankDeltas.length];
  if (code === 'flat') return `<span class="rf-rank-row__delta rf-rank-row__delta--flat">— No change</span>`;
  const dir = code.startsWith('up') ? 'up' : 'down';
  const n = code.replace(/[a-z]/g, '');
  return `<span class="rf-rank-row__delta rf-rank-row__delta--${dir}">${dir === 'up' ? '▲' : '▼'} ${n}</span>`;
}

function renderRankings() {
  const list = document.getElementById('rf-rank-list');
  let rows = [];

  if (rfActiveRankTab === 'topProducing') {
    rows = [...RF_DATA.studs].sort((a,b) => b.stats.offspring - a.stats.offspring)
      .map(s => ({ dog: s, metricVal: s.stats.offspring, metricLabel: 'Offspring', sub: `${s.stats.litters} litters` }));
  }
  if (rfActiveRankTab === 'topYoung') {
    rows = RF_DATA.studs.filter(s => (Date.now() - new Date(s.dob)) / (1000*60*60*24*365.25) < 4)
      .sort((a,b) => b.rating - a.rating)
      .map(s => ({ dog: s, metricVal: s.rating, metricLabel: 'SFR', sub: 'Under 4 years old' }));
  }
  if (rfActiveRankTab === 'highestRated') {
    rows = [...RF_DATA.allDogs].filter(d => !d.isProspect).sort((a,b) => b.rating - a.rating)
      .map(s => ({ dog: s, metricVal: s.rating, metricLabel: 'SFR', sub: s.titles.join(' · ') }));
  }
  if (rfActiveRankTab === 'mostTitled') {
    rows = [...RF_DATA.allDogs].sort((a,b) => b.titles.length - a.titles.length)
      .map(s => ({ dog: s, metricVal: s.titles.length, metricLabel: 'Titles', sub: s.titles.join(' · ') || 'No titles yet' }));
  }
  if (rfActiveRankTab === 'mostVerifiedLitters') {
    rows = [...RF_DATA.breeders].sort((a,b) => b.littersCount - a.littersCount)
      .map(b => ({ breeder: b, metricVal: b.littersCount, metricLabel: 'Litters', sub: b.location }));
  }
  if (rfActiveRankTab === 'mostViewed') {
    // Deterministic pseudo-view-count derived from rating + offspring for a stable demo ranking
    rows = [...RF_DATA.allDogs].map(d => ({ dog: d, views: d.rating * 140 + (d.stats?.offspring || 0) * 12 }))
      .sort((a,b) => b.views - a.views)
      .map(r => ({ dog: r.dog, metricVal: r.views.toLocaleString(), metricLabel: 'Views (30d)', sub: r.dog.location }));
  }
  if (rfActiveRankTab === 'topBreeders') {
    rows = [...RF_DATA.breeders].sort((a,b) => b.rating - a.rating)
      .map(b => ({ breeder: b, metricVal: b.rating, metricLabel: 'Rating', sub: `${b.reviews} reviews` }));
  }

  if (rows.length === 0) {
    list.innerHTML = `<div class="rf-directory-empty">No dogs currently qualify for this ranking.</div>`;
    return;
  }

  list.innerHTML = rows.map((r, i) => {
    const rankClass = i === 0 ? 'rf-rank-row__num--top1' : i === 1 ? 'rf-rank-row__num--top2' : i === 2 ? 'rf-rank-row__num--top3' : '';
    if (r.breeder) {
      const b = r.breeder;
      const initials = b.name.split(' ').map(w=>w[0]).slice(0,2).join('');
      return `
      <a href="breeder.html?id=${b.id}" class="rf-rank-row">
        <div class="rf-rank-row__num ${rankClass}">${i+1}</div>
        <div class="rf-rank-row__photo" style="background:var(--rf-black); display:flex; align-items:center; justify-content:center; color:var(--rf-copper-hi); font-family:var(--rf-display); font-weight:600">${initials}</div>
        <div><div class="rf-rank-row__name">${b.name}</div><div class="rf-rank-row__sub">${r.sub}</div></div>
        <div class="rf-rank-row__metric"><div class="rf-rank-row__metric-val">${r.metricVal}</div><div class="rf-rank-row__metric-label">${r.metricLabel}</div></div>
        ${deltaHTML(i)}
      </a>`;
    }
    const d = r.dog;
    return `
    <a href="dog.html?id=${d.id}" class="rf-rank-row">
      <div class="rf-rank-row__num ${rankClass}">${i+1}</div>
      <div class="rf-rank-row__photo">${RFArt.portraitScene({ id: 'rank-' + d.id + '-' + i })}</div>
      <div><div class="rf-rank-row__name">${d.callName}</div><div class="rf-rank-row__sub">${r.sub}</div></div>
      <div class="rf-rank-row__metric"><div class="rf-rank-row__metric-val">${r.metricVal}</div><div class="rf-rank-row__metric-label">${r.metricLabel}</div></div>
      ${deltaHTML(i)}
    </a>`;
  }).join('');
}
