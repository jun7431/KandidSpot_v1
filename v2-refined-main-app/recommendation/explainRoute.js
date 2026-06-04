(function initExplainRoute(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.explainRoute = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildExplainRoute() {
  function scoreOf(breakdown = {}, key) {
    return Number(breakdown[key]?.score || 0);
  }

  function primaryCategory(place = {}) {
    return String(place.primaryCategoryLabel || place.primaryCategory || place.categoryName || 'place').trim();
  }

  function hasPositivePlaceSignal(placeScores = [], key) {
    return placeScores.some(item => Number(item.scoreBreakdown?.[key]?.score || 0) > 0);
  }

  function explainRoute(input = {}) {
    const places = Array.isArray(input.places) ? input.places : [];
    const placeScores = Array.isArray(input.placeScores) ? input.placeScores : [];
    const routeScoreBreakdown = input.routeScoreBreakdown || {};
    const context = input.context || {};
    const refinementKeys = Array.isArray(context.refinementKeys) ? context.refinementKeys : [];
    const categories = [...new Set(places.map(primaryCategory).filter(Boolean))];
    const parts = [];

    if (scoreOf(routeScoreBreakdown, 'sumPlaceScore') > 0) {
      parts.push('The selected stops scored well on saved-place fit signals.');
    }
    if (scoreOf(routeScoreBreakdown, 'routeShapeFit') > 0) {
      parts.push('The order follows the selected category flow.');
    }
    if (scoreOf(routeScoreBreakdown, 'diversityScore') > 0 && categories.length > 1) {
      parts.push(`It mixes ${categories.slice(0, 3).join(', ')} stops.`);
    }
    if (scoreOf(routeScoreBreakdown, 'durationOveragePenalty') === 0 && Number.isFinite(Number(context.durationHardMaxMin))) {
      parts.push('It stays within the configured time budget.');
    }
    if (refinementKeys.includes('walk') && scoreOf(routeScoreBreakdown, 'totalWalkingPenalty') > -30) {
      parts.push('The less-walking refinement is supported by short walking legs.');
    }
    if (refinementKeys.includes('quiet') && (
      hasPositivePlaceSignal(placeScores, 'crowdRisk') ||
      scoreOf(routeScoreBreakdown, 'storyFlowScore') > 0
    )) {
      parts.push('The quiet-route preference is reflected in the scoring signals.');
    }

    const why = parts.length
      ? parts.join(' ')
      : 'This route was selected from the highest-scoring valid saved-place combination.';

    return {
      why,
      ask: {
        why,
        crowd: 'I do not verify live crowd levels; this answer only reflects saved-place scoring signals.',
        cafe: hasPositivePlaceSignal(placeScores, 'categoryFit')
          ? 'Cafe or dessert fit is based on the selected stops score breakdown.'
          : 'Cafe fit was not a leading score signal for this route.',
      },
    };
  }

  return {
    explainRoute,
  };
}));
