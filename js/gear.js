/* ============================================================
   RETRIEVERFORGE — GEAR DIRECTORY LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('gear.html');
  applyAndRenderGear();
  document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.addEventListener('change', applyAndRenderGear));
  document.getElementById('rf-sort-select').addEventListener('change', applyAndRenderGear);
});

function applyAndRenderGear() {
  const catFilters = Array.from(document.querySelectorAll('input[data-filter="cat"]:checked')).map(cb => cb.value);
  let results = RF_DATA.gear.filter(g => catFilters.length === 0 || catFilters.includes(g.cat));

  const sortVal = document.getElementById('rf-sort-select').value;
  if (sortVal === 'score') results.sort((a,b) => b.score - a.score);
  if (sortVal === 'community') results.sort((a,b) => b.community - a.community);

  document.getElementById('rf-result-count').textContent = `${results.length} review${results.length === 1 ? '' : 's'}`;
  const grid = document.getElementById('rf-gear-grid');
  if (results.length === 0) {
    grid.innerHTML = `<div class="rf-directory-empty" style="grid-column:1/-1">No reviews match these filters.</div>`;
    return;
  }
  grid.innerHTML = results.map(gearCardHTML).join('');
}

function gearCardHTML(g) {
  return `
  <a href="gear-detail.html?id=${g.id}" class="rf-gear-card">
    <div class="rf-gear-card__photo">${RFArt.portraitScene({ id: 'gear-' + g.id, light: true })}</div>
    <div class="rf-gear-card__cat">${g.cat}</div>
    <div class="rf-gear-card__name">${g.name}</div>
    <div class="rf-gear-card__score">
      <span class="rf-gear-card__score-num">${g.score}</span>
      <span class="rf-gear-card__score-max">/ 10</span>
    </div>
    <span class="rf-pill rf-pill--copper">${g.community}★ Community</span>
  </a>`;
}
