/* ============================================================
   RETRIEVERFORGE — HOME PAGE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('index.html');

  // Hero art + search icon
  document.getElementById('rf-hero-art').innerHTML = RFArt.marshBanner({ id: 'hero', dark: true });
  document.getElementById('rf-hero-search-icon').innerHTML = RFArt.icons.search;

  // Hero search submit -> search modal
  document.getElementById('rf-hero-search').addEventListener('submit', (e) => {
    e.preventDefault();
    openSearchModal();
    setTimeout(() => {
      const input = document.getElementById('rf-search-input');
      if (input) { input.value = document.getElementById('rf-hero-search-input').value; runSiteSearch(input.value); }
    }, 60);
  });
  document.querySelectorAll('.rf-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('rf-hero-search-input').value = chip.dataset.q;
      openSearchModal();
      setTimeout(() => {
        const input = document.getElementById('rf-search-input');
        if (input) { input.value = chip.dataset.q; runSiteSearch(chip.dataset.q); }
      }, 60);
    });
  });

  renderFeaturedStuds();
  renderRecentBreedings();
  renderRatingDemo();
  renderNewestLitters();
  renderTopBreeders();
  renderFeaturedArticles();
  renderBloodlineArt();
});

function studCardHTML(stud) {
  return `
  <a href="dog.html?id=${stud.id}" class="rf-stud-card">
    <div class="rf-stud-card__photo">
      ${RFArt.portraitScene({ id: 'sc-' + stud.id })}
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
      </div>
      <div class="rf-stud-card__stats">
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${stud.stats.offspring}</span><span class="rf-stud-card__stat-label">Offspring</span></div>
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${stud.stats.litters}</span><span class="rf-stud-card__stat-label">Litters</span></div>
        <div class="rf-stud-card__stat"><span class="rf-stud-card__stat-val">${stud.color}</span><span class="rf-stud-card__stat-label">Color</span></div>
      </div>
    </div>
  </a>`;
}

function renderFeaturedStuds() {
  const featured = RF_DATA.studs.filter(s => !s.isProspect).sort((a,b) => b.rating - a.rating).slice(0, 4);
  document.getElementById('rf-featured-studs').innerHTML = featured.map(studCardHTML).join('');
}

function breedingCardHTML(b) {
  const sire = RF_DATA.getDog(b.sireId);
  const dam = b.damId ? RF_DATA.getDog(b.damId) : null;
  const damName = dam ? dam.callName : (b.damName || 'TBD');
  const breeder = RF_DATA.getBreeder(b.breeder);
  return `
  <a href="breeding.html?id=${b.id}" class="rf-breeding-card">
    <div class="rf-breeding-card__pair">
      <div class="rf-breeding-card__half">${RFArt.profileScene({ id: 'bs-' + b.id })}</div>
      <div class="rf-breeding-card__half">${RFArt.profileScene({ id: 'bd-' + b.id, flip: true })}</div>
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

function renderRecentBreedings() {
  document.getElementById('rf-recent-breedings').innerHTML = RF_DATA.breedings.slice(0, 3).map(breedingCardHTML).join('');
}

function renderRatingDemo() {
  const stud = RF_DATA.getDog('whistling-wings-duke');
  const subs = [
    { key: 'health', label: 'Health' },
    { key: 'performance', label: 'Performance' },
    { key: 'production', label: 'Production' },
    { key: 'pedigree', label: 'Pedigree' },
    { key: 'confidence', label: 'Confidence' },
  ];
  document.getElementById('rf-rating-demo').innerHTML = `
    <div class="rf-rating-card__dial">${RFGauge.bigDial({ score: stud.rating, size: 200, id: 'home-demo' })}</div>
    <div>
      <div class="rf-rating-card__label">
        <span class="rf-eyebrow">STUDFORGE RATING</span>
        <h3 class="rf-display-sm on-dark" style="margin-top:6px">${stud.name}</h3>
      </div>
      <div class="rf-rating-card__subs">
        ${subs.map(s => RFGauge.miniDial({ score: stud.sub[s.key], label: s.label, id: 'home-' + s.key })).join('')}
      </div>
    </div>`;
}

function litterCardHTML(l) {
  const breeding = RF_DATA.breedings.find(b => b.id === l.breedingId);
  const sire = RF_DATA.getDog(breeding.sireId);
  const dam = breeding.damId ? RF_DATA.getDog(breeding.damId) : null;
  const damName = dam ? dam.callName : (breeding.damName || 'TBD');
  const statusPillClass = l.status === 'Upcoming' ? 'rf-pill--copper' : (l.status === 'Current' ? 'rf-pill--verified' : 'rf-pill--dark');
  return `
  <a href="litter.html?id=${l.id}" class="rf-litter-card" style="width:300px">
    <div class="rf-litter-card__photo">
      ${RFArt.retrieveScene({ id: 'lit-' + l.id })}
      <div class="rf-litter-card__status"><span class="rf-pill ${statusPillClass}">${l.status}</span></div>
    </div>
    <div class="rf-litter-card__body">
      <div class="rf-litter-card__title">${sire.callName} × ${damName}</div>
      <div class="rf-litter-card__meta">${RF_DATA.getBreeder(l.breeder).name} · Whelped ${new Date(l.whelped).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
    </div>
  </a>`;
}

function renderNewestLitters() {
  document.getElementById('rf-newest-litters').innerHTML = RF_DATA.litters.map(litterCardHTML).join('');
}

function breederCardHTML(b) {
  const initials = b.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return `
  <a href="breeder.html?id=${b.id}" class="rf-breeder-card">
    <div class="rf-breeder-card__top">
      <div class="rf-breeder-card__mark">${initials}</div>
      <div>
        <div class="rf-breeder-card__name">${b.name}</div>
        <div class="rf-breeder-card__loc">${b.location}</div>
      </div>
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

function renderTopBreeders() {
  const top = [...RF_DATA.breeders].sort((a,b) => b.rating - a.rating).slice(0, 3);
  document.getElementById('rf-top-breeders').innerHTML = top.map(breederCardHTML).join('');
}

function articleCardHTML(a) {
  return `
  <a href="article.html?id=${a.id}" class="rf-article-card">
    <div class="rf-article-card__photo">${RFArt.marshBanner({ id: 'art-' + a.id, dark: false })}</div>
    <span class="rf-pill rf-pill--copper rf-article-card__cat">${a.cat}</span>
    <h3 class="rf-article-card__title">${a.title}</h3>
    <p class="rf-article-card__excerpt">${a.excerpt}</p>
    <div class="rf-article-card__meta">${a.author} · ${a.read} read</div>
  </a>`;
}

function renderFeaturedArticles() {
  document.getElementById('rf-featured-articles').innerHTML = RF_DATA.articles.slice(0, 3).map(articleCardHTML).join('');
}

function renderBloodlineArt() {
  document.querySelectorAll('.rf-bloodline-tile__art').forEach(el => {
    el.innerHTML = RFArt.retrieveScene({ id: 'bl-' + el.dataset.art });
  });
}
