/* ============================================================
   RETRIEVERFORGE — SAMPLE DATA
   Realistic working-retriever content: AKC/field-trial titles,
   OFA-style health clearances, EIC/CNM/PRA genetic panels.
   ============================================================ */

const RF_DATA = (() => {

  const studs = [
    {
      id: 'thunder-ridge-cash',
      name: "Thunder Ridge's Cold Hard Cash",
      callName: 'Cash',
      breed: 'Labrador Retriever',
      color: 'Black',
      sex: 'Male',
      dob: '2019-03-14',
      location: 'Stuttgart, AR',
      titles: ['FC', 'AFC'],
      rating: 96,
      sub: { health: 98, performance: 97, production: 94, pedigree: 95, confidence: 96 },
      stats: { offspring: 142, litters: 19, studFee: '$2,500' },
      clearances: ['OFA Hips: Good', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Clear', 'PRA: Clear', 'Eyes (CERF): Normal'],
      breeder: 'thunder-ridge-retrievers',
      bio: "Cash anchors the Thunder Ridge program as its most proven sire — a double National Finalist with an unusually deep record of producing field trial finishers across three generations.",
    },
    {
      id: 'cajun-briley-ace',
      name: "Cajun Briley's High Roller",
      callName: 'Ace',
      breed: 'Labrador Retriever',
      color: 'Black',
      sex: 'Male',
      dob: '2020-07-02',
      location: 'Eunice, LA',
      titles: ['MH', 'QAA'],
      rating: 91,
      sub: { health: 95, performance: 93, production: 86, pedigree: 90, confidence: 88 },
      stats: { offspring: 64, litters: 9, studFee: '$1,800' },
      clearances: ['OFA Hips: Excellent', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Carrier', 'PRA: Clear'],
      breeder: 'cajun-briley-kennels',
      bio: "A Master Hunter qualified all-age dog out of strong Louisiana hunt test lines, known for producing biddable, water-loving offspring with exceptional marking ability.",
    },
    {
      id: 'southern-timber-kobe',
      name: "Southern Timber's Black Mamba",
      callName: 'Kobe',
      breed: 'Labrador Retriever',
      color: 'Black',
      sex: 'Male',
      dob: '2024-11-08',
      location: 'Augusta, GA',
      titles: ['Prospect'],
      rating: 78,
      sub: { health: 88, performance: 0, production: 0, pedigree: 84, confidence: 52 },
      stats: { offspring: 0, litters: 0, studFee: 'Not yet standing' },
      clearances: ['Hips/Elbows: Pending (24mo)', 'EIC: Pending panel', 'CNM: Pending panel'],
      breeder: 'southern-timber-retrievers',
      bio: "A foundation prospect out of a Kane × Jinx breeding, currently in development toward field trial and hunt test titles before entering stud service. Full clearance panel scheduled at 24 months.",
      isProspect: true,
    },
    {
      id: 'whistling-wings-duke',
      name: "Whistling Wings' Duke of Earl",
      callName: 'Duke',
      breed: 'Labrador Retriever',
      color: 'Yellow',
      sex: 'Male',
      dob: '2018-01-22',
      location: 'Forrest City, AR',
      titles: ['FC', 'AFC', 'CFC'],
      rating: 98,
      sub: { health: 97, performance: 99, production: 98, pedigree: 97, confidence: 99 },
      stats: { offspring: 211, litters: 27, studFee: '$3,200' },
      clearances: ['OFA Hips: Excellent', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Clear', 'PRA: Clear', 'Eyes (CERF): Normal'],
      breeder: 'whistling-wings-kennel',
      bio: "One of the most prolific producing sires currently standing, with National Open finalist offspring in three different derby classes this season alone.",
    },
    {
      id: 'red-river-hank',
      name: "Red River's Hank Williams",
      callName: 'Hank',
      breed: 'Labrador Retriever',
      color: 'Chocolate',
      sex: 'Male',
      dob: '2021-05-30',
      location: 'Durant, OK',
      titles: ['SH', 'WCX'],
      rating: 84,
      sub: { health: 91, performance: 85, production: 78, pedigree: 82, confidence: 76 },
      stats: { offspring: 22, litters: 4, studFee: '$1,200' },
      clearances: ['OFA Hips: Good', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Clear'],
      breeder: 'red-river-retrievers',
      bio: "A versatile chocolate Senior Hunter with a calm, biddable temperament that consistently shows up in his early offspring's trainability reports.",
    },
    {
      id: 'kane-cropper',
      name: "Cropper's Last Call",
      callName: 'Kane',
      breed: 'Labrador Retriever',
      color: 'Black',
      sex: 'Male',
      dob: '2020-02-11',
      location: 'Baton Rouge, LA',
      titles: ['MH', 'QA2'],
      rating: 89,
      sub: { health: 90, performance: 92, production: 85, pedigree: 87, confidence: 83 },
      stats: { offspring: 38, litters: 6, studFee: '$1,500' },
      clearances: ['OFA Hips: Good', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Carrier (Cropper\'s Get Sum)'],
      breeder: 'cajun-briley-kennels',
      bio: "Kane is Kobe's sire — a Master Hunter with strong marking instincts whose offspring consistently show early water confidence. CNM carrier status is documented and managed through informed pairing.",
    },
  ];

  const females = [
    {
      id: 'jinx-southern-timber',
      name: "Southern Timber's Bayou Jinx",
      callName: 'Jinx',
      breed: 'Labrador Retriever',
      color: 'Black',
      sex: 'Female',
      dob: '2021-09-19',
      location: 'Augusta, GA',
      titles: ['JH'],
      rating: 82,
      sub: { health: 92, performance: 80, production: 75, pedigree: 86, confidence: 78 },
      clearances: ['OFA Hips: Good', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Clear', 'PRA: Clear'],
      breeder: 'southern-timber-retrievers',
      bio: "Kobe's dam — a clear-tested Junior Hunter with a deep working pedigree on both sides, selected to balance Kane's CNM carrier status with confirmed clear genetics.",
    },
    {
      id: 'bella-thunder-ridge',
      name: "Thunder Ridge's Southern Belle",
      callName: 'Bella',
      breed: 'Labrador Retriever',
      color: 'Black',
      sex: 'Female',
      dob: '2020-04-05',
      location: 'Stuttgart, AR',
      titles: ['FC'],
      rating: 93,
      sub: { health: 96, performance: 94, production: 90, pedigree: 92, confidence: 91 },
      clearances: ['OFA Hips: Excellent', 'OFA Elbows: Normal', 'EIC: Clear', 'CNM: Clear', 'PRA: Clear'],
      breeder: 'thunder-ridge-retrievers',
      bio: "A Field Champion dam whose first two litters have already produced two Qualifying All-Age placements between them.",
    },
  ];

  const allDogs = [...studs, ...females];

  // Pedigree ancestor records (generation 2 & 3 — not full standalone profiles, just pedigree-context nodes)
  const pedigrees = {
    'southern-timber-kobe': {
      sire: 'kane-cropper',
      dam: 'jinx-southern-timber',
      grandparents: {
        sireSire: { name: "Cropper's Get Sum", titles: ['MH'], health: 'CNM: Carrier' },
        sireDam: { name: "Bayou Belle's Last Dance", titles: ['QA2'], health: 'CNM: Clear' },
        damSire: { name: "Timber Run's Drake Patrol", titles: ['SH', 'WCX'], health: 'EIC: Clear' },
        damDam: { name: "Southern Timber's Magnolia", titles: ['JH'], health: 'PRA: Clear' },
      },
      greatGrandparents: [
        { name: "Get Sum's Cold Front", titles: ['FC'] },
        { name: "Cropper's Easy Money", titles: ['MH'] },
        { name: "Dance Card's Encore", titles: ['QAA'] },
        { name: "Bayou Belle Royale", titles: ['SH'] },
        { name: "Drake Patrol's Sunup", titles: ['FC', 'AFC'] },
        { name: "Timber Run's Echo", titles: ['MH'] },
        { name: "Magnolia's First Light", titles: ['JH'] },
        { name: "Southern Timber's Duchess", titles: ['SH'] },
      ],
    },
    'thunder-ridge-cash': {
      sire: null, sireName: "Rice Field's Money Maker", damName: "Thunder Ridge's Calamity Jane",
      grandparents: {
        sireSire: { name: "Money Maker's High Stakes", titles: ['FC', 'AFC'], health: 'EIC: Clear' },
        sireDam: { name: "Rice Field's Lucky Penny", titles: ['QAA'], health: 'CNM: Clear' },
        damSire: { name: "Calamity's Wild Card", titles: ['MH'], health: 'PRA: Clear' },
        damDam: { name: "Thunder Ridge's Jubilee", titles: ['SH'], health: 'EIC: Clear' },
      },
      greatGrandparents: [
        { name: "High Stakes Encore", titles: ['FC'] }, { name: "Money Maker's Echo", titles: ['AFC'] },
        { name: "Lucky Penny's Shine", titles: ['QA2'] }, { name: "Rice Field's Anthem", titles: ['MH'] },
        { name: "Wild Card's Bluff", titles: ['SH'] }, { name: "Calamity's Reprise", titles: ['MH'] },
        { name: "Jubilee's Encore", titles: ['JH'] }, { name: "Thunder Ridge's First Light", titles: ['SH'] },
      ],
    },
  };

  // Performance / event history
  const performance = {
    'thunder-ridge-cash': [
      { date: '2026-04-12', event: 'Arkansas Open All-Age', placement: '1st', pts: 27 },
      { date: '2025-11-08', event: 'National Open Championship', placement: 'Finalist', pts: 0 },
      { date: '2025-08-20', event: 'Mississippi Valley FT Club Open', placement: '2nd', pts: 18 },
      { date: '2025-03-02', event: 'Louisiana Open All-Age', placement: '1st', pts: 27 },
    ],
    'whistling-wings-duke': [
      { date: '2026-05-30', event: 'National Open Championship', placement: '3rd', pts: 22 },
      { date: '2026-02-14', event: 'Delta Open All-Age', placement: '1st', pts: 27 },
      { date: '2025-09-19', event: 'Tennessee Valley Retriever Club Open', placement: '1st', pts: 27 },
    ],
    'cajun-briley-ace': [
      { date: '2026-06-01', event: 'AKC Master National (Series 4 of 4)', placement: 'Qualified', pts: 0 },
      { date: '2025-10-11', event: 'Acadiana Retriever Club Q', placement: 'QAA', pts: 0 },
    ],
  };


  const breeders = [
    {
      id: 'thunder-ridge-retrievers',
      name: 'Thunder Ridge Retrievers',
      location: 'Stuttgart, AR',
      founded: 2009,
      verified: true,
      bio: "A rice-field-country program built around proven field trial bloodlines, specializing in finished and started dogs for serious waterfowl hunters.",
      studsCount: 3,
      femalesCount: 4,
      littersCount: 47,
      rating: 4.9,
      reviews: 38,
    },
    {
      id: 'cajun-briley-kennels',
      name: 'Cajun Briley Kennels',
      location: 'Eunice, LA',
      founded: 2014,
      verified: true,
      bio: "South Louisiana hunt test program known for biddable, water-driven Labradors with documented genetic transparency, including carrier-status disclosure.",
      studsCount: 2,
      femalesCount: 3,
      littersCount: 22,
      rating: 4.8,
      reviews: 21,
    },
    {
      id: 'southern-timber-retrievers',
      name: 'Southern Timber Retrievers',
      location: 'Augusta, GA',
      founded: 2024,
      verified: true,
      bio: "A working retriever program built around foundation sire Kobe (Southern Timber's Black Mamba), with a long-term focus on titled, health-cleared bloodlines suited to the Southeast.",
      studsCount: 1,
      femalesCount: 1,
      littersCount: 1,
      rating: 5.0,
      reviews: 3,
    },
    {
      id: 'whistling-wings-kennel',
      name: 'Whistling Wings Kennel',
      location: 'Forrest City, AR',
      founded: 1998,
      verified: true,
      bio: "One of the longest-running field trial breeding operations in the Delta, with multiple National Finalists produced across nearly three decades.",
      studsCount: 4,
      femalesCount: 5,
      littersCount: 103,
      rating: 4.9,
      reviews: 76,
    },
    {
      id: 'red-river-retrievers',
      name: 'Red River Retrievers',
      location: 'Durant, OK',
      founded: 2017,
      verified: false,
      bio: "A small hunt-test-focused program emphasizing chocolate and yellow Labradors with calm temperaments suited to family hunting camps.",
      studsCount: 1,
      femalesCount: 2,
      littersCount: 8,
      rating: 4.6,
      reviews: 11,
    },
  ];

  const breedings = [
    {
      id: 'kane-x-jinx',
      sireId: 'kane-cropper',
      damId: 'jinx-southern-timber',
      breeder: 'southern-timber-retrievers',
      date: '2024-09-02',
      status: 'Completed',
      puppyCount: 7,
      notes: "Jinx's confirmed clear CNM status was a deciding factor in this pairing, given Kane's carrier status traced to Cropper's Get Sum. No affected puppies are possible from this cross. Foundation sire Kobe is from this litter.",
    },
    {
      id: 'cash-x-bella',
      sireId: 'thunder-ridge-cash',
      damId: 'bella-thunder-ridge',
      breeder: 'thunder-ridge-retrievers',
      date: '2025-01-15',
      status: 'Completed',
      puppyCount: 9,
      notes: "A within-program repeat pairing after the strong field performance of their first litter together in 2022.",
    },
    {
      id: 'ace-x-newgirl',
      sireId: 'cajun-briley-ace',
      damId: null,
      damName: "Cajun Briley's Sweet Tea",
      breeder: 'cajun-briley-kennels',
      date: '2026-08-01',
      status: 'Planned',
      puppyCount: null,
      notes: "Upcoming pairing planned for late summer 2026, pending final progesterone-timed breeding window.",
    },
  ];

  const litters = [
    {
      id: 'kane-jinx-2024',
      breedingId: 'kane-x-jinx',
      whelped: '2024-11-08',
      status: 'Past',
      breeder: 'southern-timber-retrievers',
      available: 0,
      total: 7,
      notes: "Includes foundation prospect Kobe. Full litter AKC registered.",
    },
    {
      id: 'cash-bella-2025',
      breedingId: 'cash-x-bella',
      whelped: '2025-03-22',
      status: 'Past',
      breeder: 'thunder-ridge-retrievers',
      available: 0,
      total: 9,
      notes: "Sold out within 48 hours of the litter being listed; deposit waitlist carried to next litter.",
    },
    {
      id: 'ace-suntea-2026',
      breedingId: 'ace-x-newgirl',
      whelped: '2026-10-10',
      status: 'Upcoming',
      breeder: 'cajun-briley-kennels',
      available: 8,
      total: null,
      notes: "Deposits open now. Estimated 7–9 puppies based on dam's prior litter sizes.",
    },
  ];

  const articles = [
    { id: 'reading-a-pedigree', cat: 'Genetics', title: 'How to Actually Read a Pedigree (Past the Names)', excerpt: "Titles tell you what a dog did. Clearances tell you what a dog carries. Here's how to weigh both before you commit to a breeding.", read: '7 min', author: 'RetrieverForge Staff' },
    { id: 'eic-explainer', cat: 'Health', title: 'EIC, CNM, and PRA: What Carrier Status Actually Means', excerpt: 'A clear sire and a clear dam will never produce an affected puppy from a recessive condition — but the math only works if both parents are actually tested.', read: '6 min', author: 'Dr. Lauren Ashby, DVM' },
    { id: 'first-season-marking', cat: 'Training', title: 'Building Marking Confidence Before the First Season', excerpt: 'Most marking failures in young dogs trace back to drill sequencing, not raw talent. Start here.', read: '9 min', author: 'Cole Bertrand' },
    { id: 'choosing-a-stud', cat: 'Breeding', title: 'Five Questions to Ask Before You Book a Stud', excerpt: 'Stud fee is the smallest number in the decision. These are the numbers that actually matter.', read: '5 min', author: 'RetrieverForge Staff' },
    { id: 'puppy-selection', cat: 'Puppy Selection', title: 'Picking a Puppy for Field Work, Not Just a Litter', excerpt: 'A structured puppy aptitude test beats picking the one that runs to you first.', read: '8 min', author: 'Marcus Webb' },
    { id: 'derby-season-recap', cat: 'Event Coverage', title: '2026 Derby Season: Bloodlines to Watch', excerpt: 'A handful of young dogs dominated derby placements this spring — and most of them share a surprising number of grandparents.', read: '6 min', author: 'RetrieverForge Staff' },
  ];

  const gear = [
    { id: 'sportdog-1875', cat: 'E-Collars', name: 'SportDOG TEK 2.0 GPS Tracking Collar', score: 9.1, pros: ['Reliable range past 1 mile', 'Rugged in heavy water work'], cons: ['Bulky on dogs under 50 lbs'], community: 4.6 },
    { id: 'garmin-alpha300', cat: 'Garmins', name: 'Garmin Alpha 300i', score: 9.4, pros: ['inReach satellite check-in', 'Excellent multi-dog tracking'], cons: ['Steep menu learning curve'], community: 4.7 },
    { id: 'ruff-land-classic', cat: 'Dog Boxes', name: 'Ruff Land Classic Single Kennel', score: 8.8, pros: ['Best-in-class ventilation', 'Holds up to truck bed heat'], cons: ['Premium price point'], community: 4.5 },
    { id: 'zinger-deluxe', cat: 'Launchers', name: 'Zinger Deluxe Bumper Launcher', score: 8.6, pros: ['Consistent distance control', 'Easy remote pairing'], cons: ['Reload arm wears over seasons'], community: 4.3 },
    { id: 'purina-pro-sport', cat: 'Dog Food', name: 'Purina Pro Plan Sport 30/20', score: 8.9, pros: ['Strong coat and stool quality reports', 'Widely available'], cons: ['Not grain-free for owners who prefer that'], community: 4.4 },
    { id: 'gunner-kennel-g1', cat: 'Kennels', name: 'Gunner Kennels G1', score: 9.3, pros: ['Crash-tested durability', 'Excellent insulation'], cons: ['Heaviest kennel in its class'], community: 4.8 },
  ];

  const reviews = {
    'thunder-ridge-retrievers': [
      { name: 'J. Calloway', stars: 5, date: '2026-04-02', text: "Bought a started dog out of Cash two years ago — exactly as advertised, exceptional water marking from day one." },
      { name: 'Marcus T.', stars: 5, date: '2025-11-18', text: "Health paperwork was complete and verifiable before we even put down a deposit. Rare to see that level of transparency." },
    ],
    'cajun-briley-kennels': [
      { name: 'Sarah D.', stars: 5, date: '2026-01-09', text: "Appreciated that they disclosed Kane's CNM carrier status upfront and explained exactly how it factored into pairing decisions." },
      { name: 'R. Boudreaux', stars: 4, date: '2025-08-30', text: "Great communication throughout. Puppy came home confident and already crate trained." },
    ],
    'southern-timber-retrievers': [
      { name: 'Early Deposit Holder', stars: 5, date: '2026-05-14', text: "Still early days for this program, but the documentation and communication so far have been outstanding." },
    ],
  };

  const findById = (arr, id) => arr.find(x => x.id === id);
  const getDog = (id) => findById(allDogs, id);
  const getBreeder = (id) => findById(breeders, id);

  function allSearchable() {
    const items = [];
    allDogs.forEach(d => items.push({ type: 'Dogs', name: d.name, meta: `${d.callName} · ${d.location}`, href: `dog.html?id=${d.id}` }));
    breeders.forEach(b => items.push({ type: 'Breeders', name: b.name, meta: b.location, href: `breeder.html?id=${b.id}` }));
    breedings.forEach(b => {
      const sire = getDog(b.sireId);
      items.push({ type: 'Breedings', name: `${sire?.callName} × ${b.damName || getDog(b.damId)?.callName}`, meta: b.status, href: `breeding.html?id=${b.id}` });
    });
    litters.forEach(l => items.push({ type: 'Litters', name: `Litter — ${getBreeder(l.breeder)?.name}`, meta: l.status, href: `litter.html?id=${l.id}` }));
    return items;
  }

  return { studs, females, allDogs, breeders, breedings, litters, articles, gear, pedigrees, performance, reviews, getDog, getBreeder, allSearchable };
})();
