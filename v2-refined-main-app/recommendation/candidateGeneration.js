(function initCandidateGeneration(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.candidateGeneration = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildCandidateGeneration() {
  const DEFAULT_OPEN_NOW_FIELD_PATHS = [
    ['openNow'],
    ['isOpenNow'],
    ['currentlyOpen'],
    ['isOpen'],
    ['openingHours', 'openNow'],
    ['openingHours', 'isOpen'],
    ['hours', 'openNow'],
    ['hours', 'isOpen'],
  ];

  function hasValidCoords(place) {
    if (!place) return false;
    if (place.lat === undefined || place.lat === null || place.lat === '') return false;
    if (place.lng === undefined || place.lng === null || place.lng === '') return false;
    return Number.isFinite(Number(place.lat)) && Number.isFinite(Number(place.lng));
  }

  function toRadians(value) {
    return Number(value) * Math.PI / 180;
  }

  function distanceKm(a, b) {
    if (!hasValidCoords(a) || !hasValidCoords(b)) return Infinity;
    const earthRadiusKm = 6371;
    const latDelta = toRadians(Number(b.lat) - Number(a.lat));
    const lngDelta = toRadians(Number(b.lng) - Number(a.lng));
    const lat1 = toRadians(Number(a.lat));
    const lat2 = toRadians(Number(b.lat));
    const h =
      Math.sin(latDelta / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function getPlaceDistanceM(place, center) {
    const km = distanceKm(place, center);
    return Number.isFinite(km) ? km * 1000 : Infinity;
  }

  function getAreaRadiusM(areaConfig = {}) {
    if (Number.isFinite(Number(areaConfig.radiusM))) return Number(areaConfig.radiusM);
    if (Number.isFinite(Number(areaConfig.radiusKm))) return Number(areaConfig.radiusKm) * 1000;
    return 1800;
  }

  function getValueAtPath(object, path) {
    return path.reduce((value, key) => (
      value && value[key] !== undefined ? value[key] : undefined
    ), object);
  }

  function getOpenNowValue(place, fieldPaths = DEFAULT_OPEN_NOW_FIELD_PATHS) {
    for (const path of fieldPaths) {
      const value = getValueAtPath(place, path);
      if (typeof value === 'boolean') return value;
    }
    return null;
  }

  function getOpenHoursCoverage(candidates, options = {}) {
    const fieldPaths = options.fieldPaths || DEFAULT_OPEN_NOW_FIELD_PATHS;
    const total = Array.isArray(candidates) ? candidates.length : 0;
    const withOpenNowData = (candidates || []).filter(place => (
      getOpenNowValue(place, fieldPaths) !== null
    )).length;
    const openNow = (candidates || []).filter(place => (
      getOpenNowValue(place, fieldPaths) === true
    )).length;
    const coverageRatio = total ? withOpenNowData / total : 0;

    return {
      total,
      withOpenNowData,
      openNow,
      coverageRatio,
      hasCoverage: withOpenNowData > 0,
      canSafelyFilter: withOpenNowData >= Math.max(2, Math.floor(total * 0.3)) && openNow >= 2,
    };
  }

  function filterCandidatesForOpenNow(candidates, refinementKeys = [], options = {}) {
    const keys = Array.isArray(refinementKeys) ? refinementKeys : [];
    const places = Array.isArray(candidates) ? candidates : [];
    if (!keys.includes('open')) {
      return {
        candidates: places,
        openHoursCoverage: getOpenHoursCoverage(places, options),
        openNowFilterApplied: false,
      };
    }

    const openHoursCoverage = getOpenHoursCoverage(places, options);
    if (!openHoursCoverage.canSafelyFilter) {
      return {
        candidates: places,
        openHoursCoverage,
        openNowFilterApplied: false,
      };
    }

    return {
      candidates: places.filter(place => getOpenNowValue(place, options.fieldPaths) === true),
      openHoursCoverage,
      openNowFilterApplied: true,
    };
  }

  function getRuntimePlaceKey(place = {}) {
    if (place.placeId) return `place:${place.placeId}`;
    if (place.id) return `bookmark:${place.id}`;
    return `name-address:${place.name}|${place.address}`;
  }

  function getHardFilterReason(place) {
    if (!place || typeof place !== 'object') return 'invalid_place';
    if (!place.name) return 'missing_name';
    if (!hasValidCoords(place)) return 'invalid_coordinates';
    if (place.available === false) return 'unavailable';
    if (!place.primaryCategory) return 'missing_primary_category';
    return '';
  }

  function applyHardFilters(places) {
    const rejected = [];
    const candidates = (Array.isArray(places) ? places : []).filter(place => {
      const reason = getHardFilterReason(place);
      if (reason) rejected.push({ place, reason });
      return !reason;
    });
    return { candidates, rejected };
  }

  function isActualNearMeAreaConfig(areaConfig = {}) {
    return (
      areaConfig.routeKey === 'near_me' &&
      hasValidCoords(areaConfig.center) &&
      !areaConfig.nearMeFallbackUsed
    );
  }

  function defaultPlaceMatchesMoodCandidate(place, moodContext = {}) {
    const preferred = [
      ...(moodContext.primaryPreferred || []),
      ...(moodContext.secondaryPreferred || []),
    ];
    return preferred.includes(place.primaryCategory);
  }

  function generateDataDrivenCandidates(places, options = {}) {
    const areaConfig = options.areaConfig || {};
    const timeConfig = options.timeConfig || {};
    const moodContext = options.moodContext || null;
    const nearestCandidateLimit = options.nearestCandidateLimit || 24;
    const placeMatchesMoodCandidate = options.placeMatchesMoodCandidate || defaultPlaceMatchesMoodCandidate;
    const runtimeKey = options.getRuntimePlaceKey || getRuntimePlaceKey;
    const hardFilterResult = applyHardFilters(places);
    const radiusM = getAreaRadiusM(areaConfig);
    const withDistance = hardFilterResult.candidates.map(place => ({
      place,
      distanceM: getPlaceDistanceM(place, areaConfig.center),
    }));
    const minimumCandidateCount = isActualNearMeAreaConfig(areaConfig)
      ? Math.max(Number(timeConfig.minStops) || 0, Number(timeConfig.maxStops) || 0)
      : Number(timeConfig.minStops) || 0;
    const expansionMultipliers = isActualNearMeAreaConfig(areaConfig)
      ? [1.5, 2.5, 4, 8]
      : [1.5];
    let matches = withDistance.filter(item => item.distanceM <= radiusM);

    for (const multiplier of expansionMultipliers) {
      if (matches.length >= minimumCandidateCount) break;
      matches = withDistance.filter(item => item.distanceM <= radiusM * multiplier);
    }

    if (isActualNearMeAreaConfig(areaConfig) && moodContext) {
      const nearestMoodLimit = Math.max(
        minimumCandidateCount,
        Math.min(nearestCandidateLimit, (Number(timeConfig.maxStops) || 0) * 6)
      );
      const byKey = new Map();
      const nearestMoodMatches = withDistance
        .filter(item => placeMatchesMoodCandidate(item.place, moodContext))
        .sort((left, right) => left.distanceM - right.distanceM)
        .slice(0, nearestMoodLimit);

      [...nearestMoodMatches, ...matches].forEach(item => {
        const key = runtimeKey(item.place);
        if (!byKey.has(key)) byKey.set(key, item);
      });
      matches = Array.from(byKey.values()).sort((left, right) => left.distanceM - right.distanceM);
    }

    if (isActualNearMeAreaConfig(areaConfig) && matches.length < minimumCandidateCount) {
      const nearestLimit = Math.max(
        minimumCandidateCount,
        Math.min(nearestCandidateLimit, (Number(timeConfig.maxStops) || 0) * 6)
      );
      matches = withDistance
        .filter(item => Number.isFinite(item.distanceM))
        .sort((left, right) => left.distanceM - right.distanceM)
        .slice(0, nearestLimit);
    }

    return {
      candidates: matches
        .map(item => ({ ...item.place, __distanceM: item.distanceM }))
        .sort((left, right) => left.__distanceM - right.__distanceM),
      rejected: hardFilterResult.rejected,
      radiusM,
      minimumCandidateCount,
    };
  }

  function getPlacePrimaryCategory(place = {}) {
    return String(place.primaryCategory || '').trim();
  }

  function evaluateMustIncludeFeasibility(candidates, options = {}) {
    const routePreferences = options.routePreferences || {};
    const requiredCategories = options.requiredCategories || [];
    const getPrimary = options.getPlacePrimaryCategory || getPlacePrimaryCategory;
    const categoryAvailable = category => (candidates || []).some(place => getPrimary(place) === category);
    const missingRequiredCategories = requiredCategories.filter(category => !categoryAvailable(category));
    const missingPinnedGroups = (routePreferences.pinCategoryGroups || []).filter(group => (
      !(group.categories || []).some(categoryAvailable)
    ));

    return {
      feasible: !missingRequiredCategories.length && !missingPinnedGroups.length,
      missingRequiredCategories,
      missingPinnedGroups,
    };
  }

  return {
    DEFAULT_OPEN_NOW_FIELD_PATHS,
    hasValidCoords,
    distanceKm,
    getPlaceDistanceM,
    getAreaRadiusM,
    getOpenNowValue,
    getOpenHoursCoverage,
    filterCandidatesForOpenNow,
    getHardFilterReason,
    applyHardFilters,
    generateDataDrivenCandidates,
    evaluateMustIncludeFeasibility,
  };
}));
