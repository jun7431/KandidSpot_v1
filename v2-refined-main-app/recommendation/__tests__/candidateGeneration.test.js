const test = require('node:test');
const assert = require('node:assert/strict');

const {
  filterCandidatesForOpenNow,
  generateDataDrivenCandidates,
} = require('../candidateGeneration');

test('generateDataDrivenCandidates applies hard filters and area radius', () => {
  const center = { lat: 37.5, lng: 127.0 };
  const result = generateDataDrivenCandidates([
    { id: 'near', name: 'Near meal', lat: 37.5005, lng: 127.0005, primaryCategory: 'meal' },
    { id: 'far', name: 'Far cafe', lat: 37.6, lng: 127.1, primaryCategory: 'cafe' },
    { id: 'invalid', name: 'No coords', primaryCategory: 'meal' },
    { id: 'closed-source', name: 'Unavailable', lat: 37.5002, lng: 127.0002, primaryCategory: 'meal', available: false },
  ], {
    areaConfig: { routeKey: 'hongdae_yeonnam', center, radiusM: 300 },
    timeConfig: { minStops: 1, maxStops: 2 },
  });

  assert.deepEqual(result.candidates.map(place => place.id), ['near']);
  assert.equal(result.rejected.length, 2);
  assert.deepEqual(result.rejected.map(item => item.reason).sort(), ['invalid_coordinates', 'unavailable']);
});

test('open-now refinement is skipped when opening-hours coverage is unavailable', () => {
  const candidates = [
    { id: 'a', name: 'A' },
    { id: 'b', name: 'B' },
    { id: 'c', name: 'C' },
  ];
  const result = filterCandidatesForOpenNow(candidates, ['open']);

  assert.equal(result.openNowFilterApplied, false);
  assert.equal(result.openHoursCoverage.hasCoverage, false);
  assert.equal(result.candidates, candidates);
});

test('open-now refinement filters only when coverage is sufficient', () => {
  const candidates = [
    { id: 'a', openNow: true },
    { id: 'b', openNow: false },
    { id: 'c', openingHours: { openNow: true } },
    { id: 'd' },
  ];
  const result = filterCandidatesForOpenNow(candidates, ['open']);

  assert.equal(result.openNowFilterApplied, true);
  assert.deepEqual(result.candidates.map(place => place.id), ['a', 'c']);
  assert.equal(result.openHoursCoverage.withOpenNowData, 3);
});
