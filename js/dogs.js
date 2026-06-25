/* ============================================================
   RETRIEVERFORGE — DOG DIRECTORY LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('dogs.html');
  applyAndRenderDogs();
  document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.addEventListener('change', applyAndRenderDogs));
  document.getElementById('rf-sort-select').addEventListener('change', applyAndRenderDogs);
  document.getElementById('rf-clear-filters').addEventListener('click', () => {
    document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.checked = false);
    applyAndRenderDogs();
  });
});

function applyAndRenderDogs() {
  const sexFilters = Array.from(document.querySelectorAll('input[data-filter="sex"]:checked')).map(cb => cb.value);
  const colorFilters = Array.from(document.querySelectorAll('input[data-filter="color"]:checked')).map(cb => cb.value);
  const statusFilters = Array.from(document.querySelectorAll('input[data-filter="status"]:checked')).map(cb => cb.value);

  let results = RF_DATA.allDogs.filter(d => {
    if (sexFilters.length && !sexFilters.includes(d.sex)) return false;
    if (colorFilters.length && !colorFilters.includes(d.color)) return false;
    if (statusFilters.length) {
      const isProspect = !!d.isProspect;
      if (statusFilters.includes('Prospect') && !statusFilters.includes('Titled') && !isProspect) return false;
      if (statusFilters.includes('Titled') && !statusFilters.includes('Prospect') && isProspect) return false;
    }
    return true;
  });

  const sortVal = document.getElementById('rf-sort-select').value;
  if (sortVal === 'rating') results.sort((a,b) => b.rating - a.rating);
  if (sortVal === 'newest') results.sort((a,b) => new Date(b.dob) - new Date(a.dob));
  if (sortVal === 'alpha') results.sort((a,b) => a.callName.localeCompare(b.callName));

  document.getElementById('rf-result-count').textContent = `${results.length} dog${results.length === 1 ? '' : 's'}`;

  const grid = document.getElementById('rf-dogs-grid');
  if (results.length === 0) {
    grid.innerHTML = `<div class="rf-directory-empty" style="grid-column:1/-1">No dogs match these filters.</div>`;
    return;
  }
  grid.innerHTML = results.map(dogCardHTML).join('');
}

function dogCardHTML(dog) {
  return `
  <a href="dog.html?id=${dog.id}" class="rf-stud-card">
    <div class="rf-stud-card__photo">
      ${RFArt.portraitScene({ id: 'dogdir-' + dog.id })}
      <div class="rf-stud-card__rating">
        <span class="rf-stud-card__rating-num">${dog.rating}</span>
        <span class="rf-stud-card__rating-label">SFR</span>
      </div>
    </div>
    <div class="rf-stud-card__body">
      <div class="rf-stud-card__name">${dog.callName}</div>
      <div class="rf-stud-card__call">${dog.name}</div>
      <div class="rf-stud-card__meta">
        ${dog.titles.map(t => `<span class="rf-pill rf-pill--dark">${t}</span>`).join('')}
        <span class="rf-pill rf-pill--dark">${dog.sex}</span>
      </div>
      <div class="rf-stud-card__stats">
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${dog.color}</span><span class="rf-stud-card__stat-label">Color</span></div>
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${ageFromDOBShared(dog.dob)}</span><span class="rf-stud-card__stat-label">Age</span></div>
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${dog.location.split(',')[1]?.trim() || ''}</span><span class="rf-stud-card__stat-label">State</span></div>
      </div>
    </div>
  </a>`;
}

function ageFromDOBShared(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  const years = diff / (1000 * 60 * 60 * 24 * 365.25);
  if (years < 1) return `${Math.round(years * 12)}mo`;
  return `${Math.floor(years)}yr`;
}
