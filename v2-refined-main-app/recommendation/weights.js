(function initRecommendationWeights(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.weights = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildRecommendationWeights() {
  const WEIGHTS_VERSION = 'heuristic-v1-extraction-2026-06-04';

  const DATA_DRIVEN_PLACE_WEIGHTS = {
    areaWithinRadius: 25,
    areaClosenessMax: 10,
    moodPrimary: 35,
    moodSecondary: 15,
    targetCategory: 22,
    routePreferenceHeart: 18,
    routePreferencePin: 28,
    moodTag: 5,
    moodTagMax: 20,
    firstMainStopRole: 5,
    laterSubStopRole: 5,
    finalStopRole: 5,
    fillerRole: 3,
    stayFitsTarget: 5,
    available: 5,
    matched: 3,
    subCategory: 3,
    address: 2,
    repeatCategoryPenalty: 30,
    walkableLegBase: 12,
    normalLongLegPenalty: 24,
    lessWalkingLongLegPenalty: 42,
    normalLegDistanceDivisor: 350,
    lessWalkingLegDistanceCap: 16,
    normalLegDistanceCap: 10,
  };

  const REFINEMENT_WEIGHTS = {
    lessWalkingAreaClosenessMax: 12,
    lessWalkingLegBase: 10,
    lessWalkingLongLegPenalty: 30,
    lessWalkingLegDistanceDivisor: 100,
    lessWalkingLegDistanceCap: 24,
    lessWalkingCategoryBonus: 6,
    localTerm: 22,
    localRouteRole: 5,
    localSourcePriorityCap: 10,
    localMatched: 5,
    localCategoryBonus: 3,
    cheapCategoryBonus: 10,
    cheapTerm: 18,
    cheapPremiumPenalty: 18,
    cafeCategory: 34,
    dessertCategory: 28,
    cafeTerm: 14,
    quietWalkRest: 24,
    quietCafeView: 12,
    quietTerm: 18,
    quietBarPenalty: 26,
    quietTouristPenalty: 20,
    openNowTrue: 8,
    openNowFalsePenalty: 14,
    refinementClampMin: -180,
    refinementClampMax: 180,
  };

  const BUDGET_CATEGORY_NAMES = [
    '분식', '김밥', '국수', '라면', '라멘', '만두', '백반', '시장', '포차', '노점',
    '간식', '스낵', '카페', 'street', 'snack', 'casual', 'bunsik', 'coffee', 'cafe', 'bakery',
  ];

  const PREMIUM_CATEGORY_NAMES = [
    '오마카세', '파인다이닝', '스테이크', '와인', '칵테일', 'bar', 'pub',
  ];

  const LOCAL_TERMS = [
    '골목', '동네', '로컬', 'local', 'hidden', '숨은', '찐', '노포', '시장',
    'backstreet', 'neighborhood', 'indie', 'independent', 'residential', 'locals',
  ];

  const CAFE_REFINEMENT_TERMS = [
    '카페', '커피', '디저트', '베이커리', '차', 'coffee', 'cafe', 'dessert', 'bakery', 'tea', 'roast',
  ];

  const QUIET_TERMS = [
    '조용', 'quiet', 'calm', '한적', '골목', '산책', '공원', 'walk', 'garden', 'study',
    'reading', 'book', '책', 'rest',
  ];

  const TOURIST_HEAVY_TERMS = [
    '핫플', '명소', '랜드마크', '관광', 'tour', 'tourist', 'famous', 'club', '클럽',
    '대형', '몰', '백화점',
  ];

  return {
    WEIGHTS_VERSION,
    DATA_DRIVEN_PLACE_WEIGHTS,
    REFINEMENT_WEIGHTS,
    BUDGET_CATEGORY_NAMES,
    PREMIUM_CATEGORY_NAMES,
    LOCAL_TERMS,
    CAFE_REFINEMENT_TERMS,
    QUIET_TERMS,
    TOURIST_HEAVY_TERMS,
  };
}));
