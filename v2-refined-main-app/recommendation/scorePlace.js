(function initScorePlace(root, factory) {
  const weightsApi = root.KSRecommendation?.weights ||
    (typeof require === 'function' ? require('./weights') : null);
  const api = factory(weightsApi);
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KSRecommendation = root.KSRecommendation || {};
  root.KSRecommendation.scorePlace = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildScorePlace(weightsApi) {
  const DATA_WEIGHTS = weightsApi?.DATA_DRIVEN_PLACE_WEIGHTS || {};
  const REFINEMENT_WEIGHTS = weightsApi?.REFINEMENT_WEIGHTS || {};
  const TERMS = {
    budget: weightsApi?.BUDGET_CATEGORY_NAMES || [],
    premium: weightsApi?.PREMIUM_CATEGORY_NAMES || [],
    local: weightsApi?.LOCAL_TERMS || [],
    cafe: weightsApi?.CAFE_REFINEMENT_TERMS || [],
    quiet: weightsApi?.QUIET_TERMS || [],
    touristHeavy: weightsApi?.TOURIST_HEAVY_TERMS || [],
  };
  const REQUIRED_BREAKDOWN_KEYS = [
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

  function hasValidCoords(place) {
    return place &&
      Number.isFinite(Number(place.lat)) &&
      Number.isFinite(Number(place.lng));
  }

  function getPlaceSearchText(place) {
    return [
      place.name,
      place.displayName,
      place.categoryName,
      place.categoryCode,
      place.primaryCategory,
      place.primaryCategoryLabel,
      place.subCategory,
      place.subCategoryLabel,
      place.address,
      place.sourceList,
      place.sourceFile,
      place.sourceType,
      ...(Array.isArray(place.tags) ? place.tags : []),
      ...(Array.isArray(place.routeRoles) ? place.routeRoles : []),
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function textHasAnyTerm(text, terms) {
    return terms.some(term => text.includes(term));
  }

  function addSignal(breakdown, key, amount, note, meta = {}) {
    if (!breakdown[key]) {
      breakdown[key] = {
        score: 0,
        available: true,
        notes: [],
      };
    }
    breakdown[key].score += amount;
    if (note) breakdown[key].notes.push(note);
    Object.assign(breakdown[key], meta);
  }

  function totalBreakdownScore(breakdown) {
    return Object.values(breakdown).reduce((sum, item) => (
      sum + (Number.isFinite(Number(item.score)) ? Number(item.score) : 0)
    ), 0);
  }

  function ensureRequiredBreakdownKeys(breakdown) {
    REQUIRED_BREAKDOWN_KEYS.forEach(key => {
      if (!breakdown[key]) {
        breakdown[key] = {
          score: 0,
          available: false,
          notes: [],
        };
      }
    });
  }

  function defaultGetAreaRadiusM(areaConfig = {}) {
    if (Number.isFinite(Number(areaConfig.radiusM))) return Number(areaConfig.radiusM);
    if (Number.isFinite(Number(areaConfig.radiusKm))) return Number(areaConfig.radiusKm) * 1000;
    return 1800;
  }

  function defaultGetPlaceDistanceM(place, center) {
    if (!hasValidCoords(place) || !hasValidCoords(center)) return Infinity;
    const earthRadiusKm = 6371;
    const toRadians = value => Number(value) * Math.PI / 180;
    const latDelta = toRadians(Number(center.lat) - Number(place.lat));
    const lngDelta = toRadians(Number(center.lng) - Number(place.lng));
    const lat1 = toRadians(Number(place.lat));
    const lat2 = toRadians(Number(center.lat));
    const h =
      Math.sin(latDelta / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 1000;
  }

  function defaultGetPlaceStayMinutes(place) {
    const stay = place.estimatedStayMin;
    if (stay && Number.isFinite(Number(stay.min)) && Number.isFinite(Number(stay.max))) {
      return Math.round((Number(stay.min) + Number(stay.max)) / 2);
    }
    return 25;
  }

  function defaultGetOpenNowValue() {
    return null;
  }

  function scorePlace(place, context = {}, deps = {}) {
    const scoreBreakdown = {};
    if (!hasValidCoords(place) || place.available === false) {
      return {
        score: -Infinity,
        scoreBreakdown: {
          hardFilter: {
            score: -Infinity,
            available: true,
            notes: [place?.available === false ? 'available=false' : 'invalid coordinates'],
          },
        },
      };
    }

    const weights = {
      areaWithinRadius: DATA_WEIGHTS.areaWithinRadius ?? 25,
      areaClosenessMax: DATA_WEIGHTS.areaClosenessMax ?? 10,
      moodPrimary: DATA_WEIGHTS.moodPrimary ?? 35,
      moodSecondary: DATA_WEIGHTS.moodSecondary ?? 15,
      targetCategory: DATA_WEIGHTS.targetCategory ?? 22,
      moodTag: DATA_WEIGHTS.moodTag ?? 5,
      moodTagMax: DATA_WEIGHTS.moodTagMax ?? 20,
      firstMainStopRole: DATA_WEIGHTS.firstMainStopRole ?? 5,
      laterSubStopRole: DATA_WEIGHTS.laterSubStopRole ?? 5,
      finalStopRole: DATA_WEIGHTS.finalStopRole ?? 5,
      fillerRole: DATA_WEIGHTS.fillerRole ?? 3,
      stayFitsTarget: DATA_WEIGHTS.stayFitsTarget ?? 5,
      available: DATA_WEIGHTS.available ?? 5,
      matched: DATA_WEIGHTS.matched ?? 3,
      subCategory: DATA_WEIGHTS.subCategory ?? 3,
      address: DATA_WEIGHTS.address ?? 2,
      repeatCategoryPenalty: DATA_WEIGHTS.repeatCategoryPenalty ?? 30,
      walkableLegBase: DATA_WEIGHTS.walkableLegBase ?? 12,
      normalLongLegPenalty: DATA_WEIGHTS.normalLongLegPenalty ?? 24,
      lessWalkingLongLegPenalty: DATA_WEIGHTS.lessWalkingLongLegPenalty ?? 42,
      normalLegDistanceDivisor: DATA_WEIGHTS.normalLegDistanceDivisor ?? 350,
      lessWalkingLegDistanceCap: DATA_WEIGHTS.lessWalkingLegDistanceCap ?? 16,
      normalLegDistanceCap: DATA_WEIGHTS.normalLegDistanceCap ?? 10,
    };

    const refinementWeights = {
      lessWalkingAreaClosenessMax: REFINEMENT_WEIGHTS.lessWalkingAreaClosenessMax ?? 12,
      lessWalkingLegBase: REFINEMENT_WEIGHTS.lessWalkingLegBase ?? 10,
      lessWalkingLongLegPenalty: REFINEMENT_WEIGHTS.lessWalkingLongLegPenalty ?? 30,
      lessWalkingLegDistanceDivisor: REFINEMENT_WEIGHTS.lessWalkingLegDistanceDivisor ?? 100,
      lessWalkingLegDistanceCap: REFINEMENT_WEIGHTS.lessWalkingLegDistanceCap ?? 24,
      lessWalkingCategoryBonus: REFINEMENT_WEIGHTS.lessWalkingCategoryBonus ?? 6,
      localTerm: REFINEMENT_WEIGHTS.localTerm ?? 22,
      localRouteRole: REFINEMENT_WEIGHTS.localRouteRole ?? 5,
      localSourcePriorityCap: REFINEMENT_WEIGHTS.localSourcePriorityCap ?? 10,
      localMatched: REFINEMENT_WEIGHTS.localMatched ?? 5,
      localCategoryBonus: REFINEMENT_WEIGHTS.localCategoryBonus ?? 3,
      cheapCategoryBonus: REFINEMENT_WEIGHTS.cheapCategoryBonus ?? 10,
      cheapTerm: REFINEMENT_WEIGHTS.cheapTerm ?? 18,
      cheapPremiumPenalty: REFINEMENT_WEIGHTS.cheapPremiumPenalty ?? 18,
      cafeCategory: REFINEMENT_WEIGHTS.cafeCategory ?? 34,
      dessertCategory: REFINEMENT_WEIGHTS.dessertCategory ?? 28,
      cafeTerm: REFINEMENT_WEIGHTS.cafeTerm ?? 14,
      quietWalkRest: REFINEMENT_WEIGHTS.quietWalkRest ?? 24,
      quietCafeView: REFINEMENT_WEIGHTS.quietCafeView ?? 12,
      quietTerm: REFINEMENT_WEIGHTS.quietTerm ?? 18,
      quietBarPenalty: REFINEMENT_WEIGHTS.quietBarPenalty ?? 26,
      quietTouristPenalty: REFINEMENT_WEIGHTS.quietTouristPenalty ?? 20,
      openNowTrue: REFINEMENT_WEIGHTS.openNowTrue ?? 8,
      openNowFalsePenalty: REFINEMENT_WEIGHTS.openNowFalsePenalty ?? 14,
      refinementClampMin: REFINEMENT_WEIGHTS.refinementClampMin ?? -180,
      refinementClampMax: REFINEMENT_WEIGHTS.refinementClampMax ?? 180,
    };

    const getAreaRadiusM = deps.getAreaRadiusM || defaultGetAreaRadiusM;
    const getPlaceDistanceM = deps.getPlaceDistanceM || defaultGetPlaceDistanceM;
    const getRoutePreferenceScore = deps.getRoutePreferenceScore || (() => 0);
    const getPlaceStayMinutes = deps.getPlaceStayMinutes || defaultGetPlaceStayMinutes;
    const classifyLegMobility = deps.classifyLegMobility || (() => ({ isWalkable: true, estimatedWalkMinutes: 0, distanceMeters: 0 }));
    const getDurationFitScore = deps.getDurationFitScore || (() => 0);
    const getStartTimeCategoryScore = deps.getStartTimeCategoryScore || (() => 0);
    const getBacktrackingPenalty = deps.getBacktrackingPenalty || (() => 0);
    const getPreviousOverlapPenalty = deps.getPreviousOverlapPenalty || (() => 0);
    const getOpenNowValue = deps.getOpenNowValue || defaultGetOpenNowValue;
    const getSearchText = deps.getPlaceSearchText || getPlaceSearchText;

    const distanceM = Number(place.__distanceM ?? getPlaceDistanceM(place, context.areaConfig?.center));
    const radiusM = getAreaRadiusM(context.areaConfig);
    const primaryCategory = place.primaryCategory || '';
    const text = getSearchText(place);
    const refinementKeys = context.refinementKeys || [];
    const moodContext = context.moodContext || {};
    const primaryPreferred = moodContext.primaryPreferred || [];
    const secondaryPreferred = moodContext.secondaryPreferred || [];
    const tagsPreferred = moodContext.tagsPreferred || [];
    const compositionKeys = moodContext.compositionKeys || [];
    const routeRoles = Array.isArray(place.routeRoles) ? place.routeRoles : [];
    const tags = Array.isArray(place.tags) ? place.tags : [];
    const matchedTags = tags.filter(tag => tagsPreferred.includes(tag));
    let refinementRawScore = 0;
    const addRefinement = (key, amount, note, meta = {}) => {
      refinementRawScore += amount;
      addSignal(scoreBreakdown, key, amount, note, meta);
    };

    if (distanceM <= radiusM) addSignal(scoreBreakdown, 'areaFit', weights.areaWithinRadius, 'inside area radius');
    if (Number.isFinite(distanceM)) {
      addSignal(
        scoreBreakdown,
        'areaFit',
        Math.max(0, weights.areaClosenessMax * (1 - Math.min(distanceM, radiusM) / radiusM)),
        'closer to area center'
      );
    }

    if (primaryPreferred.includes(primaryCategory)) addSignal(scoreBreakdown, 'moodMatch', weights.moodPrimary, 'primary mood category');
    if (secondaryPreferred.includes(primaryCategory)) addSignal(scoreBreakdown, 'moodMatch', weights.moodSecondary, 'secondary mood category');
    if (context.targetCategory && primaryCategory === context.targetCategory) {
      addSignal(scoreBreakdown, 'categoryFit', weights.targetCategory, 'target category slot');
    }
    addSignal(scoreBreakdown, 'savedPlaceAffinity', getRoutePreferenceScore(place, context.routePreferences), 'route preference score');
    if (matchedTags.length) {
      addSignal(scoreBreakdown, 'moodMatch', Math.min(matchedTags.length * weights.moodTag, weights.moodTagMax), 'matched mood tags');
    }

    if (context.stopIndex === 0 && routeRoles.includes('main_stop')) addSignal(scoreBreakdown, 'curationQuality', weights.firstMainStopRole, 'main stop role');
    if (context.stopIndex > 0 && routeRoles.includes('sub_stop')) addSignal(scoreBreakdown, 'curationQuality', weights.laterSubStopRole, 'sub stop role');
    if (context.isFinalStop && routeRoles.includes('finale')) addSignal(scoreBreakdown, 'curationQuality', weights.finalStopRole, 'finale role');
    if (routeRoles.includes('filler') && Number(context.timeConfig?.maxStops) > 2) addSignal(scoreBreakdown, 'curationQuality', weights.fillerRole, 'filler role');

    const stay = getPlaceStayMinutes(place);
    if (stay <= Math.max(Number(context.timeConfig?.targetMin) || 0, 45)) addSignal(scoreBreakdown, 'curationQuality', weights.stayFitsTarget, 'stay fits target time');
    if (place.available === true) addSignal(scoreBreakdown, 'curationQuality', weights.available, 'source marks available');
    if (place.isMatched === true) addSignal(scoreBreakdown, 'curationQuality', weights.matched, 'source place matched');
    if (place.subCategory) addSignal(scoreBreakdown, 'curationQuality', weights.subCategory, 'has subcategory');
    if (place.address) addSignal(scoreBreakdown, 'curationQuality', weights.address, 'has address');

    const selectedPrimaryCount = context.categoryCounts?.[primaryCategory] || 0;
    const repeatAllowed = compositionKeys.some(key => key === 'cafes_dessert' || key === 'drinks_night');
    if (selectedPrimaryCount > 0 && !repeatAllowed) {
      addSignal(scoreBreakdown, 'diversity', -(selectedPrimaryCount * weights.repeatCategoryPenalty), 'repeat category penalty');
    }

    if (context.previousPlace) {
      const walkRefined = refinementKeys.includes('walk');
      const maxWalkMinutes = walkRefined ? 8 : 15;
      const mobility = classifyLegMobility(context.previousPlace, place, maxWalkMinutes);
      const legMeters = Number(mobility.distanceMeters);
      if (mobility.isWalkable) {
        addSignal(scoreBreakdown, 'distancePenalty', Math.max(0, weights.walkableLegBase - mobility.estimatedWalkMinutes * 0.5), 'walkable leg bonus');
      } else {
        addSignal(scoreBreakdown, 'distancePenalty', -(walkRefined ? weights.lessWalkingLongLegPenalty : weights.normalLongLegPenalty), 'long leg penalty');
      }
      if (Number.isFinite(legMeters)) {
        addSignal(
          scoreBreakdown,
          'distancePenalty',
          -Math.min(legMeters / weights.normalLegDistanceDivisor, walkRefined ? weights.lessWalkingLegDistanceCap : weights.normalLegDistanceCap),
          'leg distance penalty'
        );
      }
    }

    if (refinementKeys.includes('walk')) {
      if (Number.isFinite(distanceM)) {
        addRefinement(
          'distancePenalty',
          Math.max(0, refinementWeights.lessWalkingAreaClosenessMax * (1 - Math.min(distanceM, radiusM) / radiusM)),
          'less-walking area closeness'
        );
      }
      if (context.previousPlace) {
        const mobility = classifyLegMobility(context.previousPlace, place, 8);
        const legMeters = Number(mobility.distanceMeters);
        addRefinement(
          'distancePenalty',
          mobility.isWalkable ? Math.max(0, refinementWeights.lessWalkingLegBase - mobility.estimatedWalkMinutes) : -refinementWeights.lessWalkingLongLegPenalty,
          mobility.isWalkable ? 'less-walking walkable leg bonus' : 'less-walking long leg penalty'
        );
        if (Number.isFinite(legMeters)) {
          addRefinement(
            'distancePenalty',
            -Math.min(legMeters / refinementWeights.lessWalkingLegDistanceDivisor, refinementWeights.lessWalkingLegDistanceCap),
            'less-walking leg distance penalty'
          );
        }
      }
      if (['walk_nature', 'rest', 'cafe', 'meal'].includes(primaryCategory)) {
        addRefinement('categoryFit', refinementWeights.lessWalkingCategoryBonus, 'less-walking compatible category');
      }
    }

    if (refinementKeys.includes('local')) {
      if (textHasAnyTerm(text, TERMS.local)) addRefinement('localness', refinementWeights.localTerm, 'localness term');
      if (text.includes('main_stop') || text.includes('sub_stop')) addRefinement('localness', refinementWeights.localRouteRole, 'route role local proxy');
      if (Number(place.sourcePriority) > 0) addRefinement('localness', Math.min(Number(place.sourcePriority), refinementWeights.localSourcePriorityCap), 'source priority');
      if (place.isMatched === true) addRefinement('localness', refinementWeights.localMatched, 'matched saved place');
      if (!['bar', 'rest'].includes(primaryCategory)) addRefinement('localness', refinementWeights.localCategoryBonus, 'local-compatible category');
    }

    if (refinementKeys.includes('cheap')) {
      if (['meal', 'cafe', 'dessert_bakery', 'walk_nature', 'rest'].includes(primaryCategory)) addRefinement('priceFit', refinementWeights.cheapCategoryBonus, 'budget-compatible category');
      if (textHasAnyTerm(text, TERMS.budget)) addRefinement('priceFit', refinementWeights.cheapTerm, 'budget term');
      if (['bar', 'activity'].includes(primaryCategory) || textHasAnyTerm(text, TERMS.premium)) addRefinement('priceFit', -refinementWeights.cheapPremiumPenalty, 'premium proxy penalty');
    }

    if (refinementKeys.includes('cafe')) {
      if (primaryCategory === 'cafe') addRefinement('categoryFit', refinementWeights.cafeCategory, 'cafe refinement category');
      if (primaryCategory === 'dessert_bakery') addRefinement('categoryFit', refinementWeights.dessertCategory, 'dessert refinement category');
      if (textHasAnyTerm(text, TERMS.cafe)) addRefinement('categoryFit', refinementWeights.cafeTerm, 'cafe term');
    }

    if (refinementKeys.includes('quiet')) {
      if (['walk_nature', 'rest'].includes(primaryCategory)) addRefinement('crowdRisk', refinementWeights.quietWalkRest, 'quiet-compatible category');
      if (['cafe', 'landmark_view'].includes(primaryCategory)) addRefinement('crowdRisk', refinementWeights.quietCafeView, 'moderate quiet-compatible category');
      if (textHasAnyTerm(text, TERMS.quiet)) addRefinement('crowdRisk', refinementWeights.quietTerm, 'quiet term');
      if (!compositionKeys.includes('drinks_night') && primaryCategory === 'bar') addRefinement('crowdRisk', -refinementWeights.quietBarPenalty, 'quiet bar penalty');
      if (textHasAnyTerm(text, TERMS.touristHeavy)) addRefinement('touristTrapRisk', -refinementWeights.quietTouristPenalty, 'tourist-heavy term penalty');
    }

    if (refinementKeys.includes('open')) {
      const openValue = getOpenNowValue(place);
      if (openValue === true) {
        addRefinement('openingHoursConfidence', refinementWeights.openNowTrue, 'marked open now');
      } else if (openValue === false) {
        addRefinement('openingHoursConfidence', -refinementWeights.openNowFalsePenalty, 'marked closed now');
      } else {
        addSignal(scoreBreakdown, 'openingHoursConfidence', 0, 'opening-hours data unavailable; not treated as live availability', {
          available: false,
        });
      }
    } else {
      addSignal(scoreBreakdown, 'openingHoursConfidence', 0, 'opening-hours data not requested', {
        available: false,
      });
    }

    const clampedRefinement = Math.max(
      refinementWeights.refinementClampMin,
      Math.min(refinementWeights.refinementClampMax, refinementRawScore)
    );
    if (clampedRefinement !== refinementRawScore) {
      addSignal(scoreBreakdown, 'heuristicAdjustment', clampedRefinement - refinementRawScore, 'refinement clamp adjustment');
    }
    if (refinementKeys.length) {
      addSignal(scoreBreakdown, 'savedPlaceAffinity', -getPreviousOverlapPenalty(place, context), 'previous route overlap penalty');
    }

    addSignal(scoreBreakdown, 'durationFit', getDurationFitScore(place, context), 'duration fit heuristic');
    addSignal(scoreBreakdown, 'timeOfDayFit', getStartTimeCategoryScore(place, context.startTimeContext), 'start-time category heuristic');
    addSignal(scoreBreakdown, 'distancePenalty', -getBacktrackingPenalty(place, context), 'backtracking penalty');
    ensureRequiredBreakdownKeys(scoreBreakdown);

    return {
      score: totalBreakdownScore(scoreBreakdown),
      scoreBreakdown,
      weightsVersion: weightsApi?.WEIGHTS_VERSION || '',
    };
  }

  return {
    scorePlace,
  };
}));
