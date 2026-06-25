/* ============================================================
   RETRIEVERFORGE — BREEDER PROFILE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  const params = new URLSearchParams(window.location.search);
  const breeder = RF_DATA.getBreeder(params.get('id')) || RF_DATA.breeders[0];
  document.title = `${breeder.name} — RetrieverForge`;

  document.getElementById('rf-breeder-art').innerHTML = RFArt.marshBanner({ id: 'breederhero-' + breeder.id, dark: true });
  document.getElementById('rf-breadcrumb').innerHTML = `<a href="index.html" style="color:inherit">Home</a> / <a href="breeders.html" style="color:inherit">Breeders</a> / ${breeder.name}`;
  document.getElementById('rf-breeder-mark').textContent = breeder.name.split(' ').map(w=>w[0]).slice(0,2).join('');
  document.getElementById('rf-breeder-badges').innerHTML = breeder.verified ? `<span class="rf-pill rf-pill--verified">Verified Breeder</span>` : `<span class="rf-pill rf-pill--dark">Unverified</span>`;
  document.getElementById('rf-breeder-name').textContent = breeder.name;
  document.getElementById('rf-breeder-loc').textContent = `${breeder.location} · Established ${breeder.founded}`;
  document.getElementById('rf-breeder-bio').textContent = breeder.bio;

  document.getElementById('rf-breeder-photos').innerHTML = Array.from({length: 6}).map((_,i) =>
    `<div class="rf-gallery-tile">${RFArt.marshBanner({ id: `bphoto-${breeder.id}-${i}`, dark: i % 2 === 0 })}</div>`).join('');

  const ownDogs = RF_DATA.allDogs.filter(d => d.breeder === breeder.id);
  const studsOwned = ownDogs.filter(d => d.sex === 'Male');
  const femalesOwned = ownDogs.filter(d => d.sex === 'Female');

  document.getElementById('rf-breeder-studs').innerHTML = studsOwned.length
    ? studsOwned.map(dogCardHTMLShared).join('')
    : `<div class="rf-directory-empty" style="grid-column:1/-1">No studs currently listed for this program.</div>`;
  document.getElementById('rf-breeder-females').innerHTML = femalesOwned.length
    ? femalesOwned.map(dogCardHTMLShared).join('')
    : `<div class="rf-directory-empty" style="grid-column:1/-1">No females currently listed for this program.</div>`;

  const currentLitters = RF_DATA.litters.filter(l => l.breeder === breeder.id && l.status !== 'Past');
  document.getElementById('rf-breeder-litters').innerHTML = currentLitters.length
    ? currentLitters.map(litterCardShared).join('')
    : `<p class="rf-caption">No current or upcoming litters listed.</p>`;

  const pastBreedings = RF_DATA.breedings.filter(b => b.breeder === breeder.id);
  document.getElementById('rf-breeder-breedings').innerHTML = pastBreedings.length
    ? pastBreedings.map(breedingCardShared).join('')
    : `<div class="rf-directory-empty" style="grid-column:1/-1">No breedings recorded yet.</div>`;

  const reviews = RF_DATA.reviews[breeder.id] || [];
  document.getElementById('rf-breeder-reviews').innerHTML = reviews.length
    ? reviews.map(r => `
      <div class="rf-review">
        <div class="rf-review__top">
          <span class="rf-review__name">${r.name}</span>
          <span class="rf-review__stars">${Array.from({length:5}).map((_,i) => i < r.stars ? RFArt.icons.star : '').join('')}</span>
        </div>
        <p class="rf-review__text">${r.text}</p>
        <span class="rf-review__date">${new Date(r.date).toLocaleDateString('en-US', { month:'long', year:'numeric' })}</span>
      </div>`).join('')
    : `<p class="rf-caption">No reviews yet.</p>`;

  document.getElementById('rf-breeder-stats-mount').innerHTML = `
    <span class="rf-eyebrow">PROGRAM STATS</span>
    <div style="margin-top:var(--sp-4); display:flex; flex-direction:column; gap:var(--sp-3)">
      <div style="display:flex; justify-content:space-between"><span class="rf-caption">Rating</span><span class="rf-body-sm">${breeder.rating} (${breeder.reviews} reviews)</span></div>
      <div style="display:flex; justify-content:space-between"><span class="rf-caption">Litters Produced</span><span class="rf-body-sm">${breeder.littersCount}</span></div>
      <div style="display:flex; justify-content:space-between"><span class="rf-caption">Established</span><span class="rf-body-sm">${breeder.founded}</span></div>
    </div>`;

  document.getElementById('rf-breeder-contact-mount').innerHTML = `
    <span class="rf-eyebrow">CONTACT</span>
    <p class="rf-body-sm" style="margin-top:var(--sp-3); color:var(--rf-smoke)">Reach out directly about available litters, stud service, or upcoming breedings.</p>
    <button class="rf-btn rf-btn--copper rf-btn--block" style="margin-top:var(--sp-4)">Message ${breeder.name}</button>
    <a href="#" class="rf-btn rf-btn--ghost-light rf-btn--block" style="margin-top:var(--sp-2)">Visit Website</a>`;
});

function dogCardHTMLShared(dog) {
  return `
  <a href="dog.html?id=${dog.id}" class="rf-stud-card">
    <div class="rf-stud-card__photo">${RFArt.portraitScene({ id: 'bdog-' + dog.id })}
      <div class="rf-stud-card__rating"><span class="rf-stud-card__rating-num">${dog.rating}</span><span class="rf-stud-card__rating-label">SFR</span></div>
    </div>
    <div class="rf-stud-card__body">
      <div class="rf-stud-card__name">${dog.callName}</div>
      <div class="rf-stud-card__call">${dog.name}</div>
      <div class="rf-stud-card__meta">${dog.titles.map(t => `<span class="rf-pill rf-pill--dark">${t}</span>`).join('')}</div>
    </div>
  </a>`;
}

function litterCardShared(l) {
  const breeding = RF_DATA.breedings.find(b => b.id === l.breedingId);
  const sire = RF_DATA.getDog(breeding.sireId);
  const dam = breeding.damId ? RF_DATA.getDog(breeding.damId) : null;
  const damName = dam ? dam.callName : (breeding.damName || 'TBD');
  const statusPillClass = l.status === 'Upcoming' ? 'rf-pill--copper' : 'rf-pill--verified';
  return `
  <a href="litter.html?id=${l.id}" class="rf-litter-card" style="width:300px">
    <div class="rf-litter-card__photo">${RFArt.retrieveScene({ id: 'blit-' + l.id })}
      <div class="rf-litter-card__status"><span class="rf-pill ${statusPillClass}">${l.status}</span></div>
    </div>
    <div class="rf-litter-card__body">
      <div class="rf-litter-card__title">${sire.callName} × ${damName}</div>
      <div class="rf-litter-card__meta">${l.available ? l.available + ' available' : 'See details'}</div>
    </div>
  </a>`;
}

function breedingCardShared(b) {
  const sire = RF_DATA.getDog(b.sireId);
  const dam = b.damId ? RF_DATA.getDog(b.damId) : null;
  const damName = dam ? dam.callName : (b.damName || 'TBD');
  return `
  <a href="breeding.html?id=${b.id}" class="rf-breeding-card">
    <div class="rf-breeding-card__pair">
      <div class="rf-breeding-card__half">${RFArt.profileScene({ id: 'bbs-' + b.id })}</div>
      <div class="rf-breeding-card__half">${RFArt.profileScene({ id: 'bbd-' + b.id, flip: true })}</div>
      <div class="rf-breeding-card__x">×</div>
    </div>
    <div class="rf-breeding-card__body">
      <div class="rf-breeding-card__names">${sire.callName} × ${damName}</div>
      <div class="rf-breeding-card__meta">${new Date(b.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
      <div class="rf-breeding-card__foot">
        <span class="rf-pill ${b.status === 'Completed' ? 'rf-pill--verified' : 'rf-pill--copper'}">${b.status}</span>
        <span class="rf-caption">${b.puppyCount ? b.puppyCount + ' puppies' : 'Pending'}</span>
      </div>
    </div>
  </a>`;
}
