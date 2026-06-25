/* ============================================================
   RETRIEVERFORGE — ARTICLE DETAIL LOGIC
   Original body copy written for this prototype.
   ============================================================ */

const RF_ARTICLE_BODIES = {
  'reading-a-pedigree': `
    <p>Most people learn to read a pedigree backwards. They start with the names — the National Champions, the famous kennels — and work toward a feeling of confidence. That feeling is usually misplaced. A pedigree full of titled dogs tells you what happened in the ring or the field. It tells you almost nothing about what's sitting underneath the surface in the genome.</p>
    <h2>Titles are a record of one dog, one season</h2>
    <p>A Field Champion title means a dog beat the competition entered on a specific weekend, under a specific set of judges, in specific conditions. It's real information, but it's a sample size of one dog performing under pressure — not a guarantee that the traits behind that performance pass cleanly to the next generation.</p>
    <h2>Clearances tell you what's actually being passed down</h2>
    <p>Hip and elbow scores, EIC, CNM, and PRA panels describe the biological material a dog is actually built from and will actually hand to its puppies. Two clear parents cannot produce an affected puppy for a simple recessive condition. A carrier paired with another carrier can. This is arithmetic, not opinion, and it matters more than any ribbon.</p>
    <h2>Weighing both together</h2>
    <p>The breeders worth trusting are the ones who can hold both pictures in their head at once: a sire's competition record as evidence of trainability and drive, and his clearance panel as evidence of what he's actually carrying. Neither one alone tells the whole story.</p>
  `,
  'eic-explainer': `
    <p>EIC (Exercise-Induced Collapse), CNM (Centronuclear Myopathy), and PRA (Progressive Retinal Atrophy) show up constantly in Labrador health discussions, and just as constantly get explained badly. Here's the version that actually matters for a breeding decision.</p>
    <h2>All three are simple recessive conditions</h2>
    <p>Each of these conditions is controlled by a single gene with two possible versions: a normal copy and a mutated copy. A dog needs two mutated copies — one from each parent — to be affected. A dog with one mutated copy and one normal copy is a carrier: outwardly normal, but capable of passing the mutated copy along.</p>
    <h2>The math that actually protects a litter</h2>
    <p>Clear × Clear: every puppy is clear. Clear × Carrier: roughly half the puppies will be carriers, but none will be affected. Carrier × Carrier: roughly a quarter of the puppies will be affected. This last pairing is the one responsible breeders avoid — but a carrier paired against a confirmed clear partner is a normal, low-risk decision many programs make deliberately.</p>
    <h2>Why disclosure matters more than perfection</h2>
    <p>Carrier status isn't a flaw to hide — plenty of excellent working dogs carry one of these mutations. What matters is whether a breeder tested for it and discloses it honestly, so the pairing decision downstream can be made correctly.</p>
  `,
  'first-season-marking': `
    <p>Ask ten trainers why a young dog struggles with marks in its first season, and at least seven will say "lack of talent." In most cases, that's the wrong diagnosis. The dog usually has the raw ability. What's missing is a sequence of drills that built genuine confidence before the difficulty ramped up.</p>
    <h2>Start closer than feels necessary</h2>
    <p>The instinct is to test a young dog with longer, more complex marks to see what it can do. The better approach is the opposite: keep early marks short and absurdly easy, so the dog never experiences a failed retrieve in its first dozen sessions. Confidence compounds. So does the lack of it.</p>
    <h2>Water adds a variable, not a difficulty multiplier</h2>
    <p>Many handlers treat water marks as simply "harder" versions of land marks and scale difficulty the same way. Water introduces its own variable — current, depth perception, entry angle — that needs its own progression, separate from how far or how hidden a mark is on land.</p>
    <h2>Read the dog's recovery, not just the retrieve</h2>
    <p>A dog that completes a mark but comes back stressed, head low, moving slowly, just told you something more important than a dog that struggled but trotted back happy. Watch recovery as closely as you watch the retrieve itself.</p>
  `,
  'choosing-a-stud': `
    <p>Stud fee is the number everyone fixates on, and it's almost always the least important number in the decision. Here are five questions worth answering before a deposit changes hands.</p>
    <h2>1. What does the clearance panel actually say — not just "clear" or not?</h2>
    <p>Ask for the documentation, not a verbal summary. OFA numbers, panel dates, and lab names should all be checkable.</p>
    <h2>2. How many litters has he already produced, and what came out of them?</h2>
    <p>A handful of glowing anecdotes is weaker evidence than a documented pattern across multiple litters and multiple dams.</p>
    <h2>3. What's the plan if your dam is a carrier for something he's clear on, or vice versa?</h2>
    <p>This should be a five-minute conversation with a clear, confident answer — not a topic the stud owner avoids.</p>
    <h2>4. Will the offspring's health and performance data actually get reported back?</h2>
    <p>Production records are only as good as breeders' willingness to report outcomes, including disappointing ones.</p>
    <h2>5. Does his temperament actually fit what you're trying to build?</h2>
    <p>A phenomenal field dog with a soft, hard-to-motivate temperament isn't automatically the right cross for a program built around biddability.</p>
  `,
  'puppy-selection': `
    <p>"He ran straight to me" is the most common puppy-selection story, and the least useful one for predicting a working dog's future. A structured aptitude assessment, done consistently across a litter, gives far better signal.</p>
    <h2>Test for recovery, not just boldness</h2>
    <p>Startle a puppy gently with a dropped object or unfamiliar sound, then watch what happens next. A puppy that startles and recovers within seconds to investigate is showing exactly the resilience field work demands. A puppy that startles and stays shut down is showing something worth taking seriously.</p>
    <h2>Retrieve drive shows up early, but inconsistently</h2>
    <p>Roll a small object a short distance and see who chases, who picks it up, and who brings it back versus who runs off with it. Test each puppy more than once — first attempts are noisy.</p>
    <h2>Independence at 7–8 weeks predicts trainability later, just not the way people assume</h2>
    <p>A puppy that explores confidently away from its littermates without panicking is often easier, not harder, to train later — it's already comfortable operating outside the pack.</p>
  `,
  'derby-season-recap': `
    <p>This spring's derby placements produced an unusually concentrated result: a small number of bloodlines accounted for a disproportionate share of the points awarded across the circuit.</p>
    <h2>A familiar foundation, three generations back</h2>
    <p>Trace the pedigrees of this season's top derby finishers far enough back and a handful of foundational sires from the early 2010s keep reappearing — not as direct parents, but as shared great-grandparents and great-great-grandparents.</p>
    <h2>What this means for the next breeding cycle</h2>
    <p>Concentration like this is worth watching for two reasons: it's a strong signal about which lines are currently producing, and it's an early warning about how much line-breeding risk is quietly accumulating across the breed's competitive population.</p>
    <h2>Worth watching next season</h2>
    <p>A few less-concentrated outlier bloodlines also placed well this spring. If that pattern repeats, it may represent a genuinely independent line worth more attention from programs trying to diversify away from the dominant pedigrees.</p>
  `,
};

document.addEventListener('DOMContentLoaded', () => {
  renderNav('articles.html');
  const params = new URLSearchParams(window.location.search);
  const article = RF_DATA.articles.find(a => a.id === params.get('id')) || RF_DATA.articles[0];
  document.title = `${article.title} — RetrieverForge`;

  document.getElementById('rf-breadcrumb').innerHTML = `<a href="index.html" style="color:inherit">Home</a> / <a href="articles.html" style="color:inherit">Articles</a> / ${article.cat}`;
  document.getElementById('rf-art-cat').textContent = article.cat;
  document.getElementById('rf-art-title').textContent = article.title;
  document.getElementById('rf-art-meta').textContent = `By ${article.author} · ${article.read} read`;
  document.getElementById('rf-art-hero').innerHTML = RFArt.marshBanner({ id: 'arthero-' + article.id, dark: true });
  document.getElementById('rf-art-body').innerHTML = RF_ARTICLE_BODIES[article.id] || `<p>${article.excerpt}</p>`;

  const related = RF_DATA.articles.filter(a => a.id !== article.id && a.cat === article.cat);
  const fallback = RF_DATA.articles.filter(a => a.id !== article.id).slice(0,3);
  const list = (related.length ? related : fallback).slice(0,3);
  document.getElementById('rf-art-related').innerHTML = list.map(a => `
    <a href="article.html?id=${a.id}" class="rf-article-card">
      <div class="rf-article-card__photo">${RFArt.marshBanner({ id: 'artrel-' + a.id, dark: false })}</div>
      <span class="rf-pill rf-pill--copper rf-article-card__cat">${a.cat}</span>
      <h3 class="rf-article-card__title">${a.title}</h3>
      <div class="rf-article-card__meta">${a.author} · ${a.read} read</div>
    </a>`).join('');
});
