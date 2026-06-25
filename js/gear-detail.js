/* ============================================================
   RETRIEVERFORGE — GEAR DETAIL LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  const params = new URLSearchParams(window.location.search);
  const item = RF_DATA.gear.find(g => g.id === params.get('id')) || RF_DATA.gear[0];
  document.title = `${item.name} — RetrieverForge`;

  document.getElementById('rf-breadcrumb').innerHTML = `<a href="index.html" style="color:inherit">Home</a> / <a href="gear.html" style="color:inherit">Gear Reviews</a> / ${item.name}`;
  document.getElementById('rf-gd-photo').innerHTML = RFArt.portraitScene({ id: 'gd-' + item.id, light: true });
  document.getElementById('rf-gd-cat').textContent = item.cat;
  document.getElementById('rf-gd-name').textContent = item.name;
  document.getElementById('rf-gd-score').textContent = item.score;
  document.getElementById('rf-gd-community').textContent = item.community + '★';
  document.getElementById('rf-gd-pros').innerHTML = item.pros.map(p => `<li>${p}</li>`).join('');
  document.getElementById('rf-gd-cons').innerHTML = item.cons.map(c => `<li>${c}</li>`).join('');
  document.getElementById('rf-gd-narrative').textContent = `Tested across a full hunting season by working retriever owners in the field, the ${item.name} earned its score on consistency under real conditions — not spec-sheet numbers. ${item.pros[0]}, and most owners found the trade-offs (${item.cons[0].toLowerCase()}) reasonable given the price point.`;

  const related = RF_DATA.gear.filter(g => g.id !== item.id && g.cat === item.cat);
  const fallback = RF_DATA.gear.filter(g => g.id !== item.id).slice(0,3);
  const list = (related.length ? related : fallback).slice(0,3);
  document.getElementById('rf-gd-related').innerHTML = list.map(g => `
    <a href="gear-detail.html?id=${g.id}" class="rf-gear-card">
      <div class="rf-gear-card__photo">${RFArt.portraitScene({ id: 'gdrel-' + g.id, light: true })}</div>
      <div class="rf-gear-card__cat">${g.cat}</div>
      <div class="rf-gear-card__name">${g.name}</div>
      <div class="rf-gear-card__score"><span class="rf-gear-card__score-num">${g.score}</span><span class="rf-gear-card__score-max">/ 10</span></div>
    </a>`).join('');
});
