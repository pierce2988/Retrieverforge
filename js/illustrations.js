/* ============================================================
   RETRIEVERFORGE — ILLUSTRATION SYSTEM v2
   Golden-hour marsh photography, rendered in SVG. Built to evoke
   real duck-hunting photography: warm sun glow, silhouetted
   cattails and grass, water reflections, dog mid-retrieve.
   ============================================================ */

const RFArt = (() => {

  const grain = (id) => `
    <filter id="${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="noise" seed="11"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>`;

  function goldenSky(id, sunX, sunY) {
    return `
    <radialGradient id="sun-${id}" cx="${sunX}" cy="${sunY}" r="70%">
      <stop offset="0%" stop-color="#FFD9A0"/>
      <stop offset="18%" stop-color="#FDB766"/>
      <stop offset="40%" stop-color="#E8843A"/>
      <stop offset="68%" stop-color="#5A3420"/>
      <stop offset="100%" stop-color="#0D0F11"/>
    </radialGradient>
    <linearGradient id="water-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7A4A28"/>
      <stop offset="35%" stop-color="#3D2A1E"/>
      <stop offset="100%" stop-color="#0D0F11"/>
    </linearGradient>`;
  }

  function cattails(baseY, count, seedOffset, opacity, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
      const x = (i * 53 + seedOffset * 17) % 1600 * (count > 20 ? 1 : 0.25) + (count <= 20 ? i * 30 : 0);
      const h = 60 + ((i * 7 + seedOffset) % 90);
      const sway = ((i % 3) - 1) * 14;
      out += `<path d="M${x} ${baseY} Q${x + sway*0.6} ${baseY - h*0.6} ${x + sway} ${baseY - h}"
        stroke="${color}" stroke-width="${2.2 - (i%3)*0.4}" fill="none" opacity="${opacity}" stroke-linecap="round"/>
        <ellipse cx="${x + sway}" cy="${baseY - h}" rx="3.2" ry="9" fill="${color}" opacity="${opacity}" transform="rotate(${sway}, ${x+sway}, ${baseY-h})"/>`;
    }
    return out;
  }

  function retrieveScene(opts) {
    opts = opts || {};
    const id = opts.id || 'rs';
    const sunX = opts.sunX || '74%';
    const sunY = opts.sunY || '36%';
    return `
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    ${goldenSky(id, sunX, sunY)}
    ${grain('grain-' + id)}
  </defs>
  <rect width="800" height="600" fill="url(#sun-${id})"/>
  <rect y="360" width="800" height="240" fill="url(#water-${id})"/>
  <circle cx="${sunX}" cy="${sunY}" r="46" fill="#FFE7BD" opacity="0.55"/>
  <circle cx="${sunX}" cy="${sunY}" r="22" fill="#FFF3D6" opacity="0.7"/>
  <ellipse cx="${sunX}" cy="378" rx="90" ry="14" fill="#FDB766" opacity="0.35"/>
  <ellipse cx="${sunX}" cy="400" rx="130" ry="10" fill="#E8843A" opacity="0.22"/>
  <path d="M0 365 Q120 345 260 360 T520 350 Q650 340 800 358 L800 380 L0 380 Z" fill="#1A1310" opacity="0.8"/>
  ${cattails(370, 22, 3, 0.55, '#1A1310')}
  <g stroke="#FDB766" stroke-width="1.5" fill="none" opacity="0.3">
    <ellipse cx="330" cy="470" rx="120" ry="14"/>
    <ellipse cx="330" cy="490" rx="160" ry="16"/>
    <ellipse cx="330" cy="510" rx="200" ry="18"/>
  </g>
  <g fill="#F5F2EA" opacity="0.85">
    <circle cx="260" cy="440" r="3"/><circle cx="248" cy="452" r="2.2"/><circle cx="272" cy="430" r="2"/>
    <circle cx="410" cy="448" r="2.6"/><circle cx="425" cy="438" r="2"/>
  </g>
  <g transform="translate(220,330)">
    <ellipse cx="130" cy="175" rx="100" ry="16" fill="#0D0F11" opacity="0.4"/>
    <path d="M20 130 C8 105 18 75 50 64 C58 48 80 38 102 42 C118 28 146 30 160 46
             C182 44 200 60 198 82 C214 86 222 104 212 118
             C214 138 196 152 176 146 C168 162 142 168 124 156
             C118 168 96 168 86 156 C62 160 40 144 38 122 C18 120 6 124 20 130 Z"
          fill="#0D0F11"/>
    <path d="M150 50 C168 30 198 26 212 44 C220 56 214 70 200 70 L168 62 Z" fill="#0D0F11"/>
    <ellipse cx="222" cy="56" rx="22" ry="10" fill="#1A1310" transform="rotate(-8,222,56)"/>
    <path d="M242 50 Q252 48 250 56 Q246 60 240 58 Z" fill="#1A1310"/>
    <path d="M118 40 C108 24 86 22 78 38 C74 50 84 58 96 54 L116 48 Z" fill="#0D0F11"/>
    <path d="M40 124 C30 138 32 156 44 166" stroke="#0D0F11" stroke-width="11" stroke-linecap="round" fill="none"/>
    <path d="M86 156 C82 148 86 138 96 136" stroke="#0D0F11" stroke-width="11" stroke-linecap="round" fill="none"/>
  </g>
  ${cattails(600, 9, 7, 0.95, '#0D0F11')}
  <rect width="800" height="600" filter="url(#grain-${id})" opacity="0.6"/>
</svg>`;
  }

  function portraitScene(opts) {
    opts = opts || {};
    const id = opts.id || 'ps';
    const light = !!opts.light;
    const sunX = opts.sunX || '68%';
    const sunY = opts.sunY || '30%';
    const skyTop = light ? '#E6E2D7' : '#0D0F11';
    return `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="psun-${id}" cx="${sunX}" cy="${sunY}" r="75%">
      <stop offset="0%" stop-color="${light ? '#FFE9C7' : '#FFD9A0'}"/>
      <stop offset="22%" stop-color="#F2A560"/>
      <stop offset="48%" stop-color="${light ? '#C97A3E' : '#7A4426'}"/>
      <stop offset="100%" stop-color="${skyTop}"/>
    </radialGradient>
    ${grain('grain-' + id)}
  </defs>
  <rect width="400" height="300" fill="url(#psun-${id})"/>
  <circle cx="${sunX}" cy="${sunY}" r="26" fill="#FFF3D6" opacity="${light ? 0.5 : 0.6}"/>
  ${cattails(300, 7, 5, light ? 0.5 : 0.85, light ? '#3A3024' : '#0D0F11')}
  <g transform="translate(96,58)">
    <path d="M22 100 C8 78 16 46 44 34 C54 20 76 14 94 22 C116 10 142 20 148 42
             C168 44 180 64 174 84 C186 92 184 112 168 118
             C166 138 142 150 118 144 C108 158 82 158 66 146
             C42 150 22 134 20 112 C2 108 8 96 22 100 Z" fill="${light ? '#241A12' : '#0D0F11'}"/>
    <path d="M138 40 C148 22 172 18 184 34 C190 46 182 58 168 56 L144 50 Z" fill="${light ? '#241A12' : '#0D0F11'}"/>
    <path d="M48 32 C36 16 14 16 6 32 C2 44 12 54 26 50 L48 44 Z" fill="${light ? '#241A12' : '#0D0F11'}"/>
    <circle cx="160" cy="68" r="3" fill="${light ? '#E6E2D7' : '#1A1310'}" opacity="0.5"/>
    <path d="M166 74 L186 70" stroke="${light ? '#241A12' : '#0D0F11'}" stroke-width="7" stroke-linecap="round"/>
  </g>
  <rect width="400" height="300" filter="url(#grain-${id})" opacity="0.5"/>
</svg>`;
  }

  function profileScene(opts) {
    opts = opts || {};
    const id = opts.id || 'pf';
    const flip = !!opts.flip;
    const light = opts.light !== false;
    const t = flip ? 'scale(-1,1) translate(-400,0)' : '';
    const base = light ? '#E6E2D7' : '#1A1C1F';
    const dog = light ? '#241A12' : '#0D0F11';
    return `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="prof-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${light ? '#F2D9AE' : '#3D2A1E'}"/>
      <stop offset="100%" stop-color="${base}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#prof-${id})"/>
  <g transform="${t}">
    <g transform="translate(60,70)">
      <path d="M10 90 C0 65 10 35 40 24 C55 8 85 6 105 22 C130 18 155 32 158 56
               C172 60 180 78 170 92 C172 110 156 124 138 120
               C132 138 108 146 90 136 C68 144 44 134 38 112
               C18 110 4 100 10 90 Z" fill="${dog}"/>
      <path d="M150 30 C162 14 186 14 194 30 C198 42 188 52 176 50 L154 46 Z" fill="${dog}"/>
      <circle cx="172" cy="64" r="3.4" fill="${base}" opacity="0.6"/>
      <path d="M178 70 L198 66" stroke="${dog}" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
  }

  function marshBanner(opts) {
    opts = opts || {};
    const id = opts.id || 'mb';
    const dark = opts.dark !== false;
    const sunX = opts.sunX || '76%';
    const sunY = opts.sunY || '32%';
    const farBack = dark ? '#0D0F11' : '#E6E2D7';
    return `
<svg viewBox="0 0 1600 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="msun-${id}" cx="${sunX}" cy="${sunY}" r="80%">
      <stop offset="0%" stop-color="${dark ? '#FFE0AC' : '#FFEFD2'}"/>
      <stop offset="20%" stop-color="#F3A862"/>
      <stop offset="42%" stop-color="${dark ? '#86471F' : '#D89456'}"/>
      <stop offset="70%" stop-color="${dark ? '#2E1B12' : '#C9BC9E'}"/>
      <stop offset="100%" stop-color="${farBack}"/>
    </radialGradient>
    <linearGradient id="mwater-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${dark ? '#7A4A28' : '#D8B07E'}"/>
      <stop offset="100%" stop-color="${farBack}"/>
    </linearGradient>
    ${grain('grain-' + id)}
  </defs>
  <rect width="1600" height="700" fill="url(#msun-${id})"/>
  <circle cx="${sunX}" cy="${sunY}" r="60" fill="#FFF3D6" opacity="0.55"/>
  <rect y="470" width="1600" height="230" fill="url(#mwater-${id})" opacity="0.9"/>
  <ellipse cx="${sunX}" cy="500" rx="180" ry="22" fill="#F3A862" opacity="0.3"/>
  <path d="M0 440 Q400 410 800 435 T1600 420 L1600 480 L0 480 Z" fill="${dark ? '#1A1310' : '#9C8C68'}" opacity="0.85"/>
  ${cattails(540, 36, 9, dark ? 0.6 : 0.5, dark ? '#1A1310' : '#5A4A32')}
  ${cattails(660, 14, 21, dark ? 0.95 : 0.8, dark ? '#0D0F11' : '#241A12')}
  <rect width="1600" height="700" filter="url(#grain-${id})" opacity="0.55"/>
</svg>`;
  }

  function sittingScene(opts) {
    opts = opts || {};
    const id = opts.id || 'ss';
    const sunX = opts.sunX || '70%';
    const sunY = opts.sunY || '34%';
    return `
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    ${goldenSky(id, sunX, sunY)}
    ${grain('grain-' + id)}
  </defs>
  <rect width="800" height="600" fill="url(#sun-${id})"/>
  <circle cx="${sunX}" cy="${sunY}" r="48" fill="#FFE7BD" opacity="0.55"/>
  <path d="M0 380 Q200 355 400 375 T800 365 L800 420 L0 420 Z" fill="#1A1310" opacity="0.75"/>
  ${cattails(420, 26, 13, 0.65, '#1A1310')}
  <g transform="translate(300,300)">
    <ellipse cx="90" cy="270" rx="95" ry="14" fill="#0D0F11" opacity="0.4"/>
    <path d="M40 260 C20 240 18 200 40 175 L46 110 C44 86 60 64 86 58
             C92 38 116 26 138 34 C156 24 178 32 184 52
             C200 56 208 76 198 90 C204 108 192 124 174 122
             C176 200 160 250 130 264 C112 272 56 270 40 260 Z" fill="#0D0F11"/>
    <path d="M150 36 C160 14 186 8 200 26 C206 38 198 52 184 50 L160 44 Z" fill="#0D0F11"/>
    <path d="M86 30 C76 10 50 8 40 26 C36 38 46 50 60 46 L86 38 Z" fill="#0D0F11"/>
    <circle cx="178" cy="62" r="3.4" fill="#1A1310"/>
    <path d="M184 68 L204 64" stroke="#0D0F11" stroke-width="7" stroke-linecap="round"/>
  </g>
  ${cattails(580, 10, 27, 0.95, '#0D0F11')}
  <rect width="800" height="600" filter="url(#grain-${id})" opacity="0.6"/>
</svg>`;
  }

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

  return { retrieveScene, portraitScene, profileScene, marshBanner, sittingScene, icons };
})();
