(function initRerankRoutes(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.rerankRoutes = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildRerankRoutes() {
  function placeKey(place = {}) {
    if (place.placeId) return `place:${place.placeId}`;
    if (place.id) return `bookmark:${place.id}`;
    return `name-address:${place.name || ''}|${place.address || ''}`;
  }

  function primaryCategory(place = {}) {
    return String(place.primaryCategory || '').trim();
  }

  function getSignature(route = {}) {
    return (route.places || []).map(placeKey).join('|');
  }

  function hasRequiredCategories(places = [], requiredCategories = []) {
    const categories = new Set(places.map(primaryCategory));
    return requiredCategories.every(category => categories.has(category));
  }

  function getQuietSignal(route = {}) {
    return (route.placeScores || []).reduce((sum, item) => {
      const crowd = Number(item.scoreBreakdown?.crowdRisk?.score || 0);
      const tourist = Number(item.scoreBreakdown?.touristTrapRisk?.score || 0);
      return sum + crowd + tourist;
    }, 0);
  }

  function getDiversityScore(places = []) {
    const categories = places.map(primaryCategory).filter(Boolean);
    const uniqueCount = new Set(categories).size;
    return uniqueCount * 5 - Math.max(0, categories.length - uniqueCount) * 12;
  }

  function getRerankScore(route = {}, context = {}) {
    const places = route.places || [];
    const requiredCategories = context.requiredCategories || [];
    const refinementKeys = context.refinementKeys || [];
    const durationHardMaxMin = Number(context.durationHardMaxMin);
    const estimate = route.estimate || {};
    const walkingMinutes = Number(estimate.walkingMinutes || 0);
    const totalMinutes = Number(estimate.total || 0);
    const shapeScore = Number(route.routeScoreBreakdown?.routeShapeFit?.score || 0);
    let score = Number(route.routeScore || 0);

    score += hasRequiredCategories(places, requiredCategories) ? 60 : -1000;
    if (Number.isFinite(durationHardMaxMin)) {
      score += totalMinutes <= durationHardMaxMin ? 30 : -(totalMinutes - durationHardMaxMin) * 10;
    }
    score += refinementKeys.includes('walk') ? -walkingMinutes * 1.2 : -walkingMinutes * 0.25;
    score += getDiversityScore(places);
    score += shapeScore * 0.75;
    if (refinementKeys.includes('quiet')) score += getQuietSignal(route);

    return score;
  }

  function compareRoutes(left, right, context = {}) {
    const leftScore = Number(left.rerankScore ?? getRerankScore(left, context));
    const rightScore = Number(right.rerankScore ?? getRerankScore(right, context));
    if (rightScore !== leftScore) return rightScore - leftScore;

    const leftWalking = Number(left.estimate?.walkingMinutes || 0);
    const rightWalking = Number(right.estimate?.walkingMinutes || 0);
    if (leftWalking !== rightWalking) return leftWalking - rightWalking;

    const leftTotal = Number(left.estimate?.total || 0);
    const rightTotal = Number(right.estimate?.total || 0);
    if (leftTotal !== rightTotal) return leftTotal - rightTotal;

    return getSignature(left).localeCompare(getSignature(right));
  }

  function rerankRoutes(routes = [], context = {}) {
    return (Array.isArray(routes) ? routes : [])
      .map(route => ({
        ...route,
        rerankScore: getRerankScore(route, context),
        signature: route.signature || getSignature(route),
      }))
      .sort((left, right) => compareRoutes(left, right, context));
  }

  return {
    getRerankScore,
    rerankRoutes,
  };
}));
