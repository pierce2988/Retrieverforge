/* ============================================================
   RETRIEVERFORGE — BREEDER DIRECTORY LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('breeders.html');
  applyAndRenderBreeders();
  document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.addEventListener('change', applyAndRenderBreeders));
  document.getElementById('rf-sort-select').addEventListener('change', applyAndRenderBreeders);
});

function applyAndRenderBreeders() {
  const verifiedOnly = document.querySelector('input[data-filter="verified"]')?.checked;
  let results = RF_DATA.breeders.filter(b => !verifiedOnly || b.verified);

  const sortVal = document.getElementById('rf-sort-select').value;
  if (sortVal === 'rating') results.sort((a,b) => b.rating - a.rating);
  if (sortVal === 'litters') results.sort((a,b) => b.littersCount - a.littersCount);
  if (sortVal === 'founded') results.sort((a,b) => a.founded - b.founded);
  if (sortVal === 'alpha') results.sort((a,b) => a.name.localeCompare(b.name));

  document.getElementById('rf-result-count').textContent = `${results.length} breeder${results.length === 1 ? '' : 's'}`;
  document.getElementById('rf-breeders-grid').innerHTML = results.map(breederCardHTMLDir).join('');
}

function breederCardHTMLDir(b) {
  const initials = b.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return `
  <a href="breeder.html?id=${b.id}" class="rf-breeder-card">
    <div class="rf-breeder-card__top">
      <div class="rf-breeder-card__mark">${initials}</div>
      <div><div class="rf-breeder-card__name">${b.name}</div><div class="rf-breeder-card__loc">${b.location}</div></div>
      ${b.verified ? `<span style="margin-left:auto" class="rf-pill rf-pill--verified">Verified</span>` : ''}
    </div>
    <p class="rf-breeder-card__bio">${b.bio}</p>
    <div class="rf-breeder-card__row">
      <div class="rf-breeder-card__stat"><div class="rf-breeder-card__stat-val">${b.studsCount}</div><div class="rf-breeder-card__stat-label">Studs</div></div>
      <div class="rf-breeder-card__stat"><div class="rf-breeder-card__stat-val">${b.littersCount}</div><div class="rf-breeder-card__stat-label">Litters</div></div>
      <div class="rf-breeder-card__stat"><div class="rf-breeder-card__stat-val">${b.rating}</div><div class="rf-breeder-card__stat-label">Rating</div></div>
    </div>
  </a>`;
}
