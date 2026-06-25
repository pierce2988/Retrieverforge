/* ============================================================
   RETRIEVERFORGE — LITTER PROFILE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  const params = new URLSearchParams(window.location.search);
  const litter = RF_DATA.litters.find(l => l.id === params.get('id')) || RF_DATA.litters[0];
  const breeding = RF_DATA.breedings.find(b => b.id === litter.breedingId);
  const sire = RF_DATA.getDog(breeding.sireId);
  const dam = breeding.damId ? RF_DATA.getDog(breeding.damId) : null;
  const damName = dam ? dam.callName : (breeding.damName || 'TBD');
  document.title = `${sire.callName} × ${damName} Litter — RetrieverForge`;

  document.getElementById('rf-breadcrumb').innerHTML = `<a href="index.html" style="color:inherit">Home</a> / <a href="litters.html" style="color:inherit">Litters</a> / ${sire.callName} × ${damName}`;
  document.getElementById('rf-lit-sire-photo').innerHTML = RFArt.portraitScene({ id: 'lit-sire-' + litter.id });
  document.getElementById('rf-lit-dam-photo').innerHTML = RFArt.portraitScene({ id: 'lit-dam-' + litter.id, light: true });
  document.getElementById('rf-lit-status').textContent = litter.status;
  document.getElementById('rf-lit-status').className = `rf-pill ${litter.status === 'Upcoming' ? 'rf-pill--copper' : litter.status === 'Current' ? 'rf-pill--verified' : 'rf-pill--dark'}`;
  document.getElementById('rf-lit-title').textContent = `${sire.callName} × ${damName}`;
  document.getElementById('rf-lit-meta').textContent = `${RF_DATA.getBreeder(litter.breeder).name} · ${litter.status === 'Past' ? 'Whelped ' + new Date(litter.whelped).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'}) : 'Expected ' + new Date(litter.whelped).toLocaleDateString('en-US', {month:'long', year:'numeric'})}`;

  document.getElementById('rf-lit-parents').innerHTML = `
    <a href="dog.html?id=${sire.id}" class="rf-bp-parent-card">
      <div class="rf-bp-parent-card__photo">${RFArt.portraitScene({ id: 'litp-sire-' + litter.id })}</div>
      <div><div class="rf-bp-parent-card__role">Sire</div><div class="rf-bp-parent-card__name">${sire.callName}</div></div>
    </a>
    ${dam ? `
    <a href="dog.html?id=${dam.id}" class="rf-bp-parent-card">
      <div class="rf-bp-parent-card__photo">${RFArt.portraitScene({ id: 'litp-dam-' + litter.id, light:true })}</div>
      <div><div class="rf-bp-parent-card__role">Dam</div><div class="rf-bp-parent-card__name">${dam.callName}</div></div>
    </a>` : `<div class="rf-bp-parent-card"><div class="rf-bp-parent-card__photo">${RFArt.portraitScene({id:'litp-dam-pending',light:true})}</div><div><div class="rf-bp-parent-card__role">Dam</div><div class="rf-bp-parent-card__name">${damName}</div></div></div>`}`;

  const availEl = document.getElementById('rf-lit-availability');
  if (litter.status === 'Past') {
    availEl.innerHTML = `<p class="rf-caption">This litter is no longer available. ${litter.total} puppies were placed.</p>`;
  } else {
    availEl.innerHTML = `
      <div style="display:flex; align-items:baseline; gap:var(--sp-3)">
        <span style="font-family:var(--rf-mono); font-size:2rem; font-weight:700; color:var(--rf-copper-dim)">${litter.available ?? '—'}</span>
        <span class="rf-caption">of ${litter.total ?? 'an estimated 7–9'} puppies available</span>
      </div>`;
  }

  const healthItems = [...sire.clearances, ...(dam ? dam.clearances : [])];
  document.getElementById('rf-lit-health').innerHTML = healthItems.map(c => {
    const isClean = ['Clear','Normal','Good','Excellent'].some(w => c.includes(w)) && !c.includes('Pending');
    return `<span class="rf-clearance-tag">${isClean ? RFArt.icons.check : RFArt.icons.shield} ${c}</span>`;
  }).join('');

  const ped = RF_DATA.pedigrees[sire.id];
  if (ped) {
    document.getElementById('rf-lit-pedigree').innerHTML = `
    <div class="rf-pedigree__scroll" style="min-width:440px">
      <div class="rf-pedigree__gen">
        <div class="rf-pedigree__gen-label rf-micro">Parents</div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${sire.callName}</div><div class="rf-pedigree__node-titles">${sire.titles.join(' · ')}</div></div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${damName}</div><div class="rf-pedigree__node-titles">${dam ? dam.titles.join(' · ') : ''}</div></div>
      </div>
      <div class="rf-pedigree__gen">
        <div class="rf-pedigree__gen-label rf-micro">Grandparents</div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${ped.grandparents.sireSire.name}</div></div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${ped.grandparents.sireDam.name}</div></div>
      </div>
    </div>`;
  } else {
    document.getElementById('rf-lit-pedigree').innerHTML = `<p class="rf-caption" style="padding:var(--sp-4)">See each parent's individual profile for full pedigree detail.</p>`;
  }

  document.getElementById('rf-lit-photos').innerHTML = Array.from({length: 6}).map((_,i) =>
    `<div class="rf-gallery-tile">${RFArt.retrieveScene({ id: `litphoto-${litter.id}-${i}` })}</div>`).join('');

  const updatesEl = document.getElementById('rf-lit-updates');
  if (litter.status === 'Upcoming') {
    updatesEl.innerHTML = `<p class="rf-caption">Puppy updates begin once the litter is whelped. ${litter.notes}</p>`;
  } else {
    updatesEl.innerHTML = `
      <div class="rf-bp-perf-update"><div class="rf-bp-perf-update__dot"></div><div><div class="rf-bp-perf-update__date">Week 8</div><div>Health checks complete, first vaccinations administered.</div></div></div>
      <div class="rf-bp-perf-update"><div class="rf-bp-perf-update__dot"></div><div><div class="rf-bp-perf-update__date">Week 5</div><div>Puppy aptitude assessments completed; placement matching underway.</div></div></div>
      <div class="rf-bp-perf-update"><div class="rf-bp-perf-update__dot"></div><div><div class="rf-bp-perf-update__date">Week 2</div><div>${litter.notes}</div></div></div>`;
  }

  const breeder = RF_DATA.getBreeder(litter.breeder);
  const initials = breeder.name.split(' ').map(w=>w[0]).slice(0,2).join('');
  document.getElementById('rf-lit-breeder-mount').innerHTML = `
    <span class="rf-eyebrow">BREEDER</span>
    <div class="rf-sidebar-card__top" style="margin-top:var(--sp-3)">
      <div class="rf-sidebar-card__mark">${initials}</div>
      <div><div class="rf-sidebar-card__name">${breeder.name}</div><div class="rf-sidebar-card__loc">${breeder.location}</div></div>
    </div>
    <a href="breeder.html?id=${breeder.id}" class="rf-btn rf-btn--ghost-light rf-btn--block">View Program</a>`;
});
