const test = require('node:test');
const assert = require('node:assert/strict');

const { scorePlace } = require('../scorePlace');

test('scorePlace is deterministic and exposes stable diagnostic signals', () => {
  const place = {
    id: 'meal-1',
    name: 'Local Table',
    lat: 37.5,
    lng: 127.0,
    primaryCategory: 'meal',
    tags: ['cozy'],
    routeRoles: ['main_stop'],
    available: true,
    isMatched: true,
    address: 'Seoul',
    subCategory: 'korean',
  };
  const context = {
    areaConfig: { center: { lat: 37.5001, lng: 127.0001 }, radiusM: 1000 },
    moodContext: {
      primaryPreferred: ['meal'],
      secondaryPreferred: ['cafe'],
      tagsPreferred: ['cozy'],
      compositionKeys: ['local_food'],
    },
    timeConfig: { targetMin: 90, maxStops: 3 },
    targetCategory: 'meal',
    refinementKeys: [],
    categoryCounts: {},
  };
  const deps = {
    getRoutePreferenceScore: () => 4,
    getDurationFitScore: () => 2,
    getStartTimeCategoryScore: () => 3,
    getBacktrackingPenalty: () => 1,
    getOpenNowValue: () => null,
  };

  const first = scorePlace(place, context, deps);
  const second = scorePlace(place, context, deps);
  const requiredSignals = [
    'moodMatch',
    'categoryFit',
    'areaFit',
    'distancePenalty',
    'timeOfDayFit',
    'localness',
    'touristTrapRisk',
    'crowdRisk',
    'priceFit',
    'curationQuality',
    'openingHoursConfidence',
    'savedPlaceAffinity',
  ];

  assert.equal(first.score, second.score);
  assert.ok(Number.isFinite(first.score));
  requiredSignals.forEach(key => assert.ok(first.scoreBreakdown[key], `missing ${key}`));
  assert.equal(first.scoreBreakdown.openingHoursConfidence.available, false);
  assert.match(first.weightsVersion, /^heuristic-v1-extraction-/);
});

test('scorePlace hard-filters invalid candidates', () => {
  const result = scorePlace({ name: 'Missing coords', primaryCategory: 'meal' });

  assert.equal(result.score, -Infinity);
  assert.equal(result.scoreBreakdown.hardFilter.available, true);
});
