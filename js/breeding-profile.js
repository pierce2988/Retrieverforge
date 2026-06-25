/* ============================================================
   RETRIEVERFORGE — BREEDING PROFILE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  const params = new URLSearchParams(window.location.search);
  const breeding = RF_DATA.breedings.find(b => b.id === params.get('id')) || RF_DATA.breedings[0];
  const sire = RF_DATA.getDog(breeding.sireId);
  const dam = breeding.damId ? RF_DATA.getDog(breeding.damId) : null;
  const damName = dam ? dam.callName : (breeding.damName || 'TBD');
  document.title = `${sire.callName} × ${damName} — RetrieverForge`;

  document.getElementById('rf-breadcrumb').innerHTML = `<a href="index.html" style="color:inherit">Home</a> / <a href="breedings.html" style="color:inherit">Breedings</a> / ${sire.callName} × ${damName}`;

  document.getElementById('rf-bp-sire-photo').innerHTML = RFArt.portraitScene({ id: 'bp-sire-' + breeding.id });
  document.getElementById('rf-bp-dam-photo').innerHTML = RFArt.portraitScene({ id: 'bp-dam-' + breeding.id, light: true });
  document.getElementById('rf-bp-status').textContent = breeding.status;
  document.getElementById('rf-bp-status').className = `rf-pill ${breeding.status === 'Completed' ? 'rf-pill--verified' : 'rf-pill--copper'}`;
  document.getElementById('rf-bp-title').textContent = `${sire.callName} × ${damName}`;
  document.getElementById('rf-bp-meta').textContent = `${RF_DATA.getBreeder(breeding.breeder).name} · Bred ${new Date(breeding.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}${breeding.puppyCount ? ' · ' + breeding.puppyCount + ' puppies' : ''}`;

  // Parents
  document.getElementById('rf-bp-parents').innerHTML = `
    <a href="dog.html?id=${sire.id}" class="rf-bp-parent-card">
      <div class="rf-bp-parent-card__photo">${RFArt.portraitScene({ id: 'bpp-sire-' + breeding.id })}</div>
      <div><div class="rf-bp-parent-card__role">Sire</div><div class="rf-bp-parent-card__name">${sire.callName}</div><div class="rf-caption">${sire.titles.join(' · ')}</div></div>
    </a>
    ${dam ? `
    <a href="dog.html?id=${dam.id}" class="rf-bp-parent-card">
      <div class="rf-bp-parent-card__photo">${RFArt.portraitScene({ id: 'bpp-dam-' + breeding.id, light:true })}</div>
      <div><div class="rf-bp-parent-card__role">Dam</div><div class="rf-bp-parent-card__name">${dam.callName}</div><div class="rf-caption">${dam.titles.join(' · ')}</div></div>
    </a>` : `
    <div class="rf-bp-parent-card">
      <div class="rf-bp-parent-card__photo">${RFArt.portraitScene({ id: 'bpp-dam-pending-' + breeding.id, light:true })}</div>
      <div><div class="rf-bp-parent-card__role">Dam</div><div class="rf-bp-parent-card__name">${damName}</div><div class="rf-caption">Profile pending breeder verification</div></div>
    </div>`}`;

  // Pedigree snapshot — reuse sire's pedigree generator if present, else simple parent-only view
  const ped = RF_DATA.pedigrees[sire.id];
  if (ped) {
    const g = ped.grandparents;
    document.getElementById('rf-bp-pedigree').innerHTML = `
    <div class="rf-pedigree__scroll" style="min-width:660px">
      <div class="rf-pedigree__gen">
        <div class="rf-pedigree__gen-label rf-micro">Sire's Side</div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${sire.callName}</div><div class="rf-pedigree__node-titles">${sire.titles.join(' · ')}</div></div>
      </div>
      <div class="rf-pedigree__gen">
        <div class="rf-pedigree__gen-label rf-micro">Sire's Parents</div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${g.sireSire.name}</div><div class="rf-pedigree__node-titles">${g.sireSire.titles.join(' · ')}</div></div>
        <div class="rf-pedigree__node"><div class="rf-pedigree__node-name">${g.sireDam.name}</div><div class="rf-pedigree__node-titles">${g.sireDam.titles.join(' · ')}</div></div>
      </div>
    </div>`;
  } else {
    document.getElementById('rf-bp-pedigree').innerHTML = `<p class="rf-caption" style="padding:var(--sp-4)">Full pedigree snapshot available on each parent's individual dog profile.</p>`;
  }

  // Health summary — merge clearances from both parents
  const healthItems = [...sire.clearances, ...(dam ? dam.clearances : [])];
  document.getElementById('rf-bp-health').innerHTML = healthItems.map(c => {
    const isClean = ['Clear','Normal','Good','Excellent'].some(w => c.includes(w)) && !c.includes('Pending');
    return `<span class="rf-clearance-tag">${isClean ? RFArt.icons.check : RFArt.icons.shield} ${c}</span>`;
  }).join('');

  document.getElementById('rf-bp-notes').textContent = breeding.notes;

  document.getElementById('rf-bp-gallery').innerHTML = Array.from({length: 6}).map((_,i) =>
    `<div class="rf-gallery-tile">${RFArt.retrieveScene({ id: `bpgal-${breeding.id}-${i}` })}</div>`).join('');

  // Future offspring tracking
  const offspringSection = document.getElementById('rf-bp-offspring-section');
  const offspring = RF_DATA.allDogs.filter(d => {
    const dPed = RF_DATA.pedigrees[d.id];
    return dPed && dPed.sire === breeding.sireId && dPed.dam === breeding.damId;
  });
  if (offspring.length === 0) {
    offspringSection.innerHTML = `<span class="rf-eyebrow">FUTURE OFFSPRING TRACKING</span><p class="rf-caption" style="margin-top:var(--sp-4)">No offspring profiles linked yet. ${breeding.status === 'Planned' ? 'This breeding has not yet produced a litter.' : ''}</p>`;
  } else {
    document.getElementById('rf-bp-offspring').innerHTML = offspring.map(d => `
      <a href="dog.html?id=${d.id}" class="rf-stud-card">
        <div class="rf-stud-card__photo">${RFArt.portraitScene({ id: 'bpoff-' + d.id })}
          <div class="rf-stud-card__rating"><span class="rf-stud-card__rating-num">${d.rating}</span><span class="rf-stud-card__rating-label">SFR</span></div>
        </div>
        <div class="rf-stud-card__body">
          <div class="rf-stud-card__name">${d.callName}</div>
          <div class="rf-stud-card__call">${d.name}</div>
        </div>
      </a>`).join('');
  }

  // Performance updates — derived from sire/dam performance records after the breeding date
  const perfSection = document.getElementById('rf-bp-perf-section');
  const records = [...(RF_DATA.performance[sire.id] || []), ...(dam ? (RF_DATA.performance[dam.id] || []) : [])]
    .filter(r => new Date(r.date) >= new Date(breeding.date))
    .sort((a,b) => new Date(b.date) - new Date(a.date));
  if (records.length === 0) {
    perfSection.style.display = 'none';
  } else {
    document.getElementById('rf-bp-perf-updates').innerHTML = records.map(r => `
      <div class="rf-bp-perf-update">
        <div class="rf-bp-perf-update__dot"></div>
        <div>
          <div class="rf-bp-perf-update__date">${new Date(r.date).toLocaleDateString('en-US', { month: 'long', day:'numeric', year: 'numeric' })}</div>
          <div>${r.event} — ${r.placement}</div>
        </div>
      </div>`).join('');
  }

  // Sidebar
  const breeder = RF_DATA.getBreeder(breeding.breeder);
  const initials = breeder.name.split(' ').map(w=>w[0]).slice(0,2).join('');
  document.getElementById('rf-bp-breeder-mount').innerHTML = `
    <span class="rf-eyebrow">BREEDER</span>
    <div class="rf-sidebar-card__top" style="margin-top:var(--sp-3)">
      <div class="rf-sidebar-card__mark">${initials}</div>
      <div><div class="rf-sidebar-card__name">${breeder.name}</div><div class="rf-sidebar-card__loc">${breeder.location}</div></div>
    </div>
    <a href="breeder.html?id=${breeder.id}" class="rf-btn rf-btn--ghost-light rf-btn--block">View Program</a>`;

  document.getElementById('rf-bp-stats-mount').innerHTML = `
    <span class="rf-eyebrow">BREEDING DETAILS</span>
    <div style="margin-top:var(--sp-4); display:flex; flex-direction:column; gap:var(--sp-3)">
      <div style="display:flex; justify-content:space-between"><span class="rf-caption">Status</span><span class="rf-body-sm">${breeding.status}</span></div>
      <div style="display:flex; justify-content:space-between"><span class="rf-caption">Date</span><span class="rf-body-sm">${new Date(breeding.date).toLocaleDateString('en-US', { month: 'short', day:'numeric', year: 'numeric' })}</span></div>
      <div style="display:flex; justify-content:space-between"><span class="rf-caption">Puppies</span><span class="rf-body-sm">${breeding.puppyCount ?? 'TBD'}</span></div>
    </div>`;
});
