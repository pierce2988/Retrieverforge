/* ============================================================
   RETRIEVERFORGE — DOG PROFILE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  const params = new URLSearchParams(window.location.search);
  const dog = RF_DATA.getDog(params.get('id')) || RF_DATA.studs[0];
  document.title = `${dog.callName} — ${dog.name} — RetrieverForge`;

  renderHero(dog);
  renderBreadcrumb(dog);
  renderRatingBlock(dog);
  renderBio(dog);
  renderPedigree(dog);
  renderClearances(dog);
  renderPerformance(dog);
  renderVideos(dog);
  renderGallery(dog);
  renderOffspring(dog);
  renderDogLitters(dog);
  renderRelatedDogs(dog);
  renderSidebar(dog);
});

function ageFromDOB(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  const years = diff / (1000 * 60 * 60 * 24 * 365.25);
  if (years < 1) return `${Math.round(years * 12)} mo`;
  return `${Math.floor(years)} yr`;
}

function renderHero(dog) {
  document.getElementById('rf-profile-art').innerHTML = RFArt.retrieveScene({ id: 'hero-' + dog.id, bg: '#1D1D23' });
  document.getElementById('rf-titles-row').innerHTML = dog.titles.map(t => `<span class="rf-pill rf-pill--copper">${t}</span>`).join('') +
    (dog.isProspect ? `<span class="rf-pill rf-pill--dark">In Development</span>` : '');
  document.getElementById('rf-dog-name').textContent = dog.name;
  document.getElementById('rf-dog-callname').textContent = `Call name: ${dog.callName}`;
  document.getElementById('rf-dog-meta').innerHTML = `
    <span>${RFArt.icons.pin}${dog.location}</span>
    <span>${ageFromDOB(dog.dob)} old · ${dog.sex}</span>
    <span>${dog.color} ${dog.breed}</span>`;
}

function renderBreadcrumb(dog) {
  document.getElementById('rf-breadcrumb').innerHTML =
    `<a href="index.html" style="color:inherit">Home</a> / <a href="${dog.sex === 'Male' ? 'studs.html' : 'dogs.html'}" style="color:inherit">${dog.sex === 'Male' ? 'Studs' : 'Dogs'}</a> / ${dog.callName}`;
}

function renderRatingBlock(dog) {
  const subs = [
    { key: 'health', label: 'Health' },
    { key: 'performance', label: 'Performance' },
    { key: 'production', label: 'Production' },
    { key: 'pedigree', label: 'Pedigree' },
    { key: 'confidence', label: 'Confidence' },
  ];
  document.getElementById('rf-rating-block').innerHTML = `
    <div class="rf-rating-card__dial">${RFGauge.bigDial({ score: dog.rating, size: 200, id: 'profile-' + dog.id })}</div>
    <div>
      <div class="rf-rating-card__label">
        <span class="rf-caption">${dog.isProspect ? 'Provisional rating — limited data as a developing prospect.' : 'Composite score across five verified factors.'}</span>
      </div>
      <div class="rf-rating-card__subs">
        ${subs.map(s => RFGauge.miniDial({ score: dog.sub[s.key], label: s.label, id: 'profile-' + dog.id + '-' + s.key })).join('')}
      </div>
    </div>`;
}

function renderBio(dog) {
  document.getElementById('rf-dog-bio').textContent = dog.bio;
}

function pedNode(name, titles = [], health = '') {
  return `
  <div class="rf-pedigree__node">
    <div class="rf-pedigree__node-name">${name}</div>
    ${titles.length ? `<div class="rf-pedigree__node-titles">${titles.join(' · ')}</div>` : ''}
    ${health ? `<div class="rf-pedigree__node-health">${health}</div>` : ''}
  </div>`;
}

function renderPedigree(dog) {
  const mount = document.getElementById('rf-pedigree');
  const ped = RF_DATA.pedigrees[dog.id];

  if (!ped) {
    mount.innerHTML = `<p class="rf-caption" style="padding:var(--sp-4)">Full three-generation pedigree not yet verified for ${dog.callName}. Breeders can submit supporting documentation to add it.</p>`;
    return;
  }

  const sire = ped.sire ? RF_DATA.getDog(ped.sire) : null;
  const dam = ped.dam ? RF_DATA.getDog(ped.dam) : null;
  const g = ped.grandparents;
  const gg = ped.greatGrandparents;

  mount.innerHTML = `
  <div class="rf-pedigree__scroll">
    <div class="rf-pedigree__gen">
      <div class="rf-pedigree__gen-label rf-micro">${dog.callName}</div>
      ${pedNode(dog.name, dog.titles)}
    </div>
    <div class="rf-pedigree__gen">
      <div class="rf-pedigree__gen-label rf-micro">Parents</div>
      ${pedNode(sire ? sire.name : ped.sireName, sire ? sire.titles : [])}
      ${pedNode(dam ? dam.name : ped.damName, dam ? dam.titles : [])}
    </div>
    <div class="rf-pedigree__gen">
      <div class="rf-pedigree__gen-label rf-micro">Grandparents</div>
      ${pedNode(g.sireSire.name, g.sireSire.titles, g.sireSire.health)}
      ${pedNode(g.sireDam.name, g.sireDam.titles, g.sireDam.health)}
      ${pedNode(g.damSire.name, g.damSire.titles, g.damSire.health)}
      ${pedNode(g.damDam.name, g.damDam.titles, g.damDam.health)}
    </div>
    <div class="rf-pedigree__gen">
      <div class="rf-pedigree__gen-label rf-micro">Great-Grandparents</div>
      ${gg.map(x => pedNode(x.name, x.titles)).join('')}
    </div>
  </div>`;
}

function renderClearances(dog) {
  const goodIcons = ['Clear', 'Normal', 'Good', 'Excellent'];
  document.getElementById('rf-clearances').innerHTML = dog.clearances.map(c => {
    const isClean = goodIcons.some(w => c.includes(w)) && !c.includes('Pending');
    return `<span class="rf-clearance-tag">${isClean ? RFArt.icons.check : RFArt.icons.shield} ${c}</span>`;
  }).join('');
}

function renderPerformance(dog) {
  const section = document.getElementById('rf-performance-section');
  const records = RF_DATA.performance[dog.id];
  if (!records || records.length === 0) {
    if (dog.isProspect) {
      document.getElementById('rf-performance').innerHTML = `<p class="rf-caption">No competition record yet — ${dog.callName} is still in early training toward field trial and hunt test starts.</p>`;
    } else {
      section.style.display = 'none';
    }
    return;
  }
  document.getElementById('rf-performance').innerHTML = records.map(r => `
    <div class="rf-perf-row">
      <span class="rf-perf-row__date">${new Date(r.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      <span class="rf-perf-row__event">${r.event}</span>
      <span class="rf-perf-row__placement">${r.placement}</span>
      <span class="rf-perf-row__pts">${r.pts ? r.pts + ' pts' : '—'}</span>
    </div>`).join('');
}

function renderVideos(dog) {
  const count = dog.isProspect ? 2 : 3;
  document.getElementById('rf-videos').innerHTML = Array.from({length: count}).map((_, i) => `
    <div class="rf-video-tile">
      <span class="scene">${RFArt.retrieveScene({ id: `vid-${dog.id}-${i}` })}</span>
      <div class="rf-video-tile__play"><div class="rf-video-tile__play-btn">${RFArt.icons.play}</div></div>
    </div>`).join('');
}

function renderGallery(dog) {
  document.getElementById('rf-gallery').innerHTML = Array.from({length: 6}).map((_, i) => `
    <div class="rf-gallery-tile">${RFArt.portraitScene({ id: `gal-${dog.id}-${i}`, light: i % 2 === 0 })}</div>`).join('');
}

function renderOffspring(dog) {
  const section = document.getElementById('rf-offspring-section');
  const offspring = dog.id === 'kane-cropper' || dog.id === 'jinx-southern-timber'
    ? [RF_DATA.getDog('southern-timber-kobe')]
    : (dog.id === 'thunder-ridge-cash' || dog.id === 'bella-thunder-ridge' ? [] : []);

  if (offspring.length === 0) {
    section.style.display = 'none';
    return;
  }
  document.getElementById('rf-offspring').innerHTML = offspring.map(studCardHTMLShared).join('');
}

function renderDogLitters(dog) {
  const section = document.getElementById('rf-litters-section');
  const litters = RF_DATA.litters.filter(l => {
    const b = RF_DATA.breedings.find(b => b.id === l.breedingId);
    return b && (b.sireId === dog.id || b.damId === dog.id);
  });
  if (litters.length === 0) { section.style.display = 'none'; return; }
  document.getElementById('rf-dog-litters').innerHTML = litters.map(l => litterCardHTMLShared(l)).join('');
}

function renderRelatedDogs(dog) {
  const related = RF_DATA.allDogs.filter(d => d.id !== dog.id && d.breeder === dog.breeder).slice(0, 4);
  const fallback = RF_DATA.allDogs.filter(d => d.id !== dog.id && d.breed === dog.breed).slice(0, 4);
  const list = related.length ? related : fallback;
  document.getElementById('rf-related-dogs').innerHTML = list.map(studCardHTMLShared).join('');
}

function renderSidebar(dog) {
  const breeder = RF_DATA.getBreeder(dog.breeder);
  const initials = breeder.name.split(' ').map(w => w[0]).slice(0,2).join('');
  document.getElementById('rf-breeder-card-mount').innerHTML = `
    <span class="rf-eyebrow">BREEDER OF RECORD</span>
    <div class="rf-sidebar-card__top" style="margin-top:var(--sp-3)">
      <div class="rf-sidebar-card__mark">${initials}</div>
      <div>
        <div class="rf-sidebar-card__name">${breeder.name}</div>
        <div class="rf-sidebar-card__loc">${breeder.location}</div>
      </div>
    </div>
    ${breeder.verified ? `<span class="rf-pill rf-pill--verified">Verified Breeder</span>` : ''}
    <a href="breeder.html?id=${breeder.id}" class="rf-btn rf-btn--ghost-light rf-btn--block">View Program</a>`;

  document.getElementById('rf-owner-card-mount').innerHTML = `
    <span class="rf-eyebrow">OWNER</span>
    <div class="rf-sidebar-card__top" style="margin-top:var(--sp-3)">
      <div class="rf-sidebar-card__mark">${initials}</div>
      <div>
        <div class="rf-sidebar-card__name">${breeder.name}</div>
        <div class="rf-sidebar-card__role">Owner / Handler</div>
      </div>
    </div>`;
}

/* ---------- Shared card renderers (mirrors home.js but kept local to avoid load-order coupling) ---------- */
function studCardHTMLShared(stud) {
  return `
  <a href="dog.html?id=${stud.id}" class="rf-stud-card">
    <div class="rf-stud-card__photo">
      ${RFArt.portraitScene({ id: 'rel-' + stud.id })}
      <div class="rf-stud-card__rating">
        <span class="rf-stud-card__rating-num">${stud.rating}</span>
        <span class="rf-stud-card__rating-label">SFR</span>
      </div>
    </div>
    <div class="rf-stud-card__body">
      <div class="rf-stud-card__name">${stud.callName}</div>
      <div class="rf-stud-card__call">${stud.name}</div>
      <div class="rf-stud-card__meta">${stud.titles.map(t => `<span class="rf-pill rf-pill--dark">${t}</span>`).join('')}</div>
    </div>
  </a>`;
}

function litterCardHTMLShared(l) {
  const breeding = RF_DATA.breedings.find(b => b.id === l.breedingId);
  const sire = RF_DATA.getDog(breeding.sireId);
  const dam = breeding.damId ? RF_DATA.getDog(breeding.damId) : null;
  const damName = dam ? dam.callName : (breeding.damName || 'TBD');
  const statusPillClass = l.status === 'Upcoming' ? 'rf-pill--copper' : (l.status === 'Current' ? 'rf-pill--verified' : 'rf-pill--dark');
  return `
  <a href="litter.html?id=${l.id}" class="rf-litter-card" style="width:300px">
    <div class="rf-litter-card__photo">
      ${RFArt.retrieveScene({ id: 'litshared-' + l.id })}
      <div class="rf-litter-card__status"><span class="rf-pill ${statusPillClass}">${l.status}</span></div>
    </div>
    <div class="rf-litter-card__body">
      <div class="rf-litter-card__title">${sire.callName} × ${damName}</div>
      <div class="rf-litter-card__meta">${RF_DATA.getBreeder(l.breeder).name}</div>
    </div>
  </a>`;
}
