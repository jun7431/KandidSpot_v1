const test = require('node:test');
const assert = require('node:assert/strict');

const { runBeamSearch } = require('../beamSearch');
const { explainRoute } = require('../explainRoute');

function makePlace(id, primaryCategory, stay = 20, extra = {}) {
  return {
    id,
    name: id,
    displayName: id,
    lat: extra.lat ?? 37.5,
    lng: extra.lng ?? 127.0,
    primaryCategory,
    primaryCategoryLabel: primaryCategory,
    estimatedStayMin: { min: stay, max: stay },
    available: true,
    isMatched: true,
    address: 'Seoul',
    tags: extra.tags || [],
    routeRoles: extra.routeRoles || ['main_stop'],
    sourcePriority: extra.sourcePriority || 1,
    ...extra,
  };
}

function createDeps(walkOverrides = {}) {
  const defaultWalk = 5;
  const getPlaceStayMinutes = place => Math.round((
    Number(place.estimatedStayMin?.min || 20) + Number(place.estimatedStayMin?.max || 20)
  ) / 2);
  const classifyLegMobility = (fromPlace, toPlace, maxWalkMinutes = 15) => {
    const key = `${fromPlace.id}>${toPlace.id}`;
    const reverseKey = `${toPlace.id}>${fromPlace.id}`;
    const minutes = walkOverrides[key] ?? walkOverrides[reverseKey] ?? defaultWalk;
    return {
      distanceMeters: minutes * 80,
      estimatedWalkMinutes: minutes,
      isWalkable: minutes <= maxWalkMinutes,
      suggestedMode: minutes <= maxWalkMinutes ? 'walk' : 'taxi',
      label: minutes <= maxWalkMinutes ? `${minutes} min walk` : `${minutes} min transfer`,
    };
  };

  return {
    getRuntimePlaceKey: place => `id:${place.id}`,
    getPlaceStayMinutes,
    classifyLegMobility,
    getPlacePrimaryCategory: place => place.primaryCategory,
    placeScoreDeps: {
      getAreaRadiusM: () => 1000,
      getPlaceDistanceM: () => 50,
      getRoutePreferenceScore: () => 0,
      getPlaceStayMinutes,
      classifyLegMobility,
      getDurationFitScore: () => 0,
      getStartTimeCategoryScore: () => 0,
      getBacktrackingPenalty: () => 0,
      getPreviousOverlapPenalty: () => 0,
      getOpenNowValue: () => null,
      getPlaceSearchText: place => [
        place.name,
        place.primaryCategory,
        ...(place.tags || []),
        ...(place.routeRoles || []),
      ].join(' ').toLowerCase(),
    },
  };
}

function createInput(overrides = {}) {
  const places = overrides.candidates || [
    makePlace('meal-a', 'meal', 30),
    makePlace('meal-b', 'meal', 30),
    makePlace('cafe-a', 'cafe', 25),
    makePlace('walk-a', 'walk_nature', 20),
    makePlace('bar-a', 'bar', 25),
  ];
  const timeConfig = overrides.timeConfig || { key: 'time_2_3', minStops: 3, maxStops: 3, targetMin: 120 };
  const moodContext = overrides.moodContext || {
    labels: ['Local food'],
    primaryPreferred: ['meal', 'cafe', 'walk_nature', 'bar'],
    secondaryPreferred: [],
    tagsPreferred: [],
    compositionKeys: ['local_food'],
  };
  const baseContext = {
    areaConfig: { center: { lat: 37.5, lng: 127.0 }, radiusM: 1000, label: 'Test area' },
    timeConfig,
    moodContext,
    startTimeContext: {},
    refinementKeys: overrides.refinementKeys || [],
    routePreferences: overrides.routePreferences || null,
    durationCapMin: overrides.durationHardMaxMin ?? 120,
    previousStopIdentitySet: new Set(),
    previousRouteOverlapMultiplier: 1,
  };

  return {
    candidates: places,
    timeConfig,
    moodContext,
    startTimeContext: {},
    refinementKeys: overrides.refinementKeys || [],
    routePreferences: overrides.routePreferences || null,
    sequence: overrides.sequence || ['meal', 'cafe', 'walk_nature'],
    requiredCategories: overrides.requiredCategories || ['meal'],
    minimumStops: overrides.minimumStops || 3,
    maxStops: overrides.maxStops || timeConfig.maxStops,
    durationHardMaxMin: overrides.durationHardMaxMin ?? 120,
    defaultMaxWalkMinutes: 15,
    lessWalkingMaxWalkMinutes: 8,
    beamWidth: overrides.beamWidth || 8,
    baseContext,
  };
}

function signature(route) {
  return route.places.map(place => place.id).join('>');
}

test('beam search returns a deterministic route', () => {
  const deps = createDeps();
  const first = runBeamSearch(createInput(), deps);
  const second = runBeamSearch(createInput(), deps);

  assert.equal(first.fallbackRequired, false);
  assert.equal(signature(first.route), signature(second.route));
});

test('beam search respects the total duration budget', () => {
  const deps = createDeps({ 'meal-a>cafe-a': 5, 'cafe-a>walk-a': 10 });
  const result = runBeamSearch(createInput({
    sequence: ['meal', 'cafe'],
    requiredCategories: ['meal'],
    minimumStops: 2,
    maxStops: 3,
    durationHardMaxMin: 65,
  }), deps);

  assert.equal(result.fallbackRequired, false);
  assert.ok(result.route.estimate.total <= 65);
});

test('less-walking refinement caps per-leg walking', () => {
  const deps = createDeps({
    'meal-a>cafe-a': 12,
    'meal-a>cafe-near': 4,
  });
  const result = runBeamSearch(createInput({
    candidates: [
      makePlace('meal-a', 'meal', 30),
      makePlace('cafe-a', 'cafe', 25, { sourcePriority: 20 }),
      makePlace('cafe-near', 'cafe', 25),
    ],
    sequence: ['meal', 'cafe'],
    requiredCategories: ['meal'],
    refinementKeys: ['walk'],
    minimumStops: 2,
    maxStops: 2,
    durationHardMaxMin: 90,
  }), deps);

  assert.equal(result.fallbackRequired, false);
  assert.ok(result.route.estimate.legWalkMinutes.slice(1).every(minutes => minutes <= 8));
  assert.deepEqual(result.route.places.map(place => place.id), ['meal-a', 'cafe-near']);
});

test('beam search does not select duplicate place ids', () => {
  const deps = createDeps();
  const result = runBeamSearch(createInput({
    candidates: [
      makePlace('same', 'meal', 20),
      makePlace('same', 'meal', 20, { name: 'duplicate row' }),
      makePlace('other', 'meal', 20),
    ],
    sequence: ['meal', 'meal'],
    requiredCategories: ['meal'],
    minimumStops: 2,
    maxStops: 2,
    durationHardMaxMin: 70,
  }), deps);

  assert.equal(result.fallbackRequired, false);
  assert.equal(new Set(result.route.places.map(place => place.id)).size, result.route.places.length);
});

test('beam search respects must-include categories', () => {
  const deps = createDeps();
  const result = runBeamSearch(createInput({
    sequence: ['meal', 'cafe', 'bar'],
    requiredCategories: ['bar'],
    minimumStops: 3,
    maxStops: 3,
    durationHardMaxMin: 120,
  }), deps);

  assert.equal(result.fallbackRequired, false);
  assert.ok(result.route.places.some(place => place.primaryCategory === 'bar'));
});

test('selected route shape affects the sequence', () => {
  const deps = createDeps();
  const mealFirst = runBeamSearch(createInput({
    candidates: [
      makePlace('meal-a', 'meal', 20),
      makePlace('cafe-a', 'cafe', 20),
    ],
    sequence: ['meal', 'cafe'],
    requiredCategories: ['meal'],
    minimumStops: 2,
    maxStops: 2,
    durationHardMaxMin: 70,
  }), deps);
  const cafeFirst = runBeamSearch(createInput({
    candidates: [
      makePlace('meal-a', 'meal', 20),
      makePlace('cafe-a', 'cafe', 20),
    ],
    sequence: ['cafe', 'meal'],
    requiredCategories: ['meal'],
    routePreferences: { shapeSequence: ['cafe', 'meal'] },
    minimumStops: 2,
    maxStops: 2,
    durationHardMaxMin: 70,
  }), deps);

  assert.deepEqual(mealFirst.route.places.map(place => place.primaryCategory), ['meal', 'cafe']);
  assert.deepEqual(cafeFirst.route.places.map(place => place.primaryCategory), ['cafe', 'meal']);
});

test('explanation only references supported score breakdown signals', () => {
  const explanation = explainRoute({
    places: [
      makePlace('meal-a', 'meal', 20),
      makePlace('cafe-a', 'cafe', 20),
    ],
    placeScores: [],
    routeScoreBreakdown: {
      sumPlaceScore: { score: 10 },
      routeShapeFit: { score: 0 },
      diversityScore: { score: 12 },
      durationOveragePenalty: { score: 0 },
    },
    context: { durationHardMaxMin: 80, refinementKeys: [] },
  });

  assert.match(explanation.why, /selected stops scored well/);
  assert.match(explanation.why, /mixes/);
  assert.doesNotMatch(explanation.why, /category flow/);
  assert.doesNotMatch(explanation.why, /live opening|open now/i);
});

test('fallback is required only when no valid route exists', () => {
  const deps = createDeps();
  const valid = runBeamSearch(createInput({
    sequence: ['meal', 'cafe'],
    requiredCategories: ['meal'],
    minimumStops: 2,
    maxStops: 2,
    durationHardMaxMin: 80,
  }), deps);
  const impossible = runBeamSearch(createInput({
    candidates: [
      makePlace('meal-a', 'meal', 20),
      makePlace('cafe-a', 'cafe', 20),
    ],
    sequence: ['meal', 'cafe'],
    requiredCategories: ['bar'],
    minimumStops: 2,
    maxStops: 2,
    durationHardMaxMin: 80,
  }), deps);

  assert.equal(valid.fallbackRequired, false);
  assert.equal(impossible.fallbackRequired, true);
  assert.equal(impossible.reason, 'no_valid_route');
});
