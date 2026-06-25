/* ============================================================
   RETRIEVERFORGE — STUDFORGE RATING GAUGES
   Instrument-dial styling: a struck arc, not a flat progress bar.
   Used both for the headline composite rating and the five
   sub-factor mini-gauges.
   ============================================================ */

const RFGauge = (() => {

  function polarToXY(cx, cy, r, angleDeg) {
    const a = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  // Arc spans 270deg total (from -135 to +135), gauge-cluster style
  function arcPath(cx, cy, r, pct) {
    const startAngle = -135;
    const endAngle = startAngle + (270 * pct / 100);
    const s = polarToXY(cx, cy, r, startAngle);
    const e = polarToXY(cx, cy, r, endAngle);
    const largeArc = (270 * pct / 100) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  }

  function trackPath(cx, cy, r) {
    const s = polarToXY(cx, cy, r, -135);
    const e = polarToXY(cx, cy, r, 135);
    return `M ${s.x} ${s.y} A ${r} ${r} 0 1 1 ${e.x} ${e.y}`;
  }

  // Large composite dial — the centerpiece "StudForge Rating" card
  function bigDial({ score = 94, size = 220, id = 'big', color = '#B5703A' } = {}) {
    const cx = size/2, cy = size/2, r = size*0.38;
    const circumference = 2 * Math.PI * r * (270/360);
    const dashOffset = circumference * (1 - score/100);
    return `
<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="rf-dial">
  <defs>
    <linearGradient id="dialGrad-${id}" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#8C5A30"/>
      <stop offset="1" stop-color="${color}"/>
      <stop offset="1" stop-color="#D08A4F"/>
    </linearGradient>
  </defs>
  <path d="${trackPath(cx,cy,r)}" fill="none" stroke="rgba(250,248,244,0.08)" stroke-width="10" stroke-linecap="round"/>
  <path d="${trackPath(cx,cy,r)}" fill="none" stroke="url(#dialGrad-${id})" stroke-width="10" stroke-linecap="round"
        stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"
        class="rf-dial__sweep" style="--rf-circ:${circumference}; --rf-offset:${dashOffset};"/>
  ${Array.from({length: 12}).map((_,i) => {
    const ang = -135 + i * (270/11);
    const p1 = polarToXY(cx,cy,r+15,ang);
    const p2 = polarToXY(cx,cy,r+20,ang);
    return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="rgba(250,248,244,0.18)" stroke-width="1.5"/>`;
  }).join('')}
  <text x="${cx}" y="${cy-4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${size*0.21}" font-weight="700" fill="#FAF8F4">${score}</text>
  <text x="${cx}" y="${cy+size*0.15}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${size*0.045}" letter-spacing="2" fill="#9A968D">OUT OF 100</text>
</svg>`;
  }

  // Small sub-factor gauge (Health, Performance, Production, Pedigree, Confidence)
  function miniDial({ score = 90, label = 'Health', id = 'mini', light = false } = {}) {
    const size = 92, cx = size/2, cy = size/2, r = size*0.36;
    const circumference = 2 * Math.PI * r * (270/360);
    const dashOffset = circumference * (1 - score/100);
    const trackColor = light ? 'rgba(11,11,12,0.1)' : 'rgba(250,248,244,0.08)';
    const textColor = light ? '#0B0B0C' : '#FAF8F4';
    const labelColor = light ? '#6B6862' : '#9A968D';
    return `
<div class="rf-mini-dial">
  <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <path d="${trackPath(cx,cy,r)}" fill="none" stroke="${trackColor}" stroke-width="7" stroke-linecap="round"/>
    <path d="${trackPath(cx,cy,r)}" fill="none" stroke="#B5703A" stroke-width="7" stroke-linecap="round"
          stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"/>
    <text x="${cx}" y="${cy+6}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${size*0.24}" font-weight="700" fill="${textColor}">${score}</text>
  </svg>
  <div class="rf-mini-dial__label" style="color:${labelColor}">${label}</div>
</div>`;
  }

  // Horizontal bar variant for compact list contexts (e.g. rankings rows)
  function barMeter({ score = 90, max = 100 } = {}) {
    const pct = Math.round((score/max) * 100);
    return `<div class="rf-bar-meter"><div class="rf-bar-meter__fill" style="width:${pct}%"></div></div>`;
  }

  return { bigDial, miniDial, barMeter };
})();
