function updateRouteLoadingMessage(message) {
  const inlineStep = document.getElementById('loading-step');
  const onboardingStep = document.getElementById('ob-loading-step');
  if (inlineStep) inlineStep.textContent = message;
  if (onboardingStep) onboardingStep.textContent = message;
}

const LOADING_STEPS = [
  'Reading the streets of {area}',
  'Asking who\'s actually there',
  'Skipping the busy main strip',
  'Picking stops that fit your time',
  'Drawing your route',
];

const REFINE_TEXTS = {
  walk: { applied: 'Refined for a more compact route.', undo: 'Removed the compact-route refinement.' },
  local: { applied: 'Refined toward more local-feeling stops.', undo: 'Removed the local-first refinement.' },
  cheap: { applied: 'Refined toward budget-friendly categories.', undo: 'Removed the budget-friendly refinement.' },
  cafe: { applied: 'Refined toward more cafe stops.', undo: 'Removed the cafe-forward refinement.' },
  quiet: { applied: 'Refined toward quieter and less tourist-heavy stops.', undo: 'Removed the quiet-route refinement.' },
  open: {
    applied: 'Refined to places marked open now.',
    undo: 'Removed the open-now refinement.',
    unavailable: 'Open-now data is not available for these saved places yet.',
  },
};

const SAVED_ROUTES_STORAGE_KEY = 'kandid_spot_saved_routes';

const ASK_RESPONSES = {
  why: route => route?.ask?.why || 'This route is tuned around your current area, time, and mood.',
  crowd: route => route?.ask?.crowd || 'I do not check live crowd levels yet, but you can use the route stops as a compact plan and skip any stop that feels too busy.',
  time: route => {
    const stopCount = route?.stops?.length || 0;
    const timingNote = route?.meta?.timeNote;
    const base = timingNote || `This ${getRouteStructureLabel(stopCount)} is paced for your ${getTimeConfig(state.time).label} window.`;
    return `${base} If you need it closer to 90 minutes, shorten the longest stay or finish after ${stopCount >= 2 ? 'the second stop' : 'this stop'}.`;
  },
  cafe: route => route?.ask?.cafe || 'I can lean the route toward cafe and dessert stops when nearby options fit your area and time.',
  cheap: route => `I can keep ${route?.label || 'this route'} budget-friendly by treating one stop as the main spend and keeping the rest lighter, like a cafe, browse, or walk stop when available.`,
  open: route => {
    const names = (route?.stops || []).map(stop => stop.name).slice(0, 2).filter(Boolean);
    const verifyText = names.length ? ` Verify ${names.join(' and ')} in the map links before going.` : '';
    return `I am not checking live hours yet.${verifyText}`;
  },
};

// ========== State ==========
const state = {
  area: 'hongdae_yeonnam',
  time: 'time_2_3',
  startTimePeriod: 'afternoon',
  customStartTime: '',
  mood: 'local_food',
  shape: null,
  activeRefinements: [],
  activeStop: null,
  routeKey: 'hongdae_yeonnam',
  locationMode: 'area',
  nearMeCoords: null,
  nearMeResolved: false,
  nearMeFallbackUsed: false,
  nearMeFallbackAreaKey: '',
  nearMeError: '',
  effectiveAreaKey: 'hongdae_yeonnam',
  effectiveOrigin: AREA_FILTERS.hongdae_yeonnam.center,
};

const START_TIME_PERIOD_LABELS = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  custom: 'Custom',
};

const START_TIME_TEXT_TERMS = {
  morningPositive: ['breakfast', 'brunch', 'bakery', 'coffee', 'cafe', 'park', 'gallery', 'bookstore', 'walk', 'calm', '브런치', '베이커리', '카페', '커피', '공원', '산책', '서점', '갤러리'],
  nightTerms: ['bar', 'pub', 'club', 'night', 'late_night', 'cocktail', 'beer', 'whiskey', 'wine', '술', '칵테일', '맥주', '와인', '클럽', '주점'],
};

function normalizeStartTimePeriod(value) {
  return START_TIME_PERIOD_LABELS[value] ? value : 'afternoon';
}

function getCustomStartTimeValue(value = state.customStartTime) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function getCustomStartTimeHour(value) {
  const raw = getCustomStartTimeValue(value);
  const match = raw.match(/^(\d{1,2})(?::\d{2})?\s*(AM|PM)$/i);
  if (!match) return null;

  let hour = Number(match[1]);
  const meridiem = match[2].toUpperCase();
  if (!Number.isFinite(hour) || hour < 1 || hour > 12) return null;
  if (meridiem === 'AM') return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

function getStartTimeLogicKey(source = state) {
  const period = normalizeStartTimePeriod(source.startTimePeriod);
  if (period !== 'custom') return period;

  const hour = getCustomStartTimeHour(source.customStartTime);
  if (hour === null) return 'afternoon';
  if (hour >= 5 && hour <= 10) return 'morning';
  if (hour >= 11 && hour <= 16) return 'afternoon';
  if (hour >= 17 && hour <= 23) return 'evening';
  return 'late';
}

function getStartTimeContext(source = state) {
  const key = getStartTimeLogicKey(source);
  return {
    key,
    isMorning: key === 'morning',
    isAfternoon: key === 'afternoon',
    isEvening: key === 'evening' || key === 'late',
    isLate: key === 'late',
  };
}

function getStartTimeRouteCopy(source = state) {
  const period = normalizeStartTimePeriod(source.startTimePeriod);
  if (period === 'morning') return 'Planned for a morning start.';
  if (period === 'afternoon') return 'Planned for an afternoon start.';
  if (period === 'evening') return 'Planned for an evening start.';

  const customStartTime = getCustomStartTimeValue(source.customStartTime);
  return customStartTime ? `Planned around ${customStartTime}.` : '';
}

function getStartTimeSummaryLabel(source = state) {
  const period = normalizeStartTimePeriod(source.startTimePeriod);
  if (period === 'custom') {
    const customStartTime = getCustomStartTimeValue(source.customStartTime);
    return customStartTime || 'Custom start';
  }
  return START_TIME_PERIOD_LABELS[period];
}

function appendStartTimeContext(text) {
  const copy = getStartTimeRouteCopy();
  if (!copy) return text;
  const base = String(text || '').trim();
  if (!base) return copy;
  if (/Planned for an? .* start\.|Planned around .*\./i.test(base)) return base;
  return `${base} ${copy}`;
}

const REFINEMENT_KEYS = ['walk', 'local', 'cheap', 'cafe', 'quiet', 'open'];
const REFINEMENT_LABELS = {
  walk: 'Less walking',
  local: 'More local',
  cheap: 'Cheaper',
  cafe: 'More cafes',
  quiet: 'Avoid crowds',
  open: 'Open now only',
};

function normalizeRefinementKeys(value) {
  if (value === null || value === undefined || value === '') return [];
  let raw;
  if (Array.isArray(value)) raw = value;
  else if (value instanceof Set) raw = [...value];
  else raw = [value];
  const seen = new Set();
  const result = [];
  for (const item of raw) {
    if (!item) continue;
    const key = String(item).trim();
    if (REFINEMENT_KEYS.includes(key) && !seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  }
  return result;
}

function getActiveRefinementKeys() {
  return state.activeRefinements.slice();
}

function hasActiveRefinement(key) {
  return state.activeRefinements.includes(key);
}

function getRefinementCount() {
  return state.activeRefinements.length;
}

function setActiveRefinements(keys) {
  state.activeRefinements = normalizeRefinementKeys(keys);
  syncRefineChips();
  updateRefineSummary();
}

function toggleRefinement(key) {
  if (!REFINEMENT_KEYS.includes(key)) return;
  state.activeRefinements = hasActiveRefinement(key)
    ? state.activeRefinements.filter(k => k !== key)
    : [...state.activeRefinements, key];
  syncRefineChips();
  updateRefineSummary();
}

function getRefinementLabels(keys = state.activeRefinements) {
  return normalizeRefinementKeys(keys).map(k => REFINEMENT_LABELS[k]).filter(Boolean);
}

function getOverlapPenaltyStrength(refinementCount) {
  if (refinementCount <= 0) return 0;
  if (refinementCount === 1) return 14;
  if (refinementCount === 2) return 24;
  return 36;
}

function getRouteStopIdentity(stop) {
  if (!stop) return '';
  const place = stop.place || stop;
  const id = place.placeId || place.id || place.sid || place.naverPlaceId || place.kakaoPlaceId;
  if (id && String(id).trim()) return String(id).trim();
  const name = stop.name || place.displayName || place.name || '';
  const lat = stop.coords?.lat ?? place.lat ?? '';
  const lng = stop.coords?.lng ?? place.lng ?? '';
  return name ? `${name}@${lat},${lng}` : '';
}

function getCandidateIdentity(place) {
  if (!place) return '';
  const id = place.placeId || place.id || place.sid || place.naverPlaceId || place.kakaoPlaceId;
  if (id && String(id).trim()) return String(id).trim();
  const name = place.displayName || place.name || '';
  const lat = place.lat ?? place.coords?.lat ?? '';
  const lng = place.lng ?? place.coords?.lng ?? '';
  return name ? `${name}@${lat},${lng}` : '';
}

function getPreviousRouteStopIdentitySet(route) {
  const set = new Set();
  if (!route || !Array.isArray(route.stops)) return set;
  for (const stop of route.stops) {
    const id = getRouteStopIdentity(stop);
    if (id) set.add(id);
  }
  return set;
}

function countSharedStops(routeA, routeB) {
  if (!routeA?.stops || !routeB?.stops) return 0;
  const setB = getPreviousRouteStopIdentitySet(routeB);
  let n = 0;
  for (const stop of routeA.stops) {
    if (setB.has(getRouteStopIdentity(stop))) n += 1;
  }
  return n;
}

function getPreviousOverlapPenalty(place, context) {
  const set = context.previousStopIdentitySet;
  if (!set || !set.size) return 0;
  const id = getCandidateIdentity(place);
  if (!id || !set.has(id)) return 0;
  const keys = context.refinementKeys || [];
  const multiplier = Number(context.previousRouteOverlapMultiplier) || 1;
  if (keys.includes('walk')) {
    const walkCap = keys.length === 1 ? 4 : 12;
    return walkCap * multiplier;
  }
  const baseStrength = getOverlapPenaltyStrength(keys.length);
  return baseStrength * multiplier;
}

function estimateRouteWalkingMeters(route) {
  if (!route || !Array.isArray(route.stops) || route.stops.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < route.stops.length; i += 1) {
    const stop = route.stops[i];
    const stored = Number(stop?.legDistanceMeters);
    if (Number.isFinite(stored) && stored > 0) {
      total += stored;
      continue;
    }
    const prevCoords = route.stops[i - 1]?.coords;
    const curCoords = stop?.coords;
    if (prevCoords && curCoords) {
      const d = haversineMeters(prevCoords, curCoords);
      if (Number.isFinite(d)) total += d;
    }
  }
  return total;
}

let currentRoute = null;
let realPlacesLoadPromise = null;
const nearMeState = {
  coords: null,
  error: null,
};

// ========== Builder collapse ==========
const builderToggle = document.getElementById('builder-toggle');
const builder = document.getElementById('builder');
const builderToggleLabel = document.getElementById('rs-toggle-label');

function setBuilderCollapsed(collapsed) {
  builder.classList.toggle('collapsed', collapsed);
  builderToggle.classList.toggle('collapsed', collapsed);
  builderToggle.setAttribute('aria-expanded', String(!collapsed));
  if (builderToggleLabel) {
    builderToggleLabel.textContent = collapsed ? 'Edit' : 'Hide';
  }
}

builderToggle.addEventListener('click', () => {
  const willCollapse = !builder.classList.contains('collapsed');
  setBuilderCollapsed(willCollapse);
});

const builderCustomStartTimeInput = document.getElementById('builder-custom-start-time');

function updateBuilderCustomStartTimeVisibility() {
  if (!builderCustomStartTimeInput) return;
  const isCustom = normalizeStartTimePeriod(state.startTimePeriod) === 'custom';
  builderCustomStartTimeInput.hidden = !isCustom;
  builderCustomStartTimeInput.value = isCustom ? getCustomStartTimeValue(state.customStartTime) : '';
}

function syncCustomStartTimeFromBuilder() {
  if (!builderCustomStartTimeInput) return;
  state.customStartTime = getCustomStartTimeValue(builderCustomStartTimeInput.value);
}

builderCustomStartTimeInput?.addEventListener('input', syncCustomStartTimeFromBuilder);
builderCustomStartTimeInput?.addEventListener('change', syncCustomStartTimeFromBuilder);

// ========== Chip selection ==========
document.querySelectorAll('[data-group]').forEach(row => {
  row.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    state[row.dataset.group] = getCanonicalSelectionValue(row.dataset.group, btn);
    if (row.dataset.group === 'startTimePeriod') {
      if (state.startTimePeriod !== 'custom') state.customStartTime = '';
      updateBuilderCustomStartTimeVisibility();
      if (state.startTimePeriod === 'custom') builderCustomStartTimeInput?.focus();
    }
  });
});

// ========== Build new route ==========
const buildBtn = document.getElementById('build-btn');
const loadingState = document.getElementById('loading-state');
const loadingStep = document.getElementById('loading-step');
const rsSummary = document.getElementById('rs-summary');

buildBtn.addEventListener('click', () => {
  document.querySelectorAll('#main-app .builder [data-group]').forEach(group => {
    const sel = group.querySelector('.chip.selected');
    if (sel) state[group.dataset.group] = getCanonicalSelectionValue(group.dataset.group, sel);
  });
  syncCustomStartTimeFromBuilder();

  if (normalizeStartTimePeriod(state.startTimePeriod) === 'custom' && !getCustomStartTimeValue(state.customStartTime)) {
    updateBuilderCustomStartTimeVisibility();
    builderCustomStartTimeInput?.focus();
    showToast('Add a custom start time, like 2:00 PM.');
    return;
  }

  loadingState.classList.add('active');
  const steps = LOADING_STEPS.map(s => s.replace('{area}', getAreaDisplayLabel()));
  let i = 0;
  loadingStep.textContent = steps[0];
  const interval = setInterval(() => {
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      finishBuild().finally(() => {
        loadingState.classList.remove('active');
      });
    } else {
      loadingStep.textContent = steps[i];
    }
  }, 460);
});

async function finishBuild() {
  await applyRouteForCurrentSelection();
  const why = document.querySelector('.why-card');
  why.style.transition = 'transform 0.3s, box-shadow 0.3s';
  why.style.transform = 'scale(1.015)';
  why.style.boxShadow = '0 8px 20px -6px rgba(245, 158, 11, 0.35)';
  setTimeout(() => {
    why.style.transform = '';
    why.style.boxShadow = '';
  }, 350);
  showToast(`✓ New route built for ${currentRoute.label}`);
}

// ========== Route state + rendering ==========
function getRouteKey(area) {
  const normalized = String(area || '').trim().toLowerCase();
  return (
    AREA_KEY_ALIASES[normalized] ||
    AREA_KEY_BY_LABEL[normalized] ||
    'hongdae'
  );
}

function getAreaDisplayLabel(value = state.area) {
  const routeKey = getRouteKey(value);
  if (routeKey === 'near_me') return 'Near me';
  return AREA_FILTERS[routeKey]?.label || String(value || '').trim() || 'Selected area';
}

function getMoodDisplayLabel(value = state.mood) {
  return getMoodContext(value).labels.join(' + ');
}

function getSelectionValue(button) {
  return button?.dataset?.internalValue || button?.dataset?.value || '';
}

function getCanonicalSelectionValue(groupKey, buttonOrValue) {
  const rawValue = typeof buttonOrValue === 'string'
    ? buttonOrValue
    : getSelectionValue(buttonOrValue);
  if (groupKey === 'area') return getRouteKey(rawValue);
  if (groupKey === 'time') return normalizeTimeKey(rawValue);
  if (groupKey === 'mood') return normalizeMoodKeys(rawValue)[0] || 'local_food';
  if (groupKey === 'startTimePeriod') return normalizeStartTimePeriod(rawValue);
  return rawValue;
}

function selectionValueMatches(groupKey, button, value) {
  return getCanonicalSelectionValue(groupKey, button) === getCanonicalSelectionValue(groupKey, String(value || ''));
}

async function applyRouteForCurrentSelection() {
  state.routeKey = getRouteKey(state.area);
  const runtimeContext = await getRouteRuntimeContext(state.routeKey);
  const routePreferences = getOptionalRoutePreferences();
  const routeInput = normalizeRouteBuildInput({
    areaKey: state.routeKey,
    timeKey: state.time,
    moodKey: state.mood,
    startTime: {
      period: state.startTimePeriod,
      customStartTime: state.customStartTime,
    },
    refinements: getActiveRefinementKeys(),
    coords: runtimeContext.center,
    places: curatedPlaceState.places,
    previousRoute: null,
    runtimeContext,
    routePreferences,
  });
  applyResolvedRoute(buildRouteForInputs(routeInput));
}

function applyResolvedRoute(route) {
  currentRoute = prepareRouteForDisplay(route);
  const routeToken = bumpRouteRenderToken();
  // Preserve the user's onboarding selection (e.g. 'Hongdae / Yeonnam' or
  // 'Near me') in state.area so inline-builder chip sync and onboarding restart
  // still recognize it. Route display continues to use currentRoute.label.
  state.activeStop = null;
  resetRouteGeometryCache();
  clearRouteOverlays();

  updateRouteCopy();
  renderStops();
  resetFloatCard();
  hideFloatCard();
  updateMarkerActive();

  if (isMainAppVisible() || kakaoMapState.map || naverMapState.map) {
    renderActiveMapRoute({ fit: true, routeToken });
  }
}

function updateRouteCopy() {
  const sourceLabel = currentRoute.sourceLabel;
  rsSummary.textContent = [
    currentRoute.label,
    getTimeConfig(state.time).label,
    getStartTimeSummaryLabel(),
    getMoodDisplayLabel(),
    sourceLabel,
  ].filter(Boolean).join(' · ');
  document.getElementById('map-location-label').textContent = currentRoute.mapLabel;
  document.getElementById('why-body').textContent = currentRoute.why;
  const whyList = document.querySelector('.ks-why-list');
  if (whyList) {
    whyList.innerHTML = buildRouteWhyItems(currentRoute)
      .map(item => `<li>${escapeHtml(item)}</li>`)
      .join('');
  }

  setRouteMetaDefault();
}

function setRouteMetaItem(index, value, label) {
  const metaValues = document.querySelectorAll('.route-meta strong');
  const valueEl = metaValues[index];
  if (!valueEl) return;

  valueEl.textContent = value;

  const item = valueEl.parentElement;
  if (!item) return;

  const textNode = Array.from(item.childNodes).find(node => node.nodeType === 3);
  if (textNode) {
    textNode.nodeValue = ` ${label}`;
  }
}

function setRouteMetaDefault() {
  setRouteMetaItem(0, String(currentRoute.stops.length), currentRoute.stops.length === 1 ? 'stop' : 'stops');
  setRouteMetaItem(1, currentRoute.meta.total, currentRoute.meta.totalLabel || 'total');
  setRouteMetaItem(2, [currentRoute.meta.walking, currentRoute.meta.distance].filter(Boolean).join(' · '), 'walking');
}

function setNaverDirectionsMeta(directions) {
  setRouteMetaItem(0, String(currentRoute.stops.length), currentRoute.stops.length === 1 ? 'stop' : 'stops');
  setRouteMetaItem(1, directions.durationText, 'map ETA');
  setRouteMetaItem(2, directions.distanceText, 'route distance');
}

function renderStops() {
  const list = document.getElementById('stops');
  list.innerHTML = '';
  const activeProvider = getActiveMapProvider();

  if (!currentRoute.stops.length) {
    const item = document.createElement('div');
    item.className = 'stop';
    item.innerHTML = `
      <div class="stop-body">
        <div class="stop-name">No matching places found</div>
        <div class="stop-type">Try a different area, mood, or duration.</div>
      </div>
    `;
    list.appendChild(item);
    return;
  }

  currentRoute.stops.forEach((s, idx) => {
    if (s.walk > 0) {
      const w = document.createElement('div');
      w.className = 'stop-walk';
      const mobilityLabel = s.legMobilityLabel || `${s.walk} min walk`;
      w.innerHTML = `<span>${escapeHtml(mobilityLabel)}</span>`;
      list.appendChild(w);
    }
    const item = document.createElement('div');
    item.className = 'stop';
    item.dataset.idx = idx;

    const place = s.place || {};
    const roleLabel =
      place.primaryCategoryLabel ||
      place.subCategoryLabel ||
      MIRO_CATEGORY_LABELS[place.miroCategory] ||
      place.categoryName ||
      'Stop';
    const why = String(s.why || '').trim();

    const actions = [];
    const providerOpenAction = renderProviderOpenButton(place, s.name, activeProvider);
    if (providerOpenAction) actions.push(providerOpenAction);

    item.innerHTML = `
      <div class="stop-num-col">
        <div class="stop-num">${s.num}</div>
        <div class="stop-line"></div>
      </div>
      <div class="stop-body">
        <span class="ks-stop-role">${escapeHtml(roleLabel)}</span>
        <div class="stop-name">${escapeHtml(s.name)}</div>
        ${why ? `<div class="ks-stop-why">${escapeHtml(why)}</div>` : ''}
        <div class="stop-meta">
          <span class="stop-tag">⏱ ${getStopDisplayStay(s)} min</span>
          ${(s.tags || []).map(t => `<span class="stop-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="ks-stop-actions">${actions.join('')}</div>
      </div>
    `;
    item.addEventListener('click', () => activateStop(idx));
    list.appendChild(item);
  });
}

// ========== Map Providers ==========
const MAP_PROVIDER_STORAGE_KEY = 'miro_map_provider';
const MAP_PROVIDERS = new Set(['kakao', 'naver']);

function getInitialMapProvider() {
  try {
    const storedProvider = window.localStorage.getItem(MAP_PROVIDER_STORAGE_KEY);
    if (MAP_PROVIDERS.has(storedProvider)) return storedProvider;
  } catch (error) {
    // Remembering the provider is optional.
  }
  return 'kakao';
}

const mapProviderState = {
  active: getInitialMapProvider(),
};

function getActiveMapProvider() {
  return MAP_PROVIDERS.has(mapProviderState.active) ? mapProviderState.active : 'kakao';
}

function isNaverPlaceDetailUrl(url) {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (/\/p\/directions\//i.test(trimmed)) return false;
  return /\/p\/entry\/place\//i.test(trimmed) || /\/p\/search\//i.test(trimmed);
}

function buildStopSearchQuery(place = {}, fallbackName) {
  const name = String(place.displayName || place.name || fallbackName || '').trim();
  const address = String(place.address || '').trim();
  if (!name && !address) return '';
  return [name, address].filter(Boolean).join(' ');
}

function buildStopMapSearchUrl(place = {}, fallbackName, provider) {
  if (provider === 'naver') {
    if (isNaverPlaceDetailUrl(place.naverMapUrl)) return place.naverMapUrl.trim();
    const query = buildStopSearchQuery(place, fallbackName);
    return query ? `https://map.naver.com/p/search/${encodeURIComponent(query)}` : '';
  }
  if (provider === 'google') {
    const query = buildStopSearchQuery(place, fallbackName);
    if (query) {
      const enriched = /seoul/i.test(query) ? query : `${query} Seoul`;
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enriched)}`;
    }
    const lat = getPlaceLat(place);
    const lng = getPlaceLng(place);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const coordQuery = `${formatMapCoord(lat)},${formatMapCoord(lng)}`;
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordQuery)}`;
    }
    return '';
  }
  const query = buildStopSearchQuery(place, fallbackName);
  return query ? `https://map.kakao.com/link/search/${encodeURIComponent(query)}` : '';
}

function getProviderOpenLink(place = {}, fallbackName, provider = getActiveMapProvider()) {
  if (provider === 'naver') {
    const url = buildStopMapSearchUrl(place, fallbackName, 'naver');
    return url ? { source: 'naver', mark: 'N', label: 'Open in Naver', url } : null;
  }

  if (provider === 'google') {
    const url = buildStopMapSearchUrl(place, fallbackName, 'google');
    return url ? { source: 'google', mark: 'G', label: 'Open in Google', url } : null;
  }

  const url = buildStopMapSearchUrl(place, fallbackName, 'kakao');
  return url ? { source: 'kakao', mark: 'K', label: 'Open in Kakao', url } : null;
}

function renderProviderOpenButton(place = {}, fallbackName, provider = getActiveMapProvider()) {
  const links = [
    getProviderOpenLink(place, fallbackName, provider === 'naver' ? 'naver' : 'kakao'),
    getProviderOpenLink(place, fallbackName, 'google'),
  ].filter(Boolean);
  if (!links.length) return '';

  return links.map(link => (
    `<a class="ks-stop-link" data-source="${link.source}" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">` +
      `<span class="ks-link-mark">${link.mark}</span>${link.label}</a>`
  )).join('');
}

const kakaoMapState = {
  map: null,
  sdkPromise: null,
  markers: [],
  polyline: null,
  requested: false,
};

const naverMapState = {
  map: null,
  sdkPromise: null,
  markers: [],
  polyline: null,
  requested: false,
  directionsKey: '',
  directions: null,
  directionsPromise: null,
};

const routeGeometryState = {
  key: '',
  geometry: null,
  promise: null,
  tmapCache: new Map(),
  tmapWarnedKeys: new Set(),
};

const mapStage = document.getElementById('map-stage');
const mapStatus = document.getElementById('map-status');
const kakaoMapLoggedErrors = new Set();
const naverMapLoggedErrors = new Set();
let mapSwitchToken = 0;
let routeRenderToken = 0;

function bumpRouteRenderToken() {
  routeRenderToken += 1;
  return routeRenderToken;
}

function isStaleMapRender(providerToken, routeToken) {
  return providerToken !== mapSwitchToken || routeToken !== routeRenderToken;
}

function isMainAppVisible() {
  const mainApp = document.getElementById('main-app');
  return Boolean(mainApp && !mainApp.classList.contains('hidden'));
}

function logKakaoMapError(message) {
  if (kakaoMapLoggedErrors.has(message)) return;
  console.error(message);
  kakaoMapLoggedErrors.add(message);
}

function logNaverMapError(message) {
  if (naverMapLoggedErrors.has(message)) return;
  console.error(message);
  naverMapLoggedErrors.add(message);
}

// Static prototype config: Vercel runtime global, then local development fallbacks.
function getKakaoAppKey() {
  const configuredKey = (window.MIRO_KAKAO_APP_KEY || '').trim();
  if (configuredKey) return configuredKey;

  const params = new URLSearchParams(window.location.search);
  const queryKey = params.get('kakao_app_key') || params.get('kakaoKey');
  if (queryKey) {
    try {
      window.localStorage.setItem('miro_kakao_app_key', queryKey.trim());
    } catch (error) {
      // localStorage persistence is optional for the static prototype.
    }
    return queryKey.trim();
  }

  const windowKey = (window.KAKAO_JAVASCRIPT_KEY || '').trim();
  if (windowKey) return windowKey;

  const metaKey = (document.querySelector('meta[name="miro-kakao-app-key"]')?.content || '').trim();
  if (metaKey) return metaKey;

  try {
    return (window.localStorage.getItem('miro_kakao_app_key') || '').trim();
  } catch (error) {
    return '';
  }
}

function getNaverMapsKeyId() {
  const candidates = [
    {
      source: 'window',
      value: window.MIRO_NAVER_MAPS_NCP_KEY_ID,
    },
    {
      source: 'meta',
      value: document.querySelector('meta[name="miro-naver-maps-ncp-key-id"]')?.content,
    },
    {
      source: 'localStorage',
      value: (() => {
        try {
          return window.localStorage.getItem('miro_naver_maps_ncp_key_id');
        } catch (error) {
          return '';
        }
      })(),
    },
    {
      source: 'query',
      value: new URLSearchParams(window.location.search).get('naver_maps_ncp_key_id'),
    },
  ];

  const match = candidates.find(candidate => String(candidate.value || '').trim());
  const key = match ? String(match.value).trim() : '';

  if (key) {
    window.MIRO_NAVER_MAPS_NCP_KEY_ID = key;
    console.log(`Naver key source: ${match.source}`);
  }
  console.log(`Resolved Naver key exists: ${Boolean(key)}`);

  return key;
}

function ensureActiveMap(options = {}) {
  if (mapProviderState.active === 'naver') {
    ensureNaverMap(0, options);
    return;
  }
  ensureKakaoMap(options);
}

function renderActiveMapRoute({ fit = false, routeToken = routeRenderToken } = {}) {
  if (mapProviderState.active === 'naver') {
    renderNaverRoute({ fit, routeToken });
    return;
  }
  renderKakaoRoute({ fit, routeToken });
}

function setMapProvider(provider) {
  if (!MAP_PROVIDERS.has(provider)) return;

  if (mapProviderState.active !== provider) {
    mapSwitchToken++;
    clearRenderedMaps();
    mapProviderState.active = provider;
    try {
      window.localStorage.setItem(MAP_PROVIDER_STORAGE_KEY, provider);
    } catch (error) {
      // Remembering the provider is optional.
    }
  }

  syncMapProviderButtons();
  renderStops();
  clearActiveStop();
  if (provider !== 'naver') {
    setRouteMetaDefault();
  }
  ensureActiveMap();
}

function syncMapProviderButtons() {
  document.querySelectorAll('[data-map-provider]').forEach(button => {
    const isActive = button.dataset.mapProvider === mapProviderState.active;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function clearRenderedMaps() {
  clearKakaoRouteObjects();
  clearNaverRouteObjects();
  kakaoMapState.map = null;
  naverMapState.map = null;
  resetMapContainer();
}

function getMapElement() {
  return document.getElementById('kakao-map');
}

function resetMapContainer() {
  const mapEl = getMapElement();
  if (!mapEl) return;

  const freshMapEl = document.createElement('div');
  freshMapEl.id = 'kakao-map';
  freshMapEl.className = 'kakao-map';
  freshMapEl.setAttribute('role', mapEl.getAttribute('role') || 'application');
  freshMapEl.setAttribute(
    'aria-label',
    mapEl.getAttribute('aria-label') || 'Kakao map showing the selected route'
  );
  mapEl.replaceWith(freshMapEl);
}

function ensureKakaoMap({ routeToken = routeRenderToken } = {}) {
  kakaoMapState.requested = true;

  const mapEl = getMapElement();
  if (!mapEl) {
    logKakaoMapError('map container missing');
    return;
  }

  if (kakaoMapState.map) {
    relayoutKakaoMap();
    renderKakaoRoute({ fit: true, routeToken });
    return;
  }

  const appKey = getKakaoAppKey();
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    setMapStatus('Kakao map needs a JavaScript key. Set window.MIRO_KAKAO_APP_KEY, the meta tag, localStorage key miro_kakao_app_key, or add ?kakao_app_key=YOUR_KEY.', 'warning');
    return;
  }

  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;
  setMapStatus('Loading Kakao Map…', 'loading');
  loadKakaoSdk(appKey)
    .then(() => {
      if (isStaleMapRender(renderToken, renderRouteToken)) return;
      if (mapProviderState.active !== 'kakao') return;

      const mapEl = getMapElement();
      if (!mapEl) {
        logKakaoMapError('map container missing');
        return;
      }

      const center = new window.kakao.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      kakaoMapState.map = new window.kakao.maps.Map(mapEl, {
        center,
        level: 4,
      });

      window.kakao.maps.event.addListener(kakaoMapState.map, 'click', () => {
        hideFloatCard();
      });

      hideMapStatus();
      window.requestAnimationFrame(() => {
        if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'kakao') return;
        relayoutKakaoMap();
        renderKakaoRoute({ fit: true, routeToken: renderRouteToken });
      });
    })
    .catch(() => {
      kakaoMapState.sdkPromise = null;
      if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'kakao') return;
      setMapStatus('Kakao Map could not load. Check the JavaScript key, allowed domains, and network access.', 'error');
    });
}

function loadKakaoSdk(appKey = getKakaoAppKey()) {
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    return Promise.reject(new Error('Missing window.MIRO_KAKAO_APP_KEY'));
  }

  if (window.kakao && window.kakao.maps) {
    return new Promise(resolve => {
      window.kakao.maps.load(() => resolve(window.kakao));
    });
  }

  if (kakaoMapState.sdkPromise) {
    return kakaoMapState.sdkPromise;
  }

  kakaoMapState.sdkPromise = new Promise((resolve, reject) => {
    const finishLoad = () => {
      if (!window.kakao) {
        logKakaoMapError('window.kakao missing after SDK script load');
        reject(new Error('window.kakao missing after SDK script load'));
        return;
      }

      if (!window.kakao.maps) {
        logKakaoMapError('window.kakao.maps missing after SDK script load');
        reject(new Error('window.kakao.maps missing after SDK script load'));
        return;
      }

      window.kakao.maps.load(() => resolve(window.kakao));
    };

    const failLoad = () => {
      logKakaoMapError('SDK script failed to load');
      reject(new Error('SDK script failed to load'));
    };

    let script = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
    let shouldAppendScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`;
      script.async = true;
      shouldAppendScript = true;
    }

    script.addEventListener('load', finishLoad, { once: true });
    script.addEventListener('error', failLoad, { once: true });

    if (shouldAppendScript) {
      document.head.appendChild(script);
    }
  });

  return kakaoMapState.sdkPromise;
}

function getMapContainerSize(mapEl) {
  if (!mapEl) return { width: 0, height: 0 };

  const rect = mapEl.getBoundingClientRect();
  return {
    width: Math.round(rect.width || mapEl.offsetWidth || mapEl.clientWidth || 0),
    height: Math.round(rect.height || mapEl.offsetHeight || mapEl.clientHeight || 0),
  };
}

function getLoggedNaverMapContainerSize(mapEl) {
  const size = getMapContainerSize(mapEl);
  console.log(`Naver map container size: ${size.width} ${size.height}`);
  return size;
}

function scheduleNaverMapRetry(renderToken, routeToken, attempt) {
  if (attempt >= 10) {
    setMapStatus('Naver map is waiting for the map container to become visible.', 'warning');
    return;
  }

  const retry = () => {
    if (isStaleMapRender(renderToken, routeToken)) return;
    if (mapProviderState.active !== 'naver') return;
    if (naverMapState.map) return;
    ensureNaverMap(attempt + 1, { routeToken });
  };

  if (attempt < 2) {
    window.requestAnimationFrame(retry);
    return;
  }

  window.setTimeout(retry, 120);
}

function ensureNaverMap(attempt = 0, { routeToken = routeRenderToken } = {}) {
  naverMapState.requested = true;

  const mapEl = getMapElement();
  if (!mapEl) {
    logNaverMapError('Naver map container missing');
    return;
  }

  if (naverMapState.map) {
    relayoutNaverMap();
    renderNaverRoute({ fit: true, routeToken });
    return;
  }

  const ncpKeyId = getNaverMapsKeyId();
  if (!ncpKeyId) {
    logNaverMapError('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID');
    setMapStatus('Naver map needs an NCP Key ID. Set window.MIRO_NAVER_MAPS_NCP_KEY_ID via Vercel environment variables.', 'warning');
    return;
  }

  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;
  setMapStatus('Loading Naver Map…', 'loading');
  loadNaverSdk(ncpKeyId)
    .then(() => {
      if (isStaleMapRender(renderToken, renderRouteToken)) return;
      if (mapProviderState.active !== 'naver') return;
      if (!window.naver || !window.naver.maps) return;
      if (naverMapState.map) {
        relayoutNaverMap();
        renderNaverRoute({ fit: true, routeToken: renderRouteToken });
        return;
      }

      const mapEl = getMapElement();
      if (!mapEl) {
        logNaverMapError('Naver map container missing');
        return;
      }

      const size = getLoggedNaverMapContainerSize(mapEl);
      if (!size.width || !size.height) {
        scheduleNaverMapRetry(renderToken, renderRouteToken, attempt);
        return;
      }

      const center = new window.naver.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      naverMapState.map = new window.naver.maps.Map(mapEl, {
        center,
        zoom: 14,
      });
      console.log('Naver map initialized');

      window.naver.maps.Event.addListener(naverMapState.map, 'click', () => {
        hideFloatCard();
      });

      hideMapStatus();
      window.requestAnimationFrame(() => {
        if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'naver') return;
        relayoutNaverMap();
        renderNaverRoute({ fit: true, routeToken: renderRouteToken });
      });
    })
    .catch(() => {
      naverMapState.sdkPromise = null;
      if (isStaleMapRender(renderToken, renderRouteToken) || mapProviderState.active !== 'naver') return;
      setMapStatus('Naver Map could not load. Check the NCP Key ID, allowed domains, and network access.', 'error');
    });
}

function loadNaverSdk(ncpKeyId = getNaverMapsKeyId()) {
  if (!ncpKeyId) {
    logNaverMapError('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID');
    return Promise.reject(new Error('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID'));
  }

  if (window.naver && window.naver.maps) {
    console.log('Naver SDK already loaded');
    return Promise.resolve(window.naver);
  }

  if (naverMapState.sdkPromise) {
    return naverMapState.sdkPromise;
  }

  naverMapState.sdkPromise = new Promise((resolve, reject) => {
    const finishLoad = () => {
      if (!window.naver) {
        logNaverMapError('window.naver missing after SDK load');
        reject(new Error('window.naver missing after SDK load'));
        return;
      }

      if (!window.naver.maps) {
        logNaverMapError('window.naver.maps missing after SDK load');
        reject(new Error('window.naver.maps missing after SDK load'));
        return;
      }

      console.log('Naver SDK loaded');
      resolve(window.naver);
    };

    const failLoad = () => {
      logNaverMapError('Naver SDK script failed to load');
      reject(new Error('Naver SDK script failed to load'));
    };

    let script = document.querySelector('script[src*="oapi.map.naver.com/openapi/v3/maps.js"]');
    let shouldAppendScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(ncpKeyId)}`;
      script.async = true;
      shouldAppendScript = true;
    }
    console.log('Naver SDK load start');

    script.addEventListener('load', finishLoad, { once: true });
    script.addEventListener('error', failLoad, { once: true });

    if (shouldAppendScript) {
      document.head.appendChild(script);
    }
  });

  return naverMapState.sdkPromise;
}

function renderKakaoRoute({ fit = false, routeToken = routeRenderToken } = {}) {
  if (routeToken !== routeRenderToken) return;

  if (!kakaoMapState.map) {
    ensureKakaoMap({ routeToken });
    return;
  }

  if (!window.kakao || !window.kakao.maps) {
    loadKakaoSdk()
      .then(() => {
        if (routeToken !== routeRenderToken) return;
        renderKakaoRoute({ fit, routeToken });
      })
      .catch(() => {
        kakaoMapState.sdkPromise = null;
      });
    return;
  }

  clearKakaoRouteObjects();

  const stopsWithCoords = getStopsWithCoords();
  if (!stopsWithCoords.length) return;

  const geometryKey = getCurrentRouteGeometryKey();
  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;

  kakaoMapState.markers = currentRoute.stops.map(() => null);
  stopsWithCoords.forEach(({ stop, index }, markerIndex) => {
    const position = new window.kakao.maps.LatLng(stop.coords.lat, stop.coords.lng);
    const content = createKakaoMarkerElement(stop, index);
    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content,
      xAnchor: 0.5,
      yAnchor: 1.05,
      zIndex: 100 + index,
    });

    overlay.setMap(kakaoMapState.map);
    kakaoMapState.markers[index] = { overlay, element: content, position };
  });

  updateMarkerActive();
  if (fit) fitKakaoRouteBounds();

  resolveCurrentRouteGeometry().then(geometry => {
    if (!geometry || mapProviderState.active !== 'kakao' || !kakaoMapState.map) return;
    if (isStaleMapRender(renderToken, renderRouteToken) || geometryKey !== getCurrentRouteGeometryKey()) return;

    syncRouteGeometryLabelUpdates(geometry);
    if (Array.isArray(geometry.segments) && geometry.segments.length) {
      renderKakaoRouteSegments(geometry.segments);
      if (fit) fitKakaoRouteBounds(geometry.path);
    }
  });
}

function getNaverDirectionsPoints(stopsWithCoords) {
  return stopsWithCoords.map(({ stop }) => ({
    lat: stop.coords.lat,
    lng: stop.coords.lng,
  })).slice(0, 7);
}

function getNaverDirectionsKey(points) {
  return points.map(point => `${point.lng},${point.lat}`).join('|');
}

function buildNaverDirectionsUrl(points) {
  const params = new URLSearchParams();
  const start = points[0];
  const goal = points[points.length - 1];
  const waypoints = points.slice(1, -1).slice(0, 5);

  params.set('startLng', start.lng);
  params.set('startLat', start.lat);
  params.set('goalLng', goal.lng);
  params.set('goalLat', goal.lat);

  if (waypoints.length) {
    params.set('waypoints', waypoints.map(point => `${point.lng},${point.lat}`).join('|'));
  }

  return `/api/naver-directions?${params.toString()}`;
}

function getNaverDirections(points) {
  if (points.length < 2) return Promise.resolve(null);

  const directionsKey = getNaverDirectionsKey(points);
  if (naverMapState.directionsKey === directionsKey && naverMapState.directions) {
    return Promise.resolve(naverMapState.directions);
  }

  if (naverMapState.directionsKey === directionsKey && naverMapState.directionsPromise) {
    return naverMapState.directionsPromise;
  }

  naverMapState.directionsKey = directionsKey;
  naverMapState.directions = null;
  console.log('Naver Directions request start');

  naverMapState.directionsPromise = fetch(buildNaverDirectionsUrl(points))
    .then(response => {
      if (!response.ok) {
        throw new Error(`Naver Directions returned ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      if (!payload || !payload.ok || !Array.isArray(payload.path) || payload.path.length < 2) {
        throw new Error('Naver Directions response did not include a usable path');
      }

      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directions = payload;
      }
      console.log('Naver Directions response ok');
      console.log(`Naver real route path points: ${payload.path.length}`);
      return payload;
    })
    .catch(error => {
      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directions = null;
      }
      console.warn('Naver real route unavailable; using straight-line fallback');
      return null;
    })
    .finally(() => {
      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directionsPromise = null;
      }
    });

  return naverMapState.directionsPromise;
}

function resetRouteGeometryCache() {
  routeGeometryState.key = '';
  routeGeometryState.geometry = null;
  routeGeometryState.promise = null;
  routeGeometryState.tmapCache.clear();
  routeGeometryState.tmapWarnedKeys.clear();
}

function routeCoordKey(value) {
  return Number(value).toFixed(6);
}

function getCurrentRouteGeometryKey() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return '';
  const threshold = getMaxWalkMinutesForRefinement(currentRoute.refinementKeys);
  const pointsKey = currentRoute.stops
    .map(stop => {
      if (!hasValidCoords(stop.coords)) return 'missing';
      return `${routeCoordKey(stop.coords.lng)},${routeCoordKey(stop.coords.lat)}`;
    })
    .join('|');
  const refinementKeys = normalizeRefinementKeys(currentRoute.refinementKeys);
  const refinementSig = refinementKeys.length ? refinementKeys.slice().sort().join(',') : 'default';
  return `${refinementSig}:${threshold}:${pointsKey}`;
}

function getRouteLegsWithCoords() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return [];

  const legs = [];
  for (let index = 1; index < currentRoute.stops.length; index += 1) {
    const fromStop = currentRoute.stops[index - 1];
    const toStop = currentRoute.stops[index];
    if (!hasValidCoords(fromStop.coords) || !hasValidCoords(toStop.coords)) continue;

    legs.push({
      index,
      fromStop,
      toStop,
      start: {
        lat: fromStop.coords.lat,
        lng: fromStop.coords.lng,
        name: fromStop.name || `Stop ${index}`,
      },
      end: {
        lat: toStop.coords.lat,
        lng: toStop.coords.lng,
        name: toStop.name || `Stop ${index + 1}`,
      },
    });
  }
  return legs;
}

function getTmapPedestrianKey(start, end) {
  return [
    routeCoordKey(start.lng),
    routeCoordKey(start.lat),
    routeCoordKey(end.lng),
    routeCoordKey(end.lat),
  ].join(',');
}

function normalizeRoutePoint(point) {
  if (Array.isArray(point)) {
    const lng = Number(point[0]);
    const lat = Number(point[1]);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
    return { lng, lat };
  }

  if (point && typeof point === 'object') {
    const lng = Number(point.lng);
    const lat = Number(point.lat);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
    return { lng, lat };
  }

  return null;
}

function appendRouteSegment(routePath, segmentPath) {
  const points = Array.isArray(segmentPath)
    ? segmentPath.map(normalizeRoutePoint).filter(Boolean)
    : [];

  points.forEach(point => {
    const previous = routePath[routePath.length - 1];
    if (
      previous &&
      previous.lng === point.lng &&
      previous.lat === point.lat
    ) {
      return;
    }
    routePath.push(point);
  });
}

function getDirectLegPath(leg) {
  return [leg.start, leg.end];
}

const WALKING_ROUTE_ENGINE_MAX_MINUTES = 30;

function getRouteLegRoutingMode(leg, maxWalkMinutes) {
  const explicitMode = String(leg.toStop?.legSuggestedMode || '').trim();
  if (explicitMode === 'walk') {
    return { mode: 'walk', reason: 'explicit_walk_mode' };
  }

  const routeWalkMinutes = Number(leg.toStop?.legWalkMinutes ?? leg.toStop?.walk);
  if (Number.isFinite(routeWalkMinutes) && routeWalkMinutes > 0) {
    if (routeWalkMinutes <= WALKING_ROUTE_ENGINE_MAX_MINUTES) {
      return { mode: 'walk', reason: 'route_walk_minutes' };
    }
    if (explicitMode) {
      return { mode: 'nonwalking', reason: `explicit_${explicitMode}` };
    }
  }

  if (explicitMode) {
    return { mode: 'nonwalking', reason: `explicit_${explicitMode}` };
  }

  if (Number.isFinite(routeWalkMinutes) && routeWalkMinutes > 0) {
    return { mode: 'walk', reason: 'route_walk_minutes' };
  }

  const mobilityLabel = String(leg.toStop?.legMobilityLabel || '').trim().toLowerCase();
  if (mobilityLabel.startsWith('walk')) {
    return { mode: 'walk', reason: 'route_walk_label' };
  }

  const mobility = classifyLegMobility(leg.start, leg.end, maxWalkMinutes);
  return {
    mode: mobility.suggestedMode === 'walk' ? 'walk' : 'nonwalking',
    reason: 'distance_classification',
  };
}

function getTmapPedestrianRoute(start, end) {
  const cacheKey = getTmapPedestrianKey(start, end);
  if (routeGeometryState.tmapCache.has(cacheKey)) {
    return routeGeometryState.tmapCache.get(cacheKey);
  }

  const request = fetch('/api/tmap-pedestrian', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start,
      end,
    }),
  })
    .then(response => response.json().catch(() => null).then(payload => {
      if (!response.ok) {
        throw new Error(payload?.error || `TMAP pedestrian returned ${response.status}`);
      }
      return payload;
    }))
    .then(payload => {
      if (!payload || !payload.ok || !Array.isArray(payload.path) || payload.path.length < 2) {
        throw new Error('TMAP pedestrian response did not include a usable path');
      }

      const path = payload.path.map(normalizeRoutePoint).filter(Boolean);
      if (path.length < 2) {
        throw new Error('TMAP pedestrian response did not include enough valid coordinates');
      }

      return {
        ...payload,
        path,
      };
    })
    .catch(error => {
      if (!routeGeometryState.tmapWarnedKeys.has(cacheKey)) {
        console.warn('[Kandid Spot] Walking leg pedestrian geometry unavailable; using fallback line', {
          from: start?.name,
          to: end?.name,
          reason: error?.message || 'Unknown TMAP pedestrian routing error',
        });
        routeGeometryState.tmapWarnedKeys.add(cacheKey);
      }
      return null;
    });

  routeGeometryState.tmapCache.set(cacheKey, request);
  return request;
}

function isReasonableTmapDuration(durationSeconds) {
  return Number.isFinite(durationSeconds) && durationSeconds > 0 && durationSeconds < 6 * 60 * 60;
}

function getMobilityLabelForMode(mode, minutes) {
  if (mode === 'walk') return `Walk ~${minutes} min`;
  return `Use transit/taxi/rental car · walking would be ~${minutes} min`;
}

function updateStopMobilityFromTmap(stop, tmapRoute, maxWalkMinutes) {
  let changed = false;
  const durationSeconds = Number(tmapRoute.durationSeconds);
  const distanceMeters = Number(tmapRoute.distanceMeters);

  if (Number.isFinite(distanceMeters) && distanceMeters > 0 && stop.legDistanceMeters !== Math.round(distanceMeters)) {
    stop.legDistanceMeters = Math.round(distanceMeters);
    changed = true;
  }

  if (!isReasonableTmapDuration(durationSeconds)) {
    return { changed, isWalkable: stop.legSuggestedMode === 'walk' };
  }

  const actualWalkMinutes = Math.max(1, Math.round(durationSeconds / 60));
  const nextMode = actualWalkMinutes < maxWalkMinutes ? 'walk' : 'transit_taxi_or_rental_car';
  const nextLabel = getMobilityLabelForMode(nextMode, actualWalkMinutes);

  if (stop.walk !== actualWalkMinutes) {
    stop.walk = actualWalkMinutes;
    changed = true;
  }
  if (stop.legWalkMinutes !== actualWalkMinutes) {
    stop.legWalkMinutes = actualWalkMinutes;
    changed = true;
  }
  if (stop.legSuggestedMode !== nextMode) {
    stop.legSuggestedMode = nextMode;
    changed = true;
  }
  if (stop.legMobilityLabel !== nextLabel) {
    stop.legMobilityLabel = nextLabel;
    changed = true;
  }

  return { changed, isWalkable: nextMode === 'walk' };
}

function refreshCurrentRouteMobilityMeta() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return;

  const timing = applySuggestedStayPace(currentRoute.stops, getTimeConfig(state.time));
  const distanceMeters = currentRoute.stops.reduce((sum, stop) => sum + Number(stop.legDistanceMeters || 0), 0);

  currentRoute.meta = {
    ...(currentRoute.meta || {}),
    total: formatMinutes(timing.displayTotalMinutes),
    walking: `${timing.walkingMinutes} min`,
    distance: distanceMeters > 0 ? formatDistanceMeters(distanceMeters) : currentRoute.meta?.distance || '',
    totalLabel: timing.totalLabel || 'total',
    timeNote: timing.adjusted ? timing.note : '',
  };
}

function syncRouteGeometryLabelUpdates(geometry) {
  if (!geometry || !geometry.labelsChanged) return;

  refreshCurrentRouteMobilityMeta();
  updateRouteCopy();
  renderStops();
  if (state.activeStop !== null && currentRoute.stops[state.activeStop]) {
    activateStop(state.activeStop, { pan: false, scroll: false });
  } else {
    clearActiveStop();
  }
}

function resolveCurrentRouteGeometry() {
  const geometryKey = getCurrentRouteGeometryKey();
  if (!geometryKey) return Promise.resolve(null);

  if (routeGeometryState.key === geometryKey && routeGeometryState.geometry) {
    return Promise.resolve(routeGeometryState.geometry);
  }

  if (routeGeometryState.key === geometryKey && routeGeometryState.promise) {
    return routeGeometryState.promise;
  }

  routeGeometryState.key = geometryKey;
  routeGeometryState.geometry = null;
  routeGeometryState.promise = buildMixedRouteGeometry()
    .catch(() => {
      console.warn('Mixed route geometry unavailable; using fallback route line');
      return null;
    })
    .then(geometry => {
      if (routeGeometryState.key === geometryKey) {
        routeGeometryState.geometry = geometry;
      }
      return geometry;
    })
    .finally(() => {
      if (routeGeometryState.key === geometryKey) {
        routeGeometryState.promise = null;
      }
    });

  return routeGeometryState.promise;
}

async function buildMixedRouteGeometry() {
  const legs = getRouteLegsWithCoords();
  const maxWalkMinutes = getMaxWalkMinutesForRefinement(currentRoute?.refinementKeys);
  const path = [];
  const segments = [];
  const summary = {
    tmapWalkLegs: 0,
    naverDrivingLegs: 0,
    fallbackLegs: 0,
    legs: [],
  };
  let labelsChanged = false;

  for (const leg of legs) {
    let segmentPath = null;
    let isFallback = false;
    let source = '';
    const routingMode = getRouteLegRoutingMode(leg, maxWalkMinutes);
    const isWalkingLeg = routingMode.mode === 'walk';

    if (isWalkingLeg) {
      const tmapRoute = await getTmapPedestrianRoute(leg.start, leg.end);

      if (tmapRoute) {
        const update = updateStopMobilityFromTmap(leg.toStop, tmapRoute, maxWalkMinutes);
        labelsChanged = labelsChanged || update.changed;

        segmentPath = tmapRoute.path;
        source = 'tmap_pedestrian';
        summary.tmapWalkLegs += 1;
      }
    }

    if (!segmentPath && !isWalkingLeg) {
      const naverDirections = await getNaverDirections([leg.start, leg.end]);
      if (naverDirections && Array.isArray(naverDirections.path) && naverDirections.path.length >= 2) {
        segmentPath = naverDirections.path;
        source = 'naver_directions';
        summary.naverDrivingLegs += 1;
      }
    }

    if (!segmentPath) {
      segmentPath = getDirectLegPath(leg);
      isFallback = true;
      source = isWalkingLeg ? 'walking_fallback' : 'nonwalking_fallback';
      summary.fallbackLegs += 1;
    }

    appendRouteSegment(path, segmentPath);
    summary.legs.push({
      index: leg.index,
      from: leg.fromStop?.name || leg.start.name,
      to: leg.toStop?.name || leg.end.name,
      routingMode: routingMode.mode,
      routingReason: routingMode.reason,
      source,
      fallback: isFallback,
      points: Array.isArray(segmentPath) ? segmentPath.length : 0,
    });
    segments.push({
      index: leg.index,
      fromStop: leg.fromStop,
      toStop: leg.toStop,
      path: segmentPath,
      isFallback,
      source,
      routingMode: routingMode.mode,
    });
  }

  console.log('[Kandid Spot] Internal route geometry sources', summary);

  return {
    path,
    segments,
    labelsChanged,
    summary,
  };
}

function toNaverLatLngPath(points) {
  return points.map(point => new window.naver.maps.LatLng(point.lat, point.lng));
}

function toKakaoLatLngPath(points) {
  return points.map(point => new window.kakao.maps.LatLng(point.lat, point.lng));
}

function clearKakaoPolylines() {
  const polylines = Array.isArray(kakaoMapState.polyline)
    ? kakaoMapState.polyline
    : [kakaoMapState.polyline].filter(Boolean);

  polylines.forEach(polyline => polyline.setMap(null));
  kakaoMapState.polyline = null;
}

function clearNaverPolylines() {
  const polylines = Array.isArray(naverMapState.polyline)
    ? naverMapState.polyline
    : [naverMapState.polyline].filter(Boolean);

  polylines.forEach(polyline => polyline.setMap(null));
  naverMapState.polyline = null;
}

function addKakaoPolyline(polyline) {
  kakaoMapState.polyline = [
    ...(Array.isArray(kakaoMapState.polyline) ? kakaoMapState.polyline : [kakaoMapState.polyline].filter(Boolean)),
    polyline,
  ];
}

function addNaverPolyline(polyline) {
  naverMapState.polyline = [
    ...(Array.isArray(naverMapState.polyline) ? naverMapState.polyline : [naverMapState.polyline].filter(Boolean)),
    polyline,
  ];
}

function getRouteSegmentMode(segment) {
  if (!segment) return 'estimated';
  if (segment.isFallback) return 'estimated';
  if (segment.source === 'tmap_pedestrian') return 'walk';
  if (segment.source === 'naver_directions') return 'taxi';
  return segment.routingMode === 'walk' ? 'walk' : 'taxi';
}

function getRouteSegmentStyle(segment) {
  const mode = getRouteSegmentMode(segment);
  if (mode === 'walk') {
    return { mode, strokeColor: '#10B981', strokeWeight: 4, strokeStyle: 'solid', strokeOpacity: 0.95 };
  }
  if (mode === 'taxi') {
    return { mode, strokeColor: '#FF3B86', strokeWeight: 6, strokeStyle: 'solid', strokeOpacity: 0.95 };
  }
  return { mode, strokeColor: '#9CA3AF', strokeWeight: 4, strokeStyle: 'shortdash', strokeOpacity: 0.7 };
}

function renderKakaoPolyline(points, { segment = null, append = false } = {}) {
  if (!points.length || !kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  if (!append) {
    clearKakaoPolylines();
  }

  const style = getRouteSegmentStyle(segment);
  const polyline = new window.kakao.maps.Polyline({
    path: toKakaoLatLngPath(points),
    strokeWeight: style.strokeWeight,
    strokeColor: style.strokeColor,
    strokeOpacity: style.strokeOpacity,
    strokeStyle: style.strokeStyle,
  });
  polyline.setMap(kakaoMapState.map);
  addKakaoPolyline(polyline);

  if (segment && !segment.isFallback) {
    console.log(`Kakao route polyline rendered (${style.mode})`);
  }
}

function renderKakaoRouteSegments(segments) {
  clearKakaoPolylines();
  segments.forEach(segment => {
    renderKakaoPolyline(segment.path, { segment, append: true });
  });
}

function renderNaverPolyline(points, { segment = null, append = false } = {}) {
  if (!points.length || !naverMapState.map || !window.naver || !window.naver.maps) return;

  if (!append) {
    clearNaverPolylines();
  }

  const style = getRouteSegmentStyle(segment);
  const polyline = new window.naver.maps.Polyline({
    map: naverMapState.map,
    path: toNaverLatLngPath(points),
    strokeWeight: style.strokeWeight,
    strokeColor: style.strokeColor,
    strokeOpacity: style.strokeOpacity,
    strokeStyle: style.strokeStyle,
  });
  addNaverPolyline(polyline);

  if (segment && !segment.isFallback) {
    console.log(`Naver route polyline rendered (${style.mode})`);
  }
}

function renderNaverRouteSegments(segments) {
  clearNaverPolylines();
  segments.forEach(segment => {
    renderNaverPolyline(segment.path, { segment, append: true });
  });
}

function renderNaverRoute({ fit = false, routeToken = routeRenderToken } = {}) {
  if (routeToken !== routeRenderToken) return;

  if (!naverMapState.map) {
    ensureNaverMap(0, { routeToken });
    return;
  }

  if (!window.naver || !window.naver.maps) {
    loadNaverSdk()
      .then(() => {
        if (routeToken !== routeRenderToken) return;
        renderNaverRoute({ fit, routeToken });
      })
      .catch(() => {
        naverMapState.sdkPromise = null;
      });
    return;
  }

  clearNaverRouteObjects();

  const stopsWithCoords = getStopsWithCoords();
  if (!stopsWithCoords.length) return;

  const geometryKey = getCurrentRouteGeometryKey();
  const renderToken = mapSwitchToken;
  const renderRouteToken = routeToken;

  naverMapState.markers = currentRoute.stops.map(() => null);
  stopsWithCoords.forEach(({ stop, index }, markerIndex) => {
    const marker = new window.naver.maps.Marker({
      map: naverMapState.map,
      position: new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng),
      icon: createNaverMarkerIcon(stop, index, state.activeStop === index),
      zIndex: 100 + index,
    });

    window.naver.maps.Event.addListener(marker, 'click', () => {
      activateStop(index, { source: 'marker' });
    });

    naverMapState.markers[index] = {
      marker,
      position: new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng),
    };
  });

  updateMarkerActive();
  setRouteMetaDefault();
  if (fit) fitNaverRouteBounds();

  resolveCurrentRouteGeometry().then(geometry => {
    if (!geometry || mapProviderState.active !== 'naver' || !naverMapState.map) return;
    if (isStaleMapRender(renderToken, renderRouteToken) || geometryKey !== getCurrentRouteGeometryKey()) return;

    syncRouteGeometryLabelUpdates(geometry);
    if (Array.isArray(geometry.segments) && geometry.segments.length) {
      renderNaverRouteSegments(geometry.segments);
      if (fit) fitNaverRouteBounds(geometry.path);
    }
  });
}

function clearKakaoRouteObjects() {
  clearKakaoPolylines();

  kakaoMapState.markers.forEach(marker => {
    if (marker) marker.overlay.setMap(null);
  });
  kakaoMapState.markers = [];
}

function clearNaverRouteObjects() {
  clearNaverPolylines();

  naverMapState.markers.forEach(marker => {
    if (marker) marker.marker.setMap(null);
  });
  naverMapState.markers = [];
}

function clearRouteOverlays() {
  clearKakaoRouteObjects();
  clearNaverRouteObjects();
}

function createKakaoMarkerElement(stop, idx) {
  const marker = document.createElement('button');
  marker.type = 'button';
  marker.className = 'kakao-route-marker';
  marker.dataset.stop = String(idx);
  marker.setAttribute('aria-label', `Show stop ${stop.num}: ${stop.name}`);
  marker.textContent = String(stop.num);
  marker.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    activateStop(idx, { source: 'marker' });
  });
  return marker;
}

function createNaverMarkerIcon(stop, idx, isActive = false) {
  return {
    content: `<button class="kakao-route-marker${isActive ? ' active' : ''}" type="button" aria-label="Show route stop ${stop.num}">${stop.num}</button>`,
    anchor: new window.naver.maps.Point(17, 34),
  };
}

function fitKakaoRouteBounds(routePoints = null) {
  if (!kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  const bounds = new window.kakao.maps.LatLngBounds();
  const points = Array.isArray(routePoints) && routePoints.length
    ? routePoints
    : getStopsWithCoords().map(({ stop }) => stop.coords);
  if (!points.length) return;
  points.forEach(point => {
    bounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
  });

  try {
    kakaoMapState.map.setBounds(bounds, 64, 64, 104, 64);
  } catch (error) {
    kakaoMapState.map.setBounds(bounds);
  }
}

function fitNaverRouteBounds(routePoints = null) {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;

  const points = Array.isArray(routePoints) && routePoints.length
    ? routePoints
    : getStopsWithCoords().map(({ stop }) => stop.coords);
  if (!points.length) return;

  const lats = points.map(point => point.lat);
  const lngs = points.map(point => point.lng);
  const bounds = new window.naver.maps.LatLngBounds(
    new window.naver.maps.LatLng(Math.min(...lats), Math.min(...lngs)),
    new window.naver.maps.LatLng(Math.max(...lats), Math.max(...lngs))
  );

  try {
    naverMapState.map.fitBounds(bounds, { top: 64, right: 64, bottom: 104, left: 64 });
  } catch (error) {
    naverMapState.map.fitBounds(bounds);
  }
}

function relayoutKakaoMap() {
  if (!kakaoMapState.map) return;
  kakaoMapState.map.relayout();
}

function relayoutNaverMap() {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;
  window.naver.maps.Event.trigger(naverMapState.map, 'resize');
}

function setMapStatus(message, mode = 'info') {
  if (!mapStatus) return;
  mapStatus.textContent = message;
  mapStatus.dataset.mode = mode;
  mapStatus.hidden = false;
}

function hideMapStatus() {
  if (!mapStatus) return;
  mapStatus.hidden = true;
}

function preloadKakaoSdk() {
  const appKey = getKakaoAppKey();
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    return;
  }

  loadKakaoSdk(appKey).catch(() => {
    kakaoMapState.sdkPromise = null;
  });
}

function bindMapProviderControls() {
  document.querySelectorAll('[data-map-provider]').forEach(button => {
    button.addEventListener('click', () => {
      setMapProvider(button.dataset.mapProvider);
    });
  });
  syncMapProviderButtons();
}

function bindMapControls() {
  document.getElementById('map-zoom-in').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      naverMapState.map.setZoom(naverMapState.map.getZoom() + 1);
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    kakaoMapState.map.setLevel(Math.max(1, kakaoMapState.map.getLevel() - 1));
  });

  document.getElementById('map-zoom-out').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      naverMapState.map.setZoom(Math.max(1, naverMapState.map.getZoom() - 1));
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    kakaoMapState.map.setLevel(kakaoMapState.map.getLevel() + 1);
  });

  document.getElementById('map-center-route').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      relayoutNaverMap();
      fitNaverRouteBounds();
      showToast(`Centered on ${currentRoute.label}`);
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    relayoutKakaoMap();
    fitKakaoRouteBounds();
    showToast(`Centered on ${currentRoute.label}`);
  });
}

// ========== Sync activation (list ↔ map ↔ floating card) ==========
function activateStop(idx, options = {}) {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) {
    clearActiveStop();
    return;
  }
  const normalizedIdx = Number(idx);
  const s = currentRoute.stops[normalizedIdx];
  if (!s) {
    clearActiveStop();
    return;
  }

  state.activeStop = normalizedIdx;
  document.querySelectorAll('.stop').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.idx, 10) === normalizedIdx);
  });
  updateMarkerActive();

  const card = document.getElementById('float-card');
  if (!card) return;
  card.dataset.routeToken = String(routeRenderToken);
  card.dataset.stop = String(normalizedIdx);
  document.getElementById('fc-num').textContent = s.num;
  document.getElementById('fc-name').textContent = s.name;
  document.getElementById('fc-type').textContent = s.type;
  document.getElementById('fc-stay').textContent = `⏱ ${getStopDisplayStay(s)} min stay`;
  document.getElementById('fc-walk').textContent = s.walk > 0
    ? (s.legMobilityLabel || `🚶 ${s.walk} min walk`)
    : '📍 Start here';
  document.getElementById('fc-why').textContent = s.why;
  card.classList.add('show');

  if (
    mapProviderState.active === 'naver' &&
    naverMapState.map &&
    naverMapState.markers[normalizedIdx] &&
    options.pan !== false
  ) {
    naverMapState.map.panTo(naverMapState.markers[normalizedIdx].position);
  } else if (kakaoMapState.map && kakaoMapState.markers[normalizedIdx] && options.pan !== false) {
    kakaoMapState.map.panTo(kakaoMapState.markers[normalizedIdx].position);
  }

  const activeEl = document.querySelector(`.left-pane .stop[data-idx="${normalizedIdx}"]`);
  if (activeEl && options.scroll !== false) {
    activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function updateMarkerActive() {
  kakaoMapState.markers.forEach((marker, idx) => {
    if (!marker || !currentRoute?.stops?.[idx]) return;
    const isActive = state.activeStop === idx;
    marker.element.classList.toggle('active', isActive);
    if (typeof marker.overlay.setZIndex === 'function') {
      marker.overlay.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });

  naverMapState.markers.forEach((marker, idx) => {
    if (!marker || !currentRoute?.stops?.[idx]) return;
    const isActive = state.activeStop === idx;
    marker.marker.setIcon(createNaverMarkerIcon(currentRoute.stops[idx], idx, isActive));
    if (typeof marker.marker.setZIndex === 'function') {
      marker.marker.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });
}

function clearActiveStop() {
  state.activeStop = null;
  document.querySelectorAll('.stop').forEach(el => el.classList.remove('active'));
  updateMarkerActive();
  hideFloatCard();
}

function resetFloatCard() {
  const card = document.getElementById('float-card');
  if (!card) return;
  card.dataset.routeToken = '';
  card.dataset.stop = '';
  document.getElementById('fc-num').textContent = '';
  document.getElementById('fc-name').textContent = 'Select a route stop';
  document.getElementById('fc-type').textContent = 'Tap a marker or stop to see details.';
  document.getElementById('fc-stay').textContent = '';
  document.getElementById('fc-walk').textContent = '';
  document.getElementById('fc-why').textContent = '';
}

function hideFloatCard() {
  const card = document.getElementById('float-card');
  if (!card) return;
  card.classList.remove('show');
  card.dataset.routeToken = '';
  card.dataset.stop = '';
}

document.getElementById('fc-close').addEventListener('click', clearActiveStop);

mapStage.addEventListener('click', e => {
  if (
    !e.target.closest('.kakao-route-marker') &&
    !e.target.closest('.float-card') &&
    !e.target.closest('.ask-fab') &&
    !e.target.closest('.map-status')
  ) {
    clearActiveStop();
  }
});

// ========== Refine ==========
document.querySelectorAll('.refine-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    applyRefinement(chip.dataset.refine);
  });
});

function syncRefineChips() {
  const active = new Set(state.activeRefinements);
  document.querySelectorAll('.refine-chip').forEach(chip => {
    chip.classList.toggle('applied', active.has(chip.dataset.refine));
  });
}

function updateRefineSummary() {
  const summary = document.getElementById('refine-summary');
  if (!summary) return;
  const labels = getRefinementLabels();
  if (!labels.length) {
    summary.textContent = '';
    summary.hidden = true;
    return;
  }
  summary.textContent = `Tuned for: ${labels.join(' · ')}`;
  summary.hidden = false;
}

function getCurrentAreaCandidates() {
  const routeKey = getRouteKey(state.area);
  const cachedCoords = routeKey === 'near_me' ? getCachedNearMeCoords() : null;
  const runtimeContext = routeKey === 'near_me' && cachedCoords
    ? { center: cachedCoords }
    : (
      routeKey === 'near_me' && hasValidCoords(state.effectiveOrigin)
        ? { center: state.effectiveOrigin, nearMeFallbackUsed: Boolean(state.nearMeFallbackUsed) }
        : {}
    );
  return getAreaCandidates(curatedPlaceState.places, getAreaConfig(routeKey, runtimeContext));
}

function isSameStopSet(routeA, routeB) {
  if (!routeA?.stops || !routeB?.stops) return false;
  if (routeA.stops.length !== routeB.stops.length) return false;
  const idsA = getPreviousRouteStopIdentitySet(routeA);
  const idsB = getPreviousRouteStopIdentitySet(routeB);
  if (idsA.size !== idsB.size) return false;
  for (const id of idsA) if (!idsB.has(id)) return false;
  return true;
}

function applyRefinement(key) {
  if (!REFINEMENT_KEYS.includes(key)) return;

  const isRemoving = hasActiveRefinement(key);
  const previousActive = getActiveRefinementKeys();
  const nextActive = isRemoving
    ? previousActive.filter(k => k !== key)
    : [...previousActive, key];

  ensureRealPlacesLoaded().then(async () => {
    const routeKey = getRouteKey(state.area);
    const runtimeContext = await getRouteRuntimeContext(routeKey);
    const routePreferences = getOptionalRoutePreferences();
    const previousRoute = currentRoute;
    const routeInput = normalizeRouteBuildInput({
      areaKey: routeKey,
      timeKey: state.time,
      moodKey: state.mood,
      startTime: {
        period: state.startTimePeriod,
        customStartTime: state.customStartTime,
      },
      coords: runtimeContext.center,
      places: curatedPlaceState.places,
      previousRoute,
      runtimeContext,
      routePreferences,
    });

    if (!nextActive.length) {
      state.activeRefinements = [];
      syncRefineChips();
      updateRefineSummary();
      state.routeKey = routeKey;
      applyResolvedRoute(buildRouteForInputs({
        ...routeInput,
        refinements: [],
        previousRoute: null,
      }));
      const undoText = REFINE_TEXTS[key]?.undo || 'Cleared refinement.';
      showToast(undoText);
      return;
    }

    let openNotice = '';
    if (nextActive.includes('open')) {
      const candidates = getCurrentAreaCandidates();
      if (!hasOpenNowDataForCandidates(candidates)) {
        openNotice = REFINE_TEXTS.open.unavailable;
      }
    }

    let refinedRoute = buildRouteForInputs({
      ...routeInput,
      refinements: nextActive,
      allowFallback: false,
    });

    if (!refinedRoute || !refinedRoute.stops.length) {
      showToast('Not enough matching places for that refinement yet.');
      return;
    }

    const walkActive = nextActive.includes('walk');
    let identical = previousRoute && isSameStopSet(refinedRoute, previousRoute);
    let walkSanityFailed = false;

    if (walkActive && previousRoute) {
      const previousWalking = estimateRouteWalkingMeters(previousRoute);
      const initialWalking = estimateRouteWalkingMeters(refinedRoute);
      const threshold = Math.max(50, previousWalking * 0.1);
      if (previousWalking > 0 && initialWalking > previousWalking + threshold) {
        const compactRetry = buildRouteForInputs({
          ...routeInput,
          refinements: nextActive,
          previousRouteOverlapMultiplier: 0,
          allowFallback: false,
        });
        if (compactRetry && compactRetry.stops.length) {
          const retryWalking = estimateRouteWalkingMeters(compactRetry);
          if (retryWalking <= initialWalking) {
            refinedRoute = compactRetry;
          }
        }
        const finalWalking = estimateRouteWalkingMeters(refinedRoute);
        walkSanityFailed = finalWalking > previousWalking + threshold;
        identical = previousRoute && isSameStopSet(refinedRoute, previousRoute);
      }
    } else if (identical) {
      const noveltyRetry = buildRouteForInputs({
        ...routeInput,
        refinements: nextActive,
        previousRouteOverlapMultiplier: 2,
        allowFallback: false,
      });
      if (noveltyRetry && noveltyRetry.stops.length) {
        refinedRoute = noveltyRetry;
        identical = previousRoute && isSameStopSet(noveltyRetry, previousRoute);
      }
    }

    state.activeRefinements = nextActive;
    state.routeKey = routeKey;
    syncRefineChips();
    updateRefineSummary();
    applyResolvedRoute(refinedRoute);

    if (walkSanityFailed) {
      showToast('Nearby alternatives are limited, so this route may not reduce walking much.');
    } else if (identical && !walkActive) {
      showToast('Not enough nearby alternatives to change the route much.');
    } else if (openNotice) {
      showToast(openNotice);
    } else {
      const labels = getRefinementLabels(nextActive);
      showToast(`Tuned for: ${labels.join(' · ')}`);
    }
    flashWhy();
  });
}

function flashWhy() {
  const why = document.getElementById('why-body');
  why.style.transition = 'background 0.4s';
  why.style.background = 'rgba(20, 184, 166, 0.14)';
  setTimeout(() => { why.style.background = 'transparent'; }, 700);
}

// ========== Action bar ==========
function getSavedRoutes() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SAVED_ROUTES_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function getRouteSnapshot() {
  const stops = (currentRoute?.stops || []).map(stop => ({
    id: stop.place?.placeId || stop.place?.id || '',
    name: stop.name,
    type: stop.type,
    coords: stop.coords,
    naverMapUrl: stop.place?.naverMapUrl || '',
  }));

  return {
    timestamp: new Date().toISOString(),
    area: getAreaDisplayLabel(),
    areaKey: getRouteKey(state.area),
    locationMode: state.locationMode,
    nearMeCoords: state.nearMeCoords,
    nearMeResolved: Boolean(state.nearMeResolved),
    nearMeFallbackUsed: Boolean(state.nearMeFallbackUsed),
    nearMeFallbackAreaKey: state.nearMeFallbackAreaKey || '',
    effectiveAreaKey: state.effectiveAreaKey,
    effectiveOrigin: state.effectiveOrigin,
    time: getTimeConfig(state.time).label,
    timeKey: normalizeTimeKey(state.time),
    startTimePeriod: normalizeStartTimePeriod(state.startTimePeriod),
    customStartTime: getCustomStartTimeValue(state.customStartTime),
    vibe: getMoodDisplayLabel(),
    vibeKey: normalizeMoodKeys(state.mood)[0] || '',
    activeRefinements: getActiveRefinementKeys(),
    activeMapProvider: getActiveMapProvider(),
    summary: {
      label: currentRoute?.label || '',
      mapLabel: currentRoute?.mapLabel || '',
      total: currentRoute?.meta?.total || '',
      walking: currentRoute?.meta?.walking || '',
      source: currentRoute?.sourceLabel || '',
    },
    stops,
  };
}

function getRouteSnapshotKey(snapshot) {
  return [
    snapshot.area,
    snapshot.time,
    snapshot.startTimePeriod || '',
    snapshot.customStartTime || '',
    snapshot.vibe,
    Array.isArray(snapshot.activeRefinements) ? snapshot.activeRefinements.slice().sort().join(',') : '',
    snapshot.stops.map(stop => stop.id || stop.name).join('>'),
  ].join('|');
}

function setActionButtonTemporaryLabel(button, label, restoreLabel) {
  if (!button) return;
  const textNode = Array.from(button.childNodes).find(node => node.nodeType === 3 && node.nodeValue.trim());
  if (!textNode) return;

  textNode.nodeValue = ` ${label} `;
  window.setTimeout(() => {
    textNode.nodeValue = ` ${restoreLabel} `;
  }, 1800);
}

function saveCurrentRoute(button) {
  if (!currentRoute || !currentRoute.stops.length) {
    showToast('There is no route to save yet.');
    return;
  }

  const snapshot = getRouteSnapshot();
  const snapshotKey = getRouteSnapshotKey(snapshot);
  const savedRoutes = getSavedRoutes();
  const existingIndex = savedRoutes.findIndex(route => getRouteSnapshotKey(route) === snapshotKey);

  if (existingIndex >= 0) {
    savedRoutes[existingIndex] = { ...savedRoutes[existingIndex], ...snapshot };
  } else {
    savedRoutes.unshift(snapshot);
  }

  try {
    window.localStorage.setItem(SAVED_ROUTES_STORAGE_KEY, JSON.stringify(savedRoutes.slice(0, 25)));
    setActionButtonTemporaryLabel(button, 'Saved', 'Save');
    showToast(existingIndex >= 0 ? '✓ Saved route updated' : '✓ Route saved to this browser');
  } catch (error) {
    showToast('Could not save this route in localStorage.');
  }
}

function buildShareText() {
  const stopLines = (currentRoute?.stops || [])
    .map((stop, index) => `${index + 1}. ${stop.name}`)
    .join('\n');
  const pageUrl = window.location.href.split('#')[0];

  return [
    'Kandid Spot',
    `${getAreaDisplayLabel()} · ${getTimeConfig(state.time).label} · ${getStartTimeSummaryLabel()} · ${getMoodDisplayLabel()}`,
    currentRoute?.mapLabel || currentRoute?.label || 'Route',
    getRefinementCount() ? `Refinements: ${getRefinementLabels().join(', ')}` : '',
    stopLines,
    pageUrl,
  ].filter(Boolean).join('\n');
}

async function shareCurrentRoute() {
  if (!currentRoute || !currentRoute.stops.length) {
    showToast('There is no route to share yet.');
    return;
  }

  const text = buildShareText();

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Kandid Spot route', text });
      showToast('✓ Route shared');
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      showToast('✓ Route copied to clipboard');
      return;
    }

    window.prompt('Copy this route:', text);
    showToast('Copy the route from the prompt.');
  } catch (error) {
    if (error && error.name === 'AbortError') {
      showToast('Share cancelled.');
      return;
    }
    showToast('Could not share this route.');
  }
}

function getCurrentRoutePlaces() {
  return Array.isArray(currentRoute?.stops)
    ? currentRoute.stops.filter(hasValidKoreaCoord)
    : [];
}

function getPlaceLat(place = {}) {
  const sourcePlace = place.place || place;
  return Number(
    place.lat ??
    place.latitude ??
    place.py ??
    place.coords?.lat ??
    sourcePlace.lat ??
    sourcePlace.latitude ??
    sourcePlace.py ??
    sourcePlace.coords?.lat
  );
}

function getPlaceLng(place = {}) {
  const sourcePlace = place.place || place;
  return Number(
    place.lng ??
    place.longitude ??
    place.px ??
    place.coords?.lng ??
    sourcePlace.lng ??
    sourcePlace.longitude ??
    sourcePlace.px ??
    sourcePlace.coords?.lng
  );
}

function hasValidKoreaCoord(place) {
  const lat = getPlaceLat(place);
  const lng = getPlaceLng(place);
  return Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= 31.43 &&
    lat <= 44.35 &&
    lng >= 122.37 &&
    lng <= 132.0;
}

function getPlaceName(place = {}) {
  const sourcePlace = place.place || place;
  return String(
    place.name ||
    place.title ||
    place.label ||
    sourcePlace.displayName ||
    sourcePlace.name ||
    sourcePlace.title ||
    sourcePlace.label ||
    'Selected place'
  ).trim();
}

function getPlaceId(place = {}) {
  const sourcePlace = place.place || place;
  return String(
    place.placeId ||
    place.sid ||
    place.naverPlaceId ||
    place.kakaoPlaceId ||
    place.id ||
    sourcePlace.placeId ||
    sourcePlace.sid ||
    sourcePlace.naverPlaceId ||
    sourcePlace.kakaoPlaceId ||
    sourcePlace.id ||
    ''
  ).trim();
}

function formatMapCoord(value) {
  const number = Number(value);
  return Number.isFinite(number) ? String(Number(number.toFixed(7))) : '';
}

function encodeKakaoRouteStop(place) {
  return [
    encodeURIComponent(getPlaceName(place)),
    formatMapCoord(getPlaceLat(place)),
    formatMapCoord(getPlaceLng(place)),
  ].join(',');
}

function buildKakaoWalkingDirectionsUrl(routePlaces) {
  if (!routePlaces.length) return '';
  const segments = routePlaces.map(encodeKakaoRouteStop);
  if (segments.length === 1) {
    return `https://map.kakao.com/link/to/${segments[0]}`;
  }
  return `https://map.kakao.com/link/by/walk/${segments.join('/')}`;
}

function toNaverMapPoint(place) {
  const lat = getPlaceLat(place);
  const lng = getPlaceLng(place);
  const clampedLat = Math.max(Math.min(lat, 85.05112878), -85.05112878);
  const radians = Math.PI / 180;
  const earthRadius = 6378137;
  return {
    x: earthRadius * lng * radians,
    y: earthRadius * Math.log(Math.tan(Math.PI / 4 + (clampedLat * radians) / 2)),
  };
}

function encodeNaverRouteStop(place) {
  const point = toNaverMapPoint(place);
  return [
    formatMapCoord(point.x),
    formatMapCoord(point.y),
    encodeURIComponent(getPlaceName(place)),
    encodeURIComponent(getPlaceId(place)),
    'PLACE_POI',
  ].join(',');
}

function buildNaverWalkingDirectionsUrl(routePlaces) {
  if (!routePlaces.length) return '';
  const segments = routePlaces.map(encodeNaverRouteStop);
  const center = toNaverMapPoint(routePlaces[Math.floor(routePlaces.length / 2)]);
  const centerQuery = [
    formatMapCoord(center.x),
    formatMapCoord(center.y),
    '15.00',
    '0',
    '0',
    '0',
    'dh',
  ].join(',');
  const routePath = segments.length === 1
    ? `-/${segments[0]}`
    : segments.join('/');
  return `https://map.naver.com/p/directions/${routePath}/-/walk?c=${centerQuery}`;
}

function buildExternalMapUrl(routePlaces, provider = 'naver') {
  if (provider === 'kakao') {
    return buildKakaoWalkingDirectionsUrl(routePlaces);
  }
  return buildNaverWalkingDirectionsUrl(routePlaces);
}

function openCurrentRouteInMap() {
  const routePlaces = getCurrentRoutePlaces();
  if (!routePlaces.length) {
    console.warn('[Kandid Spot] Open in map clicked but no valid route places exist.');
    showToast('There are no valid route stops to open yet.');
    return;
  }

  const provider = getActiveMapProvider();
  const url = buildExternalMapUrl(routePlaces, provider);
  if (!url) {
    console.warn('[Kandid Spot] Open in map clicked but no valid route URL could be built.');
    showToast('No walking route link is available for this route yet.');
    return;
  }

  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    showToast('Allow popups to open this map link.');
    return;
  }

  const providerLabel = provider === 'naver' ? 'Naver' : 'Kakao';
  showToast(`Opening ${providerLabel} Map walking directions…`);
}

document.querySelectorAll('.act-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    if (a === 'save') saveCurrentRoute(btn);
    if (a === 'share') shareCurrentRoute();
    if (a === 'map') openCurrentRouteInMap();
  });
});

document.getElementById('saved-btn').addEventListener('click', () => {
  const savedRoutes = getSavedRoutes();
  showToast(savedRoutes.length
    ? `${savedRoutes.length} saved route${savedRoutes.length === 1 ? '' : 's'} in this browser.`
    : 'Saved routes are coming in Early Access. Save this route here, or join to revisit routes later.');
});

// ========== Early access signup ==========
const earlyAccessButton = document.getElementById('early-access-btn');
const earlyAccessModal = document.getElementById('early-access-modal');
const earlyAccessClose = document.getElementById('early-access-close');
const earlyAccessDone = document.getElementById('early-access-done');
const earlyAccessForm = document.getElementById('early-access-form');
const earlyAccessCopy = document.getElementById('early-access-copy');
const earlyAccessSuccess = document.getElementById('early-access-success');
const earlyAccessError = document.getElementById('early-access-error');
const earlyAccessSubmit = document.getElementById('early-access-submit');
const earlyAccessNameInput = document.getElementById('ea-name');
const earlyAccessEmailInput = document.getElementById('ea-email');
const earlyAccessConsent = document.getElementById('ea-consent');
const earlyAccessMore = document.getElementById('early-access-more');
const earlyAccessOptional = document.getElementById('early-access-optional');

function isEarlyAccessOpen() {
  return !!earlyAccessModal?.classList.contains('open');
}

function setEarlyAccessError(message, focusEl) {
  if (!earlyAccessError) return;
  earlyAccessError.textContent = message || '';
  earlyAccessError.hidden = !message;
  if (message && focusEl && typeof focusEl.focus === 'function') {
    focusEl.focus();
  }
}

function setEarlyAccessOptionalOpen(open) {
  if (!earlyAccessMore || !earlyAccessOptional) return;
  earlyAccessOptional.hidden = !open;
  earlyAccessMore.setAttribute('aria-expanded', String(open));
  earlyAccessMore.textContent = open ? 'Hide optional details' : 'Add optional details';
}

function openEarlyAccess() {
  if (!earlyAccessModal) return;
  earlyAccessModal.classList.add('open');
  earlyAccessModal.setAttribute('aria-hidden', 'false');
  setEarlyAccessError('');
  setEarlyAccessOptionalOpen(false);
  if (earlyAccessForm && !earlyAccessForm.hidden) {
    setTimeout(() => earlyAccessNameInput?.focus(), 60);
  }
}

function closeEarlyAccess() {
  if (!earlyAccessModal) return;
  earlyAccessModal.classList.remove('open');
  earlyAccessModal.setAttribute('aria-hidden', 'true');
}

function getEarlyAccessSessionId() {
  const key = 'kandid_spot_early_access_session_id';
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const next = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `ea_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, next);
    return next;
  } catch (error) {
    return '';
  }
}

function buildEarlyAccessPayload(formData) {
  const value = name => String(formData.get(name) || '').trim();
  return {
    name: value('name'),
    email: value('email'),
    country: value('country'),
    age_range: value('age_range'),
    gender: value('gender'),
    user_type: value('user_type'),
    message: value('message'),
    company_website: value('company_website'),
    consent: !!earlyAccessConsent?.checked,
    page: window.location.pathname,
    referrer: document.referrer || '',
    user_agent: navigator.userAgent || '',
    session_id: getEarlyAccessSessionId(),
    metadata: {
      language: navigator.language || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    },
  };
}

async function submitEarlyAccess(event) {
  event.preventDefault();
  if (!earlyAccessForm || !earlyAccessSubmit) return;

  const formData = new FormData(earlyAccessForm);
  const payload = buildEarlyAccessPayload(formData);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.name) {
    setEarlyAccessError('Please enter your name.', earlyAccessNameInput);
    return;
  }
  if (!payload.email || !emailPattern.test(payload.email)) {
    setEarlyAccessError('Please enter a valid email address.', earlyAccessEmailInput);
    return;
  }
  if (!payload.consent) {
    setEarlyAccessError('Please agree to be contacted about early access.', earlyAccessConsent);
    return;
  }

  setEarlyAccessError('');
  earlyAccessSubmit.disabled = true;
  const originalLabel = earlyAccessSubmit.textContent;
  earlyAccessSubmit.textContent = 'joining...';

  try {
    const response = await fetch('/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Could not join the list right now.');
    }

    if (earlyAccessCopy) earlyAccessCopy.hidden = true;
    earlyAccessForm.hidden = true;
    if (earlyAccessSuccess) {
      const title = earlyAccessSuccess.querySelector('h3');
      if (title && result.duplicate) title.textContent = "You're already on the list.";
      earlyAccessSuccess.hidden = false;
      earlyAccessDone?.focus();
    }
    showToast(result.duplicate ? "You're already on the early access list." : "You're on the early access list.");
  } catch (error) {
    setEarlyAccessError(error.message || 'Could not join the list right now.');
  } finally {
    earlyAccessSubmit.disabled = false;
    earlyAccessSubmit.textContent = originalLabel;
  }
}

earlyAccessButton?.addEventListener('click', openEarlyAccess);
earlyAccessClose?.addEventListener('click', closeEarlyAccess);
earlyAccessDone?.addEventListener('click', closeEarlyAccess);
earlyAccessModal?.querySelector('[data-early-access-close]')?.addEventListener('click', closeEarlyAccess);
earlyAccessForm?.addEventListener('submit', submitEarlyAccess);
earlyAccessMore?.addEventListener('click', () => {
  setEarlyAccessOptionalOpen(Boolean(earlyAccessOptional?.hidden));
});

// ========== Ask Miro drawer ==========
const askDrawer = document.getElementById('ask-drawer');
const askThread = document.getElementById('ask-thread');
const askInput = document.getElementById('ask-input');
const askSend = document.getElementById('ask-send');

document.getElementById('ask-fab').addEventListener('click', () => openAsk());
document.getElementById('ask-close').addEventListener('click', () => closeAsk());
document.getElementById('ask-overlay').addEventListener('click', () => closeAsk());

function openAsk() {
  askDrawer.classList.add('open');
  askDrawer.setAttribute('aria-hidden', 'false');
  setTimeout(() => askInput.focus(), 280);
}
function closeAsk() {
  askDrawer.classList.remove('open');
  askDrawer.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.ask-suggest').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.q;
    askWith(btn.textContent.trim(), getAskResponse(q));
  });
});

askSend.addEventListener('click', sendAskInput);
askInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendAskInput(); });

function sendAskInput() {
  const v = askInput.value.trim();
  if (!v) return;
  askInput.value = '';
  const lower = v.toLowerCase();
  let key = 'why';
  if (lower.includes('crowd') || lower.includes('busy') || lower.includes('quiet')) key = 'crowd';
  else if (lower.match(/\d+\s?(min|hour|hr)/) || lower.includes('time') || lower.includes('shorter')) key = 'time';
  else if (lower.includes('cafe') || lower.includes('coffee')) key = 'cafe';
  else if (lower.includes('cheap') || lower.includes('₩') || lower.includes('budget')) key = 'cheap';
  else if (lower.includes('open') || lower.includes('closed') || lower.includes('now')) key = 'open';
  askWith(v, getAskResponse(key));
}

function getAskResponse(key) {
  const response = ASK_RESPONSES[key] || ASK_RESPONSES.why;
  return typeof response === 'function' ? response(currentRoute) : response;
}

function askWith(question, answer) {
  const suggHead = askThread.querySelector('.ask-suggest-head');
  const suggList = askThread.querySelector('.ask-suggestions');
  if (suggHead) suggHead.remove();
  if (suggList) suggList.remove();

  const userMsg = document.createElement('div');
  userMsg.className = 'ask-msg from-user';
  userMsg.innerHTML = `<div class="ask-bubble">${escapeHtml(question)}</div>`;
  askThread.appendChild(userMsg);
  scrollAsk();

  const typing = document.createElement('div');
  typing.className = 'ask-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  askThread.appendChild(typing);
  scrollAsk();

  setTimeout(() => {
    typing.remove();
    const reply = document.createElement('div');
    reply.className = 'ask-msg from-miro';
    reply.innerHTML = `<div class="ask-bubble">${answer}</div>`;
    askThread.appendChild(reply);
    scrollAsk();
  }, 800);
}

function scrollAsk() {
  setTimeout(() => { askThread.scrollTop = askThread.scrollHeight; }, 40);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ========== Toast ==========
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ========== Esc key handlers ==========
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (isEarlyAccessOpen()) closeEarlyAccess();
    else if (askDrawer.classList.contains('open')) closeAsk();
    else if (document.getElementById('float-card').classList.contains('show')) {
      hideFloatCard();
    }
  }
});

// ========== Onboarding (hybrid flow: 4 required + 2 optional) ==========
const OB_LOADING_STEPS = [
  'Reading the streets of {area}',
  'Checking walking time',
  'Matching your mood',
  'Avoiding obvious tourist traps',
  'Finding a route you can start now',
];

const OB_REQUIRED_LAST_STEP = 3;
const OB_FINAL_STEP = 5;

const onboarding = {
  el: document.getElementById('onboarding'),
  loadingEl: document.getElementById('ob-loading'),
  loadingStepEl: document.getElementById('ob-loading-step'),
  currentEl: document.getElementById('ob-current'),
  currentOptEl: document.getElementById('ob-current-opt'),
  progressRequiredEl: null,
  progressOptionalEl: null,
  customStartTimeField: null,
  customStartTimeInput: null,
  step: 1,
  // Required: area, duration, starting time, mood — all are required to gate route generation.
  // Optional: shape (itinerary flow), refine (per-anchor route preference map).
  selections: { area: null, time: null, startTimePeriod: null, customStartTime: '', mood: null, shape: null, refine: {} },
  contextNote: '',

  init() {
    this.progressRequiredEl = this.el.querySelector('[data-progress-required]');
    this.progressOptionalEl = this.el.querySelector('[data-progress-optional]');
    this.customStartTimeField = this.el.querySelector('[data-custom-start-time-field]');
    this.customStartTimeInput = this.el.querySelector('[data-custom-start-time]');

    // Required-step option groups (area / time / starting time / mood)
    this.el.querySelectorAll('.ob-options').forEach(group => {
      const groupKey = group.dataset.group;
      group.addEventListener('click', e => {
        const btn = e.target.closest('.ob-option');
        if (!btn) return;
        group.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
        btn.classList.add('selected');
        this.selections[groupKey] = getCanonicalSelectionValue(groupKey, btn);
        if (groupKey === 'startTimePeriod') {
          if (this.selections.startTimePeriod !== 'custom') this.selections.customStartTime = '';
          this.updateCustomStartTimeVisibility();
          if (this.selections.startTimePeriod === 'custom') this.customStartTimeInput?.focus();
        }
        this.updateNextEnabled();
      });
    });

    if (this.customStartTimeInput) {
      const syncCustomStartTime = () => {
        this.selections.customStartTime = getCustomStartTimeValue(this.customStartTimeInput.value);
        this.updateNextEnabled();
      };
      this.customStartTimeInput.addEventListener('input', syncCustomStartTime);
      this.customStartTimeInput.addEventListener('change', syncCustomStartTime);
    }

    // Optional Step 4: itinerary shape cards
    const shapeGroup = this.el.querySelector('.ob-shapes');
    if (shapeGroup) {
      shapeGroup.addEventListener('click', e => {
        const btn = e.target.closest('.ob-shape');
        if (!btn) return;
        shapeGroup.querySelectorAll('.ob-shape').forEach(o => o.classList.remove('selected'));
        btn.classList.add('selected');
        this.selections.shape = btn.dataset.value;
      });
    }

    // Optional Step 5: per-anchor preference toggles
    this.el.querySelectorAll('.ob-refine-prefs').forEach(group => {
      const anchor = group.dataset.anchor;
      this.selections.refine[anchor] = 'neutral';
      group.addEventListener('click', e => {
        const btn = e.target.closest('.ob-pref');
        if (!btn) return;
        group.querySelectorAll('.ob-pref').forEach(o => {
          o.classList.remove('active');
          o.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        this.selections.refine[anchor] = btn.dataset.pref;
      });
    });

    // Optional context note (Step 1) — UI-only context, not parsed
    const contextInput = this.el.querySelector('[data-context-input]');
    if (contextInput) {
      contextInput.addEventListener('input', () => {
        this.contextNote = contextInput.value.trim();
      });
    }

    // Per-screen actions
    this.el.querySelectorAll('.ob-screen').forEach(screen => {
      const nextBtn = screen.querySelector('.ob-next');
      const backBtn = screen.querySelector('.ob-back');
      const customizeBtn = screen.querySelector('.ob-customize-more');
      const skipBtn = screen.querySelector('.ob-skip');
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
      if (backBtn) backBtn.addEventListener('click', () => this.prevStep());
      if (customizeBtn) customizeBtn.addEventListener('click', () => this.goToStep(4));
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          this.skipOptionalStep(parseInt(screen.dataset.step, 10));
        });
      }
    });

    document.addEventListener('keydown', e => {
      if (!this.el.classList.contains('active')) return;
      if (e.key !== 'Enter') return;
      const screen = this.el.querySelector(`.ob-screen[data-step="${this.step}"]`);
      const nextBtn = screen?.querySelector('.ob-next');
      if (nextBtn && !nextBtn.disabled) nextBtn.click();
    });
  },

  updateCustomStartTimeVisibility() {
    if (!this.customStartTimeField || !this.customStartTimeInput) return;
    const isCustom = this.selections.startTimePeriod === 'custom';
    this.customStartTimeField.hidden = !isCustom;
    this.customStartTimeInput.value = isCustom ? getCustomStartTimeValue(this.selections.customStartTime) : '';
  },

  goToStep(n) {
    this.step = n;
    this.el.querySelectorAll('.ob-screen').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.step) === n);
    });
    this.el.querySelectorAll('.ob-step').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('done', sn < n || n > OB_REQUIRED_LAST_STEP);
      s.classList.toggle('active', sn === n);
    });

    const isOptional = n > OB_REQUIRED_LAST_STEP;
    this.el.dataset.stage = isOptional ? 'optional' : 'required';
    if (this.progressRequiredEl) this.progressRequiredEl.hidden = isOptional;
    if (this.progressOptionalEl) this.progressOptionalEl.hidden = !isOptional;
    if (isOptional && this.currentOptEl) {
      this.currentOptEl.textContent = String(n - OB_REQUIRED_LAST_STEP);
    } else if (this.currentEl) {
      this.currentEl.textContent = String(n);
    }

    this.el.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateCustomStartTimeVisibility();
    this.updateNextEnabled();
  },

  updateNextEnabled() {
    const screen = this.el.querySelector(`.ob-screen[data-step="${this.step}"]`);
    if (!screen) return;
    const optionGroups = Array.from(screen.querySelectorAll('.ob-options'));
    const nextBtn = screen.querySelector('.ob-next');
    const customizeBtn = screen.querySelector('.ob-customize-more');
    // Required steps: enable Next only when this screen's required groups have selections.
    if (optionGroups.length && nextBtn) {
      const ready = optionGroups.every(group => {
        const groupKey = group.dataset.group;
        return groupKey === 'startTimePeriod' && this.selections[groupKey] === 'custom'
          ? Boolean(getCustomStartTimeValue(this.selections.customStartTime))
          : Boolean(this.selections[groupKey]);
      });
      nextBtn.disabled = !ready;
      if (customizeBtn) customizeBtn.disabled = !ready;
      return;
    }
    // Optional steps: action buttons are always enabled (user can skip).
    if (nextBtn) nextBtn.disabled = false;
  },

  nextStep() {
    // Final required step "Show my route" — required path is complete, build immediately.
    if (this.step === OB_REQUIRED_LAST_STEP) {
      this.triggerBuild();
      return;
    }
    // Optional Step 4 "Continue" — advance to Step 5.
    if (this.step === 4) {
      this.goToStep(5);
      return;
    }
    // Optional Step 5 "Build my route" — build using existing flow.
    if (this.step === OB_FINAL_STEP) {
      this.triggerBuild();
      return;
    }
    // Required steps before the final required screen.
    this.goToStep(this.step + 1);
  },

  prevStep() {
    if (this.step > 1) this.goToStep(this.step - 1);
  },

  clearShapeSelection() {
    this.selections.shape = null;
    this.el.querySelectorAll('.ob-shape').forEach(o => o.classList.remove('selected'));
  },

  resetRefinePreferences() {
    this.selections.refine = {};
    this.el.querySelectorAll('.ob-refine-prefs').forEach(group => {
      const anchor = group.dataset.anchor;
      this.selections.refine[anchor] = 'neutral';
      group.querySelectorAll('.ob-pref').forEach(o => {
        const isNeutral = o.dataset.pref === 'neutral';
        o.classList.toggle('active', isNeutral);
        o.setAttribute('aria-pressed', isNeutral ? 'true' : 'false');
      });
    });
  },

  skipOptionalStep(stepNumber) {
    if (stepNumber === 4) this.clearShapeSelection();
    if (stepNumber === 5) this.resetRefinePreferences();
    this.triggerBuild();
  },

  triggerBuild() {
    this.el.classList.remove('active');
    this.loadingEl.classList.add('active');
    this.loadingEl.setAttribute('aria-hidden', 'false');

    const stepsForArea = OB_LOADING_STEPS.map(s => s.replace('{area}', getAreaDisplayLabel(this.selections.area)));
    let i = 0;
    this.loadingStepEl.textContent = stepsForArea[0];
    const interval = setInterval(() => {
      i++;
      if (i >= stepsForArea.length) {
        clearInterval(interval);
        this.reveal();
      } else {
        this.loadingStepEl.textContent = stepsForArea[i];
      }
    }, 480);
  },

  reveal() {
    this.selections.startTimePeriod = normalizeStartTimePeriod(this.selections.startTimePeriod);
    this.selections.customStartTime = getCustomStartTimeValue(this.selections.customStartTime);
    Object.assign(state, this.selections);
    syncBuilderChips();
    updateBuilderCustomStartTimeVisibility();

    setBuilderCollapsed(true);
    loadingState.classList.remove('active');
    this.loadingStepEl.textContent = 'Loading real places...';

    ensureRealPlacesLoaded().then(async () => {
      await applyRouteForCurrentSelection();

      this.loadingEl.classList.remove('active');
      this.loadingEl.setAttribute('aria-hidden', 'true');
      document.getElementById('main-app').classList.remove('hidden');

      window.setTimeout(() => {
        ensureActiveMap();
      }, 0);
    });
  },

  restart(preserveSelections = true) {
    if (preserveSelections) {
      ['area', 'time', 'startTimePeriod', 'mood'].forEach(key => {
        const value = state[key];
        const group = this.el.querySelector(`.ob-options[data-group="${key}"]`);
        if (group) {
          group.querySelectorAll('.ob-option').forEach(o => {
            o.classList.toggle('selected', selectionValueMatches(key, o, value));
          });
          this.selections[key] = value;
        }
      });
      this.selections.customStartTime = getCustomStartTimeValue(state.customStartTime);
      if (this.customStartTimeInput) this.customStartTimeInput.value = this.selections.customStartTime;
    } else {
      this.selections = { area: null, time: null, startTimePeriod: null, customStartTime: '', mood: null, shape: null, refine: {} };
      this.contextNote = '';
      this.el.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
      const contextInput = this.el.querySelector('[data-context-input]');
      if (contextInput) contextInput.value = '';
      if (this.customStartTimeInput) this.customStartTimeInput.value = '';
    }
    // Optional route preferences reset when starting a new onboarding pass.
    this.clearShapeSelection();
    this.resetRefinePreferences();
    document.getElementById('main-app').classList.add('hidden');
    this.loadingEl.classList.remove('active');
    this.el.classList.add('active');
    this.goToStep(1);
  },
};

function syncBuilderChips() {
  ['area', 'time', 'startTimePeriod', 'mood'].forEach(key => {
    const group = document.querySelector(`#main-app .builder [data-group="${key}"]`);
    if (!group) return;
    const value = key === 'startTimePeriod' ? normalizeStartTimePeriod(state[key]) : state[key];
    group.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('selected', selectionValueMatches(key, c, value));
    });
  });
  if (builderCustomStartTimeInput) {
    builderCustomStartTimeInput.value = getCustomStartTimeValue(state.customStartTime);
  }
  updateBuilderCustomStartTimeVisibility();
}

document.getElementById('new-btn').addEventListener('click', () => {
  onboarding.restart(true);
  showToast('Pick again — your previous choices are pre-filled.');
});

// ========== Init ==========
bindMapProviderControls();
bindMapControls();
onboarding.init();
preloadKakaoSdk();
if (!MOCK_ROUTES_ENABLED) {
  console.log('Miro mock fallback disabled');
}
ensureRealPlacesLoaded();
