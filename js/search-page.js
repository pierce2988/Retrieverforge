/* ============================================================
   RETRIEVERFORGE — SEARCH PAGE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  document.getElementById('rf-search-page-icon').innerHTML = RFArt.icons.search;
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  const input = document.getElementById('rf-search-page-input');
  input.value = initialQuery;
  runSearchPageQuery(initialQuery);
  input.addEventListener('input', (e) => runSearchPageQuery(e.target.value));
  input.focus();
});

function runSearchPageQuery(query) {
  const q = query.trim().toLowerCase();
  const data = RF_DATA.allSearchable();
  const filtered = q === '' ? data : data.filter(d => d.name.toLowerCase().includes(q) || d.meta.toLowerCase().includes(q));

  const resultsEl = document.getElementById('rf-search-page-results');
  if (filtered.length === 0) {
    resultsEl.innerHTML = `<div class="rf-directory-empty">No matches for "${query}". Try a dog name, kennel, or bloodline.</div>`;
    return;
  }
  const groups = {};
  filtered.forEach(item => { (groups[item.type] = groups[item.type] || []).push(item); });
  resultsEl.innerHTML = Object.entries(groups).map(([type, items]) => `
    <div class="rf-search-page__group">
      <span class="rf-search-page__group-label">${type} (${items.length})</span>
      ${items.map(item => `
        <a href="${item.href}" class="rf-search-page__row">
          <span class="rf-search-page__row-name">${item.name}</span>
          <span class="rf-search-page__row-meta">${item.meta}</span>
        </a>`).join('')}
    </div>`).join('');
}
