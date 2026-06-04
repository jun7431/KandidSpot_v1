// ========== Area-specific mock route data ==========
const ROUTES = {
  hongdae: {
    label: 'Hongdae',
    mapLabel: 'Hongdae · Yeonnam-dong, Mapo-gu',
    center: { lat: 37.5613, lng: 126.9254 },
    defaultMood: 'Local food',
    meta: { total: '2h 05m', walking: '18 min' },
    why: '홍대 메인 거리는 지금 붐빌 수 있어서, 연남 쪽으로 살짝 빼서 걷기 좋은 루트로 잡았어요. We skip the strip and route you through Yeonnam\'s lived-in lanes — backstreet BBQ, residential walk, ten-seat cafe, hidden record shop.',
    ask: {
      why: 'You picked quiet local food, so I skipped the main Hongdae strip and used Yeonnam\'s calmer lanes. The four stops stay walkable while still feeling like places neighbors actually use.',
      crowd: 'Done — I would keep this on Yeonnam side streets and avoid Hongdae\'s main club/shop strip.',
      cafe: 'I can swap the record stop for another tiny Yeonnam cafe if you want this to lean more coffee-led.',
    },
    stops: [
      {
        num: 1,
        name: 'Yeonnam Galmaegisal',
        type: 'Backstreet BBQ · Korean',
        stay: 50,
        walk: 0,
        coords: { lat: 37.56225, lng: 126.92396 },
        why: 'Locals-only spot tucked behind the main drag. Skin-on pork belly, three banchan, no English menu.',
        next: 'Walk 6 min west into the residential lanes →',
        tags: ['🍴 locals', '🤫 quiet', '💸 ₩12k'],
      },
      {
        num: 2,
        name: 'Yeonnam-dong Backstreets',
        type: 'Quiet residential walk',
        stay: 25,
        walk: 6,
        coords: { lat: 37.56136, lng: 126.92612 },
        why: 'A working neighborhood — single-story houses, hand-painted shutters, neighborhood cats. Phone away.',
        next: 'Cut through Yeontral Park — 5 min →',
        tags: ['🌳 green', '🤫 quiet', '🚶 easy'],
      },
      {
        num: 3,
        name: 'Cafe Slow Steps',
        type: 'Tiny dessert cafe · 10 seats',
        stay: 30,
        walk: 5,
        coords: { lat: 37.56048, lng: 126.92878 },
        why: 'No Instagram tag. One seasonal dessert. Owner roasts on-site every morning.',
        next: 'One last hidden stop, 7 min →',
        tags: ['☕ roast', '💸 ₩8k', '🪑 10 seats'],
      },
      {
        num: 4,
        name: 'Gimbap Records',
        type: 'Hidden record shop',
        stay: 15,
        walk: 7,
        coords: { lat: 37.55819, lng: 126.92585 },
        why: 'A vinyl shop the size of a closet, run by a 90s indie-club veteran. Free to browse.',
        next: 'Route complete',
        tags: ['🎵 indie', '🗝️ hidden', '🆓 browse'],
      },
    ],
  },
  seongsu: {
    label: 'Seongsu',
    mapLabel: 'Seongsu · Seoul Forest + Ttukseom',
    center: { lat: 37.5447, lng: 127.0546 },
    defaultMood: 'Cafes',
    meta: { total: '2h 10m', walking: '20 min' },
    why: '성수는 한 번에 많이 넣으면 피곤해져서, 서울숲 가장자리에서 시작해 디자인 블록과 카페 골목, 저녁 골목으로 자연스럽게 이어지게 잡았어요. It keeps the warehouse-cafe texture without turning the route into a shopping crawl.',
    ask: {
      why: 'Seongsu works best as a light sequence: green edge, design block, cafe lane, then dinner. The route keeps you near Seoul Forest and Ttukseom instead of bouncing across the neighborhood.',
      crowd: 'Done — I would keep you one block off the largest cafe queues and use side streets near Ttukseom.',
      cafe: 'This route already leans cafe-forward; I can make the dinner stop a bakery-cafe if you want a softer finish.',
    },
    stops: [
      {
        num: 1,
        name: 'Seoul Forest East Gate Walk',
        type: 'Green walk · soft start',
        stay: 25,
        walk: 0,
        coords: { lat: 37.54418, lng: 127.04361 },
        why: 'A low-pressure start that gives the route space before you step into the busier cafe blocks.',
        next: 'Walk 7 min toward the design stores →',
        tags: ['🌳 green', '🚶 easy', '📍 anchor'],
      },
      {
        num: 2,
        name: 'LCDC Seoul Block',
        type: 'Design retail · browse',
        stay: 35,
        walk: 7,
        coords: { lat: 37.54473, lng: 127.05418 },
        why: 'A compact design stop with enough to browse, but not so much that it traps the whole route.',
        next: 'Drift 5 min north toward Ttukseom →',
        tags: ['🧩 design', '🛍️ browse', '📷 visual'],
      },
      {
        num: 3,
        name: 'Ttukseom Cafe Row',
        type: 'Converted-space cafes',
        stay: 40,
        walk: 5,
        coords: { lat: 37.54718, lng: 127.05546 },
        why: 'Several cafe backups sit within one block, so you do not need to commit to a single queue.',
        next: 'Cut back 8 min into the dinner lanes →',
        tags: ['☕ cafes', '🏭 warehouse', '🪑 backup'],
      },
      {
        num: 4,
        name: 'Seongsu Dinner Alley',
        type: 'Casual dinner · local',
        stay: 30,
        walk: 8,
        coords: { lat: 37.54338, lng: 127.05892 },
        why: 'A practical food close: enough options for a real meal without leaving the area.',
        next: 'Route complete · Ttukseom Station nearby',
        tags: ['🍜 dinner', '🌙 evening', '🚇 close'],
      },
    ],
  },
  anguk: {
    label: 'Anguk',
    mapLabel: 'Anguk · Bukchon + Insadong',
    center: { lat: 37.5783, lng: 126.9853 },
    defaultMood: 'Hidden spots',
    meta: { total: '2h 20m', walking: '22 min' },
    why: '안국은 사진 스팟만 따라가면 금방 지치니까, 북촌의 조용한 한옥길에서 시작해 미술관, 찻집, 익선동 골목으로 천천히 내려오게 했어요. The route keeps the historic mood but gives you real pauses.',
    ask: {
      why: 'Anguk can become a photo checklist fast, so this route spaces out the hanok lanes with a museum pause, tea, and an easy Ikseon-dong close.',
      crowd: 'Done — I would avoid the steepest Bukchon photo lane and keep you closer to quieter side streets.',
      cafe: 'For Anguk, I would make the tea house the main rest stop instead of adding another generic cafe.',
    },
    stops: [
      {
        num: 1,
        name: 'Bukchon Quiet Hanok Lane',
        type: 'Historic walk · low-noise',
        stay: 30,
        walk: 0,
        coords: { lat: 37.58274, lng: 126.98484 },
        why: 'A slower hanok lane that gives you the historic texture without starting in the densest photo crowd.',
        next: 'Walk 8 min down toward Samcheong →',
        tags: ['🏯 hanok', '🤫 quiet', '📷 gentle'],
      },
      {
        num: 2,
        name: 'MMCA Seoul Garden Edge',
        type: 'Museum area · design pause',
        stay: 40,
        walk: 8,
        coords: { lat: 37.57961, lng: 126.98047 },
        why: 'A culture anchor that lets the route breathe before moving back into narrower lanes.',
        next: 'Walk 6 min toward Insadong →',
        tags: ['🖼️ art', '🌿 courtyard', '🧭 anchor'],
      },
      {
        num: 3,
        name: 'Insadong Tea House Pause',
        type: 'Tea + rest',
        stay: 35,
        walk: 6,
        coords: { lat: 37.57492, lng: 126.98538 },
        why: 'A warm recovery stop after the hanok and gallery stretch, better matched to Anguk than another coffee queue.',
        next: 'Continue 8 min to a livelier close →',
        tags: ['🍵 tea', '🪑 rest', '💬 calm'],
      },
      {
        num: 4,
        name: 'Ikseon-dong Hanok Alley',
        type: 'Food + small lanes',
        stay: 35,
        walk: 8,
        coords: { lat: 37.57357, lng: 126.98979 },
        why: 'A livelier finish that still keeps the old-Seoul lane feeling, with easy dinner and dessert backups.',
        next: 'Route complete · Jongno 3-ga nearby',
        tags: ['🍡 snacks', '🌙 lively', '🚇 close'],
      },
    ],
  },
  euljiro: {
    label: 'Euljiro',
    mapLabel: 'Euljiro · Cheonggyecheon + print alleys',
    center: { lat: 37.5668, lng: 126.9931 },
    defaultMood: 'Night energy',
    meta: { total: '1h 55m', walking: '16 min' },
    why: '을지로는 큰길보다 골목의 밀도가 매력이라, 청계천에서 방향을 잡고 인쇄 골목, 노가리 골목, 세운상가 쪽으로 짧게 이어지게 했어요. It keeps the vintage night texture compact and walkable.',
    ask: {
      why: 'Euljiro rewards a compact route. This starts with the stream for orientation, then moves through print alleys, food/drink energy, and a rooftop-style city view.',
      crowd: 'Done — I would keep you off the most packed Nogari lane edges and use parallel print alleys.',
      cafe: 'For Euljiro, I would swap the night alley for a retro coffee stop if you want a daytime version.',
    },
    stops: [
      {
        num: 1,
        name: 'Cheonggyecheon Stream Start',
        type: 'Urban walk · orientation',
        stay: 20,
        walk: 0,
        coords: { lat: 37.56812, lng: 126.99083 },
        why: 'A clear first line through central Seoul before entering the denser workshop blocks.',
        next: 'Slip 4 min south into the print alleys →',
        tags: ['💧 stream', '🧭 easy', '🚶 flat'],
      },
      {
        num: 2,
        name: 'Euljiro Print Alley',
        type: 'Old Seoul texture',
        stay: 25,
        walk: 4,
        coords: { lat: 37.56668, lng: 126.99191 },
        why: 'Working-city signs, shutters, and print shops give the area its real visual identity.',
        next: 'Walk 5 min toward the food lights →',
        tags: ['🖨️ print', '📷 texture', '🗝️ hidden'],
      },
      {
        num: 3,
        name: 'Nogari Alley Edge',
        type: 'Beer street · lively',
        stay: 35,
        walk: 5,
        coords: { lat: 37.56535, lng: 126.99123 },
        why: 'You get the famous Euljiro night energy while staying at the edge, not trapped in the busiest center.',
        next: 'Walk 7 min toward Sewoon →',
        tags: ['🍻 night', '🍢 snack', '🌃 lively'],
      },
      {
        num: 4,
        name: 'Sewoon Rooftop Walk',
        type: 'Retro city view',
        stay: 25,
        walk: 7,
        coords: { lat: 37.57007, lng: 126.99577 },
        why: 'A distinctive finish with rooftops, old electronics blocks, and a little distance from the crowd.',
        next: 'Route complete · Euljiro 3-ga nearby',
        tags: ['🏙️ view', '🔌 retro', '🚇 close'],
      },
    ],
  },
  gangnam: {
    label: 'Gangnam',
    mapLabel: 'Gangnam · Station + Sinnonhyeon',
    center: { lat: 37.5011, lng: 127.0278 },
    defaultMood: 'Local food',
    meta: { total: '2h 00m', walking: '17 min' },
    why: '강남은 큰길 위주로 움직이면 너무 바쁘게 느껴져서, 역 뒤쪽 식당 골목에서 시작해 신논현 카페와 작은 전시/디저트 포인트로 이어지게 했어요. It keeps the polished area useful without sending you into only malls and chains.',
    ask: {
      why: 'Gangnam can feel too broad and chain-heavy, so this route stays around the station and Sinnonhyeon backstreets with one food anchor, one cafe pause, and one polished close.',
      crowd: 'Done — I would avoid the main Gangnam-daero sidewalk and use backstreets behind the station.',
      cafe: 'I can make the Sinnonhyeon cafe the longer anchor and shorten the first food stop.',
    },
    stops: [
      {
        num: 1,
        name: 'Gangnam Station Noodle Counter',
        type: 'Quick local meal',
        stay: 35,
        walk: 0,
        coords: { lat: 37.49952, lng: 127.02723 },
        why: 'A practical food-first anchor behind the station, less polished than the main-road chains.',
        next: 'Walk 5 min north off the main road →',
        tags: ['🍜 food', '💸 ₩10k', '🚇 close'],
      },
      {
        num: 2,
        name: 'Sinnonhyeon Backstreet Cafe',
        type: 'Quiet cafe · reset',
        stay: 35,
        walk: 5,
        coords: { lat: 37.50419, lng: 127.02548 },
        why: 'A calmer pause just far enough from Gangnam-daero to feel like a real break.',
        next: 'Walk 4 min toward a small visual stop →',
        tags: ['☕ cafe', '🤫 quieter', '🪑 rest'],
      },
      {
        num: 3,
        name: 'Teheran Pocket Gallery',
        type: 'Small exhibit · design',
        stay: 25,
        walk: 4,
        coords: { lat: 37.50218, lng: 127.03163 },
        why: 'A compact visual stop that gives the route more shape than food-and-cafe only.',
        next: 'Walk 8 min toward the dessert close →',
        tags: ['🖼️ design', '📍 compact', '💼 polished'],
      },
      {
        num: 4,
        name: 'Gangnam Dessert Bar',
        type: 'Dessert · easy finish',
        stay: 30,
        walk: 8,
        coords: { lat: 37.49789, lng: 127.02986 },
        why: 'A clean finish near transit, useful if you want one more stop without extending the route.',
        next: 'Route complete · Gangnam Station nearby',
        tags: ['🍰 dessert', '🌙 evening', '🚇 close'],
      },
    ],
  },
  itaewon: {
    label: 'Itaewon / Hannam',
    mapLabel: 'Itaewon · Hannam-dong global-local route',
    center: { lat: 37.5345, lng: 126.9946 },
    defaultMood: 'Drinks & night',
    meta: { total: '2h 20m', walking: '19 min' },
    why: '이태원과 한남은 너무 넓게 잡으면 산만해져서, 글로벌한 식사로 시작해 한남의 디자인/브라우징 무드, 카페나 바, 야경 느낌으로 이어지게 잡았어요. Built around nearby stops that fit the area, time, and night mood.',
    ask: {
      why: 'Itaewon and Hannam work best when the route keeps a clear arc: global food, a browse/design pause, then a cafe or bar finish without crossing the whole district.',
      crowd: 'Done — I would keep this one around Hannam side streets and avoid bouncing through Itaewon main road unless you want more nightlife.',
      cafe: 'I can make the middle stop cafe-led and keep the final stop as a soft night-view option.',
    },
    stops: [
      {
        num: 1,
        name: 'Itaewon Global Dinner Lane',
        type: 'Global food · dinner anchor',
        stay: 60,
        walk: 0,
        coords: { lat: 37.53442, lng: 126.99408 },
        why: 'A practical food-first anchor for the area: international restaurants, easy backups, and a clear start point.',
        next: 'Walk 7 min toward Hannam side streets →',
        tags: ['🍽️ global', '🌙 dinner', '🚇 nearby'],
      },
      {
        num: 2,
        name: 'Hannam Design Browse Block',
        type: 'Design shops · browse',
        stay: 35,
        walk: 7,
        coords: { lat: 37.53702, lng: 127.00079 },
        why: 'A compact browsing pause that matches Hannam without inventing ratings or specific claims.',
        next: 'Continue 5 min toward a cafe/bar pause →',
        tags: ['🛍️ browse', '🎨 design', '📷 visual'],
      },
      {
        num: 3,
        name: 'Hannam Cafe or Wine Bar Pause',
        type: 'Cafe or bar · flexible stop',
        stay: 45,
        walk: 5,
        coords: { lat: 37.53795, lng: 127.00237 },
        why: 'This slot can lean cafe in the afternoon or bar in the evening while keeping the route walkable.',
        next: 'Walk 7 min for a soft view close →',
        tags: ['☕ cafe', '🍷 wine', '🌙 evening'],
      },
      {
        num: 4,
        name: 'Itaewon Night View Edge',
        type: 'View finish · night option',
        stay: 25,
        walk: 7,
        coords: { lat: 37.53183, lng: 126.99729 },
        why: 'A low-commitment finish with the area feeling of Itaewon/Hannam, useful when you want one more stop without stretching the route.',
        next: 'Route complete · transit nearby',
        tags: ['🌃 view', '🚶 walkable', '📍 easy finish'],
      },
    ],
  },
};

// ========== Curated Naver bookmark place data ==========
const SUBCATEGORIZED_PLACES_URL = '/v2-refined-main-app/data/places/processed/miro_places_subcategorized.json';
const CURATED_PLACES_URL = '/v2-refined-main-app/data/miro_places.json';
const MOCK_ROUTES_ENABLED = new URLSearchParams(window.location.search).get('mock') === '1';
const ROUTE_DEBUG_ENABLED = new URLSearchParams(window.location.search).get('route_debug') === '1';
const BEAM_SEARCH_ENABLED = new URLSearchParams(window.location.search).get('beam') !== '0';
const BEAM_SEARCH_WIDTH = Math.max(
  8,
  Math.min(20, Number(new URLSearchParams(window.location.search).get('beam_width')) || 12)
);

function getRecommendationModule(name) {
  return window.KSRecommendation && window.KSRecommendation[name];
}

const AREA_FILTERS = {
  myeongdong_euljiro: {
    label: 'Myeongdong / Euljiro',
    mapLabel: 'Myeongdong / Euljiro · walkable local route',
    center: { lat: 37.5663, lng: 126.9880 },
    terms: ['명동', '을지로', '충무로', '청계', '종로', '중구'],
    radiusM: 1800,
  },
  hongdae_yeonnam: {
    label: 'Hongdae / Yeonnam',
    mapLabel: 'Hongdae / Yeonnam · walkable local route',
    center: { lat: 37.5563, lng: 126.9236 },
    terms: ['홍대', '연남', '서교', '동교', '합정', '상수', '망원', '마포구'],
    radiusM: 1800,
  },
  itaewon_hannam: {
    label: 'Itaewon / Hannam',
    mapLabel: 'Itaewon / Hannam · walkable local route',
    center: { lat: 37.5345, lng: 126.9946 },
    terms: ['이태원', '한남', '용산구', '해방촌', '녹사평'],
    radiusM: 2000,
  },
  seongsu: {
    label: 'Seongsu',
    mapLabel: 'Seongsu · walkable local route',
    center: { lat: 37.5446, lng: 127.0557 },
    terms: ['성수', '서울숲', '뚝섬', '성동구'],
    radiusM: 1800,
  },
  anguk_bukchon: {
    label: 'Anguk / Bukchon',
    mapLabel: 'Anguk / Bukchon · walkable local route',
    center: { lat: 37.5796, lng: 126.9849 },
    terms: ['안국', '북촌', '삼청', '인사', '익선', '운니', '계동', '가회', '종로구'],
    radiusM: 1800,
  },
  gangnam_sinsa_apgujeong: {
    label: 'Gangnam / Sinsa / Apgujeong',
    mapLabel: 'Gangnam / Sinsa / Apgujeong · walkable local route',
    center: { lat: 37.5172, lng: 127.0286 },
    terms: ['강남', '역삼', '신논현', '논현', '신사', '압구정', '잠원', '강남구', '서초구'],
    radiusM: 2500,
  },
  near_me: {
    label: 'Near me',
    mapLabel: 'Near me · walkable local route',
    center: null,
    terms: [],
    radiusM: 1200,
  },
};

AREA_FILTERS.hongdae = AREA_FILTERS.hongdae_yeonnam;
AREA_FILTERS.euljiro = AREA_FILTERS.myeongdong_euljiro;
AREA_FILTERS.anguk = AREA_FILTERS.anguk_bukchon;
AREA_FILTERS.gangnam = AREA_FILTERS.gangnam_sinsa_apgujeong;
AREA_FILTERS.itaewon = AREA_FILTERS.itaewon_hannam;

const TIME_CONFIG = {
  time_30_60: { label: '30–60 min', targetMin: 45, minStops: 1, maxStops: 1, nearMeRadiusM: 700 },
  time_1_2: { label: '1–2 hours', targetMin: 90, minStops: 2, maxStops: 2, nearMeRadiusM: 1200 },
  time_2_3: { label: '2–3 hours', targetMin: 150, minStops: 3, maxStops: 3, nearMeRadiusM: 1800 },
  time_4_6: { label: '4–6 hours', targetMin: 300, minStops: 4, maxStops: 4, nearMeRadiusM: 3000 },
};

const TIME_ALIASES = {
  '30–60 min': 'time_30_60',
  '30-60 min': 'time_30_60',
  '1–2 hours': 'time_1_2',
  '1-2 hours': 'time_1_2',
  '2–3 hours': 'time_2_3',
  '2-3 hours': 'time_2_3',
  '2 hours': 'time_2_3',
  '3–4 hours': 'time_2_3',
  '3-4 hours': 'time_2_3',
  '4–6 hours': 'time_4_6',
  '4-6 hours': 'time_4_6',
  '6+ hours': 'time_4_6',
};

const MOOD_CONFIG = {
  local_food: {
    label: 'Local food',
    primaryPreferred: ['meal'],
    secondaryPreferred: ['cafe', 'dessert_bakery'],
    tagsPreferred: ['local', 'lunch', 'dinner', 'grill', 'noodle', 'rice'],
  },
  cafes_dessert: {
    label: 'Cafes & dessert',
    primaryPreferred: ['cafe', 'dessert_bakery'],
    secondaryPreferred: ['shopping', 'walk_nature'],
    tagsPreferred: ['coffee', 'dessert', 'bakery', 'aesthetic', 'afternoon'],
  },
  drinks_night: {
    label: 'Drinks & night',
    primaryPreferred: ['bar'],
    secondaryPreferred: ['meal', 'landmark_view'],
    tagsPreferred: ['evening', 'late_night', 'wine', 'cocktail', 'beer', 'whiskey'],
  },
  shop_browse: {
    label: 'Shop & browse',
    primaryPreferred: ['shopping'],
    secondaryPreferred: ['cafe', 'dessert_bakery'],
    tagsPreferred: ['shopping', 'bookstore', 'lifestyle', 'aesthetic'],
  },
  culture_activities: {
    label: 'Culture & activities',
    primaryPreferred: ['activity', 'landmark_view'],
    secondaryPreferred: ['cafe', 'meal'],
    tagsPreferred: ['culture', 'indoor', 'performance', 'hands_on', 'history'],
  },
  walks_views: {
    label: 'Walks & views',
    primaryPreferred: ['walk_nature', 'landmark_view'],
    secondaryPreferred: ['cafe', 'dessert_bakery'],
    tagsPreferred: ['outdoor', 'walkable', 'view', 'photo_worthy', 'history'],
  },
};

const MOOD_ALIASES = {
  'local food': 'local_food',
  'cafes & dessert': 'cafes_dessert',
  cafes: 'cafes_dessert',
  'drinks & night': 'drinks_night',
  'night energy': 'drinks_night',
  'shop & browse': 'shop_browse',
  'culture & activities': 'culture_activities',
  'walks & views': 'walks_views',
  'quiet walk': 'walks_views',
  'hidden spots': 'culture_activities',
};

const MOOD_CATEGORY_SEQUENCES = {
  local_food: {
    time_30_60: ['meal', 'cafe'],
    time_1_2: ['meal', 'cafe'],
    time_2_3: ['meal', 'cafe', 'bar'],
    time_4_6: ['meal', 'cafe', 'landmark_view', 'bar'],
  },
  cafes_dessert: {
    time_30_60: ['cafe', 'dessert_bakery'],
    time_1_2: ['cafe', 'dessert_bakery'],
    time_2_3: ['cafe', 'shopping', 'dessert_bakery'],
    time_4_6: ['cafe', 'shopping', 'dessert_bakery', 'walk_nature'],
  },
  drinks_night: {
    time_30_60: ['bar'],
    time_1_2: ['meal', 'bar'],
    time_2_3: ['meal', 'bar', 'landmark_view'],
    time_4_6: ['meal', 'bar', 'landmark_view', 'bar'],
  },
  shop_browse: {
    time_30_60: ['shopping', 'cafe'],
    time_1_2: ['shopping', 'cafe'],
    time_2_3: ['cafe', 'shopping', 'dessert_bakery'],
    time_4_6: ['meal', 'shopping', 'cafe', 'dessert_bakery'],
  },
  culture_activities: {
    time_30_60: ['activity', 'cafe'],
    time_1_2: ['activity', 'cafe'],
    time_2_3: ['activity', 'cafe', 'meal'],
    time_4_6: ['activity', 'cafe', 'meal', 'landmark_view'],
  },
  walks_views: {
    time_30_60: ['walk_nature', 'cafe'],
    time_1_2: ['landmark_view', 'cafe'],
    time_2_3: ['cafe', 'walk_nature', 'dessert_bakery'],
    time_4_6: ['cafe', 'walk_nature', 'meal', 'landmark_view'],
  },
};

const MOOD_REQUIRED_PRIMARY_CATEGORIES = {
  local_food: ['meal'],
  cafes_dessert: ['cafe', 'dessert_bakery'],
  drinks_night: ['bar'],
  shop_browse: ['shopping'],
  culture_activities: ['activity', 'landmark_view'],
  walks_views: ['walk_nature', 'landmark_view'],
};

const MOOD_CANDIDATE_TEXT_TERMS = {
  cafes_dessert: ['cafe', 'coffee', 'dessert', 'bakery', 'tea', 'brunch', 'sweet', 'pastry', '카페', '커피', '디저트', '베이커리', '차', '브런치', '빵'],
};

const MIRO_CATEGORY_TO_PRIMARY_CATEGORY = {
  eat: 'meal',
  cafe: 'cafe',
  night: 'bar',
  shop: 'shopping',
  activity: 'activity',
  walk: 'walk_nature',
  see: 'landmark_view',
};

const PRIMARY_CATEGORY_TO_MIRO_CATEGORY = {
  meal: 'eat',
  cafe: 'cafe',
  dessert_bakery: 'cafe',
  bar: 'night',
  shopping: 'shop',
  activity: 'activity',
  walk_nature: 'walk',
  landmark_view: 'see',
};

const OPTIONAL_SHAPE_CATEGORY_SEQUENCES = {
  slow_build: ['cafe', 'walk_nature', 'meal', 'bar'],
  food_first: ['meal', 'walk_nature', 'cafe', 'bar'],
  wander_end_loud: ['walk_nature', 'cafe', 'meal', 'bar'],
};

const OPTIONAL_ANCHOR_CATEGORY_GROUPS = {
  meal: ['meal'],
  cafe: ['cafe', 'dessert_bakery'],
  walk: ['walk_nature', 'landmark_view'],
  end: ['bar', 'dessert_bakery', 'landmark_view'],
};

const MOCK_ROUTE_KEY_ALIASES = {
  myeongdong_euljiro: 'euljiro',
  hongdae_yeonnam: 'hongdae',
  itaewon_hannam: 'itaewon',
  anguk_bukchon: 'anguk',
  gangnam_sinsa_apgujeong: 'gangnam',
  near_me: 'hongdae',
};

const ROUTE_TEMPLATES = {
  balanced: ['see', 'eat', 'walk', 'cafe'],
  'food-focused': ['eat', 'walk', 'cafe', 'eat'],
  'cafe-slow-walk': ['cafe', 'walk', 'see', 'cafe'],
  'culture-local-streets': ['see', 'walk', 'cafe', 'shop'],
  'shopping-browsing': ['shop', 'cafe', 'walk', 'eat'],
  'do-something-fun': ['activity', 'cafe', 'walk', 'eat'],
  'night-energy': ['eat', 'night', 'walk', 'eat'],
};

const DEFAULT_MAX_WALK_MINUTES = 15;
const LESS_WALKING_MAX_WALK_MINUTES = 8;
const WALKING_SPEED_M_PER_MIN = 80;

const MOOD_TO_ROUTE_MODE = {
  // legacy display labels
  'local food': 'food-focused',
  'quiet walk': 'cafe-slow-walk',
  cafes: 'cafe-slow-walk',
  'night energy': 'night-energy',
  'hidden spots': 'culture-local-streets',
  // new onboarding display labels (lowercased)
  'cafes & dessert': 'cafe-slow-walk',
  'drinks & night': 'night-energy',
  'shop & browse': 'shopping-browsing',
  'culture & activities': 'do-something-fun',
  'walks & views': 'culture-local-streets',
  // new onboarding internal snake_case values
  local_food: 'food-focused',
  cafes_dessert: 'cafe-slow-walk',
  drinks_night: 'night-energy',
  shop_browse: 'shopping-browsing',
  culture_activities: 'do-something-fun',
  walks_views: 'culture-local-streets',
};

// Aliases for new onboarding area values. Maps lowercased display labels
// and snake_case internal values to an existing AREA_FILTERS / ROUTES key.
// Used by getRouteKey() to avoid silent 'hongdae' fallback for the new options.
const AREA_KEY_ALIASES = {
  // new onboarding display labels (lowercased)
  'myeongdong / euljiro': 'myeongdong_euljiro',
  'hongdae / yeonnam': 'hongdae_yeonnam',
  'itaewon / hannam': 'itaewon_hannam',
  itaewon: 'itaewon_hannam',
  hannam: 'itaewon_hannam',
  'anguk / bukchon': 'anguk_bukchon',
  'gangnam / sinsa': 'gangnam_sinsa_apgujeong',
  'gangnam / sinsa / apgujeong': 'gangnam_sinsa_apgujeong',
  'near me': 'near_me',
  // new onboarding internal snake_case values
  myeongdong_euljiro: 'myeongdong_euljiro',
  hongdae_yeonnam: 'hongdae_yeonnam',
  itaewon_hannam: 'itaewon_hannam',
  anguk_bukchon: 'anguk_bukchon',
  gangnam_sinsa_apgujeong: 'gangnam_sinsa_apgujeong',
  near_me: 'near_me',
};

const NEAR_ME_FALLBACK_AREA_KEY = 'hongdae_yeonnam';
const NEAR_ME_FALLBACK_MESSAGE = 'Location unavailable - using Hongdae as a fallback area.';
const NEAR_ME_NEAREST_CANDIDATE_LIMIT = 24;

const MIRO_CATEGORY_LABELS = {
  eat: 'Food',
  cafe: 'Cafe',
  see: 'See',
  walk: 'Walk',
  shop: 'Shop',
  activity: 'Activity',
  night: 'Night',
  practical: 'Practical',
  unknown: 'Saved place',
};

const CATEGORY_STAY_MINUTES = {
  eat: 45,
  cafe: 35,
  see: 35,
  walk: 25,
  shop: 30,
  activity: 45,
  night: 45,
  practical: 20,
  unknown: 25,
};

const curatedPlaceState = {
  loaded: false,
  failed: false,
  meta: null,
  places: [],
};

function normalizeCuratedPlacesPayload(payload) {
  const rawPlaces = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.places)
      ? payload.places
      : [];

  const places = rawPlaces
    .filter(place => place && typeof place === 'object')
    .map(place => normalizeRealPlace(place));

  return {
    meta: payload && !Array.isArray(payload) && payload.meta ? payload.meta : null,
    places,
  };
}

function normalizeRealPlace(place) {
  const sourceFile = String(place.sourceFile || '').trim();
  const source = String(place.source || 'naver').trim() || 'naver';
  const categoryCode = String(place.categoryCode || '').trim();
  const categoryName = String(place.categoryName || '').trim();
  const primaryCategory = String(place.primaryCategory || '').trim();
  const primaryCategoryLabel = String(place.primaryCategoryLabel || '').trim();
  const subCategory = place.subCategory === null ? null : String(place.subCategory || '').trim();
  const subCategoryLabel = place.subCategoryLabel === null ? null : String(place.subCategoryLabel || '').trim();

  return {
    ...place,
    id: String(place.id || ''),
    placeId: String(place.placeId || ''),
    name: String(place.name || place.displayName || '').trim(),
    lng: numberOrNull(place.lng),
    lat: numberOrNull(place.lat),
    address: String(place.address || ''),
    categoryCode,
    categoryName,
    primaryCategory,
    primaryCategoryLabel,
    subCategory,
    subCategoryLabel,
    tags: Array.isArray(place.tags) ? place.tags.filter(Boolean).map(String) : [],
    estimatedStayMin: place.estimatedStayMin && typeof place.estimatedStayMin === 'object'
      ? place.estimatedStayMin
      : null,
    routeRoles: Array.isArray(place.routeRoles) ? place.routeRoles.filter(Boolean).map(String) : [],
    miroCategory: inferMiroCategory({ ...place, categoryCode, categoryName, primaryCategory }),
    source,
    sourceFile,
    sourceKind: String(place.sourceKind || source || 'naver'),
    sourceList: String(place.sourceList || sourceFile),
    sourceType: String(place.sourceType || source),
    sourcePriority: Number.isFinite(Number(place.sourcePriority)) ? Number(place.sourcePriority) : 0,
    available: typeof place.available === 'boolean' ? place.available : null,
    isMatched: typeof place.isMatched === 'boolean' ? place.isMatched : null,
  };
}

function numberOrNull(value) {
  if (value === undefined || value === null || String(value).trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function inferMiroCategory(place) {
  const primaryCategory = String(place.primaryCategory || '').trim();
  const primaryMap = {
    meal: 'eat',
    cafe: 'cafe',
    dessert_bakery: 'cafe',
    bar: 'night',
    activity: 'activity',
    shopping: 'shop',
    walk_nature: 'walk',
    landmark_view: 'see',
    rest: 'activity',
  };
  if (primaryMap[primaryCategory]) return primaryMap[primaryCategory];

  const code = String(place.miroCategory || place.categoryCode || '').toUpperCase();
  const name = String(place.categoryName || '').toLowerCase();

  if (place.miroCategory && MIRO_CATEGORY_LABELS[place.miroCategory]) return place.miroCategory;
  if (code.includes('CAFE') || name.includes('카페') || name.includes('coffee')) return 'cafe';
  if (code.includes('DINING') || code.includes('FOOD') || code.includes('RESTAURANT') || name.includes('음식') || name.includes('맛집')) return 'eat';
  if (code.includes('BAR') || name.includes('바') || name.includes('술') || name.includes('pub')) return 'night';
  if (code.includes('SHOP') || name.includes('쇼핑') || name.includes('상점')) return 'shop';
  if (code.includes('LIFE_CULTURE') || code.includes('ACTIVITY') || name.includes('생활') || name.includes('문화')) return 'activity';
  if (name.includes('전시') || name.includes('미술') || name.includes('박물')) return 'see';
  return 'unknown';
}

function loadCuratedPlaces() {
  if (curatedPlaceState.loaded) {
    return Promise.resolve(curatedPlaceState.places);
  }

  if (typeof fetch !== 'function') {
    console.warn('Miro real places dataset could not be loaded because fetch is unavailable.');
    curatedPlaceState.loaded = true;
    curatedPlaceState.failed = true;
    return Promise.resolve([]);
  }

  console.log(`Miro local place dataset URL: ${SUBCATEGORIZED_PLACES_URL}`);
  return fetch(SUBCATEGORIZED_PLACES_URL, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`miro_places_subcategorized.json returned ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      const normalized = normalizeCuratedPlacesPayload(payload);
      curatedPlaceState.loaded = true;
      curatedPlaceState.failed = false;
      curatedPlaceState.meta = normalized.meta;
      curatedPlaceState.places = normalized.places;
      console.log(`Miro local subcategorized places loaded: ${normalized.places.length}`);
      console.log(`Miro places with valid lat/lng: ${normalized.places.filter(hasValidCoords).length}`);
      return normalized.places;
    })
    .catch(error => {
      console.warn('Miro subcategorized dataset failed to load; trying legacy local places.', error);
      return fetch(CURATED_PLACES_URL, { cache: 'no-store' })
        .then(response => {
          if (!response.ok) {
            throw new Error(`miro_places.json returned ${response.status}`);
          }
          return response.json();
        })
        .then(payload => {
          const normalized = normalizeCuratedPlacesPayload(payload);
          curatedPlaceState.loaded = true;
          curatedPlaceState.failed = false;
          curatedPlaceState.meta = normalized.meta;
          curatedPlaceState.places = normalized.places;
          console.log(`Miro legacy local places loaded: ${normalized.places.length}`);
          console.log(`Miro places with valid lat/lng: ${normalized.places.filter(hasValidCoords).length}`);
          return normalized.places;
        })
        .catch(fallbackError => {
          curatedPlaceState.loaded = true;
          curatedPlaceState.failed = true;
          curatedPlaceState.meta = null;
          curatedPlaceState.places = [];
          console.warn('Miro local place datasets failed to load; using route fallback.', fallbackError);
          return [];
        });
    });
}

function ensureRealPlacesLoaded() {
  if (!realPlacesLoadPromise) {
    realPlacesLoadPromise = loadCuratedPlaces();
  }
  return realPlacesLoadPromise;
}

function hasValidCoords(place) {
  if (!place) return false;
  if (place.lat === undefined || place.lat === null || place.lat === '') return false;
  if (place.lng === undefined || place.lng === null || place.lng === '') return false;
  return Number.isFinite(Number(place.lat)) && Number.isFinite(Number(place.lng));
}

function getRouteMode(mood) {
  return MOOD_TO_ROUTE_MODE[String(mood || '').trim().toLowerCase()] || 'balanced';
}

function normalizeTimeKey(value) {
  const raw = String(value || '').trim();
  return TIME_CONFIG[raw] ? raw : TIME_ALIASES[raw] || TIME_ALIASES[raw.toLowerCase()] || 'time_2_3';
}

function getTimeConfig(value = state.time) {
  const key = normalizeTimeKey(value);
  return { key, ...TIME_CONFIG[key] };
}

function normalizeMoodKeys(value = state.mood) {
  const values = Array.isArray(value) ? value : [value];
  const normalized = values
    .map(item => String(item || '').trim())
    .filter(Boolean)
    .map(item => MOOD_CONFIG[item] ? item : MOOD_ALIASES[item.toLowerCase()])
    .filter(Boolean);
  return uniqueStrings(normalized);
}

function getMoodContext(value = state.mood) {
  const moodKeys = normalizeMoodKeys(value);
  const compositionMoodKeys = moodKeys.slice(0, 2);
  const softMoodKeys = moodKeys.slice(2);
  const activeMoodKeys = compositionMoodKeys.length ? compositionMoodKeys : ['local_food'];
  const primaryPreferred = uniqueStrings(activeMoodKeys.flatMap(key => MOOD_CONFIG[key]?.primaryPreferred || []));
  const secondaryPreferred = uniqueStrings(activeMoodKeys.flatMap(key => MOOD_CONFIG[key]?.secondaryPreferred || []));
  const tagsPreferred = uniqueStrings([
    ...activeMoodKeys.flatMap(key => MOOD_CONFIG[key]?.tagsPreferred || []),
    ...softMoodKeys.flatMap(key => MOOD_CONFIG[key]?.tagsPreferred || []),
  ]);

  return {
    keys: moodKeys,
    compositionKeys: activeMoodKeys,
    labels: activeMoodKeys.map(key => MOOD_CONFIG[key]?.label || key),
    primaryPreferred,
    secondaryPreferred,
    tagsPreferred,
  };
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function getMoodRequiredPrimaryCategories(moodContext, startTimeContext = getStartTimeContext()) {
  const primaryMood = moodContext?.compositionKeys?.[0] || 'local_food';
  const required = MOOD_REQUIRED_PRIMARY_CATEGORIES[primaryMood] || [];
  if (startTimeContext?.isMorning) {
    return required.filter(category => category !== 'bar');
  }
  return required;
}

function getOptionalRoutePreferences(source = state) {
  const shape = String(source.shape || '').trim();
  const shapeSequence = OPTIONAL_SHAPE_CATEGORY_SEQUENCES[shape]
    ? OPTIONAL_SHAPE_CATEGORY_SEQUENCES[shape].slice()
    : null;
  const refine = source.refine && typeof source.refine === 'object' ? source.refine : {};
  const heartAnchors = [];
  const pinAnchors = [];

  Object.entries(refine).forEach(([anchor, preference]) => {
    if (!OPTIONAL_ANCHOR_CATEGORY_GROUPS[anchor]) return;
    if (preference === 'heart') heartAnchors.push(anchor);
    if (preference === 'pin') pinAnchors.push(anchor);
  });

  const heartCategories = uniqueStrings(
    heartAnchors.flatMap(anchor => OPTIONAL_ANCHOR_CATEGORY_GROUPS[anchor])
  );
  const pinCategoryGroups = pinAnchors.map(anchor => ({
    anchor,
    categories: OPTIONAL_ANCHOR_CATEGORY_GROUPS[anchor].slice(),
  }));
  const pinCategories = uniqueStrings(pinCategoryGroups.flatMap(group => group.categories));

  if (!shapeSequence && !heartCategories.length && !pinCategoryGroups.length) return null;

  return {
    shape,
    shapeSequence,
    heartAnchors,
    heartCategories,
    pinAnchors,
    pinCategoryGroups,
    pinCategories,
  };
}

function getPlacePrimaryCategory(place = {}) {
  const primaryCategory = String(place.primaryCategory || '').trim();
  if (primaryCategory) return primaryCategory;

  const miroCategory = String(place.miroCategory || '').trim();
  return MIRO_CATEGORY_TO_PRIMARY_CATEGORY[miroCategory] || '';
}

function placeMatchesAnyPrimaryCategory(place, categories) {
  if (!categories.length) return true;
  return categories.includes(getPlacePrimaryCategory(place));
}

function placeMatchesRequiredPrimaryCategory(place, requiredCategories) {
  if (!requiredCategories.length) return true;
  return requiredCategories.includes(getPlacePrimaryCategory(place));
}

function hasRequiredPrimaryCategory(places, requiredCategories) {
  return (
    !requiredCategories.length ||
    places.some(place => placeMatchesRequiredPrimaryCategory(place, requiredCategories))
  );
}

function hasAnyPrimaryCategory(places, categories) {
  return (
    !categories.length ||
    places.some(place => placeMatchesAnyPrimaryCategory(place, categories))
  );
}

function getMoodCandidatePrimaryCategories(moodContext) {
  return uniqueStrings([
    ...(moodContext?.primaryPreferred || []),
  ]);
}

function getMoodCandidateTextTerms(moodContext) {
  return uniqueStrings(
    (moodContext?.compositionKeys || []).flatMap(key => MOOD_CANDIDATE_TEXT_TERMS[key] || [])
  );
}

function placeMatchesMoodCandidate(place, moodContext) {
  if (!moodContext) return false;
  const primaryCategories = getMoodCandidatePrimaryCategories(moodContext);
  if (primaryCategories.includes(getPlacePrimaryCategory(place))) return true;

  const terms = getMoodCandidateTextTerms(moodContext);
  return terms.length ? textHasAnyTerm(getPlaceSearchText(place), terms) : false;
}

function getRoutePreferenceScore(place, routePreferences) {
  if (!routePreferences) return 0;
  const primaryCategory = getPlacePrimaryCategory(place);
  if (!primaryCategory) return 0;

  let score = 0;
  if (routePreferences.heartCategories.includes(primaryCategory)) score += 18;
  if (routePreferences.pinCategories.includes(primaryCategory)) score += 28;
  return score;
}

function findPreferenceReplacementIndex(selected, protectedCategories, targetCategories) {
  return selected.findIndex(place => {
    const primaryCategory = getPlacePrimaryCategory(place);
    return (
      !targetCategories.includes(primaryCategory) &&
      !protectedCategories.has(primaryCategory)
    );
  });
}

function getAreaRadiusM(areaConfig) {
  if (Number.isFinite(Number(areaConfig.radiusM))) return Number(areaConfig.radiusM);
  if (Number.isFinite(Number(areaConfig.radiusKm))) return Number(areaConfig.radiusKm) * 1000;
  return 1800;
}

function getAreaConfig(routeKey, runtimeContext = {}) {
  const base = AREA_FILTERS[routeKey] || AREA_FILTERS.hongdae_yeonnam;
  const timeConfig = getTimeConfig();
  const center = runtimeContext.center || base.center || null;
  const radiusM = routeKey === 'near_me'
    ? timeConfig.nearMeRadiusM
    : getAreaRadiusM(base);
  return {
    ...base,
    routeKey,
    label: runtimeContext.label || base.label,
    mapLabel: runtimeContext.mapLabel || base.mapLabel,
    center,
    radiusM: runtimeContext.radiusM || radiusM,
    radiusKm: (runtimeContext.radiusM || radiusM) / 1000,
    fallbackAreaKey: runtimeContext.fallbackAreaKey || '',
    nearMeFallbackUsed: Boolean(runtimeContext.nearMeFallbackUsed),
    locationError: runtimeContext.locationError || '',
  };
}

function addressMatchesArea(place, areaConfig) {
  const address = String(place.address || '');
  return areaConfig.terms.some(term => address.includes(term));
}

function distanceKm(a, b) {
  if (!hasValidCoords(a) || !hasValidCoords(b)) return Infinity;
  const earthRadiusKm = 6371;
  const latDelta = toRadians(Number(b.lat) - Number(a.lat));
  const lngDelta = toRadians(Number(b.lng) - Number(a.lng));
  const lat1 = toRadians(Number(a.lat));
  const lat2 = toRadians(Number(b.lat));
  const h =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function haversineMeters(a, b) {
  const km = distanceKm(a, b);
  return Number.isFinite(km) ? km * 1000 : null;
}

function estimateWalkMinutesFromDistanceMeters(distanceMeters) {
  if (!Number.isFinite(distanceMeters)) return null;
  return Math.max(1, Math.round(distanceMeters / WALKING_SPEED_M_PER_MIN));
}

function getMaxWalkMinutesForRefinement(refinementInput) {
  const keys = normalizeRefinementKeys(refinementInput);
  return keys.includes('walk') ? LESS_WALKING_MAX_WALK_MINUTES : DEFAULT_MAX_WALK_MINUTES;
}

function normalizeCoords(coords) {
  if (!coords) return null;
  const point = {
    lat: Number(coords.lat),
    lng: Number(coords.lng),
  };
  return hasValidCoords(point) ? point : null;
}

function getCachedNearMeCoords() {
  return normalizeCoords(state.nearMeCoords || nearMeState.coords);
}

function hasActualNearMeRuntime(routeKey, runtimeContext = {}) {
  return (
    routeKey === 'near_me'
    && hasValidCoords(runtimeContext.center)
    && !runtimeContext.nearMeFallbackUsed
  );
}

function setNormalAreaRuntimeState(routeKey) {
  const areaConfig = AREA_FILTERS[routeKey] || AREA_FILTERS.hongdae_yeonnam;
  state.locationMode = 'area';
  state.effectiveAreaKey = routeKey;
  state.effectiveOrigin = areaConfig.center || null;
  state.nearMeFallbackUsed = false;
  state.nearMeFallbackAreaKey = '';
  state.nearMeError = '';
  return {
    center: areaConfig.center || null,
    effectiveAreaKey: routeKey,
    locationMode: 'area',
  };
}

function setNearMeRuntimeState(coords) {
  const normalized = normalizeCoords(coords);
  if (!normalized) return null;
  nearMeState.coords = normalized;
  nearMeState.error = null;
  state.locationMode = 'near_me';
  state.nearMeCoords = normalized;
  state.nearMeResolved = true;
  state.nearMeFallbackUsed = false;
  state.nearMeFallbackAreaKey = '';
  state.nearMeError = '';
  state.effectiveAreaKey = 'near_me';
  state.effectiveOrigin = normalized;
  return {
    center: normalized,
    effectiveAreaKey: 'near_me',
    locationMode: 'near_me',
    locationSource: 'browser_geolocation',
  };
}

function setNearMeFallbackRuntimeState(error = null) {
  const fallback = AREA_FILTERS[NEAR_ME_FALLBACK_AREA_KEY] || AREA_FILTERS.hongdae_yeonnam;
  nearMeState.error = error;
  state.locationMode = 'near_me';
  state.nearMeResolved = false;
  state.nearMeFallbackUsed = true;
  state.nearMeFallbackAreaKey = NEAR_ME_FALLBACK_AREA_KEY;
  state.nearMeError = NEAR_ME_FALLBACK_MESSAGE;
  state.effectiveAreaKey = NEAR_ME_FALLBACK_AREA_KEY;
  state.effectiveOrigin = fallback.center || null;
  return {
    center: fallback.center || null,
    effectiveAreaKey: NEAR_ME_FALLBACK_AREA_KEY,
    fallbackAreaKey: NEAR_ME_FALLBACK_AREA_KEY,
    locationMode: 'near_me',
    nearMeFallbackUsed: true,
    locationError: NEAR_ME_FALLBACK_MESSAGE,
    label: 'Default Seoul route',
    mapLabel: 'Location unavailable - Hongdae fallback route',
  };
}

function getCurrentBrowserLocation() {
  if (!navigator.geolocation) {
    return Promise.reject(new Error('Browser geolocation is unavailable.'));
  }

  updateRouteLoadingMessage('Finding nearby spots...');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });
}

async function getRouteRuntimeContext(routeKey) {
  if (routeKey !== 'near_me') return setNormalAreaRuntimeState(routeKey);

  const cachedCoords = getCachedNearMeCoords();
  if (cachedCoords) {
    return setNearMeRuntimeState(cachedCoords);
  }

  try {
    const coords = await getCurrentBrowserLocation();
    const runtimeContext = setNearMeRuntimeState(coords);
    console.log('Miro Near me location acquired locally.');
    return runtimeContext || setNearMeFallbackRuntimeState(new Error('Invalid browser coordinates.'));
  } catch (error) {
    nearMeState.coords = null;
    console.warn('Miro Near me geolocation failed; using explicit fallback.', error);
    return setNearMeFallbackRuntimeState(error);
  }
}

function classifyLegMobility(fromPlace, toPlace, maxWalkMinutes = DEFAULT_MAX_WALK_MINUTES) {
  const distanceMeters = haversineMeters(fromPlace, toPlace);
  const estimatedWalkMinutes = estimateWalkMinutesFromDistanceMeters(distanceMeters);

  if (estimatedWalkMinutes === null) {
    const fallbackMinutes = estimateWalkMinutes(fromPlace, toPlace);
    return {
      distanceMeters: null,
      estimatedWalkMinutes: fallbackMinutes,
      isWalkable: true,
      suggestedMode: 'walk',
      label: `Walk ~${fallbackMinutes} min`,
    };
  }

  if (estimatedWalkMinutes < maxWalkMinutes) {
    return {
      distanceMeters: Math.round(distanceMeters),
      estimatedWalkMinutes,
      isWalkable: true,
      suggestedMode: 'walk',
      label: `Walk ~${estimatedWalkMinutes} min`,
    };
  }

  return {
    distanceMeters: Math.round(distanceMeters),
    estimatedWalkMinutes,
    isWalkable: false,
    suggestedMode: 'transit_taxi_or_rental_car',
    label: `Use transit/taxi/rental car · walking would be ~${estimatedWalkMinutes} min`,
  };
}

function getMobilityScore(place, context) {
  if (!context.previousPlace) return 0;

  const maxWalkMinutes = context.maxWalkMinutes || DEFAULT_MAX_WALK_MINUTES;
  const mobility = classifyLegMobility(context.previousPlace, place, maxWalkMinutes);
  const walkMinutes = mobility.estimatedWalkMinutes;
  if (!Number.isFinite(walkMinutes)) return -2;

  if (mobility.isWalkable) {
    return Math.min(Math.max(maxWalkMinutes - walkMinutes, 0) * 0.7, 6);
  }

  const overageMinutes = walkMinutes - maxWalkMinutes;
  const walkRefined = (context.refinementKeys || []).includes('walk');
  const penaltyMultiplier = walkRefined ? 9 : 4.5;
  const longModePenalty = mobility.suggestedMode === 'transit_taxi_or_rental_car' ? 20 : 0;
  const maxPenalty = walkRefined ? 180 : 120;
  return -Math.min(overageMinutes * penaltyMultiplier + longModePenalty, maxPenalty);
}

function getMobilityAwareCandidatePool(candidates, exactMatches, context) {
  if (!context.previousPlace) return exactMatches.length ? exactMatches : candidates;

  const maxWalkMinutes = context.maxWalkMinutes || DEFAULT_MAX_WALK_MINUTES;
  const isWalkableCandidate = place => (
    classifyLegMobility(context.previousPlace, place, maxWalkMinutes).isWalkable
  );
  const walkableExactMatches = exactMatches.filter(isWalkableCandidate);
  if (walkableExactMatches.length) return walkableExactMatches;

  const walkableCandidates = candidates.filter(isWalkableCandidate);
  if (walkableCandidates.length) return walkableCandidates;

  return exactMatches.length ? exactMatches : candidates;
}

function isActualNearMeAreaConfig(areaConfig) {
  return (
    areaConfig?.routeKey === 'near_me'
    && hasValidCoords(areaConfig.center)
    && !areaConfig.nearMeFallbackUsed
  );
}

function sortPlacesByDistanceFromCenter(places, center) {
  if (!hasValidCoords(center)) return places.slice();
  return places.slice().sort((left, right) => (
    distanceKm(left, center) - distanceKm(right, center)
  ));
}

function expandNearMeCandidatePool(currentCandidates, usablePlaces, areaConfig, minimumCount, moodContext = null) {
  const current = sortPlacesByDistanceFromCenter(
    dedupeRuntimePlaces(currentCandidates),
    areaConfig.center
  );
  if (!isActualNearMeAreaConfig(areaConfig) || current.length >= minimumCount) return current;

  const nearestLimit = Math.max(
    minimumCount,
    Math.min(NEAR_ME_NEAREST_CANDIDATE_LIMIT, getTimeConfig(state.time).maxStops * 6)
  );
  const nearestMoodMatches = moodContext
    ? sortPlacesByDistanceFromCenter(
      usablePlaces.filter(place => placeMatchesMoodCandidate(place, moodContext)),
      areaConfig.center
    ).slice(0, nearestLimit)
    : [];
  const nearest = sortPlacesByDistanceFromCenter(usablePlaces, areaConfig.center).slice(0, nearestLimit);
  return sortPlacesByDistanceFromCenter(
    dedupeRuntimePlaces([...current, ...nearestMoodMatches, ...nearest]),
    areaConfig.center
  );
}

function getAreaCandidates(places, areaConfig, moodContext = null) {
  const usablePlaces = places.filter(place => place.name && hasValidCoords(place));
  if (!hasValidCoords(areaConfig.center) && !areaConfig.terms.length) return [];
  const addressMatches = usablePlaces.filter(place => addressMatchesArea(place, areaConfig));
  const nearbyMatches = usablePlaces.filter(place => (
    distanceKm(place, areaConfig.center) <= areaConfig.radiusKm
  ));
  const merged = dedupeRuntimePlaces([...addressMatches, ...nearbyMatches]);
  if (isActualNearMeAreaConfig(areaConfig)) {
    return expandNearMeCandidatePool(merged, usablePlaces, areaConfig, getTimeConfig(state.time).maxStops, moodContext);
  }
  return merged.length ? merged : usablePlaces;
}

function dedupeRuntimePlaces(places) {
  const byKey = new Map();
  places.forEach(place => {
    const key = getRuntimePlaceKey(place);
    if (!byKey.has(key)) byKey.set(key, place);
  });
  return Array.from(byKey.values());
}

function getRuntimePlaceKey(place) {
  if (place.placeId) return `place:${place.placeId}`;
  if (place.id) return `bookmark:${place.id}`;
  return `name-address:${place.name}|${place.address}`;
}

function sourceListMatchesMode(sourceList, mode) {
  const value = String(sourceList || '').toLowerCase();
  if (mode === 'food-focused') return value.includes('맛집') || value.includes('식당') || value.includes('food');
  if (mode === 'cafe-slow-walk') return value.includes('카페') || value.includes('커피') || value.includes('cafe') || value.includes('coffee');
  if (mode === 'night-energy') return value.includes('술') || value.includes('bar') || value.includes('night');
  if (mode === 'culture-local-streets') return value.includes('데이트') || value.includes('전시') || value.includes('문화');
  if (mode === 'shopping-browsing') return value.includes('쇼핑') || value.includes('shop');
  if (mode === 'do-something-fun') return value.includes('체험') || value.includes('activity');
  return false;
}

function adjustMiroRouteTemplateForStartTime(template, startTimeContext = getStartTimeContext()) {
  const slots = Array.isArray(template) ? template.slice() : [];
  if (!startTimeContext?.isMorning) return slots;

  return slots.map(category => (category === 'night' ? 'cafe' : category));
}

function getRouteTemplate(mode, refinementInput = null, routePreferences = null, startTimeContext = getStartTimeContext()) {
  if (routePreferences?.shapeSequence?.length) {
    const shapeTemplate = routePreferences.shapeSequence
      .map(category => PRIMARY_CATEGORY_TO_MIRO_CATEGORY[category])
      .filter(Boolean);
    if (shapeTemplate.length) return adjustMiroRouteTemplateForStartTime(shapeTemplate, startTimeContext);
  }
  const keys = normalizeRefinementKeys(refinementInput);
  const priorityOrder = ['cafe', 'walk', 'quiet', 'cheap', 'local'];
  const matchKey = priorityOrder.find(key => keys.includes(key));
  return adjustMiroRouteTemplateForStartTime(
    REFINEMENT_TEMPLATES[matchKey] || ROUTE_TEMPLATES[mode] || ROUTE_TEMPLATES.balanced,
    startTimeContext
  );
}

function getPlaceSearchText(place) {
  return [
    place.name,
    place.displayName,
    place.categoryName,
    place.categoryCode,
    place.primaryCategory,
    place.primaryCategoryLabel,
    place.subCategory,
    place.subCategoryLabel,
    place.address,
    place.sourceList,
    place.sourceFile,
    place.sourceType,
    ...(Array.isArray(place.tags) ? place.tags : []),
    ...(Array.isArray(place.routeRoles) ? place.routeRoles : []),
  ].filter(Boolean).join(' ').toLowerCase();
}

function textHasAnyTerm(text, terms) {
  return terms.some(term => text.includes(term));
}

function getOpenNowValue(place) {
  for (const path of OPEN_NOW_FIELD_PATHS) {
    let value = place;
    for (const key of path) {
      value = value && value[key];
    }
    if (typeof value === 'boolean') return value;
  }
  return null;
}

function hasOpenNowDataForCandidates(candidates) {
  return candidates.some(place => getOpenNowValue(place) !== null);
}

function filterCandidatesForRefinement(candidates, refinementInput) {
  const keys = normalizeRefinementKeys(refinementInput);
  if (!keys.includes('open')) return candidates;
  const candidateModule = getRecommendationModule('candidateGeneration');
  if (candidateModule?.filterCandidatesForOpenNow) {
    return candidateModule.filterCandidatesForOpenNow(candidates, keys, {
      fieldPaths: OPEN_NOW_FIELD_PATHS,
    }).candidates;
  }
  const withData = candidates.filter(place => getOpenNowValue(place) !== null);
  const dataCoverageFloor = Math.max(2, Math.floor(candidates.length * 0.3));
  if (withData.length < dataCoverageFloor) return candidates;
  const openCandidates = candidates.filter(place => getOpenNowValue(place) === true);
  if (openCandidates.length < 2) return candidates;
  return openCandidates;
}

function getValueAtPath(object, path) {
  return path.reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), object);
}

function parseScoreNumber(value) {
  if (value === undefined || value === null || String(value).trim() === '') return null;
  const parsed = Number(String(value).replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function readFirstNumericField(place, paths) {
  for (const path of paths) {
    const value = parseScoreNumber(getValueAtPath(place, path));
    if (value !== null) return value;
  }
  return null;
}

function readRatingSource(place, ratingPaths, reviewCountPaths) {
  const rating = readFirstNumericField(place, ratingPaths);
  const reviewCount = readFirstNumericField(place, reviewCountPaths);

  if (rating === null || rating < 0 || rating > 5) return null;
  if (reviewCount === null || reviewCount <= 0) return null;

  return { rating, reviewCount };
}

function computeFoodCafeCombinedRating(place) {
  if (!['eat', 'cafe'].includes(place.miroCategory)) return null;

  const kakao = readRatingSource(place, KAKAO_RATING_PATHS, KAKAO_REVIEW_COUNT_PATHS);
  const naver = readRatingSource(place, NAVER_RATING_PATHS, NAVER_REVIEW_COUNT_PATHS);

  if (kakao && naver) {
    const weightedKakaoCount = KAKAO_TRUST_WEIGHT * kakao.reviewCount;
    const denominator = weightedKakaoCount + naver.reviewCount;
    if (denominator <= 0) return null;

    return (
      weightedKakaoCount * kakao.rating +
      naver.reviewCount * naver.rating
    ) / denominator;
  }

  if (kakao) return kakao.rating;
  if (naver) return naver.rating;
  return null;
}

function getFoodCafeQualityScore(place) {
  const combinedRating = computeFoodCafeCombinedRating(place);
  if (combinedRating === null) return 0;
  return (combinedRating - 3) * 8;
}

function getRefinementScore(place, context) {
  const keys = context.refinementKeys || [];
  if (!keys.length) return 0;

  const category = place.miroCategory || 'unknown';
  const text = getPlaceSearchText(place);
  let score = 0;

  if (keys.includes('walk')) {
    const previousDistance = context.previousPlace ? distanceKm(place, context.previousPlace) : null;
    const centerDistance = distanceKm(place, context.areaConfig.center);
    if (Number.isFinite(previousDistance)) score -= Math.min(previousDistance * 35, 45);
    if (Number.isFinite(centerDistance)) score -= Math.min(centerDistance * 7, 28);
    if (['walk', 'cafe', 'eat'].includes(category)) score += 8;
  }

  if (keys.includes('local')) {
    if (textHasAnyTerm(text, LOCAL_TERMS)) score += 24;
    if (place.sourcePriority > 0) score += Math.min(Number(place.sourcePriority), 12);
    if (place.isMatched === true) score += 8;
    if (category !== 'night') score += 5;
  }

  if (keys.includes('cheap')) {
    if (['walk', 'cafe', 'see', 'shop', 'practical'].includes(category)) score += 18;
    if (textHasAnyTerm(text, BUDGET_CATEGORY_NAMES)) score += 20;
    if (['night', 'activity'].includes(category) || textHasAnyTerm(text, PREMIUM_CATEGORY_NAMES)) score -= 24;
  }

  if (keys.includes('cafe')) {
    if (category === 'cafe') score += 36;
    if (text.includes('카페') || text.includes('coffee') || text.includes('cafe')) score += 16;
  }

  if (keys.includes('quiet')) {
    if (['walk', 'cafe', 'see', 'shop'].includes(category)) score += 14;
    if (textHasAnyTerm(text, QUIET_TERMS)) score += 20;
    const quietPenaltyTouched = category === 'night' || textHasAnyTerm(text, TOURIST_HEAVY_TERMS);
    if (quietPenaltyTouched && !keys.includes('open')) score -= 28;
  }

  if (keys.includes('open')) {
    const openValue = getOpenNowValue(place);
    if (openValue === true) score += 8;
    else if (openValue === false) score -= 14;
  }

  score = Math.max(-180, Math.min(180, score));
  score -= getPreviousOverlapPenalty(place, context);
  return score;
}

function scorePlace(place, context) {
  let score = 0;
  const category = place.miroCategory || 'unknown';

  if (context.targetCategory && category === context.targetCategory) score += 30;
  score += getRoutePreferenceScore(place, context.routePreferences);
  if (addressMatchesArea(place, context.areaConfig)) score += 20;
  if (sourceListMatchesMode(place.sourceList, context.mode)) score += 15;
  if (place.available === true) score += 10;
  if (place.isMatched === true) score += 10;
  if (hasValidCoords(place)) score += 10;
  score += Number(place.sourcePriority || 0);

  if (place.available === false) score -= 20;
  if (category === 'unknown') score -= 10;

  const categoryCount = context.categoryCounts[category] || 0;
  if (context.mode !== 'food-focused' && categoryCount > 0) {
    score -= categoryCount * 12;
  }

  const distanceFromArea = distanceKm(place, context.areaConfig.center);
  if (Number.isFinite(distanceFromArea)) {
    score -= Math.min(distanceFromArea * 2, 18);
  }

  score += getRefinementScore(place, context);
  score += getFoodCafeQualityScore(place);
  score += getMobilityScore(place, context);
  score += getStartTimeCategoryScore(place, context.startTimeContext);

  return score;
}

function selectBestPlace(candidates, context, selectedKeys) {
  let best = null;
  let bestScore = -Infinity;

  candidates.forEach(place => {
    const key = getRuntimePlaceKey(place);
    if (selectedKeys.has(key)) return;
    const score = scorePlace(place, context);
    if (score > bestScore) {
      best = place;
      bestScore = score;
    }
  });

  return best;
}

function enforceLegacyRequiredCategory(selected, candidates, context, selectedKeys, categoryCounts, requiredCategories, maxStops) {
  if (hasRequiredPrimaryCategory(selected, requiredCategories)) return true;

  const requiredPlace = selectBestPlace(
    candidates.filter(place => placeMatchesRequiredPrimaryCategory(place, requiredCategories)),
    {
      ...context,
      targetCategory: null,
      previousPlace: selected[selected.length - 1] || null,
    },
    selectedKeys
  );

  if (!requiredPlace) return false;

  if (selected.length < maxStops) {
    selected.push(requiredPlace);
  } else {
    const replaceIndex = selected.findIndex(place => (
      !placeMatchesRequiredPrimaryCategory(place, requiredCategories)
    ));
    if (replaceIndex === -1) return false;

    const removed = selected[replaceIndex];
    selectedKeys.delete(getRuntimePlaceKey(removed));
    const removedCategory = removed.miroCategory || 'unknown';
    categoryCounts[removedCategory] = Math.max(0, (categoryCounts[removedCategory] || 0) - 1);
    selected[replaceIndex] = requiredPlace;
  }

  selectedKeys.add(getRuntimePlaceKey(requiredPlace));
  const category = requiredPlace.miroCategory || 'unknown';
  categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  return true;
}

function enforceLegacyPinnedPreferences(
  selected,
  candidates,
  context,
  selectedKeys,
  categoryCounts,
  routePreferences,
  protectedCategories = [],
  maxStops = 4
) {
  if (!routePreferences?.pinCategoryGroups?.length) return;

  const protectedSet = new Set(protectedCategories);

  routePreferences.pinCategoryGroups.forEach(group => {
    if (hasAnyPrimaryCategory(selected, group.categories)) {
      group.categories.forEach(category => protectedSet.add(category));
      return;
    }

    const pinnedPlace = selectBestPlace(
      candidates.filter(place => placeMatchesAnyPrimaryCategory(place, group.categories)),
      {
        ...context,
        routePreferences,
        targetCategory: null,
        previousPlace: selected[selected.length - 1] || null,
      },
      selectedKeys
    );

    if (!pinnedPlace) return;

    if (selected.length < maxStops) {
      selected.push(pinnedPlace);
    } else {
      const replaceIndex = findPreferenceReplacementIndex(selected, protectedSet, group.categories);
      if (replaceIndex === -1) return;

      const removed = selected[replaceIndex];
      selectedKeys.delete(getRuntimePlaceKey(removed));
      const removedCategory = removed.miroCategory || 'unknown';
      categoryCounts[removedCategory] = Math.max(0, (categoryCounts[removedCategory] || 0) - 1);
      selected[replaceIndex] = pinnedPlace;
    }

    selectedKeys.add(getRuntimePlaceKey(pinnedPlace));
    const category = pinnedPlace.miroCategory || 'unknown';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    group.categories.forEach(categoryKey => protectedSet.add(categoryKey));
  });
}

function adjustPrimaryCategorySequenceForStartTime(sequence, startTimeContext = getStartTimeContext()) {
  const slots = Array.isArray(sequence) ? sequence.slice() : [];
  if (!startTimeContext?.isMorning) return slots;

  return slots.map((category, index) => {
    if (category !== 'bar') return category;
    if (!slots.includes('cafe')) return 'cafe';
    if (!slots.includes('dessert_bakery')) return 'dessert_bakery';
    return index === 0 ? 'cafe' : 'walk_nature';
  });
}

function getStartTimeCategoryScore(place, startTimeContext = getStartTimeContext()) {
  const primaryCategory = getPlacePrimaryCategory(place);
  const miroCategory = String(place.miroCategory || '').trim();
  const category = primaryCategory || MIRO_CATEGORY_TO_PRIMARY_CATEGORY[miroCategory] || '';
  const text = getPlaceSearchText(place);
  let score = 0;

  if (startTimeContext?.isMorning) {
    if (['cafe', 'dessert_bakery', 'walk_nature', 'landmark_view', 'shopping', 'activity', 'rest'].includes(category)) score += 14;
    if (category === 'meal' && textHasAnyTerm(text, ['breakfast', 'brunch', '브런치', 'breakfast'])) score += 10;
    if (category === 'bar' || miroCategory === 'night') score -= 120;
    if (textHasAnyTerm(text, START_TIME_TEXT_TERMS.nightTerms)) score -= 30;
    if (textHasAnyTerm(text, START_TIME_TEXT_TERMS.morningPositive)) score += 10;
    return score;
  }

  if (startTimeContext?.isAfternoon) {
    if (['meal', 'cafe', 'dessert_bakery', 'shopping', 'activity', 'walk_nature', 'landmark_view'].includes(category)) score += 4;
    if (category === 'bar' || miroCategory === 'night') score -= 10;
    if (textHasAnyTerm(text, START_TIME_TEXT_TERMS.nightTerms)) score -= 6;
    return score;
  }

  if (startTimeContext?.isEvening) {
    if (['meal', 'dessert_bakery', 'bar', 'landmark_view', 'cafe'].includes(category)) score += 10;
    if (category === 'walk_nature') score += 2;
    if (startTimeContext.isLate && ['shopping', 'activity', 'walk_nature'].includes(category)) score -= 8;
  }

  return score;
}

function getRouteCategorySequence(moodContext, timeConfig, routePreferences = null, startTimeContext = getStartTimeContext()) {
  const templateModule = getRecommendationModule('routeTemplates');
  if (templateModule?.getRouteCategorySequence) {
    return templateModule.getRouteCategorySequence({
      moodContext,
      timeConfig,
      routePreferences,
      startTimeContext,
    });
  }

  if (routePreferences?.shapeSequence?.length) {
    return adjustPrimaryCategorySequenceForStartTime(
      routePreferences.shapeSequence.slice(0, timeConfig.maxStops),
      startTimeContext
    );
  }

  const primaryMood = moodContext.compositionKeys[0] || 'local_food';
  const template = MOOD_CATEGORY_SEQUENCES[primaryMood]?.[timeConfig.key]
    || MOOD_CATEGORY_SEQUENCES.local_food[timeConfig.key]
    || ['meal', 'cafe'];
  return adjustPrimaryCategorySequenceForStartTime(template.slice(0, timeConfig.maxStops), startTimeContext);
}

function deriveRefinedCategorySequence(baseSequence, refinementInput, moodContext, routePreferences = null) {
  const templateModule = getRecommendationModule('routeTemplates');
  if (templateModule?.deriveRefinedCategorySequence) {
    return templateModule.deriveRefinedCategorySequence({
      baseSequence,
      refinements: refinementInput,
      moodContext,
      routePreferences,
    });
  }

  const keys = normalizeRefinementKeys(refinementInput);
  if (!keys.length || routePreferences?.shapeSequence?.length) return baseSequence;
  if (!Array.isArray(baseSequence) || !baseSequence.length) return baseSequence;

  const required = new Set((moodContext?.compositionKeys || []).flatMap(
    moodKey => MOOD_REQUIRED_PRIMARY_CATEGORIES[moodKey] || []
  ));
  const slots = baseSequence.slice();

  const tryReplace = (replaceWith, predicate) => {
    for (let index = slots.length - 1; index >= 0; index -= 1) {
      const current = slots[index];
      if (current === replaceWith) return false;
      if (required.has(current)) continue;
      if (!predicate(current)) continue;
      slots[index] = replaceWith;
      return true;
    }
    return false;
  };

  if (keys.includes('cafe')) {
    const cafeCount = slots.filter(c => c === 'cafe' || c === 'dessert_bakery').length;
    if (cafeCount === 0) {
      tryReplace('cafe', c => ['shopping', 'walk_nature', 'landmark_view', 'activity'].includes(c)) ||
        tryReplace('cafe', () => true);
    } else if (cafeCount === 1 && slots.length >= 3) {
      tryReplace('cafe', c => ['shopping', 'walk_nature', 'landmark_view', 'activity'].includes(c));
    }
  }

  if (keys.includes('quiet')) {
    tryReplace('walk_nature', c => c === 'bar');
    if (!slots.includes('walk_nature') && !slots.includes('landmark_view')) {
      tryReplace('walk_nature', c => ['shopping', 'activity'].includes(c));
    }
  }

  if (keys.includes('cheap')) {
    tryReplace('cafe', c => c === 'bar');
    tryReplace('walk_nature', c => c === 'activity');
  }

  if (keys.includes('walk') && slots.length > 2) {
    return slots.slice(0, slots.length - 1);
  }

  return slots;
}

function getPlaceStayMinutes(place) {
  const stay = place.estimatedStayMin;
  if (stay && Number.isFinite(Number(stay.min)) && Number.isFinite(Number(stay.max))) {
    return Math.round((Number(stay.min) + Number(stay.max)) / 2);
  }
  return CATEGORY_STAY_MINUTES[place.miroCategory] || CATEGORY_STAY_MINUTES.unknown;
}

function getPlaceDistanceM(place, center) {
  const km = distanceKm(place, center);
  return Number.isFinite(km) ? km * 1000 : Infinity;
}

function getSelectedRouteEstimate(places) {
  return places.reduce((estimate, place, index) => {
    const stay = getPlaceStayMinutes(place);
    const previousPlace = places[index - 1];
    const mobility = previousPlace
      ? classifyLegMobility(previousPlace, place, DEFAULT_MAX_WALK_MINUTES)
      : null;
    const travel = mobility && Number.isFinite(mobility.estimatedWalkMinutes)
      ? mobility.estimatedWalkMinutes
      : 0;

    return {
      stay: estimate.stay + stay,
      travel: estimate.travel + travel,
      total: estimate.total + stay + travel,
    };
  }, { stay: 0, travel: 0, total: 0 });
}

function getProjectedRouteEstimate(place, context) {
  const selectedEstimate = context.selectedEstimate || { stay: 0, travel: 0, total: 0 };
  const mobility = context.previousPlace
    ? classifyLegMobility(context.previousPlace, place, DEFAULT_MAX_WALK_MINUTES)
    : null;
  const travel = mobility && Number.isFinite(mobility.estimatedWalkMinutes)
    ? mobility.estimatedWalkMinutes
    : 0;
  const stay = getPlaceStayMinutes(place);

  return {
    stay: selectedEstimate.stay + stay,
    travel: selectedEstimate.travel + travel,
    total: selectedEstimate.total + stay + travel,
  };
}

function getDurationSoftCapMin(timeConfig) {
  const capsByTime = {
    time_30_60: 75,
    time_1_2: 150,
    time_2_3: 210,
    time_4_6: 390,
  };
  return capsByTime[timeConfig?.key] || Number(timeConfig?.targetMin) || Infinity;
}

function getTimeWindowBounds(timeConfig = getTimeConfig()) {
  const boundsByTime = {
    time_30_60: { min: 30, max: 60 },
    time_1_2: { min: 60, max: 120 },
    time_2_3: { min: 120, max: 180 },
    time_4_6: { min: 240, max: 360 },
  };
  return boundsByTime[timeConfig?.key] || {
    min: 0,
    max: Number(timeConfig?.targetMin) || Infinity,
  };
}

function getStopMinimumStayMinutes(stop) {
  const category = getPlacePrimaryCategory(stop?.place || stop);
  if (category === 'meal') return 35;
  if (category === 'bar') return 30;
  if (category === 'cafe' || category === 'dessert_bakery') return 25;
  if (category === 'activity') return 30;
  return 20;
}

function applySuggestedStayPace(stops, timeConfig = getTimeConfig()) {
  const routeStops = Array.isArray(stops) ? stops : [];
  const travelMinutes = routeStops.reduce((sum, stop) => sum + Number(stop.walk || 0), 0);
  const walkingMinutes = routeStops.reduce((sum, stop) => (
    stop.legSuggestedMode === 'walk' ? sum + Number(stop.walk || 0) : sum
  ), 0);
  const rawStayMinutes = routeStops.reduce((sum, stop) => sum + Number(stop.stay || 0), 0);
  const rawTotalMinutes = rawStayMinutes + travelMinutes;
  const bounds = getTimeWindowBounds(timeConfig);
  const maxWindowMinutes = Number(bounds.max);
  const canFitToWindow = Number.isFinite(maxWindowMinutes) && rawTotalMinutes > maxWindowMinutes && routeStops.length > 0;

  if (!canFitToWindow) {
    routeStops.forEach(stop => {
      stop.displayStay = Number(stop.stay || 0);
    });
    return {
      rawTotalMinutes,
      displayTotalMinutes: rawTotalMinutes,
      walkingMinutes,
      adjusted: false,
      note: '',
      totalLabel: 'total',
    };
  }

  const minimumStayTotal = routeStops.reduce((sum, stop) => sum + getStopMinimumStayMinutes(stop), 0);
  const targetStayTotal = Math.max(minimumStayTotal, maxWindowMinutes - travelMinutes);
  const scale = rawStayMinutes > 0 ? Math.min(1, targetStayTotal / rawStayMinutes) : 1;
  let assignedStayTotal = 0;

  routeStops.forEach((stop, index) => {
    const minimumStay = getStopMinimumStayMinutes(stop);
    const isLastStop = index === routeStops.length - 1;
    const scaledStay = Math.round(Number(stop.stay || 0) * scale);
    const displayStay = isLastStop
      ? Math.max(minimumStay, targetStayTotal - assignedStayTotal)
      : Math.max(minimumStay, scaledStay);
    stop.displayStay = displayStay;
    assignedStayTotal += displayStay;
  });

  if (assignedStayTotal + travelMinutes > maxWindowMinutes) {
    let overage = assignedStayTotal + travelMinutes - maxWindowMinutes;
    for (let index = routeStops.length - 1; index >= 0 && overage > 0; index -= 1) {
      const stop = routeStops[index];
      const reducible = Math.max(0, Number(stop.displayStay || 0) - getStopMinimumStayMinutes(stop));
      const reduction = Math.min(reducible, overage);
      stop.displayStay -= reduction;
      assignedStayTotal -= reduction;
      overage -= reduction;
    }
  }

  const displayTotalMinutes = assignedStayTotal + travelMinutes;
  const finalOverMax = Number.isFinite(maxWindowMinutes) && displayTotalMinutes > maxWindowMinutes;
  return {
    rawTotalMinutes,
    displayTotalMinutes,
    walkingMinutes,
    adjusted: displayTotalMinutes < rawTotalMinutes,
    note: finalOverMax
      ? `This is the closest realistic pace for your ${timeConfig.label} window; shorten one stop if you need to finish faster.`
      : `Suggested pace keeps this within your ${timeConfig.label} window.`,
    totalLabel: 'suggested total',
  };
}

function getRouteStructureLabel(stopCount) {
  const labels = {
    0: 'empty route',
    1: 'one-stop route',
    2: 'two-stop route',
    3: 'three-stop route',
    4: 'four-stop route',
    5: 'five-stop route',
  };
  return labels[stopCount] || `${stopCount}-stop route`;
}

function getStopPrimaryCategoryLabel(stop) {
  const place = stop?.place || {};
  const primaryCategory = getPlacePrimaryCategory(place);
  if (primaryCategory === 'meal') return 'food';
  if (primaryCategory === 'cafe') return 'cafe';
  if (primaryCategory === 'dessert_bakery') return 'dessert';
  if (primaryCategory === 'bar') return 'drinks';
  if (primaryCategory === 'shopping') return 'shopping';
  if (primaryCategory === 'activity') return 'activity';
  if (primaryCategory === 'walk_nature') return 'walk';
  if (primaryCategory === 'landmark_view') return 'view';
  return place.primaryCategoryLabel || MIRO_CATEGORY_LABELS[place.miroCategory] || 'local stop';
}

function getRouteCategoryPhrase(stops) {
  const labels = uniqueStrings((Array.isArray(stops) ? stops : [])
    .map(getStopPrimaryCategoryLabel)
    .filter(Boolean));
  if (!labels.length) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

function buildRouteWhyCopy(areaLabel, timeConfig, moodContext, stops, timing, refinementInput = null) {
  const stopCount = Array.isArray(stops) ? stops.length : 0;
  const structure = getRouteStructureLabel(stopCount);
  const categories = getRouteCategoryPhrase(stops);
  const moodLabel = moodContext?.labels?.join(' + ') || state.mood;
  const pieces = [
    `A ${structure} picked for walkability, local feel, and ${moodLabel} near ${areaLabel}.`,
  ];

  if (categories) {
    pieces.push(`It connects ${categories} stops that are close enough to follow without turning this into a top-ten list.`);
  } else {
    pieces.push('It keeps the route realistic, local, and easy to follow.');
  }

  if (timing?.adjusted) {
    pieces.push(timing.note);
  } else {
    pieces.push(`Built around your ${timeConfig.label} window.`);
  }
  const startTimeCopy = getStartTimeRouteCopy();
  if (startTimeCopy) pieces.push(startTimeCopy);

  const refinementLabels = getRefinementLabels(refinementInput);
  if (refinementLabels.length) {
    pieces.push(`Tuned for: ${refinementLabels.join(' · ')}.`);
  }

  return pieces.join(' ');
}

function buildRouteWhyItems(route = currentRoute) {
  const stops = Array.isArray(route?.stops) ? route.stops : [];
  const items = [];
  if (route?.meta?.timeNote) {
    items.push(route.meta.timeNote);
  } else {
    items.push('Fits your selected time window');
  }
  const startTimeCopy = getStartTimeRouteCopy();
  if (startTimeCopy) items.push(startTimeCopy);
  items.push(stops.length > 1 ? 'Keeps stops close enough to follow' : 'Keeps the stop easy to reach');
  items.push('Chosen for your area and mood');

  const categories = getRouteCategoryPhrase(stops);
  if (categories) {
    items.push(`${getRouteStructureLabel(stops.length)} with ${categories}`);
  } else {
    items.push(getRouteStructureLabel(stops.length));
  }

  return uniqueStrings(items);
}

function hasInternalRouteLanguage(value) {
  return /\b(dataset|prototype|mock|fallback|algorithm)\b|generated from/i.test(String(value || ''));
}

function getUserFacingSourceLabel(label) {
  return hasInternalRouteLanguage(label) || /real naver/i.test(String(label || ''))
    ? 'Walkable route'
    : (label || 'Walkable route');
}

function getStopDisplayStay(stop) {
  const minutes = Number(stop?.displayStay ?? stop?.stay);
  return Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes) : 0;
}

function prepareRouteForDisplay(route) {
  if (!route || typeof route !== 'object') return route;

  const timeConfig = getTimeConfig(state.time);
  const areaLabel = route.label || getAreaConfig(getRouteKey(state.area)).label;
  const mapLabel = route.mapLabel || areaLabel;
  const stops = Array.isArray(route.stops)
    ? route.stops.map((stop, index) => ({ ...stop, num: index + 1 }))
    : [];
  const timing = applySuggestedStayPace(stops, timeConfig);
  const distanceMeters = stops.reduce((sum, stop) => sum + Number(stop.legDistanceMeters || 0), 0);
  const existingMeta = route.meta || {};
  const moodContext = getMoodContext(route.defaultMood || state.mood);
  const safeWhy = route.why && !hasInternalRouteLanguage(route.why)
    ? appendStartTimeContext(route.why)
    : buildRouteWhyCopy(areaLabel, timeConfig, moodContext, stops, timing, route.refinementKeys);
  const startTimeCopy = getStartTimeRouteCopy();
  const defaultAsk = {
    why: `This ${getRouteStructureLabel(stops.length)} is tuned for ${areaLabel}, ${timeConfig.label}, and your selected mood.${startTimeCopy ? ` ${startTimeCopy}` : ''}`,
    crowd: 'I do not check live crowd levels yet, but this route keeps the stops close together so you can adjust on the fly.',
    cafe: 'I can lean the route toward cafe and dessert stops when nearby options fit your area and time.',
  };
  const ask = { ...defaultAsk, ...(route.ask || {}) };
  Object.keys(ask).forEach(key => {
    if (hasInternalRouteLanguage(ask[key])) ask[key] = defaultAsk[key] || defaultAsk.why;
  });
  if (startTimeCopy && ask.why && !/Planned for an? .* start\.|Planned around .*\./i.test(ask.why)) {
    ask.why = `${ask.why} ${startTimeCopy}`;
  }

  return {
    ...route,
    label: areaLabel,
    mapLabel,
    sourceLabel: getUserFacingSourceLabel(route.sourceLabel),
    meta: {
      ...existingMeta,
      total: formatMinutes(timing.displayTotalMinutes),
      walking: `${timing.walkingMinutes} min`,
      distance: existingMeta.distance || (distanceMeters > 0 ? formatDistanceMeters(distanceMeters) : ''),
      totalLabel: timing.totalLabel || 'total',
      timeNote: timing.adjusted
        ? timing.note
        : (existingMeta.timeNote && !hasInternalRouteLanguage(existingMeta.timeNote) ? existingMeta.timeNote : ''),
    },
    why: safeWhy,
    ask,
    stops,
  };
}

function getDurationFitScore(place, context) {
  const targetMin = Number(context.timeConfig?.targetMin);
  if (!Number.isFinite(targetMin) || targetMin <= 0) return 0;

  const projected = getProjectedRouteEstimate(place, context);
  const capMin = getDurationSoftCapMin(context.timeConfig);
  const stay = getPlaceStayMinutes(place);
  const idealStay = Math.max(20, targetMin / Math.max(Number(context.timeConfig?.maxStops) || 1, 1));
  let score = 0;

  if (stay <= idealStay + 10) {
    score += 4;
  } else {
    score -= Math.min((stay - idealStay - 10) * 0.25, 12);
  }

  const overage = projected.total - targetMin;
  if (overage > 0) {
    const multiplier = targetMin <= 60 ? 0.65 : targetMin <= 120 ? 0.45 : 0.22;
    score -= Math.min(overage * multiplier, targetMin <= 60 ? 35 : 50);
  } else {
    score += Math.min(Math.abs(overage) / 20, 4);
  }

  const capOverage = projected.total - capMin;
  if (capOverage > 0) {
    const capMultiplier = targetMin <= 60 ? 1.6 : targetMin <= 120 ? 1.2 : targetMin <= 180 ? 0.85 : 0.45;
    score -= Math.min(capOverage * capMultiplier, targetMin <= 60 ? 80 : 110);
  } else {
    score += Math.min((capMin - projected.total) / 30, 5);
  }

  return score;
}

function getBacktrackingPenalty(place, context) {
  const selectedPlaces = Array.isArray(context.selectedPlaces) ? context.selectedPlaces : [];
  if (selectedPlaces.length < 2 || !context.previousPlace) return 0;

  const previousLegMeters = haversineMeters(context.previousPlace, place);
  if (!Number.isFinite(previousLegMeters) || previousLegMeters < 600) return 0;

  const revisitsEarlierCluster = selectedPlaces.slice(0, -1).some(selectedPlace => {
    const distanceToEarlierStop = haversineMeters(selectedPlace, place);
    return Number.isFinite(distanceToEarlierStop) && distanceToEarlierStop < 300;
  });

  return revisitsEarlierCluster ? 10 : 0;
}

function getDataDrivenRefinementScore(place, context, distanceM) {
  const keys = context.refinementKeys || [];
  if (!keys.length) return 0;

  const primaryCategory = place.primaryCategory || getPlacePrimaryCategory(place);
  const text = getPlaceSearchText(place);
  const moodRequiresNight = context.moodContext.compositionKeys.includes('drinks_night');
  const radiusM = getAreaRadiusM(context.areaConfig);
  let score = 0;

  if (keys.includes('walk')) {
    if (Number.isFinite(distanceM)) {
      score += Math.max(0, 12 * (1 - Math.min(distanceM, radiusM) / radiusM));
    }
    if (context.previousPlace) {
      const mobility = classifyLegMobility(context.previousPlace, place, LESS_WALKING_MAX_WALK_MINUTES);
      const legMeters = Number(mobility.distanceMeters);
      if (mobility.isWalkable) score += Math.max(0, 10 - mobility.estimatedWalkMinutes);
      else score -= 30;
      if (Number.isFinite(legMeters)) score -= Math.min(legMeters / 100, 24);
    }
    if (['walk_nature', 'rest', 'cafe', 'meal'].includes(primaryCategory)) score += 6;
  }

  if (keys.includes('local')) {
    if (textHasAnyTerm(text, LOCAL_TERMS)) score += 22;
    if (text.includes('main_stop') || text.includes('sub_stop')) score += 5;
    if (Number(place.sourcePriority) > 0) score += Math.min(Number(place.sourcePriority), 10);
    if (place.isMatched === true) score += 5;
    if (!['bar', 'rest'].includes(primaryCategory)) score += 3;
  }

  if (keys.includes('cheap')) {
    if (['meal', 'cafe', 'dessert_bakery', 'walk_nature', 'rest'].includes(primaryCategory)) score += 10;
    if (textHasAnyTerm(text, BUDGET_CATEGORY_NAMES)) score += 18;
    if (['bar', 'activity'].includes(primaryCategory) || textHasAnyTerm(text, PREMIUM_CATEGORY_NAMES)) score -= 18;
  }

  if (keys.includes('cafe')) {
    if (primaryCategory === 'cafe') score += 34;
    if (primaryCategory === 'dessert_bakery') score += 28;
    if (textHasAnyTerm(text, CAFE_REFINEMENT_TERMS)) score += 14;
  }

  if (keys.includes('quiet')) {
    if (['walk_nature', 'rest'].includes(primaryCategory)) score += 24;
    if (['cafe', 'landmark_view'].includes(primaryCategory)) score += 12;
    if (textHasAnyTerm(text, QUIET_TERMS)) score += 18;
    if (!moodRequiresNight && primaryCategory === 'bar') score -= 26;
    if (textHasAnyTerm(text, TOURIST_HEAVY_TERMS)) score -= 20;
  }

  if (keys.includes('open')) {
    const openValue = getOpenNowValue(place);
    if (openValue === true) score += 8;
    else if (openValue === false) score -= 14;
  }

  score = Math.max(-180, Math.min(180, score));
  score -= getPreviousOverlapPenalty(place, context);
  return score;
}

function getDataDrivenSelectionContext(baseContext, selected, stopIndex, isFinalStop) {
  return {
    ...baseContext,
    stopIndex,
    isFinalStop,
    previousPlace: selected[selected.length - 1] || null,
    selectedPlaces: selected,
    selectedEstimate: getSelectedRouteEstimate(selected),
  };
}

function getUxSafeMinimumStopCount(timeConfig, candidateCount = Infinity) {
  const desiredStopsByTime = {
    time_30_60: 1,
    time_1_2: 2,
    time_2_3: 3,
    time_4_6: 4,
  };
  const desiredStops = desiredStopsByTime[timeConfig.key] || timeConfig.minStops;
  const candidateLimit = Number.isFinite(candidateCount)
    ? Math.max(0, Number(candidateCount))
    : timeConfig.maxStops;

  return Math.min(
    Math.max(timeConfig.minStops, desiredStops),
    timeConfig.maxStops,
    candidateLimit
  );
}

function shouldStopDataDrivenSelection(selected, timeConfig, routePreferences, uxMinStops = timeConfig.minStops) {
  if (routePreferences?.shapeSequence?.length) return false;
  if (selected.length < uxMinStops) return false;
  if (timeConfig.key === 'time_4_6') return false;

  const estimate = getSelectedRouteEstimate(selected);
  return estimate.total >= Math.min(timeConfig.targetMin * 0.9, getDurationSoftCapMin(timeConfig));
}

function syncDataDrivenSelectionState(selected, selectedKeys, categoryCounts) {
  selectedKeys.clear();
  Object.keys(categoryCounts).forEach(key => {
    delete categoryCounts[key];
  });

  selected.forEach(place => {
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.primaryCategory] = (categoryCounts[place.primaryCategory] || 0) + 1;
  });
}

function canRemoveDataDrivenPlace(selected, index, requiredCategories, routePreferences) {
  const place = selected[index];
  const primaryCategory = getPlacePrimaryCategory(place);
  if (routePreferences?.pinCategories?.includes(primaryCategory)) return false;

  const remaining = selected.filter((_, placeIndex) => placeIndex !== index);
  return hasRequiredPrimaryCategory(remaining, requiredCategories);
}

function trimDataDrivenRouteToDurationCap(selected, timeConfig, requiredCategories, routePreferences, selectedKeys, categoryCounts) {
  if (routePreferences?.shapeSequence?.length) return;

  const capMin = getDurationSoftCapMin(timeConfig);
  if (!Number.isFinite(capMin)) return;

  while (selected.length > 1 && getSelectedRouteEstimate(selected).total > capMin) {
    let bestIndex = -1;
    let bestTotal = Infinity;

    selected.forEach((place, index) => {
      if (!canRemoveDataDrivenPlace(selected, index, requiredCategories, routePreferences)) return;

      const remaining = selected.filter((_, placeIndex) => placeIndex !== index);
      const total = getSelectedRouteEstimate(remaining).total;
      if (total < bestTotal) {
        bestTotal = total;
        bestIndex = index;
      }
    });

    if (bestIndex === -1) break;
    selected.splice(bestIndex, 1);
    syncDataDrivenSelectionState(selected, selectedKeys, categoryCounts);
  }
}

function debugRouteRecommendation(event, details = {}) {
  if (!ROUTE_DEBUG_ENABLED || typeof console.debug !== 'function') return;
  console.debug(`[Kandid Spot route] ${event}`, details);
}

function getDataDrivenCandidates(places, areaConfig, timeConfig, moodContext = null) {
  const candidateModule = getRecommendationModule('candidateGeneration');
  if (candidateModule?.generateDataDrivenCandidates) {
    return candidateModule.generateDataDrivenCandidates(places, {
      areaConfig,
      timeConfig,
      moodContext,
      nearestCandidateLimit: NEAR_ME_NEAREST_CANDIDATE_LIMIT,
      getRuntimePlaceKey,
      placeMatchesMoodCandidate,
    }).candidates;
  }

  const usablePlaces = places.filter(place => (
    place.name
    && hasValidCoords(place)
    && place.available !== false
    && place.primaryCategory
  ));
  const radiusM = getAreaRadiusM(areaConfig);
  const withDistance = usablePlaces.map(place => ({
    place,
    distanceM: getPlaceDistanceM(place, areaConfig.center),
  }));
  const minimumCandidateCount = isActualNearMeAreaConfig(areaConfig)
    ? Math.max(timeConfig.minStops, timeConfig.maxStops)
    : timeConfig.minStops;
  let matches = withDistance.filter(item => item.distanceM <= radiusM);

  const expansionMultipliers = isActualNearMeAreaConfig(areaConfig)
    ? [1.5, 2.5, 4, 8]
    : [1.5];

  for (const multiplier of expansionMultipliers) {
    if (matches.length >= minimumCandidateCount) break;
    matches = withDistance.filter(item => item.distanceM <= radiusM * multiplier);
  }

  if (isActualNearMeAreaConfig(areaConfig) && moodContext) {
    const nearestMoodLimit = Math.max(
      minimumCandidateCount,
      Math.min(NEAR_ME_NEAREST_CANDIDATE_LIMIT, timeConfig.maxStops * 6)
    );
    const byKey = new Map();
    const nearestMoodMatches = withDistance
      .filter(item => placeMatchesMoodCandidate(item.place, moodContext))
      .sort((left, right) => left.distanceM - right.distanceM)
      .slice(0, nearestMoodLimit);

    [...nearestMoodMatches, ...matches].forEach(item => {
      const key = getRuntimePlaceKey(item.place);
      if (!byKey.has(key)) byKey.set(key, item);
    });
    matches = Array.from(byKey.values()).sort((left, right) => left.distanceM - right.distanceM);
  }

  if (isActualNearMeAreaConfig(areaConfig) && matches.length < minimumCandidateCount) {
    const nearestLimit = Math.max(
      minimumCandidateCount,
      Math.min(NEAR_ME_NEAREST_CANDIDATE_LIMIT, timeConfig.maxStops * 6)
    );
    matches = withDistance
      .filter(item => Number.isFinite(item.distanceM))
      .sort((left, right) => left.distanceM - right.distanceM)
      .slice(0, nearestLimit);
  }

  return matches
    .map(item => ({ ...item.place, __distanceM: item.distanceM }))
    .sort((left, right) => left.__distanceM - right.__distanceM);
}

function scoreDataDrivenPlace(place, context) {
  const scoreModule = getRecommendationModule('scorePlace');
  if (scoreModule?.scorePlace) {
    return scoreModule.scorePlace(place, context, {
      getAreaRadiusM,
      getPlaceDistanceM,
      getRoutePreferenceScore,
      getPlaceStayMinutes,
      classifyLegMobility,
      getDurationFitScore,
      getStartTimeCategoryScore,
      getBacktrackingPenalty,
      getPreviousOverlapPenalty,
      getOpenNowValue,
      getPlaceSearchText,
    }).score;
  }

  if (!hasValidCoords(place) || place.available === false) return -Infinity;

  const distanceM = Number(place.__distanceM ?? getPlaceDistanceM(place, context.areaConfig.center));
  const radiusM = getAreaRadiusM(context.areaConfig);
  let score = 0;

  if (distanceM <= radiusM) score += 25;
  if (Number.isFinite(distanceM)) {
    score += Math.max(0, 10 * (1 - Math.min(distanceM, radiusM) / radiusM));
  }

  if (context.moodContext.primaryPreferred.includes(place.primaryCategory)) score += 35;
  if (context.moodContext.secondaryPreferred.includes(place.primaryCategory)) score += 15;
  if (context.targetCategory && place.primaryCategory === context.targetCategory) score += 22;
  score += getRoutePreferenceScore(place, context.routePreferences);

  const tags = Array.isArray(place.tags) ? place.tags : [];
  const matchedTags = tags.filter(tag => context.moodContext.tagsPreferred.includes(tag));
  score += Math.min(matchedTags.length * 5, 20);

  const routeRoles = Array.isArray(place.routeRoles) ? place.routeRoles : [];
  if (context.stopIndex === 0 && routeRoles.includes('main_stop')) score += 5;
  if (context.stopIndex > 0 && routeRoles.includes('sub_stop')) score += 5;
  if (context.isFinalStop && routeRoles.includes('finale')) score += 5;
  if (routeRoles.includes('filler') && context.timeConfig.maxStops > 2) score += 3;

  const stay = getPlaceStayMinutes(place);
  if (stay <= Math.max(context.timeConfig.targetMin, 45)) score += 5;

  if (place.available === true) score += 5;
  if (place.isMatched === true) score += 3;
  if (place.subCategory) score += 3;
  if (place.address) score += 2;

  const selectedPrimaryCount = context.categoryCounts[place.primaryCategory] || 0;
  const repeatAllowed = context.moodContext.compositionKeys.some(key => (
    key === 'cafes_dessert' || key === 'drinks_night'
  ));
  if (selectedPrimaryCount > 0 && !repeatAllowed) score -= selectedPrimaryCount * 30;

  if (context.previousPlace) {
    const walkRefined = (context.refinementKeys || []).includes('walk');
    const maxWalkMinutes = walkRefined ? LESS_WALKING_MAX_WALK_MINUTES : DEFAULT_MAX_WALK_MINUTES;
    const mobility = classifyLegMobility(context.previousPlace, place, maxWalkMinutes);
    const legMeters = Number(mobility.distanceMeters);
    if (mobility.isWalkable) {
      score += Math.max(0, 12 - mobility.estimatedWalkMinutes * 0.5);
    } else {
      score -= walkRefined ? 42 : 24;
    }
    if (Number.isFinite(legMeters)) {
      score -= Math.min(legMeters / 350, walkRefined ? 16 : 10);
    }
  }

  score += getDataDrivenRefinementScore(place, context, distanceM);
  score += getDurationFitScore(place, context);
  score += getStartTimeCategoryScore(place, context.startTimeContext);
  score -= getBacktrackingPenalty(place, context);

  return score;
}

function selectDataDrivenPlace(candidates, context, selectedKeys, targetCategory = null) {
  const pool = targetCategory
    ? candidates.filter(place => place.primaryCategory === targetCategory)
    : candidates;
  const usablePool = pool.length ? pool : candidates;
  let best = null;
  let bestScore = -Infinity;
  const ranked = [];

  usablePool.forEach(place => {
    const key = getRuntimePlaceKey(place);
    if (selectedKeys.has(key)) return;
    const score = scoreDataDrivenPlace(place, { ...context, targetCategory });
    const projected = getProjectedRouteEstimate(place, context);
    const fitsDuration = !Number.isFinite(Number(context.durationCapMin)) ||
      projected.total <= Number(context.durationCapMin);
    if (Number.isFinite(score)) ranked.push({ place, score, projectedTotal: projected.total, fitsDuration });
  });

  const durationFitPool = ranked.filter(item => item.fitsDuration);
  const finalPool = durationFitPool.length
    ? durationFitPool
    : context.allowDurationOverCap === false
      ? []
      : ranked;

  finalPool.forEach(item => {
    const { place, score, projectedTotal } = item;
    if (score > bestScore) {
      best = place;
      bestScore = score;
    } else if (score === bestScore && projectedTotal < getProjectedRouteEstimate(best, context).total) {
      best = place;
    }
  });

  return best;
}

function enforceDataDrivenRequiredCategory(selected, candidates, context, selectedKeys, categoryCounts, requiredCategories) {
  if (hasRequiredPrimaryCategory(selected, requiredCategories)) return true;

  const requiredPlace = selectDataDrivenPlace(
    candidates.filter(place => placeMatchesRequiredPrimaryCategory(place, requiredCategories)),
    {
      ...context,
      stopIndex: selected.length,
      isFinalStop: selected.length >= context.timeConfig.maxStops - 1,
      previousPlace: selected[selected.length - 1] || null,
      selectedPlaces: selected,
      selectedEstimate: getSelectedRouteEstimate(selected),
    },
    selectedKeys
  );

  if (!requiredPlace) return false;

  if (selected.length < context.timeConfig.maxStops) {
    selected.push(requiredPlace);
  } else {
    const replaceIndex = selected.findIndex(place => (
      !placeMatchesRequiredPrimaryCategory(place, requiredCategories)
    ));
    if (replaceIndex === -1) return false;

    const removed = selected[replaceIndex];
    selectedKeys.delete(getRuntimePlaceKey(removed));
    if (removed.primaryCategory) {
      categoryCounts[removed.primaryCategory] = Math.max(
        0,
        (categoryCounts[removed.primaryCategory] || 0) - 1
      );
    }
    selected[replaceIndex] = requiredPlace;
  }

  selectedKeys.add(getRuntimePlaceKey(requiredPlace));
  categoryCounts[requiredPlace.primaryCategory] = (categoryCounts[requiredPlace.primaryCategory] || 0) + 1;
  return true;
}

function enforceDataDrivenPinnedPreferences(
  selected,
  candidates,
  context,
  selectedKeys,
  categoryCounts,
  routePreferences,
  protectedCategories = []
) {
  if (!routePreferences?.pinCategoryGroups?.length) return;

  const protectedSet = new Set(protectedCategories);

  routePreferences.pinCategoryGroups.forEach(group => {
    if (hasAnyPrimaryCategory(selected, group.categories)) {
      group.categories.forEach(category => protectedSet.add(category));
      return;
    }

    const pinnedPlace = selectDataDrivenPlace(
      candidates.filter(place => placeMatchesAnyPrimaryCategory(place, group.categories)),
      {
        ...context,
        routePreferences,
        stopIndex: selected.length,
        isFinalStop: selected.length >= context.timeConfig.maxStops - 1,
        previousPlace: selected[selected.length - 1] || null,
        selectedPlaces: selected,
        selectedEstimate: getSelectedRouteEstimate(selected),
      },
      selectedKeys
    );

    if (!pinnedPlace) return;

    if (selected.length < context.timeConfig.maxStops) {
      selected.push(pinnedPlace);
    } else {
      const replaceIndex = findPreferenceReplacementIndex(selected, protectedSet, group.categories);
      if (replaceIndex === -1) return;

      const removed = selected[replaceIndex];
      selectedKeys.delete(getRuntimePlaceKey(removed));
      if (removed.primaryCategory) {
        categoryCounts[removed.primaryCategory] = Math.max(
          0,
          (categoryCounts[removed.primaryCategory] || 0) - 1
        );
      }
      selected[replaceIndex] = pinnedPlace;
    }

    selectedKeys.add(getRuntimePlaceKey(pinnedPlace));
    categoryCounts[pinnedPlace.primaryCategory] = (categoryCounts[pinnedPlace.primaryCategory] || 0) + 1;
    group.categories.forEach(category => protectedSet.add(category));
  });
}

function orderPlacesNearestNeighbor(places, center) {
  const remaining = [...places];
  const ordered = [];
  let cursor = center;

  while (remaining.length) {
    let bestIndex = 0;
    let bestDistance = Infinity;
    remaining.forEach((place, index) => {
      const distance = getPlaceDistanceM(place, cursor);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    const [next] = remaining.splice(bestIndex, 1);
    ordered.push(next);
    cursor = next;
  }

  return ordered;
}

function buildDataDrivenPlaceWhy(place, context, matchedTags) {
  const parts = [];
  if (context.moodContext.primaryPreferred.includes(place.primaryCategory)) {
    parts.push(`fits ${context.moodContext.labels.join(' + ')}`);
  } else if (context.moodContext.secondaryPreferred.includes(place.primaryCategory)) {
    parts.push('adds a supporting stop');
  }
  if (matchedTags.length) parts.push(matchedTags.slice(0, 3).join(', '));
  if (Number.isFinite(place.__distanceM)) parts.push(`${formatDistanceMeters(place.__distanceM)} from ${context.areaConfig.label}`);
  return parts.length ? parts.join(' · ') : 'Picked because it fits this area and mood.';
}

function dataPlaceToRouteStop(place, index, previousPlace, totalStops, context) {
  const mobility = index === 0
    ? null
    : classifyLegMobility(previousPlace, place, DEFAULT_MAX_WALK_MINUTES);
  const matchedTags = (place.tags || []).filter(tag => context.moodContext.tagsPreferred.includes(tag));
  const primaryLabel = place.primaryCategoryLabel || MIRO_CATEGORY_LABELS[place.miroCategory] || place.categoryName || 'Place';
  const subLabel = place.subCategoryLabel || '';
  const categoryType = [primaryLabel, subLabel].filter(Boolean).join(' · ');
  const addressTag = getShortAddress(place.address);

  return {
    num: index + 1,
    name: place.displayName || place.name,
    type: addressTag ? `${categoryType} · ${addressTag}` : categoryType,
    stay: getPlaceStayMinutes(place),
    walk: mobility ? mobility.estimatedWalkMinutes : 0,
    legDistanceMeters: mobility ? mobility.distanceMeters : 0,
    legWalkMinutes: mobility ? mobility.estimatedWalkMinutes : 0,
    legSuggestedMode: mobility ? mobility.suggestedMode : null,
    legMobilityLabel: mobility
      ? `${mobility.label}${Number.isFinite(mobility.distanceMeters) ? ` · ${formatDistanceMeters(mobility.distanceMeters)}` : ''}`
      : '',
    coords: { lat: Number(place.lat), lng: Number(place.lng) },
    why: buildDataDrivenPlaceWhy(place, context, matchedTags),
    next: index === totalStops - 1 ? 'Route complete' : 'Continue to the next local place',
    tags: uniqueStrings([primaryLabel, subLabel, ...matchedTags, addressTag]).slice(0, 5),
    place,
  };
}

function buildDataDrivenRouteResult(orderedPlaces, context, beamRoute = null) {
  const { routeKey, mood, refinementKeys, areaConfig, timeConfig, moodContext, routePreferences } = context;
  const routeContext = { areaConfig, timeConfig, moodContext };
  const stops = orderedPlaces.map((place, index) => (
    dataPlaceToRouteStop(place, index, orderedPlaces[index - 1], orderedPlaces.length, routeContext)
  ));
  const timing = applySuggestedStayPace(stops, timeConfig);
  const distanceMeters = stops.reduce((sum, stop) => sum + Number(stop.legDistanceMeters || 0), 0);
  let why = appendRoutePreferenceExplanation(
    buildRouteWhyCopy(areaConfig.label, timeConfig, moodContext, stops, timing, refinementKeys),
    routePreferences
  );
  const ask = {
    why: `This ${getRouteStructureLabel(stops.length)} is tuned for ${areaConfig.label}, ${timeConfig.label}, and ${moodContext.labels.join(' + ')}.`,
    crowd: 'I do not check live crowd levels yet, but this route favors closer stops and avoids making you bounce across the neighborhood.',
    cafe: 'I can lean the route toward cafe and dessert stops when nearby options fit your area and time.',
  };

  const explainModule = getRecommendationModule('explainRoute');
  if (beamRoute && explainModule?.explainRoute) {
    const explanation = explainModule.explainRoute({
      places: orderedPlaces,
      placeScores: beamRoute.placeScores,
      routeScoreBreakdown: beamRoute.routeScoreBreakdown,
      context: {
        areaLabel: areaConfig.label,
        timeLabel: timeConfig.label,
        moodLabels: moodContext.labels,
        refinementKeys,
        routePreferences,
        durationHardMaxMin: beamRoute.durationHardMaxMin,
      },
    });
    if (explanation?.why) {
      why = appendRoutePreferenceExplanation(explanation.why, routePreferences);
    }
    ['why', 'crowd', 'cafe'].forEach(key => {
      if (explanation?.ask?.[key]) ask[key] = explanation.ask[key];
    });
  }

  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: getRouteCenter(stops) || areaConfig.center,
    defaultMood: moodContext.labels.join(' + '),
    meta: {
      total: formatMinutes(timing.displayTotalMinutes),
      walking: `${timing.walkingMinutes} min`,
      distance: formatDistanceMeters(distanceMeters),
      totalLabel: timing.totalLabel,
      timeNote: timing.adjusted ? timing.note : '',
    },
    why,
    ask,
    sourceKind: 'local_dataset',
    sourceLabel: 'Walkable route',
    mode: getRouteMode(mood),
    refinementKeys,
    stops,
  };
}

function buildDataDrivenRoute(routeKey, mood, refinementInput = null, runtimeContext = {}, options = {}) {
  const places = curatedPlaceState.places;
  if (!places.some(place => place.primaryCategory)) return null;

  if (routeKey === 'near_me' && !runtimeContext.center) {
    console.warn('Miro route source: near_me mock fallback because geolocation is unavailable.');
    return null;
  }

  const refinementKeys = normalizeRefinementKeys(refinementInput);
  const timeConfig = getTimeConfig(state.time);
  const moodContext = getMoodContext(mood);
  const startTimeContext = getStartTimeContext();
  const areaConfig = getAreaConfig(routeKey, runtimeContext);
  const routePreferences = options.routePreferences || null;
  const areaCandidates = getDataDrivenCandidates(places, areaConfig, timeConfig, moodContext);
  const candidates = filterCandidatesForRefinement(areaCandidates, refinementKeys);
  const previousStopIdentitySet = options.previousRoute
    ? getPreviousRouteStopIdentitySet(options.previousRoute)
    : new Set();
  const baseContext = {
    areaConfig,
    timeConfig,
    moodContext,
    startTimeContext,
    refinementKeys,
    routePreferences,
    durationCapMin: getDurationSoftCapMin(timeConfig),
    previousStopIdentitySet,
    previousRouteOverlapMultiplier: Number(options.previousRouteOverlapMultiplier) || 1,
  };
  const scoredCandidates = candidates
    .map(place => ({ place, score: scoreDataDrivenPlace(place, {
      ...baseContext,
      categoryCounts: {},
      stopIndex: 0,
      isFinalStop: false,
      previousPlace: null,
      selectedPlaces: [],
      selectedEstimate: { stay: 0, travel: 0, total: 0 },
    }) }))
    .filter(item => Number.isFinite(item.score) && item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return getRuntimePlaceKey(left.place).localeCompare(getRuntimePlaceKey(right.place));
    })
    .map(item => item.place);
  const uxMinStops = getUxSafeMinimumStopCount(timeConfig, scoredCandidates.length);
  const baseSequence = getRouteCategorySequence(moodContext, timeConfig, routePreferences, startTimeContext);
  const sequence = deriveRefinedCategorySequence(baseSequence, refinementKeys, moodContext, routePreferences);
  const requiredCategories = getMoodRequiredPrimaryCategories(moodContext, startTimeContext);

  debugRouteRecommendation('data_driven_candidates', {
    placesLoaded: places.length,
    validCoords: places.filter(hasValidCoords).length,
    area: areaConfig.label,
    radiusM: Math.round(getAreaRadiusM(areaConfig)),
    candidatesAfterArea: areaCandidates.length,
    candidatesAfterRefinementFilter: candidates.length,
    candidatesAfterMoodScoring: scoredCandidates.length,
    uxMinStops,
    durationCapMin: baseContext.durationCapMin,
    refinementKeys,
  });

  if (scoredCandidates.length < timeConfig.minStops) {
    debugRouteRecommendation('data_driven_failed', {
      reason: 'too_few_scored_candidates',
      scoredCandidates: scoredCandidates.length,
      minStops: timeConfig.minStops,
      routeKey,
      refinementKeys,
    });
    return null;
  }

  if (BEAM_SEARCH_ENABLED) {
    const beamModule = getRecommendationModule('beamSearch');
    if (beamModule?.runBeamSearch) {
      const beamResult = beamModule.runBeamSearch({
        candidates: scoredCandidates,
        areaConfig,
        timeConfig,
        moodContext,
        startTimeContext,
        refinementKeys,
        routePreferences,
        sequence,
        requiredCategories,
        minimumStops: Math.min(uxMinStops, scoredCandidates.length),
        maxStops: timeConfig.maxStops,
        durationHardMaxMin: baseContext.durationCapMin,
        defaultMaxWalkMinutes: DEFAULT_MAX_WALK_MINUTES,
        lessWalkingMaxWalkMinutes: LESS_WALKING_MAX_WALK_MINUTES,
        beamWidth: options.beamWidth || BEAM_SEARCH_WIDTH,
        baseContext,
      }, {
        scorePlace: getRecommendationModule('scorePlace')?.scorePlace,
        scoreRoute: getRecommendationModule('scoreRoute')?.scoreRoute,
        rerankRoutes: getRecommendationModule('rerankRoutes')?.rerankRoutes,
        getRuntimePlaceKey,
        getPlaceStayMinutes,
        classifyLegMobility,
        getPlacePrimaryCategory,
        placeScoreDeps: {
          getAreaRadiusM,
          getPlaceDistanceM,
          getRoutePreferenceScore,
          getPlaceStayMinutes,
          classifyLegMobility,
          getDurationFitScore,
          getStartTimeCategoryScore,
          getBacktrackingPenalty,
          getPreviousOverlapPenalty,
          getOpenNowValue,
          getPlaceSearchText,
        },
      });

      if (beamResult?.route?.places?.length) {
        debugRouteRecommendation('beam_search_succeeded', {
          routeKey,
          refinementKeys,
          beamWidth: beamResult.beamWidth,
          routeCount: beamResult.routes?.length || 0,
          selectedCategories: beamResult.route.places.map(place => place.primaryCategory),
          routeScore: beamResult.route.routeScore,
          rerankScore: beamResult.route.rerankScore,
          estimatedTotalMinutes: beamResult.route.estimate?.total,
          walkingMinutes: beamResult.route.estimate?.walkingMinutes,
        });
        return buildDataDrivenRouteResult(
          beamResult.route.places.slice(0, timeConfig.maxStops),
          { routeKey, mood, refinementKeys, areaConfig, timeConfig, moodContext, routePreferences },
          { ...beamResult.route, durationHardMaxMin: baseContext.durationCapMin }
        );
      }

      debugRouteRecommendation('beam_search_failed', {
        routeKey,
        refinementKeys,
        reason: beamResult?.reason || 'no_route_returned',
        failures: beamResult?.failures || {},
        fallback: 'greedy_data_driven',
      });
    } else {
      debugRouteRecommendation('beam_search_failed', {
        routeKey,
        refinementKeys,
        reason: 'module_unavailable',
        fallback: 'greedy_data_driven',
      });
    }
  }

  const selected = [];
  const selectedKeys = new Set();
  const categoryCounts = {};

  const limitedSequence = sequence.slice(0, timeConfig.maxStops);
  for (let stopIndex = 0; stopIndex < limitedSequence.length; stopIndex += 1) {
    if (shouldStopDataDrivenSelection(selected, timeConfig, routePreferences, uxMinStops)) break;

    const targetCategory = limitedSequence[stopIndex];
    const place = selectDataDrivenPlace(scoredCandidates, {
      ...getDataDrivenSelectionContext(baseContext, selected, stopIndex, stopIndex === timeConfig.maxStops - 1),
      categoryCounts,
    }, selectedKeys, targetCategory);
    if (!place) continue;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.primaryCategory] = (categoryCounts[place.primaryCategory] || 0) + 1;
  }

  while (selected.length < uxMinStops) {
    const place = selectDataDrivenPlace(scoredCandidates, {
      ...getDataDrivenSelectionContext(
        baseContext,
        selected,
        selected.length,
        selected.length === timeConfig.maxStops - 1
      ),
      categoryCounts,
    }, selectedKeys);
    if (!place) break;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.primaryCategory] = (categoryCounts[place.primaryCategory] || 0) + 1;
  }

  const hasRequiredCategory = enforceDataDrivenRequiredCategory(
    selected,
    scoredCandidates,
    {
      ...getDataDrivenSelectionContext(baseContext, selected, selected.length, selected.length >= timeConfig.maxStops - 1),
      categoryCounts,
    },
    selectedKeys,
    categoryCounts,
    requiredCategories
  );

  if (!hasRequiredCategory) {
    debugRouteRecommendation('data_driven_failed', {
      reason: 'missing_required_category',
      requiredCategories,
      selectedCategories: selected.map(place => place.primaryCategory),
      routeKey,
      refinementKeys,
    });
    return null;
  }

  trimDataDrivenRouteToDurationCap(
    selected,
    timeConfig,
    requiredCategories,
    routePreferences,
    selectedKeys,
    categoryCounts
  );

  while (selected.length < uxMinStops) {
    const place = selectDataDrivenPlace(scoredCandidates, {
      ...getDataDrivenSelectionContext(
        baseContext,
        selected,
        selected.length,
        selected.length === timeConfig.maxStops - 1
      ),
      categoryCounts,
      allowDurationOverCap: false,
    }, selectedKeys);
    if (!place) break;
    selected.push(place);
    syncDataDrivenSelectionState(selected, selectedKeys, categoryCounts);
  }

  enforceDataDrivenPinnedPreferences(
    selected,
    candidates,
    {
      ...getDataDrivenSelectionContext(baseContext, selected, selected.length, selected.length >= timeConfig.maxStops - 1),
      categoryCounts,
    },
    selectedKeys,
    categoryCounts,
    routePreferences,
    requiredCategories
  );

  trimDataDrivenRouteToDurationCap(
    selected,
    timeConfig,
    requiredCategories,
    routePreferences,
    selectedKeys,
    categoryCounts
  );

  const minimumViableStops = Math.min(scoredCandidates.length, 1);
  if (selected.length < minimumViableStops) {
    debugRouteRecommendation('data_driven_failed', {
      reason: 'too_few_selected_places',
      selectedCount: selected.length,
      minStops: minimumViableStops,
      uxMinStops,
      configuredMinStops: timeConfig.minStops,
      routeKey,
      refinementKeys,
    });
    return null;
  }

  const orderedPlaces = routePreferences?.shapeSequence?.length
    ? selected.slice(0, timeConfig.maxStops)
    : orderPlacesNearestNeighbor(selected.slice(0, timeConfig.maxStops), areaConfig.center);
  const previewStops = orderedPlaces.map((place, index) => (
    dataPlaceToRouteStop(place, index, orderedPlaces[index - 1], orderedPlaces.length, { areaConfig, timeConfig, moodContext })
  ));
  const previewTiming = applySuggestedStayPace(previewStops, timeConfig);

  debugRouteRecommendation('data_driven_succeeded', {
    routeKey,
    refinementKeys,
    area: areaConfig.label,
    time: timeConfig.key,
    selectedCategories: orderedPlaces.map(place => place.primaryCategory),
    stopCount: previewStops.length,
    uxMinStops,
    durationCapMin: baseContext.durationCapMin,
    estimatedTotalMinutes: previewTiming.rawTotalMinutes,
    displayedTotalMinutes: previewTiming.displayTotalMinutes,
    walkingMinutes: previewTiming.walkingMinutes,
  });

  return buildDataDrivenRouteResult(
    orderedPlaces,
    { routeKey, mood, refinementKeys, areaConfig, timeConfig, moodContext, routePreferences }
  );
}

function buildCuratedRoute(routeKey, mood, refinementInput = null, runtimeContext = {}, options = {}) {
  const refinementKeys = normalizeRefinementKeys(refinementInput);
  const dataDrivenRoute = buildDataDrivenRoute(routeKey, mood, refinementKeys, runtimeContext, options);
  if (dataDrivenRoute) {
    debugRouteRecommendation('route_source', { routeKey, refinementKeys, source: 'local_dataset' });
    return dataDrivenRoute;
  }

  return buildLegacyCuratedRoute(routeKey, mood, refinementKeys, runtimeContext, options);
}

function buildLegacyCuratedRoute(routeKey, mood, refinementInput = null, runtimeContext = {}, options = {}) {
  const places = curatedPlaceState.places;
  if (!places.length) return null;

  const refinementKeys = normalizeRefinementKeys(refinementInput);
  if (routeKey === 'near_me' && !runtimeContext.center) return null;

  const timeConfig = getTimeConfig(state.time);
  const startTimeContext = getStartTimeContext();
  const areaConfig = getAreaConfig(routeKey, runtimeContext);
  const moodContext = getMoodContext(mood);
  const mode = getRouteMode(mood);
  const routePreferences = options.routePreferences || null;
  const template = getRouteTemplate(mode, refinementKeys, routePreferences, startTimeContext);
  const candidates = filterCandidatesForRefinement(getAreaCandidates(places, areaConfig, moodContext), refinementKeys);
  if (!candidates.length) return null;

  const previousStopIdentitySet = options.previousRoute
    ? getPreviousRouteStopIdentitySet(options.previousRoute)
    : new Set();
  const previousRouteOverlapMultiplier = Number(options.previousRouteOverlapMultiplier) || 1;
  const walkRefined = refinementKeys.includes('walk');

  const selected = [];
  const selectedKeys = new Set();
  const categoryCounts = {};
  const maxStops = Math.min(walkRefined ? Math.min(timeConfig.maxStops, 3) : timeConfig.maxStops, candidates.length);
  const maxWalkMinutes = getMaxWalkMinutesForRefinement(refinementKeys);
  const requiredCategories = getMoodRequiredPrimaryCategories(moodContext, startTimeContext);

  template.slice(0, maxStops).forEach(targetCategory => {
    const exactMatches = candidates.filter(place => place.miroCategory === targetCategory);
    const context = {
      areaConfig,
      mode,
      targetCategory,
      categoryCounts,
      refinementKeys,
      routePreferences,
      startTimeContext,
      maxWalkMinutes,
      previousPlace: selected[selected.length - 1] || null,
      previousStopIdentitySet,
      previousRouteOverlapMultiplier,
    };
    const pool = getMobilityAwareCandidatePool(candidates, exactMatches, context);
    const place = selectBestPlace(pool, context, selectedKeys);

    if (!place) return;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.miroCategory] = (categoryCounts[place.miroCategory] || 0) + 1;
  });

  while (selected.length < maxStops) {
    const place = selectBestPlace(candidates, {
      areaConfig,
      mode,
      targetCategory: null,
      categoryCounts,
      refinementKeys,
      routePreferences,
      startTimeContext,
      maxWalkMinutes,
      previousPlace: selected[selected.length - 1] || null,
      previousStopIdentitySet,
      previousRouteOverlapMultiplier,
    }, selectedKeys);
    if (!place) break;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.miroCategory] = (categoryCounts[place.miroCategory] || 0) + 1;
  }

  const hasRequiredCategory = enforceLegacyRequiredCategory(
    selected,
    candidates,
    {
      areaConfig,
      mode,
      categoryCounts,
      refinementKeys,
      routePreferences,
      startTimeContext,
      maxWalkMinutes,
      previousStopIdentitySet,
      previousRouteOverlapMultiplier,
    },
    selectedKeys,
    categoryCounts,
    requiredCategories,
    maxStops
  );

  if (!hasRequiredCategory) return null;

  enforceLegacyPinnedPreferences(
    selected,
    candidates,
    {
      areaConfig,
      mode,
      categoryCounts,
      refinementKeys,
      routePreferences,
      startTimeContext,
      maxWalkMinutes,
      previousStopIdentitySet,
      previousRouteOverlapMultiplier,
    },
    selectedKeys,
    categoryCounts,
    routePreferences,
    requiredCategories,
    maxStops
  );

  if (!selected.length) return null;

  const stops = selected.map((place, index) => (
    placeToRouteStop(place, index, selected[index - 1], selected.length, maxWalkMinutes)
  ));
  const timing = applySuggestedStayPace(stops, timeConfig);

  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: getRouteCenter(stops) || areaConfig.center,
    defaultMood: state.mood,
    meta: {
      total: formatMinutes(timing.displayTotalMinutes),
      walking: `${timing.walkingMinutes} min`,
      totalLabel: timing.totalLabel,
      timeNote: timing.adjusted ? timing.note : '',
    },
    why: appendRoutePreferenceExplanation(buildRouteWhy(areaConfig.label, refinementKeys), routePreferences),
    ask: {
      why: `This ${getRouteStructureLabel(stops.length)} is tuned for ${areaConfig.label}, ${timeConfig.label}, and your selected mood.`,
      crowd: 'I can prefer quieter nearby categories, but I do not check live crowd levels yet.',
      cafe: 'I can prioritize cafe-style stops when nearby options fit your area and time.',
    },
    sourceKind: 'processed',
    sourceLabel: 'Walkable route',
    mode,
    refinementKeys,
    stops,
  };
}

function buildRouteWhy(areaLabel, refinementInput = null) {
  const base = `Picked for walkability, local feel, and your selected mood near ${areaLabel}. Chosen to keep the route realistic, local, and easy to follow.`;
  const keys = normalizeRefinementKeys(refinementInput);
  if (!keys.length) return base;
  const labels = getRefinementLabels(keys);
  return `${base} Tuned for: ${labels.join(' · ')}.`;
}

function appendRoutePreferenceExplanation(why, routePreferences) {
  if (!routePreferences) return why;

  const notes = [];
  if (routePreferences.shapeSequence?.length) {
    notes.push('Customized with your selected route flow.');
  }
  if (routePreferences.pinCategoryGroups?.length) {
    notes.push('Prioritized your pinned route interests where possible.');
  } else if (routePreferences.heartCategories?.length) {
    notes.push('Prioritized your preferred route interests where possible.');
  }

  return notes.length ? `${why} ${notes.join(' ')}` : why;
}

function placeToRouteStop(place, index, previousPlace, totalStops = 4, maxWalkMinutes = DEFAULT_MAX_WALK_MINUTES) {
  const category = place.miroCategory || 'unknown';
  const categoryLabel = place.categoryName || MIRO_CATEGORY_LABELS[category] || 'Saved place';
  const mobility = index === 0
    ? null
    : classifyLegMobility(previousPlace, place, maxWalkMinutes);
  const walk = mobility ? mobility.estimatedWalkMinutes : 0;
  const addressTag = getShortAddress(place.address);
  const sourceTag = place.sourceFile
    ? place.sourceFile.replace(/\.json$/i, '')
    : 'Naver saved place';

  return {
    num: index + 1,
    name: place.displayName || place.name,
    type: place.address ? `${categoryLabel} · ${place.address}` : categoryLabel,
    stay: CATEGORY_STAY_MINUTES[category] || CATEGORY_STAY_MINUTES.unknown,
    walk,
    legDistanceMeters: mobility ? mobility.distanceMeters : 0,
    legWalkMinutes: mobility ? mobility.estimatedWalkMinutes : 0,
    legSuggestedMode: mobility ? mobility.suggestedMode : null,
    legMobilityLabel: mobility ? mobility.label : '',
    coords: { lat: Number(place.lat), lng: Number(place.lng) },
    why: buildPlaceWhy(place, sourceTag),
    next: index === totalStops - 1 ? 'Route complete' : 'Continue to the next saved place',
    tags: [sourceTag, categoryLabel, addressTag].filter(Boolean),
    place,
  };
}

function buildPlaceWhy(place, sourceTag) {
  const category = place.categoryName || MIRO_CATEGORY_LABELS[place.miroCategory] || 'saved place';
  const status = place.available === false ? ' It is marked unavailable in the source export.' : '';
  return `Picked for ${category}${place.address ? ` near ${place.address}` : ''}.${status}`;
}

function getShortAddress(address) {
  const parts = String(address || '').split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).join(' ');
}

function estimateWalkMinutes(previousPlace, place) {
  const distanceMeters = haversineMeters(previousPlace, place);
  const walkMinutes = estimateWalkMinutesFromDistanceMeters(distanceMeters);
  return walkMinutes === null ? 6 : walkMinutes;
}

function getRouteCenter(stops) {
  const validStops = stops.filter(stop => hasValidCoords(stop.coords));
  if (!validStops.length) return null;
  return {
    lat: validStops.reduce((sum, stop) => sum + stop.coords.lat, 0) / validStops.length,
    lng: validStops.reduce((sum, stop) => sum + stop.coords.lng, 0) / validStops.length,
  };
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${String(remainder).padStart(2, '0')}m` : `${hours}h`;
}

function formatDistanceMeters(distanceMeters) {
  if (!Number.isFinite(Number(distanceMeters))) return '';
  const meters = Math.round(Number(distanceMeters));
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function getStopsWithCoords() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return [];
  return currentRoute.stops
    .map((stop, index) => ({ stop, index }))
    .filter(item => hasValidCoords(item.stop.coords));
}

function buildMockFallbackRoute(routeKey, notice = '', runtimeContext = {}) {
  if (hasActualNearMeRuntime(routeKey, runtimeContext)) {
    const message = notice || 'We could not find enough saved places near your current location yet. Try a broader duration, mood, or another area.';
    return buildEmptyRealRoute(routeKey, message, runtimeContext);
  }

  const mockRouteKey = MOCK_ROUTE_KEY_ALIASES[routeKey] || routeKey;
  const fallback = ROUTES[mockRouteKey] || ROUTES.hongdae;
  const timeConfig = getTimeConfig(state.time);
  const stops = Array.isArray(fallback.stops) ? fallback.stops.slice(0, timeConfig.maxStops) : [];
  const isNearMeFallback = routeKey === 'near_me';
  const fallbackNotice = isNearMeFallback
    ? uniqueStrings([notice, runtimeContext.locationError || NEAR_ME_FALLBACK_MESSAGE]).join(' ')
    : notice;
  if (isNearMeFallback) {
    setNearMeFallbackRuntimeState(runtimeContext.error || null);
  }
  console.warn('Miro route source: mock');
  return {
    ...fallback,
    label: isNearMeFallback ? 'Default Seoul route' : fallback.label,
    mapLabel: isNearMeFallback ? 'Location unavailable - Hongdae fallback route' : fallback.mapLabel,
    center: getRouteCenter(stops) || fallback.center,
    why: fallbackNotice ? `${fallbackNotice} ${fallback.why}` : fallback.why,
    sourceKind: 'mock',
    sourceLabel: 'Starter route',
    fallbackNotice,
    stops,
  };
}

function buildEmptyRealRoute(routeKey, message, runtimeContext = {}) {
  const areaConfig = getAreaConfig(routeKey, runtimeContext);
  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: areaConfig.center,
    defaultMood: state.mood,
    meta: {
      total: '0 min',
      walking: '0 min',
    },
    why: message,
    ask: {
      why: message,
      crowd: message,
      cafe: message,
    },
    sourceKind: 'processed',
    sourceLabel: 'Walkable route',
    mode: getRouteMode(state.mood),
    stops: [],
  };
}

function resolveRouteForCurrentSelection(routeKey, refinementInput = getActiveRefinementKeys(), runtimeContext = {}, options = {}) {
  const refinementKeys = normalizeRefinementKeys(refinementInput);
  const mood = options.moodKey || state.mood;
  const realRoute = buildCuratedRoute(routeKey, mood, refinementKeys, runtimeContext, options);
  if (realRoute) {
    return realRoute;
  }

  if (hasActualNearMeRuntime(routeKey, runtimeContext)) {
    debugRouteRecommendation('fallback_route_blocked', {
      routeKey,
      refinementKeys,
      reason: 'near_me_coords_present',
    });
    return buildEmptyRealRoute(
      routeKey,
      'We could not find enough saved places near your current location yet. Try a broader duration, mood, or another area.',
      runtimeContext
    );
  }

  if (MOCK_ROUTES_ENABLED) {
    debugRouteRecommendation('fallback_route', { routeKey, refinementKeys, reason: 'mock_mode_enabled' });
    return buildMockFallbackRoute(routeKey, 'Using a starter route while this preview mode is active.', runtimeContext);
  }

  if (curatedPlaceState.failed) {
    debugRouteRecommendation('fallback_route', { routeKey, refinementKeys, reason: 'local_data_load_failed' });
    return buildMockFallbackRoute(routeKey, 'We could not confirm enough nearby matches, so this starter route keeps the plan walkable.', runtimeContext);
  }

  if (!curatedPlaceState.places.length) {
    debugRouteRecommendation('fallback_route', { routeKey, refinementKeys, reason: 'no_local_places_loaded' });
    return buildMockFallbackRoute(routeKey, 'We could not confirm enough nearby matches, so this starter route keeps the plan walkable.', runtimeContext);
  }

  const notice = runtimeContext.locationError
    || 'Not enough nearby matches fit this exact area, time, and mood, so this starter route keeps the plan walkable.';
  debugRouteRecommendation('fallback_route', {
    routeKey,
    refinementKeys,
    reason: runtimeContext.locationError ? 'runtime_context_error' : 'not_enough_matching_places',
  });
  return buildMockFallbackRoute(routeKey, notice, runtimeContext);
}

function normalizeRouteBuildInput(input = {}) {
  const normalizeModule = getRecommendationModule('normalizeRequest');
  if (normalizeModule?.normalizeRequest) {
    return normalizeModule.normalizeRequest(input, {
      defaults: {
        areaKey: state.area,
        timeKey: state.time,
        moodKey: state.mood,
        startTimePeriod: state.startTimePeriod,
        customStartTime: state.customStartTime,
        places: curatedPlaceState.places,
        activeRefinements: getActiveRefinementKeys(),
      },
      areaCenters: Object.fromEntries(Object.entries(AREA_FILTERS).map(([key, area]) => [key, area.center])),
      cachedNearMeCoords: getCachedNearMeCoords(),
      normalizeAreaKey: getRouteKey,
      normalizeTimeKey,
      normalizeMoodKeys,
      normalizeStartTimePeriod,
      getCustomStartTimeValue,
      normalizeCoords,
      normalizeRefinementKeys,
    });
  }

  const rawStartTime = input.startTime && typeof input.startTime === 'object'
    ? input.startTime
    : {};
  const areaKey = getRouteKey(input.areaKey || input.area || state.area);
  const timeKey = normalizeTimeKey(input.timeKey || input.time || state.time);
  const moodKey = normalizeMoodKeys(input.moodKey || input.mood || state.mood)[0] || 'local_food';
  const startTime = {
    period: normalizeStartTimePeriod(rawStartTime.period || input.startTimePeriod || state.startTimePeriod),
    customStartTime: getCustomStartTimeValue(
      rawStartTime.customStartTime ?? input.customStartTime ?? state.customStartTime
    ),
  };
  const runtimeContext = input.runtimeContext || {};
  const coords = normalizeCoords(
    input.coords ||
    runtimeContext.center ||
    (areaKey === 'near_me' ? getCachedNearMeCoords() : AREA_FILTERS[areaKey]?.center)
  );
  const resolvedRuntimeContext = coords && !runtimeContext.center
    ? { ...runtimeContext, center: coords }
    : runtimeContext;
  const places = Array.isArray(input.places) ? input.places : curatedPlaceState.places;
  const previousRoute = input.previousRoute || null;

  return {
    ...input,
    areaKey,
    timeKey,
    moodKey,
    startTime,
    refinements: normalizeRefinementKeys(input.refinements ?? input.refinementInput ?? getActiveRefinementKeys()),
    coords,
    places,
    previousRoute,
    runtimeContext: resolvedRuntimeContext,
  };
}

function buildRouteForInputs(input = {}) {
  const routeInput = normalizeRouteBuildInput(input);
  const options = {
    ...(routeInput.options || {}),
    coords: routeInput.coords,
    moodKey: routeInput.moodKey,
    places: routeInput.places,
    routePreferences: routeInput.routePreferences || null,
    startTime: routeInput.startTime,
    timeKey: routeInput.timeKey,
  };

  if (routeInput.previousRoute) {
    options.previousRoute = routeInput.previousRoute;
  }
  if (routeInput.previousRouteOverlapMultiplier !== undefined) {
    options.previousRouteOverlapMultiplier = routeInput.previousRouteOverlapMultiplier;
  }

  if (routeInput.allowFallback === false) {
    return buildCuratedRoute(
      routeInput.areaKey,
      routeInput.moodKey,
      routeInput.refinements,
      routeInput.runtimeContext,
      options
    );
  }

  return resolveRouteForCurrentSelection(
    routeInput.areaKey,
    routeInput.refinements,
    routeInput.runtimeContext,
    options
  );
}

const AREA_KEY_BY_LABEL = Object.values(ROUTES).reduce((acc, route) => {
  acc[route.label.toLowerCase()] = route.label.toLowerCase();
  return acc;
}, {});

const REFINEMENT_TEMPLATES = {
  walk: ['cafe', 'walk', 'eat'],
  cheap: ['walk', 'cafe', 'eat', 'see'],
  cafe: ['cafe', 'cafe', 'walk', 'cafe'],
  quiet: ['walk', 'cafe', 'see', 'shop'],
  local: ['eat', 'cafe', 'walk', 'shop'],
};

const BUDGET_CATEGORY_NAMES = ['분식', '김밥', '국수', '라면', '라멘', '만두', '백반', '시장', '포차', '노점', '간식', '스낵', '카페', 'street', 'snack', 'casual', 'bunsik', 'coffee', 'cafe', 'bakery'];
const PREMIUM_CATEGORY_NAMES = ['오마카세', '파인다이닝', '스테이크', '와인', '칵테일', 'bar', 'pub'];
const LOCAL_TERMS = ['골목', '동네', '로컬', 'local', 'hidden', '숨은', '찐', '노포', '시장', 'backstreet', 'neighborhood', 'indie', 'independent', 'residential', 'locals'];
const CAFE_REFINEMENT_TERMS = ['카페', '커피', '디저트', '베이커리', '차', 'coffee', 'cafe', 'dessert', 'bakery', 'tea', 'roast'];
const QUIET_TERMS = ['조용', 'quiet', 'calm', '한적', '골목', '산책', '공원', 'walk', 'garden', 'study', 'reading', 'book', '책', 'rest'];
const TOURIST_HEAVY_TERMS = ['핫플', '명소', '랜드마크', '관광', 'tour', 'tourist', 'famous', 'club', '클럽', '대형', '몰', '백화점'];
const OPEN_NOW_FIELD_PATHS = [
  ['openNow'],
  ['isOpenNow'],
  ['currentlyOpen'],
  ['isOpen'],
  ['openingHours', 'openNow'],
  ['openingHours', 'isOpen'],
  ['hours', 'openNow'],
  ['hours', 'isOpen'],
];
const KAKAO_TRUST_WEIGHT = 20;
const KAKAO_RATING_PATHS = [
  ['kakaoRating'],
  ['kakaoPlaceRating'],
  ['kakao', 'rating'],
  ['kakao', 'score'],
  ['ratings', 'kakao'],
  ['raw', 'kakaoRating'],
  ['raw', 'kakao', 'rating'],
];
const KAKAO_REVIEW_COUNT_PATHS = [
  ['kakaoReviewCount'],
  ['kakaoReviews'],
  ['kakaoReviewCnt'],
  ['kakao', 'reviewCount'],
  ['kakao', 'reviews'],
  ['reviewCounts', 'kakao'],
  ['raw', 'kakaoReviewCount'],
  ['raw', 'kakao', 'reviewCount'],
];
const NAVER_RATING_PATHS = [
  ['naverRating'],
  ['naverPlaceRating'],
  ['naver', 'rating'],
  ['naver', 'score'],
  ['ratings', 'naver'],
  ['raw', 'naverRating'],
  ['raw', 'naver', 'rating'],
  ['raw', 'placeInfo', 'rating'],
];
const NAVER_REVIEW_COUNT_PATHS = [
  ['naverReviewCount'],
  ['naverReviews'],
  ['naverReviewCnt'],
  ['naverVisitorReviewCount'],
  ['visitorReviewCount'],
  ['naver', 'reviewCount'],
  ['naver', 'reviews'],
  ['naver', 'visitorReviewCount'],
  ['reviewCounts', 'naver'],
  ['raw', 'naverReviewCount'],
  ['raw', 'visitorReviewCount'],
  ['raw', 'placeInfo', 'reviewCount'],
  ['raw', 'placeInfo', 'visitorReviewCount'],
];
// ========== Route Engine Namespace ==========
window.KSRouteEngine = {
  config: {
    ROUTES,
    AREA_FILTERS,
    TIME_CONFIG,
    TIME_ALIASES,
    MOOD_CONFIG,
    MOOD_ALIASES,
    MOOD_CATEGORY_SEQUENCES,
    MOOD_REQUIRED_PRIMARY_CATEGORIES,
    MOCK_ROUTE_KEY_ALIASES,
    OPTIONAL_SHAPE_CATEGORY_SEQUENCES,
    OPTIONAL_ANCHOR_CATEGORY_GROUPS,
    MIRO_CATEGORY_TO_PRIMARY_CATEGORY,
    PRIMARY_CATEGORY_TO_MIRO_CATEGORY,
    CATEGORY_STAY_MINUTES
  },
  normalize: {
    normalizeCuratedPlacesPayload,
    normalizeRealPlace,
    normalizeTimeKey,
    normalizeMoodKeys,
    normalizeRouteBuildInput
  },
  buildRouteForInputs,
  resolveRouteForCurrentSelection,
  buildCuratedRoute,
  buildDataDrivenRoute,
  buildLegacyCuratedRoute,
  buildMockFallbackRoute,
  buildEmptyRealRoute,
  getDataDrivenCandidates,
  scoreDataDrivenPlace,
  selectDataDrivenPlace,
  orderPlacesNearestNeighbor,
  applySuggestedStayPace
};
