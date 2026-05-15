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
        next: 'Route complete · subway 4 min away',
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
    why: '이태원과 한남은 너무 넓게 잡으면 산만해져서, 글로벌한 식사로 시작해 한남의 디자인/브라우징 무드, 카페나 바, 야경 느낌으로 이어지게 잡았어요. This is a safe prototype fallback when local place data cannot build a route.',
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
        why: 'A low-commitment finish with the area feeling of Itaewon/Hannam, useful when the data-driven route is unavailable.',
        next: 'Route complete · transit nearby',
        tags: ['🌃 view', '🚶 walkable', '📍 fallback'],
      },
    ],
  },
};

// ========== Curated Naver bookmark place data ==========
const SUBCATEGORIZED_PLACES_URL = 'data/places/processed/miro_places_subcategorized.json';
const CURATED_PLACES_URL = 'data/miro_places.json';
const MOCK_ROUTES_ENABLED = new URLSearchParams(window.location.search).get('mock') === '1';

const AREA_FILTERS = {
  myeongdong_euljiro: {
    label: 'Myeongdong / Euljiro',
    mapLabel: 'Myeongdong / Euljiro · local place dataset',
    center: { lat: 37.5663, lng: 126.9880 },
    terms: ['명동', '을지로', '충무로', '청계', '종로', '중구'],
    radiusM: 1800,
  },
  hongdae_yeonnam: {
    label: 'Hongdae / Yeonnam',
    mapLabel: 'Hongdae / Yeonnam · local place dataset',
    center: { lat: 37.5563, lng: 126.9236 },
    terms: ['홍대', '연남', '서교', '동교', '합정', '상수', '망원', '마포구'],
    radiusM: 1800,
  },
  itaewon_hannam: {
    label: 'Itaewon / Hannam',
    mapLabel: 'Itaewon / Hannam · local place dataset',
    center: { lat: 37.5345, lng: 126.9946 },
    terms: ['이태원', '한남', '용산구', '해방촌', '녹사평'],
    radiusM: 2000,
  },
  seongsu: {
    label: 'Seongsu',
    mapLabel: 'Seongsu · local place dataset',
    center: { lat: 37.5446, lng: 127.0557 },
    terms: ['성수', '서울숲', '뚝섬', '성동구'],
    radiusM: 1800,
  },
  anguk_bukchon: {
    label: 'Anguk / Bukchon',
    mapLabel: 'Anguk / Bukchon · local place dataset',
    center: { lat: 37.5796, lng: 126.9849 },
    terms: ['안국', '북촌', '삼청', '인사', '익선', '운니', '계동', '가회', '종로구'],
    radiusM: 1800,
  },
  gangnam_sinsa_apgujeong: {
    label: 'Gangnam / Sinsa / Apgujeong',
    mapLabel: 'Gangnam / Sinsa / Apgujeong · local place dataset',
    center: { lat: 37.5172, lng: 127.0286 },
    terms: ['강남', '역삼', '신논현', '논현', '신사', '압구정', '잠원', '강남구', '서초구'],
    radiusM: 2500,
  },
  near_me: {
    label: 'Near me',
    mapLabel: 'Near me · local place dataset',
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
  time_30_60: { label: '30–60 min', targetMin: 45, minStops: 1, maxStops: 2, nearMeRadiusM: 700 },
  time_1_2: { label: '1–2 hours', targetMin: 90, minStops: 2, maxStops: 2, nearMeRadiusM: 1200 },
  time_2_3: { label: '2–3 hours', targetMin: 150, minStops: 2, maxStops: 3, nearMeRadiusM: 1800 },
  time_4_6: { label: '4–6 hours', targetMin: 300, minStops: 3, maxStops: 5, nearMeRadiusM: 3000 },
};

const TIME_ALIASES = {
  '30–60 min': 'time_30_60',
  '30-60 min': 'time_30_60',
  '1–2 hours': 'time_1_2',
  '1-2 hours': 'time_1_2',
  '2–3 hours': 'time_2_3',
  '2-3 hours': 'time_2_3',
  '2 hours': 'time_2_3',
  '4–6 hours': 'time_4_6',
  '4-6 hours': 'time_4_6',
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

function getMoodRequiredPrimaryCategories(moodContext) {
  const primaryMood = moodContext?.compositionKeys?.[0] || 'local_food';
  return MOOD_REQUIRED_PRIMARY_CATEGORIES[primaryMood] || [];
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
  const center = runtimeContext.center || base.center || AREA_FILTERS.hongdae_yeonnam.center;
  const radiusM = routeKey === 'near_me'
    ? timeConfig.nearMeRadiusM
    : getAreaRadiusM(base);
  return {
    ...base,
    center,
    radiusM: runtimeContext.radiusM || radiusM,
    radiusKm: (runtimeContext.radiusM || radiusM) / 1000,
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

function getMaxWalkMinutesForRefinement(refinementKey) {
  return refinementKey === 'walk' ? LESS_WALKING_MAX_WALK_MINUTES : DEFAULT_MAX_WALK_MINUTES;
}

function updateRouteLoadingMessage(message) {
  const inlineStep = document.getElementById('loading-step');
  const onboardingStep = document.getElementById('ob-loading-step');
  if (inlineStep) inlineStep.textContent = message;
  if (onboardingStep) onboardingStep.textContent = message;
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
  if (routeKey !== 'near_me') return {};

  try {
    const coords = await getCurrentBrowserLocation();
    nearMeState.coords = coords;
    nearMeState.error = null;
    console.log('Miro Near me location acquired locally.');
    return {
      center: coords,
      locationSource: 'browser_geolocation',
    };
  } catch (error) {
    nearMeState.coords = null;
    nearMeState.error = error;
    console.warn('Miro Near me geolocation failed; using mock fallback.', error);
    return {
      locationError: 'Near me could not access your browser location, so this route uses a safe fallback.',
    };
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
  const penaltyMultiplier = context.refinementKey === 'walk' ? 9 : 4.5;
  const longModePenalty = mobility.suggestedMode === 'transit_taxi_or_rental_car' ? 20 : 0;
  const maxPenalty = context.refinementKey === 'walk' ? 180 : 120;
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

function getAreaCandidates(places, areaConfig) {
  const usablePlaces = places.filter(place => place.name && hasValidCoords(place));
  const addressMatches = usablePlaces.filter(place => addressMatchesArea(place, areaConfig));
  const nearbyMatches = usablePlaces.filter(place => (
    distanceKm(place, areaConfig.center) <= areaConfig.radiusKm
  ));
  const merged = dedupeRuntimePlaces([...addressMatches, ...nearbyMatches]);
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

function getRouteTemplate(mode, refinementKey = null, routePreferences = null) {
  if (routePreferences?.shapeSequence?.length) {
    const shapeTemplate = routePreferences.shapeSequence
      .map(category => PRIMARY_CATEGORY_TO_MIRO_CATEGORY[category])
      .filter(Boolean);
    if (shapeTemplate.length) return shapeTemplate;
  }
  return REFINEMENT_TEMPLATES[refinementKey] || ROUTE_TEMPLATES[mode] || ROUTE_TEMPLATES.balanced;
}

function getPlaceSearchText(place) {
  return [
    place.name,
    place.displayName,
    place.categoryName,
    place.categoryCode,
    place.address,
    place.sourceList,
    place.sourceFile,
    place.sourceType,
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

function filterCandidatesForRefinement(candidates, refinementKey) {
  if (refinementKey === 'open') {
    return candidates.filter(place => getOpenNowValue(place) === true);
  }
  return candidates;
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
  const refinementKey = context.refinementKey;
  if (!refinementKey) return 0;

  const category = place.miroCategory || 'unknown';
  const text = getPlaceSearchText(place);
  let score = 0;

  if (refinementKey === 'walk') {
    const previousDistance = context.previousPlace ? distanceKm(place, context.previousPlace) : null;
    const centerDistance = distanceKm(place, context.areaConfig.center);
    if (Number.isFinite(previousDistance)) score -= Math.min(previousDistance * 35, 45);
    if (Number.isFinite(centerDistance)) score -= Math.min(centerDistance * 7, 28);
    if (['walk', 'cafe', 'eat'].includes(category)) score += 8;
  }

  if (refinementKey === 'local') {
    if (textHasAnyTerm(text, LOCAL_TERMS)) score += 24;
    if (place.sourcePriority > 0) score += Math.min(Number(place.sourcePriority), 12);
    if (place.isMatched === true) score += 8;
    if (category !== 'night') score += 5;
  }

  if (refinementKey === 'cheap') {
    if (['walk', 'cafe', 'see', 'shop', 'practical'].includes(category)) score += 18;
    if (textHasAnyTerm(text, BUDGET_CATEGORY_NAMES)) score += 20;
    if (['night', 'activity'].includes(category) || textHasAnyTerm(text, PREMIUM_CATEGORY_NAMES)) score -= 24;
  }

  if (refinementKey === 'cafe') {
    if (category === 'cafe') score += 36;
    if (text.includes('카페') || text.includes('coffee') || text.includes('cafe')) score += 16;
  }

  if (refinementKey === 'quiet') {
    if (['walk', 'cafe', 'see', 'shop'].includes(category)) score += 14;
    if (textHasAnyTerm(text, QUIET_TERMS)) score += 20;
    if (category === 'night' || textHasAnyTerm(text, TOURIST_HEAVY_TERMS)) score -= 28;
  }

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

function getRouteCategorySequence(moodContext, timeConfig, routePreferences = null) {
  if (routePreferences?.shapeSequence?.length) {
    return routePreferences.shapeSequence.slice(0, timeConfig.maxStops);
  }

  const primaryMood = moodContext.compositionKeys[0] || 'local_food';
  const template = MOOD_CATEGORY_SEQUENCES[primaryMood]?.[timeConfig.key]
    || MOOD_CATEGORY_SEQUENCES.local_food[timeConfig.key]
    || ['meal', 'cafe'];
  return template.slice(0, timeConfig.maxStops);
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

function getDataDrivenCandidates(places, areaConfig, timeConfig) {
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
  let matches = withDistance.filter(item => item.distanceM <= radiusM);

  if (matches.length < timeConfig.minStops) {
    matches = withDistance.filter(item => item.distanceM <= radiusM * 1.5);
  }

  return matches
    .map(item => ({ ...item.place, __distanceM: item.distanceM }))
    .sort((left, right) => left.__distanceM - right.__distanceM);
}

function scoreDataDrivenPlace(place, context) {
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
    const mobility = classifyLegMobility(context.previousPlace, place, DEFAULT_MAX_WALK_MINUTES);
    if (mobility.isWalkable) score += Math.max(0, 8 - mobility.estimatedWalkMinutes * 0.4);
    else score -= 18;
  }

  return score;
}

function selectDataDrivenPlace(candidates, context, selectedKeys, targetCategory = null) {
  const pool = targetCategory
    ? candidates.filter(place => place.primaryCategory === targetCategory)
    : candidates;
  const usablePool = pool.length ? pool : candidates;
  let best = null;
  let bestScore = -Infinity;

  usablePool.forEach(place => {
    const key = getRuntimePlaceKey(place);
    if (selectedKeys.has(key)) return;
    const score = scoreDataDrivenPlace(place, { ...context, targetCategory });
    if (score > bestScore) {
      best = place;
      bestScore = score;
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
    parts.push(`matches ${context.moodContext.labels.join(' + ')}`);
  } else if (context.moodContext.secondaryPreferred.includes(place.primaryCategory)) {
    parts.push('adds a supporting stop');
  }
  if (matchedTags.length) parts.push(`tag match: ${matchedTags.slice(0, 3).join(', ')}`);
  if (Number.isFinite(place.__distanceM)) parts.push(`${formatDistanceMeters(place.__distanceM)} from ${context.areaConfig.label}`);
  return parts.length ? parts.join(' · ') : 'Selected from local place data for this area.';
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

function buildDataDrivenRoute(routeKey, mood, refinementKey = null, runtimeContext = {}, options = {}) {
  const places = curatedPlaceState.places;
  if (!places.some(place => place.primaryCategory)) return null;

  if (routeKey === 'near_me' && !runtimeContext.center) {
    console.warn('Miro route source: near_me mock fallback because geolocation is unavailable.');
    return null;
  }

  const timeConfig = getTimeConfig(state.time);
  const moodContext = getMoodContext(mood);
  const areaConfig = getAreaConfig(routeKey, runtimeContext);
  const routePreferences = options.routePreferences || null;
  const candidates = filterCandidatesForRefinement(
    getDataDrivenCandidates(places, areaConfig, timeConfig),
    refinementKey
  );
  const scoredCandidates = candidates
    .map(place => ({ place, score: scoreDataDrivenPlace(place, {
      areaConfig,
      timeConfig,
      moodContext,
      categoryCounts: {},
      refinementKey,
      routePreferences,
      stopIndex: 0,
      isFinalStop: false,
      previousPlace: null,
    }) }))
    .filter(item => Number.isFinite(item.score) && item.score > 0)
    .sort((left, right) => right.score - left.score)
    .map(item => item.place);

  console.log('Miro local route diagnostics:', {
    placesLoaded: places.length,
    validCoords: places.filter(hasValidCoords).length,
    area: areaConfig.label,
    radiusM: Math.round(getAreaRadiusM(areaConfig)),
    candidatesAfterArea: candidates.length,
    candidatesAfterMoodScoring: scoredCandidates.length,
  });

  if (scoredCandidates.length < timeConfig.minStops) return null;

  const selected = [];
  const selectedKeys = new Set();
  const categoryCounts = {};
  const sequence = getRouteCategorySequence(moodContext, timeConfig, routePreferences);
  const requiredCategories = getMoodRequiredPrimaryCategories(moodContext);

  sequence.slice(0, timeConfig.maxStops).forEach((targetCategory, stopIndex) => {
    const place = selectDataDrivenPlace(scoredCandidates, {
      areaConfig,
      timeConfig,
      moodContext,
      categoryCounts,
      refinementKey,
      routePreferences,
      stopIndex,
      isFinalStop: stopIndex === timeConfig.maxStops - 1,
      previousPlace: selected[selected.length - 1] || null,
    }, selectedKeys, targetCategory);
    if (!place) return;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.primaryCategory] = (categoryCounts[place.primaryCategory] || 0) + 1;
  });

  while (selected.length < timeConfig.minStops) {
    const place = selectDataDrivenPlace(scoredCandidates, {
      areaConfig,
      timeConfig,
      moodContext,
      categoryCounts,
      refinementKey,
      routePreferences,
      stopIndex: selected.length,
      isFinalStop: selected.length === timeConfig.maxStops - 1,
      previousPlace: selected[selected.length - 1] || null,
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
      areaConfig,
      timeConfig,
      moodContext,
      categoryCounts,
      refinementKey,
      routePreferences,
    },
    selectedKeys,
    categoryCounts,
    requiredCategories
  );

  if (!hasRequiredCategory) return null;

  enforceDataDrivenPinnedPreferences(
    selected,
    candidates,
    {
      areaConfig,
      timeConfig,
      moodContext,
      categoryCounts,
      refinementKey,
      routePreferences,
    },
    selectedKeys,
    categoryCounts,
    routePreferences,
    requiredCategories
  );

  if (selected.length < timeConfig.minStops) return null;

  const orderedPlaces = routePreferences?.shapeSequence?.length
    ? selected.slice(0, timeConfig.maxStops)
    : orderPlacesNearestNeighbor(selected.slice(0, timeConfig.maxStops), areaConfig.center);
  const routeContext = { areaConfig, timeConfig, moodContext };
  const stops = orderedPlaces.map((place, index) => (
    dataPlaceToRouteStop(place, index, orderedPlaces[index - 1], orderedPlaces.length, routeContext)
  ));
  const travelMinutes = stops.reduce((sum, stop) => sum + Number(stop.walk || 0), 0);
  const walkingMinutes = stops.reduce((sum, stop) => (
    stop.legSuggestedMode === 'walk' ? sum + Number(stop.walk || 0) : sum
  ), 0);
  const stayMinutes = stops.reduce((sum, stop) => sum + Number(stop.stay || 0), 0);
  const distanceMeters = stops.reduce((sum, stop) => sum + Number(stop.legDistanceMeters || 0), 0);

  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: getRouteCenter(stops) || areaConfig.center,
    defaultMood: moodContext.labels.join(' + '),
    meta: {
      total: formatMinutes(stayMinutes + travelMinutes),
      walking: `${walkingMinutes} min`,
      distance: formatDistanceMeters(distanceMeters),
    },
    why: appendRoutePreferenceExplanation([
      `Generated from the local subcategorized place dataset for ${areaConfig.label}.`,
      `Time: ${timeConfig.label}. Mood: ${moodContext.labels.join(' + ')}.`,
      'Stops are ranked by area distance, category fit, tag match, route role, stay time, and availability.',
    ].join(' '), routePreferences),
    ask: {
      why: `This route is generated from local place data and ranked for ${areaConfig.label}, ${timeConfig.label}, and ${moodContext.labels.join(' + ')}.`,
      crowd: 'This prototype does not check live crowd levels, but it favors closer local candidates and existing category tags.',
      cafe: 'I can prioritize cafe and dessert categories when the selected mood supports it.',
    },
    sourceKind: 'local_dataset',
    sourceLabel: 'Local place dataset',
    mode: getRouteMode(mood),
    refinementKey,
    stops,
  };
}

function buildCuratedRoute(routeKey, mood, refinementKey = null, runtimeContext = {}, options = {}) {
  const dataDrivenRoute = buildDataDrivenRoute(routeKey, mood, refinementKey, runtimeContext, options);
  if (dataDrivenRoute) {
    console.log('Miro route source: local dataset');
    return dataDrivenRoute;
  }

  return buildLegacyCuratedRoute(routeKey, mood, refinementKey, options);
}

function buildLegacyCuratedRoute(routeKey, mood, refinementKey = null, options = {}) {
  const places = curatedPlaceState.places;
  if (!places.length) return null;

  const areaConfig = getAreaConfig(routeKey);
  const moodContext = getMoodContext(mood);
  const mode = getRouteMode(mood);
  const routePreferences = options.routePreferences || null;
  const template = getRouteTemplate(mode, refinementKey, routePreferences);
  const candidates = filterCandidatesForRefinement(getAreaCandidates(places, areaConfig), refinementKey);
  if (!candidates.length) return null;

  const selected = [];
  const selectedKeys = new Set();
  const categoryCounts = {};
  const maxStops = Math.min(refinementKey === 'walk' ? 3 : 4, candidates.length);
  const maxWalkMinutes = getMaxWalkMinutesForRefinement(refinementKey);
  const requiredCategories = getMoodRequiredPrimaryCategories(moodContext);

  template.slice(0, maxStops).forEach(targetCategory => {
    const exactMatches = candidates.filter(place => place.miroCategory === targetCategory);
    const context = {
      areaConfig,
      mode,
      targetCategory,
      categoryCounts,
      refinementKey,
      routePreferences,
      maxWalkMinutes,
      previousPlace: selected[selected.length - 1] || null,
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
      refinementKey,
      routePreferences,
      maxWalkMinutes,
      previousPlace: selected[selected.length - 1] || null,
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
      refinementKey,
      routePreferences,
      maxWalkMinutes,
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
      refinementKey,
      routePreferences,
      maxWalkMinutes,
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
  const estimatedTravelMinutes = stops.reduce((sum, stop) => sum + Number(stop.walk || 0), 0);
  const walkingMinutes = stops.reduce((sum, stop) => (
    stop.legSuggestedMode === 'walk' ? sum + Number(stop.walk || 0) : sum
  ), 0);
  const stayMinutes = stops.reduce((sum, stop) => sum + Number(stop.stay || 0), 0);

  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: getRouteCenter(stops) || areaConfig.center,
    defaultMood: state.mood,
    meta: {
      total: formatMinutes(stayMinutes + estimatedTravelMinutes),
      walking: `${walkingMinutes} min`,
    },
    why: appendRoutePreferenceExplanation(buildRouteWhy(areaConfig.label, refinementKey), routePreferences),
    ask: {
      why: `This route uses processed Naver place data first, then ranks places for ${areaConfig.label} and your selected mood.`,
      crowd: 'I can prefer quieter categories and nearby side-street matches, but this static version does not check live crowd levels.',
      cafe: 'I can prioritize cafe-category saved places when the curated list has enough nearby candidates.',
    },
    sourceKind: 'processed',
    sourceLabel: 'Real Naver places',
    mode,
    refinementKey,
    stops,
  };
}

function buildRouteWhy(areaLabel, refinementKey = null) {
  const base = `Built from the processed Naver place dataset for ${areaLabel}. Stops are ranked by category fit, area match, availability, and saved-list priority.`;
  if (!refinementKey) return base;
  const refinements = {
    walk: ' This version adds a compactness preference using stop coordinates.',
    local: ' This version gives extra weight to local, hidden, and saved-list signals.',
    cheap: ' This version leans toward budget-friendly categories without estimating prices.',
    cafe: ' This version gives extra weight to cafe-category places.',
    quiet: ' This version de-prioritizes tourist-heavy and nightlife-heavy signals where identifiable.',
    open: ' This version only uses places with an explicit open-now field marked true.',
  };
  return `${base}${refinements[refinementKey] || ''}`;
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
  return `${sourceTag} · ${category}${place.address ? ` near ${place.address}` : ''}.${status}`;
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

function buildMockFallbackRoute(routeKey, notice = '') {
  const mockRouteKey = MOCK_ROUTE_KEY_ALIASES[routeKey] || routeKey;
  const fallback = ROUTES[mockRouteKey] || ROUTES.hongdae;
  console.warn('Miro route source: mock');
  return {
    ...fallback,
    why: notice ? `${notice} ${fallback.why}` : fallback.why,
    sourceKind: 'mock',
    sourceLabel: 'Prototype fallback',
    fallbackNotice: notice,
  };
}

function buildEmptyRealRoute(routeKey, message) {
  const areaConfig = getAreaConfig(routeKey);
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
    sourceLabel: 'Real Naver places',
    mode: getRouteMode(state.mood),
    stops: [],
  };
}

function resolveRouteForCurrentSelection(routeKey, refinementKey = state.activeRefinement, runtimeContext = {}, options = {}) {
  const realRoute = buildCuratedRoute(routeKey, state.mood, refinementKey, runtimeContext, options);
  if (realRoute) {
    return realRoute;
  }

  if (MOCK_ROUTES_ENABLED) {
    return buildMockFallbackRoute(routeKey, 'Using prototype fallback because mock mode is enabled.');
  }

  if (curatedPlaceState.failed) {
    return buildMockFallbackRoute(routeKey, 'Local place data could not be loaded, so this is a prototype fallback.');
  }

  if (!curatedPlaceState.places.length) {
    return buildMockFallbackRoute(routeKey, 'No local places are loaded yet, so this is a prototype fallback.');
  }

  const notice = runtimeContext.locationError
    || 'Not enough local dataset places matched this area, time, and mood, so this is a prototype fallback.';
  return buildMockFallbackRoute(routeKey, notice);
}

const AREA_KEY_BY_LABEL = Object.values(ROUTES).reduce((acc, route) => {
  acc[route.label.toLowerCase()] = route.label.toLowerCase();
  return acc;
}, {});

const LOADING_STEPS = [
  'Reading the streets of {area}',
  'Asking who\'s actually there',
  'Skipping the busy main strip',
  'Picking 4 stops that fit your time',
  'Drawing your route',
];

const REFINE_TEXTS = {
  walk: { applied: 'Refined for a more compact route.', undo: 'Removed the compact-route refinement.' },
  local: { applied: 'Refined toward local and saved-list signals.', undo: 'Removed the local-first refinement.' },
  cheap: { applied: 'Refined toward budget-friendly categories.', undo: 'Removed the budget-friendly refinement.' },
  cafe: { applied: 'Refined toward more cafe stops.', undo: 'Removed the cafe-forward refinement.' },
  quiet: { applied: 'Refined toward quieter and less tourist-heavy stops.', undo: 'Removed the quiet-route refinement.' },
  open: {
    applied: 'Refined to places marked open now.',
    undo: 'Removed the open-now refinement.',
    unavailable: 'Open-now data is not available for these saved places yet.',
  },
};

const SAVED_ROUTES_STORAGE_KEY = 'kandid_spot_saved_routes';

const REFINEMENT_TEMPLATES = {
  walk: ['cafe', 'walk', 'eat'],
  cheap: ['walk', 'cafe', 'eat', 'see'],
  cafe: ['cafe', 'cafe', 'walk', 'cafe'],
  quiet: ['walk', 'cafe', 'see', 'shop'],
  local: ['eat', 'cafe', 'walk', 'shop'],
};

const BUDGET_CATEGORY_NAMES = ['분식', '김밥', '국수', '라면', '라멘', '만두', '백반', '시장', '카페', 'coffee', 'cafe'];
const PREMIUM_CATEGORY_NAMES = ['오마카세', '파인다이닝', '스테이크', '와인', '칵테일', 'bar', 'pub'];
const LOCAL_TERMS = ['골목', '동네', '로컬', 'local', 'hidden', '숨은', '찐', '노포', '시장', 'backstreet'];
const QUIET_TERMS = ['조용', 'quiet', 'calm', '한적', '골목', '산책', '공원', 'walk', 'garden'];
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

const ASK_RESPONSES = {
  why: route => route.ask.why,
  crowd: route => route.ask.crowd,
  time: route => `Yes — for ${route.label}, cut stop 4 and trim the longest stay. You can keep the first three stops to about 90 minutes.`,
  cafe: route => route.ask.cafe,
  cheap: route => `I can keep ${route.label} budget-friendly by making stop 1 the main spend and turning the last stop into a browse-only stop.`,
  open: route => `For this real saved-place route, I am not checking live hours yet. Before going, verify ${route.stops.map(stop => stop.name).slice(0, 2).join(' and ')} first.`,
};

// ========== State ==========
const state = {
  area: 'Hongdae',
  time: '2 hours',
  mood: 'Local food',
  shape: null,
  refine: {},
  applied: new Set(),
  activeRefinement: null,
  activeStop: null,
  routeKey: 'hongdae',
};

let currentRoute = null;
let realPlacesLoadPromise = null;
const nearMeState = {
  coords: null,
  error: null,
};

// ========== Builder collapse ==========
const builderToggle = document.getElementById('builder-toggle');
const builder = document.getElementById('builder');
const builderToggleLabel = document.getElementById('rs-toggle-label');

function setBuilderCollapsed(collapsed) {
  builder.classList.toggle('collapsed', collapsed);
  builderToggle.classList.toggle('collapsed', collapsed);
  builderToggle.setAttribute('aria-expanded', String(!collapsed));
  if (builderToggleLabel) {
    builderToggleLabel.textContent = collapsed ? 'Edit' : 'Hide';
  }
}

builderToggle.addEventListener('click', () => {
  const willCollapse = !builder.classList.contains('collapsed');
  setBuilderCollapsed(willCollapse);
});

// ========== Chip selection ==========
document.querySelectorAll('[data-group]').forEach(row => {
  row.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    state[row.dataset.group] = btn.dataset.value;
  });
});

// ========== Build new route ==========
const buildBtn = document.getElementById('build-btn');
const loadingState = document.getElementById('loading-state');
const loadingStep = document.getElementById('loading-step');
const rsSummary = document.getElementById('rs-summary');

buildBtn.addEventListener('click', () => {
  document.querySelectorAll('#main-app .builder [data-group]').forEach(group => {
    const sel = group.querySelector('.chip.selected');
    if (sel) state[group.dataset.group] = sel.dataset.value;
  });

  loadingState.classList.add('active');
  const steps = LOADING_STEPS.map(s => s.replace('{area}', state.area));
  let i = 0;
  loadingStep.textContent = steps[0];
  const interval = setInterval(() => {
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      finishBuild().finally(() => {
        loadingState.classList.remove('active');
      });
    } else {
      loadingStep.textContent = steps[i];
    }
  }, 460);
});

async function finishBuild() {
  await applyRouteForCurrentSelection();
  const why = document.querySelector('.why-card');
  why.style.transition = 'transform 0.3s, box-shadow 0.3s';
  why.style.transform = 'scale(1.015)';
  why.style.boxShadow = '0 8px 20px -6px rgba(245, 158, 11, 0.35)';
  setTimeout(() => {
    why.style.transform = '';
    why.style.boxShadow = '';
  }, 350);
  showToast(`✓ New route built for ${currentRoute.label}`);
}

// ========== Route state + rendering ==========
function getRouteKey(area) {
  const normalized = String(area || '').trim().toLowerCase();
  return (
    AREA_KEY_ALIASES[normalized] ||
    AREA_KEY_BY_LABEL[normalized] ||
    'hongdae'
  );
}

async function applyRouteForCurrentSelection() {
  state.routeKey = getRouteKey(state.area);
  const runtimeContext = await getRouteRuntimeContext(state.routeKey);
  const routePreferences = getOptionalRoutePreferences();
  applyResolvedRoute(resolveRouteForCurrentSelection(
    state.routeKey,
    state.activeRefinement,
    runtimeContext,
    { routePreferences }
  ));
}

function applyResolvedRoute(route) {
  currentRoute = route;
  const routeToken = bumpRouteRenderToken();
  // Preserve the user's onboarding selection (e.g. 'Hongdae / Yeonnam' or
  // 'Near me') in state.area so inline-builder chip sync and onboarding restart
  // still recognize it. Route display continues to use currentRoute.label.
  state.activeStop = null;
  resetRouteGeometryCache();
  clearRouteOverlays();

  updateRouteCopy();
  renderStops();
  hideFloatCard();
  updateMarkerActive();

  if (isMainAppVisible() || kakaoMapState.map || naverMapState.map) {
    renderActiveMapRoute({ fit: true, routeToken });
  }
}

function updateRouteCopy() {
  const sourceLabel = currentRoute.sourceLabel;
  rsSummary.textContent = [currentRoute.label, state.time, state.mood, sourceLabel].filter(Boolean).join(' · ');
  document.getElementById('map-location-label').textContent = currentRoute.mapLabel;
  document.getElementById('why-body').textContent = currentRoute.why;

  setRouteMetaDefault();
}

function setRouteMetaItem(index, value, label) {
  const metaValues = document.querySelectorAll('.route-meta strong');
  const valueEl = metaValues[index];
  if (!valueEl) return;

  valueEl.textContent = value;

  const item = valueEl.parentElement;
  if (!item) return;

  const textNode = Array.from(item.childNodes).find(node => node.nodeType === 3);
  if (textNode) {
    textNode.nodeValue = ` ${label}`;
  }
}

function setRouteMetaDefault() {
  setRouteMetaItem(0, String(currentRoute.stops.length), 'stops');
  setRouteMetaItem(1, currentRoute.meta.total, 'total');
  setRouteMetaItem(2, [currentRoute.meta.walking, currentRoute.meta.distance].filter(Boolean).join(' · '), 'walking');
}

function setNaverDirectionsMeta(directions) {
  setRouteMetaItem(0, String(currentRoute.stops.length), 'stops');
  setRouteMetaItem(1, directions.durationText, 'Naver ETA');
  setRouteMetaItem(2, directions.distanceText, 'real route');
}

function renderStops() {
  const list = document.getElementById('stops');
  list.innerHTML = '';
  const activeProvider = getActiveMapProvider();

  if (!currentRoute.stops.length) {
    const item = document.createElement('div');
    item.className = 'stop';
    item.innerHTML = `
      <div class="stop-body">
        <div class="stop-name">No matching real places found</div>
        <div class="stop-type">Try another area or mood once the real places dataset is loaded.</div>
      </div>
    `;
    list.appendChild(item);
    return;
  }

  currentRoute.stops.forEach((s, idx) => {
    if (s.walk > 0) {
      const w = document.createElement('div');
      w.className = 'stop-walk';
      const mobilityLabel = s.legMobilityLabel || `${s.walk} min walk`;
      w.innerHTML = `<span>${escapeHtml(mobilityLabel)}</span>`;
      list.appendChild(w);
    }
    const item = document.createElement('div');
    item.className = 'stop';
    item.dataset.idx = idx;

    const place = s.place || {};
    const roleLabel =
      place.primaryCategoryLabel ||
      place.subCategoryLabel ||
      MIRO_CATEGORY_LABELS[place.miroCategory] ||
      place.categoryName ||
      'Stop';
    const why = String(s.why || '').trim();

    const actions = [];
    const providerOpenAction = renderProviderOpenButton(place, s.name, activeProvider);
    if (providerOpenAction) actions.push(providerOpenAction);
    actions.push(
      `<button class="ks-stop-link ks-stop-replace" type="button" disabled aria-disabled="true" title="Coming soon">↻ Replace</button>`
    );

    item.innerHTML = `
      <div class="stop-num-col">
        <div class="stop-num">${s.num}</div>
        <div class="stop-line"></div>
      </div>
      <div class="stop-body">
        <span class="ks-stop-role">${escapeHtml(roleLabel)}</span>
        <div class="stop-name">${escapeHtml(s.name)}</div>
        <div class="stop-type">${escapeHtml(s.type)}</div>
        ${why ? `<div class="ks-stop-why">${escapeHtml(why)}</div>` : ''}
        <div class="stop-meta">
          <span class="stop-tag">⏱ ${s.stay} min</span>
          ${(s.tags || []).map(t => `<span class="stop-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="ks-stop-actions">${actions.join('')}</div>
      </div>
    `;
    item.addEventListener('click', () => activateStop(idx));
    list.appendChild(item);
  });
}

// ========== Map Providers ==========
const MAP_PROVIDER_STORAGE_KEY = 'miro_map_provider';
const MAP_PROVIDERS = new Set(['kakao', 'naver']);

function getInitialMapProvider() {
  try {
    const storedProvider = window.localStorage.getItem(MAP_PROVIDER_STORAGE_KEY);
    if (MAP_PROVIDERS.has(storedProvider)) return storedProvider;
  } catch (error) {
    // Remembering the provider is optional.
  }
  return 'kakao';
}

const mapProviderState = {
  active: getInitialMapProvider(),
};

function getActiveMapProvider() {
  return MAP_PROVIDERS.has(mapProviderState.active) ? mapProviderState.active : 'kakao';
}

function getProviderOpenLink(place = {}, fallbackName, provider = getActiveMapProvider()) {
  if (provider === 'naver') {
    const naverUrl = typeof place.naverMapUrl === 'string' ? place.naverMapUrl.trim() : '';
    return naverUrl ? { source: 'naver', mark: 'N', label: 'Open in Naver', url: naverUrl } : null;
  }

  const lat = Number(place.lat);
  const lng = Number(place.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const placeLabel = place.displayName || place.name || fallbackName || 'Place';
  return {
    source: 'kakao',
    mark: 'K',
    label: 'Open in Kakao',
    url: `https://map.kakao.com/link/map/${encodeURIComponent(placeLabel)},${lat},${lng}`,
  };
}

function renderProviderOpenButton(place = {}, fallbackName, provider = getActiveMapProvider()) {
  const link = getProviderOpenLink(place, fallbackName, provider);
  if (!link) return '';

  return (
    `<a class="ks-stop-link" data-source="${link.source}" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">` +
      `<span class="ks-link-mark">${link.mark}</span>${link.label}</a>`
  );
}

const kakaoMapState = {
  map: null,
  sdkPromise: null,
  markers: [],
  polyline: null,
  requested: false,
};

const naverMapState = {
  map: null,
  sdkPromise: null,
  markers: [],
  polyline: null,
  requested: false,
  directionsKey: '',
  directions: null,
  directionsPromise: null,
};

const routeGeometryState = {
  key: '',
  geometry: null,
  promise: null,
  tmapCache: new Map(),
  tmapWarnedKeys: new Set(),
};

const mapStage = document.getElementById('map-stage');
const mapStatus = document.getElementById('map-status');
const kakaoMapLoggedErrors = new Set();
const naverMapLoggedErrors = new Set();
let mapSwitchToken = 0;
let routeRenderToken = 0;

function bumpRouteRenderToken() {
  routeRenderToken += 1;
  return routeRenderToken;
}

function isStaleMapRender(providerToken, routeToken) {
  return providerToken !== mapSwitchToken || routeToken !== routeRenderToken;
}

function isMainAppVisible() {
  const mainApp = document.getElementById('main-app');
  return Boolean(mainApp && !mainApp.classList.contains('hidden'));
}

function logKakaoMapError(message) {
  if (kakaoMapLoggedErrors.has(message)) return;
  console.error(message);
  kakaoMapLoggedErrors.add(message);
}

function logNaverMapError(message) {
  if (naverMapLoggedErrors.has(message)) return;
  console.error(message);
  naverMapLoggedErrors.add(message);
}

// Static prototype config: Vercel runtime global, then local development fallbacks.
function getKakaoAppKey() {
  const configuredKey = (window.MIRO_KAKAO_APP_KEY || '').trim();
  if (configuredKey) return configuredKey;

  const params = new URLSearchParams(window.location.search);
  const queryKey = params.get('kakao_app_key') || params.get('kakaoKey');
  if (queryKey) {
    try {
      window.localStorage.setItem('miro_kakao_app_key', queryKey.trim());
    } catch (error) {
      // localStorage persistence is optional for the static prototype.
    }
    return queryKey.trim();
  }

  const windowKey = (window.KAKAO_JAVASCRIPT_KEY || '').trim();
  if (windowKey) return windowKey;

  const metaKey = (document.querySelector('meta[name="miro-kakao-app-key"]')?.content || '').trim();
  if (metaKey) return metaKey;

  try {
    return (window.localStorage.getItem('miro_kakao_app_key') || '').trim();
  } catch (error) {
    return '';
  }
}

function getNaverMapsKeyId() {
  const candidates = [
    {
      source: 'window',
      value: window.MIRO_NAVER_MAPS_NCP_KEY_ID,
    },
    {
      source: 'meta',
      value: document.querySelector('meta[name="miro-naver-maps-ncp-key-id"]')?.content,
    },
    {
      source: 'localStorage',
      value: (() => {
        try {
          return window.localStorage.getItem('miro_naver_maps_ncp_key_id');
        } catch (error) {
          return '';
        }
      })(),
    },
    {
      source: 'query',
      value: new URLSearchParams(window.location.search).get('naver_maps_ncp_key_id'),
    },
  ];

  const match = candidates.find(candidate => String(candidate.value || '').trim());
  const key = match ? String(match.value).trim() : '';

  if (key) {
    window.MIRO_NAVER_MAPS_NCP_KEY_ID = key;
    console.log(`Naver key source: ${match.source}`);
  }
  console.log(`Resolved Naver key exists: ${Boolean(key)}`);

  return key;
}

function ensureActiveMap(options = {}) {
  if (mapProviderState.active === 'naver') {
    ensureNaverMap(0, options);
    return;
  }
  ensureKakaoMap(options);
}

function renderActiveMapRoute({ fit = false, routeToken = routeRenderToken } = {}) {
  if (mapProviderState.active === 'naver') {
    renderNaverRoute({ fit, routeToken });
    return;
  }
  renderKakaoRoute({ fit, routeToken });
}

function setMapProvider(provider) {
  if (!MAP_PROVIDERS.has(provider)) return;

  if (mapProviderState.active !== provider) {
    mapSwitchToken++;
    clearRenderedMaps();
    mapProviderState.active = provider;
    try {
      window.localStorage.setItem(MAP_PROVIDER_STORAGE_KEY, provider);
    } catch (error) {
      // Remembering the provider is optional.
    }
  }

  syncMapProviderButtons();
  renderStops();
  hideFloatCard();
  if (provider !== 'naver') {
    setRouteMetaDefault();
  }
  ensureActiveMap();
}

function syncMapProviderButtons() {
  document.querySelectorAll('[data-map-provider]').forEach(button => {
    const isActive = button.dataset.mapProvider === mapProviderState.active;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function clearRenderedMaps() {
  clearKakaoRouteObjects();
  clearNaverRouteObjects();
  kakaoMapState.map = null;
  naverMapState.map = null;
  resetMapContainer();
}

function getMapElement() {
  return document.getElementById('kakao-map');
}

function resetMapContainer() {
  const mapEl = getMapElement();
  if (!mapEl) return;

  const freshMapEl = document.createElement('div');
  freshMapEl.id = 'kakao-map';
  freshMapEl.className = 'kakao-map';
  freshMapEl.setAttribute('role', mapEl.getAttribute('role') || 'application');
  freshMapEl.setAttribute(
    'aria-label',
    mapEl.getAttribute('aria-label') || 'Kakao map showing the selected route'
  );
  mapEl.replaceWith(freshMapEl);
}

function ensureKakaoMap({ routeToken = routeRenderToken } = {}) {
  kakaoMapState.requested = true;

  const mapEl = getMapElement();
  if (!mapEl) {
    logKakaoMapError('map container missing');
    return;
  }

  if (kakaoMapState.map) {
    relayoutKakaoMap();
    renderKakaoRoute({ fit: true, routeToken });
    return;
  }

  const appKey = getKakaoAppKey();
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    setMapStatus('Kakao map needs a JavaScript key. Set window.MIRO_KAKAO_APP_KEY, the meta tag, localStorage key miro_kakao_app_key, or add ?kakao_app_key=YOUR_KEY.', 'warning');
    return;
  }

  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;
  setMapStatus('Loading Kakao Map…', 'loading');
  loadKakaoSdk(appKey)
    .then(() => {
      if (isStaleMapRender(renderToken, renderRouteToken)) return;
      if (mapProviderState.active !== 'kakao') return;

      const mapEl = getMapElement();
      if (!mapEl) {
        logKakaoMapError('map container missing');
        return;
      }

      const center = new window.kakao.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      kakaoMapState.map = new window.kakao.maps.Map(mapEl, {
        center,
        level: 4,
      });

      window.kakao.maps.event.addListener(kakaoMapState.map, 'click', () => {
        hideFloatCard();
      });

      hideMapStatus();
      window.requestAnimationFrame(() => {
        if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'kakao') return;
        relayoutKakaoMap();
        renderKakaoRoute({ fit: true, routeToken: renderRouteToken });
      });
    })
    .catch(() => {
      kakaoMapState.sdkPromise = null;
      if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'kakao') return;
      setMapStatus('Kakao Map could not load. Check the JavaScript key, allowed domains, and network access.', 'error');
    });
}

function loadKakaoSdk(appKey = getKakaoAppKey()) {
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    return Promise.reject(new Error('Missing window.MIRO_KAKAO_APP_KEY'));
  }

  if (window.kakao && window.kakao.maps) {
    return new Promise(resolve => {
      window.kakao.maps.load(() => resolve(window.kakao));
    });
  }

  if (kakaoMapState.sdkPromise) {
    return kakaoMapState.sdkPromise;
  }

  kakaoMapState.sdkPromise = new Promise((resolve, reject) => {
    const finishLoad = () => {
      if (!window.kakao) {
        logKakaoMapError('window.kakao missing after SDK script load');
        reject(new Error('window.kakao missing after SDK script load'));
        return;
      }

      if (!window.kakao.maps) {
        logKakaoMapError('window.kakao.maps missing after SDK script load');
        reject(new Error('window.kakao.maps missing after SDK script load'));
        return;
      }

      window.kakao.maps.load(() => resolve(window.kakao));
    };

    const failLoad = () => {
      logKakaoMapError('SDK script failed to load');
      reject(new Error('SDK script failed to load'));
    };

    let script = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
    let shouldAppendScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`;
      script.async = true;
      shouldAppendScript = true;
    }

    script.addEventListener('load', finishLoad, { once: true });
    script.addEventListener('error', failLoad, { once: true });

    if (shouldAppendScript) {
      document.head.appendChild(script);
    }
  });

  return kakaoMapState.sdkPromise;
}

function getMapContainerSize(mapEl) {
  if (!mapEl) return { width: 0, height: 0 };

  const rect = mapEl.getBoundingClientRect();
  return {
    width: Math.round(rect.width || mapEl.offsetWidth || mapEl.clientWidth || 0),
    height: Math.round(rect.height || mapEl.offsetHeight || mapEl.clientHeight || 0),
  };
}

function getLoggedNaverMapContainerSize(mapEl) {
  const size = getMapContainerSize(mapEl);
  console.log(`Naver map container size: ${size.width} ${size.height}`);
  return size;
}

function scheduleNaverMapRetry(renderToken, routeToken, attempt) {
  if (attempt >= 10) {
    setMapStatus('Naver map is waiting for the map container to become visible.', 'warning');
    return;
  }

  const retry = () => {
    if (isStaleMapRender(renderToken, routeToken)) return;
    if (mapProviderState.active !== 'naver') return;
    if (naverMapState.map) return;
    ensureNaverMap(attempt + 1, { routeToken });
  };

  if (attempt < 2) {
    window.requestAnimationFrame(retry);
    return;
  }

  window.setTimeout(retry, 120);
}

function ensureNaverMap(attempt = 0, { routeToken = routeRenderToken } = {}) {
  naverMapState.requested = true;

  const mapEl = getMapElement();
  if (!mapEl) {
    logNaverMapError('Naver map container missing');
    return;
  }

  if (naverMapState.map) {
    relayoutNaverMap();
    renderNaverRoute({ fit: true, routeToken });
    return;
  }

  const ncpKeyId = getNaverMapsKeyId();
  if (!ncpKeyId) {
    logNaverMapError('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID');
    setMapStatus('Naver map needs an NCP Key ID. Set window.MIRO_NAVER_MAPS_NCP_KEY_ID via Vercel environment variables.', 'warning');
    return;
  }

  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;
  setMapStatus('Loading Naver Map…', 'loading');
  loadNaverSdk(ncpKeyId)
    .then(() => {
      if (isStaleMapRender(renderToken, renderRouteToken)) return;
      if (mapProviderState.active !== 'naver') return;
      if (!window.naver || !window.naver.maps) return;
      if (naverMapState.map) {
        relayoutNaverMap();
        renderNaverRoute({ fit: true, routeToken: renderRouteToken });
        return;
      }

      const mapEl = getMapElement();
      if (!mapEl) {
        logNaverMapError('Naver map container missing');
        return;
      }

      const size = getLoggedNaverMapContainerSize(mapEl);
      if (!size.width || !size.height) {
        scheduleNaverMapRetry(renderToken, renderRouteToken, attempt);
        return;
      }

      const center = new window.naver.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      naverMapState.map = new window.naver.maps.Map(mapEl, {
        center,
        zoom: 14,
      });
      console.log('Naver map initialized');

      window.naver.maps.Event.addListener(naverMapState.map, 'click', () => {
        hideFloatCard();
      });

      hideMapStatus();
      window.requestAnimationFrame(() => {
        if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'naver') return;
        relayoutNaverMap();
        renderNaverRoute({ fit: true, routeToken: renderRouteToken });
      });
    })
    .catch(() => {
      naverMapState.sdkPromise = null;
      if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'naver') return;
      setMapStatus('Naver Map could not load. Check the NCP Key ID, allowed domains, and network access.', 'error');
    });
}

function loadNaverSdk(ncpKeyId = getNaverMapsKeyId()) {
  if (!ncpKeyId) {
    logNaverMapError('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID');
    return Promise.reject(new Error('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID'));
  }

  if (window.naver && window.naver.maps) {
    console.log('Naver SDK already loaded');
    return Promise.resolve(window.naver);
  }

  if (naverMapState.sdkPromise) {
    return naverMapState.sdkPromise;
  }

  naverMapState.sdkPromise = new Promise((resolve, reject) => {
    const finishLoad = () => {
      if (!window.naver) {
        logNaverMapError('window.naver missing after SDK load');
        reject(new Error('window.naver missing after SDK load'));
        return;
      }

      if (!window.naver.maps) {
        logNaverMapError('window.naver.maps missing after SDK load');
        reject(new Error('window.naver.maps missing after SDK load'));
        return;
      }

      console.log('Naver SDK loaded');
      resolve(window.naver);
    };

    const failLoad = () => {
      logNaverMapError('Naver SDK script failed to load');
      reject(new Error('Naver SDK script failed to load'));
    };

    let script = document.querySelector('script[src*="oapi.map.naver.com/openapi/v3/maps.js"]');
    let shouldAppendScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(ncpKeyId)}`;
      script.async = true;
      shouldAppendScript = true;
    }
    console.log('Naver SDK load start');

    script.addEventListener('load', finishLoad, { once: true });
    script.addEventListener('error', failLoad, { once: true });

    if (shouldAppendScript) {
      document.head.appendChild(script);
    }
  });

  return naverMapState.sdkPromise;
}

function renderKakaoRoute({ fit = false, routeToken = routeRenderToken } = {}) {
  if (routeToken !== routeRenderToken) return;

  if (!kakaoMapState.map) {
    ensureKakaoMap({ routeToken });
    return;
  }

  if (!window.kakao || !window.kakao.maps) {
    loadKakaoSdk()
      .then(() => {
        if (routeToken !== routeRenderToken) return;
        renderKakaoRoute({ fit, routeToken });
      })
      .catch(() => {
        kakaoMapState.sdkPromise = null;
      });
    return;
  }

  clearKakaoRouteObjects();

  const stopsWithCoords = getStopsWithCoords();
  if (!stopsWithCoords.length) return;

  const geometryKey = getCurrentRouteGeometryKey();
  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;

  kakaoMapState.markers = currentRoute.stops.map(() => null);
  stopsWithCoords.forEach(({ stop, index }, markerIndex) => {
    const position = new window.kakao.maps.LatLng(stop.coords.lat, stop.coords.lng);
    const content = createKakaoMarkerElement(stop, index);
    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content,
      xAnchor: 0.5,
      yAnchor: 1.05,
      zIndex: 100 + index,
    });

    overlay.setMap(kakaoMapState.map);
    kakaoMapState.markers[index] = { overlay, element: content, position };
  });

  updateMarkerActive();
  if (fit) fitKakaoRouteBounds();

  resolveCurrentRouteGeometry().then(geometry => {
    if (!geometry || mapProviderState.active !== 'kakao' || !kakaoMapState.map) return;
    if (isStaleMapRender(renderToken, renderRouteToken) || geometryKey !== getCurrentRouteGeometryKey()) return;

    syncRouteGeometryLabelUpdates(geometry);
    if (Array.isArray(geometry.segments) && geometry.segments.length) {
      renderKakaoRouteSegments(geometry.segments);
      if (fit) fitKakaoRouteBounds(geometry.path);
    }
  });
}

function getNaverDirectionsPoints(stopsWithCoords) {
  return stopsWithCoords.map(({ stop }) => ({
    lat: stop.coords.lat,
    lng: stop.coords.lng,
  })).slice(0, 7);
}

function getNaverDirectionsKey(points) {
  return points.map(point => `${point.lng},${point.lat}`).join('|');
}

function buildNaverDirectionsUrl(points) {
  const params = new URLSearchParams();
  const start = points[0];
  const goal = points[points.length - 1];
  const waypoints = points.slice(1, -1).slice(0, 5);

  params.set('startLng', start.lng);
  params.set('startLat', start.lat);
  params.set('goalLng', goal.lng);
  params.set('goalLat', goal.lat);

  if (waypoints.length) {
    params.set('waypoints', waypoints.map(point => `${point.lng},${point.lat}`).join('|'));
  }

  return `/api/naver-directions?${params.toString()}`;
}

function getNaverDirections(points) {
  if (points.length < 2) return Promise.resolve(null);

  const directionsKey = getNaverDirectionsKey(points);
  if (naverMapState.directionsKey === directionsKey && naverMapState.directions) {
    return Promise.resolve(naverMapState.directions);
  }

  if (naverMapState.directionsKey === directionsKey && naverMapState.directionsPromise) {
    return naverMapState.directionsPromise;
  }

  naverMapState.directionsKey = directionsKey;
  naverMapState.directions = null;
  console.log('Naver Directions request start');

  naverMapState.directionsPromise = fetch(buildNaverDirectionsUrl(points))
    .then(response => {
      if (!response.ok) {
        throw new Error(`Naver Directions returned ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      if (!payload || !payload.ok || !Array.isArray(payload.path) || payload.path.length < 2) {
        throw new Error('Naver Directions response did not include a usable path');
      }

      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directions = payload;
      }
      console.log('Naver Directions response ok');
      console.log(`Naver real route path points: ${payload.path.length}`);
      return payload;
    })
    .catch(error => {
      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directions = null;
      }
      console.warn('Naver real route unavailable; using straight-line fallback');
      return null;
    })
    .finally(() => {
      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directionsPromise = null;
      }
    });

  return naverMapState.directionsPromise;
}

function resetRouteGeometryCache() {
  routeGeometryState.key = '';
  routeGeometryState.geometry = null;
  routeGeometryState.promise = null;
  routeGeometryState.tmapCache.clear();
  routeGeometryState.tmapWarnedKeys.clear();
}

function routeCoordKey(value) {
  return Number(value).toFixed(6);
}

function getCurrentRouteGeometryKey() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return '';
  const threshold = getMaxWalkMinutesForRefinement(currentRoute.refinementKey);
  const pointsKey = currentRoute.stops
    .map(stop => {
      if (!hasValidCoords(stop.coords)) return 'missing';
      return `${routeCoordKey(stop.coords.lng)},${routeCoordKey(stop.coords.lat)}`;
    })
    .join('|');
  return `${currentRoute.refinementKey || 'default'}:${threshold}:${pointsKey}`;
}

function getRouteLegsWithCoords() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return [];

  const legs = [];
  for (let index = 1; index < currentRoute.stops.length; index += 1) {
    const fromStop = currentRoute.stops[index - 1];
    const toStop = currentRoute.stops[index];
    if (!hasValidCoords(fromStop.coords) || !hasValidCoords(toStop.coords)) continue;

    legs.push({
      index,
      fromStop,
      toStop,
      start: {
        lat: fromStop.coords.lat,
        lng: fromStop.coords.lng,
        name: fromStop.name || `Stop ${index}`,
      },
      end: {
        lat: toStop.coords.lat,
        lng: toStop.coords.lng,
        name: toStop.name || `Stop ${index + 1}`,
      },
    });
  }
  return legs;
}

function getTmapPedestrianKey(start, end) {
  return [
    routeCoordKey(start.lng),
    routeCoordKey(start.lat),
    routeCoordKey(end.lng),
    routeCoordKey(end.lat),
  ].join(',');
}

function normalizeRoutePoint(point) {
  if (Array.isArray(point)) {
    const lng = Number(point[0]);
    const lat = Number(point[1]);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
    return { lng, lat };
  }

  if (point && typeof point === 'object') {
    const lng = Number(point.lng);
    const lat = Number(point.lat);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
    return { lng, lat };
  }

  return null;
}

function appendRouteSegment(routePath, segmentPath) {
  const points = Array.isArray(segmentPath)
    ? segmentPath.map(normalizeRoutePoint).filter(Boolean)
    : [];

  points.forEach(point => {
    const previous = routePath[routePath.length - 1];
    if (
      previous &&
      previous.lng === point.lng &&
      previous.lat === point.lat
    ) {
      return;
    }
    routePath.push(point);
  });
}

function getDirectLegPath(leg) {
  return [leg.start, leg.end];
}

const WALKING_ROUTE_ENGINE_MAX_MINUTES = 30;

function getRouteLegRoutingMode(leg, maxWalkMinutes) {
  const explicitMode = String(leg.toStop?.legSuggestedMode || '').trim();
  if (explicitMode === 'walk') {
    return { mode: 'walk', reason: 'explicit_walk_mode' };
  }

  const routeWalkMinutes = Number(leg.toStop?.legWalkMinutes ?? leg.toStop?.walk);
  if (Number.isFinite(routeWalkMinutes) && routeWalkMinutes > 0) {
    if (routeWalkMinutes <= WALKING_ROUTE_ENGINE_MAX_MINUTES) {
      return { mode: 'walk', reason: 'route_walk_minutes' };
    }
    if (explicitMode) {
      return { mode: 'nonwalking', reason: `explicit_${explicitMode}` };
    }
  }

  if (explicitMode) {
    return { mode: 'nonwalking', reason: `explicit_${explicitMode}` };
  }

  if (Number.isFinite(routeWalkMinutes) && routeWalkMinutes > 0) {
    return { mode: 'walk', reason: 'route_walk_minutes' };
  }

  const mobilityLabel = String(leg.toStop?.legMobilityLabel || '').trim().toLowerCase();
  if (mobilityLabel.startsWith('walk')) {
    return { mode: 'walk', reason: 'route_walk_label' };
  }

  const mobility = classifyLegMobility(leg.start, leg.end, maxWalkMinutes);
  return {
    mode: mobility.suggestedMode === 'walk' ? 'walk' : 'nonwalking',
    reason: 'distance_classification',
  };
}

function getTmapPedestrianRoute(start, end) {
  const cacheKey = getTmapPedestrianKey(start, end);
  if (routeGeometryState.tmapCache.has(cacheKey)) {
    return routeGeometryState.tmapCache.get(cacheKey);
  }

  const request = fetch('/api/tmap-pedestrian', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start,
      end,
    }),
  })
    .then(response => response.json().catch(() => null).then(payload => {
      if (!response.ok) {
        throw new Error(payload?.error || `TMAP pedestrian returned ${response.status}`);
      }
      return payload;
    }))
    .then(payload => {
      if (!payload || !payload.ok || !Array.isArray(payload.path) || payload.path.length < 2) {
        throw new Error('TMAP pedestrian response did not include a usable path');
      }

      const path = payload.path.map(normalizeRoutePoint).filter(Boolean);
      if (path.length < 2) {
        throw new Error('TMAP pedestrian response did not include enough valid coordinates');
      }

      return {
        ...payload,
        path,
      };
    })
    .catch(error => {
      if (!routeGeometryState.tmapWarnedKeys.has(cacheKey)) {
        console.warn('[Kandid Spot] Walking leg pedestrian geometry unavailable; using fallback line', {
          from: start?.name,
          to: end?.name,
          reason: error?.message || 'Unknown TMAP pedestrian routing error',
        });
        routeGeometryState.tmapWarnedKeys.add(cacheKey);
      }
      return null;
    });

  routeGeometryState.tmapCache.set(cacheKey, request);
  return request;
}

function isReasonableTmapDuration(durationSeconds) {
  return Number.isFinite(durationSeconds) && durationSeconds > 0 && durationSeconds < 6 * 60 * 60;
}

function getMobilityLabelForMode(mode, minutes) {
  if (mode === 'walk') return `Walk ~${minutes} min`;
  return `Use transit/taxi/rental car · walking would be ~${minutes} min`;
}

function updateStopMobilityFromTmap(stop, tmapRoute, maxWalkMinutes) {
  let changed = false;
  const durationSeconds = Number(tmapRoute.durationSeconds);
  const distanceMeters = Number(tmapRoute.distanceMeters);

  if (Number.isFinite(distanceMeters) && distanceMeters > 0 && stop.legDistanceMeters !== Math.round(distanceMeters)) {
    stop.legDistanceMeters = Math.round(distanceMeters);
    changed = true;
  }

  if (!isReasonableTmapDuration(durationSeconds)) {
    return { changed, isWalkable: stop.legSuggestedMode === 'walk' };
  }

  const actualWalkMinutes = Math.max(1, Math.round(durationSeconds / 60));
  const nextMode = actualWalkMinutes < maxWalkMinutes ? 'walk' : 'transit_taxi_or_rental_car';
  const nextLabel = getMobilityLabelForMode(nextMode, actualWalkMinutes);

  if (stop.walk !== actualWalkMinutes) {
    stop.walk = actualWalkMinutes;
    changed = true;
  }
  if (stop.legWalkMinutes !== actualWalkMinutes) {
    stop.legWalkMinutes = actualWalkMinutes;
    changed = true;
  }
  if (stop.legSuggestedMode !== nextMode) {
    stop.legSuggestedMode = nextMode;
    changed = true;
  }
  if (stop.legMobilityLabel !== nextLabel) {
    stop.legMobilityLabel = nextLabel;
    changed = true;
  }

  return { changed, isWalkable: nextMode === 'walk' };
}

function refreshCurrentRouteMobilityMeta() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return;

  const travelMinutes = currentRoute.stops.reduce((sum, stop) => sum + Number(stop.walk || 0), 0);
  const walkingMinutes = currentRoute.stops.reduce((sum, stop) => (
    stop.legSuggestedMode === 'walk' ? sum + Number(stop.walk || 0) : sum
  ), 0);
  const stayMinutes = currentRoute.stops.reduce((sum, stop) => sum + Number(stop.stay || 0), 0);

  currentRoute.meta = {
    ...(currentRoute.meta || {}),
    total: formatMinutes(stayMinutes + travelMinutes),
    walking: `${walkingMinutes} min`,
  };
}

function syncRouteGeometryLabelUpdates(geometry) {
  if (!geometry || !geometry.labelsChanged) return;

  refreshCurrentRouteMobilityMeta();
  updateRouteCopy();
  renderStops();
  if (state.activeStop !== null) {
    activateStop(state.activeStop, { pan: false, scroll: false });
  }
}

function resolveCurrentRouteGeometry() {
  const geometryKey = getCurrentRouteGeometryKey();
  if (!geometryKey) return Promise.resolve(null);

  if (routeGeometryState.key === geometryKey && routeGeometryState.geometry) {
    return Promise.resolve(routeGeometryState.geometry);
  }

  if (routeGeometryState.key === geometryKey && routeGeometryState.promise) {
    return routeGeometryState.promise;
  }

  routeGeometryState.key = geometryKey;
  routeGeometryState.geometry = null;
  routeGeometryState.promise = buildMixedRouteGeometry()
    .catch(() => {
      console.warn('Mixed route geometry unavailable; using fallback route line');
      return null;
    })
    .then(geometry => {
      if (routeGeometryState.key === geometryKey) {
        routeGeometryState.geometry = geometry;
      }
      return geometry;
    })
    .finally(() => {
      if (routeGeometryState.key === geometryKey) {
        routeGeometryState.promise = null;
      }
    });

  return routeGeometryState.promise;
}

async function buildMixedRouteGeometry() {
  const legs = getRouteLegsWithCoords();
  const maxWalkMinutes = getMaxWalkMinutesForRefinement(currentRoute?.refinementKey);
  const path = [];
  const segments = [];
  const summary = {
    tmapWalkLegs: 0,
    naverDrivingLegs: 0,
    fallbackLegs: 0,
    legs: [],
  };
  let labelsChanged = false;

  for (const leg of legs) {
    let segmentPath = null;
    let isFallback = false;
    let source = '';
    const routingMode = getRouteLegRoutingMode(leg, maxWalkMinutes);
    const isWalkingLeg = routingMode.mode === 'walk';

    if (isWalkingLeg) {
      const tmapRoute = await getTmapPedestrianRoute(leg.start, leg.end);

      if (tmapRoute) {
        const update = updateStopMobilityFromTmap(leg.toStop, tmapRoute, maxWalkMinutes);
        labelsChanged = labelsChanged || update.changed;

        segmentPath = tmapRoute.path;
        source = 'tmap_pedestrian';
        summary.tmapWalkLegs += 1;
      }
    }

    if (!segmentPath && !isWalkingLeg) {
      const naverDirections = await getNaverDirections([leg.start, leg.end]);
      if (naverDirections && Array.isArray(naverDirections.path) && naverDirections.path.length >= 2) {
        segmentPath = naverDirections.path;
        source = 'naver_directions';
        summary.naverDrivingLegs += 1;
      }
    }

    if (!segmentPath) {
      segmentPath = getDirectLegPath(leg);
      isFallback = true;
      source = isWalkingLeg ? 'walking_fallback' : 'nonwalking_fallback';
      summary.fallbackLegs += 1;
    }

    appendRouteSegment(path, segmentPath);
    summary.legs.push({
      index: leg.index,
      from: leg.fromStop?.name || leg.start.name,
      to: leg.toStop?.name || leg.end.name,
      routingMode: routingMode.mode,
      routingReason: routingMode.reason,
      source,
      fallback: isFallback,
      points: Array.isArray(segmentPath) ? segmentPath.length : 0,
    });
    segments.push({
      index: leg.index,
      fromStop: leg.fromStop,
      toStop: leg.toStop,
      path: segmentPath,
      isFallback,
      source,
      routingMode: routingMode.mode,
    });
  }

  console.log('[Kandid Spot] Internal route geometry sources', summary);

  return {
    path,
    segments,
    labelsChanged,
    summary,
  };
}

function toNaverLatLngPath(points) {
  return points.map(point => new window.naver.maps.LatLng(point.lat, point.lng));
}

function toKakaoLatLngPath(points) {
  return points.map(point => new window.kakao.maps.LatLng(point.lat, point.lng));
}

function clearKakaoPolylines() {
  const polylines = Array.isArray(kakaoMapState.polyline)
    ? kakaoMapState.polyline
    : [kakaoMapState.polyline].filter(Boolean);

  polylines.forEach(polyline => polyline.setMap(null));
  kakaoMapState.polyline = null;
}

function clearNaverPolylines() {
  const polylines = Array.isArray(naverMapState.polyline)
    ? naverMapState.polyline
    : [naverMapState.polyline].filter(Boolean);

  polylines.forEach(polyline => polyline.setMap(null));
  naverMapState.polyline = null;
}

function addKakaoPolyline(polyline) {
  kakaoMapState.polyline = [
    ...(Array.isArray(kakaoMapState.polyline) ? kakaoMapState.polyline : [kakaoMapState.polyline].filter(Boolean)),
    polyline,
  ];
}

function addNaverPolyline(polyline) {
  naverMapState.polyline = [
    ...(Array.isArray(naverMapState.polyline) ? naverMapState.polyline : [naverMapState.polyline].filter(Boolean)),
    polyline,
  ];
}

function getRouteLineStyle({ fallback = false } = {}) {
  return {
    strokeOpacity: fallback ? 0.65 : 0.95,
    strokeStyle: fallback ? 'shortdash' : 'solid',
  };
}

function renderKakaoPolyline(points, { realRoute = false, fallback = false, append = false } = {}) {
  if (!points.length || !kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  if (!append) {
    clearKakaoPolylines();
  }

  const style = getRouteLineStyle({ fallback });
  const polyline = new window.kakao.maps.Polyline({
    path: toKakaoLatLngPath(points),
    strokeWeight: 5,
    strokeColor: '#2563EB',
    strokeOpacity: style.strokeOpacity,
    strokeStyle: style.strokeStyle,
  });
  polyline.setMap(kakaoMapState.map);
  addKakaoPolyline(polyline);

  if (realRoute && !fallback) {
    console.log('Kakao real route polyline rendered');
  }
}

function renderKakaoRouteSegments(segments) {
  clearKakaoPolylines();
  segments.forEach(segment => {
    renderKakaoPolyline(segment.path, {
      realRoute: !segment.isFallback,
      fallback: segment.isFallback,
      append: true,
    });
  });
}

function renderNaverPolyline(points, { realRoute = false, fallback = false, append = false } = {}) {
  if (!points.length || !naverMapState.map || !window.naver || !window.naver.maps) return;

  if (!append) {
    clearNaverPolylines();
  }

  const style = getRouteLineStyle({ fallback });
  const polyline = new window.naver.maps.Polyline({
    map: naverMapState.map,
    path: toNaverLatLngPath(points),
    strokeWeight: 5,
    strokeColor: '#2563EB',
    strokeOpacity: style.strokeOpacity,
    strokeStyle: style.strokeStyle,
  });
  addNaverPolyline(polyline);

  if (realRoute && !fallback) {
    console.log('Naver real route polyline rendered');
  }
}

function renderNaverRouteSegments(segments) {
  clearNaverPolylines();
  segments.forEach(segment => {
    renderNaverPolyline(segment.path, {
      realRoute: !segment.isFallback,
      fallback: segment.isFallback,
      append: true,
    });
  });
}

function renderNaverRoute({ fit = false, routeToken = routeRenderToken } = {}) {
  if (routeToken !== routeRenderToken) return;

  if (!naverMapState.map) {
    ensureNaverMap(0, { routeToken });
    return;
  }

  if (!window.naver || !window.naver.maps) {
    loadNaverSdk()
      .then(() => {
        if (routeToken !== routeRenderToken) return;
        renderNaverRoute({ fit, routeToken });
      })
      .catch(() => {
        naverMapState.sdkPromise = null;
      });
    return;
  }

  clearNaverRouteObjects();

  const stopsWithCoords = getStopsWithCoords();
  if (!stopsWithCoords.length) return;

  const geometryKey = getCurrentRouteGeometryKey();
  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;

  naverMapState.markers = currentRoute.stops.map(() => null);
  stopsWithCoords.forEach(({ stop, index }, markerIndex) => {
    const marker = new window.naver.maps.Marker({
      map: naverMapState.map,
      position: new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng),
      icon: createNaverMarkerIcon(stop, index, state.activeStop === index),
      zIndex: 100 + index,
    });

    window.naver.maps.Event.addListener(marker, 'click', () => {
      activateStop(index, { source: 'marker' });
    });

    naverMapState.markers[index] = {
      marker,
      position: new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng),
    };
  });

  updateMarkerActive();
  setRouteMetaDefault();
  if (fit) fitNaverRouteBounds();

  resolveCurrentRouteGeometry().then(geometry => {
    if (!geometry || mapProviderState.active !== 'naver' || !naverMapState.map) return;
    if (isStaleMapRender(renderToken, renderRouteToken) || geometryKey !== getCurrentRouteGeometryKey()) return;

    syncRouteGeometryLabelUpdates(geometry);
    if (Array.isArray(geometry.segments) && geometry.segments.length) {
      renderNaverRouteSegments(geometry.segments);
      if (fit) fitNaverRouteBounds(geometry.path);
    }
  });
}

function clearKakaoRouteObjects() {
  clearKakaoPolylines();

  kakaoMapState.markers.forEach(marker => {
    if (marker) marker.overlay.setMap(null);
  });
  kakaoMapState.markers = [];
}

function clearNaverRouteObjects() {
  clearNaverPolylines();

  naverMapState.markers.forEach(marker => {
    if (marker) marker.marker.setMap(null);
  });
  naverMapState.markers = [];
}

function clearRouteOverlays() {
  clearKakaoRouteObjects();
  clearNaverRouteObjects();
}

function createKakaoMarkerElement(stop, idx) {
  const marker = document.createElement('button');
  marker.type = 'button';
  marker.className = 'kakao-route-marker';
  marker.dataset.stop = String(idx);
  marker.setAttribute('aria-label', `Show stop ${stop.num}: ${stop.name}`);
  marker.textContent = String(stop.num);
  marker.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    activateStop(idx, { source: 'marker' });
  });
  return marker;
}

function createNaverMarkerIcon(stop, idx, isActive = false) {
  return {
    content: `<button class="kakao-route-marker${isActive ? ' active' : ''}" type="button" aria-label="Show route stop ${stop.num}">${stop.num}</button>`,
    anchor: new window.naver.maps.Point(17, 34),
  };
}

function fitKakaoRouteBounds(routePoints = null) {
  if (!kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  const bounds = new window.kakao.maps.LatLngBounds();
  const points = Array.isArray(routePoints) && routePoints.length
    ? routePoints
    : getStopsWithCoords().map(({ stop }) => stop.coords);
  if (!points.length) return;
  points.forEach(point => {
    bounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
  });

  try {
    kakaoMapState.map.setBounds(bounds, 64, 64, 104, 64);
  } catch (error) {
    kakaoMapState.map.setBounds(bounds);
  }
}

function fitNaverRouteBounds(routePoints = null) {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;

  const points = Array.isArray(routePoints) && routePoints.length
    ? routePoints
    : getStopsWithCoords().map(({ stop }) => stop.coords);
  if (!points.length) return;

  const lats = points.map(point => point.lat);
  const lngs = points.map(point => point.lng);
  const bounds = new window.naver.maps.LatLngBounds(
    new window.naver.maps.LatLng(Math.min(...lats), Math.min(...lngs)),
    new window.naver.maps.LatLng(Math.max(...lats), Math.max(...lngs))
  );

  try {
    naverMapState.map.fitBounds(bounds, { top: 64, right: 64, bottom: 104, left: 64 });
  } catch (error) {
    naverMapState.map.fitBounds(bounds);
  }
}

function relayoutKakaoMap() {
  if (!kakaoMapState.map) return;
  kakaoMapState.map.relayout();
}

function relayoutNaverMap() {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;
  window.naver.maps.Event.trigger(naverMapState.map, 'resize');
}

function setMapStatus(message, mode = 'info') {
  if (!mapStatus) return;
  mapStatus.textContent = message;
  mapStatus.dataset.mode = mode;
  mapStatus.hidden = false;
}

function hideMapStatus() {
  if (!mapStatus) return;
  mapStatus.hidden = true;
}

function preloadKakaoSdk() {
  const appKey = getKakaoAppKey();
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    return;
  }

  loadKakaoSdk(appKey).catch(() => {
    kakaoMapState.sdkPromise = null;
  });
}

function bindMapProviderControls() {
  document.querySelectorAll('[data-map-provider]').forEach(button => {
    button.addEventListener('click', () => {
      setMapProvider(button.dataset.mapProvider);
    });
  });
  syncMapProviderButtons();
}

function bindMapControls() {
  document.getElementById('map-zoom-in').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      naverMapState.map.setZoom(naverMapState.map.getZoom() + 1);
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    kakaoMapState.map.setLevel(Math.max(1, kakaoMapState.map.getLevel() - 1));
  });

  document.getElementById('map-zoom-out').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      naverMapState.map.setZoom(Math.max(1, naverMapState.map.getZoom() - 1));
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    kakaoMapState.map.setLevel(kakaoMapState.map.getLevel() + 1);
  });

  document.getElementById('map-center-route').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      relayoutNaverMap();
      fitNaverRouteBounds();
      showToast(`Centered on ${currentRoute.label}`);
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    relayoutKakaoMap();
    fitKakaoRouteBounds();
    showToast(`Centered on ${currentRoute.label}`);
  });
}

// ========== Sync activation (list ↔ map ↔ floating card) ==========
function activateStop(idx, options = {}) {
  const s = currentRoute.stops[idx];
  if (!s) return;

  state.activeStop = idx;
  document.querySelectorAll('.stop').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
  });
  updateMarkerActive();

  const card = document.getElementById('float-card');
  document.getElementById('fc-num').textContent = s.num;
  document.getElementById('fc-name').textContent = s.name;
  document.getElementById('fc-type').textContent = s.type;
  document.getElementById('fc-stay').textContent = `⏱ ${s.stay} min stay`;
  document.getElementById('fc-walk').textContent = s.walk > 0
    ? (s.legMobilityLabel || `🚶 ${s.walk} min walk`)
    : '📍 Start here';
  document.getElementById('fc-why').textContent = s.why;
  card.classList.add('show');

  if (
    mapProviderState.active === 'naver' &&
    naverMapState.map &&
    naverMapState.markers[idx] &&
    options.pan !== false
  ) {
    naverMapState.map.panTo(naverMapState.markers[idx].position);
  } else if (kakaoMapState.map && kakaoMapState.markers[idx] && options.pan !== false) {
    kakaoMapState.map.panTo(kakaoMapState.markers[idx].position);
  }

  const activeEl = document.querySelector(`.left-pane .stop[data-idx="${idx}"]`);
  if (activeEl && options.scroll !== false) {
    activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function updateMarkerActive() {
  kakaoMapState.markers.forEach((marker, idx) => {
    if (!marker) return;
    const isActive = state.activeStop === idx;
    marker.element.classList.toggle('active', isActive);
    if (typeof marker.overlay.setZIndex === 'function') {
      marker.overlay.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });

  naverMapState.markers.forEach((marker, idx) => {
    if (!marker) return;
    const isActive = state.activeStop === idx;
    marker.marker.setIcon(createNaverMarkerIcon(currentRoute.stops[idx], idx, isActive));
    if (typeof marker.marker.setZIndex === 'function') {
      marker.marker.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });
}

function clearActiveStop() {
  state.activeStop = null;
  document.querySelectorAll('.stop').forEach(el => el.classList.remove('active'));
  updateMarkerActive();
  hideFloatCard();
}

function hideFloatCard() {
  document.getElementById('float-card').classList.remove('show');
}

document.getElementById('fc-close').addEventListener('click', clearActiveStop);

mapStage.addEventListener('click', e => {
  if (
    !e.target.closest('.kakao-route-marker') &&
    !e.target.closest('.float-card') &&
    !e.target.closest('.ask-fab') &&
    !e.target.closest('.map-status')
  ) {
    hideFloatCard();
  }
});

// ========== Refine ==========
document.querySelectorAll('.refine-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    applyRefinement(chip.dataset.refine);
  });
});

function syncRefineChips() {
  document.querySelectorAll('.refine-chip').forEach(chip => {
    chip.classList.toggle('applied', chip.dataset.refine === state.activeRefinement);
  });
}

function setActiveRefinement(key) {
  state.activeRefinement = key || null;
  state.applied.clear();
  if (state.activeRefinement) state.applied.add(state.activeRefinement);
  syncRefineChips();
}

function getCurrentAreaCandidates() {
  const routeKey = getRouteKey(state.area);
  const runtimeContext = routeKey === 'near_me' && nearMeState.coords ? { center: nearMeState.coords } : {};
  return getAreaCandidates(curatedPlaceState.places, getAreaConfig(routeKey, runtimeContext));
}

function applyRefinement(key) {
  if (!REFINE_TEXTS[key]) return;

  ensureRealPlacesLoaded().then(async () => {
    if (state.activeRefinement === key) {
      setActiveRefinement(null);
      await applyRouteForCurrentSelection();
      showToast(REFINE_TEXTS[key].undo);
      return;
    }

    const routeKey = getRouteKey(state.area);
    const runtimeContext = await getRouteRuntimeContext(routeKey);
    const candidates = getCurrentAreaCandidates();
    if (key === 'open' && !hasOpenNowDataForCandidates(candidates)) {
      showToast(REFINE_TEXTS.open.unavailable);
      return;
    }

    const refinedRoute = buildCuratedRoute(
      routeKey,
      state.mood,
      key,
      runtimeContext,
      { routePreferences: getOptionalRoutePreferences() }
    );
    if (!refinedRoute || !refinedRoute.stops.length) {
      showToast('Not enough matching saved places for that refinement yet.');
      return;
    }

    state.routeKey = routeKey;
    setActiveRefinement(key);
    applyResolvedRoute(refinedRoute);
    showToast(REFINE_TEXTS[key].applied);
    flashWhy();
  });
}

function flashWhy() {
  const why = document.getElementById('why-body');
  why.style.transition = 'background 0.4s';
  why.style.background = 'rgba(20, 184, 166, 0.14)';
  setTimeout(() => { why.style.background = 'transparent'; }, 700);
}

// ========== Action bar ==========
function getSavedRoutes() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SAVED_ROUTES_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function getRouteSnapshot() {
  const stops = (currentRoute?.stops || []).map(stop => ({
    id: stop.place?.placeId || stop.place?.id || '',
    name: stop.name,
    type: stop.type,
    coords: stop.coords,
    naverMapUrl: stop.place?.naverMapUrl || '',
  }));

  return {
    timestamp: new Date().toISOString(),
    area: state.area,
    time: state.time,
    vibe: state.mood,
    activeRefinement: state.activeRefinement,
    activeMapProvider: getActiveMapProvider(),
    summary: {
      label: currentRoute?.label || '',
      mapLabel: currentRoute?.mapLabel || '',
      total: currentRoute?.meta?.total || '',
      walking: currentRoute?.meta?.walking || '',
      source: currentRoute?.sourceLabel || '',
    },
    stops,
  };
}

function getRouteSnapshotKey(snapshot) {
  return [
    snapshot.area,
    snapshot.time,
    snapshot.vibe,
    snapshot.activeRefinement || '',
    snapshot.stops.map(stop => stop.id || stop.name).join('>'),
  ].join('|');
}

function setActionButtonTemporaryLabel(button, label, restoreLabel) {
  if (!button) return;
  const textNode = Array.from(button.childNodes).find(node => node.nodeType === 3 && node.nodeValue.trim());
  if (!textNode) return;

  textNode.nodeValue = ` ${label} `;
  window.setTimeout(() => {
    textNode.nodeValue = ` ${restoreLabel} `;
  }, 1800);
}

function saveCurrentRoute(button) {
  if (!currentRoute || !currentRoute.stops.length) {
    showToast('There is no route to save yet.');
    return;
  }

  const snapshot = getRouteSnapshot();
  const snapshotKey = getRouteSnapshotKey(snapshot);
  const savedRoutes = getSavedRoutes();
  const existingIndex = savedRoutes.findIndex(route => getRouteSnapshotKey(route) === snapshotKey);

  if (existingIndex >= 0) {
    savedRoutes[existingIndex] = { ...savedRoutes[existingIndex], ...snapshot };
  } else {
    savedRoutes.unshift(snapshot);
  }

  try {
    window.localStorage.setItem(SAVED_ROUTES_STORAGE_KEY, JSON.stringify(savedRoutes.slice(0, 25)));
    setActionButtonTemporaryLabel(button, 'Saved', 'Save');
    showToast(existingIndex >= 0 ? '✓ Saved route updated' : '✓ Route saved to this browser');
  } catch (error) {
    showToast('Could not save this route in localStorage.');
  }
}

function buildShareText() {
  const stopLines = (currentRoute?.stops || [])
    .map((stop, index) => `${index + 1}. ${stop.name}`)
    .join('\n');
  const pageUrl = window.location.href.split('#')[0];

  return [
    'Kandid Spot',
    `${state.area} · ${state.time} · ${state.mood}`,
    currentRoute?.mapLabel || currentRoute?.label || 'Route',
    state.activeRefinement ? `Refinement: ${state.activeRefinement}` : '',
    stopLines,
    pageUrl,
  ].filter(Boolean).join('\n');
}

async function shareCurrentRoute() {
  if (!currentRoute || !currentRoute.stops.length) {
    showToast('There is no route to share yet.');
    return;
  }

  const text = buildShareText();

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Kandid Spot route', text });
      showToast('✓ Route shared');
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      showToast('✓ Route copied to clipboard');
      return;
    }

    window.prompt('Copy this route:', text);
    showToast('Copy the route from the prompt.');
  } catch (error) {
    if (error && error.name === 'AbortError') {
      showToast('Share cancelled.');
      return;
    }
    showToast('Could not share this route.');
  }
}

function getCurrentRoutePlaces() {
  return Array.isArray(currentRoute?.stops)
    ? currentRoute.stops.filter(hasValidKoreaCoord)
    : [];
}

function getPlaceLat(place = {}) {
  const sourcePlace = place.place || place;
  return Number(
    place.lat ??
    place.latitude ??
    place.py ??
    place.coords?.lat ??
    sourcePlace.lat ??
    sourcePlace.latitude ??
    sourcePlace.py ??
    sourcePlace.coords?.lat
  );
}

function getPlaceLng(place = {}) {
  const sourcePlace = place.place || place;
  return Number(
    place.lng ??
    place.longitude ??
    place.px ??
    place.coords?.lng ??
    sourcePlace.lng ??
    sourcePlace.longitude ??
    sourcePlace.px ??
    sourcePlace.coords?.lng
  );
}

function hasValidKoreaCoord(place) {
  const lat = getPlaceLat(place);
  const lng = getPlaceLng(place);
  return Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= 31.43 &&
    lat <= 44.35 &&
    lng >= 122.37 &&
    lng <= 132.0;
}

function getPlaceName(place = {}) {
  const sourcePlace = place.place || place;
  return String(
    place.name ||
    place.title ||
    place.label ||
    sourcePlace.displayName ||
    sourcePlace.name ||
    sourcePlace.title ||
    sourcePlace.label ||
    'Selected place'
  ).trim();
}

function getPlaceId(place = {}) {
  const sourcePlace = place.place || place;
  return String(
    place.placeId ||
    place.sid ||
    place.naverPlaceId ||
    place.kakaoPlaceId ||
    place.id ||
    sourcePlace.placeId ||
    sourcePlace.sid ||
    sourcePlace.naverPlaceId ||
    sourcePlace.kakaoPlaceId ||
    sourcePlace.id ||
    ''
  ).trim();
}

function formatMapCoord(value) {
  const number = Number(value);
  return Number.isFinite(number) ? String(Number(number.toFixed(7))) : '';
}

function encodeKakaoRouteStop(place) {
  return [
    encodeURIComponent(getPlaceName(place)),
    formatMapCoord(getPlaceLat(place)),
    formatMapCoord(getPlaceLng(place)),
  ].join(',');
}

function buildKakaoWalkingDirectionsUrl(routePlaces) {
  if (!routePlaces.length) return '';
  const segments = routePlaces.map(encodeKakaoRouteStop);
  if (segments.length === 1) {
    return `https://map.kakao.com/link/to/${segments[0]}`;
  }
  return `https://map.kakao.com/link/by/walk/${segments.join('/')}`;
}

function toNaverMapPoint(place) {
  const lat = getPlaceLat(place);
  const lng = getPlaceLng(place);
  const clampedLat = Math.max(Math.min(lat, 85.05112878), -85.05112878);
  const radians = Math.PI / 180;
  const earthRadius = 6378137;
  return {
    x: earthRadius * lng * radians,
    y: earthRadius * Math.log(Math.tan(Math.PI / 4 + (clampedLat * radians) / 2)),
  };
}

function encodeNaverRouteStop(place) {
  const point = toNaverMapPoint(place);
  return [
    formatMapCoord(point.x),
    formatMapCoord(point.y),
    encodeURIComponent(getPlaceName(place)),
    encodeURIComponent(getPlaceId(place)),
    'PLACE_POI',
  ].join(',');
}

function buildNaverWalkingDirectionsUrl(routePlaces) {
  if (!routePlaces.length) return '';
  const segments = routePlaces.map(encodeNaverRouteStop);
  const center = toNaverMapPoint(routePlaces[Math.floor(routePlaces.length / 2)]);
  const centerQuery = [
    formatMapCoord(center.x),
    formatMapCoord(center.y),
    '15.00',
    '0',
    '0',
    '0',
    'dh',
  ].join(',');
  const routePath = segments.length === 1
    ? `-/${segments[0]}`
    : segments.join('/');
  return `https://map.naver.com/p/directions/${routePath}/-/walk?c=${centerQuery}`;
}

function buildExternalMapUrl(routePlaces, provider = 'naver') {
  if (provider === 'kakao') {
    return buildKakaoWalkingDirectionsUrl(routePlaces);
  }
  return buildNaverWalkingDirectionsUrl(routePlaces);
}

function openCurrentRouteInMap() {
  const routePlaces = getCurrentRoutePlaces();
  if (!routePlaces.length) {
    console.warn('[Kandid Spot] Open in map clicked but no valid route places exist.');
    showToast('There are no valid route stops to open yet.');
    return;
  }

  const provider = MAP_PROVIDERS.has(mapProviderState?.active) ? mapProviderState.active : 'naver';
  const url = buildExternalMapUrl(routePlaces, provider);
  if (!url) {
    console.warn('[Kandid Spot] Open in map clicked but no valid route URL could be built.');
    showToast('No walking route link is available for this route yet.');
    return;
  }

  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    showToast('Allow popups to open this map link.');
    return;
  }

  showToast(`Opening ${provider === 'naver' ? 'Naver' : 'Kakao'} Map walking directions…`);
}

document.querySelectorAll('.act-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    if (a === 'save') saveCurrentRoute(btn);
    if (a === 'share') shareCurrentRoute();
    if (a === 'map') openCurrentRouteInMap();
  });
});

document.getElementById('saved-btn').addEventListener('click', () => {
  const savedRoutes = getSavedRoutes();
  showToast(savedRoutes.length ? `${savedRoutes.length} saved route${savedRoutes.length === 1 ? '' : 's'} in this browser.` : 'No saved routes yet — save this one to start your guide.');
});

// ========== Ask Miro drawer ==========
const askDrawer = document.getElementById('ask-drawer');
const askThread = document.getElementById('ask-thread');
const askInput = document.getElementById('ask-input');
const askSend = document.getElementById('ask-send');

document.getElementById('ask-fab').addEventListener('click', () => openAsk());
document.getElementById('ask-close').addEventListener('click', () => closeAsk());
document.getElementById('ask-overlay').addEventListener('click', () => closeAsk());

function openAsk() {
  askDrawer.classList.add('open');
  askDrawer.setAttribute('aria-hidden', 'false');
  setTimeout(() => askInput.focus(), 280);
}
function closeAsk() {
  askDrawer.classList.remove('open');
  askDrawer.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.ask-suggest').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.q;
    askWith(btn.textContent.trim(), getAskResponse(q));
  });
});

askSend.addEventListener('click', sendAskInput);
askInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendAskInput(); });

function sendAskInput() {
  const v = askInput.value.trim();
  if (!v) return;
  askInput.value = '';
  const lower = v.toLowerCase();
  let key = 'why';
  if (lower.includes('crowd') || lower.includes('busy') || lower.includes('quiet')) key = 'crowd';
  else if (lower.match(/\d+\s?(min|hour|hr)/) || lower.includes('time') || lower.includes('shorter')) key = 'time';
  else if (lower.includes('cafe') || lower.includes('coffee')) key = 'cafe';
  else if (lower.includes('cheap') || lower.includes('₩') || lower.includes('budget')) key = 'cheap';
  else if (lower.includes('open') || lower.includes('closed') || lower.includes('now')) key = 'open';
  askWith(v, getAskResponse(key));
}

function getAskResponse(key) {
  const response = ASK_RESPONSES[key] || ASK_RESPONSES.why;
  return typeof response === 'function' ? response(currentRoute) : response;
}

function askWith(question, answer) {
  const suggHead = askThread.querySelector('.ask-suggest-head');
  const suggList = askThread.querySelector('.ask-suggestions');
  if (suggHead) suggHead.remove();
  if (suggList) suggList.remove();

  const userMsg = document.createElement('div');
  userMsg.className = 'ask-msg from-user';
  userMsg.innerHTML = `<div class="ask-bubble">${escapeHtml(question)}</div>`;
  askThread.appendChild(userMsg);
  scrollAsk();

  const typing = document.createElement('div');
  typing.className = 'ask-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  askThread.appendChild(typing);
  scrollAsk();

  setTimeout(() => {
    typing.remove();
    const reply = document.createElement('div');
    reply.className = 'ask-msg from-miro';
    reply.innerHTML = `<div class="ask-bubble">${answer}</div>`;
    askThread.appendChild(reply);
    scrollAsk();
  }, 800);
}

function scrollAsk() {
  setTimeout(() => { askThread.scrollTop = askThread.scrollHeight; }, 40);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ========== Toast ==========
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ========== Esc key handlers ==========
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (askDrawer.classList.contains('open')) closeAsk();
    else if (document.getElementById('float-card').classList.contains('show')) {
      hideFloatCard();
    }
  }
});

// ========== Onboarding (hybrid flow: 3 required + 2 optional) ==========
const OB_LOADING_STEPS = [
  'Reading the streets of {area}',
  'Checking walking time',
  'Matching your mood',
  'Avoiding obvious tourist traps',
  'Finding a route you can start now',
];

const OB_REQUIRED_LAST_STEP = 3;
const OB_FINAL_STEP = 5;

const onboarding = {
  el: document.getElementById('onboarding'),
  loadingEl: document.getElementById('ob-loading'),
  loadingStepEl: document.getElementById('ob-loading-step'),
  currentEl: document.getElementById('ob-current'),
  currentOptEl: document.getElementById('ob-current-opt'),
  progressRequiredEl: null,
  progressOptionalEl: null,
  step: 1,
  // Required: area, time, mood — all three are required to gate route generation.
  // Optional: shape (itinerary flow), refine (per-anchor route preference map).
  selections: { area: null, time: null, mood: null, shape: null, refine: {} },
  contextNote: '',

  init() {
    this.progressRequiredEl = this.el.querySelector('[data-progress-required]');
    this.progressOptionalEl = this.el.querySelector('[data-progress-optional]');

    // Required-step option groups (area / time / mood)
    this.el.querySelectorAll('.ob-options').forEach(group => {
      const groupKey = group.dataset.group;
      group.addEventListener('click', e => {
        const btn = e.target.closest('.ob-option');
        if (!btn) return;
        group.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
        btn.classList.add('selected');
        this.selections[groupKey] = btn.dataset.value;
        this.updateNextEnabled();
      });
    });

    // Optional Step 4: itinerary shape cards
    const shapeGroup = this.el.querySelector('.ob-shapes');
    if (shapeGroup) {
      shapeGroup.addEventListener('click', e => {
        const btn = e.target.closest('.ob-shape');
        if (!btn) return;
        shapeGroup.querySelectorAll('.ob-shape').forEach(o => o.classList.remove('selected'));
        btn.classList.add('selected');
        this.selections.shape = btn.dataset.value;
      });
    }

    // Optional Step 5: per-anchor preference toggles
    this.el.querySelectorAll('.ob-refine-prefs').forEach(group => {
      const anchor = group.dataset.anchor;
      this.selections.refine[anchor] = 'neutral';
      group.addEventListener('click', e => {
        const btn = e.target.closest('.ob-pref');
        if (!btn) return;
        group.querySelectorAll('.ob-pref').forEach(o => {
          o.classList.remove('active');
          o.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        this.selections.refine[anchor] = btn.dataset.pref;
      });
    });

    // Optional context note (Step 1) — UI-only context, not parsed
    const contextInput = this.el.querySelector('[data-context-input]');
    if (contextInput) {
      contextInput.addEventListener('input', () => {
        this.contextNote = contextInput.value.trim();
      });
    }

    // Per-screen actions
    this.el.querySelectorAll('.ob-screen').forEach(screen => {
      const nextBtn = screen.querySelector('.ob-next');
      const backBtn = screen.querySelector('.ob-back');
      const customizeBtn = screen.querySelector('.ob-customize-more');
      const skipBtn = screen.querySelector('.ob-skip');
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
      if (backBtn) backBtn.addEventListener('click', () => this.prevStep());
      if (customizeBtn) customizeBtn.addEventListener('click', () => this.goToStep(4));
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          this.skipOptionalStep(parseInt(screen.dataset.step, 10));
        });
      }
    });

    document.addEventListener('keydown', e => {
      if (!this.el.classList.contains('active')) return;
      if (e.key !== 'Enter') return;
      const screen = this.el.querySelector(`.ob-screen[data-step="${this.step}"]`);
      const nextBtn = screen?.querySelector('.ob-next');
      if (nextBtn && !nextBtn.disabled) nextBtn.click();
    });
  },

  goToStep(n) {
    this.step = n;
    this.el.querySelectorAll('.ob-screen').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.step) === n);
    });
    this.el.querySelectorAll('.ob-step').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('done', sn < n || n > OB_REQUIRED_LAST_STEP);
      s.classList.toggle('active', sn === n);
    });

    const isOptional = n > OB_REQUIRED_LAST_STEP;
    this.el.dataset.stage = isOptional ? 'optional' : 'required';
    if (this.progressRequiredEl) this.progressRequiredEl.hidden = isOptional;
    if (this.progressOptionalEl) this.progressOptionalEl.hidden = !isOptional;
    if (isOptional && this.currentOptEl) {
      this.currentOptEl.textContent = String(n - OB_REQUIRED_LAST_STEP);
    } else if (this.currentEl) {
      this.currentEl.textContent = String(n);
    }

    this.el.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateNextEnabled();
  },

  updateNextEnabled() {
    const screen = this.el.querySelector(`.ob-screen[data-step="${this.step}"]`);
    if (!screen) return;
    const options = screen.querySelector('.ob-options');
    const nextBtn = screen.querySelector('.ob-next');
    const customizeBtn = screen.querySelector('.ob-customize-more');
    // Required steps: enable Next only when this step's group has a selection.
    if (options && nextBtn) {
      const groupKey = options.dataset.group;
      const ready = Boolean(this.selections[groupKey]);
      nextBtn.disabled = !ready;
      if (customizeBtn) customizeBtn.disabled = !ready;
      return;
    }
    // Optional steps: action buttons are always enabled (user can skip).
    if (nextBtn) nextBtn.disabled = false;
  },

  nextStep() {
    // Step 3 "Show my route" — required path is complete, build immediately.
    if (this.step === OB_REQUIRED_LAST_STEP) {
      this.triggerBuild();
      return;
    }
    // Optional Step 4 "Continue" — advance to Step 5.
    if (this.step === 4) {
      this.goToStep(5);
      return;
    }
    // Optional Step 5 "Build my route" — build using existing flow.
    if (this.step === OB_FINAL_STEP) {
      this.triggerBuild();
      return;
    }
    // Required Steps 1–2.
    this.goToStep(this.step + 1);
  },

  prevStep() {
    if (this.step > 1) this.goToStep(this.step - 1);
  },

  clearShapeSelection() {
    this.selections.shape = null;
    this.el.querySelectorAll('.ob-shape').forEach(o => o.classList.remove('selected'));
  },

  resetRefinePreferences() {
    this.selections.refine = {};
    this.el.querySelectorAll('.ob-refine-prefs').forEach(group => {
      const anchor = group.dataset.anchor;
      this.selections.refine[anchor] = 'neutral';
      group.querySelectorAll('.ob-pref').forEach(o => {
        const isNeutral = o.dataset.pref === 'neutral';
        o.classList.toggle('active', isNeutral);
        o.setAttribute('aria-pressed', isNeutral ? 'true' : 'false');
      });
    });
  },

  skipOptionalStep(stepNumber) {
    if (stepNumber === 4) this.clearShapeSelection();
    if (stepNumber === 5) this.resetRefinePreferences();
    this.triggerBuild();
  },

  triggerBuild() {
    this.el.classList.remove('active');
    this.loadingEl.classList.add('active');
    this.loadingEl.setAttribute('aria-hidden', 'false');

    const stepsForArea = OB_LOADING_STEPS.map(s => s.replace('{area}', this.selections.area));
    let i = 0;
    this.loadingStepEl.textContent = stepsForArea[0];
    const interval = setInterval(() => {
      i++;
      if (i >= stepsForArea.length) {
        clearInterval(interval);
        this.reveal();
      } else {
        this.loadingStepEl.textContent = stepsForArea[i];
      }
    }, 480);
  },

  reveal() {
    Object.assign(state, this.selections);
    syncBuilderChips();

    setBuilderCollapsed(true);
    loadingState.classList.remove('active');
    this.loadingStepEl.textContent = 'Loading real places...';

    ensureRealPlacesLoaded().then(async () => {
      await applyRouteForCurrentSelection();

      this.loadingEl.classList.remove('active');
      this.loadingEl.setAttribute('aria-hidden', 'true');
      document.getElementById('main-app').classList.remove('hidden');

      window.setTimeout(() => {
        ensureActiveMap();
      }, 0);
    });
  },

  restart(preserveSelections = true) {
    if (preserveSelections) {
      ['area', 'time', 'mood'].forEach(key => {
        const value = state[key];
        const group = this.el.querySelector(`.ob-options[data-group="${key}"]`);
        if (group) {
          group.querySelectorAll('.ob-option').forEach(o => {
            o.classList.toggle('selected', o.dataset.value === value);
          });
          this.selections[key] = value;
        }
      });
    } else {
      this.selections = { area: null, time: null, mood: null, shape: null, refine: {} };
      this.contextNote = '';
      this.el.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
      const contextInput = this.el.querySelector('[data-context-input]');
      if (contextInput) contextInput.value = '';
    }
    // Optional route preferences reset when starting a new onboarding pass.
    this.clearShapeSelection();
    this.resetRefinePreferences();
    document.getElementById('main-app').classList.add('hidden');
    this.loadingEl.classList.remove('active');
    this.el.classList.add('active');
    this.goToStep(1);
  },
};

function syncBuilderChips() {
  ['area', 'time', 'mood'].forEach(key => {
    const group = document.querySelector(`#main-app .builder [data-group="${key}"]`);
    if (!group) return;
    const value = state[key];
    group.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === value);
    });
  });
}

document.getElementById('new-btn').addEventListener('click', () => {
  onboarding.restart(true);
  showToast('Pick again — your previous choices are pre-filled.');
});

// ========== Init ==========
bindMapProviderControls();
bindMapControls();
onboarding.init();
preloadKakaoSdk();
if (!MOCK_ROUTES_ENABLED) {
  console.log('Miro mock fallback disabled');
}
ensureRealPlacesLoaded();
