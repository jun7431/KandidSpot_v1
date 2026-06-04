const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeRequest } = require('../normalizeRequest');

test('normalizeRequest returns canonical route input without reading app globals', () => {
  const places = [{ id: 'saved-1', name: 'Saved place' }];
  const result = normalizeRequest({
    area: 'hongdae_yeonnam',
    time: 'time_2_3',
    mood: ['cafes_dessert', 'local_food'],
    startTime: { period: 'evening', customStartTime: '18:30' },
    refinementInput: ['walk', 'walk', 'quiet'],
    contextText: 'prefer side streets',
  }, {
    defaults: {
      places,
      activeRefinements: ['local'],
    },
    areaCenters: {
      hongdae_yeonnam: { lat: 37.5563, lng: 126.9236 },
    },
    normalizeAreaKey: value => value,
    normalizeTimeKey: value => value,
    normalizeMoodKeys: value => (Array.isArray(value) ? value : [value]).filter(Boolean),
    normalizeStartTimePeriod: value => String(value || 'afternoon'),
    getCustomStartTimeValue: value => String(value || ''),
    normalizeRefinementKeys: value => [...new Set((Array.isArray(value) ? value : [value]).filter(Boolean))],
    normalizeCoords: coords => coords && ({ lat: Number(coords.lat), lng: Number(coords.lng) }),
  });

  assert.equal(result.areaKey, 'hongdae_yeonnam');
  assert.equal(result.timeKey, 'time_2_3');
  assert.equal(result.moodKey, 'cafes_dessert');
  assert.deepEqual(result.startTime, { period: 'evening', customStartTime: '18:30' });
  assert.deepEqual(result.refinements, ['walk', 'quiet']);
  assert.deepEqual(result.coords, { lat: 37.5563, lng: 126.9236 });
  assert.deepEqual(result.runtimeContext.center, { lat: 37.5563, lng: 126.9236 });
  assert.equal(result.places, places);
  assert.equal(result.freeTextContext, 'prefer side streets');
  assert.equal(result.contextNote, 'prefer side streets');
});

test('normalizeRequest prefers explicit runtime coordinates over area center', () => {
  const result = normalizeRequest({
    areaKey: 'near_me',
    runtimeContext: {
      center: { lat: '37.5', lng: '127.0' },
    },
  }, {
    defaults: {
      areaKey: 'hongdae_yeonnam',
      timeKey: 'time_1_2',
      moodKey: 'local_food',
      startTimePeriod: 'afternoon',
      customStartTime: '',
      places: [],
      activeRefinements: [],
    },
    areaCenters: {
      near_me: { lat: 0, lng: 0 },
    },
  });

  assert.deepEqual(result.coords, { lat: 37.5, lng: 127.0 });
  assert.deepEqual(result.runtimeContext.center, { lat: '37.5', lng: '127.0' });
});
