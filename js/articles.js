/* ============================================================
   RETRIEVERFORGE — ARTICLES DIRECTORY LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('articles.html');
  applyAndRenderArticles();
  document.querySelectorAll('.rf-filters input[type=checkbox]').forEach(cb => cb.addEventListener('change', applyAndRenderArticles));
});

function applyAndRenderArticles() {
  const catFilters = Array.from(document.querySelectorAll('input[data-filter="cat"]:checked')).map(cb => cb.value);
  const results = RF_DATA.articles.filter(a => catFilters.length === 0 || catFilters.includes(a.cat));
  document.getElementById('rf-result-count').textContent = `${results.length} article${results.length === 1 ? '' : 's'}`;
  const grid = document.getElementById('rf-articles-grid');
  if (results.length === 0) {
    grid.innerHTML = `<div class="rf-directory-empty" style="grid-column:1/-1">No articles match these filters.</div>`;
    return;
  }
  grid.innerHTML = results.map(articleCardHTMLDir).join('');
}

function articleCardHTMLDir(a) {
  return `
  <a href="article.html?id=${a.id}" class="rf-article-card">
    <div class="rf-article-card__photo">${RFArt.marshBanner({ id: 'artdir-' + a.id, dark: false })}</div>
    <span class="rf-pill rf-pill--copper rf-article-card__cat">${a.cat}</span>
    <h3 class="rf-article-card__title">${a.title}</h3>
    <p class="rf-article-card__excerpt">${a.excerpt}</p>
    <div class="rf-article-card__meta">${a.author} · ${a.read} read</div>
  </a>`;
}
