/* ============================================================
   RETRIEVERFORGE — SHARED CHROME (nav + footer + search modal)
   ============================================================ */

const RF_NAV_LINKS = [
  { href: 'dogs.html', label: 'Dogs' },
  { href: 'studs.html', label: 'Studs' },
  { href: 'breedings.html', label: 'Breedings' },
  { href: 'breeders.html', label: 'Breeders' },
  { href: 'litters.html', label: 'Litters' },
  { href: 'rankings.html', label: 'Rankings' },
  { href: 'gear.html', label: 'Gear' },
  { href: 'articles.html', label: 'Articles' },
];

function rfMark(size = 28) {
  return `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <path d="M4 32 V4 H17 C23 4 26 7.5 26 12 C26 15.5 24 18 20.5 19.2 L27 32 H21 L15 20 H9.5 V32 Z
             M9.5 15.5 H16.5 C19 15.5 20.5 14 20.5 12 C20.5 10 19 8.5 16.5 8.5 H9.5 Z" fill="#F97316"/>
    <path d="M16 11 C15.4 9.6 13.6 9 12.4 9.8 C11.4 10.5 11.3 11.9 12.1 12.7 L15.2 15.6 L17.8 12.5 C18.5 11.6 18.2 10.3 17.2 9.7 C16.3 9.1 15 9.5 16 11 Z" fill="#0D0F11"/>
  </svg>`;
}

function renderNav(activeHref = '') {
  const navEl = document.getElementById('rf-nav-mount');
  if (!navEl) return;
  const links = RF_NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${activeHref === l.href ? 'is-active' : ''}">${l.label}</a>`
  ).join('');
  const drawerLinks = RF_NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('');

  navEl.innerHTML = `
  <nav class="rf-nav">
    <div class="rf-container rf-nav__inner">
      <a href="index.html" class="rf-nav__mark">${rfMark()}<span class="rf-nav__mark-word">Retriever<span class="accent">Forge</span></span></a>
      <div class="rf-nav__links">${links}</div>
      <div class="rf-nav__actions">
        <button class="rf-nav__search-btn" id="rf-search-trigger" aria-label="Search RetrieverForge">
          ${RFArt.icons.search}<span>Search</span><kbd>/</kbd>
        </button>
        <a href="signin.html" class="rf-btn rf-btn--copper rf-btn--sm" style="display:none" id="rf-signin-desktop">Sign In</a>
        <button class="rf-nav__burger" id="rf-burger" aria-label="Open menu">${RFArt.icons.menu}</button>
      </div>
    </div>
  </nav>
  <div class="rf-drawer" id="rf-drawer">
    <div class="rf-drawer__top">
      <a href="index.html" class="rf-nav__mark">${rfMark()}<span class="rf-nav__mark-word">Retriever<span class="accent">Forge</span></span></a>
      <button class="rf-drawer__close" id="rf-drawer-close" aria-label="Close menu">${RFArt.icons.close}</button>
    </div>
    <div class="rf-drawer__links">${drawerLinks}</div>
    <div class="rf-drawer__foot">
      <a href="signin.html" class="rf-btn rf-btn--copper rf-btn--block">Sign In</a>
    </div>
  </div>`;

  document.getElementById('rf-signin-desktop').style.display = 'inline-flex';

  const burger = document.getElementById('rf-burger');
  const drawer = document.getElementById('rf-drawer');
  const drawerClose = document.getElementById('rf-drawer-close');
  burger?.addEventListener('click', () => drawer.classList.add('is-open'));
  drawerClose?.addEventListener('click', () => drawer.classList.remove('is-open'));

  document.getElementById('rf-search-trigger')?.addEventListener('click', openSearchModal);
}

function renderFooter() {
  const el = document.getElementById('rf-footer-mount');
  if (!el) return;
  el.innerHTML = `
  <footer class="rf-footer">
    <div class="rf-container">
      <div class="rf-footer__top">
        <div class="rf-footer__brand">
          <div class="rf-footer__mark">${rfMark()}<span>Retriever<span class="accent">Forge</span></span></div>
          <p class="rf-footer__tagline">The modern platform for researching hunting retrievers — verified breedings, proven studs, and honest bloodlines.</p>
        </div>
        <div class="rf-footer__col">
          <div class="rf-footer__col-title">Discover</div>
          <ul>
            <li><a href="dogs.html">Dogs</a></li>
            <li><a href="studs.html">Studs</a></li>
            <li><a href="breedings.html">Breedings</a></li>
            <li><a href="litters.html">Litters</a></li>
          </ul>
        </div>
        <div class="rf-footer__col">
          <div class="rf-footer__col-title">Community</div>
          <ul>
            <li><a href="breeders.html">Breeders</a></li>
            <li><a href="rankings.html">Rankings</a></li>
            <li><a href="articles.html">Articles</a></li>
            <li><a href="gear.html">Gear Reviews</a></li>
          </ul>
        </div>
        <div class="rf-footer__col">
          <div class="rf-footer__col-title">Company</div>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Verification Standards</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div class="rf-footer__col">
          <div class="rf-footer__col-title">Legal</div>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Data Sources</a></li>
          </ul>
        </div>
      </div>
      <hr class="rf-seam rf-seam--dark">
      <div class="rf-footer__bottom">
        <div class="rf-footer__legal">© 2026 RETRIEVERFORGE · BUILT FOR THE WORKING RETRIEVER COMMUNITY</div>
        <div class="rf-footer__social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="YouTube">YT</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------- Universal Search Modal ---------- */
function openSearchModal() {
  let modal = document.getElementById('rf-search-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'rf-search-modal';
    modal.className = 'rf-search-modal';
    modal.innerHTML = `
      <div class="rf-search-modal__backdrop"></div>
      <div class="rf-search-modal__panel">
        <div class="rf-search-modal__input-row">
          ${RFArt.icons.search}
          <input type="text" placeholder="Search dogs, studs, breeders, bloodlines…" id="rf-search-input" autocomplete="off">
          <kbd>ESC</kbd>
        </div>
        <div class="rf-search-modal__results" id="rf-search-results"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.rf-search-modal__backdrop').addEventListener('click', closeSearchModal);
    modal.querySelector('#rf-search-input').addEventListener('input', (e) => runSiteSearch(e.target.value));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearchModal();
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault(); openSearchModal();
      }
    });
  }
  modal.classList.add('is-open');
  setTimeout(() => document.getElementById('rf-search-input')?.focus(), 50);
  runSiteSearch('');
}
function closeSearchModal() {
  document.getElementById('rf-search-modal')?.classList.remove('is-open');
}

function runSiteSearch(query) {
  const resultsEl = document.getElementById('rf-search-results');
  if (!resultsEl) return;
  const q = query.trim().toLowerCase();
  const data = (typeof RF_DATA !== 'undefined') ? RF_DATA.allSearchable() : [];
  const filtered = q === '' ? data.slice(0, 6) : data.filter(d => d.name.toLowerCase().includes(q) || d.meta.toLowerCase().includes(q)).slice(0, 8);

  if (filtered.length === 0) {
    resultsEl.innerHTML = `<div class="rf-search-modal__empty">No matches for "${query}". Try a dog name, kennel, or bloodline.</div>`;
    return;
  }
  const groups = {};
  filtered.forEach(item => { (groups[item.type] = groups[item.type] || []).push(item); });
  resultsEl.innerHTML = Object.entries(groups).map(([type, items]) => `
    <div class="rf-search-modal__group">
      <div class="rf-search-modal__group-label">${type}</div>
      ${items.map(item => `
        <a href="${item.href}" class="rf-search-modal__result">
          <span class="rf-search-modal__result-name">${item.name}</span>
          <span class="rf-search-modal__result-meta">${item.meta}</span>
        </a>`).join('')}
    </div>`).join('') + (query.trim() ? `<a href="search.html?q=${encodeURIComponent(query)}" class="rf-search-modal__result" style="justify-content:center; color:var(--rf-copper-dim); font-family:var(--rf-mono); font-size:var(--rf-size-caption)">See all results for "${query}"</a>` : '');
}

document.addEventListener('DOMContentLoaded', () => {
  renderFooter();
});
