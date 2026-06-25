/* ============================================================
   RETRIEVERFORGE — BREEDINGS DIRECTORY LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('breedings.html');
  applyAndRenderBreedings();
  document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.addEventListener('change', applyAndRenderBreedings));
  document.getElementById('rf-sort-select').addEventListener('change', applyAndRenderBreedings);
});

function applyAndRenderBreedings() {
  const statusFilters = Array.from(document.querySelectorAll('input[data-filter="status"]:checked')).map(cb => cb.value);
  let results = RF_DATA.breedings.filter(b => statusFilters.length === 0 || statusFilters.includes(b.status));

  const sortVal = document.getElementById('rf-sort-select').value;
  if (sortVal === 'newest') results.sort((a,b) => new Date(b.date) - new Date(a.date));
  if (sortVal === 'puppies') results.sort((a,b) => (b.puppyCount||0) - (a.puppyCount||0));

  document.getElementById('rf-result-count').textContent = `${results.length} breeding${results.length === 1 ? '' : 's'}`;
  const grid = document.getElementById('rf-breedings-grid');
  if (results.length === 0) {
    grid.innerHTML = `<div class="rf-directory-empty" style="grid-column:1/-1">No breedings match these filters.</div>`;
    return;
  }
  grid.innerHTML = results.map(breedingCardHTMLDir).join('');
}

function breedingCardHTMLDir(b) {
  const sire = RF_DATA.getDog(b.sireId);
  const dam = b.damId ? RF_DATA.getDog(b.damId) : null;
  const damName = dam ? dam.callName : (b.damName || 'TBD');
  const breeder = RF_DATA.getBreeder(b.breeder);
  return `
  <a href="breeding.html?id=${b.id}" class="rf-breeding-card">
    <div class="rf-breeding-card__pair">
      <div class="rf-breeding-card__half">${RFArt.profileScene({ id: 'bsd-' + b.id })}</div>
      <div class="rf-breeding-card__half">${RFArt.profileScene({ id: 'bdd-' + b.id, flip: true })}</div>
      <div class="rf-breeding-card__x">×</div>
    </div>
    <div class="rf-breeding-card__body">
      <div class="rf-breeding-card__names">${sire.callName} × ${damName}</div>
      <div class="rf-breeding-card__meta">${breeder.name} · ${new Date(b.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
      <div class="rf-breeding-card__foot">
        <span class="rf-pill ${b.status === 'Completed' ? 'rf-pill--verified' : 'rf-pill--copper'}">${b.status}</span>
        <span class="rf-caption">${b.puppyCount ? b.puppyCount + ' puppies' : 'Pending'}</span>
      </div>
    </div>
  </a>`;
}
