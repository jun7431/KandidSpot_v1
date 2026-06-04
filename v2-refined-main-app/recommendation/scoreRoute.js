(function initScoreRoute(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.scoreRoute = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildScoreRoute() {
  function hasValidCoords(place) {
    return place &&
      Number.isFinite(Number(place.lat)) &&
      Number.isFinite(Number(place.lng));
  }

  function toRadians(value) {
    return Number(value) * Math.PI / 180;
  }

  function distanceMeters(a, b) {
    if (!hasValidCoords(a) || !hasValidCoords(b)) return Infinity;
    const earthRadiusKm = 6371;
    const latDelta = toRadians(Number(b.lat) - Number(a.lat));
    const lngDelta = toRadians(Number(b.lng) - Number(a.lng));
    const lat1 = toRadians(Number(a.lat));
    const lat2 = toRadians(Number(b.lat));
    const h =
      Math.sin(latDelta / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 1000;
  }

  function defaultGetPlaceStayMinutes(place) {
    const stay = place?.estimatedStayMin;
    if (stay && Number.isFinite(Number(stay.min)) && Number.isFinite(Number(stay.max))) {
      return Math.round((Number(stay.min) + Number(stay.max)) / 2);
    }
    return 25;
  }

  function defaultClassifyLegMobility(fromPlace, toPlace) {
    const meters = distanceMeters(fromPlace, toPlace);
    const minutes = Number.isFinite(meters) ? Math.round(meters / 80) : Infinity;
    return {
      distanceMeters: meters,
      estimatedWalkMinutes: minutes,
      isWalkable: Number.isFinite(minutes) && minutes <= 15,
      suggestedMode: 'walk',
    };
  }

  function defaultPlaceKey(place = {}) {
    if (place.placeId) return `place:${place.placeId}`;
    if (place.id) return `bookmark:${place.id}`;
    return `name-address:${place.name || ''}|${place.address || ''}`;
  }

  function getPrimaryCategory(place = {}) {
    return String(place.primaryCategory || '').trim();
  }

  function getPlaceScore(place, placeScores = []) {
    const key = defaultPlaceKey(place);
    const entry = placeScores.find(item => (
      item.place === place ||
      item.key === key ||
      defaultPlaceKey(item.place || {}) === key
    ));
    return Number(entry?.score) || 0;
  }

  function addBreakdown(breakdown, key, score, note, meta = {}) {
    breakdown[key] = {
      score,
      available: true,
      notes: note ? [note] : [],
      ...meta,
    };
  }

  function estimateRoute(places, deps = {}) {
    const getPlaceStayMinutes = deps.getPlaceStayMinutes || defaultGetPlaceStayMinutes;
    const classifyLegMobility = deps.classifyLegMobility || defaultClassifyLegMobility;

    return places.reduce((estimate, place, index) => {
      const previous = places[index - 1];
      const mobility = previous ? classifyLegMobility(previous, place, deps.defaultMaxWalkMinutes || 15) : null;
      const walk = Number(mobility?.estimatedWalkMinutes);
      const legDistance = Number(mobility?.distanceMeters);
      const stay = Number(getPlaceStayMinutes(place)) || 0;

      return {
        stay: estimate.stay + stay,
        travel: estimate.travel + (Number.isFinite(walk) ? walk : 0),
        total: estimate.total + stay + (Number.isFinite(walk) ? walk : 0),
        walkingMinutes: estimate.walkingMinutes + (
          !mobility || mobility.suggestedMode === 'walk' ? (Number.isFinite(walk) ? walk : 0) : 0
        ),
        distanceMeters: estimate.distanceMeters + (Number.isFinite(legDistance) ? legDistance : 0),
        legWalkMinutes: [
          ...estimate.legWalkMinutes,
          index === 0 ? 0 : (Number.isFinite(walk) ? walk : Infinity),
        ],
      };
    }, {
      stay: 0,
      travel: 0,
      total: 0,
      walkingMinutes: 0,
      distanceMeters: 0,
      legWalkMinutes: [],
    });
  }

  function countDuplicateCategories(categories) {
    const seen = new Set();
    let duplicates = 0;
    categories.forEach(category => {
      if (!category) return;
      if (seen.has(category)) duplicates += 1;
      seen.add(category);
    });
    return duplicates;
  }

  function getStoryFlowScore(categories) {
    const goodTransitions = new Set([
      'meal>cafe',
      'meal>bar',
      'cafe>walk_nature',
      'cafe>shopping',
      'cafe>dessert_bakery',
      'shopping>cafe',
      'activity>cafe',
      'walk_nature>meal',
      'landmark_view>cafe',
    ]);
    const awkwardTransitions = new Set([
      'bar>activity',
      'bar>shopping',
      'bar>meal',
    ]);

    return categories.slice(1).reduce((score, category, index) => {
      const transition = `${categories[index]}>${category}`;
      if (goodTransitions.has(transition)) return score + 8;
      if (awkwardTransitions.has(transition)) return score - 8;
      return score + 1;
    }, 0);
  }

  function scoreRoute(input = {}, deps = {}) {
    const places = Array.isArray(input.places) ? input.places : [];
    const placeScores = Array.isArray(input.placeScores) ? input.placeScores : [];
    const sequence = Array.isArray(input.sequence) ? input.sequence : [];
    const refinementKeys = Array.isArray(input.refinementKeys) ? input.refinementKeys : [];
    const durationHardMaxMin = Number(input.durationHardMaxMin);
    const estimate = input.estimate || estimateRoute(places, deps);
    const categories = places.map(getPrimaryCategory);
    const breakdown = {};

    const sumPlaceScore = places.reduce((sum, place) => sum + getPlaceScore(place, placeScores), 0);
    addBreakdown(breakdown, 'sumPlaceScore', sumPlaceScore, 'Sum of selected place scores.');

    const routeShapeFit = categories.reduce((score, category, index) => {
      const target = sequence[index];
      if (!target) return score;
      if (category === target) return score + 12;
      if (sequence.includes(category)) return score + 4;
      return score - 4;
    }, 0);
    addBreakdown(breakdown, 'routeShapeFit', routeShapeFit, 'Category order compared with the route template.');

    const uniqueCategoryCount = new Set(categories.filter(Boolean)).size;
    const duplicateCategoryCount = countDuplicateCategories(categories);
    addBreakdown(
      breakdown,
      'diversityScore',
      uniqueCategoryCount * 6 - duplicateCategoryCount * 3,
      'Rewards category variety across the route.',
      { uniqueCategoryCount }
    );

    addBreakdown(
      breakdown,
      'storyFlowScore',
      getStoryFlowScore(categories),
      'Scores whether adjacent stop categories form a natural route flow.'
    );

    const walkingMultiplier = refinementKeys.includes('walk') ? 2.0 : 0.8;
    addBreakdown(
      breakdown,
      'totalWalkingPenalty',
      -Math.min(Number(estimate.walkingMinutes || 0) * walkingMultiplier, refinementKeys.includes('walk') ? 80 : 45),
      'Penalizes total walking time across the route.',
      { walkingMinutes: Number(estimate.walkingMinutes || 0) }
    );

    const overage = Number.isFinite(durationHardMaxMin) ? Math.max(0, Number(estimate.total || 0) - durationHardMaxMin) : 0;
    addBreakdown(
      breakdown,
      'durationOveragePenalty',
      -overage * 6,
      'Penalizes routes over the configured hard duration budget.',
      { overageMinutes: overage }
    );

    let backtrackingCount = 0;
    for (let index = 2; index < places.length; index += 1) {
      const current = places[index];
      const previous = places[index - 1];
      const previousLeg = distanceMeters(previous, current);
      const revisitsEarlierCluster = places.slice(0, index - 1).some(place => {
        const distanceToEarlier = distanceMeters(place, current);
        return Number.isFinite(distanceToEarlier) && distanceToEarlier < 300;
      });
      if (Number.isFinite(previousLeg) && previousLeg >= 600 && revisitsEarlierCluster) {
        backtrackingCount += 1;
      }
    }
    addBreakdown(
      breakdown,
      'backtrackingPenalty',
      -backtrackingCount * 12,
      'Penalizes routes that bounce back to an earlier cluster.',
      { backtrackingCount }
    );

    addBreakdown(
      breakdown,
      'duplicateCategoryPenalty',
      -duplicateCategoryCount * 14,
      'Penalizes repeated primary categories.',
      { duplicateCategoryCount }
    );

    const routeScore = Object.values(breakdown).reduce((sum, item) => sum + Number(item.score || 0), 0);

    return {
      routeScore,
      routeScoreBreakdown: breakdown,
      estimate,
    };
  }

  return {
    estimateRoute,
    scoreRoute,
  };
}));
