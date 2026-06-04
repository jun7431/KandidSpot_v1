(function initBeamSearch(root, factory) {
  const routeTemplatesApi = root.KSRecommendation?.routeTemplates ||
    (typeof require === 'function' ? require('./routeTemplates') : null);
  const scorePlaceApi = root.KSRecommendation?.scorePlace ||
    (typeof require === 'function' ? require('./scorePlace') : null);
  const scoreRouteApi = root.KSRecommendation?.scoreRoute ||
    (typeof require === 'function' ? require('./scoreRoute') : null);
  const rerankRoutesApi = root.KSRecommendation?.rerankRoutes ||
    (typeof require === 'function' ? require('./rerankRoutes') : null);
  const api = factory(routeTemplatesApi, scorePlaceApi, scoreRouteApi, rerankRoutesApi);
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.beamSearch = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildBeamSearch(
  routeTemplatesApi,
  scorePlaceApi,
  scoreRouteApi,
  rerankRoutesApi
) {
  const DEFAULT_BEAM_WIDTH = 12;

  function hasValidCoords(place) {
    return place &&
      Number.isFinite(Number(place.lat)) &&
      Number.isFinite(Number(place.lng));
  }

  function getPlaceKey(place = {}) {
    if (place.placeId) return `place:${place.placeId}`;
    if (place.id) return `bookmark:${place.id}`;
    return `name-address:${place.name || ''}|${place.address || ''}`;
  }

  function getPrimaryCategory(place = {}) {
    return String(place.primaryCategory || '').trim();
  }

  function normalizeBeamWidth(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return DEFAULT_BEAM_WIDTH;
    return Math.max(8, Math.min(20, Math.round(parsed)));
  }

  function getCategoryCounts(places = []) {
    return places.reduce((counts, place) => {
      const category = getPrimaryCategory(place);
      if (category) counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});
  }

  function estimateRoute(places, deps = {}, context = {}) {
    if (scoreRouteApi?.estimateRoute) {
      return scoreRouteApi.estimateRoute(places, {
        ...deps,
        defaultMaxWalkMinutes: context.defaultMaxWalkMinutes,
      });
    }
    return { stay: 0, travel: 0, total: 0, walkingMinutes: 0, distanceMeters: 0, legWalkMinutes: [] };
  }

  function routeSignature(places = [], deps = {}) {
    const getRuntimePlaceKey = deps.getRuntimePlaceKey || getPlaceKey;
    return places.map(getRuntimePlaceKey).join('|');
  }

  function hasRequiredCategories(places = [], requiredCategories = []) {
    const categories = new Set(places.map(getPrimaryCategory));
    return requiredCategories.every(category => categories.has(category));
  }

  function hasPinnedCategoryGroups(places = [], routePreferences = {}) {
    const categories = new Set(places.map(getPrimaryCategory));
    return (routePreferences.pinCategoryGroups || []).every(group => (
      (group.categories || []).some(category => categories.has(category))
    ));
  }

  function satisfiesMustIncludeCategories(places = [], context = {}) {
    const routePreferences = context.routePreferences || {};
    const requiredCategories = [
      ...(context.requiredCategories || []),
      ...(routePreferences.pinCategories || []),
    ];
    return hasRequiredCategories(places, requiredCategories) &&
      hasPinnedCategoryGroups(places, routePreferences);
  }

  function getTargetCategoryPool(candidates, selectedKeys, targetCategory, deps = {}) {
    const getRuntimePlaceKey = deps.getRuntimePlaceKey || getPlaceKey;
    const available = candidates.filter(place => !selectedKeys.has(getRuntimePlaceKey(place)));
    if (!targetCategory) return available;
    const targeted = available.filter(place => getPrimaryCategory(place) === targetCategory);
    return targeted.length ? targeted : available;
  }

  function getLegMobility(previousPlace, place, deps = {}, maxWalkMinutes = 15) {
    if (!previousPlace) {
      return {
        distanceMeters: 0,
        estimatedWalkMinutes: 0,
        isWalkable: true,
        suggestedMode: 'walk',
      };
    }
    const classifyLegMobility = deps.classifyLegMobility || (() => ({
      distanceMeters: 0,
      estimatedWalkMinutes: 0,
      isWalkable: true,
      suggestedMode: 'walk',
    }));
    return classifyLegMobility(previousPlace, place, maxWalkMinutes);
  }

  function violatesHardConstraints(state, place, context = {}, deps = {}) {
    if (!hasValidCoords(place)) return 'invalid_coordinates';

    const getRuntimePlaceKey = deps.getRuntimePlaceKey || getPlaceKey;
    const key = getRuntimePlaceKey(place);
    if (state.selectedKeys.has(key)) return 'duplicate_place';

    const refinementKeys = context.refinementKeys || [];
    const previousPlace = state.places[state.places.length - 1] || null;
    if (refinementKeys.includes('walk') && previousPlace) {
      const maxWalkMinutes = Number(context.lessWalkingMaxWalkMinutes || 8);
      const mobility = getLegMobility(previousPlace, place, deps, maxWalkMinutes);
      if (!mobility.isWalkable || Number(mobility.estimatedWalkMinutes) > maxWalkMinutes) {
        return 'less_walking_leg_over_max';
      }
    }

    const estimate = estimateRoute([...state.places, place], deps, context);
    const durationHardMaxMin = Number(context.durationHardMaxMin);
    if (Number.isFinite(durationHardMaxMin) && Number(estimate.total) > durationHardMaxMin) {
      return 'duration_over_hard_max';
    }

    return '';
  }

  function scoreCandidatePlace(state, place, stopIndex, targetCategory, context = {}, deps = {}) {
    const scorePlace = deps.scorePlace || scorePlaceApi?.scorePlace;
    if (typeof scorePlace !== 'function') return null;

    const selectedPlaces = state.places;
    const placeScore = scorePlace(place, {
      ...context.baseContext,
      categoryCounts: state.categoryCounts,
      stopIndex,
      isFinalStop: stopIndex >= (Number(context.maxStops) || 1) - 1,
      previousPlace: selectedPlaces[selectedPlaces.length - 1] || null,
      selectedPlaces,
      selectedEstimate: state.estimate,
      targetCategory,
    }, deps.placeScoreDeps || {});

    if (!Number.isFinite(placeScore?.score)) return null;
    return placeScore;
  }

  function scoreRouteState(places, placeScores, context = {}, deps = {}) {
    const scoreRoute = deps.scoreRoute || scoreRouteApi?.scoreRoute;
    if (typeof scoreRoute !== 'function') {
      return {
        routeScore: placeScores.reduce((sum, item) => sum + Number(item.score || 0), 0),
        routeScoreBreakdown: {},
        estimate: estimateRoute(places, deps, context),
      };
    }
    return scoreRoute({
      places,
      placeScores,
      sequence: context.sequence,
      refinementKeys: context.refinementKeys,
      durationHardMaxMin: context.durationHardMaxMin,
      routePreferences: context.routePreferences,
    }, deps);
  }

  function makeState(places, placeScores, context = {}, deps = {}) {
    const selectedKeys = new Set(places.map(place => (deps.getRuntimePlaceKey || getPlaceKey)(place)));
    const routeScore = scoreRouteState(places, placeScores, context, deps);
    return {
      places,
      placeScores,
      selectedKeys,
      categoryCounts: getCategoryCounts(places),
      estimate: routeScore.estimate,
      routeScore: routeScore.routeScore,
      routeScoreBreakdown: routeScore.routeScoreBreakdown,
      signature: routeSignature(places, deps),
    };
  }

  function compareStates(left, right) {
    if (right.routeScore !== left.routeScore) return right.routeScore - left.routeScore;
    const leftPlaceScore = left.placeScores.reduce((sum, item) => sum + Number(item.score || 0), 0);
    const rightPlaceScore = right.placeScores.reduce((sum, item) => sum + Number(item.score || 0), 0);
    if (rightPlaceScore !== leftPlaceScore) return rightPlaceScore - leftPlaceScore;
    const leftWalking = Number(left.estimate?.walkingMinutes || 0);
    const rightWalking = Number(right.estimate?.walkingMinutes || 0);
    if (leftWalking !== rightWalking) return leftWalking - rightWalking;
    const leftTotal = Number(left.estimate?.total || 0);
    const rightTotal = Number(right.estimate?.total || 0);
    if (leftTotal !== rightTotal) return leftTotal - rightTotal;
    return left.signature.localeCompare(right.signature);
  }

  function getSequence(input = {}) {
    if (Array.isArray(input.sequence) && input.sequence.length) return input.sequence;
    if (!routeTemplatesApi?.getRouteCategorySequence) return [];
    const base = routeTemplatesApi.getRouteCategorySequence({
      moodContext: input.moodContext,
      timeConfig: input.timeConfig,
      routePreferences: input.routePreferences,
      startTimeContext: input.startTimeContext,
    });
    if (routeTemplatesApi.deriveRefinedCategorySequence) {
      return routeTemplatesApi.deriveRefinedCategorySequence({
        baseSequence: base,
        refinements: input.refinementKeys,
        moodContext: input.moodContext,
        routePreferences: input.routePreferences,
      });
    }
    return base;
  }

  function runBeamSearch(input = {}, deps = {}) {
    const candidates = (Array.isArray(input.candidates) ? input.candidates : [])
      .filter(place => hasValidCoords(place) && place.available !== false && getPrimaryCategory(place));
    const beamWidth = normalizeBeamWidth(input.beamWidth);
    const timeConfig = input.timeConfig || {};
    const sequence = getSequence(input);
    const maxStops = Math.max(1, Number(input.maxStops || timeConfig.maxStops || sequence.length || 1));
    const minimumStops = Math.max(1, Number(input.minimumStops || timeConfig.minStops || 1));
    const context = {
      ...input,
      sequence,
      maxStops,
      minimumStops,
      durationHardMaxMin: Number(input.durationHardMaxMin),
      defaultMaxWalkMinutes: Number(input.defaultMaxWalkMinutes || 15),
      lessWalkingMaxWalkMinutes: Number(input.lessWalkingMaxWalkMinutes || 8),
      baseContext: input.baseContext || {},
    };
    const failures = {};
    let beam = [makeState([], [], context, deps)];
    const finalRoutes = [];

    for (let stopIndex = 0; stopIndex < maxStops; stopIndex += 1) {
      const expanded = [];
      const targetCategory = sequence[stopIndex] || null;

      beam.forEach(state => {
        const pool = getTargetCategoryPool(candidates, state.selectedKeys, targetCategory, deps);
        pool.forEach(place => {
          const violation = violatesHardConstraints(state, place, context, deps);
          if (violation) {
            failures[violation] = (failures[violation] || 0) + 1;
            return;
          }

          const placeScore = scoreCandidatePlace(state, place, stopIndex, targetCategory, context, deps);
          if (!placeScore) {
            failures.unscored_place = (failures.unscored_place || 0) + 1;
            return;
          }

          const nextState = makeState(
            [...state.places, place],
            [...state.placeScores, {
              key: (deps.getRuntimePlaceKey || getPlaceKey)(place),
              place,
              score: placeScore.score,
              scoreBreakdown: placeScore.scoreBreakdown,
              weightsVersion: placeScore.weightsVersion,
            }],
            context,
            deps
          );
          expanded.push(nextState);
          if (
            nextState.places.length >= minimumStops &&
            satisfiesMustIncludeCategories(nextState.places, context)
          ) {
            finalRoutes.push(nextState);
          }
        });
      });

      if (!expanded.length) break;
      beam = expanded.sort(compareStates).slice(0, beamWidth);
    }

    const validRoutes = finalRoutes.filter(route => (
      route.places.length >= minimumStops &&
      satisfiesMustIncludeCategories(route.places, context)
    ));

    if (!validRoutes.length) {
      return {
        route: null,
        routes: [],
        fallbackRequired: true,
        reason: 'no_valid_route',
        failures,
        beamWidth,
      };
    }

    const rerankRoutes = deps.rerankRoutes || rerankRoutesApi?.rerankRoutes;
    const rankedRoutes = typeof rerankRoutes === 'function'
      ? rerankRoutes(validRoutes, context)
      : validRoutes.sort(compareStates);

    return {
      route: rankedRoutes[0],
      routes: rankedRoutes,
      fallbackRequired: false,
      reason: '',
      failures,
      beamWidth,
    };
  }

  return {
    DEFAULT_BEAM_WIDTH,
    runBeamSearch,
  };
}));
