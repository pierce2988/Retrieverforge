/* ============================================================
   RETRIEVERFORGE — ILLUSTRATION SYSTEM
   Hand-built SVG scenes standing in for photography.
   Palette-bound: every fill references CSS custom properties
   so scenes adapt automatically to dark/light card contexts.
   ============================================================ */

const RFArt = (() => {

  // Grain/noise filter reused across scenes for a less "vector flat" feel
  const grain = (id) => `
    <filter id="${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" seed="7"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.025 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>`;

  // A Labrador silhouette mid-retrieve, water level, ripples — the recurring "hero" pose
  function retrieveScene({ bg = '#1D1D23', water = '#15151A', dog = '#0B0B0C', accent = '#B5703A', id = 'rs' } = {}) {
    return `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>${grain('grain-' + id)}
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${water}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sky-${id})"/>
  <rect y="190" width="400" height="110" fill="${water}" opacity="0.9"/>
  <g opacity="0.18" stroke="${accent}" stroke-width="1" fill="none">
    <path d="M0 210 Q100 200 200 210 T400 210"/>
    <path d="M0 235 Q100 225 200 235 T400 235"/>
    <path d="M0 260 Q100 250 200 260 T400 260"/>
  </g>
  <g transform="translate(140,140)">
    <ellipse cx="60" cy="100" rx="55" ry="10" fill="${water}" opacity="0.5"/>
    <path d="M10 60 C5 40 20 18 45 14 C58 12 66 18 70 28 C85 26 100 34 104 50 C118 52 126 64 122 78
             C130 86 128 100 116 104 L40 110 C18 110 4 96 6 78 C-2 72 2 62 10 60 Z" fill="${dog}"/>
    <path d="M70 28 C76 18 90 14 98 22 C104 28 102 38 94 40 L78 42 Z" fill="${dog}"/>
    <circle cx="96" cy="30" r="2.4" fill="${bg}"/>
    <path d="M100 30 L114 26" stroke="${dog}" stroke-width="5" stroke-linecap="round"/>
    <path d="M16 60 C10 72 12 88 22 98" stroke="${dog}" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M40 104 C36 98 38 90 46 88" stroke="${dog}" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M82 104 C84 96 90 92 98 94" stroke="${dog}" stroke-width="9" stroke-linecap="round" fill="none"/>
  </g>
  <rect width="400" height="300" filter="url(#grain-${id})" opacity="0.5"/>
</svg>`;
  }

  // Headshot-style portrait silhouette for stud/dog cards
  function portraitScene({ bg = '#1D1D23', dog = '#0B0B0C', accent = '#B5703A', id = 'ps', light = false } = {}) {
    const ring = light ? 'rgba(11,11,12,0.08)' : 'rgba(250,248,244,0.06)';
    return `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>${grain('grain-' + id)}</defs>
  <rect width="400" height="300" fill="${bg}"/>
  <circle cx="200" cy="150" r="135" fill="none" stroke="${ring}" stroke-width="60"/>
  <circle cx="200" cy="150" r="2" fill="${accent}" opacity="0"/>
  <g transform="translate(118,72)">
    <path d="M20 90 C8 70 14 42 38 30 C46 18 64 12 80 18 C100 8 124 16 132 36
             C150 38 162 56 158 76 C168 86 166 104 152 110
             C150 130 130 144 108 140 C100 152 78 154 64 144
             C44 148 26 134 24 114 C8 110 6 96 20 90 Z" fill="${dog}"/>
    <path d="M126 30 C134 14 154 10 164 24 C170 34 164 46 152 46 L132 44 Z" fill="${dog}"/>
    <path d="M40 26 C30 12 12 12 6 26 C2 36 10 46 22 44 L42 40 Z" fill="${dog}"/>
    <circle cx="146" cy="58" r="3.2" fill="${bg}"/>
    <path d="M150 64 L168 60" stroke="${dog}" stroke-width="7" stroke-linecap="round"/>
  </g>
  <rect width="400" height="300" filter="url(#grain-${id})" opacity="0.4"/>
</svg>`;
  }

  // Pair scene for breeding cards — two profile heads facing each other
  function profileScene({ bg = '#EFEBE3', dog = '#0B0B0C', id = 'pf', flip = false } = {}) {
    const t = flip ? 'scale(-1,1) translate(-400,0)' : '';
    return `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <rect width="400" height="300" fill="${bg}"/>
  <g transform="${t}">
    <g transform="translate(60,70)">
      <path d="M10 90 C0 65 10 35 40 24 C55 8 85 6 105 22 C130 18 155 32 158 56
               C172 60 180 78 170 92 C172 110 156 124 138 120
               C132 138 108 146 90 136 C68 144 44 134 38 112
               C18 110 4 100 10 90 Z" fill="${dog}"/>
      <path d="M150 30 C162 14 186 14 194 30 C198 42 188 52 176 50 L154 46 Z" fill="${dog}"/>
      <circle cx="172" cy="64" r="3.4" fill="${bg}"/>
      <path d="M178 70 L198 66" stroke="${dog}" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
  }

  // Marsh / field landscape banner — for hero & section backers
  function marshBanner({ id = 'mb', dark = true } = {}) {
    const sky = dark ? '#0B0B0C' : '#FAF8F4';
    const mid = dark ? '#1D1D23' : '#EFEBE3';
    const far = dark ? '#15151A' : '#E5DFD3';
    const grass = dark ? '#3A3835' : '#D9CFBA';
    return `
<svg viewBox="0 0 1600 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sky}"/>
      <stop offset="1" stop-color="${far}"/>
    </linearGradient>
    ${grain('grain-' + id)}
  </defs>
  <rect width="1600" height="700" fill="url(#sky-${id})"/>
  <path d="M0 430 Q400 380 800 420 T1600 400 L1600 700 L0 700 Z" fill="${mid}"/>
  <path d="M0 480 Q400 450 800 470 T1600 460 L1600 700 L0 700 Z" fill="${far}" opacity="0.7"/>
  <g stroke="${grass}" stroke-width="2" opacity="0.5" stroke-linecap="round">
    ${Array.from({length: 40}).map((_,i)=>{
      const x = (i * 41 + 20) % 1600;
      const h = 30 + (i % 5) * 8;
      const y = 520 + (i % 7) * 14;
      return `<path d="M${x} ${y} Q${x+6} ${y-h} ${x+2} ${y-h-10}"/>`;
    }).join('')}
  </g>
  <rect width="1600" height="700" filter="url(#grain-${id})" opacity="0.5"/>
</svg>`;
  }

  // Small icon set (line icons, copper on dark / charcoal on light)
  const icons = {
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l7 7 7-7"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.2 4.5 4.5 0 0 1 20 9.5c0 6.1-8 11-8 11z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2.2 2.2L15.5 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
    flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2c1 4-4 5-4 10a4 4 0 1 0 8 0c0-1.5-1-2-1-3.5 1.5 1 2.5 3 2.5 5.5a5.5 5.5 0 1 1-11 0C6.5 9 9 7 12 2z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.7 7.4.9-5.5 5 1.6 7.3L12 18.3l-6.6 3.6 1.6-7.3-5.5-5 7.4-.9z"/></svg>`,
    arrowUpRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>`,
  };

  return { retrieveScene, portraitScene, profileScene, marshBanner, icons };
})();
