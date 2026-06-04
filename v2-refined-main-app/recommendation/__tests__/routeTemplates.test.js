const test = require('node:test');
const assert = require('node:assert/strict');

const {
  deriveRefinedCategorySequence,
  getRouteCategorySequence,
} = require('../routeTemplates');

test('getRouteCategorySequence keeps existing mood and time templates', () => {
  const sequence = getRouteCategorySequence({
    moodContext: { compositionKeys: ['local_food'] },
    timeConfig: { key: 'time_2_3', maxStops: 3 },
  });

  assert.deepEqual(sequence, ['meal', 'cafe', 'bar']);
});

test('getRouteCategorySequence applies optional shape sequence before mood template', () => {
  const sequence = getRouteCategorySequence({
    moodContext: { compositionKeys: ['cafes_dessert'] },
    timeConfig: { key: 'time_4_6', maxStops: 3 },
    routePreferences: { shapeSequence: ['meal', 'walk_nature', 'cafe', 'bar'] },
  });

  assert.deepEqual(sequence, ['meal', 'walk_nature', 'cafe']);
});

test('deriveRefinedCategorySequence adds cafe bias and trims walk refinement', () => {
  const cafeSequence = deriveRefinedCategorySequence({
    baseSequence: ['meal', 'shopping', 'bar'],
    refinements: ['cafe'],
    moodContext: { compositionKeys: ['local_food'] },
  });
  const walkSequence = deriveRefinedCategorySequence({
    baseSequence: ['meal', 'cafe', 'bar'],
    refinements: ['walk'],
    moodContext: { compositionKeys: ['local_food'] },
  });

  assert.deepEqual(cafeSequence, ['meal', 'cafe', 'bar']);
  assert.deepEqual(walkSequence, ['meal', 'cafe']);
});
