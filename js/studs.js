/* ============================================================
   RETRIEVERFORGE — STUD DIRECTORY LOGIC
   ============================================================ */

let rfActiveStuds = [];

document.addEventListener('DOMContentLoaded', () => {
  renderNav('studs.html');
  rfActiveStuds = [...RF_DATA.studs];
  applyAndRender();

  document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', applyAndRender);
  });
  document.getElementById('rf-sort-select').addEventListener('change', applyAndRender);
  document.getElementById('rf-clear-filters').addEventListener('click', () => {
    document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.checked = false);
    applyAndRender();
  });
});

function getCheckedValues(filterName) {
  return Array.from(document.querySelectorAll(`input[data-filter="${filterName}"]:checked`)).map(cb => cb.value);
}

function studMatchesHealth(stud, required) {
  if (required.length === 0) return true;
  return required.every(req => {
    if (req === 'EIC Clear') return stud.clearances.some(c => c.includes('EIC: Clear'));
    if (req === 'CNM Clear') return stud.clearances.some(c => c.includes('CNM: Clear'));
    if (req === 'OFA Good or Better') return stud.clearances.some(c => c.includes('Hips: Good') || c.includes('Hips: Excellent'));
    return true;
  });
}

function applyAndRender() {
  const healthFilters = getCheckedValues('health');
  const titleFilters = getCheckedValues('titles');
  const colorFilters = getCheckedValues('color');
  const ratingFilters = getCheckedValues('rating').map(Number);
  const minRating = ratingFilters.length ? Math.max(...ratingFilters) : 0;

  let results = RF_DATA.studs.filter(s => {
    if (!studMatchesHealth(s, healthFilters)) return false;
    if (titleFilters.length && !titleFilters.some(t => s.titles.includes(t))) return false;
    if (colorFilters.length && !colorFilters.includes(s.color)) return false;
    if (s.rating < minRating) return false;
    return true;
  });

  const sortVal = document.getElementById('rf-sort-select').value;
  if (sortVal === 'rating') results.sort((a,b) => b.rating - a.rating);
  if (sortVal === 'proven') results.sort((a,b) => b.stats.offspring - a.stats.offspring);
  if (sortVal === 'newest') results.sort((a,b) => new Date(b.dob) - new Date(a.dob));
  if (sortVal === 'alpha') results.sort((a,b) => a.callName.localeCompare(b.callName));

  document.getElementById('rf-result-count').textContent = `${results.length} stud${results.length === 1 ? '' : 's'}`;

  const grid = document.getElementById('rf-studs-grid');
  if (results.length === 0) {
    grid.innerHTML = `<div class="rf-directory-empty" style="grid-column:1/-1">No studs match these filters. <button class="rf-see-all" onclick="document.getElementById('rf-clear-filters').click()" style="background:none;border:none;cursor:pointer">Clear filters</button></div>`;
    return;
  }
  grid.innerHTML = results.map(studCardHTMLDir).join('');
}

function studCardHTMLDir(stud) {
  return `
  <a href="dog.html?id=${stud.id}" class="rf-stud-card">
    <div class="rf-stud-card__photo">
      ${RFArt.portraitScene({ id: 'dir-' + stud.id })}
      <div class="rf-stud-card__rating">
        <span class="rf-stud-card__rating-num">${stud.rating}</span>
        <span class="rf-stud-card__rating-label">SFR</span>
      </div>
    </div>
    <div class="rf-stud-card__body">
      <div class="rf-stud-card__name">${stud.callName}</div>
      <div class="rf-stud-card__call">${stud.name}</div>
      <div class="rf-stud-card__meta">
        ${stud.titles.map(t => `<span class="rf-pill rf-pill--dark">${t}</span>`).join('')}
        ${stud.clearances.some(c => c.includes('EIC: Clear')) ? `<span class="rf-pill rf-pill--verified">EIC Clear</span>` : ''}
      </div>
      <div class="rf-stud-card__stats">
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${stud.stats.offspring}</span><span class="rf-stud-card__stat-label">Offspring</span></div>
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${stud.location.split(',')[1]?.trim() || stud.location}</span><span class="rf-stud-card__stat-label">State</span></div>
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${stud.stats.studFee}</span><span class="rf-stud-card__stat-label">Stud Fee</span></div>
      </div>
    </div>
  </a>`;
}
