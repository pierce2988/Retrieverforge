/* ============================================================
   RETRIEVERFORGE — LITTER DIRECTORY LOGIC
   ============================================================ */

let rfActiveLitterTab = 'Upcoming';

document.addEventListener('DOMContentLoaded', () => {
  renderNav('litters.html');
  renderLitterGrid();
  document.querySelectorAll('.rf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rf-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      rfActiveLitterTab = tab.dataset.tab;
      renderLitterGrid();
    });
  });
});

function renderLitterGrid() {
  const results = RF_DATA.litters.filter(l => l.status === rfActiveLitterTab);
  const grid = document.getElementById('rf-litters-grid');
  if (results.length === 0) {
    grid.innerHTML = `<div class="rf-directory-empty" style="grid-column:1/-1">No ${rfActiveLitterTab.toLowerCase()} litters right now. Check back soon.</div>`;
    return;
  }
  grid.innerHTML = results.map(litterCardHTMLDir).join('');
}

function litterCardHTMLDir(l) {
  const breeding = RF_DATA.breedings.find(b => b.id === l.breedingId);
  const sire = RF_DATA.getDog(breeding.sireId);
  const dam = breeding.damId ? RF_DATA.getDog(breeding.damId) : null;
  const damName = dam ? dam.callName : (breeding.damName || 'TBD');
  const breeder = RF_DATA.getBreeder(l.breeder);
  const statusPillClass = l.status === 'Upcoming' ? 'rf-pill--copper' : (l.status === 'Current' ? 'rf-pill--verified' : 'rf-pill--dark');
  return `
  <a href="litter.html?id=${l.id}" class="rf-litter-card">
    <div class="rf-litter-card__photo">
      ${RFArt.retrieveScene({ id: 'litdir-' + l.id })}
      <div class="rf-litter-card__status"><span class="rf-pill ${statusPillClass}">${l.status}</span></div>
    </div>
    <div class="rf-litter-card__body">
      <div class="rf-litter-card__title">${sire.callName} × ${damName}</div>
      <div class="rf-litter-card__meta">${breeder.name}</div>
      <div class="rf-litter-card__meta" style="margin-top:4px">${l.status === 'Past' ? 'Whelped ' + new Date(l.whelped).toLocaleDateString('en-US', {month:'short', year:'numeric'}) : (l.available != null ? l.available + ' available of ' + (l.total || '—') : 'Details soon')}</div>
    </div>
  </a>`;
}
