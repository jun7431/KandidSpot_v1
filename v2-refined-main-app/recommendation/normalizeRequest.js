(function initNormalizeRequest(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.normalizeRequest = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildNormalizeRequest() {
  function firstDefined(...values) {
    return values.find(value => value !== undefined && value !== null);
  }

  function defaultNormalizeAreaKey(value) {
    return String(value || '').trim() || 'hongdae_yeonnam';
  }

  function defaultNormalizeTimeKey(value) {
    return String(value || '').trim() || 'time_2_3';
  }

  function defaultNormalizeMoodKeys(value) {
    const values = Array.isArray(value) ? value : [value];
    return values.map(item => String(item || '').trim()).filter(Boolean);
  }

  function defaultNormalizeStartTimePeriod(value) {
    const normalized = String(value || '').trim().toLowerCase();
    return normalized || 'afternoon';
  }

  function defaultGetCustomStartTimeValue(value) {
    return String(value || '').trim();
  }

  function defaultNormalizeRefinementKeys(value) {
    const values = Array.isArray(value) ? value : value ? [value] : [];
    return [...new Set(values.map(item => String(item || '').trim()).filter(Boolean))];
  }

  function defaultNormalizeCoords(coords) {
    if (!coords) return null;
    const point = {
      lat: Number(coords.lat),
      lng: Number(coords.lng),
    };
    return Number.isFinite(point.lat) && Number.isFinite(point.lng) ? point : null;
  }

  function normalizeRequest(input = {}, options = {}) {
    const source = input || {};
    const defaults = options.defaults || {};
    const rawStartTime = source.startTime && typeof source.startTime === 'object'
      ? source.startTime
      : {};

    const normalizeAreaKey = options.normalizeAreaKey || defaultNormalizeAreaKey;
    const normalizeTimeKey = options.normalizeTimeKey || defaultNormalizeTimeKey;
    const normalizeMoodKeys = options.normalizeMoodKeys || defaultNormalizeMoodKeys;
    const normalizeStartTimePeriod = options.normalizeStartTimePeriod || defaultNormalizeStartTimePeriod;
    const getCustomStartTimeValue = options.getCustomStartTimeValue || defaultGetCustomStartTimeValue;
    const normalizeRefinementKeys = options.normalizeRefinementKeys || defaultNormalizeRefinementKeys;
    const normalizeCoords = options.normalizeCoords || defaultNormalizeCoords;

    const areaKey = normalizeAreaKey(firstDefined(
      source.areaKey,
      source.area,
      defaults.areaKey,
      defaults.area
    ));
    const timeKey = normalizeTimeKey(firstDefined(
      source.timeKey,
      source.time,
      defaults.timeKey,
      defaults.time
    ));
    const moodKeys = normalizeMoodKeys(firstDefined(
      source.moodKey,
      source.mood,
      defaults.moodKey,
      defaults.mood
    ));
    const moodKey = moodKeys[0] || defaults.moodKey || 'local_food';
    const startTime = {
      period: normalizeStartTimePeriod(firstDefined(
        rawStartTime.period,
        source.startTimePeriod,
        defaults.startTimePeriod
      )),
      customStartTime: getCustomStartTimeValue(firstDefined(
        rawStartTime.customStartTime,
        source.customStartTime,
        defaults.customStartTime
      )),
    };

    const runtimeContext = source.runtimeContext && typeof source.runtimeContext === 'object'
      ? source.runtimeContext
      : {};
    const areaCenters = options.areaCenters || {};
    const coords = normalizeCoords(firstDefined(
      source.coords,
      runtimeContext.center,
      defaults.coords,
      areaKey === 'near_me' ? options.cachedNearMeCoords : undefined,
      areaCenters[areaKey]
    ));
    const resolvedRuntimeContext = coords && !runtimeContext.center
      ? { ...runtimeContext, center: coords }
      : runtimeContext;
    const freeTextContext = String(firstDefined(
      source.freeTextContext,
      source.contextNote,
      source.contextText,
      source.context,
      defaults.freeTextContext,
      defaults.contextNote,
      ''
    ) || '').trim();

    return {
      ...source,
      areaKey,
      timeKey,
      moodKey,
      startTime,
      coords,
      places: Array.isArray(source.places)
        ? source.places
        : Array.isArray(defaults.places)
          ? defaults.places
          : [],
      refinements: normalizeRefinementKeys(firstDefined(
        source.refinements,
        source.refinementInput,
        defaults.refinements,
        defaults.activeRefinements
      )),
      runtimeContext: resolvedRuntimeContext,
      routePreferences: firstDefined(source.routePreferences, defaults.routePreferences, null),
      previousRoute: source.previousRoute || null,
      freeTextContext,
      contextNote: freeTextContext,
    };
  }

  return {
    normalizeRequest,
  };
}));
