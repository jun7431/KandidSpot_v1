(function initRouteTemplates(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.routeTemplates = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildRouteTemplates() {
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

  const OPTIONAL_SHAPE_CATEGORY_SEQUENCES = {
    slow_build: ['cafe', 'walk_nature', 'meal', 'bar'],
    food_first: ['meal', 'walk_nature', 'cafe', 'bar'],
    wander_end_loud: ['walk_nature', 'cafe', 'meal', 'bar'],
  };

  function normalizeRefinementKeys(value) {
    const values = Array.isArray(value) ? value : value ? [value] : [];
    return [...new Set(values.map(item => String(item || '').trim()).filter(Boolean))];
  }

  function adjustPrimaryCategorySequenceForStartTime(sequence, startTimeContext = {}) {
    const slots = Array.isArray(sequence) ? sequence.slice() : [];
    if (!startTimeContext.isMorning) return slots;
    return slots.map(category => (category === 'bar' ? 'cafe' : category));
  }

  function getRouteCategorySequence(input = {}) {
    const moodContext = input.moodContext || {};
    const timeConfig = input.timeConfig || {};
    const routePreferences = input.routePreferences || null;
    const startTimeContext = input.startTimeContext || {};

    if (routePreferences?.shapeSequence?.length) {
      return adjustPrimaryCategorySequenceForStartTime(
        routePreferences.shapeSequence.slice(0, timeConfig.maxStops),
        startTimeContext
      );
    }

    const primaryMood = moodContext.compositionKeys?.[0] || 'local_food';
    const template = MOOD_CATEGORY_SEQUENCES[primaryMood]?.[timeConfig.key]
      || MOOD_CATEGORY_SEQUENCES.local_food[timeConfig.key]
      || ['meal', 'cafe'];
    return adjustPrimaryCategorySequenceForStartTime(
      template.slice(0, timeConfig.maxStops),
      startTimeContext
    );
  }

  function deriveRefinedCategorySequence(input = {}) {
    const baseSequence = Array.isArray(input.baseSequence) ? input.baseSequence : [];
    const routePreferences = input.routePreferences || null;
    const moodContext = input.moodContext || {};
    const keys = normalizeRefinementKeys(input.refinements);

    if (!keys.length || routePreferences?.shapeSequence?.length) return baseSequence;
    if (!baseSequence.length) return baseSequence;

    const required = new Set((moodContext.compositionKeys || []).flatMap(
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

  return {
    MOOD_CATEGORY_SEQUENCES,
    MOOD_REQUIRED_PRIMARY_CATEGORIES,
    OPTIONAL_SHAPE_CATEGORY_SEQUENCES,
    adjustPrimaryCategorySequenceForStartTime,
    getRouteCategorySequence,
    deriveRefinedCategorySequence,
  };
}));
